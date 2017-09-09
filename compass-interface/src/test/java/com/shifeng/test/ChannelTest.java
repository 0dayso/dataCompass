package com.shifeng.test;

import java.util.List;

import com.shifeng.entity.channel.Channel;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class ChannelTest {

	public static void main(String[] args) {
		// 添加测试数据
		//pushTestData();
		
		//clear();
		
		// 查看数据
		show();
		
	}
	
	private static void clear() {
		// TODO Auto-generated method stub
		RedisTool.del(Const.INTERFACE_CHANNEL_LIST);
		RedisTool.del(Const.INTERFACE_CHANNEL_LIST_NEW_DATA);
	}
	
	private static void show() {
		// TODO Auto-generated method stub
		
		List<String> list = RedisTool.lrange(Const.INTERFACE_CHANNEL_LIST, 0, -1);
		for (String string : list) {
			System.out.println(string);
		}
	}
	
	private static void pushTestData() {
		// TODO Auto-generated method stub

		
		RedisTool.del(Const.INTERFACE_CHANNEL_LIST);
		
		Channel channel = new Channel();
		channel.setId(0);
		channel.setName("百度");
		channel.setStatus(0);
		
		Channel channel2 = new Channel();
		channel2.setId(1);
		channel2.setName("九牛");
		channel2.setStatus(0);
		
		// [2.1]转换数据为json
		String jsonVal = JSONObject.fromObject(channel).toString();
		String jsonVal2 = JSONObject.fromObject(channel2).toString();
		
		// [2.2]存储list格式
		RedisTool.lpush(Const.INTERFACE_CHANNEL_LIST, jsonVal);
		RedisTool.lpush(Const.INTERFACE_CHANNEL_LIST_NEW_DATA,jsonVal);
		
		RedisTool.lpush(Const.INTERFACE_CHANNEL_LIST, jsonVal2);
		RedisTool.lpush(Const.INTERFACE_CHANNEL_LIST_NEW_DATA,jsonVal2);
	}

}
