<?php
namespace app\mobile\logic;

use think\Db;

class WeixinPublicLogic {
	private $appid;
	private $appsecret;

	public function __construct(){
		$this->appid = 'wx3793044243501a14';
		$this->appsecret = '2ddc2475cfd7e4e92e71001a8ad6658c';
	}

	public function getAuthUrl(){
		$authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    	$params = array(
    		'appid' => $this->appid,
    		'redirect_uri' => urlencode('http://jiazheng.staraise.com.cn/index.php/mall/weixin/get_userinfo'),
			'response_type' => 'code',
			'scope' => 'snsapi_userinfo',
			'state' => '1234',
    	);

    	$urlParams = '?';
    	foreach ($params as $k => $v) {
    		$urlParams .= $k.'='.$v.'&';
    	}
    	$authUrl .= rtrim($urlParams, '&').'#wechat_redirect';
    	return $authUrl;
	}

	public function get_access_token($code){
		$url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$this->appid.'&secret='.$this->appsecret.'&code='.$code.'&grant_type=authorization_code';

		$result = file_get_contents($url);
		return json_decode($result, true);
	}

	public function get_userinfo($access_token_info){
		$url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token_info['access_token'].'&openid='.$access_token_info['openid'].'&lang=zh_CN';

		$result = file_get_contents($url);
		return json_decode($result, true);
	}
}