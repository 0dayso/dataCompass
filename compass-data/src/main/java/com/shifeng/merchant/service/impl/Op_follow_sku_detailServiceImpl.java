package com.shifeng.merchant.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.FollowskuDTO;
import com.shifeng.merchant.entity.Op_follow_sku_detail;
import com.shifeng.merchant.service.Op_follow_sku_detailService;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.DateUtil; 

/** 
 * 关注商品明细(op_follow_sku_detail)接口实现类
 * @author sen 
 * @op_follow_sku_detail Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
@Service("op_follow_sku_detailServiceImpl")
public class Op_follow_sku_detailServiceImpl implements Op_follow_sku_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有关注商品明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<FollowskuDTO> findAllop_follow_sku_detail(Page<SearchData> page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		
		page.setT(searchData);
		return (List<FollowskuDTO>) dao.findForList("op_follow_sku_detailMapper.findAllop_follow_sku_detailPage", page);
	}


}
