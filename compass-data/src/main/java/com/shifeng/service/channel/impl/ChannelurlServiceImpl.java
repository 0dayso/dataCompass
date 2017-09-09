package com.shifeng.service.channel.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.channel.Channelurl;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.channel.ChannelurlService; 

/** 
 * 商城渠道链接(channelurl)接口实现类
 * @author sen 
 * @channelurl Revision: 1.00 
 *  Date: 2016-11-08 17:15:56 
 */  
@Service("channelurlServiceImpl")
public class ChannelurlServiceImpl implements ChannelurlService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有商城渠道链接
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Channelurl> findAllchannelurl(Page page) throws Exception{
		return (List<Channelurl>) dao.findForList("channelurlMapper.findAllchannelurlPage", page);
	}
	
	/**
	 * 根据渠道ID查询商城渠道链接
	 */
	 public List<Channelurl> findChannelurlByCId(String id) throws Exception{
		 return (List<Channelurl>) dao.findForList("channelurlMapper.findChannelurlByCId", id);
	 }
	
}
