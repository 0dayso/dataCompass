package com.shifeng.demo;

import java.util.ArrayList;
import java.util.List;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONArray;

public class AddUrl {

	public static void main(String[] args) {
		int id = 0;
		Channelurl url = new Channelurl();
		url.setCid(id);
		url.setUrl("http://wanrma.com");
		// [3.2.1]新增该渠道对应的链接缓存
		List<Channelurl> list = new ArrayList<Channelurl>();
		list.add(url);
		String value = JSONArray.fromObject(list).toString();
		//String cId = Const.INTERFACE_CHANNEL_URL.replace("%s", id+"");// 渠道ID

		//RedisTool.hset(Const.INTERFACE_CHANNEL_URL_HASH, cId, value);


	}

}
