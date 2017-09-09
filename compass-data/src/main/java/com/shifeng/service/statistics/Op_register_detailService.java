package com.shifeng.service.statistics;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_register_detail;
import com.shifeng.plugin.page.Page;
/** 
 * 注册明细(op_register_detail)接口
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public interface Op_register_detailService {

    /**
	 * 查询所有注册明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_register_detail> findAllop_register_detail(Page<SearchData> page) throws Exception;
	
	
}
