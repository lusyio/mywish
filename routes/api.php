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
        $isRegistered = false;
        switch ($request->social) {
            case 'fb':
                $user = \App\User::where('fb_id', $request->socialUserId)->first();
                if (is_null($user)) {
                    $user = new \App\User();
                    $user->fb_id = $request->socialUserId;
                    $user->fb_token = $request->token;
                    if(!$user->verifyFbToken()) {
                        return json_encode(['error' => 'invalid token']);
                    }
                    $user->name = $request->name;
                    $user->api_token = Str::random(60);
                    $user->save();
                    $isRegistered = true;
                } else {
                    $user->fb_token = $request->token;
                    if(!$user->verifyFbToken()) {
                        return json_encode(['error' => 'invalid token']);
                    }
                    $user->api_token = Str::random(60);
                    $user->save();
                }
                break;
            case 'vk':
                $user = \App\User::where('vk_id', $request->socialUserId)->first();
                if (is_null($user)) {
                    $user = new \App\User();
                    $user->vk_id = $request->socialUserId;
                    $user->vk_token = $request->token;
                    if(!$user->verifyVkToken()) {
                        return json_encode(['error' => 'invalid token']);
                    }
                    $user->name = $request->name;
                    $user->api_token = Str::random(60);
                    $user->save();
                    $isRegistered = true;
                } else {
                    $user->vk_token = $request->token;
                    if(!$user->verifyVkToken()) {
                        return json_encode(['error' => 'invalid token']);
                    }
                    $user->api_token = Str::random(60);
                    $user->save();
                }
                break;
            default:
                return json_encode(['error' => 'unknown social']);
        }
        if ($isRegistered) {
            $newList = new \App\WishList();
            $newList->user_id = $user->id;
            $newList->name = 'Ваш первый список';
            $newList->background_id = 0;
            $newList->generateUrl();
            $newList->save();
            $event = new \App\Event();
            $event->action = 'user';
            $event->user_id = $user->id;
            $event->save();
        }
        $result = [
            'error' => '',
            'userId' => $user->id,
            'authToken' => $user->api_token,
        ];
        return json_encode($result);
    } else {
        return json_encode(['error' => 'no social']);
    }
});

Route::post('/list/add', function (Request $request) {
    $user = \App\User::where('id', $request->userId)->first();
    $newList = new \App\WishList();
    $newList->user_id = $request->userId;
    $newList->name = 'Новый список';
    $newList->background_id = 0;
    $newList->generateUrl();
    $newList->save();
    return json_encode($newList->getResponse());
})->middleware(\App\Http\Middleware\CheckAuthToken::class);

Route::post('/list/update', function (Request $request) {
    $list = \App\WishList::where('id', $request->id)->where('user_id', $request->userId)->first();
    if (is_null($list)) {
        return json_encode(['error' => 'no lists']);
    }
    if ($list->title_changed == 0) {
        $addEvent = true;
    } else {
        $addEvent = false;
    }
    $list->name = $request->name;
    $list->background_id = $request->backgroundNumber;
    $list->save();
    if (($list->name != 'Новый список' && $list->name != 'Ваш первый список') && $addEvent) {
        $event = new \App\Event();
        $event->action = 'list';
        $event->user_id = $request->userId;
        $event->wish_list_id = $list->id;
        $event->save();
        $list->title_changed = 1;
        $list->save();
    }
    return json_encode($list->getResponse());
})->middleware(\App\Http\Middleware\CheckAuthToken::class);

Route::post('/list/delete', function (Request $request) {
    $list = \App\WishList::where('id', $request->id)->where('user_id', $request->userId)->first();
    if (is_null($list)) {
        return json_encode(['error' => 'no lists']);
    }
    $list->delete();
    return json_encode(['error' => '', 'status' => 'ok']);
})->middleware(\App\Http\Middleware\CheckAuthToken::class);

Route::post('/item/add', function (Request $request) {
    $list = \App\WishList::where('id', $request->listId)->where('user_id', $request->userId)->first();
    if (is_null($list)) {
        return json_encode(['error' => 'no lists']);
    }
    $item = new \App\WishListItem();
    $item->wish_list_id = $request->listId;
    $item->name = '';
    $item->image_url = '';
    $item->url = '';
    $item->order = 0;
    $item->save();
    return json_encode($item->getResponse());
})->middleware(\App\Http\Middleware\CheckAuthToken::class);

Route::post('/item/update', function (Request $request) {
    $item = \App\WishListItem::where('id', $request->id)->first();
    if (is_null($item) || is_null(\App\WishList::where('id', $item->wish_list_id)->where('user_id', $request->userId)->first())) {
        return json_encode(['error' => 'no lists']);
    }
    $item->name = $request->name;
    if (!is_null($request->file('picture'))) {
        $item->image_url = $request->file('picture')->store('images');
    }
    $item->url = $request->url;
    $item->image_url;
    $item->save();
    return json_encode($item->getResponse());
})->middleware(\App\Http\Middleware\CheckAuthToken::class);

Route::post('/item/delete', function (Request $request) {
    $item = \App\WishListItem::where('id', $request->id)->first();
    if (is_null($item) || is_null(\App\WishList::where('id', $item->wish_list_id)->where('user_id', $request->userId)->first())) {
        return json_encode(['error' => 'no lists']);
    }
    $item->delete();
    return json_encode(['error' => '', 'status' => 'ok']);
})->middleware(\App\Http\Middleware\CheckAuthToken::class);

Route::post('/lists', function (Request $request) {
    $user = \App\User::where('id', $request->userId)->first();
    $lists = $user->listWishLists->sortByDesc('updated_at');
    $result = [
        'count' => $lists->count(),
        'defaultListId' => 0,
        'items' => [],
    ];
    foreach ($lists as $list) {
        $result['items'][] = $list->getResponse();
    }
    if (count($result['items']) > 0) {
        $result['defaultListId'] = $result['items'][0]['id'];
    }
    return json_encode($result);
})->middleware(\App\Http\Middleware\CheckAuthToken::class);

Route::get('/list/{link}', function ($link) {
    $list = \App\WishList::withTrashed()->where('url', $link)->first();
    if (!is_null($list)) {
        if (!$list->trashed()){
            return json_encode(['status' => 'ok', 'wishList' => $list->getResponse()]);
        } else {
            return json_encode(['status' => 'deleted', 'wishList' => []]);
        }
    } else {
        return json_encode(['status' => 'none', 'wishList' => []]);
    }
});

Route::post('/share', function (Request $request) {
    $list = \App\WishList::where('id', $request->id)->where('user_id', $request->userId)->first();
    if (is_null($list)) {
        return json_encode(['error' => 'no lists']);
    }
    if (!in_array($request->social, ['fb', 'vk', 'ok'])) {
        return json_encode(['error' => 'wrong social']);
    }
    $event = \App\Event::where('user_id', $request->userId)->where('action', $request->social)->first();
    if (is_null($event)) {
        $event = new \App\Event();
        $event->action = $request->social;
        $event->user_id = $request->userId;
        $event->wish_list_id = $list->id;
    }
    $event->save();
    return json_encode(['error' => '', 'status' => 'ok']);
})->middleware(\App\Http\Middleware\CheckAuthToken::class);

Route::get('/events', function () {
    $eventsCount = \App\Event::count();
    $events = \App\Event::orderBy('updated_at', 'desc')
        ->take(5)
        ->get();
    $result = [
        'count' => $eventsCount,
        'events' => [],
    ];
    foreach ($events as $event) {
        $result['events'][] = $event->getResponse();
    }
    return $result;
});
