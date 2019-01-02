<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //no likes or comments

    protected $fillable = [
        'title', 'content','author','isPublished'
    ];

    protected $with = ['author'];

    public function publish(){
    	return $this->isPublished = true; 
    }

    public function unPublish(){
    	return $this->isPublished = false; 
    }


    public function author(){
    	return $this->belongsTo(User::class,'id');
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
