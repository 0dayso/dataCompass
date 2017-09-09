package com.shifeng.service.statistics;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_sku_all_data;
import com.shifeng.plugin.page.Page;
/** 
 * sku总统计表(op_sku_all_data)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 11:11:36 
 */  
public interface Op_sku_all_dataService {

    /**
	 * 查询所有sku总统计表
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_sku_all_data> findAllop_sku_all_data(Page<SearchData> page,SearchData searchData) throws Exception;

	
}
