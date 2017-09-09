package com.shifeng.merchant.service.impl;

import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.CartDTO;
import com.shifeng.merchant.service.Op_cart_detailService;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.DateUtil;

/** 
 * 购物车(op_cart_detail)接口实现类
 * @author sen 
 * @op_cart_detail Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
@Service("op_cart_detailServiceImpl")
public class Op_cart_detailServiceImpl implements Op_cart_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有购物车
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<CartDTO> findAllop_cart_detail(Page<SearchData> page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		
		page.setT(searchData);
		
		return (List<CartDTO>) dao.findForList("op_cart_detailMapper.findAllop_cart_detailPage", page);
	}
	
	
}
