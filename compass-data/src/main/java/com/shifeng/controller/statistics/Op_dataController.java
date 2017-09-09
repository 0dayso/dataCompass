package com.shifeng.controller.statistics;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.statistics.Op_data;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.service.statistics.Op_dataService;
import com.shifeng.util.DateUtil;

/** 
 * 统计表(op_data)Controller
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */ 
@Controller
@RequestMapping(value="/op_data")
public class Op_dataController {
	
	@Resource(name="op_dataServiceImpl")
	private Op_dataService op_dataServiceImpl;
	
	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;
	
	/**
	 * 查询统计数据
	 */
	@RequestMapping(value="/findAllTop_data")
	@ResponseBody
	public ModelAndView findAllTop_data(ModelAndView mv,SearchData searchData){
		try {
			List<Op_data> op_data = op_dataServiceImpl.findAllop_data(searchData);
			mv.addObject("op_data", op_data);
			mv.addObject("searchData", searchData);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		mv.setViewName("statistics/tdataList");
		
		return mv;
	}
	
	/**
	 * 查询统计数据
	 */
	@RequestMapping(value="/findAllYop_data")
	@ResponseBody
	public ModelAndView findAllYop_data(ModelAndView mv,SearchData searchData){
		try {
			List<Op_data> op_data = op_dataServiceImpl.findAllop_data(searchData);
			mv.addObject("op_data", op_data);
			mv.addObject("searchData", searchData);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		mv.setViewName("statistics/ydataList");
		
		return mv;
	}
	
	@RequestMapping(value="/opDataT")
	@ResponseBody
	public ModelAndView opDataT(ModelAndView mv){
		try {
			List<Channel> channels = channelServiceImpl.findAllchannel();
			mv.addObject("channels", channels);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("statistics/tdata");
		return mv;
	}
	
	@RequestMapping(value="/opDataY")
	@ResponseBody
	public ModelAndView opDataY(ModelAndView mv){
		try {
			List<Channel> channels = channelServiceImpl.findAllchannel();
			mv.addObject("channels", channels);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("statistics/ydata");
		return mv;
	}
	
}
