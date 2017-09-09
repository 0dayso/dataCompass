package com.shifeng.service.mall;

import java.util.List;

import com.shifeng.entity.mall.Mall_user;
import com.shifeng.plugin.page.Page;
/** 
 * 商城用户(mall_user)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:30:53 
 */  
public interface Mall_userService {

	/**
	 * 获取同步用户
	 * @param page
	 * @return
	 */
	List<Mall_user> getStaySyncUser(Page<String> page);

	/**
	 * 保存同步用户
	 * @param productList
	 */
	void saveSyncUser(List<Mall_user> userList);

    

	
}
