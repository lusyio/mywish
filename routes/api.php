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

Route::post('/auth', function (Request $request) {

    $user = new \App\User();
    if (isset($request->social)) {
        switch ($request->social) {
            case 'fb':
                $user = \App\User::where('fb_id', $request->socialUserId)->first();
                if (is_null($user)) {
                    $user = new \App\User();
                    $user->fb_id = $request->socialUserId;
                    $user->fb_token = $request->token;
                    $user->name = $request->name;
                } else {
                    $user->fb_token = $request->token;
                }
                break;
            default:
                return json_encode(['error' => 'unknown social']);
        }
        $user->api_token = Str::random(60);
        $user->save();
        $result = [
            'error' => '',
            'userId' => $user->id,
            'tokenAuth' => $user->api_token,
        ];
        return json_encode($result);
    } else {
        return json_encode(['error' => 'no social']);
    }
});
