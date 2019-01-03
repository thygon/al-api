<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use Auth,Validator;

class ArticleController extends Controller
{
    //

    //all articles
    function articles(){
    	$articles = Article::all();
    	return response()->json($articles);
    }

    //get article
    function aArticle($id){
    	$article = Article::find($id);
    	return response()->json($article);
    }

    //create article
    function newArticle(Request $req){

        $this->authorize('create',Article::class);

        $validator = Validator::make($req->all(),
                                ['title'=>'required',
                                'content'=>'required|max:2000'
                                ]);


           if($validator->fails()){
            return response()->json(['success'=>false,'error'=>$validator->errors()]);
           }

        $publish = $req->get('publish'); 

    	$article = new Article();
    	$article->title = $req->get('title');
    	$article->content = $req->get('content');

        if($publish === 'true'){
            $article->publish();
        }

    	$user = Auth::user();
    	$user->articles()->save($article);

    	return response()->json(['success'=>true,'message'=>'Article created!']);
    }

    //updateArticle

    function updateArticle(Request $req, $id){

    	$validator = Validator::make($req->all(),
                                ['title'=>'required',
                                'content'=>'required|max:2000'
                                ]);


           if($validator->fails()){
            return response()->json(['success'=>false,'error'=>$validator->errors()]);
           }

        $publish = $req->get('publish'); 

    	$article = Article::find($id);
        $this->authorize('update',$article);

    	$article->title = $req->get('title');
    	$article->content = $req->get('content');

        if($publish === 'true'){
            $article->publish();
        }else{
            $article->unPublish();
        }

    	$article->save();
    	return response()->json(['success'=>true,'message'=>'Article updated!']);

    }

    //delete
    function deleteArticle($id){
    	$article = Article::find($id);
        $this->authorize('update',$article);
    	$article->delete(); 
    	return response()->json(['success'=>true,'message'=>'Article deleted!']);
    }

}
