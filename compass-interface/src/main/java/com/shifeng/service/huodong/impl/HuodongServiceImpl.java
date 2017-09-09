package com.shifeng.service.huodong.impl;

import org.springframework.stereotype.Service;

import com.shifeng.entity.huodong.Wumai;
import com.shifeng.service.huodong.HuodongService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

@Service("huodongServiceImpl")
public class HuodongServiceImpl implements HuodongService{


	/**
	 * 雾霾活动记录
	 */
	public void wumai(Wumai wumai)throws Exception {
		String value = JSONObject.fromObject(wumai).toString();
		RedisTool.lpush(Const.HUODONG_WUMAI_DATA,value );
		//RedisTool.expire(Const.HUODONG_WUMAI_DATA, (int)(DateUtil.currentDayResidueTime()/1000));
	}
	
}
