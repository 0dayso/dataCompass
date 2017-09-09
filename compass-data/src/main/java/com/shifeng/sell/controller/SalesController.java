package com.shifeng.sell.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.keyword.KeywordDTO;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.SalesDTO;
import com.shifeng.sell.entity.sales.SalesAnalysis;
import com.shifeng.sell.service.SalesService;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.util.DateUtil;

/**
 * 销量
 * @author WinZhong
 *
 */
@Controller
@RequestMapping(value="/sales")
public class SalesController {

	@Resource(name="salesServiceImpl")
	private SalesService salesService;

 
	/**
	 * 销量分析
	 * @param mv
	 * @param sales
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/analysis")
	public ModelAndView analysis(ModelAndView mv,SalesDTO sales) throws Exception{
		if(StringUtils.isEmpty(sales.getStartDate())){
			sales.setStartDate(DateUtil.getYYYY_MM_DD());
			sales.setEndDate(DateUtil.getYYYY_MM_DD());
			sales.setNowYearMonth(DateUtil.getYM(new Date()));
		}else{
			sales.setNowYearMonth(DateUtil.getYM(sales.getStartDate()));
		}
		SalesAnalysis salesAnalysis = salesService.getAnalysis(sales);
		mv.addObject("salesAnalysis", salesAnalysis);
		mv.addObject("sales", sales);
		mv.setViewName("sell/sales/salesAnalysis");
		return mv;
	}
	
}
