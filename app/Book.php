<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Book extends Model
{
    

    protected $fillable = [
        'title', 'description', 'link','author'
    ];


    public function author(){
    	return $this->belongsTo('App\User','author');
    }

    //storage

    public function storeBook($file){
    	$path = Storage::disk('mydisk')->putFile('books', $file);
    	return $path;
    }

    //delete file
    public function dropBook($path){
    	Storage::disk('mydisk')->delete($path);
    }

}
