package com.shifeng.truetime.service.impl;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.truetime.dto.operateT.OrderCount;
import com.shifeng.truetime.dto.operateT.SearchOrder;
import com.shifeng.truetime.service.OperateTService;
import com.shifeng.util.DateUtil;

@Service("operateTServiceImpl")
public class OperateTServiceImpl implements OperateTService{
	@Resource(name="baseDaoImpl")
	BaseDao dao;
	
	/**
	 *  订单单量（实时经营状况）
	 * @param map
	 * @throws Exception
	 */
	public void findOrderNum(Map<String,Object> map,String type)throws Exception{
		SearchOrder s = new SearchOrder();
		s.setEndDate(DateUtil.getYYYY_MM_DD());
		s.setType(type);
		s.setStatus("xd");
		
		// 下单单量
		List<OrderCount> xds = (List<OrderCount>) dao.findForList("operateTMapper.findOrderNum", s);
		s.setStatus("cj");
		// 成交单量
		List<OrderCount> cjs = (List<OrderCount>) dao.findForList("operateTMapper.findOrderNum", s);
		
		s.setEndDate(DateUtil.YYYY_MM_DDgetBeforDay(1));
		s.setStatus("xd");
		// 下单单量
		List<OrderCount> yxds = (List<OrderCount>) dao.findForList("operateTMapper.findOrderNum", s);
		s.setStatus("cj");
		// 成交单量
		List<OrderCount> ycjs = (List<OrderCount>) dao.findForList("operateTMapper.findOrderNum", s);
		
		String hour = "";
		String xd = "";
		String yxd = "";
		String cj = "";
		String ycj = "";
//		Calendar rightNow = Calendar.getInstance();
//		int todayhour = rightNow.get(Calendar.HOUR_OF_DAY)+1;
		int todayhour = 24;
		
		for(int i=0,len=todayhour;i<len;i++){
			if(i==0){
				hour = "0点";
			}else{
				hour += ","+i+"点";
			}
			
			boolean bool = true;
			for(int j=0,lenj=xds.size();j<lenj;j++){
				if(i==xds.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(xd)){
						xd += xds.get(j).getCount();
					}else{
						xd += ","+xds.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(xd)){
					xd += "0";
				}else{
					xd += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=yxds.size();j<lenj;j++){
				if(i==yxds.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(yxd)){
						yxd += yxds.get(j).getCount();
					}else{
						yxd += ","+yxds.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(yxd)){
					yxd += "0";
				}else{
					yxd += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=cjs.size();j<lenj;j++){
				if(i==cjs.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(cj)){
						cj += cjs.get(j).getCount();
					}else{
						cj += ","+cjs.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(cj)){
					cj += "0";
				}else{
					cj += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=ycjs.size();j<lenj;j++){
				if(i==ycjs.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(ycj)){
						ycj += ycjs.get(j).getCount();
					}else{
						ycj += ","+ycjs.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(ycj)){
					ycj += "0";
				}else{
					ycj += ",0";
				}
			}
		}
		
		map.put("hour", hour);
		map.put("xd", xd);
		map.put("yxd", yxd);
		map.put("cj", cj);
		map.put("ycj", ycj);
	}
	
	/**
	 *  订单金额（实时经营状况）
	 * @param map
	 * @throws Exception
	 */
	public void findOrderAmount(Map<String,Object> map,String type)throws Exception{
		SearchOrder s = new SearchOrder();
		s.setEndDate(DateUtil.getYYYY_MM_DD());
		s.setType(type);
		s.setStatus("xd");
		// 下单金额
		List<OrderCount> xds = (List<OrderCount>) dao.findForList("operateTMapper.findOrderAmount", s);
		s.setStatus("cj");
		// 成交金额
		List<OrderCount> cjs = (List<OrderCount>) dao.findForList("operateTMapper.findOrderAmount", s);
		
		s.setEndDate(DateUtil.YYYY_MM_DDgetBeforDay(1));
		s.setStatus("xd");
		// 下单金额
		List<OrderCount> yxds = (List<OrderCount>) dao.findForList("operateTMapper.findOrderAmount", s);
		s.setStatus("cj");
		// 成交金额
		List<OrderCount> ycjs = (List<OrderCount>) dao.findForList("operateTMapper.findOrderAmount", s);
		
		String hour = "";
		String xd = "";
		String yxd = "";
		String cj = "";
		String ycj = "";
//		Calendar rightNow = Calendar.getInstance();
//		int todayhour = rightNow.get(Calendar.HOUR_OF_DAY)+1;
		int todayhour = 24;
		
		for(int i=0,len=todayhour;i<len;i++){
			if(i==0){
				hour = "0点";
			}else{
				hour += ","+i+"点";
			}
			
			boolean bool = true;
			for(int j=0,lenj=xds.size();j<lenj;j++){
				if(i==xds.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(xd)){
						xd += xds.get(j).getCount();
					}else{
						xd += ","+xds.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(xd)){
					xd += "0";
				}else{
					xd += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=yxds.size();j<lenj;j++){
				if(i==yxds.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(yxd)){
						yxd += yxds.get(j).getCount();
					}else{
						yxd += ","+yxds.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(yxd)){
					yxd += "0";
				}else{
					yxd += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=cjs.size();j<lenj;j++){
				if(i==cjs.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(cj)){
						cj += cjs.get(j).getCount();
					}else{
						cj += ","+cjs.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(cj)){
					cj += "0";
				}else{
					cj += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=ycjs.size();j<lenj;j++){
				if(i==ycjs.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(ycj)){
						ycj += ycjs.get(j).getCount();
					}else{
						ycj += ","+ycjs.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(ycj)){
					ycj += "0";
				}else{
					ycj += ",0";
				}
			}
		}
		
		map.put("hour", hour);
		map.put("xd", xd);
		map.put("yxd", yxd);
		map.put("cj", cj);
		map.put("ycj", ycj);
	}
	
	/**
	 *  商品件数（实时经营状况）
	 * @param map
	 * @throws Exception
	 */
	public void findPurchaseNum(Map<String,Object> map,String type)throws Exception{
		SearchOrder s = new SearchOrder();
		s.setEndDate(DateUtil.getYYYY_MM_DD());
		s.setType(type);
		s.setStatus("xd");
		// 下单商品件数
		List<OrderCount> xds = (List<OrderCount>) dao.findForList("operateTMapper.findPurchaseNum", s);
		s.setStatus("cj");
		// 成交商品件数
		List<OrderCount> cjs = (List<OrderCount>) dao.findForList("operateTMapper.findPurchaseNum", s);
		
		s.setEndDate(DateUtil.YYYY_MM_DDgetBeforDay(1));
		s.setStatus("xd");
		// 下单商品件数
		List<OrderCount> yxds = (List<OrderCount>) dao.findForList("operateTMapper.findPurchaseNum", s);
		s.setStatus("cj");
		// 成交商品件数
		List<OrderCount> ycjs = (List<OrderCount>) dao.findForList("operateTMapper.findPurchaseNum", s);
		
		String hour = "";
		String xd = "";
		String yxd = "";
		String cj = "";
		String ycj = "";
//		Calendar rightNow = Calendar.getInstance();
//		int todayhour = rightNow.get(Calendar.HOUR_OF_DAY)+1;
		int todayhour = 24;
		
		for(int i=0,len=todayhour;i<len;i++){
			if(i==0){
				hour = "0点";
			}else{
				hour += ","+i+"点";
			}
			
			boolean bool = true;
			for(int j=0,lenj=xds.size();j<lenj;j++){
				if(i==xds.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(xd)){
						xd += xds.get(j).getCount();
					}else{
						xd += ","+xds.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(xd)){
					xd += "0";
				}else{
					xd += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=yxds.size();j<lenj;j++){
				if(i==yxds.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(yxd)){
						yxd += yxds.get(j).getCount();
					}else{
						yxd += ","+yxds.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(yxd)){
					yxd += "0";
				}else{
					yxd += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=cjs.size();j<lenj;j++){
				if(i==cjs.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(cj)){
						cj += cjs.get(j).getCount();
					}else{
						cj += ","+cjs.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(cj)){
					cj += "0";
				}else{
					cj += ",0";
				}
			}
			
			bool = true;
			for(int j=0,lenj=ycjs.size();j<lenj;j++){
				if(i==ycjs.get(j).getHour()){
					bool = false;
					if(StringUtils.isEmpty(ycj)){
						ycj += ycjs.get(j).getCount();
					}else{
						ycj += ","+ycjs.get(j).getCount();
					}
				}
			}
			if(bool){
				if(StringUtils.isEmpty(ycj)){
					ycj += "0";
				}else{
					ycj += ",0";
				}
			}
		}
		
		map.put("hour", hour);
		map.put("xd", xd);
		map.put("yxd", yxd);
		map.put("cj", cj);
		map.put("ycj", ycj);
	}
	
}
