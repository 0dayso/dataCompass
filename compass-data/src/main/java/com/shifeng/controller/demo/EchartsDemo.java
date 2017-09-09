package com.shifeng.controller.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value="/echartsDemo")
public class EchartsDemo {

	@RequestMapping(value="/show")
	public ModelAndView show(ModelAndView mv) {
		// TODO Auto-generated method stub
		
		mv.setViewName("demo/echarts/echarts");
		return mv;
	}
	
}
