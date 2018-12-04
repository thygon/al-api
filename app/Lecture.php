<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    //

    protected $fillable = [
        'title', 'description', 'link','author'
    ];


    public function author(){
    	return $this->belongsTo('App/User','id');
    }
}
