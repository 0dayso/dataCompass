package com.shifeng.message.service;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.message.entity.Message;
import com.shifeng.plugin.page.Page;
/** 
 * 发送消息(message)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-22 11:00:55 
 */  
public interface MessageService {

    /**
	 * 查询所有发送消息
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Message> findAllmessage(Page page,SearchData searchData) throws Exception;
	
	
	
}
