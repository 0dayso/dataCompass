package com.shifeng.test;

import com.shifeng.entity.Login;
import com.shifeng.entity.shop.Cost;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class ShopCostTest {

	public static void main(String[] args) {

		//pushTestData();
		
		post();
		
		// 查看数据
		//show();
		
	}

	private static  void post(){
		Map map =new HashMap();
		for (int i = 1; i <100 ; i++) {
			map.clear();

			map.put("ip","219.142.228.38");
			map.put("ctime", DateUtil.getTime());
			map.put("source",i+"");
			map.put("type",i%4+"");
			map.put("status",i%3+1+"");
			map.put("shopid",i+"");
			map.put("shopname",i+"");
			map.put("money",i+"");
			System.out.println(MyPost.doPost("shop/cost",map));
		}

	}
	  
	private static void pushTestData() {

		for (int i = 0; i <100 ; i++) {
			try{
				Cost purchase=new Cost();

				purchase.setIp("124.126.207.1"+i);
				purchase.setSource("");
				purchase.setType(i%4);
				purchase.setCounty("北京");
				purchase.setCtime("2016-12-1 9:10:00");
				purchase.setStatus(i%2+1);
				purchase.setShopid(i);
				purchase.setShopname(i+"");
				purchase.setMoney(i+0d);

				String orderIdJsonVal = JSONObject.fromObject(purchase).toString();
				RedisTool.lpush(Const.INTERFACE_SHOP_COST_LIST, orderIdJsonVal);

			}catch (Exception e){

			}
		}
	}

}
