<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class User extends Base{

    public function index(){
    	
    	return $this->fetch();
    }

    public function modify(){
    	return $this->fetch();
    }

    public function apply(){

    	
    	return $this->fetch();
    }
}