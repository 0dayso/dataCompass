package com.shifeng.service.purchase.impl;

import java.util.Map;

import com.shifeng.entity.purchase.PurchaseCancel;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.entity.purchase.Purchase;
import com.shifeng.entity.visit.Visit;
import com.shifeng.service.purchase.PurchaseService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;


/**
 * 购买服务实现类
 * @author Yan
 *
 */
@Service("purchaseServiceImpl")
public class PurchaseServiceImpl implements PurchaseService {

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 购买
	 */
	@Override
	public void buy(Map<String, String> map, Purchase purchase)  throws Exception{
		
		// 保存唯一订单
		saveUniqueOrder(purchase);
		
		// 保存购买明细
		saveBuyDetail(purchase);
		
		map.put(Const.REQ_CODE, "0");
	}

	/**
	 * 取消订单 退换货接口
	 * @param map
	 * @param purchase
	 */
	@Override
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


	/**
	 * 保存购买明细
	 * @param purchase
	 */
	private void saveBuyDetail(Purchase purchase) {

		// [1]根据ip判断缓存是否存在
		String key = String.format(Const.INTERFACE_VISIT_IP, purchase.getIp());
		String json = RedisTool.get(key);
		
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

		logger.info("更新购买数据，ip："+purchase.getIp());
		// [4]添加历史记录
		RedisTool.lpush(Const.STORM_AD_PURCHASE_DATA, json);
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

}
