package com.shifeng.controller.statistics;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.statistics.Op_visit_detail;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.service.statistics.Op_visit_detailService;

/** 
 * 访问明细(op_visit_detail)Controller
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */ 
@Controller
@RequestMapping(value="/op_visit_detail")
public class Op_visit_detailController {
	
	@Resource(name="op_visit_detailServiceImpl")
	private Op_visit_detailService op_visit_detailServiceImpl;

	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;
	
	/**
	 * 访问量
	 * @param page
	 * @param mv
	 * @param searchData
	 * @return
	 */
	@RequestMapping(value="/findAllop_visit_detail")
	public ModelAndView findAllop_visit_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData){
		page.setT(searchData);
		try {
			List<Channel> channels = channelServiceImpl.findAllchannel();
			mv.addObject("channels", channels);
			
			List<Op_visit_detail> op_visit_detail = op_visit_detailServiceImpl.findAllop_visit_detail(page);
			mv.addObject("list", op_visit_detail);
			mv.addObject("page", page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		mv.setViewName("statistics/visit");
		return mv;
	}
 
}
