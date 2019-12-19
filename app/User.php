<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function listWishLists()
    {
        return $this->hasMany('App\WishList');
    }
}
