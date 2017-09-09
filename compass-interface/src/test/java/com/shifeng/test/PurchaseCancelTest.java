package com.shifeng.test;

import com.shifeng.entity.purchase.PurchaseCancel;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PurchaseCancelTest {

	public static void main(String[] args) {
		
		//show();
		
		
		 push();
		
	}
	
	private static void push() {
		for(int i=1;i<2;i++){

			PurchaseCancel purchase = new PurchaseCancel();
			purchase.setUserid(123);
			purchase.setIp("124.126.207.1"+i);
			purchase.setChannelid(0);
			purchase.setSku(i+"");
			purchase.setNumber(1);
			purchase.setAmount(500.45);
			purchase.setProductId(i);
			purchase.setPurchasetime(DateUtil.getTime());
			purchase.setChannelUrlId("0");
			purchase.setSource("");
			purchase.setActiveId("");
			purchase.setStatus(4);
			purchase.setType(i%4);
			purchase.setShopId(i);
			purchase.setOrderId("459895285"+i);
			purchase.setReasontype(i%3+1);
			purchase.setReason(i+"");
			purchase.setCounty("北京");
			purchase.setSubmittime(DateUtil.getTime());
			PurchaseCancelTest test = new PurchaseCancelTest();
			test.buy(purchase);
		}
	}
	

	public Map<String, String> buy(PurchaseCancel p) {
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
			cancel(map, p);
		} catch (Exception e) {
		}

		return map;
	}


	public void cancel(Map<String, String> map, PurchaseCancel purchase) {
		{

			String orderIdKey = String.format(Const.INTERFACE_PURCHASE_CANCEL_ORDER_ID, purchase.getOrderId());
			String orderIdJsonVal = RedisTool.get(orderIdKey);
			if(StringUtils.isEmpty(orderIdJsonVal)){
				orderIdJsonVal = JSONObject.fromObject(purchase).toString();
				RedisTool.set(orderIdKey, "1");
				RedisTool.expire(orderIdKey, (int)(DateUtil.currentDayResidueTime()/1000));
				RedisTool.lpush(Const.STORM_AD_PURCHASE_CANCEL_ORDERID_DATA, orderIdJsonVal);
			}
		}
		map.put(Const.REQ_CODE, "0");
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
