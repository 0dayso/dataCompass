package com.shifeng.service.statistics.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_sku_all_data;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_sku_all_dataService;
import com.shifeng.util.DateUtil; 

/** 
 * sku总统计表(op_sku_all_data)接口实现类
 * @author sen 
 * @op_sku_all_data Revision: 1.00 
 *  Date: 2016-12-02 11:11:36 
 */  
@Service("op_sku_all_dataServiceImpl")
public class Op_sku_all_dataServiceImpl implements Op_sku_all_dataService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有sku总统计表
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_sku_all_data> findAllop_sku_all_data(Page<SearchData> page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}else{
			String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
			searchData.setRowFields(rowFields);
			searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
			
			if(StringUtils.isEmpty(searchData.getStartDate())){
				searchData.setStartDate(DateUtil.getYYYY_MM_DD());
			}
		}
		page.setT(searchData);
		
		return (List<Op_sku_all_data>) dao.findForList("op_sku_all_dataMapper.findAllop_sku_all_dataPage", page);
	}
	
}
