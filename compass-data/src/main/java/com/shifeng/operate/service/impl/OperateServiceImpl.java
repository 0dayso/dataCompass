package com.shifeng.operate.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.operate.dto.OperateTableDTO;
import com.shifeng.operate.service.OperateService;
import com.shifeng.pc.dto.day_hour_flow.SearchDayFlow;
import com.shifeng.pc.dto.day_hour_flow.ShowDayFlow;
import com.shifeng.util.DateUtil;

@Service("operateServiceImpl")
public class OperateServiceImpl implements OperateService{
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 经营概况流量信息
	 */
	public List<OperateTableDTO> findOperateTable(String date,String type) throws Exception{
		SearchDayFlow s = new SearchDayFlow();
		s.setEndDate(date);
		s.setType(type);
		
		//浏览量/访客数ip/访客数cookie/访问用户数
		List<ShowDayFlow> hourData =  (List<ShowDayFlow>) dao.findForList("flowMapper.statisticsFlowByHour", s);
		// 下单金额|下单单量|下单商品件数|下单客户数
		List<OperateTableDTO> orderInfo = (List<OperateTableDTO>) dao.findForList("operateMapper.fidnOrderInfo", s);
		
		List<OperateTableDTO> finalList = new ArrayList<OperateTableDTO>();
		
		long daysub = DateUtil.getDaySub(date, DateUtil.getYYYY_MM_DD());
		
		int todayhour = 24;
		if(daysub==0){
			Calendar rightNow = Calendar.getInstance();
			todayhour = rightNow.get(Calendar.HOUR_OF_DAY)+1;
		}else{
			todayhour = 0;
		}
		
		for(int i=0;i<todayhour;i++){
			OperateTableDTO dto = new OperateTableDTO();
			
			dto.setHour(i);
			
			boolean bool = true;
			for(int j=0,lenj=hourData.size();j<lenj;j++){
				if(i==Integer.valueOf(hourData.get(j).getDate())){
					bool = false;
					//浏览量
					dto.setPv(hourData.get(j).getVisitnum());
					//访客数(ip)
					dto.setUv(hourData.get(j).getUv());
					//访客数(cookie)
					dto.setCookie(hourData.get(j).getCookie());
					//访问用户
					dto.setUseruv(hourData.get(j).getVisitusernum());
				}
			}
			if(bool){
				dto.setPv(0);
				dto.setUv(0);
				dto.setCookie(0);
				dto.setUseruv(0);
			}
			
			bool = true;
			for(int j=0,lenj=orderInfo.size();j<lenj;j++){
				if(i==orderInfo.get(j).getHour()){
					bool = false;
					//订单单数
					dto.setOrdernum(orderInfo.get(j).getOrdernum());
					//订单金额
					dto.setAmount(orderInfo.get(j).getAmount());
					//商品数量
					dto.setPurchasenum(orderInfo.get(j).getPurchasenum());
					//下单用户数
					dto.setOrderuser(orderInfo.get(j).getOrderuser());
				}
			}
			if(bool){
				dto.setOrdernum(0);
				dto.setAmount(0);
				dto.setPurchasenum(0);
				dto.setOrderuser(0);
			}
			
			finalList.add(dto);
		}
		
		
		return finalList;
	}
	
}
