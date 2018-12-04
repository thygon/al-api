<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Post;
use App\Comment;
use App\Clap;
use Auth, Validator;

class PostController extends Controller
{
    //

    function __construct(){

    }

    //all posts
    function posts(){
    	$posts = Post::with('author','claps','comments')->get();
    	return response()->json($posts);
    }

    //get post
    function aPost($id){
    	$post = Post::find($id);
    	return response()->json($post);
    }

    //create post
    function newPost(Request $req){
         
       $validator = Validator::make($req->all(),
                                ['title'=>'required|max:255',
                                'content'=>'required'
                                ]);


       if($validator->fails()){
        return response()->json(['error'=>true,'error'=>$validator->errors()]);
       }

        $post = new Post();

        $image = $req->file('image');
        if(empty($image)){
            return response()->json(['error'=>true,'message'=>'Image is required!']);
        }
        $path  = $post->storeImage($image);
    	
    	$post->title = $req->get('title');
    	$post->content = $req->get('content');
    	$post->url = $path;

    	$user = Auth::user();
    	$user->posts()->save($post);

    	return response()->json(['error'=>false,'message'=>'Post created!']);
    }

    //updatePost

    function updatePost(Request $req, $id){

    	$validator = Validator::make($req->all(),
                                ['title'=>'required|max:255',
                                'content'=>'required'
                                ]);

        $image = $req->file('image'); 

    	$post = Post::find($id);

        if($image != null){
            //drop
            $post->dropImage($post->url);
            $newPath = $post->storeImage($image);
            $post->url = $newPath;
        }
    	$post->title = $req->get('title');
    	$post->content = $req->get('content');

    	$post->save();
    	return response()->json(['status'=>'success',
            'message'=>'Post updated!']);

    }

    //deletepost
    function deletePost($id){
    	$post = Post::find($id);
        if($post){
            $post->dropImage($post->url);
            $post->delete(); 
        }
    	
    	return response()->json(['status'=>'success',
            'message'=>'Post deleted!']);
    }

    //comment on a post

    function comment(Request $req,$id){
    	$req->validate($req->all(),[
    		'body'=>'required'
    	]);
    	//post 
    	$post = Post::find($id);

    	//comment
    	$post->comments()->create([
                  'body' => $request->get('body'),
                  'commenter' => Auth::user(),
            ]);
        return response()->json(['status'=>'success','message'=>'Commented!']);

    }
   
    //update comment
    function updateComment(Request $req, $id){
    	$req->validate($req->all(),[
    		'body'=>'required'
    	]);

    	$comment = Comment::find($id);
    	$comment->body = $req->get('body');
    	$comment->save();
    	return response()->json(['status'=>'success','message'=>'Comment updated!']);
    }

    //delete comment
    function deleteComment($id){

    	$comment = Comment::find($id);
    	$comment->delete();
    	return response()->json(['status'=>'success','message'=>'Comment deleted!']);
    }

    //upclap---like

    function like($id){
        $post = Post::find($id);
        $clap = Clap::where('clapper',Auth::user()->id)
                      ->where('clapable_id',$post->id)
                      ->first();
        if($clap){

            $clap->clap = true;
            $clap->save(); 

        }else{
    	
        	$post->claps()->create([
        		'clap'=> true,
        		'clapper'=> Auth::user()
        	]);
        }

        return response()->json(['status'=>'success','message'=>'Liked!']);

    }

   //downclaps
    function dislike($id){

    	$post = Post::find($id);
        $clap = Clap::where('clapper',Auth::user()->id)
                      ->where('clapable_id',$post->id)
                      ->first();
        if($clap){

            $clap->clap = false;
            $clap->save(); 

        }else{
        
            $post->claps()->create([
                'clap'=> false,
                'clapper'=> Auth::user()
            ]);
        }

        return response()->json(['status'=>'success','message'=>'disLiked!']);

    }
}
