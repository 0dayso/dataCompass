package com.shifeng.customer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.customer.dto.ScaleDTO;

/**
 * 店铺分析
 * @author WinZhong
 *
 */
@Controller
@RequestMapping(value="/shopAnalysis")
public class ShopAnalysisController {

	
	/**
	 * 店铺分析
	 * @param mv
	 * @param details
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/details")
	public ModelAndView details(ModelAndView mv,ScaleDTO scale) throws Exception{
		

		mv.setViewName("customer/scale/shopAnalysis");
		return mv;
	}
	
	
	
	
	
	
	
}
