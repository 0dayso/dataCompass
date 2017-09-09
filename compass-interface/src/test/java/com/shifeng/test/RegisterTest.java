package com.shifeng.test;

import java.util.List;
import java.util.Map;

import org.springframework.util.StringUtils;

import com.shifeng.entity.register.Register;
import com.shifeng.entity.visit.Visit;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class RegisterTest {

	public static void main(String[] args) {
		RegisterTest test = new RegisterTest();
		// 添加测试访问缓存数据
		
		test.push();

		//test.show();
	}
	
	private void show() {
		// TODO Auto-generated method stub
		List<String> list = RedisTool.lrange(Const.STATISTICS_AD_REGISTER_DATA_DAY, 0, -1);
		for (String string : list) {
			System.out.println(string);
		}
	}

	private void push() {
		for(int i=0;i<10;i++){
			Register r = new Register();
			r.setUserid(3100+i);
			r.setIp("192.168.1.6"+i);
			r.setChannelid(0);
			r.setChannelUrlId("0");
			r.setRegistertime(DateUtil.getTime());
			r.setSource("");
			r.setActiveId("");
			r.setType(i%4+"");
			r.setCounty("北京");
			reg(r);
		}
	}
	

	public void reg(Register r) {
		// [1]根据ip判断缓存是否存在
		
		String key = String.format(Const.INTERFACE_VISIT_IP, r.getIp());
		String json = RedisTool.get(key);
		
		// [2]如果缓存中没有数据进行新增操作
		if(StringUtils.isEmpty(json)){

			// 采用这样的方式处理默认值 当json为空的时候或不为空的时候都能够处理到,不可直接对实体类中的字段设置默认值
			/*
			 * 例1：直接对实体类中字段设置默认值（Integer channelid = 0;）；当json为空的时候持久化时，会造成为null的现象
			 * 例2：在set方法中设置默认值；当json不为空的时候因为已经有了默认值，将不再会取缓存中该ip对应的渠道信息
			 */
			r.setDefault();
			json = JSONObject.fromObject(r).toString();
			
		}else{
			// [3]取出缓存数据,转换成bean
			Visit cacheVisit = (Visit) JSONObject.toBean(JSONObject.fromObject(json), Visit.class);

			// [3.1]合并数据
			r.combine(cacheVisit);
			
			json = JSONObject.fromObject(r).toString();
			
			// [3.2]更新缓存
			RedisTool.set(key, JSONObject.fromObject(cacheVisit).toString());
			
		}
		
		// [4]添加历史记录
		RedisTool.lpush(Const.STORM_AD_REGISTER_DATA, json);
		
		System.out.println("添加成功-----------------------------------");
	}

}
