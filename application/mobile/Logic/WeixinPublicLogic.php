<?php
namespace app\mobile\logic;

use think\Db;

class WeixinPublicLogic {
	private $appid;
	private $appsecret;

	public function __construct(){
		$this->appid = 'wxe6cad80231c1a3e8';
		$this->appsecret = '9ef9f2c3567269eb5a1d66aa9b92c356';
	}

	public function getAuthUrl(){
		$authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    	$params = array(
    		'appid' => $this->appid,
    		'redirect_uri' => urlencode('http://jiazheng.staraise.com.cn'),
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
		$redirect_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$this->appid.'&secret='.$this->appsecret.'&code='.$code.'&grant_type=authorization_code';
p($redirect_url);
		header("Location:$redirect_url");
	}
}