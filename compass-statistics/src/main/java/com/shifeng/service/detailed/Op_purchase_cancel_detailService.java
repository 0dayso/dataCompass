package com.shifeng.service.detailed;

import java.util.List;

import com.shifeng.entity.detailed.Op_purchase_cancel_detail;
/** 
 * 订单取消明细(op_purchase_cancel_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 13:27:39 
 */  
public interface Op_purchase_cancel_detailService {

	/**
	 * 保存订单取消明细
	 * @param detailList
	 * @throws Exception
	 */
	void saveCancelDetail(List<Op_purchase_cancel_detail> detailList)throws Exception;

    

	
}
