package com.shifeng.service.statistics.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_data;
import com.shifeng.pc.dto.day_hour_flow.SearchDayFlow;
import com.shifeng.pc.dto.day_hour_flow.ShowDayFlow;
import com.shifeng.pc.dto.day_hour_flow.ShowHourCookieFlow;
import com.shifeng.pc.dto.day_hour_flow.ShowHourPvFlow;
import com.shifeng.pc.dto.day_hour_flow.ShowHourUservFlow;
import com.shifeng.pc.dto.day_hour_flow.ShowHourUvFlow;
import com.shifeng.service.statistics.Op_dataService;
import com.shifeng.util.DateUtil; 

/** 
 * 统计表(op_data)接口实现类
 * @author sen
 * @op_data Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
@Service("op_dataServiceImpl")
public class Op_dataServiceImpl implements Op_dataService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有统计表
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_data> findAllop_data(SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		return (List<Op_data>) dao.findForList("op_dataMapper.findAllop_data",searchData);
	}
	
	/**
	 * 统计经营概况
	 */
	public Op_data findOperate(String date,String type) throws Exception{
		Map<String,String> map = new HashMap<String,String>();
		map.put("tableName", DateUtil.getYM(date));
		map.put("cdate", date);
		map.put("type", type);
		
		return (Op_data) dao.findForObject("op_dataMapper.findOperate",map);
	}
	
	/**
	 * 统计实时经营概况
	 */
	public void findOperateT(ModelAndView mv,String type) throws Exception{
		Op_data nowData = findOperate(DateUtil.getYYYY_MM_DD(),type);
		Op_data yesterdayData = findOperate(DateUtil.YYYY_MM_DDgetBeforDay(1),type);
		
		if(nowData!=null){
			mv.addObject("now", nowData);
		}else{
			nowData = new Op_data();
			mv.addObject("now", nowData);
		}
		
		if(yesterdayData!=null){
			mv.addObject("yesterday", yesterdayData);
		}else{
			yesterdayData = new Op_data();
			mv.addObject("yesterday", yesterdayData);
		}
		
		//昨天当时数据
		Op_data yesterdayNowData = (Op_data) dao.findForObject("op_dataMapper.findOperateByYesterdayNow",DateUtil.getYM(DateUtil.YYYY_MM_DDgetBeforDay(1)));
		mv.addObject("yesterdayNow", yesterdayNowData);
		
		mv.addObject("date", DateUtil.getTime().substring(11, 16));
		
	}
	
	/**
	 *  按小时分析（实时经营状况）
	 */
	public void getOperateHourDatas(Map<String,Object> map,String date,String day,String type)throws Exception{
		SearchDayFlow s = new SearchDayFlow();
		s.setEndDate(date);
		s.setType(type);
		
		List<ShowDayFlow> hourData = (List<ShowDayFlow>) dao.findForList("flowMapper.statisticsFlowByHour", s);
		
		String hour = "";
		String pvsStr = "";
		String uvsStr = "";
		String cookiesStr = "";
		String usersStr = "";
		
		long daysub = DateUtil.getDaySub(date, DateUtil.getYYYY_MM_DD());
		
		int todayhour = 24;
		if(daysub==0){
			Calendar rightNow = Calendar.getInstance();
			todayhour = rightNow.get(Calendar.HOUR_OF_DAY)+1;
		}
		
		for(int i=0,len=todayhour;i<len;i++){
			if(i==0){
				hour = "0点";
			}else{
				hour += ","+i+"点";
			}
			boolean bool = true;
			for(int j=0,lenj=hourData.size();j<lenj;j++){
				if(i==Integer.valueOf(hourData.get(j).getDate())){
					bool = false;
					if(StringUtils.isEmpty(pvsStr)){
						pvsStr += hourData.get(j).getVisitnum();
					}else{
						pvsStr += ","+hourData.get(j).getVisitnum();
					}
					if(StringUtils.isEmpty(uvsStr)){
						uvsStr += hourData.get(j).getUv();
					}else{
						uvsStr += ","+hourData.get(j).getUv();
					}
					if(StringUtils.isEmpty(cookiesStr)){
						cookiesStr += hourData.get(j).getCookie();
					}else{
						cookiesStr += ","+hourData.get(j).getCookie();
					}
					if(StringUtils.isEmpty(usersStr)){
						usersStr += hourData.get(j).getVisitusernum();
					}else{
						usersStr += ","+hourData.get(j).getVisitusernum();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(pvsStr)){
					pvsStr += "0";
				}else{
					pvsStr += ",0";
				}
				if(StringUtils.isEmpty(uvsStr)){
					uvsStr += "0";
				}else{
					uvsStr += ",0";
				}
				if(StringUtils.isEmpty(cookiesStr)){
					cookiesStr += "0";
				}else{
					cookiesStr += ",0";
				}
				if(StringUtils.isEmpty(usersStr)){
					usersStr += "0";
				}else{
					usersStr += ",0";
				}
			}
		}
		
		map.put(day+"hour", hour);
		map.put(day+"pvs", pvsStr);
		map.put(day+"uvs", uvsStr);
		map.put(day+"cookies", cookiesStr);
		map.put(day+"users", usersStr);
	}
	
}
