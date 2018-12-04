<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class myjwt extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   

        try{

            if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
            }
        }catch(TokenExpiredException $e){
            return response()->json([
                'status' => 'error',
                'message' => 'Token has expired'
            ],410);

        }catch(TokenInvalidException $e){

            return response()->json([
                'status' => 'error',
                'message' => 'Token is invalid'
            ],403);
        }catch(JWTException $e){

             return response()->json([
                'status' => 'error',
                'message' => 'Token not provided'
            ],401);

        }
        return $next($request);
    }
}
