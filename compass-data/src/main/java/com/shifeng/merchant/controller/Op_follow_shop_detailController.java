package com.shifeng.merchant.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.FollowshopDTO;
import com.shifeng.merchant.entity.Op_follow_shop_detail;
import com.shifeng.merchant.service.Op_follow_shop_detailService;
import com.shifeng.plugin.page.Page;

/** 
 * 关注店铺明细(op_follow_shop_detail)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */ 
@Controller
@RequestMapping(value="/op_follow_shop_detail")
public class Op_follow_shop_detailController {
	
	@Resource(name="op_follow_shop_detailServiceImpl")
	private Op_follow_shop_detailService op_follow_shop_detailServiceImpl;

	@RequestMapping(value="/findAllop_follow_shop_detail")
	public ModelAndView findAllop_follow_shop_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData) throws Exception{
		List<FollowshopDTO> list = op_follow_shop_detailServiceImpl.findAllop_follow_shop_detail(page,searchData);
		mv.addObject("list", list);
		mv.addObject("page", page);
		mv.setViewName("merchant/follow/followshop");
		return mv;
	}

}
