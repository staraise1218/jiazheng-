<?php

namespace app\mobile\controller;
use think\Db;
require_once "./plugins/weixin/lib/WxPay.Api.php";
require_once "./plugins/weixin/WxPay.JsApiPay.php";
require_once "./plugins/weixin/WxPay.Config.php";

class Pay {

	// 统一下单 unifiedOrder
    public function unifiedOrder(){
        $order_sn = I('order_sn');
        $openId = I('openid');
    	//②、统一下单
        $input = new \WxPayUnifiedOrder();
        $input->SetBody("视频课程");
        $input->SetAttach("视频课程");
        $input->SetOut_trade_no($order_sn);
        $input->SetTotal_fee("1");
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
        $input->SetGoods_tag("视频课程");
        $input->SetNotify_url("http://paysdk.weixin.qq.com/notify.php");
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($openId);
        $config = new \WxPayConfig();
        $order = \WxPayApi::unifiedOrder($config, $input);
        p($order);
        $JsApiPay = new \JsApiPay();
        $jsApiParameters = $JsApiPay->GetJsApiParameters($order);
        echo $jsApiParameters;
    }
}