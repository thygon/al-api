<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;
use App\Ask;
use App\Notifications\question;
use Illuminate\Support\Facades\Notification;

class AskController extends Controller
{
    //

    private $rules = [
    	'name' =>'required',
    	'email'=>'email|required',
    	'phone'=>'required|numeric|min:11',
    	'category'=>'required',
    	'body'=>'required|max:300'
    ];

    function ask(Request $req){


    	$validator = Validator::make($req->all(), $this->rules);
        
        if($validator->fails()){
        	 return response()->json(['success'=>false,'error'=>$validator->errors()]);
        }

        $ask = new Ask();
        $ask->name = $req->name;
        $ask->email = $req->email;
        $ask->phone = $req->phone;
        $ask->category = $req->category;
        $ask->body = $req->body;

        $ask->save();

        //notify
        $this->notifyAdmin($ask);      
  
        return response()->json(['success'=>true,'message'=>'Asked!']);
       
    }


    private function notifyAdmin($ask){
    	$admins = User::where('isAdmin',1)->get();

        Notification::send($admins,new question($ask));
    }


}
