<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;
use app\api\logic\FileLogic;

class User extends Base{

    public function index(){
    	
    	return $this->fetch();
    }

    public function modify(){
    	return $this->fetch();
    }

    /**
     * [uploadFile 上传头像/认证视频 app 原生调用]
     * @param [type] $[type] [文件类型 head_pic 头像 auth_video 视频认证]
     * @param  $[action] [ 默认 add 添加 edit 修改]
     * @return [type] [description]
     */
    public function changeHeadPic(){
        $user_id = $this->user_id;

        $uploadPath = UPLOAD_PATH.'head_pic/';

        $FileLogic = new FileLogic();
        $result = $FileLogic->uploadSingleFile('file', $uploadPath);
        if($result['status'] == '1'){
            $fullPath = $result['fullPath'];

            Db::name('users')->update(array('user_id'=>$user_id, 'head_pic'=>$fullPath));

            $resultdata = array('head_pic'=>$fullPath);
            response_success($resultdata, '上传成功');
            
        } else {
            response_error('', '提交失败');
        }
    }

    public function apply(){
        if(IS_POST){
            $data = array(
                'user_id' => $this->user_id,
                'exam_date' => input('post.exam_date'),
                'exam_content_id' => input('post.exam_content_id'),
                'province_id' => input('post.province_id'),
                'city_id' => input('post.city_id'),
                'location_id' => input('post.location_id'),
                'remark' => input('remark'),
                'add_time' => time(),
            );

            if(Db::name('exam_apply')->insert($data)){
                die(json_encode(array('code' => 200)));
            } else {
                die(json_encode(array('code'=>400)));
            }
        }

        // 获取考试名称
        $examName = Db::name('exam_content')
            ->where('is_open', 1)
            ->where('is_delete', 0)
            ->order('id desc')
            ->select();

        // 获取region
        $region = Db::name('region')
            ->where('parent_id', 0)
            ->select();



        $this->assign('examName', $examName);
        $this->assign('region', $region);
    	return $this->fetch();
    }

    public function ajaxGetRegion(){
        $region_id = I('region_id');

        $region = Db::name('region')->where('parent_id', $region_id)->select();

        response_success($region);
    }

    public function lesson(){
        return $this->fetch();
    }
}