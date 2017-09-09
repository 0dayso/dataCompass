package com.shifeng.service.channel.impl;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.entity.channel.Channel;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

/**
 * 渠道实现类
 * @author Yan
 *
 */
@Service("channelServiceImpl")
public class ChannelServiceImpl implements ChannelService {

	protected Logger logger = Logger.getLogger(this.getClass());
	
	/**
	 * 添加渠道
	 */
	@Override
	public void add(Channel channel,Map<String,String> map)  throws Exception{
			// [1]根据渠道ID获取缓存中的渠道
			String key = String.format(Const.INTERFACE_CHANNEL_ID,channel.getId());
			String jsonVal = RedisTool.get(key);
			
			// [2]如果渠道不存在，新增渠道
			if(StringUtils.isEmpty(jsonVal)){
				
				// [2.1]新增渠道
				putRedis(channel,key,jsonVal,map);
				
			}else{
				
				// [3]更新渠道
				updateRedis(channel,key,jsonVal,map);
				
				map.put(Const.REQ_CODE, "0");
				map.put(Const.REQ_MSG, "更新成功");
				logger.info("添加渠道，id："+channel.getId());
			}
	}
	
	/**
	 * 修改渠道
	 * @param channel
	 * @param key
	 * @param jsonVal
	 * @param map
	 */
	private void updateRedis(Channel channel,String key,String jsonVal,Map<String,String> map) {
		// [2.1]转换数据为json
		jsonVal = JSONObject.fromObject(channel).toString();
		
		// [2.2]修改list中的数据
		List<String> list = RedisTool.lrange(Const.INTERFACE_CHANNEL_LIST, 0, -1);
		Channel c = null;
		int index = 0;
		for(int i=0,len = list.size();i<len;i++){
			c = (Channel) JSONObject.toBean(JSONObject.fromObject(list.get(i)), Channel.class);
			if(c.getId() == channel.getId()){
				index = i;
				break;
			}
		}
		RedisTool.lset(Const.INTERFACE_CHANNEL_LIST, index, jsonVal);
		
		map.put(Const.REQ_CODE, "0");
		map.put(Const.REQ_MSG, "更新成功");
	}
	
	/**
	 * 新增渠道
	 * @param channel
	 * @param key
	 * @param jsonVal
	 * @param map
	 */
	private void putRedis(Channel channel,String key,String jsonVal,Map<String,String> map) {
		// [2.1]转换数据为json
		jsonVal = JSONObject.fromObject(channel).toString();
		
		// [2.2]存储list格式
		RedisTool.lpush(Const.INTERFACE_CHANNEL_LIST, jsonVal);
		
		RedisTool.lpush(Const.INTERFACE_CHANNEL_LIST_NEW_DATA, jsonVal);
		
		// [2.3]存储键值对用来标识该渠道已经存在
		RedisTool.set(key, "1");
		
		map.put(Const.REQ_CODE, "0");
		map.put(Const.REQ_MSG, "更新成功");
		logger.info("添加渠道，id："+channel.getId());
	}

	/**
	 * 删除指定渠道
	 */
	@Override
	public void del(Channel channel) {
		
		// [1]删除指定key的渠道
		
		String key = String.format(Const.INTERFACE_CHANNEL_ID,channel.getId());
		
		// [2]获取缓存中的json串
		String jsonVal = RedisTool.get(key);
		
		// [3]删除list中的渠道
		RedisTool.lrem(Const.INTERFACE_CHANNEL_LIST, 1, jsonVal);
		
		// [4]删除key标识的数据
		RedisTool.del(key);
	}

}
