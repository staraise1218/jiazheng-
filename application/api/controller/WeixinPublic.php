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
// 		$params = array (
//   'signature' => '9d32c6da00aea54cedc9a8d14e2c73d0ce159233',
//   'echostr' => '1442968030760087503',
//   'timestamp' => '1546658631',
//   'nonce' => '1235037838',
// );

		$params = input('get.');
		if(empty($params)) return false;


		$signature  = $params['signature'];
		$timestamp   = $params['timestamp'];
		$nonce  = $params['nonce'];
		$echostr  = $params['echostr'];
		$token  = 'jiazheng';
		$list = array($nonce,$timestamp,$token);
		sort($list, SORT_STRING);
		$list = implode(',', $list);

		if(sha1($list) == $signature){
			echo $echostr;
		} else {
			return false;
		}
	}

}