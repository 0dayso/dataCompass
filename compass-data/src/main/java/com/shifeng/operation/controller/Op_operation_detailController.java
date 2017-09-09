package com.shifeng.operation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.operation.dto.OperationDTO;
import com.shifeng.operation.entity.Op_operation_detail;
import com.shifeng.operation.service.Op_operation_detailService;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.Const;

/** 
 * 后台操作详情(op_operation_detail)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */ 
@Controller
@RequestMapping(value="/op_operation_detail")
public class Op_operation_detailController {
	
	@Resource(name="op_operation_detailServiceImpl")
	private Op_operation_detailService op_operation_detailServiceImpl;

	@RequestMapping(value="/findAllop_operation_detail")
	public ModelAndView findAllop_operation_detail(Page<OperationDTO> page,ModelAndView mv,OperationDTO operationDTO) throws Exception{
		List<Op_operation_detail> op_operation_detail = op_operation_detailServiceImpl.findAllop_operation_detail(page,operationDTO);
		mv.addObject("list", op_operation_detail);
		mv.addObject("page", page);
		mv.setViewName("operation/operation");
		return mv;
	}


}
