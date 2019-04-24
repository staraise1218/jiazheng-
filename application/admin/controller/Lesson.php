<?php

namespace app\admin\controller;

use think\Page;
use think\Paginator;

class Lesson extends Base {

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

    public function edit(){
        if($this->request->isPost()){
            $data = I('post.');
            if(trim($data['title']) == '') $this->ajaxReturn(['status' => 0, 'msg' => '参数错误', 'result' => ['title' =>'标题不能为空']]);

            $id = $data['id'];

            if(M('lesson')->where('id', $id)->save($data)){
                $this->ajaxReturn(['status' => 1, 'msg' => '操作成功']);
            } else {
                $this->ajaxReturn(['status' => -1, 'msg' => '操作失败']);
            }
        }
        $id = I('id');
        $info = M('lesson')->where('id', $id)->find();

        $this->assign('info', $info);
        $this->assign('categoryList', $categoryList);
        return $this->fetch();
    }

    public function del(){
        $id = I('id');

        if(false !== M('lesson')->where('id', $id)->update(array('is_delete'=>1))){
            $this->ajaxReturn(['status' => 1, 'msg' => '操作成功']);
        } else {
            $this->ajaxReturn(['status' => 0, 'msg' => '操作失败']);
        }
    }

    // 获取用户的播放课程
    public function lessonPlayed(){
        $user_id = I('user_id');

        $where = array(
            'lp.user_id' => $user_id,
        );

        $keywords = trim(I('keywords'));
        $keywords && $where['title'] = array('like', "%$keywords%");

        $list = M('lesson_played')->alias('lp')
            ->join('lesson l', 'l.id=lp.lesson_id')
            ->where($where)
            ->group('lesson_id')
            ->order('lp.id desc')
            ->field('lesson_id, title')
            ->paginate(20, false, ['page'=>$page, 'path'=>U('admin/lesson/lessonPlayed', array('user_id'=>$user_id))]);

        $this->assign('user_id', $user_id);
        $this->assign('keywords', $keywords);
        $this->assign('list',$list);
        return $this->fetch();
    }

    // 获取用户的播放课程集数记录
    public function lessonEpisodePlayed(){
        $user_id = I('user_id');
        $lesson_id = I('lesson_id');

        $where = array(
            'lp.user_id' => $user_id,
        );

        $list = M('lesson_episode')->alias('le')
            ->where('le.lesson_id', $lesson_id)
            ->where('le.is_delete', 0)
            ->order('le.number asc')
            ->field("le.id lesson_episode_id, le.title, number") 
            // ->fetchSql(true)
            ->select();

        if(!empty($list)){
            foreach ($list as &$item) {
                $count = M('lesson_played')
                    ->where('user_id', $user_id)
                    ->where('lesson_episode_id', $item['lesson_episode_id'])
                    ->count();
                $item['is_played'] = $count ? 1 : 0;
            }
        }

        $this->assign('user_id', $user_id);
        $this->assign('list',$list);
        return $this->fetch();
    }
}