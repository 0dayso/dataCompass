package com.shifeng.controller.statistics;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.HistoryActive;
import com.shifeng.service.statistics.HistoryActiveService;
import com.shifeng.service.statistics.impl.HistoryActiveServiceImpl;
import com.shifeng.util.DateUtil;

@Controller
@RequestMapping(value="/historyActive")
public class HistoryActiveController {
	
	@Resource(name="historyActiveServiceImpl")
	private HistoryActiveService historyActiveServiceImpl;

	/**
	 * 跳转活动统计页面
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/activeData")
	public ModelAndView historyActiveData(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("statistics/active/activedata");
		return mv;
	}
	
	/**
	 * 商城历史活动统计
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllActiveData")
	@ResponseBody
	public ModelAndView findAllActiveData(ModelAndView mv,SearchData searchData) throws Exception{
		try {
			List<HistoryActive> historyActive = historyActiveServiceImpl.findAllActiveData(searchData);
			mv.addObject("historyActive", historyActive);
			mv.addObject("searchData", searchData);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("statistics/active/activedataList");
		
		return mv;
	}
}
