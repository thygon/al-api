<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lecture;
use Auth;

class LectureController extends Controller
{
    
    //all lectures
    function lectures(){
    	$lectures = Lecture::with('author')->get();
    	return response()->json($lectures);
    }

    //get
    function aLecture($id){
    	$lecture = Lecture::find($id);
    	return response()->json($lecture);
    }

    //create
    function newLecture(Request $req){
    	$req->validate($req->all(),[
    		'title'=>'required',
    		'description'=>'required',
    	]);

    	$lecture = new Le$lecture();
    	$lecture->title = $req->get('title');
    	$lecture->description = $req->get('description');
    	$lecture->link = 'path';

    	$user = Auth::user();
    	$user->author()->save($lecture);

    	return response()->json(['success'success,'message'=>'Lecture created!']);
    }

    //update

    function updateLecture(Request $req, $id){

    	$req->validate($req->all(),[
    		'title'=>'required',
    		'description'=>'required'
    	]);

    	$lecture = Lecture::find($id);
    	$lecture->title = $req->get('title');
    	$lecture->description = $req->get('description');
    	$lecture->link = 'path';

    	$lecture->save();
    	return response()->json(['success'=>true,'message'=>'Lecture updated!']);

    }

    //delete
    function deleteLecture($id){
    	//delete book in link--folder
    	$lecture = Lecture::find($id);
    	$lecture->delete(); 
    	return response()->json(['success'=>true,'message'=>'Lecture deleted!']);
    }
}
