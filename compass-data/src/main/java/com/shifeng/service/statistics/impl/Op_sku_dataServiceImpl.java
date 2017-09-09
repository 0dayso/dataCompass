package com.shifeng.service.statistics.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_sku_data;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_sku_dataService; 

/** 
 * sku统计表(op_sku_data)接口实现类
 * @author sen 
 * @op_sku_data Revision: 1.00 
 *  Date: 2016-12-02 10:02:00 
 */  
@Service("op_sku_dataServiceImpl")
public class Op_sku_dataServiceImpl implements Op_sku_dataService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * sku统计
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_sku_data> findAllSkuData(Page page,SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		page.setT(searchData);
		return (List<Op_sku_data>) dao.findForList("op_sku_dataMapper.findAllSkuDataPage", page);
	}
	
}
