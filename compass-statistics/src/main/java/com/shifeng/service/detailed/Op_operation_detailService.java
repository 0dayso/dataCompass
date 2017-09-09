package com.shifeng.service.detailed;

import java.util.List;

import com.shifeng.entity.detailed.Op_operation_detail;
/** 
 * 后台操作详情(op_operation_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:35:31 
 */  
public interface Op_operation_detailService {

	/**
	 * 保存后台操作详细记录
	 * @param detailList
	 * @throws Exception
	 */
	void saveDetail(List<Op_operation_detail> detailList)throws Exception;

    

	
}
