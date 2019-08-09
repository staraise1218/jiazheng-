<?php

namespace app\mall\controller;

use think\Controller;
use think\Db;

class Index extends Base{

    public function index(){
        $cat_id = I('cat_id');
    	
    	// 获取banner
		$bannerList = Db::name('ad')
			->where('pid', 3)
			->where('enabled', 1)
			->field('ad_name, ad_link, ad_code')
			->order('orderby desc, ad_id desc')
			->select();

		// 商品列表
        $goods_where['is_on_sale'] = 1; // 上架商品
        empty($cat_id) && $goods_where['is_hot'] = 1; // 热销商品
        if($cat_id) {
            $cat_id_arr = getCatGrandson ($cat_id);
            $goods_where['cat_id'] = array('in', $cat_id_arr);
        }

		$list = Db::name('goods')
    		->where($goods_where)
    		->field('goods_id, original_img, goods_name, shop_price, market_price, store_count')
    		->limit(10)
    		->select();
        // 获取商品一级分类
       $categoryList = Db::name('goods_category')
            ->where('parent_id', 0)
            ->order('sort_order desc, id desc')
            ->field('id, name')
            ->select();

    	$this->assign('list', $list);
        $this->assign('bannerList', $bannerList);
        $this->assign('categoryList', $categoryList);
        $this->assign('cat_id', $cat_id);
    	return $this->fetch();
    }

    public function ajaxGetList(){
         $cat_id = I('cat_id');
         $page = I('page', 1);

        // 商品列表
        $goods_where['is_on_sale'] = 1; // 上架商品
        empty($cat_id) && $goods_where['is_hot'] = 1; // 热销商品
        if($cat_id) {
            $cat_id_arr = getCatGrandson ($cat_id);
            $goods_where['cat_id'] = array('in', $cat_id_arr);
        }

        $list = Db::name('goods')
            ->where($goods_where)
            ->field('goods_id, original_img, goods_name, shop_price, market_price, store_count')
            ->limit(10)
            ->page($page)
            ->select();

        response_success($list);
    }
}


