<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class Article extends Controller{

    public function about(){
    	$info = Db::name('article')
    		->where('article_id', 1)
    		->where('is_open', 1)
    		->find();
    	if($info['content']) $info['content'] = htmlspecialchars_decode($info['content']);

		$this->assign('info', $info);
    	return $this->fetch();
    }
}