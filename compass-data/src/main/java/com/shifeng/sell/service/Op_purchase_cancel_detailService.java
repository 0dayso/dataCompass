package com.shifeng.sell.service;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.PurchasecancelDTO;
/** 
 * 订单取消明细(op_purchase_cancel_detail)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public interface Op_purchase_cancel_detailService {

    /**
	 * 查询所有订单取消明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<PurchasecancelDTO> findAllop_purchase_cancel_detail(Page page,SearchData searchData) throws Exception;
	
	/**
	 * 订单取消原因统计
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	public List<PurchasecancelDTO> findAllCancelData(Page page,SearchData searchData) throws Exception;
	
}
