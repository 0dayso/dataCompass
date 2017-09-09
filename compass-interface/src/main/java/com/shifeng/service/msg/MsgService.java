package com.shifeng.service.msg;

import java.util.List;

import com.shifeng.entity.msg.SendMsg;

public interface MsgService {

	/**
	 * 发送消息
	 * @param msg
	 * @throws Exception
	 */
	void sendMsg(SendMsg msg)throws Exception;

	/**
	 * 获取消息发送历史记录
	 * @param msg
	 * @throws Exception
	 */
	List<SendMsg> his(SendMsg msg)throws Exception;

}
