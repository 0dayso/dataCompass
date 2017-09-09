package com.shifeng.controller.statistics;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.statistics.Op_register_detail;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.service.statistics.Op_register_detailService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/** 
 * 注册明细(op_register_detail)Controller
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */ 
@Controller
@RequestMapping(value="/op_register_detail")
public class Op_register_detailController {
	
	@Resource(name="op_register_detailServiceImpl")
	private Op_register_detailService op_register_detailServiceImpl;

	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;
	
	@RequestMapping(value="/findAllop_register_detail")
	public ModelAndView findAllop_register_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData){
		page.setT(searchData);
		try {
			List<Channel> channels = channelServiceImpl.findAllchannel();
			mv.addObject("channels", channels);
			
			List<Op_register_detail> op_register_detail = op_register_detailServiceImpl.findAllop_register_detail(page);
			mv.addObject("list", op_register_detail);
			mv.addObject("page", page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("statistics/register");
		return mv;
	}
	
 
}
