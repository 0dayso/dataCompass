package com.shifeng.test;

import java.util.List;

import org.springframework.util.StringUtils;

import com.shifeng.entity.search.Search;
import com.shifeng.entity.visit.Visit;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class SearchTest {

	public static void main(String[] args) {
		
		//push();
		
		show();
		
	}
	
	private static void show() {
		List<String> list = RedisTool.lrange(Const.STATISTICS_AD_SEARCH_DATA_DAY, 0, -1);
		for (String string : list) {
			System.out.println("搜索记录："+string);
		}
		
		
		List<String> list2 = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD()), 0, -1);
		for (String string : list2) {
			System.out.println("当天店铺id："+string);
		}
		

		List<String> list3 = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, DateUtil.getYYYY_MM_DD()), 0, -1);
		for (String string : list3) {
			System.out.println("当天访问类型："+string);
		}
	
	
	}
	
	private static void push() {
		RedisTool.del(Const.STORM_AD_SEARCH_DATA);
		
		for(int i=1;i<10;i++){
			Search s = new Search();
			s.setIp("192.168.1."+i);
			s.setKeyword("背包"+i);
			s.setShopId(0);
			s.setStatistics_time("2016-11-14 13:44:0"+i);
			s.setType(0);
			s.setUserid(0);
			
			String val = JSONObject.fromObject(s).toString();
			RedisTool.lpush(Const.STORM_AD_SEARCH_DATA, val);
		}
		
		RedisTool.del(String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD()));
		RedisTool.del(String.format(Const.STATISTICS_AD_TYPE_ID, DateUtil.getYYYY_MM_DD()));
		
		
		RedisTool.lpush(String.format(Const.STATISTICS_AD_TYPE_ID, DateUtil.getYYYY_MM_DD()), "0");
		RedisTool.lpush(String.format(Const.STATISTICS_AD_TYPE_ID, DateUtil.getYYYY_MM_DD()), "1");
		RedisTool.lpush(String.format(Const.STATISTICS_AD_TYPE_ID, DateUtil.getYYYY_MM_DD()), "2");
		RedisTool.lpush(String.format(Const.STATISTICS_AD_TYPE_ID, DateUtil.getYYYY_MM_DD()), "3");
		

		RedisTool.lpush(String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD()), "0");
		RedisTool.lpush(String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD()), "200159");
		RedisTool.lpush(String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD()), "200160");
		RedisTool.lpush(String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD()), "200161");
		RedisTool.lpush(String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD()), "200162");
		RedisTool.lpush(String.format(Const.STATISTICS_AD_SHOP_ID, DateUtil.getYYYY_MM_DD()), "200163");

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

}
