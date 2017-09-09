package com.shifeng.service.detailed;

import java.util.List;

import com.shifeng.entity.detailed.Op_login_detail;
/** 
 * 登录详细(op_login_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:35:31 
 */  
public interface Op_login_detailService {

	/**
	 * 保存登录明细
	 * @param detailList
	 * @throws Exception
	 */
	void saveDetail(List<Op_login_detail> detailList)throws Exception;

    

	
}
