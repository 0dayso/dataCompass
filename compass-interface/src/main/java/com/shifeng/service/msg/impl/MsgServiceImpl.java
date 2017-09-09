package com.shifeng.service.msg.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.entity.msg.SendMsg;
import com.shifeng.service.msg.MsgService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("msgServiceImpl")
public class MsgServiceImpl implements MsgService{
	


	/**
	 * 发送消息
	 * @param msg
	 * @throws Exception
	 */
	public void sendMsg(SendMsg msg)throws Exception {
		String value = JSONObject.fromObject(msg).toString();
		RedisTool.lpush(Const.MSG_SC_DATA,value );
		String key = String.format(Const.MSG_SC_DATE_USERID_SHOPID,DateUtil.getYYYY_MM_DD(),msg.getUserid(),msg.getShopid());
		RedisTool.lpush(key, value);
		//RedisTool.expire(key, (int)(DateUtil.currentDayResidueTime()/1000));
	}

	


	/**
	 * 获取消息发送历史记录
	 * @param msg
	 * @throws Exception
	 */
	public List<SendMsg> his(SendMsg msg)throws Exception {
		String key = String.format(Const.MSG_SC_DATE_USERID_SHOPID,DateUtil.getYYYY_MM_DD(),msg.getUserid(),msg.getShopid());
		List<String> sendMsgList = RedisTool.lrange(key, 0, -1);
		/*List<SendMsg> msgList = new ArrayList<SendMsg>();
		
		for(String str:sendMsgList){
	 		 JSONObject jsonobject = JSONObject.fromObject(str);
			 SendMsg sendMsg = (SendMsg)JSONObject.toBean(jsonobject, SendMsg.class);
			 msgList.add(sendMsg);
		 }*/
		JSONArray jsonobject = JSONArray.fromObject(sendMsgList.toString());
		List<SendMsg> msgList1 = (List<SendMsg>) JSONArray.toCollection(jsonobject, SendMsg.class);
		
		 return msgList1;
	}
	
}
