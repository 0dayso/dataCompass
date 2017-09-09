package com.shifeng.service.channel;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.shifeng.entity.channel.Channel;

/**
 * 渠道接口
 * @author Yan
 *
 */
@Service("channelService")
public interface ChannelService {

	/**
	 * 添加渠道
	 * @param channel
	 */
	void add(Channel channel,Map<String,String> map) throws Exception;
	
	/**
	 * 删除渠道
	 * @param channel
	 */
	void del(Channel channel);
}
