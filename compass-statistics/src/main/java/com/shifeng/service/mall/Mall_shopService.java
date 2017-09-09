package com.shifeng.service.mall;

import java.util.List;

import com.shifeng.entity.mall.Mall_shop;
import com.shifeng.plugin.page.Page;
/** 
 * 商城店铺(mall_shop)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:30:53 
 */  
public interface Mall_shopService {

	/**
	 * 获取待同步店铺
	 * @param page
	 * @return
	 */
	List<Mall_shop> getStaySyncShop(Page<String> page);

	/**
	 * 保存同步店铺
	 * @param productList
	 */
	void saveSyncShop(List<Mall_shop> shopList);

    

	
}
