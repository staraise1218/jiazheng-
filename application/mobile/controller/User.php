<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class User extends Base{

    public function index(){
    	
    	// 获取banner
		$user_id = $this->user_id;
		$info = Db::name('users')
			->where('user_id', $user_id)
			->where('is_lock', 0)
			->find();

		$this->assign('info', $info);
    	return $this->fetch('index');
    }
}