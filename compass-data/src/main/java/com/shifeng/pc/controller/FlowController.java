package com.shifeng.pc.controller;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.pc.dto.day_hour_flow.SearchDayFlow;
import com.shifeng.pc.dto.day_hour_flow.ShowDayFlow;
import com.shifeng.pc.service.FlowService;

import net.sf.json.JSONArray;

/**
 * pc 流量分析图表控制器
 * @author Yan
 *
 */
@Controller
@RequestMapping(value="/pc_visit_flow")
public class FlowController {
	
	@Resource(name="dayFlowServiceImpl")
	FlowService dayFlowServiceImpl;
	Logger log = Logger.getLogger(this.getClass());
	
	
	/** 
	 * 查询指定天数之内的流量     (浏览量，访客数，访问用户量[登录])
	 * @param mv
	 * @param s
	 * @return
	 */
	@RequestMapping(value="/pc_visit_day_flow")
	public ModelAndView show_pc_visit_day_flow(ModelAndView mv,SearchDayFlow s){
		
		try {
			List<ShowDayFlow> list = dayFlowServiceImpl.getPcFlowDayDatas(s);
			mv.addObject("list",JSONArray.fromObject(list).toString());
		} catch (Exception e) {
			e.printStackTrace();
			log.error("【查询指定天数之内的流量】异常，错误信息："+e.toString());
		}
		mv.addObject("s",s);
		mv.setViewName("pc/day_hour_flow/day_flow");
		return mv;
	}
	
	/** 
	 * 分析当天不同时段的流量     (浏览量，访客数，访问用户量[登录])
	 * @param mv
	 * @param s
	 * @return
	 */
	@RequestMapping(value="/pc_visit_hour_flow")
	public ModelAndView pc_visit_hour_flow(ModelAndView mv,SearchDayFlow s){
		try {
			List<ShowDayFlow> list = dayFlowServiceImpl.getPcFlowHourDatas(s);
			mv.addObject("list",JSONArray.fromObject(list).toString());
		} catch (Exception e) {
			e.printStackTrace();
			log.error("【分析当天不同时段的流量】异常，错误信息："+e.toString());
		}
		mv.addObject("s",s);
		mv.setViewName("pc/day_hour_flow/hour_flow");
		return mv;
	}
}
