package com.shifeng.operation.service.impl;

import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.operation.dto.OperationDTO;
import com.shifeng.operation.entity.Op_operation_detail;
import com.shifeng.operation.service.Op_operation_detailService;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.DateUtil; 

/** 
 * 后台操作详情(op_operation_detail)接口实现类
 * @author sen 
 * @op_operation_detail Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
@Service("op_operation_detailServiceImpl")
public class Op_operation_detailServiceImpl implements Op_operation_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有后台操作详情
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_operation_detail> findAllop_operation_detail(Page<OperationDTO> page,OperationDTO operationDTO) throws Exception{
		if(operationDTO==null){
			operationDTO = new OperationDTO();
		}
		
		if(StringUtils.isEmpty(operationDTO.getStartDate())){
			if(StringUtils.isEmpty(operationDTO.getEndDate())){
				operationDTO.setTableName(DateUtil.getYM(new Date()));
			}else{
				operationDTO.setTableName(DateUtil.getYM(operationDTO.getEndDate()));
			}
		}else{
			operationDTO.setTableName(DateUtil.getYM(operationDTO.getStartDate()));
		}
		
		page.setT(operationDTO);
		
		return (List<Op_operation_detail>) dao.findForList("op_operation_detailMapper.findAllop_operation_detailPage", page);
	}
	
	
}
