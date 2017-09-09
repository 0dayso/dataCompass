package com.shifeng.service.channel.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.channel.Channel;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.channel.ChannelService; 

/** 
 * 商城渠道(channel)接口实现类
 * @author sen 
 * @channel Revision: 1.00 
 *  Date: 2016-11-08 17:15:56 
 */  
@Service("channelServiceImpl")
public class ChannelServiceImpl implements ChannelService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有商城渠道
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Channel> findAllchannel() throws Exception{
		return (List<Channel>) dao.findForList("channelMapper.findAllchannel");
	}
	
}
