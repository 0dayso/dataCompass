package com.shifeng.service.detailed;

import java.util.List;

import com.shifeng.entity.detailed.Op_shop_cost_detail;
/** 
 * 商家费用(op_shop_cost_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:35:31 
 */  
public interface Op_shop_cost_detailService {

	/**
	 * 保存商家费用明细
	 * @param detailList
	 * @throws Exception
	 */
	void saveDetail(List<Op_shop_cost_detail> detailList)throws Exception;

    

	
}
