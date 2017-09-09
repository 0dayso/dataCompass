package com.shifeng.merchant.service;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.FollowshopDTO;
import com.shifeng.merchant.entity.Op_follow_shop_detail;
import com.shifeng.plugin.page.Page;
/** 
 * 关注店铺明细(op_follow_shop_detail)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public interface Op_follow_shop_detailService {

    /**
	 * 查询所有关注店铺明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<FollowshopDTO> findAllop_follow_shop_detail(Page<SearchData> page,SearchData searchData) throws Exception;

	
}
