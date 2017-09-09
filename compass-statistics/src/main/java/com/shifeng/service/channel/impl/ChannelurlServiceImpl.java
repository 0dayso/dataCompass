package com.shifeng.service.channel.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.channel.Channelurl;
import com.shifeng.service.channel.ChannelurlService;

@Service("channelurlService")
public class ChannelurlServiceImpl implements ChannelurlService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	
	
	/**
	 * 新增添加渠道（有更新，无新增）
	 * @param channelList 渠道集合
	 */
	public void saveChannelurl(List<Channelurl> channelurlList) {
		if(channelurlList != null && channelurlList.size() > 0){
			try {
				dao.save("channelurlMapper.saveChannelurlList", channelurlList);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	

	
	/**
	 * 新增添加渠道（有更新，无新增）
	 * @param channelurl
	 * @throws Exception 
	 */
	public void saveChannelurl(Channelurl channelurl) throws Exception {
		if(channelurl != null ){
			dao.save("channelurlMapper.saveChannelurl", channelurl);
		}
	}
	
	
}
