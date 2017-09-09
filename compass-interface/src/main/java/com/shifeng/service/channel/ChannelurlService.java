package com.shifeng.service.channel;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.shifeng.entity.channel.Channelurl;

/**
 * 渠道链接接口服务
 * @author Yan
 *
 */
@Service("channelurlService")
public interface ChannelurlService {
	
	/**
	 * 添加渠道链接
	 * @param map
	 * @param channelurl
	 */
	void add(Map<String, String> map,Channelurl channelurl) throws Exception;

}
