<?php

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class Lesson extends Base{

    public function detail(){
    	$id = input('param.id');

    	$user_id = $this->user_id;

		// 获取常规课程
		$info = Db::name('lesson')
			->where('is_open', 1)
			->where('is_delete', 0)
			->where('id', $id)
			->find();

		// 判断用户是否已购买此视频
		$is_buyed = Db::name('lesson_order')
			->where('user_id', $user_id)
			->where('lesson_id', $id)
			->where('paystatus', 1)
			->count()
			;
		$is_buyed = $is_buyed > 0 ? 1 : 0;
        // 如果课程免费
        if($info['price'] == 0) $is_buyed = 1;

        // 判断是否收藏
        $is_collect = Db::name('user_collect')
                        ->where('user_id', $user_id)
                        ->where('table_id', $id)
                        ->where('table_name', 'lesson')
                        ->count();
        $is_collect = $is_collect > 0 ? 1 : 0;

        

        $this->assign('is_buyed', $is_buyed);
        $this->assign('is_collect', $is_collect);
        $this->assign('info', $info);
        $this->assign('user', $user);
    	return $this->fetch();
    }

    /**
     * [episode 课程集数]
     * @return [type] [description]
     */
    public function episode(){
    	$lesson_id = input('param.lesson_id');
    	// $page = input('param.page', 1);
    	$user_id = $this->user_id;

		// 判断用户是否已购买此视频
		$lesson_order = Db::name('lesson_order')
			->where('user_id', $user_id)
			->where('lesson_id', $lesson_id)
			->where('paystatus', 1)
			->order('id desc')
			->find();

		if(empty($lesson_order)){
			$this->error('您尚未购买');
		}

		$limit = 15; // 每页显示15条
		$totalCount = Db::name('lesson_episode')->where('lesson_id', $lesson_id)->where('is_delete', 0)->count();

		$pageCount = ceil($totalCount/$limit); // 总页数

		// 分页获取所有的集
		for($page = 1; $page < $pageCount + 1; $page++){
			$episodeList = Db::name('lesson_episode')
				->where('lesson_id', $lesson_id)
                ->where('is_delete', 0)
				->order('number asc')
				->limit($limit)
				->page($page)
				->select();
			$this->assign('episodeList_page_'.$page, $episodeList);
		}

		// 获取该视频最后一次播放
		$lastplay = Db::name('lesson_played')->alias('lp')
			->join('lesson_episode le', 'lp.lesson_episode_id=le.id')
			->where('lp.user_id', $user_id)
			->where('lp.lesson_id', $lesson_id)
			->where('lp.order_id', $lesson_order['id'])
			->order('lp.number desc')
			->field('le.title, lp.current_time, lp.lesson_episode_id, lp.number')
			->find();

		$this->assign('limit', $limit);
		$this->assign('pageCount', $pageCount);
		// $this->assign('episodeList', $episodeList);
		$this->assign('order_id', $lesson_order['id']);
		$this->assign('lesson_id', $lesson_id);
		$this->assign('lastplay', $lastplay);
		return $this->fetch();
    }

    public function ajaxSubmitOrder(){
        $lesson_id = I('lesson_id');
        $user_id = $this->user_id;

        // 检测数据是否存在
        $lesson = Db::name('lesson')
            ->where('id', $lesson_id)
            ->find();
        if(empty($lesson)) response_error(array('status'=>1), '数据不存在');

        // 检测用户资料是否完善
        $user = Db::name('users')->where('user_id', $user_id)->find();

        if($user['head_pic'] == '' || $user['fullname']=='' || $user['mobile']=='' || $user['ID_number']==''){
            response_error(array('status'=>2), '请完善个人资料');
        }

        // 检测是否购买
        $is_buy = Db::name('lesson_order')
            ->where('user_id', $user_id)
            ->where('lesson_id', $lesson_id)
            ->where('paystatus', 1)
            ->count();
        if($is_buy) response_error(array('status'=>3), '您已购买');

        $order_sn = $this->generateOrderSn();
        $data = array(
            'lesson_id' => $lesson_id,
            'price' => $lesson['price'],
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
            response_error(array('status'=>4), '下单失败');
        }
    }

    public function payMethod(){
        $order_sn = I('order_sn');
        $lesson_id = I('lesson_id');
        // 获取订单信息
        $order = Db::name('lesson_order')->where('order_sn', $order_sn)->find();
        if($order['paystatus'] == '1') $this->error('已支付');

        // 获取用户信息
        $user = Db::name('users')->where('user_id', $this->user_id)->find();

        $this->assign('openid', $user['openid']);
        $this->assign('order_sn', $order_sn);
        $this->assign('price', $order['price']);
        $this->assign('lesson_id', $lesson_id);
        return $this->fetch();
    }

    // 记录播放课程、集数、时间
    public function ajaxPlayedLog(){
    	$data['user_id'] = $this->user_id;
    	// $data['order_id'] = input('order_id');
    	$data['lesson_id'] = input('lesson_id');
    	$data['lesson_episode_id'] = input('lesson_episode_id');
    	// $data['number'] = input('number');
    	// $data['current_time'] = input('current_time');
    	// $data['ended'] = input('ended');

    	// 判断是否记录

    	$count = Db::name('lesson_played')
    		->where('user_id', $data['user_id'])
    		// ->where('order_id', $data['order_id'])
    		->where('lesson_id', $data['lesson_id'])
    		->where('lesson_episode_id', $data['lesson_episode_id'])
    		->count();
    	if($count){
    		/*$updatedata = array(
				'number' => $data['number'],
				'current_time' => $data['current_time'],
				'ended' => $data['ended'],
    		);
    		Db::name('lesson_played')
    			->where('user_id', $data['user_id'])
	    		->where('order_id', $data['order_id'])
	    		->where('lesson_id', $data['lesson_id'])
	    		->where('lesson_episode_id', $data['lesson_episode_id'])
    			->update($updatedata);*/
    	} else {
    		$data['add_time'] = time();
    		Db::name('lesson_played')->insert($data);
    	}

    	response_success('', '操作成功');

    }

    // 获取播放历史
    public function ajaxGetPlayHistory(){

    }

    /**
     * [collect 收藏]
     * @param table_name [lesson 课程]
     * @return [type] [description]
     */
    public function ajaxCollect(){
        $data['table_id'] = input('lesson_id');
        $data['user_id'] = $this->user_id;
        $data['table_name'] = 'lesson';

        if(M('user_collect')->where($data)->count()) response_success('', '已收藏');

        $data['add_time'] = time();
        if( false !== M('user_collect')->insert($data)){
            response_success('', '收藏成功');
        } else {
            response_error('', '收藏失败');
        }
    }

    private function generateOrderSn(){
        $order_sn = date('YmdHis').mt_rand(1000, 9999);

        $count = Db::name('lesson_order')->where('order_sn', $order_sn)->count();
        if($count) $this->generateOrderSn();

        return $order_sn;
    }
}