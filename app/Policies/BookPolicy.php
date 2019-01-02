<?php

namespace App\Policies;

use App\User;
use App\Book;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    public function create(User $user){
        return $user->isAdmin;
    }


    public function update(User $user,Book $book){
        return $user->id === $book->author;
    }
}
