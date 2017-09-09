package com.shifeng.service.channel;

import java.util.List;

import com.shifeng.entity.channel.Channelurl;

public interface ChannelurlService {
	
	/**
	 * 新增添加渠道URL（有更新，无新增）
	 * @param channelurlList 渠道集合
	 */
	void saveChannelurl(List<Channelurl> channelurlList);
	
	/**
	 * 新增添加渠道URL（有更新，无新增）
	 * @param channelurl
	 */
	void saveChannelurl(Channelurl channelurl)throws Exception;

}
