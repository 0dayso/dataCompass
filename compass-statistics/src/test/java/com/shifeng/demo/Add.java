package com.shifeng.demo;

import java.util.List;

import com.shifeng.entity.channel.Channel;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class Add {

	public static void main(String[] args) {
		
		RedisTool.del(Const.INTERFACE_CHANNEL_LIST_NEW_DATA);
		Channel channel = new Channel();
		channel.setId(1);
		channel.setName("百度");
		channel.setStatus(0);
		String value = JSONObject.fromObject(channel).toString();
		System.out.println(value);
		RedisTool.lpush(Const.INTERFACE_CHANNEL_LIST_NEW_DATA,value);
		
		Channel channel2 = new Channel();
		channel2.setId(2);
		channel2.setName("微信");
		channel2.setStatus(0);
		value = JSONObject.fromObject(channel2).toString();
		System.out.println(value);
		RedisTool.lpush(Const.INTERFACE_CHANNEL_LIST_NEW_DATA,value);

		List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_LIST_NEW_DATA, 0, -1);
		System.out.println(strList);
	}

}
