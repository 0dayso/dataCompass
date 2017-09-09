package com.shifeng.merchant.service;

import java.util.List;

import com.shifeng.merchant.dto.CartDTO;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
/** 
 * 购物车(op_cart_detail)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public interface Op_cart_detailService {

    /**
	 * 查询所有购物车
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<CartDTO> findAllop_cart_detail(Page<SearchData> page,SearchData searchData) throws Exception;
	
	
}
