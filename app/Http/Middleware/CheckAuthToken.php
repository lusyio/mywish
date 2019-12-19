<?php

namespace App\Http\Middleware;

use Closure;

class CheckAuthToken
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
        $user = \App\User::where('id', $request->userId)->where('api_token', $request->authToken)->first();
        if (is_null($user)) {
            echo json_encode(['error' => 'invalid token']);
            exit;
        }
        return $next($request);
    }
}
