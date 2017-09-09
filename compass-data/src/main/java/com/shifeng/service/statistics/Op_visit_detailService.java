package com.shifeng.service.statistics;

import java.util.List;
import java.util.Map;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.dto.statistics.StatisticsFlow;
import com.shifeng.dto.statistics.StatisticsFlowSearch;
import com.shifeng.entity.statistics.Op_register_detail;
import com.shifeng.entity.statistics.Op_visit_detail;
import com.shifeng.plugin.page.Page;
/** 
 * 访问明细(op_visit_detail)接口
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public interface Op_visit_detailService {

    /**
	 * 查询所有访问明细
	 * @param page
	 * @return
	 * @throws Exception	
	 */
	public List<Op_visit_detail> findAllop_visit_detail(Page<SearchData> page) throws Exception;
	
}
