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

    protected $with = ['profile'];



    //relatives
    public function profile(){
        return $this->hasOne(Profile::class);
    }
    public function mybooks(){
        return $this->hasMany(Book::class,'author');
    }

    public function posts(){
        return $this->hasMany(Post::class,'author');
    }

    public function articles(){
        return $this->hasMany(Article::class,'author');
    }

    public function lectures(){
        return $this->hasMany(Lecture::class,'author');
    }

    public function comments(){
        return $this->hasMany(Comment::class,'commenter');
    }

    public function claps(){
        return $this->hasMany(Clap::class,'clapper');
    }

    

    //jwt
    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }
}
