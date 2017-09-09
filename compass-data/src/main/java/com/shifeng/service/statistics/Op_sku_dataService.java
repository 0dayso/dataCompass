package com.shifeng.service.statistics;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_sku_data;
import com.shifeng.plugin.page.Page;
/** 
 * sku统计表(op_sku_data)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 10:02:00 
 */  
public interface Op_sku_dataService {

	/**
	 * sku统计
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_sku_data> findAllSkuData(Page page,SearchData searchData) throws Exception;
	
	
}
