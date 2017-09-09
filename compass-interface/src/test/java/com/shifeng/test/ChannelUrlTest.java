package com.shifeng.test;

import java.util.List;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class ChannelUrlTest {

	public static void main(String[] args) {
		// 添加测试数据
		//add();
		
		// 查看数据
		show();

		//clear();
	}
	
	private static void clear() {
		// TODO Auto-generated method stub
		RedisTool.del(Const.INTERFACE_CHANNEL_URL_LIST);
	}
	
	private static void add() {
		Channelurl channelurl = new Channelurl();
		channelurl.setId(1);
		channelurl.setCid(0);
		channelurl.setUrl("http://www.seebong.com/Product/1085.html");
		channelurl.setName("百度子连接");
		channelurl.setStatus(0);
		
		Channelurl channelurl2 = new Channelurl();
		channelurl2.setId(2);
		channelurl2.setCid(1);
		channelurl2.setUrl("http://www.seebong.com/Product/1088.html");
		channelurl2.setName("九牛子连接");
		channelurl2.setStatus(0);
		
		// [1]判断链接是否存在
		String urlJsonVal = JSONObject.fromObject(channelurl).toString();
		String urlJsonVal2 = JSONObject.fromObject(channelurl2).toString();

		RedisTool.lpush(Const.INTERFACE_CHANNEL_URL_LIST, urlJsonVal);
		RedisTool.lpush(Const.INTERFACE_CHANNEL_URL_LIST_NEW_DATA, urlJsonVal);

		RedisTool.lpush(Const.INTERFACE_CHANNEL_URL_LIST, urlJsonVal2);
		RedisTool.lpush(Const.INTERFACE_CHANNEL_URL_LIST_NEW_DATA, urlJsonVal2);
		
	}
	
	private static void show() {
		List<String> list = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
		for (String string : list) {
			System.out.println(string);
		}
		
	}
}
