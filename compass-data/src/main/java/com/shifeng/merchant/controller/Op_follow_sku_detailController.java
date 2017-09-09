package com.shifeng.merchant.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.merchant.dto.FollowskuDTO;
import com.shifeng.merchant.entity.Op_follow_sku_detail;
import com.shifeng.merchant.service.Op_follow_sku_detailService;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.Const;

/** 
 * 关注商品明细(op_follow_sku_detail)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */ 
@Controller
@RequestMapping(value="/op_follow_sku_detail")
public class Op_follow_sku_detailController{
	
	@Resource(name="op_follow_sku_detailServiceImpl")
	private Op_follow_sku_detailService op_follow_sku_detailServiceImpl;

	@RequestMapping(value="/findAllop_follow_sku_detail")
	public ModelAndView findAllop_follow_sku_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData) throws Exception{
		List<FollowskuDTO> list = op_follow_sku_detailServiceImpl.findAllop_follow_sku_detail(page,searchData);
		mv.addObject("list", list);
		mv.addObject("page", page);
		mv.setViewName("merchant/follow/followsku");
		return mv;
	}
	
	
	
 
}
