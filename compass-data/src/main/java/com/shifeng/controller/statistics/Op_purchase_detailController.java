package com.shifeng.controller.statistics;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.paystatus.Paystatus;
import com.shifeng.entity.statistics.Op_purchase_detail;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.service.statistics.Op_purchase_detailService;
import com.shifeng.util.DateUtil;

/** 
 * 购买明细(op_purchase_detail)Controller
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */ 
@Controller
@RequestMapping(value="/op_purchase_detail")
public class Op_purchase_detailController {
	
	@Resource(name="op_purchase_detailServiceImpl")
	private Op_purchase_detailService op_purchase_detailServiceImpl;

	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;
	
	@RequestMapping(value="/findAllop_purchase_detail")
	public ModelAndView findAllop_purchase_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData){
		page.setT(searchData);
		try {
			List<Channel> channels = channelServiceImpl.findAllchannel();
			mv.addObject("channels", channels);
			
			List<Paystatus> paystatus = op_purchase_detailServiceImpl.findAllPayStatus();
			mv.addObject("paystatus", paystatus);
			
			List<Op_purchase_detail> op_purchase_detail = op_purchase_detailServiceImpl.findAllop_purchase_detail(page);
			mv.addObject("list", op_purchase_detail);
			mv.addObject("page", page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("statistics/purchase");
		return mv;
	}
	
}
