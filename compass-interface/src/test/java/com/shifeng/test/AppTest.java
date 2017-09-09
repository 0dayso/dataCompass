package com.shifeng.test;

import com.shifeng.entity.Login;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class AppTest {

	public static void main(String[] args) {

		//pushTestData();
		
		post();
		
		// 查看数据
		//show();
		
	}


	private static  void post(){
		Map map =new HashMap();
		for (int i = 1; i <5 ; i++) {
			map.clear();

			map.put("ip","219.142.228.38");
			map.put("ctime", DateUtil.getTime());
			map.put("source",i+"");
			map.put("status",i%2+1+"");
			System.out.println(MyPost.doPost("app/download",map));
		}

	}

}
