package com.shifeng.merchant.service;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.FollowskuDTO;
import com.shifeng.merchant.entity.Op_follow_sku_detail;
import com.shifeng.plugin.page.Page;
/** 
 * 关注商品明细(op_follow_sku_detail)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public interface Op_follow_sku_detailService {

    /**
	 * 查询所有关注商品明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<FollowskuDTO> findAllop_follow_sku_detail(Page<SearchData> page,SearchData searchData) throws Exception;
	

	
}
