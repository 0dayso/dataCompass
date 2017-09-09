package com.shifeng.service.mall.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dao.SQLServerDao;
import com.shifeng.entity.mall.Mall_user;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.mall.Mall_userService; 

/** 
 * 商城用户(mall_user)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:30:53 
 */  
@Service("mall_userServiceImpl")
public class Mall_userServiceImpl implements Mall_userService{

	protected Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	@Resource(name = "SQLServerDaoImpl")
	private SQLServerDao sDao;
	


	/**
	 * 获取同步用户
	 * @param page
	 * @return
	 */
	public List<Mall_user> getStaySyncUser(Page<String> page) {
		
		try {
			return (List<Mall_user>) sDao.findForList("mall_userMapper.getStaySyncUserPage", page);
		} catch (Exception e) {
			logger.error("获取待同步用户出错：", e);
			return null;
		}
	}
	


	/**
	 * 保存同步用户
	 * @param productList
	 */
	public void saveSyncUser(List<Mall_user> userList) {
		try {
			dao.save("mall_userMapper.saveSyncUser", userList);
		} catch (Exception e) {
			logger.error("保存同步用户出错：", e);
		}
	}
	
	
	
}
