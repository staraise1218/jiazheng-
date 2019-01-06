<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;
use app\mobile\Logic\WeixinPublicLogic;

class Weixin {

    public function get_code(){
    	// getcode
    	$WeixinPublicLogic = new WeixinPublicLogic();
    	$authUrl = $WeixinPublicLogic->getAuthUrl();

    	header("Location:$authUrl");
    	die();
    }

    public function get_access_token(){
    	$code = input('code', 0);
    	$WeixinPublicLogic = new WeixinPublicLogic();
        $access_token = $WeixinPublicLogic->get_access_token($code);
    }


}