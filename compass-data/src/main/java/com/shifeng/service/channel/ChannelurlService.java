package com.shifeng.service.channel;

import java.util.List;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.plugin.page.Page;
/** 
 * 商城渠道链接(channelurl)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-08 17:15:56 
 */  
public interface ChannelurlService {

    /**
	 * 查询所有商城渠道链接
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Channelurl> findAllchannelurl(Page page) throws Exception;
	
	/**
	 * 根据渠道ID查询商城渠道链接
	 */
	 public List<Channelurl> findChannelurlByCId(String id) throws Exception;
	
	
}
