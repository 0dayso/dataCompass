package com.shifeng.service.channel.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.channel.Channel;
import com.shifeng.service.channel.ChannelService;

@Service("channelService")
public class ChannelServiceImpl implements ChannelService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	
	
	/**
	 * 新增添加渠道（有更新，无新增）
	 * @param channelList 渠道集合
	 */
	public void saveChannel(List<Channel> channelList) {
		if(channelList != null && channelList.size() > 0){
			try {
				dao.save("channelMapper.saveChannelList", channelList);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}



	
	/**
	 * 新增添加渠道（有更新，无新增）
	 * @param channel
	 * @throws Exception 
	 */
	public void saveChannel(Channel channel) throws Exception {
		if(channel != null){
			dao.save("channelMapper.saveChannel", channel);
			System.out.println("********saveChannel**********");
		}
	}
	
	
	
	
	
}
