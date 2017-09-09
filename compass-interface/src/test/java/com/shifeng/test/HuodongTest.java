package com.shifeng.test;

import java.util.List;

import com.shifeng.entity.huodong.Wumai;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class HuodongTest {

	public static void main(String[] args) {
		Wumai wumai = new Wumai();
		wumai.setCounty("北京");
		wumai.setCtime(DateUtil.getTime());
		wumai.setIp("192.168.1.177");
		wumai.setSku("123");
		wumai.setSource("55555");
		wumai.setStatus(1);
		String value = JSONObject.fromObject(wumai).toString();
		RedisTool.lpush(Const.HUODONG_WUMAI_DATA,value );
		RedisTool.expire(Const.HUODONG_WUMAI_DATA, (int)(DateUtil.currentDayResidueTime()/1000));
		List<String> sendMsgList = RedisTool.lrange(Const.HUODONG_WUMAI_DATA, 0, -1);
		
		System.out.println(sendMsgList.toString());
	}

}
