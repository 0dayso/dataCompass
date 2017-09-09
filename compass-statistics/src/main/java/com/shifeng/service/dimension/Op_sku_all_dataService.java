package com.shifeng.service.dimension;

import java.util.List;

import com.shifeng.entity.dimension.Op_sku_all_data;
/** 
 * sku总统计表(op_sku_all_data)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-12-01 14:39:11 
 */  
public interface Op_sku_all_dataService {

	/**
	 * 保存SKU总的购物车统计
	 * @param list
	 * @throws Exception
	 */
	void saveCart(List<Op_sku_all_data> list,String ym)throws Exception;
	
	/**
	 * 统计关注SKU
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiFollowSKU(int beforeDay);
    

	
}
