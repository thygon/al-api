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
    	$articles = Article::with('author')->get();
    	return response()->json($articles);
    }

    //get article
    function aArticle($id){
    	$article = Article::find($id);
    	return response()->json($article);
    }

    //create article
    function newArticle(Request $req){

        $validator = Validator::make($req->all(),[
            'title'=>'required',
            'content'=>'required'
        ]);
    	
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

    	$article = new Article();
    	$article->title = $req->get('title');
    	$article->content = $req->get('content');

    	$user = Auth::user();
    	$user->articles()->save($article);

    	return response()->json(['error'=>false,'message'=>'Article created!']);
    }

    //updateArticle

    function updateArticle(Request $req, $id){

    	$req->validate($req->all(),[
    		'title'=>'required',
    		'content'=>'required'
    	]);

    	$article = Article::find($id);
    	$article->title = $req->get('title');
    	$article->content = $req->get('content');

    	$article->save();
    	return response()->json(['status'=>'success','message'=>'Article updated!']);

    }

    //delete
    function deleteArticle($id){
    	$article = Article::find($id);
    	$article->delete(); 
    	return response()->json(['status'=>'success','message'=>'Article deleted!']);
    }

}
