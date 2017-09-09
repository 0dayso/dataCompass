package com.shifeng.service.mall.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dao.SQLServerDao;
import com.shifeng.entity.mall.Mall_product;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.mall.Mall_productService; 

/** 
 * 商城商品(mall_product)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:30:53 
 */  
@Service("mall_productServiceImpl")
public class Mall_productServiceImpl implements Mall_productService{

	protected Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	@Resource(name = "SQLServerDaoImpl")
	private SQLServerDao sDao;
	


	
	/**
	 * 获取待同步的商品列表
	 * @param page
	 * @return
	 */
	public List<Mall_product> getStaySyncProduct(Page<?> page) {
		try {
			return (List<Mall_product>)sDao.findForList("mall_productMapper.getStaySyncProductPage", page);
		} catch (Exception e) {
			logger.error("获取待同步的商品列表出错：", e);
			return null;
		}
		
	}
	


	/**
	 * 保存同步商品
	 * @param productList
	 */
	public void saveSyncProduct(List<Mall_product> productList) {
		try {
			dao.save("mall_productMapper.saveSyncProduct", productList);
		} catch (Exception e) {
			logger.error("保存同步商品出错：", e);
		}
	}
	
}
