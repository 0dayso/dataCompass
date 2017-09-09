package com.shifeng.service.statistics;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_county_data;
import com.shifeng.plugin.page.Page;
/** 
 * 地区统计表(op_county_data)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 10:02:00 
 */  
public interface Op_county_dataService {

    /**
	 * 查询区域统计表
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_county_data> findAllCountyData(Page page,SearchData searchData) throws Exception;
	
	
}
