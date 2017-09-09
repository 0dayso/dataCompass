package com.shifeng.job;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.channel.Channelurl;
import com.shifeng.entity.purchase.Purchase;
import com.shifeng.entity.register.Register;
import com.shifeng.ip.IPSeeker;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.service.channel.ChannelurlService;
import com.shifeng.service.purchase.PurchaseService;
import com.shifeng.service.register.RegisterService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class ChannelJob {

	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name="channelService")
	private ChannelService channelService;
	
	@Resource(name="channelurlService")
	private ChannelurlService channelurlService;
	
	@Resource(name="registerService")
	private RegisterService registerService;
	
	@Resource(name="purchaseService")
	private PurchaseService purchaseService;
	
   public void execute(){
	   logger.info("【执行保存渠道任务】");
	   
		List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_LIST_NEW_DATA, 0, -1);
		if(strList.size()>0){
			for(String str:strList){
				logger.info("一："+str);
				JSONObject jsonobject = JSONObject.fromObject(str);
				logger.info("二："+jsonobject);
				if(jsonobject != null){
					Channel channel = (Channel)JSONObject.toBean(jsonobject, Channel.class);
					logger.info("三："+channel.getName());
					try {
						channelService.saveChannel(channel);
						RedisTool.lrem(Const.INTERFACE_CHANNEL_LIST_NEW_DATA, 1, str);
					} catch (Exception e) {
						e.printStackTrace();
					}
					/*String cId = String.format(Const.INTERFACE_CHANNEL_URL,channel.getId()+"");//Const.INTERFACE_CHANNEL_URL.replace("%s",  channel.getId()+"");// 渠道ID
					String urlJson = RedisTool.hget(Const.INTERFACE_CHANNEL_URL_HASH, cId);// 链接map中，该渠道对应的链接
					if(urlJson != null){
						logger.info("--"+urlJson);
						List<Channelurl> list = (List<Channelurl>) JSONArray.toCollection(JSONArray.fromObject(urlJson), Channelurl.class);  ;//JSONArray.toList(JSONArray.fromObject(urlsJson), Channelurl.class);
						logger.info(list.get(0).getUrl());
					}*/
					
				}

			}
		}
		
		executeChannelUrlJob();
		executeRegisterJob();
		executePurchaseJob();
   }

	
  public void executeChannelUrlJob(){
	   logger.info("【执行保存渠道URL任务】");
		List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST_NEW_DATA, 0, -1);
		if(strList.size()>0){
			for(String str:strList){
				logger.info(str);
				
				JSONObject jsonobject = JSONObject.fromObject(str);
				logger.info("******************"+jsonobject);
				if(jsonobject != null){
					
					//List<Channelurl> list = (List<Channelurl>) JSONArray.toCollection(JSONArray.fromObject(jsonobject), Channelurl.class);
					
					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
					logger.info(channelurl.getUrl());
					try {
						channelurlService.saveChannelurl(channelurl);
						RedisTool.lrem(Const.INTERFACE_CHANNEL_URL_LIST_NEW_DATA, 1, str);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}

			}
		}
		
  }
  
	
  public void executeRegisterJob(){
	   logger.info("【执行保存注册明细任务】");
		String str = RedisTool.rpop(Const.STATISTICS_AD_REGISTER_DATA_DAY);
		while (!StringUtils.isEmpty(str)) {
			logger.info(str);
			
			JSONObject jsonobject = JSONObject.fromObject(str);
			logger.info("******************"+jsonobject);
			if(jsonobject != null){
				
				Register register = (Register)JSONObject.toBean(jsonobject, Register.class);
				register.setCounty(IPSeeker.I.getAddress(register.getIp()));
				register.setNowYearMonth(DateUtil.getNowYearMonth());
				logger.info(register.getUserid());
				try {
					registerService.saveRegister(register);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			str = RedisTool.rpop(Const.STATISTICS_AD_REGISTER_DATA_DAY);
		}
		 
		
  }
  

  public void executePurchaseJob(){
	   logger.info("【执行保存购买明细任务】");
		String str = RedisTool.rpop(Const.STATISTICS_AD_PURCHASE_DATA_DAY);
		while (!StringUtils.isEmpty(str)) {
			logger.info(str);
			
			JSONObject jsonobject = JSONObject.fromObject(str);
			logger.info("******************"+jsonobject);
			if(jsonobject != null){
				
				Purchase purchase = (Purchase)JSONObject.toBean(jsonobject, Purchase.class);
				purchase.setCounty(IPSeeker.I.getAddress(purchase.getIp()));
				purchase.setNowYearMonth(DateUtil.getNowYearMonth());
				logger.info(purchase.getUserid());
				try {
					purchaseService.savePurchase(purchase);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			str = RedisTool.rpop(Const.STATISTICS_AD_PURCHASE_DATA_DAY);
		}
		 
		
  }
   
}
