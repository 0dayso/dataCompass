package com.shifeng.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.StringUtils;

import com.shifeng.entity.purchase.Purchase;
import com.shifeng.entity.visit.Visit;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class PurchaseTest {

	public static void main(String[] args) {
		
		//show();
		
		
		 push();
		
	}
	
	private static void push() {
		for(int i=0;i<3;i++){

			Purchase purchase = new Purchase();
			purchase.setUserid(i);
			purchase.setIp("192.168.1."+i);
			purchase.setChannelid(0);
			purchase.setProductId(i);
			purchase.setSku(i+"");
			purchase.setNumber(i);
			purchase.setAmount(0.01d);
			purchase.setPurchasetime(DateUtil.getTime());
			purchase.setChannelUrlId("0");
			purchase.setSource("");
			purchase.setActiveId("");
			purchase.setStatus(i%2);
			purchase.setType(i%4);
			purchase.setShopId(i);
			purchase.setOrderId("459895285"+i);
			purchase.setCounty("北京");
			PurchaseTest test = new PurchaseTest();
			test.buy(purchase);
		}
	}
	

	public Map<String, String> buy(Purchase p) {
		Map<String, String> map = new HashMap<String, String>();
		map.put(Const.REQ_CODE, "500");
		if (p.getUserid() == null) {
			map.put(Const.REQ_MSG, "用户ID不能为空");
			return map;
		}
		if (StringUtils.isEmpty(p.getIp())) {
			map.put(Const.REQ_MSG, "用户IP不能为空");
			return map;
		}
		if (StringUtils.isEmpty(p.getSku())) {
			map.put(Const.REQ_MSG, "SKU不能为空");
			return map;
		}
		if (StringUtils.isEmpty(p.getNumber())) {
			map.put(Const.REQ_MSG, "数量不能为空");
			return map;
		}
		if (p.getAmount() == null) {
			map.put(Const.REQ_MSG, "金额不能为空");
			return map;
		}
		if (StringUtils.isEmpty(p.getPurchasetime()) 
				|| !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(p.getPurchasetime())) {
			map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
			return map;
		}

		if (p.getStatus() == null) {
			map.put(Const.REQ_MSG, "状态不能为空");
			return map;
		}

		if (p.getType() == null) {
			map.put(Const.REQ_MSG, "站点来源不能为空");
			return map;
		}

		if (p.getShopId() == null) {
			map.put(Const.REQ_MSG, "店铺ID不能为空");
			return map;
		}

		if (StringUtils.isEmpty(p.getOrderId())) {
			map.put(Const.REQ_MSG, "订单ID不能为空");
			return map;
		}

		try {
			buy(map, p);
		} catch (Exception e) {
		}

		return map;
	}
	public void buy(Map<String, String> map, Purchase purchase)  throws Exception{
		// [1]根据ip判断缓存是否存在
		
		String key = String.format(Const.INTERFACE_VISIT_IP, purchase.getIp());
		String json = RedisTool.get(key);
		
		// 保存唯一订单
		saveUniqueOrder(purchase);
		
		// [2]如果缓存中没有数据进行新增操作
		if(StringUtils.isEmpty(json)){
			// 采用这样的方式处理默认值 当json为空的时候或不为空的时候都能够处理到,不可直接对实体类中的字段设置默认值
			/*
			 * 例1：直接对实体类中字段设置默认值（Integer channelid = 0;）；当json为空的时候持久化时，会造成为null的现象
			 * 例2：在set方法中设置默认值；当json不为空的时候因为已经有了默认值，将不再会取缓存中该ip对应的渠道信息
			 */
			purchase.setDefault();
			json = JSONObject.fromObject(purchase).toString();
		}else{
			// [3]取出缓存数据,转换成bean
			Visit cacheVisit = (Visit) JSONObject.toBean(JSONObject.fromObject(json), Visit.class);

			// [3.1]合并数据
			purchase.combine(cacheVisit);
			
			json = JSONObject.fromObject(purchase).toString();
			
			// [3.2]更新缓存
			RedisTool.set(key, JSONObject.fromObject(cacheVisit).toString());
		}
		
		// [4]添加历史记录
		RedisTool.lpush(Const.STORM_AD_PURCHASE_DATA, json);
		
		map.put(Const.REQ_CODE, "0");
	}
	
	
	/**
	 * 保存唯一订单
	 * @param purchase
	 */
	private void saveUniqueOrder(Purchase purchase) {
		// TODO Auto-generated method stub

		String orderIdKey = String.format(Const.INTERFACE_PURCHASE_ORDER_ID, purchase.getOrderId());
		String orderIdJsonVal = RedisTool.get(orderIdKey);
		
		// [2]保存每天唯一的订单
		if(StringUtils.isEmpty(orderIdJsonVal)){
			purchase.setDefault();
			orderIdJsonVal = JSONObject.fromObject(purchase).toString();
			RedisTool.set(orderIdKey, "1");
			RedisTool.expire(orderIdKey, (int)(DateUtil.currentDayResidueTime()/1000));
			
			RedisTool.lpush(Const.STORM_AD_PURCHASE_ORDERID_DATA, orderIdJsonVal);
		}
	}
	
	private static void show() {
		// TODO Auto-generated method stub
		List<String> list = RedisTool.lrange(Const.STORM_AD_PURCHASE_DATA, 0, -1);
		List<String> list2 = RedisTool.lrange(Const.STATISTICS_AD_PURCHASE_DATA_DAY, 0, -1); 
		List<String> orders = RedisTool.lrange(Const.STORM_AD_PURCHASE_ORDERID_DATA, 0, -1);

		for (String string : list2) {
			System.out.println(string);
		}
		
		// 转换bean
		/*for (String item : list) {
			Purchase visit = (Purchase) JSONObject.toBean(JSONObject.fromObject(item), Purchase.class);
			System.out.println(visit.getIp());
		}

		for (String item : list) {
			System.out.println(item);
		}*/
	}

}
