package com.shifeng.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.StringUtils;

import com.shifeng.entity.visit.Visit;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class VisitTest {

	public static void main(String[] args) {
		// 展示访问缓存数据
		VisitTest test = new VisitTest();
		
		test.push();
		
		//test.show();

	}
	
	private void show() {
		// TODO Auto-generated method stub
		String currentDayKey = String.format(Const.STATISTICS_AD_TYPE_ID, DateUtil.getYYYY_MM_DD());
		List<String> list = RedisTool.lrange(currentDayKey, 0, -1);
		

		List<String> list2 = RedisTool.lrange(Const.STORM_AD_VISIT_DATA_COOKIE, 0, -1);
		for (String string : list2) {
			System.out.println(string);
		}
	}
	
	private void push() {
		VisitTest test = new VisitTest();
		// TODO Auto-generated method stub
		for(int i=0;i<5;i++){

			Visit visit = new Visit();
			visit.setActiveId("");
			visit.setChannelid(0);
			visit.setChannelUrlId("0");
			visit.setIp("124.126.205."+i);
			visit.setSecond("");
			visit.setSource("");
			visit.setThree("");
			visit.setCounty("北京");
			// {{{{
			visit.setShopId(i%4);
			visit.setSku(i+"");

			/*visit.setShopId(0);
			visit.setSku("0");*/
			// }}}}
			
			
			
			// {{{{
			/*visit.setType(1);
			visit.setUrl("http://w.seebong.com/tab/home");*/
			
			visit.setType(i%4);
			visit.setUrl("http://www.seebong.com/Product/27243.html");
			// }}}}
			
			
			
			//visit.setUserid(1172);
			visit.setUserid(i);
			visit.setVisittime(DateUtil.getTime());
			
			
			visit.setCookieid("testcookie2016333"+i);
			
			test.req(visit);
		}
	}
	
	
	
	public Map<String, String> req(Visit visit) {
		// [1]定义返回对象，默认为失败
		Map<String, String> map = new HashMap<String, String>();
		map.put(Const.REQ_CODE, 500 + "");

		// [2]check
		if (StringUtils.isEmpty(visit.getIp())) {
			map.put(Const.REQ_MSG, "ip不能为空");
			return map;
		}
		if (StringUtils.isEmpty(visit.getUrl())) {
			map.put(Const.REQ_MSG, "URL不能为空");
			return map;
		}
		if (StringUtils.isEmpty(visit.getVisittime())
				|| !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(visit.getVisittime())) {
			map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
			return map;
		}
		if (visit.getType() == null) {
			map.put(Const.REQ_MSG, "站点来源不能为空");
			return map;
		}

		if (visit.getShopId() == null) {
			map.put(Const.REQ_MSG, "店铺ID不能为空");
			return map;
		}

		// [3]操作缓存
		try {
			req(map, visit);
		} catch (Exception e) {
		}

		return map;
	}
	
	/**
	 * 访问
	 */
	public void req(Map<String, String> map, Visit visit) throws Exception {
		
		// 保存访问数据
		saveVisiInfo(visit);

		// 保存每天唯一的用户，统计UV
		saveCurrentDayUserCache(visit);
		
		// 保存店铺供统计查询当天店铺id数据(48小时过期)  
		saveVisitShop(visit);
		
		// 保存站内来源供统计查询当天来源数据(48小时过期)
		saveVisitType(visit);
		
		// 根据cookie区分   ip相同  不同机器的用户
		saveCookieUser(visit);
		
		map.put(Const.REQ_CODE, "0");
	}
	
	/**
	 * 根据cookie区分   ip相同  不同机器的用户
	 * @param visit
	 */
	private void saveCookieUser(Visit visit) {
		if(StringUtils.isEmpty(visit.getCookieid())){
			return;
		}
		String key = String.format(Const.INTERFACE_VISIT_DATA_COOKIE, visit.getCookieid());
		String valJson = RedisTool.get(key);

		// [2]判断用户缓存
		if (StringUtils.isEmpty(valJson)) {
			// 标识当天该用户数据已经存在
			valJson = JSONObject.fromObject(visit).toString();
			RedisTool.set(key, "1");
			RedisTool.expire(key, (int) (DateUtil.currentDayResidueTime() / 1000));
			
			// 单cookie访问数据
			RedisTool.lpush(Const.STORM_AD_VISIT_DATA_COOKIE, valJson);
		}
	}
	
	/**
	 * 保存站内来源供统计查询当天来源数据(8小时过期)
	 * @param visit
	 */
	private void saveVisitType(Visit visit) {
		// [1]获取数据
		String visitType = visit.getType()+"";
		String key = String.format(Const.INTERFACE_VISIT_TYPE, visitType);
		String currentDayKey = String.format(Const.STATISTICS_AD_TYPE_ID, DateUtil.getYYYY_MM_DD());
		String jsonVal = RedisTool.get(key);
		
		// [2]保存当天唯一的来源ID
		if(StringUtils.isEmpty(jsonVal)){
			// [2.1]标识当天访问的的来源id已经保存
			RedisTool.set(key, "1");
			RedisTool.expire(key, (int) (DateUtil.currentDayResidueTime() / 1000));
			
			// [3]设置缓存的来源id集合为48小时过期
			List<String> list = RedisTool.lrange(currentDayKey,0,-1);
			RedisTool.lpush(currentDayKey, visitType);
			
			if(list.size() == 0){
				RedisTool.expire(currentDayKey, 48*60*60);
			}
			
		}

	}
	
	
	/**
	 * 保存店铺供统计查询当天店铺id数据(48小时过期)  
	 * @param visit
	 */
	private void saveVisitShop(Visit visit) {
		// [1]获取数据
		String shopId = visit.getShopId()+"";
		String key = String.format(Const.INTERFACE_VISIT_SHOP_ID, shopId);
		String currentDayKey = String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD());
		String jsonVal = RedisTool.get(key);
		
		// [2]保存当天唯一的店铺ID
		if(StringUtils.isEmpty(jsonVal)){
			// [2.1]标识当天访问的的店铺id已经保存
			RedisTool.set(key, "1");
			RedisTool.expire(key, (int) (DateUtil.currentDayResidueTime() / 1000));
			
			// [3]设置缓存的店铺id集合为48小时过期
			List<String> list = RedisTool.lrange(currentDayKey,0,-1);
			RedisTool.lpush(currentDayKey, shopId);
			
			if(list.size() == 0){
				RedisTool.expire(currentDayKey, 48*60*60);
			}
			
		}

	}
	
	/**
	 * 保存访问数据
	 * @param visit
	 */
	private void saveVisiInfo( Visit visit) {
		// [1]根据ip判断缓存是否存在
		String key = String.format(Const.INTERFACE_VISIT_IP, visit.getIp());
		String json = RedisTool.get(key);// 访问ip
		// [3]判断访问缓存
		if (StringUtils.isEmpty(json)) {
			// 采用这样的方式处理默认值 当json为空的时候或不为空的时候都能够处理到,不可直接对实体类中的字段设置默认值
			/*
			 * 例1：直接对实体类中字段设置默认值（Integer channelid = 0;）；当json为空的时候持久化时，会造成为null的现象
			 * 例2：在set方法中设置默认值；当json不为空的时候因为已经有了默认值，将不再会取缓存中该ip对应的渠道信息
			 */
			visit.setDefault();
			json = JSONObject.fromObject(visit).toString();
			
			// 标识当天该数据已经存在
			RedisTool.set(key, json);
			RedisTool.expire(key, (int) (DateUtil.currentDayResidueTime() / 1000));

			// 单ip访问数据
			RedisTool.lpush(Const.STORM_AD_VISIT_DATA_IP, json);

		} else {
			// [4]取出缓存数据,转换成bean
			Visit cacheVisit = (Visit) JSONObject.toBean(JSONObject.fromObject(json), Visit.class);
			// [4.1]合并数据
			visit.combine(cacheVisit);

			json = JSONObject.fromObject(visit).toString();

			// [4.2]更新缓存
			RedisTool.set(key, JSONObject.fromObject(cacheVisit).toString());

		}

		// [5]添加历史记录
		RedisTool.lpush(Const.STORM_AD_VISIT_DATA, json);
	}

	/**
	 * 保存每天唯一的用户
	 * 
	 * @param userJson
	 * @param visit
	 * @param userKey
	 */
	private void saveCurrentDayUserCache(Visit visit) {
		// 过滤没有登录的用户
		if(visit.getUserid() == 0){
			return;
		}
		String userKey = String.format(Const.INTERFACE_VISIT_USER, visit.getUserid());
		String userJson = RedisTool.get(userKey);

		// [2]判断用户缓存（UV）
		if (StringUtils.isEmpty(userJson)) {
			// 标识当天该用户数据已经存在
			userJson = JSONObject.fromObject(visit).toString();
			RedisTool.set(userKey, "1");
			RedisTool.expire(userKey, (int) (DateUtil.currentDayResidueTime() / 1000));
			
			// 单userid访问数据
			RedisTool.lpush(Const.STORM_AD_VISIT_DATA_USERID, userJson);
			
		}

	}

}
