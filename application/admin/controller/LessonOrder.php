<?php

namespace app\admin\controller;

use think\Page;
use think\Paginator;

class LessonOrder extends Base {

    public function index(){
        $page = I('page', 1);
        
        $where = "is_delete = 0";
        $keywords = trim(I('keywords'));
        $keywords && $where.=" and title like '%$keywords%' ";
       
        $list = M('lesson')
            ->where($where)
            ->order('id desc')
            ->paginate(20, false, ['page'=>$page, 'path'=>U('admin/lesson/index')]);


        $this->assign('list',$list);// 赋值数据集
        
        return $this->fetch();
    }
}