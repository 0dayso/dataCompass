package com.shifeng.service.channel;

import java.util.List;

import com.shifeng.entity.channel.Channel;
import com.shifeng.plugin.page.Page;
/** 
 * 商城渠道(channel)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-08 17:15:56 
 */  
public interface ChannelService {

    /**
	 * 查询所有商城渠道
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Channel> findAllchannel() throws Exception;
	
}
