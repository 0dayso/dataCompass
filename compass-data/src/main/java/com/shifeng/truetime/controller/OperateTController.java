package com.shifeng.truetime.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.service.statistics.Op_dataService;
import com.shifeng.truetime.service.OperateTService;
import com.shifeng.util.DateUtil;

@Controller
@RequestMapping(value="operateT")
public class OperateTController {
	
	@Resource(name="op_dataServiceImpl")
	private Op_dataService op_dataServiceImpl;
	
	@Resource(name="operateTServiceImpl")
	private OperateTService operateTServiceImpl;
	
	
	@RequestMapping("/getPeratePage")
	public ModelAndView getPeratePage(ModelAndView mv){
		mv.addObject("type", "all");
		mv.setViewName("truetime/operate/chart");
		return mv;
	}
	
	/**
	 * 实时经营概况
	 * @param mv
	 * @return
	 */
	@RequestMapping("/findOperateData")
	public ModelAndView findOperateData(ModelAndView mv,String type){
		try {
			if(StringUtils.isEmpty(type)){
				type = "all";
			}
			op_dataServiceImpl.findOperateT(mv,type);
			mv.setViewName("truetime/operate/operatedata");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return mv;
	}
	
	/**
	 * 实时访问量等
	 */
	@RequestMapping("/findVisitData")
	@ResponseBody
	public Map<String,Object> findVisitData(String type){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			op_dataServiceImpl.getOperateHourDatas(map, DateUtil.getYYYY_MM_DD(), "",type);
			op_dataServiceImpl.getOperateHourDatas(map, DateUtil.YYYY_MM_DDgetBeforDay(1), "y",type);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 订单单量
	 */
	@RequestMapping("/findOrderNum")
	@ResponseBody
	public Map<String,Object> findOrderNum(String type){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			operateTServiceImpl.findOrderNum(map,type);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 订单金额
	 */
	@RequestMapping("/findOrderAmount")
	@ResponseBody
	public Map<String,Object> findOrderAmount(String type){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			operateTServiceImpl.findOrderAmount(map,type);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 订单商品件数
	 */
	@RequestMapping("/findPurchaseNum")
	@ResponseBody
	public Map<String,Object> findPurchaseNum(String type){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			operateTServiceImpl.findPurchaseNum(map,type);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
	
	
	
}