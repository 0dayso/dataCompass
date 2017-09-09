package com.shifeng.test;

import com.shifeng.entity.Login;
import com.shifeng.entity.follow.Cart;
import com.shifeng.entity.follow.Product;
import com.shifeng.entity.follow.Shop;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class FollowTest {

	public static void main(String[] args) {

		//pushskuData();
		//pushshopData();
		//pushcartData();
		 postcart();
		//postsku();
		//postshop();
	}

	private static  void postcart(){
		Map map =new HashMap();
		for (int i = 1; i <2 ; i++) {
			map.clear();
			map.put("userid",i+"");
			map.put("username",i+"");
			map.put("ip","219.142.228.38");
			map.put("status",i%2+1+"");
			map.put("shopId",i%4+"");
			map.put("sku",i+"");
			map.put("ctime",DateUtil.getTime());
			map.put("source",i+"");
			map.put("type",i%4+"");
			map.put("productId",i%2+1+"");
			System.out.println(MyPost.doPost("follow/cart",map));
		}

	}
	private static void pushcartData() {

		for (int i = 0; i <5 ; i++) {
			try{
				Cart purchase=new Cart();
				purchase.setUserid(123);
				purchase.setIp("219.142.228.38");
				purchase.setSource("");
				purchase.setType(i%4);
				purchase.setCounty("北京");
				purchase.setCtime(DateUtil.getTime());
				purchase.setStatus(i%2+1);
				purchase.setShopId(i);
				purchase.setSku(i+"");
				purchase.setProductId(i);
				String orderIdJsonVal = JSONObject.fromObject(purchase).toString();
				RedisTool.lpush(Const.STORM_AD_FOLLOW_CART_DATA, orderIdJsonVal);


			}catch (Exception e){

			}
		}
	}

	private static  void postshop(){
		Map map =new HashMap();
		for (int i = 1; i <30 ; i++) {
			map.clear();
			map.put("userid",i+"");
			map.put("ip","219.142.228.38");
			map.put("status",i%2+1+"");
			map.put("shopId",i%4+1+"");
			map.put("sku",i+"");
			map.put("ctime",DateUtil.getTime());
			map.put("source",i+"");
			map.put("type",i%4+"");
			System.out.println(MyPost.doPost("follow/shop",map));
		}

	}
	private static void pushshopData() {

		for (int i = 0; i <5 ; i++) {
			try{
				Shop purchase=new Shop();
				purchase.setUserid(123);
				purchase.setIp("219.142.228.38");
				purchase.setSource("");
				purchase.setType(i%4);
				purchase.setCounty("北京");
				purchase.setCtime(DateUtil.getTime());
				purchase.setStatus(i%2+1);
				purchase.setShopId(i);
				purchase.setSku(i+"");

				String orderIdJsonVal = JSONObject.fromObject(purchase).toString();
				RedisTool.lpush(Const.STORM_AD_FOLLOW_SHOP_DATA, orderIdJsonVal);


			}catch (Exception e){

			}
		}
	}

	private static  void postsku(){
		Map map =new HashMap();
		for (int i = 1; i <30 ; i++) {
			map.clear();
			map.put("userid",i+"");
			map.put("ip","219.142.228.38");
			map.put("status",i%2+1+"");
			map.put("shopId",i%4+"");
			map.put("sku",i+"");
			map.put("ctime",DateUtil.getTime());
			map.put("source",i+"");
			map.put("type",i%4+"");
			map.put("productId",i%2+1+"");
			System.out.println(MyPost.doPost("follow/goods",map));
		}

	}
	  
	private static void pushskuData() {

		for (int i = 0; i <5 ; i++) {
			try{
				Product   purchase=new Product();
				purchase.setUserid(123);
				purchase.setIp("219.142.228.38");
				purchase.setSource("");
				purchase.setType(i%4);
				purchase.setCounty("北京");
				purchase.setCtime(DateUtil.getTime());
				purchase.setStatus(i%2+1);
				purchase.setProductId(i);
				purchase.setShopId(i);
				purchase.setSku(i+"");
				String orderIdJsonVal = JSONObject.fromObject(purchase).toString();
				RedisTool.lpush(Const.STORM_AD_FOLLOW_SKU_DATA, orderIdJsonVal);





			}catch (Exception e){

			}
		}
	}

}
