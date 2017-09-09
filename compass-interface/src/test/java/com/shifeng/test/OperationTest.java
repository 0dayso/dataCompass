package com.shifeng.test;

import com.shifeng.entity.backstage.Operation;
import com.shifeng.entity.channel.Channel;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OperationTest {

	public static void main(String[] args) {
		post();

	}

private static  void post(){
	Map map =new HashMap();
	for (int i = 1; i <100 ; i++) {
		map.clear();
		map.put("userid",i+"");
		map.put("username",i+"");
		map.put("ip","219.142.228.38");
		map.put("opttype",i%5+1+"");
		map.put("optcontent",i+"");
		map.put("optmodel",i+"");
		map.put("ctime", DateUtil.getTime());
		map.put("source",i+"");
		map.put("type",i%4+"");
		map.put("optsystem",i%2+1+"");
		System.out.println(MyPost.doPost("backstage/operation",map));
	}

}
	private static void pushTestData() {

		for (int i = 0; i <100 ; i++) {
			try{
				Operation purchase=new Operation();
				purchase.setUserid(123);
				purchase.setIp("124.126.207.1"+i);
				purchase.setSource("");
				purchase.setType(i%4);
				purchase.setCounty("北京");
				purchase.setCtime("2016-12-1 9:10:00");
				purchase.setOptcontent(i+"");
				purchase.setOptmodel(i+"");
				purchase.setOptsystem(i%3);
				purchase.setUsername("阿萨德"+i);
				String orderIdJsonVal = JSONObject.fromObject(purchase).toString();
				RedisTool.lpush(Const.INTERFACE_OPERATION_LIST, orderIdJsonVal);

			}catch (Exception e){

			}
		}
	}

}
