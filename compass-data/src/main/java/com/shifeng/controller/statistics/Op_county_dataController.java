package com.shifeng.controller.statistics;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_county_data;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_county_dataService;
import com.shifeng.util.DateUtil;

/** 
 * 地区统计表(op_county_data)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-02 11:11:36 
 */ 
@Controller
@RequestMapping(value="/op_county_data")
public class Op_county_dataController {
	
	@Resource(name="op_county_dataServiceImpl")
	private Op_county_dataService op_county_dataServiceImpl;
	
	/**
	 * 跳转区域统计页面
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/countyData")
	public ModelAndView countyData(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("statistics/county/countydata");
		return mv;
	}
	
	/**
	 * 区域统计
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllCountyData")
	@ResponseBody
	public ModelAndView findAllCountyData(ModelAndView mv,Page page,SearchData searchData) throws Exception{
		try {
			List<Op_county_data> op_county_data = op_county_dataServiceImpl.findAllCountyData(page,searchData);
			mv.addObject("op_county_data", op_county_data);
			mv.addObject("searchData", searchData);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("statistics/county/countydataList");
		
		return mv;
	}
	
	
 
}
