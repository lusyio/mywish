<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class WishListItem extends Model
{
    //
    public function getResponse()
    {
        if (is_null($this->url) || $this->url == '') {
            $url = '';
        } elseif (preg_match('~^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$~', $this->url)) {
            $url = $this->url;
        } elseif (preg_match('~([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$~', $this->url)) {
            $url = 'http://' . $this->url;
        } else {
            $url = '';
        }
        $result = [
            'id' => $this->id,
            'title' => $this->name,
            'url' => $url,
            'order' => $this->order,
            'listId' => $this->wish_list_id,
            'picture' => $this->image_url,
            'updatedAt' => strtotime($this->updated_at),
        ];
        return $result;
    }

    public function list()
    {
        return $this->belongsTo('App\WishList');
    }

    public function beforeDelete()
    {
        $localPath = preg_replace('~^https://mywish.su/public/storage/images/~', 'public/images/', $this->image_url);
        if (Storage::disk('local')->exists($localPath)) {
            Storage::delete($localPath);
        }
    }
}
