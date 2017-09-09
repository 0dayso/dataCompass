package com.shifeng.service.detailed;

import java.util.List;

import com.shifeng.entity.detailed.Op_follow_sku_detail;
/** 
 * 关注商品明细(op_follow_sku_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 13:50:50 
 */  
public interface Op_follow_sku_detailService {

	/**
	 * 保存关注商品明细
	 * @param detailList
	 * @throws Exception
	 */
	void saveDetail(List<Op_follow_sku_detail> detailList)throws Exception;

    

	
}
