<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class Index extends Base{

    public function about(){
    	$info = Db::name('article')
    		->where('article_id', 1)
    		->where('is_open', 1)
    		->find();


		$this->assign('info', $info);
    	return $this->fetch();
    }
}