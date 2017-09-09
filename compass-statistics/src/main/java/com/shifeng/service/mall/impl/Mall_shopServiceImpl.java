package com.shifeng.service.mall.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dao.SQLServerDao;
import com.shifeng.entity.mall.Mall_shop;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.mall.Mall_shopService; 

/** 
 * 商城店铺(mall_shop)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:30:53 
 */  
@Service("mall_shopServiceImpl")
public class Mall_shopServiceImpl implements Mall_shopService{

	protected Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	@Resource(name = "SQLServerDaoImpl")
	private SQLServerDao sDao;
	
	


	/**
	 * 获取待同步店铺
	 * @param page
	 * @return
	 */
	public List<Mall_shop> getStaySyncShop(Page<String> page) {
		
		try {
			return (List<Mall_shop>) sDao.findForList("mall_shopMapper.getStaySyncShopPage", page);
		} catch (Exception e) {
			logger.error("获取待同步用户出错：", e);
			return null;
		}
	}

	/**
	 * 保存同步店铺
	 * @param productList
	 */
	public void saveSyncShop(List<Mall_shop> shopList) {
		try {
			dao.save("mall_shopMapper.saveSyncShop", shopList);
		} catch (Exception e) {
			logger.error("保存同步用户出错：", e);
		}
	}
	
	
}
