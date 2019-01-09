<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class Aunt extends Base{

    public function index(){
    	
    	return $this->fetch();
    }

    public function detail(){
    	
    	return $this->fetch();
    }
}