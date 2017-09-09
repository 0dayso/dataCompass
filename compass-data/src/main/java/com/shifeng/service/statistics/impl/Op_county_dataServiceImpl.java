package com.shifeng.service.statistics.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_county_data;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_county_dataService; 

/** 
 * 地区统计表(op_county_data)接口实现类
 * @author sen 
 * @op_county_data Revision: 1.00 
 *  Date: 2016-12-02 10:02:00 
 */  
@Service("op_county_dataServiceImpl")
public class Op_county_dataServiceImpl implements Op_county_dataService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询区域统计表
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_county_data> findAllCountyData(Page page,SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		page.setT(searchData);
		return (List<Op_county_data>) dao.findForList("op_county_dataMapper.findAllCountyDataPage", page);
	}
	
}
