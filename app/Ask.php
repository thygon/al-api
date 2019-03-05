<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ask extends Model
{
    //

    protected $fillable = [
        'name', 'email', 'phone','category','body'
    ];
}
