package com.shifeng.job;

import java.util.List;

import javax.annotation.Resource;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.service.channel.ChannelurlService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class ChannelUrlJob {
	
	@Resource(name="channelurlService")
	private ChannelurlService channelurlService;
	
   public void execute(){
	   System.out.println("【执行保存渠道URL任务】");
	   
		List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST_NEW_DATA, 0, -1);
		if(strList.size()>0){
			for(String str:strList){
				System.out.println(str);
				
				JSONObject jsonobject = JSONObject.fromObject(str);
				System.out.println("******************"+jsonobject);
				if(jsonobject != null){
					
					//List<Channelurl> list = (List<Channelurl>) JSONArray.toCollection(JSONArray.fromObject(jsonobject), Channelurl.class);
					
					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
					System.out.println(channelurl.getUrl());
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

}
