package com.shifeng.sell.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.PurchasecancelDTO;
import com.shifeng.sell.service.Op_purchase_cancel_detailService; 

/** 
 * 订单取消明细(op_purchase_cancel_detail)接口实现类
 * @author sen 
 * @op_purchase_cancel_detail Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
@Service("op_purchase_cancel_detailServiceImpl")
public class Op_purchase_cancel_detailServiceImpl implements Op_purchase_cancel_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有订单取消明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<PurchasecancelDTO> findAllop_purchase_cancel_detail(Page page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		
		page.setT(searchData);
		
		return (List<PurchasecancelDTO>) dao.findForList("op_purchase_cancel_detailMapper.findAllop_purchase_cancel_detailPage", page);
	}
	
	/**
	 * 订单取消原因统计
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	public List<PurchasecancelDTO> findAllCancelData(Page page,SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		page.setT(searchData);
		
		return (List<PurchasecancelDTO>) dao.findForList("op_purchase_cancel_detailMapper.findAllCancelDataPage", page);
	}
	
	
}
