package com.shifeng.test;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.shifeng.entity.msg.SendMsg;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.http.message.BasicNameValuePair;

public class MsgTest {

	public static void main(String[] args) {
		post();
	}
	private static  void post(){
		Map map =new HashMap();
		for (int i = 1; i <2 ; i++) {
			map.put("userid", i+"");
			map.put("username", i+"");
			map.put("ip", "0.0.0.0");
			map.put("ctime", DateUtil.getTime());
			map.put("source", "0");
			map.put("type", "0");
			map.put("shopid", i+"");
			map.put("shopname", i+"");
			map.put("content", i+"");
			map.put("status", "2");

			System.out.println(MyPost.doPost("msg/send",map));
		}

	}
}
