<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/logout', function () {
    return view('logout');
});

Route::get('/list/{listLink}', function ($listLink) {
    $list = \App\WishList::where('url', $listLink)->first();
    if (is_null($list)) {
        $ogTitle = "MyWish - составь свой список желаний!";
        $ogUrl = "https://mywish.su";
    } else {
        $ogTitle = ($list->name == '') ? "Список желаний" : $list->name;
        $ogUrl = "https://mywish.su/list/" . $listLink;
    }
    return view('index', ['ogTitle' => $ogTitle, 'ogUrl' => $ogUrl]);
});

Route::get('/', function () {
    $ogTitle = "MyWish - составь свой список желаний!";
    $ogUrl = "https://mywish.su";
    return view('index', ['ogTitle' => $ogTitle, 'ogUrl' => $ogUrl]);
});

Route::get('/{any}', function () {
    return redirect('/');
})->where('any', '.*');


