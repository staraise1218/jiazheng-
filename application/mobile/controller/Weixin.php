<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;
use app\mobile\Logic\WeixinPublicLogic;

class Weixin {

	// 第一步获取 code
    public function get_code(){
    	// getcode
    	$WeixinPublicLogic = new WeixinPublicLogic();
    	$authUrl = $WeixinPublicLogic->getAuthUrl();

    	header("Location:$authUrl");
    	die();
    }
    // 获取code 后的回调，获取用户信息，1先获取access_token, 2 获取用户信息
    public function get_userinfo(){
    	$code = input('code', 0);
    	// 通过code 获取access_token
    	$WeixinPublicLogic = new WeixinPublicLogic();
        $access_token_info = $WeixinPublicLogic->get_access_token($code);

        // 获取用户信息
        $userinfo = $WeixinPublicLogic->get_userinfo($access_token_info);
        p($userinfo);
    }
}