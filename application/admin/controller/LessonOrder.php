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

    public function add(){
        if($this->request->isPost()){
            $data = I('post.');
            if(trim($data['title']) == '') $this->ajaxReturn(['status' => 0, 'msg' => '参数错误', 'result' => ['title' =>'标题不能为空']]);

            $data['createtime'] = time();
            if(M('lesson')->insert($data)){
                $this->ajaxReturn(['status' => 1, 'msg' => '操作成功']);
            } else {
                $this->ajaxReturn(['status' => -1, 'msg' => '操作失败']);
            }
        }

        
        return $this->fetch();
    }
}