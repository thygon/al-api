<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    //

    protected $fillable = [
        'body', 'commentable_id', 'commentable_type','commenter',
    ];

    protected $with = ['user'];

    public function commentable()
    {
        return $this->morphTo();
    }

    public function user(){
    	return $this->belongsTo(User::class,'commenter');
    }
}
