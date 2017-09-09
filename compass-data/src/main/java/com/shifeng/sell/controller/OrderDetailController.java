package com.shifeng.sell.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.paystatus.Paystatus;
import com.shifeng.entity.statistics.Op_purchase_detail;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.OrderDetailDTO;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.service.statistics.Op_purchase_detailService;
import com.shifeng.util.DateUtil;

@Controller
@RequestMapping(value="orderDetail")
public class OrderDetailController {

	@Resource(name="op_purchase_detailServiceImpl")
	private Op_purchase_detailService op_purchase_detailServiceImpl;

	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;
	
	/**
	 * 跳转订单明细页面
	 * @param mv
	 * @return
	 */
	@RequestMapping("/getOrderDetail")
	public ModelAndView getOrderDetail(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("sell/orderDetail/analyze");
		return mv;
	}
	
	/**
	 * 查询订单明细
	 * @param page
	 * @param mv
	 * @param searchData
	 * @return
	 */
	@RequestMapping("/findOrderDetail")
	@ResponseBody
	public ModelAndView findAllop_purchase_detail(Page<SearchData> page,ModelAndView mv,SearchData searchData){
		page.setT(searchData);
		try {
			List<Channel> channels = channelServiceImpl.findAllchannel();
			mv.addObject("channels", channels);
			
			List<Paystatus> paystatus = op_purchase_detailServiceImpl.findAllPayStatus();
			mv.addObject("paystatus", paystatus);
			
			List<OrderDetailDTO> orderDetailDTO = op_purchase_detailServiceImpl.findOrderDetail(page);
			mv.addObject("list", orderDetailDTO);
			mv.addObject("page", page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("sell/orderDetail/orderList");
		return mv;
	}
}
