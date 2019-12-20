<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function listWishLists()
    {
        return $this->hasMany('App\WishList');
    }

    public function verifyFbToken()
    {
        $facebook_user_access_token = $this->fb_token;
        $my_facebook_app_id = env('FB_APP_ID');
        $my_facebook_app_secret = env('FB_APP_SECRET');
        $facebook_application = env('FB_APP_NAME');

// get facebook access token

        $curl_facebook1 = curl_init(); // start curl
        $url = "https://graph.facebook.com/oauth/access_token?client_id=".$my_facebook_app_id."&client_secret=".$my_facebook_app_secret."&grant_type=client_credentials"; // set url and parameters
        curl_setopt($curl_facebook1, CURLOPT_URL, $url); // set the url variable to curl
        curl_setopt($curl_facebook1, CURLOPT_RETURNTRANSFER, true); // return output as string
        $output = curl_exec($curl_facebook1); // execute curl call
        curl_close($curl_facebook1); // close curl
        $decode_output = json_decode($output, true); // decode the response (without true this will crash)

        $facebook_access_token = $decode_output['access_token'];

// verify my access was legitimate
        $curl_facebook2 = curl_init();
        $url = "https://graph.facebook.com/debug_token?input_token=".$facebook_user_access_token."&access_token=".$facebook_access_token; // set url and parameters
        curl_setopt($curl_facebook2, CURLOPT_URL, $url);
        curl_setopt($curl_facebook2, CURLOPT_RETURNTRANSFER, true);
        $output2 = curl_exec($curl_facebook2);
        curl_close($curl_facebook2);
        $decode_output2 = json_decode($output2, true);
        if ($my_facebook_app_id == $decode_output2['data']['app_id'] && $decode_output2['data']['application'] == $facebook_application && $decode_output2['data']['is_valid'] == true) {
            return true;
        }
        else {
            return false;
        }
    }

    public function verifyVkToken()
    {
        $vk_user_access_token = $this->vk_token;
        $my_vk_app_id = env('FB_APP_ID');
        $my_vk_app_secret = env('FB_APP_SECRET');

// get facebook access token

        $curl_vk1 = curl_init(); // start curl
        $url = "https://api.vk.com/oauth/access_token?v=5.21&client_id=" . $my_vk_app_id . "&client_secret=" . $my_vk_app_secret . "&grant_type=client_credentials"; // set url and parameters
        curl_setopt($curl_vk1, CURLOPT_URL, $url); // set the url variable to curl
        curl_setopt($curl_vk1, CURLOPT_RETURNTRANSFER, true); // return output as string
        $output = curl_exec($curl_vk1); // execute curl call
        curl_close($curl_vk1); // close curl
        $decode_output = json_decode($output, true); // decode the response (without true this will crash)

        $vk = $decode_output['access_token'];

// verify my access was legitimate
        $curl_vk2 = curl_init();
        $url = "https://api.vk.com/method/secure.checkToken?v=5.21&token=" . $vk_user_access_token . "&client_secret=" . $my_vk_app_secret . "&access_token=" . $vk; // set url and parameters
        curl_setopt($curl_vk2, CURLOPT_URL, $url);
        curl_setopt($curl_vk2, CURLOPT_RETURNTRANSFER, true);
        $output2 = curl_exec($curl_vk2);
        curl_close($curl_vk2);
        $decode_output2 = json_decode($output2, true);
        if ($decode_output2['response']['success'] = 1 && $decode_output2['response']['user_id'] == $this->vk_id) {
            return true;
        }
        else {
            return false;
        }
    }
}
