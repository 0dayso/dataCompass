package com.shifeng.service.mall;

import java.util.List;

import com.shifeng.entity.mall.Mall_product;
import com.shifeng.plugin.page.Page;
/** 
 * 商城商品(mall_product)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:30:53 
 */  
public interface Mall_productService {

	
	/**
	 * 获取待同步的商品列表
	 * @param page
	 * @return
	 */
	List<Mall_product> getStaySyncProduct(Page<?> page);

	/**
	 * 保存同步商品
	 * @param productList
	 */
	void saveSyncProduct(List<Mall_product> productList);

    

	
}
