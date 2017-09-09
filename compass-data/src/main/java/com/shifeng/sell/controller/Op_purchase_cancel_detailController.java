package com.shifeng.sell.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.paystatus.Paystatus;
import com.shifeng.merchant.dto.ShopCostDTO;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.PurchasecancelDTO;
import com.shifeng.sell.service.Op_purchase_cancel_detailService;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.service.statistics.Op_purchase_detailService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/** 
 * 订单取消明细(op_purchase_cancel_detail)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */ 
@Controller
@RequestMapping(value="/op_purchase_cancel_detail")
public class Op_purchase_cancel_detailController {
	
	@Resource(name="op_purchase_cancel_detailServiceImpl")
	private Op_purchase_cancel_detailService op_purchase_cancel_detailServiceImpl;

	@Resource(name="op_purchase_detailServiceImpl")
	private Op_purchase_detailService op_purchase_detailServiceImpl;

	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;
	
	/**
	 * 取消订单明细
	 * @param page
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllop_purchase_cancel_detail")
	public ModelAndView findAllop_purchase_cancel_detail(Page page,ModelAndView mv,SearchData searchData) throws Exception{
		List<Channel> channels = channelServiceImpl.findAllchannel();
		mv.addObject("channels", channels);
		
		List<Paystatus> paystatus = op_purchase_detailServiceImpl.findAllPayStatus();
		mv.addObject("paystatus", paystatus);
		
		List<PurchasecancelDTO> list = op_purchase_cancel_detailServiceImpl.findAllop_purchase_cancel_detail(page,searchData);
		mv.addObject("list", list);
		mv.addObject("page", page);
		mv.setViewName("sell/cancel/purchasecancel");
		return mv;
	}
	
	/**
	 * 跳转订单取消原因统计页面
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/cancelData")
	public ModelAndView cancelData(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("sell/cancel/cancelData");
		return mv;
	}
	
	/**
	 * 订单取消原因统计
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllCancelData")
	@ResponseBody
	public ModelAndView findAllCancelData(ModelAndView mv,SearchData searchData,Page page) throws Exception{
		try {
			List<PurchasecancelDTO> list = op_purchase_cancel_detailServiceImpl.findAllCancelData(page,searchData);
			
			StringBuffer data = new StringBuffer();
			StringBuffer count = new StringBuffer();
			
			data.append("[");
			count.append("[");
			
			for(int i=0,len=list.size();i<len;i++){
				if(i!=0){
					data.append(",");
					count.append(",");
				}
				
				data.append("'");
				data.append(list.get(i).getReason());
				data.append("'");
				
				count.append("{value:");
				count.append(list.get(i).getCount());
				count.append(", name:'");
				count.append(list.get(i).getReason());
				count.append("'}");
			}
			
			data.append("]");
			count.append("]");
			
			mv.addObject("list", list);
			mv.addObject("page", page);
			mv.addObject("data", data);
			mv.addObject("count", count);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("sell/cancel/cancelDataList");
		
		return mv;
	}
 
}
