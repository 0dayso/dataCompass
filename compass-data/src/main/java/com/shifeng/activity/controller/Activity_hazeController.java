package com.shifeng.activity.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.activity.entity.Activity_haze;
import com.shifeng.activity.service.Activity_hazeService;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.DateUtil;

/** 
 * 活动/雾霾(activity_haze)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-22 11:00:55 
 */ 
@Controller
@RequestMapping(value="/activity_haze")
public class Activity_hazeController {
	
	@Resource(name="activity_hazeServiceImpl")
	private Activity_hazeService activity_hazeServiceImpl;

	/**
	 * 活动/雾霾明细
	 * @param page
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllactivity_haze")
	public ModelAndView findAllactivity_haze(Page page,ModelAndView mv,SearchData searchData) throws Exception{
		List<Activity_haze> list = activity_hazeServiceImpl.findAllactivity_haze(page, searchData);
		mv.addObject("list", list);
		mv.addObject("page", page);
		mv.setViewName("activity/haze");
		return mv;
	}
	
	/**
	 * 跳转活动/雾霾统计页面
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/activityHazeData")
	public ModelAndView activityHazeData(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("activity/hazedata");
		return mv;
	}
	
	/**
	 * 活动/雾霾统计
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllActivityHazeData")
	@ResponseBody
	public ModelAndView findAllActivityHazeData(ModelAndView mv,SearchData searchData,Page page) throws Exception{
		try {
			List<Activity_haze> list = activity_hazeServiceImpl.findAllActivityHazeData(page, searchData);
			
			mv.addObject("list", list);
			mv.addObject("page", page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("activity/hazedataList");
		
		return mv;
	}
	
	
 
}
