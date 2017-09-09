package com.shifeng.service.detailed;

import java.util.List;

import com.shifeng.entity.detailed.Op_follow_shop_detail;
/** 
 * 关注店铺明细(op_follow_shop_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:23:01 
 */  
public interface Op_follow_shop_detailService {

	/**
	 * 保存关注店铺明细
	 * @param detailList
	 * @throws Exception
	 */
	void saveDetail(List<Op_follow_shop_detail> detailList)throws Exception;

    

	
}
