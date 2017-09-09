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
import com.shifeng.entity.statistics.Op_sku_data;
import com.shifeng.merchant.dto.ShopCostDTO;
import com.shifeng.merchant.entity.Op_shop_cost_detail;
import com.shifeng.merchant.service.Op_shop_cost_detailService;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/** 
 * 商家费用(op_shop_cost_detail)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 11:11:36 
 */ 
@Controller
@RequestMapping(value="/op_shop_cost_detail")
public class Op_shop_cost_detailController {
	
	@Resource(name="op_shop_cost_detailServiceImpl")
	private Op_shop_cost_detailService op_shop_cost_detailServiceImpl;

	/**
	 * 商家费用明细
	 * @param page
	 * @param mv
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllop_shop_cost_detail")
	public ModelAndView findAllop_shop_cost_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		page.setT(searchData);
		
		List<Op_shop_cost_detail> list = op_shop_cost_detailServiceImpl.findAllop_shop_cost_detail(page);
		mv.addObject("list", list);
		mv.addObject("page", page);
		mv.setViewName("merchant/shopcost/shopcost");
		return mv;
	}
 
	/**
	 * 跳转商家费用统计页面
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/shopcostData")
	public ModelAndView shopcostData(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("merchant/shopcost/shopcostData");
		return mv;
	}
	
	/**
	 * 商家费用统计
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllShopcostData")
	@ResponseBody
	public ModelAndView findAllShopcostData(ModelAndView mv,SearchData searchData,Page page) throws Exception{
		try {
			List<ShopCostDTO> list = op_shop_cost_detailServiceImpl.findAllShopcostData(page,searchData);
			
			mv.addObject("list", list);
			mv.addObject("page", page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("merchant/shopcost/shopcostDataList");
		
		return mv;
	}
	
}
