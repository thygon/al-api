<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    //post is an article with an image, comment, replies plus likes and dislikes

    protected $fillable = [
        'title', 'content', 'url','author','isPublished'
    ];

    protected $with = ['author','claps','comments'];

    

    public function publish(){
        return $this->isPublished = true; 
    }

    public function unPublish(){
        return $this->isPublished = false; 
    }

    
    public function author(){
    	return $this->belongsTo('App\User','id');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }


    public function claps()
    {
        return $this->morphMany(Clap::class, 'clapable');
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

    //scopes
    public function scopePublished($query)
    {
        return $query->where('isPublished', 1);
    }


    public function scopeUnPublished($query)
    {
        return $query->where('isPublished', 1);
    }

}
