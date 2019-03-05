<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Profile extends Model
{
    //

    protected $fillable = [
        'user_id', 'profile',
    ];
    protected $store = 'profiles';


    public function user(){
    	return $this->belongsTo(User::class,'user_id');
    }


     //storage

     //storage

    public function storeImage($file){
        $path = Storage::disk('mydisk')->putFile($this->store, $file);
        return $path;
    }

    //delete file
    public function dropImage($path){
        Storage::disk('mydisk')->delete($path);
    }
}
