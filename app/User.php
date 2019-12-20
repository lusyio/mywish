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

///////////////////////////////////////
// prep Facebook verification
///////////////////////////////////////

// set variables
        $facebook_user_access_token = $this->fb_token;
        $my_facebook_app_id = '563234647569569';
        $my_facebook_app_secret = '5789f309025ee983e188282da9a1433c';
        $facebook_application = 'mywish'; // in my case 'domain.com', as set up in Facebook

///////////////////////////////////////
// get facebook access token
///////////////////////////////////////
        $curl_facebook1 = curl_init(); // start curl
        $url = "https://graph.facebook.com/oauth/access_token?client_id=".$my_facebook_app_id."&client_secret=".$my_facebook_app_secret."&grant_type=client_credentials"; // set url and parameters
        curl_setopt($curl_facebook1, CURLOPT_URL, $url); // set the url variable to curl
        curl_setopt($curl_facebook1, CURLOPT_RETURNTRANSFER, true); // return output as string
        $output = curl_exec($curl_facebook1); // execute curl call
        curl_close($curl_facebook1); // close curl
        $decode_output = json_decode($output, true); // decode the response (without true this will crash)

// store access_token
        $facebook_access_token = $decode_output['access_token'];

///////////////////////////////////////
// verify my access was legitimate
///////////////////////////////////////
        $curl_facebook2 = curl_init(); // start curl
        $url = "https://graph.facebook.com/debug_token?input_token=".$facebook_user_access_token."&access_token=".$facebook_access_token; // set url and parameters
        curl_setopt($curl_facebook2, CURLOPT_URL, $url); // set the url variable to curl
        curl_setopt($curl_facebook2, CURLOPT_RETURNTRANSFER, true); // return output as string
        $output2 = curl_exec($curl_facebook2); // execute curl call
        curl_close($curl_facebook2); // close curl
        $decode_output2 = json_decode($output2, true); // decode the response (without true this will crash)
        if ($my_facebook_app_id == $decode_output2['data']['app_id'] && $decode_output2['data']['application'] == $facebook_application && $decode_output2['data']['is_valid'] == true) {
            return true;
        }
        else {
            return false;
        }
    }
}
