<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WishList extends Model
{
    use SoftDeletes;

    /**
     * Атрибуты, которые должны быть преобразованы в даты.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public function getResponse()
    {
        $result = [
            'id' => $this->id,
            'name' => $this->name,
            'updatedAt' => strtotime($this->updated_at),
            'backgroundNumber' => $this->background_id,
            'userId' => $this->user_id,
            'userName' => $this->user->value('name'),
            'createdAt' => strtotime($this->created_at),
            'link' => $this->url,
            'wishItems' => [],
        ];

        $wishItems = $this->listItems->sortByDesc('updated_at');
        foreach ($wishItems as $item) {
            $result['wishItems'][] = $item->getResponse();
        }
        return $result;
    }

    public function beforeDelete()
    {
        $wishItems = $this->listItems;
        foreach ($wishItems as $item) {
            $item->beforeDelete();
            $item->delete();
        }
        $events = $this->listEvents();
        foreach ($events as $event) {
            $event->delete();
        }
    }

    public function listItems()
    {
        return $this->hasMany('App\WishListItem');
    }

    public function listEvents()
    {
        return $this->hasMany('App\Event');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function generateUrl()
    {
        $allUrls = WishList::pluck('url');
        do {
            $url = \Str::random(24);
        } while ($allUrls->contains($url));
        $this->url = $url;
    }
}
