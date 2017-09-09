package com.shifeng.test;

import com.shifeng.entity.Login;
import com.shifeng.entity.backstage.Operation;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class LoginTest {

	public static void main(String[] args) {

		//pushTestData();
		
		post();
		
		// 查看数据
		//show();
		
	}


	private static  void post(){
		Map map =new HashMap();
		for (int i = 1; i <2 ; i++) {
			map.clear();
			map.put("userid",i+"");
			map.put("username",i+"");
			map.put("ip","219.142.228.38");
			map.put("ctime", DateUtil.getTime());
			map.put("source",i+"");
			map.put("type",i%4+"");
			map.put("status",i%2+1+"");
			System.out.println(MyPost.doPost("login/req",map));
		}

	}
	private static void pushTestData() {

		for (int i = 0; i <100 ; i++) {
			try{
				Login purchase=new Login();
				purchase.setUserid(i);
				purchase.setIp("219.142.228.38");
				purchase.setSource("");
				purchase.setType(i%4);
				purchase.setCounty("北京");
				purchase.setCtime(DateUtil.getTime());
				purchase.setStatus(i%2+1);
				purchase.setUsername("阿萨德"+i);
				String orderIdJsonVal = JSONObject.fromObject(purchase).toString();
				RedisTool.lpush(Const.INTERFACE_LOGIN_LIST, orderIdJsonVal);

			}catch (Exception e){
e.printStackTrace();
			}
		}
	}

}
