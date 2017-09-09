package com.shifeng.service.statistics;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_user_data;
import com.shifeng.plugin.page.Page;
/** 
 * 用户统计表(op_user_data)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 10:02:00 
 */  
public interface Op_user_dataService {

    /**
	 * 用户关注商品统计
	 * @return
	 * @throws Exception
	 */
	public List<Op_user_data> findAllSkuData(Page page,SearchData searchData) throws Exception;

	
}
