package com.shifeng.operate.controller;

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
import com.shifeng.entity.statistics.Op_data;
import com.shifeng.operate.dto.OperateTableDTO;
import com.shifeng.operate.service.OperateService;
import com.shifeng.service.statistics.Op_dataService;
import com.shifeng.util.DateUtil;

@Controller
@RequestMapping(value="operate")
public class OperateController {
	
	@Resource(name="op_dataServiceImpl")
	private Op_dataService op_dataServiceImpl;
	
	@Resource(name="operateServiceImpl")
	private OperateService operateServiceImpl;
	
	
	@RequestMapping("/getPeratePage")
	public ModelAndView getPeratePage(ModelAndView mv){
		mv.addObject("date", DateUtil.getYYYY_MM_DD());
		mv.addObject("type", "all");
		mv.setViewName("operate/operate");
		return mv;
	}
	
	/**
	 * 经营概况
	 * @param mv
	 * @return
	 */
	@RequestMapping("/findOperateData")
	public ModelAndView findOperateData(ModelAndView mv,String date,String type){
		try {
			if(StringUtils.isEmpty(type)){
				type = "all";
			}
			Op_data op_data = op_dataServiceImpl.findOperate(date,type);
			if(op_data==null){
				op_data = new Op_data();
			}
			
			List<OperateTableDTO> operateTable = operateServiceImpl.findOperateTable(date, type);
			
			mv.addObject("op_data", op_data);
			mv.addObject("operateTable", operateTable);
			mv.addObject("date", date);
			mv.addObject("type", type);
			mv.setViewName("operate/operatedata");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return mv;
	}
	
	/**
	 * 访问量等
	 */
	@RequestMapping("/findVisitData")
	@ResponseBody
	public Map<String,Object> findVisitData(String type,String date){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			op_dataServiceImpl.getOperateHourDatas(map, date, "",type);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 浏览量占比
	 */
	@RequestMapping("/findVisitPercent")
	@ResponseBody
	public Map<String,String> findVisitPercent(String date){
		SearchData searchData = new SearchData();
		searchData.setStartDate(date);
		searchData.setRowFieldString("5,");
		
		Map<String,String> map = new HashMap<String,String>();
		
		try {
			List<Op_data> op_data = op_dataServiceImpl.findAllop_data(searchData);
			
			map.put("pc", "0");
			map.put("m", "0");
			map.put("app", "0");
			map.put("wx", "0");
			
			for(int i=0,len=op_data.size();i<len;i++){
				if(0==op_data.get(i).getType()){
					map.put("pc", op_data.get(i).getVisitnum()+"");
				}
				if(1==op_data.get(i).getType()){
					map.put("m", op_data.get(i).getVisitnum()+"");
				}
				if(2==op_data.get(i).getType()){
					map.put("app", op_data.get(i).getVisitnum()+"");
				}
				if(3==op_data.get(i).getType()){
					map.put("wx", op_data.get(i).getVisitnum()+"");
				}
				
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
	
	
}