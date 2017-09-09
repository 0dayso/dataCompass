package com.shifeng.customer.service.impl;

import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.customer.entity.Op_login_detail;
import com.shifeng.customer.service.Op_login_detailService;
import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.DateUtil;

/** 
 * 登录详细(op_login_detail)接口实现类
 * @author sen 
 * @op_login_detail Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
@Service("op_login_detailServiceImpl")
public class Op_login_detailServiceImpl implements Op_login_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有登录详细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_login_detail> findAllop_login_detail(Page<SearchData> page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		
		page.setT(searchData);
		
		return (List<Op_login_detail>) dao.findForList("op_login_detailMapper.findAllop_login_detailPage", page);
	}
	
}
