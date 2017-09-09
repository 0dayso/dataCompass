package com.shifeng.service.channel;

import java.util.List;

import com.shifeng.entity.channel.Channel;

public interface ChannelService {
	
	/**
	 * 新增添加渠道（有更新，无新增）
	 * @param channelList 渠道集合
	 */
	void saveChannel(List<Channel> channelList);
	
	/**
	 * 新增添加渠道（有更新，无新增）
	 * @param channel
	 */
	void saveChannel(Channel channel)throws Exception;

}
