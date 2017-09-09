package com.shifeng.service.detailed;

import java.util.List;

import com.shifeng.entity.detailed.Op_cart_detail;
/** 
 * 购物车(op_cart_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:35:31 
 */  
public interface Op_cart_detailService {

	/**
	 * 保存购物车明细
	 * @param detailList
	 * @throws Exception
	 */
	void saveDetail(List<Op_cart_detail> detailList)throws Exception;

    

	
}
