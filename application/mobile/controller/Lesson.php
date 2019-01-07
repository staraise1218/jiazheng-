<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class Lesson extends Base{

    public function detail(){
    	$id = input('id');

    	$user_id = $this->auth->id;
    	p($user_id);

		// 获取常规课程
		$info = Db::name('lesson')
			->where('is_open', 1)
			->where('is_delete', 0)
			->where('id', $id)
			->find();

		// 判断用户是否已购买此视频
		$is_buyed = Db::name('lesson_order')
			->where('');

		$this->assign('info', $info);
    	return $this->fetch();
    }

    public function submitOrder(){
        $lesson_id = I('lesson_id');
        $user_id = I('user_id');

        // 检测数据是否存在
        $lesson = Db::name('lesson')
            ->where('id', $lesson_id)
            ->find();
        if(empty($lesson)) response_error('', '数据不存在');

        $order_sn = $this->generateOrderSn();
        $data = array(
            'lesson_id' => $lesson_id,
            'price' => $video['price'],
            'user_id' => $user_id,
            'order_sn' => $order_sn,
            'createtime' => time(),
        );

        if(Db::name('lesson_order')->insert($data)){
            $resultData = array(
                'order_sn' => $order_sn,
            );
            response_success($resultData, '下单成功');
        } else {
            response_error('', '下单失败');
        }
    }

    // 记录播放课程、集数、时间
    public function ajaxPlayedLog(){
    	$data['user_id'] = input('user_id');
    	$data['lesson_id'] = input('lesson_id');
    	$data['lesson_episode_id'] = input('lesson_episode_id');
    	$data['number'] = input('number');
    	$data['current_time'] = input('current_time');
    	$data['ended'] = input('ended');

    	$data['add_time'] = time();
    	if(Db::name('lesson_played')->insert($data)){
    		response_success('', '操作成功');
    	} else {
    		response_error('', '操作失败');
    	}
    }

   private function generateOrderSn(){
        $order_sn = date('YmdHis').mt_rand(1000, 9999);

        $count = Db::name('video_order')->where('order_sn', $order_sn)->count();
        if($count) $this->generateOrderSn();

        return $order_sn;
    }
}