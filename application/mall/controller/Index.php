<?php

namespace app\mall\controller;

use think\Controller;
use think\Db;

class Index extends Base{

    public function index(){
    	
    	// 获取banner
		$bannerList = Db::name('ad')
			->where('pid', 1)
			->where('enabled', 1)
			->field('ad_name, ad_link, ad_code')
			->order('orderby desc, ad_id desc')
			->select();

		// 商品列表
		$list = Db::name('goods')
    		->where('is_hot', 1)
    		->where('is_on_sale', 1)
    		->field('goods_id, original_img, goods_name, shop_price, market_price, store_count')
    		->limit(10)
    		->select();

    	$this->assign('list', $list);
		$this->assign('bannerList', $bannerList);
    	return $this->fetch();
    }
}