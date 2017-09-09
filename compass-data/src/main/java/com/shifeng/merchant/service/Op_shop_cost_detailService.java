package com.shifeng.merchant.service;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.ShopCostDTO;
import com.shifeng.merchant.entity.Op_shop_cost_detail;
import com.shifeng.plugin.page.Page;
/** 
 * 商家费用(op_shop_cost_detail)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 11:11:36 
 */  
public interface Op_shop_cost_detailService {

    /**
	 * 查询所有商家费用
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_shop_cost_detail> findAllop_shop_cost_detail(Page<SearchData> page) throws Exception;
	
	/**
	 * 商家费用统计
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	public List<ShopCostDTO> findAllShopcostData(Page page,SearchData searchData) throws Exception;
	
}
