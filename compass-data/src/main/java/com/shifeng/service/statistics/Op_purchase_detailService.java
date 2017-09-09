package com.shifeng.service.statistics;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.paystatus.Paystatus;
import com.shifeng.entity.statistics.Op_purchase_detail;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.OrderDetailDTO;
/** 
 * 购买明细(op_purchase_detail)接口
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public interface Op_purchase_detailService {

    /**
	 * 查询所有购买明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_purchase_detail> findAllop_purchase_detail(Page<SearchData> page) throws Exception;
	
	/**
	 * 所有支付状态
	 * @return
	 * @throws Exception
	 */
	public List<Paystatus> findAllPayStatus() throws Exception;
	
	/**
	 * 查询所有订单明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<OrderDetailDTO> findOrderDetail(Page<SearchData> page) throws Exception;
	
	
}
