package com.shifeng.customer.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.customer.entity.Op_login_detail;
import com.shifeng.customer.service.Op_login_detailService;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;

/** 
 * 登录详细(op_login_detail)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */ 
@Controller
@RequestMapping(value="/op_login_detail")
public class Op_login_detailController {
	
	@Resource(name="op_login_detailServiceImpl")
	private Op_login_detailService op_login_detailServiceImpl;

	/**
	 * 查询用户登录明细
	 * @param page
	 * @param mv
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllop_login_detail")
	public ModelAndView findAllop_login_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData) throws Exception{
		List<Op_login_detail> op_login_detail = op_login_detailServiceImpl.findAllop_login_detail(page,searchData);
		mv.addObject("list", op_login_detail);
		mv.addObject("page", page);
		mv.setViewName("customer/userlogin/userlogin");
		return mv;
	}
 
}
