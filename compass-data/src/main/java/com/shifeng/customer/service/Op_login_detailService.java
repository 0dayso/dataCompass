package com.shifeng.customer.service;

import java.util.List;

import com.shifeng.customer.entity.Op_login_detail;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
/** 
 * 登录详细(op_login_detail)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public interface Op_login_detailService {

    /**
	 * 查询所有登录详细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_login_detail> findAllop_login_detail(Page<SearchData> page,SearchData searchData) throws Exception;
	

	
}
