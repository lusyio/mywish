<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WishListItem extends Model
{
    //
    public function getResponse()
    {
        $result = [
            'id' => $this->id,
            'title' => $this->name,
            'url' => strtotime($this->updated_at),
            'order' => $this->order,
            'listId' => $this->wish_list_id,
            'picture' => $this->image_url,
        ];
        return $result;
    }
}
