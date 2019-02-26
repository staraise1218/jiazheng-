<?php

namespace app\mall\controller;
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

        $order_id = I('order_id/d');
        if($order_sn)
        {
            $order_where['order_sn'] = $order_sn;
        }else{
            $order_where['order_id'] = $order_id;
        }
        $order = M('Order')->where($order_where)->find();

    	//②、统一下单
        $input = new \WxPayUnifiedOrder();
        $input->SetBody("购买商品");
        $input->SetAttach("购买商品");
        $input->SetOut_trade_no($order_sn);
        $input->SetTotal_fee(1); // $order['order_amount']*100
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
        $input->SetGoods_tag("购买商品");
        $input->SetNotify_url("http://jiazheng.staraise.com.cn/api/GoodsPayNotifyCallBack/exec");
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($openId);
        $config = new \WxPayConfig();
        $order = \WxPayApi::unifiedOrder($config, $input);

        $JsApiPay = new \JsApiPay();
        $jsApiParameters = $JsApiPay->GetJsApiParameters($order);
        echo $jsApiParameters;
    }
}