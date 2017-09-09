package com.shifeng.controller.statistics;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_sku_data;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_sku_dataService;
import com.shifeng.util.DateUtil;

/** 
 * sku统计表(op_sku_data)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 11:11:36 
 */ 
@Controller
@RequestMapping(value="/op_sku_data")
public class Op_sku_dataController {
	
	@Resource(name="op_sku_dataServiceImpl")
	private Op_sku_dataService op_sku_dataServiceImpl;

	/**
	 * 跳转SKU统计页面
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/skuData")
	public ModelAndView skuData(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("statistics/sku/skudata");
		return mv;
	}
	
	/**
	 * 关注购物车统计
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllSkuData")
	@ResponseBody
	public ModelAndView findAllSkuData(ModelAndView mv,Page page,SearchData searchData) throws Exception{
		try {
			List<Op_sku_data> op_sku_data = op_sku_dataServiceImpl.findAllSkuData(page,searchData);
			mv.addObject("op_sku_data", op_sku_data);
			mv.addObject("searchData", searchData);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("statistics/sku/skudataList");
		
		return mv;
	}
 
}
