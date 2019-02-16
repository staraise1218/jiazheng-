<?php

namespace app\mobile\controller;
use think\Db;
require_once "./plugins/weixin/lib/WxPay.Api.php";
require_once "./plugins/weixin/WxPay.JsApiPay.php";
require_once "./plugins/weixin/WxPay.Config.php";

class Pay {

    // 微信jsapi 支付
	// 统一下单 unifiedOrder
    public function unifiedOrder(){
        $order_sn = I('order_sn');
        $openId = I('openid');

        $order = Db::name('lesson_order')->where('order_sn', $order_sn)->find();

    	//②、统一下单
        $input = new \WxPayUnifiedOrder();
        $input->SetBody("视频课程");
        $input->SetAttach("视频课程");
        $input->SetOut_trade_no($order_sn);
        $input->SetTotal_fee($order['price']*100);
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
        $input->SetGoods_tag("视频课程");
        $input->SetNotify_url("http://jiazheng.staraise.com.cn/api/LessonPayNotifyCallBack/exec");
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($openId);
        $config = new \WxPayConfig();
        $order = \WxPayApi::unifiedOrder($config, $input);

        $JsApiPay = new \JsApiPay();
        $jsApiParameters = $JsApiPay->GetJsApiParameters($order);
        echo $jsApiParameters;
    }

    public function lessoncodepay(){
        $order_sn = I('order_sn');
        $lessoncode = I('lessoncode');

        $session_user = session('user');
        $user_id = $session_user['user_id'];

        $order = Db::name('lesson_order')->where('order_sn', $order_sn)->find();
        if($order['paystatus'] == 1) die(json_encode(array('code'=>0, 'msg'=>'已支付')));

        // 检测课程码是否已使用
        $count = Db::name('lessoncode_list')
            ->where('code', $lessoncode)
            ->where('is_used', 0)
            ->count();

        if($count == 0) die(json_encode(array('code'=>0, 'msg'=>'课程码无效')));

        // 启动事务
        Db::startTrans();
        try{
            // 更新课程订单状态
            $updatedata = array(
                'paystatus'=>1,
                'paytime' => time(),
                'paymethod' => 2,
            );
            Db::name('lesson_order')->where('order_sn', $order_sn)->update($updatedata);
            // 更新课程码状态
            Db::name('lessoncode_list')->where('code', $lessoncode)->update(array('is_used'=>1));
            // 记录课程码使用日志
            $lessoncode_log = array(
                'lessoncode'=>$lessoncode,
                'user_id' => $user_id,
                'order_sn'=>$order_sn,
            );

            Db::name('lessoncode_log')->insert($lessoncode_log);
            // 提交事务
            Db::commit();
            die(json_encode(array('code'=>1, 'msg'=>'支付成功')));
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            die(json_encode(array('code'=>0, 'msg'=>'系统异常')));
        }



        
    }
}