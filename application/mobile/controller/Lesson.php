<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class Lesson extends Base{

    public function detail(){
    	$id = input('id');

		// 获取常规课程
		$info = Db::name('lesson')
			->where('is_open', 1)
			->where('is_delete', 0)
			->where('id', $id)
			->find();

		$this->assign('info', $info);
    	return $this->fetch();
    }
}