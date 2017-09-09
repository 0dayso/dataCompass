package com.shifeng.service.statistics.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_user_data;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_user_dataService;
import com.shifeng.util.DateUtil; 

/** 
 * 用户统计表(op_user_data)接口实现类
 * @author sen 
 * @op_user_data Revision: 1.00 
 *  Date: 2016-12-02 10:02:00 
 */  
@Service("op_user_dataServiceImpl")
public class Op_user_dataServiceImpl implements Op_user_dataService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 用户关注商品统计
	 * @return
	 * @throws Exception
	 */
	public List<Op_user_data> findAllSkuData(Page page,SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		page.setT(searchData);
		
		return (List<Op_user_data>) dao.findForList("op_user_dataMapper.findAllSkuDataPage",page);
	}
	
}
