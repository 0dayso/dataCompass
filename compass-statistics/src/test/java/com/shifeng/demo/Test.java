package com.shifeng.demo;

import java.util.ArrayList;
import java.util.List;

import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.channel.Channelurl;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Test {

	public static void main(String[] args) {
	 
		List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_LIST_NEW_DATA, 0, -1);
		if(strList.size()>0){
			for(String str:strList){
				System.out.println(str);
				
				JSONObject jsonobject = JSONObject.fromObject(str);
				System.out.println("******************"+jsonobject);
				if(jsonobject != null){
					Channel channel = (Channel)JSONObject.toBean(jsonobject, Channel.class);
					System.out.println(channel.getName());
					/*String cId = String.format(Const.INTERFACE_CHANNEL_URL,channel.getId()+"");//Const.INTERFACE_CHANNEL_URL.replace("%s",  channel.getId()+"");// 渠道ID
					String urlJson = RedisTool.hget(Const.INTERFACE_CHANNEL_URL_HASH, cId);// 链接map中，该渠道对应的链接
					if(urlJson != null){
						System.out.println("--"+urlJson);
						List<Channelurl> list = (List<Channelurl>) JSONArray.toCollection(JSONArray.fromObject(urlJson), Channelurl.class);  ;//JSONArray.toList(JSONArray.fromObject(urlsJson), Channelurl.class);
						System.out.println(list.get(0).getUrl());
					}*/
					
				}

			}
		}
	}

}
