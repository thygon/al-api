<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clap extends Model
{
    //

    protected $fillable = [
        'clap', 'clapable_id', 'clapable_type','clapper',
    ];

    public function clapable()
    {
        return $this->morphTo();
    }

    public function user(){
    	return $this->belongsTo('App\User','clapper');
    }
}
