<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function wishList()
    {
        return $this->belongsTo('App\WishList');
    }

    public function getResponse()
    {
        $result = [
            'id' => $this->id,
            'type' => $this->action,
            'userName' => $this->user()->value('name'),
            'time' => strtotime($this->updated_at),
            'wishListName' => ''
        ];
        if ($this->action != 'user') {
            $result['wishListName'] = $this->wishList()->value('name');
        }
        return $result;
    }
}
