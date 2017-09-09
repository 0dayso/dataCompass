package com.shifeng.controller.statistics;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_sku_all_data;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_sku_all_dataService;
import com.shifeng.util.DateUtil;

/** 
 * sku总统计表(op_sku_all_data)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 11:11:36 
 */ 
@Controller
@RequestMapping(value="/op_sku_all_data")
public class Op_sku_all_dataController {
	
	@Resource(name="op_sku_all_dataServiceImpl")
	private Op_sku_all_dataService op_sku_all_dataServiceImpl;
	
	/**
	 * 跳转SKU总统计页面
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/skuAllData")
	public ModelAndView skuData(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("statistics/sku/skualldata");
		return mv;
	}
	
	/**
	 * SKU总统计
	 * @param page
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/findAllop_sku_all_data")
	public ModelAndView findAllop_sku_all_data(ModelAndView mv,Page<SearchData> page,SearchData searchData){
		try {
			List<Op_sku_all_data> op_sku_all_data = op_sku_all_dataServiceImpl.findAllop_sku_all_data(page,searchData);
			mv.addObject("op_sku_all_data", op_sku_all_data);
			mv.addObject("page", page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		mv.setViewName("statistics/sku/skualldataList");
		return mv;
	}
	
 
}
