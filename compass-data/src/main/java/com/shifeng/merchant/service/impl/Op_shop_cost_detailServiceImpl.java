package com.shifeng.merchant.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.ShopCostDTO;
import com.shifeng.merchant.entity.Op_shop_cost_detail;
import com.shifeng.merchant.service.Op_shop_cost_detailService;
import com.shifeng.plugin.page.Page; 

/** 
 * 商家费用(op_shop_cost_detail)接口实现类
 * @author sen 
 * @op_shop_cost_detail Revision: 1.00 
 *  Date: 2016-12-02 11:11:36 
 */  
@Service("op_shop_cost_detailServiceImpl")
public class Op_shop_cost_detailServiceImpl implements Op_shop_cost_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有商家费用
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_shop_cost_detail> findAllop_shop_cost_detail(Page<SearchData> page) throws Exception{
		return (List<Op_shop_cost_detail>) dao.findForList("op_shop_cost_detailMapper.findAllop_shop_cost_detailPage", page);
	}
	
	/**
	 * 商家费用统计
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	public List<ShopCostDTO> findAllShopcostData(Page page,SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		page.setT(searchData);
		
		return (List<ShopCostDTO>) dao.findForList("op_shop_cost_detailMapper.findAllShopcostDataPage", page);
	}
	
	
}
