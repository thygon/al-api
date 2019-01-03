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
    	$posts = Post::all();
    	return response()->json($posts);
    }

    //get post
    function aPost($id){
    	$post = Post::find($id);
    	return response()->json($post);
    }

    //create post
    function newPost(Request $req){

       $this->authorize('create',Post::class);
         
       $validator = Validator::make($req->all(),
                                ['title'=>'required|max:60',
                                'content'=>'required|max:2000'
                                ]);


       if($validator->fails()){
        return response()->json(['success'=>false,'error'=>$validator->errors()]);
       }

        $post = new Post();

        $image = $req->file('image');
        if(empty($image)){
            return response()->json(['success'=>false,'message'=>'Image is required!']);
        }
        $path  = $post->storeImage($image);

        $publish = $req->get('publish'); 
    	
    	$post->title = $req->get('title');
    	$post->content = $req->get('content');
    	$post->url = $path;

        if($publish == 'true' ){
            $post->publish();
        }else{
            $post->unPublish();
        }

    	$user = Auth::user();
        $post->author = $user->id;

        $post->save();

    	return response()->json(['success'=>true,'message'=>'Post created!']);
    }

    //updatePost

    function updatePost(Request $req, $id){



    	$validator = Validator::make($req->all(),
                                ['title'=>'required|max:60',
                                'content'=>'required|max:2000'
                                ]);

        $image = $req->file('image'); 

        $publish = $req->get('publish'); 

    	$post = Post::find($id);

        $this->authorize('update',$post);

        if($image != null){
            //drop
            $post->dropImage($post->url);
            $newPath = $post->storeImage($image);
            $post->url = $newPath;
        }
    	$post->title = $req->get('title');
    	$post->content = $req->get('content');

        if($publish == 'true'){
            $post->publish();
        }else{
            $post->unPublish();
        }

    	$post->save();
    	return response()->json(['success'=>true,
            'message'=>'Post updated!','post'=>$post]);

    }

    //deletepost
    function deletePost($id){
    	$post = Post::find($id);
        $this->authorize('update',$post);

        if($post){
            $post->dropImage($post->url);
            $post->delete(); 
        }
    	
    	return response()->json(['success'=>true,
            'message'=>'Post deleted!']);
    }
    
    //comment on a post

    function comment(Request $req,$id){
    	$validator = Validator::
                   make($req->all(),
                        ['body'=>'required|max:100'
                        ]);


       if($validator->fails()){
        return response()->json(['success'=>false,'error'=>$validator->errors()]);
       }

    	//post 
    	$post = Post::find($id);

    	//comment
    	$post->comments()->create([
                  'body' => $req->get('body'),
                  'commenter' => Auth::user()->id,
            ]);
        return response()->json(['success'=>true,'message'=>'Commented!']);

    }
   
    //update comment
    function updateComment(Request $req, $id){
    	$validator = Validator::
                   make($req->all(),
                        ['body'=>'required|max:100'
                        ]);


       if($validator->fails()){
        return response()->json(['success'=>false,'error'=>$validator->errors()]);
       }

    	$comment = Comment::find($id);

        $this->authorize('update',$comment);
    	$comment->body = $req->get('body');
    	$comment->save();
    	return response()->json(['success'=>true,'message'=>'Comment updated!']);
    }

    //delete comment
    function deleteComment($id){

    	$comment = Comment::find($id);
        $this->authorize('update',$comment);
    	$comment->delete();
    	return response()->json(['success'=>true,'message'=>'Comment deleted!']);
    }

    //upclap---like

    function like($id){
        $post = Post::find($id);
        $clap = Clap::where('clapper',Auth::user()->id)
                      ->where('clapable_id',$post->id)
                      ->first();
        if($clap !== null){

            $clap->clap = true;
            $clap->save(); 

        }else{
    	    $clap = new Clap();
            $clap->clap = true;
            $clap->clapper = Auth::user()->id;
            $post->claps()->save($clap);
        }

        return response()->json(['success'=>true,'message'=>'Liked!']);

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
                'clapper'=> Auth::user()->id
            ]);
        }

        return response()->json(['success'=>true,'message'=>'disLiked!']);

    }
}
