<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','isAdmin'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    //relatives
    public function mybooks(){
        return $this->hasMany('App\Book','author');
    }

    public function posts(){
        return $this->hasMany('App\Post','author');
    }

    public function articles(){
        return $this->hasMany('App\Article','author');
    }

    public function lectures(){
        return $this->hasMany('App\Lecture','author');
    }

    public function comments(){
        return $this->hasMany('App\Comment','commenter');
    }

    public function claps(){
        return $this->hasMany('App\Clap','clapper');
    }

    //jwt
    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }
}
