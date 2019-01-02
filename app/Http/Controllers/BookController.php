<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use Auth, Validator;

class BookController extends Controller
{
   

   //all books
    function books(){
    	$books = Book::with('author')->get();
    	return response()->json($books);
    }

    //get book
    function aBook($id){
    	$book = Book::find($id);
    	return response()->json($book);
    }

    //create book
    function newBook(Request $req){
        $this->authorize('create',Book::class);

        $validator = Validator::make($req->all(),[
            'title'=>'required|max:20',
            'description'=>'required|max:255',
            'book' => 'required'
        ]); 
    	
        if($validator->fails()){
            return response()->json($validator->errors());
        }

    	$book = new Book();
        $file = $req->file('book');
        $path = $book->storeBook($file);

    	$book->title = $req->get('title');
    	$book->description = $req->get('description');
    	$book->link = $path;

    	$user = Auth::user();
    	$user->mybooks()->save($book);

    	return response()->json(['success'=>true,'message'=>'Book created!']);
    }

    //updateBook

    function updateBook(Request $req, $id){

    	$req->validate($req->all(),[
    		'title'=>'required',
    		'content'=>'required'
    	]);
        $file = $req->file('book');
        $book = Book::find($id);

        $this->authorize('update',$book);
    	//remove book in the link and replace it with new
        if($file != null){
            //delete the existing and replace
            $book->dropBook($book->link);

            //upload new
            $newPath = $book->storeBook($file);
            $book->link = $newPath;

        }

    	$book->title = $req->get('title');
    	$book->description = $req->get('description');

    	$book->save();
    	return response()->json(['success'=>true,'message'=>'Book updated!']);

    }

    //deletebook
    function deleteBook($id){
    	//delete book in link--folder
    	$book = Book::find($id);
        $this->authorize('update',$book);
        
        if($book){
            $book->dropBook($book->link);
            $book->delete(); 
        }
    	
    	return response()->json(['success'=>true,'message'=>'Book deleted!']);
    }

}
