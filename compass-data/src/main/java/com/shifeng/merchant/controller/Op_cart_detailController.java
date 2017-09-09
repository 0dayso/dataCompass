package com.shifeng.merchant.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.merchant.dto.CartDTO;
import com.shifeng.merchant.service.Op_cart_detailService;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;

/** 
 * 购物车(op_cart_detail)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */ 
@Controller
@RequestMapping(value="/op_cart_detail")
public class Op_cart_detailController {
	
	@Resource(name="op_cart_detailServiceImpl")
	private Op_cart_detailService op_cart_detailServiceImpl;

	@RequestMapping(value="/findAllop_cart_detail")
	public ModelAndView findAllop_cart_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData) throws Exception{
		List<CartDTO> list = op_cart_detailServiceImpl.findAllop_cart_detail(page,searchData);
		mv.addObject("list", list);
		mv.addObject("page", page);
		mv.setViewName("merchant/cart/cartdetail");
		return mv;
	}
	
 
}
