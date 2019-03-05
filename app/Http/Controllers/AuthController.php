<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Validator, Hash, Mail;
use Response;
use App\User;
use App\Profile;
use JWTFactory;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use DB;
use Carbon;

class AuthController extends Controller
{  


    public function user(){
        $logged =  Auth::user();
        return response()->json($logged);
    }

    public function setProfile(Request $req){
     
        $image = $req->file('picture');

        if(empty($image)){
            return response()->json(['success'=>false,'message'=>'Image is required!']);
        }

        $user = Auth::user();
        $profile = $user->profile()->get();

        if($profile->count() !== 0){
            //update
            $path  = $profile->storeImage($image);
            $profile->profile = $path;
            //more info
            $profile->save();

            return response()->json(['success'=>true,'message'=>'Profile Updated!']);

        }
        $profile = new profile(); 
        $path  = $profile->storeImage($image);
        $profile->profile = $path;
        //more info

        $user->profile()->save($profile);

        return response()->json(['success'=>true,'message'=>'Profile Created!']);

    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password'=> 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['success' =>false,'message' => 'invalid_credentials'], 200);
            }
        } catch (JWTException $e) {
            return response()->json(['success' =>false,'message' => 'could_not_create_token'], 200);
        }
        return response()->json(['success' =>true,'message'=>'Welcome back '.Auth::user()->name,'token'=>$token,'user'=>Auth::user()]);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'name' => 'required',
            'password'=> 'required|min:6'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'isAdmin' => false
        ]);
        $user = User::first();
        $token = JWTAuth::fromUser($user);
        
         return response()->json(['success'=>true,'token'=>$token,'user'=>Auth::user()]);
    }

    public function logout(Request $request){
        $token = $request->bearerToken(); 
        try {
            JWTAuth::invalidate($token);
            return response()->json(['success' => true, 'message'=> "You have successfully logged out."]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
        }

    }


    public function recover(Request $request)
    {   
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json(['success' => false, 'message' => ['email'=> $error_message]], 401);
        }

        //generate token
        $resetToken = str_random(64);

        //store the token
        DB::table('password_resets')->insert([
            'email'=> $user->email,
            'token'=> $token,
            'created_at'=>Carbon::now()
        ]);

        return response()->json(['success' => true, 'token'=> $resetToken,'message'=> "Reset your password!"]);
        
    }

    public function reset(Request $request,$token){

        $validator = Validator::make($request->all(), [
            'newpassword'=> 'required|min:6'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        //validate token
        $user = DB::table('password_resets')
                ->where('token',$token)->first();

       if($user){
           
           $newUser = User::where('email',$user->email)->first();

           if($newUser){
            $newUser->password = Hash::make($request->get('newpassword'));
            $newUser->save();

            return response()->json(['success'=>true,'message'=>'You have a new Password!']);
           }
       }

       return response()->json(['success'=>false,'message'=>'Couldn`t reset password!']);

    }

    public function getNotifications(){
     return response()->json(Auth::user()->notifications);
    }
}
