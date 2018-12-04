<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //no likes or comments

    protected $fillable = [
        'title', 'content','author'
    ];


    public function author(){
    	return $this->belongsTo('App/User','id');
    }
}
