<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    //post is an article with an image, comment, replies plus likes and dislikes

    protected $fillable = [
        'title', 'content', 'url','author'
    ];


    public function author(){
    	return $this->belongsTo('App\User','id');
    }

    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }


    public function claps()
    {
        return $this->morphMany('App\Clap', 'clapable');
    }


    //storage

    public function storeImage($file){
        $path = Storage::disk('mydisk')->putFile('posts', $file);
        return $path;
    }

    //delete file
    public function dropImage($path){
        Storage::disk('mydisk')->delete($path);
    }

}
