package com.shifeng.merchant.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.FollowshopDTO;
import com.shifeng.merchant.entity.Op_follow_shop_detail;
import com.shifeng.merchant.service.Op_follow_shop_detailService;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.DateUtil; 

/** 
 * 关注店铺明细(op_follow_shop_detail)接口实现类
 * @author sen 
 * @op_follow_shop_detail Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
@Service("op_follow_shop_detailServiceImpl")
public class Op_follow_shop_detailServiceImpl implements Op_follow_shop_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有关注店铺明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<FollowshopDTO> findAllop_follow_shop_detail(Page<SearchData> page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		
		page.setT(searchData);
		return (List<FollowshopDTO>) dao.findForList("op_follow_shop_detailMapper.findAllop_follow_shop_detailPage", page);
	}
	
}
