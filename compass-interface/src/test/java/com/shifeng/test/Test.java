package com.shifeng.test;

import com.shifeng.ip.IPSeeker;
import com.shifeng.util.DateUtil;

import java.util.HashMap;
import java.util.Map;

public class Test {
	static String Url="http://127.0.0.1:8080/";
	public static void main(String[] args) {
		/*String IP = "127.0.0.1";
		//IPSeeker.I.init();
		String country = IPSeeker.I.getAddress(IP);
		System.out.println(country);*/

	//MyPost.testPost();
		/**/Map map =new HashMap();
		for (int i = 1; i <2 ; i++) {
			map.clear();
			//userid=1206&ip=106.120.38.165&channelid=123&sku=4579&number=1&amount=199&channelUrlId=&source=
			// &activeId=1233&purchasetime=2016/12/16 11:15:18&status=0&type=1&shopId=200049&
			// orderId=16121600675&productId=717

			map.put("userid","1206");
			map.put("username",i+"");
			map.put("ip","106.120.38.165");
			map.put("channelid","0");
			map.put("sku","4579");
			map.put("number", "1");
			map.put("purchasetime","2016-12-16 11:15:18");
			map.put("activeId","1233");
			map.put("status","0");
			map.put("productId","717");
			map.put("type","1");
			map.put("shopId","200049");
			map.put("orderId","16121600675");
			map.put("amount","199");
			map.put("channelUrlId","");
			map.put("source","");
			System.out.println(MyPost.doPost("purchase/buy",map));
		}






		// System.out.println(MyPost.doPostXML());
	}

}
