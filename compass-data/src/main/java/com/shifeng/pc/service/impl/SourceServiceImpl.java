package com.shifeng.pc.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.jboss.netty.util.internal.StringUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.channel.Channel;
import com.shifeng.operate.dto.OperateTableDTO;
import com.shifeng.pc.dto.UvSource;
import com.shifeng.pc.dto.day_hour_flow.SearchDayFlow;
import com.shifeng.pc.service.SourceService;
import com.shifeng.util.DateUtil;

/**
 * 访问来源接口实现
 * @author sen
 *
 */
@Service("sourceServiceImpl")
public class SourceServiceImpl implements SourceService{
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 访客来源统计
	 */
	public Map<String,Object> uvSource(SearchData searchData) throws Exception{
		List<Channel> channels = (List<Channel>) dao.findForList("channelMapper.findAllchannel");
		
		List<UvSource> list = (List<UvSource>) dao.findForList("op_dataMapper.uvSource", searchData);
		
		SearchDayFlow s = new SearchDayFlow();
		
		if(StringUtils.isEmpty(searchData.getStartDate())){
			if(StringUtils.isEmpty(searchData.getStartDate())){
				s.setStartDate(DateUtil.getYYYY_MM_DD());
				s.setEndDate(DateUtil.getYYYY_MM_DD());
			}else{
				s.setStartDate(searchData.getEndDate());
				s.setEndDate(searchData.getEndDate());
			}
		}else{
			s.setStartDate(searchData.getStartDate());
			if(StringUtils.isEmpty(searchData.getStartDate())){
				s.setEndDate(searchData.getStartDate());
			}else{
				s.setEndDate(searchData.getEndDate());
			}
		}
		
		s.setType(searchData.getWebtype());
		
		// 下单金额|下单单量|下单商品件数
		List<OperateTableDTO> orderInfo = (List<OperateTableDTO>) dao.findForList("mp_sourceMapper.fidnOrderInfo", s);
		// 下单客户数
		List<OperateTableDTO> orderusers = (List<OperateTableDTO>) dao.findForList("mp_sourceMapper.fidnOrderuser", s);
		
		Map<String,Object> map = new HashMap<String,Object>();
		//渠道
		String channel = "";
		//访客数(ip)
		String uvCount = "";
		//访客数(cookie)
		String cookieCount = "";
		//访问量
		String pvCount = "";
		//访问用户
		String userCount = "";
		//订单数
		String ordernum = "";
		//订单金额
		String amount = "";
		//商品数量
		String purchasenum = "";
		//下单客户数
		String orderuser = "";
		
		List<Map<String,String>> finalList = new ArrayList<Map<String,String>>();
		
		for(int i=0,len=channels.size();i<len;i++){
			Map<String,String> data = new HashMap<String,String>();
			
			if(StringUtils.isEmpty(channel)){
				channel += channels.get(i).getName();
			}else{
				channel += ","+channels.get(i).getName();
			}
			data.put("channel", channels.get(i).getName());
			
			boolean bool = true;
			for(int j=0,lenj=list.size();j<lenj;j++){
				if(list.get(j)!=null&&(channels.get(i).getId()+"").equals(list.get(j).getChannelid())){
					if(StringUtils.isEmpty(uvCount)){
						uvCount += list.get(j).getUvCount();
					}else{
						uvCount += ","+list.get(j).getUvCount();
					}
					if(StringUtils.isEmpty(cookieCount)){
						cookieCount += list.get(j).getCookieCount();
					}else{
						cookieCount += ","+list.get(j).getCookieCount();
					}
					if(StringUtils.isEmpty(pvCount)){
						pvCount += list.get(j).getPvCount();
					}else{
						pvCount += ","+list.get(j).getPvCount();
					}
					if(StringUtils.isEmpty(userCount)){
						userCount += list.get(j).getUserCount();
					}else{
						userCount += ","+list.get(j).getUserCount();
					}
					data.put("uvCount", list.get(j).getUvCount()+"");
					data.put("cookieCount", list.get(j).getCookieCount()+"");
					data.put("pvCount", list.get(j).getPvCount()+"");
					data.put("userCount", list.get(j).getUserCount()+"");
					
					bool = false;
				}
			}
			if(bool){
				if(StringUtils.isEmpty(uvCount)){
					uvCount += "0";
				}else{
					uvCount += ",0";
				}
				if(StringUtils.isEmpty(cookieCount)){
					cookieCount += "0";
				}else{
					cookieCount += ",0";
				}
				if(StringUtils.isEmpty(pvCount)){
					pvCount += "0";
				}else{
					pvCount += ",0";
				}
				if(StringUtils.isEmpty(userCount)){
					userCount += "0";
				}else{
					userCount += ",0";
				}
				
				data.put("uvCount", "0");
				data.put("cookieCount", "0");
				data.put("pvCount", "0");
				data.put("userCount", "0");
			}
			
			//订单单数
			bool = true;
			for(int j=0,lenj=orderInfo.size();j<lenj;j++){
				if(orderInfo.get(j)!=null&&i==orderInfo.get(j).getChannelid()){
					bool = false;
					if(StringUtils.isEmpty(ordernum)){
						ordernum += orderInfo.get(j).getOrdernum();
					}else{
						ordernum += ","+orderInfo.get(j).getOrdernum();
					}
					
					data.put("ordernum", orderInfo.get(j).getOrdernum()+"");
				}
			}
			if(bool){
				if(StringUtils.isEmpty(ordernum)){
					ordernum += "0";
				}else{
					ordernum += ",0";
				}
				
				data.put("ordernum", "0");
			}
			
			//订单金额
			bool = true;
			for(int j=0,lenj=orderInfo.size();j<lenj;j++){
				if(orderInfo.get(j)!=null&&i==orderInfo.get(j).getChannelid()){
					bool = false;
					if(StringUtils.isEmpty(amount)){
						amount += orderInfo.get(j).getAmount();
					}else{
						amount += ","+orderInfo.get(j).getAmount();
					}
					
					data.put("amount", orderInfo.get(j).getAmount()+"");
				}
			}
			if(bool){
				if(StringUtils.isEmpty(amount)){
					amount += "0";
				}else{
					amount += ",0";
				}
				
				data.put("amount", "0");
			}
			
			//商品数量
			bool = true;
			for(int j=0,lenj=orderInfo.size();j<lenj;j++){
				if(orderInfo.get(j)!=null&&i==orderInfo.get(j).getChannelid()){
					bool = false;
					if(StringUtils.isEmpty(purchasenum)){
						purchasenum += orderInfo.get(j).getPurchasenum();
					}else{
						purchasenum += ","+orderInfo.get(j).getPurchasenum();
					}
					
					data.put("purchasenum", orderInfo.get(j).getPurchasenum()+"");
				}
			}
			if(bool){
				if(StringUtils.isEmpty(purchasenum)){
					purchasenum += "0";
				}else{
					purchasenum += ",0";
				}
				
				data.put("purchasenum", "0");
			}
			
			//下单客户数
			bool = true;
			for(int j=0,lenj=orderusers.size();j<lenj;j++){
				if(orderusers.get(j)!=null&&i==orderusers.get(j).getChannelid()){
					bool = false;
					if(StringUtils.isEmpty(orderuser)){
						orderuser += orderusers.get(j).getOrderuser();
					}else{
						orderuser += ","+orderusers.get(j).getOrderuser();
					}
					
					data.put("orderuser", orderusers.get(j).getOrderuser()+"");
				}
			}
			if(bool){
				if(StringUtils.isEmpty(orderuser)){
					orderuser += "0";
				}else{
					orderuser += ",0";
				}
				
				data.put("orderuser", "0");
			}
			
			finalList.add(data);
		}
		map.put("channel", channel);
		map.put("uvCount", uvCount);
		map.put("cookieCount", cookieCount);
		map.put("pvCount", pvCount);
		map.put("userCount", userCount);
		map.put("finalList", finalList);
		map.put("ordernum", ordernum);
		map.put("amount", amount);
		map.put("purchasenum", purchasenum);
		map.put("orderuser", orderuser);
		
		return map;
	}
	
}
