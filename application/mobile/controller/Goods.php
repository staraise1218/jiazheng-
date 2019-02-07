<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class Goods extends Base{

    public function goodsList(){
    	return $this->fetch();
    }
}