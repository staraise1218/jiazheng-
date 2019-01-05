<?php

namespace app\api\controller;

use think\Db;
use app\api\logic\FileLogic;
use app\api\logic\GeographyLogic;

class WeixinPublic extends Base {

	public function __construct(){
		// 设置所有方法的默认请求方式
		$this->method = 'POST';

		parent::__construct();
	}

	// 微信公众平台接口配置验证
	public function configAuth(){
		$params = array (
		  	'signature' => 'a6049108144ec637763c89bedf06159369f8c640',
		  	'echostr' => '5734603926770483194',
		  	'timestamp' => '1546672090',
		  	'nonce' => '1163146367',
		);

		// $params = input('get.');
		if(empty($params)) return false;


		$signature  = $params['signature'];
		$timestamp   = $params['timestamp'];
		$nonce  = $params['nonce'];
		$echostr  = $params['echostr'];
		$token  = 'jiazheng';

		$list = array($nonce,$timestamp,$token);
		sort($list, SORT_STRING);
		$list = implode('', $list);

		if(sha1($list) == $signature){
			echo $echostr;
		} else {
			return false;
		}
	}

}