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
        $title = 'MyWish - составь свой список желаний!';
        $description = 'Составь свой виш лист или список желаний в сервисе MyWish';
    } else {
        $name = $list->user()->value('name');
        $ogTitle = ($list->name == '') ? "Список желаний" : $list->name;
        $ogUrl = "https://mywish.su/list/" . $listLink;
        $title = 'Виш лист ' . $list->name;
        $description = 'Список желаний от пользователя ' . $name;

    }
    return view('index', ['ogTitle' => $ogTitle, 'ogUrl' => $ogUrl, 'title' => $title, 'description' => $description]);
});

Route::get('/', function () {
    $ogTitle = "MyWish - составь свой список желаний!";
    $ogUrl = "https://mywish.su";
    $title = 'MyWish - составь свой список желаний!';
    $description = 'Составь свой виш лист или список желаний в сервисе MyWish';

    return view('index', ['ogTitle' => $ogTitle, 'ogUrl' => $ogUrl, 'title' => $title, 'description' => $description]);
});

Route::get('/{any}', function () {
    return redirect('/');
})->where('any', '.*');


