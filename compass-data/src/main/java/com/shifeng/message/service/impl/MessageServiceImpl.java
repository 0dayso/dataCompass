package com.shifeng.message.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.message.entity.Message;
import com.shifeng.message.service.MessageService;
import com.shifeng.plugin.page.Page; 

/** 
 * 发送消息(message)接口实现类
 * @author sen 
 * @message Revision: 1.00 
 *  Date: 2016-12-22 11:00:55 
 */  
@Service("messageServiceImpl")
public class MessageServiceImpl implements MessageService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有发送消息
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Message> findAllmessage(Page page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		page.setT(searchData);
		
		return (List<Message>) dao.findForList("messageMapper.findAllmessagePage", page);
	}
	
}
