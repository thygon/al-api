<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::prefix('/app')->group(function () {

    Route::get('/', function () {
       return ['App'=>'Al-hashmi App api','Message'=>'Working great'];
    });
    //ask
    Route::post('/ask','AskController@ask');

    //user
    Route::post('/register','AuthController@register');
    Route::post('/login','AuthController@login');
    Route::post('/logout','AuthController@logout')->middleware('jwt.auth');
    Route::get('/user','AuthController@user')->middleware('jwt.auth');
    Route::post('/user/profile','AuthController@setProfile')->middleware('jwt.auth');
    Route::post('/recover','AuthController@recover');
    Route::post('/reset/{token}','AuthController@reset');

    //admin get quiz notifications
    Route::get('/notifies','AuthController@getNotifications')->middleware('jwt.auth');

    //post
    Route::get('/posts','PostController@posts');
    Route::get('/post/{id}','PostController@aPost');
    Route::post('/post/new','PostController@newPost')->middleware('jwt.auth');
    Route::put('/post/update/{id}','PostController@updatePost')->middleware('jwt.auth');
    Route::delete('/post/delete/{id}','PostController@deletePost')->middleware('jwt.auth');

    
    //comment
    Route::post('/comment/{id}','PostController@comment')->middleware('jwt.auth');
    Route::post('/comment/update/{id}','PostController@updateComment')
           ->middleware('jwt.auth');
    Route::post('/comment/delete/{id}','PostController@deleteComment')
           ->middleware('jwt.auth');

    //clap
    Route::post('/like/{id}','PostController@like')->middleware('jwt.auth');
    Route::post('/dislike/{id}','PostController@dislike')->middleware('jwt.auth');

    //book
    Route::get('/books','BookController@books');
    Route::get('/book/{id}','BookController@aBook');
    Route::post('/book/new','BookController@newBook')->middleware('jwt.auth');
    Route::put('/book/update/{id}','BookController@updateBook')->middleware('jwt.auth');
    Route::delete('/book/delete/{id}','BookController@deleteBook')->middleware('jwt.auth');

    //article
    Route::get('/articles','ArticleController@articles');
    Route::get('/article/{id}','ArticleController@aArticle');
    Route::post('/article/new','ArticleController@newArticle')->middleware('jwt.auth');
    Route::put('/article/update/{id}','ArticleController@updateArticle')->middleware('jwt.auth');
    Route::delete('/article/delete/{id}','ArticleController@deleteArticle')->middleware('jwt.auth');

    //lecture
    Route::get('/lectures','PostController@lectures');
    Route::get('/lecture/{id}','PostController@aLecture');
    Route::post('/lecture/new','PostController@newLecture')->middleware('jwt.auth');
    Route::put('/lecture/{id}/update','PostController@updateLecture')->middleware('jwt.auth');
    Route::delete('/lecture/{id}/delete','PostController@deleteLecture')->middleware('jwt.auth');
});
