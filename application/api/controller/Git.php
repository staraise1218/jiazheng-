<?php

namespace app\api\controller;

use think\Db;

class Git extends Base {

	public function __construct(){
		// 设置所有方法的默认请求方式
		$this->method = 'POST';

		parent::__construct();
	}

	public function pull(){
		echo exec("cd /home/www/jiazheng; git pull");
	}

}