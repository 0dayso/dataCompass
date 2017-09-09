package com.shifeng.operation.service;

import java.util.List;

import com.shifeng.operation.dto.OperationDTO;
import com.shifeng.operation.entity.Op_operation_detail;
import com.shifeng.plugin.page.Page;
/** 
 * 后台操作详情(op_operation_detail)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public interface Op_operation_detailService {

    /**
	 * 查询所有后台操作详情
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_operation_detail> findAllop_operation_detail(Page<OperationDTO> page,OperationDTO operationDTO) throws Exception;
	
	
}
