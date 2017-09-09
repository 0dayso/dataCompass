package com.shifeng.service.channel.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.service.channel.ChannelurlService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 渠道链接服务实现类
 * 
 * @author Yan
 *
 */
@Service("channelurlServiceImpl")
public class ChannelurlServiceImpl implements ChannelurlService {

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 添加渠道链接
	 */
	@Override
	public void add(Map<String, String> map, Channelurl channelurl) throws Exception {
		
		// [1]判断链接是否存在
		String urlKey = String.format(Const.INTERFACE_CHANNEL_URL_ID, channelurl.getId());
		String urlJsonVal = RedisTool.get(urlKey);

		// [2]不存在该链接
		if (StringUtils.isEmpty(urlJsonVal)) {
			
			// [2.1]转换json串进行存储,标识该链接已经存在
			urlJsonVal = JSONObject.fromObject(channelurl).toString();
			RedisTool.set(urlKey, urlJsonVal);
			
			RedisTool.lpush(Const.INTERFACE_CHANNEL_URL_LIST, urlJsonVal);
			RedisTool.lpush(Const.INTERFACE_CHANNEL_URL_LIST_NEW_DATA, urlJsonVal);
			
			logger.info("新增渠道链接，id："+channelurl.getId());
			
			// [2.2]更新渠道
			//updateChannel(map,channelurl);
		} else {
			// [3]更新链接
			List<String> list = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
			urlJsonVal = JSONObject.fromObject(channelurl).toString();
			Channelurl cl = null;
			int index = 0;
			// [4]查找该元素已存在的下标
			for(int i=0,len = list.size();i<len;i++){
				cl = (Channelurl) JSONObject.toBean(JSONObject.fromObject(list.get(i)), Channelurl.class);
				if(cl.getId() == channelurl.getId()){
					index = i;
					break;
				}
			}
			
			// 设置最新的数据
			RedisTool.lset(Const.INTERFACE_CHANNEL_URL_LIST, index, urlJsonVal);
			RedisTool.lset(Const.INTERFACE_CHANNEL_URL_LIST_NEW_DATA, index, urlJsonVal);
			
			logger.info("更新渠道链接，id："+channelurl.getId());
		}
		
		map.put(Const.REQ_CODE, "0");
	}
	
	/**
	 * 更新渠道
	 * @param map
	 * @param channelurl
	 */
	private void updateChannel(Map<String, String> map,Channelurl channelurl) {
		// [1]关联渠道,判断是否有值
		String cId = String.format(Const.INTERFACE_CHANNEL_ID, channelurl.getCid());// 渠道ID
		String urlsJson = RedisTool.hget(Const.INTERFACE_CHANNEL_URL_HASH, cId);// 链接map中，该渠道对应的链接
		if (StringUtils.isEmpty(urlsJson)) {
			// [2]新增该渠道对应的链接缓存
			List<Channelurl> list = new ArrayList<Channelurl>();
			list.add(channelurl);
			String value = JSONArray.fromObject(list).toString();

			RedisTool.hset(Const.INTERFACE_CHANNEL_URL_HASH, cId, value);
		} else {
			// [3] 更新缓存中的渠道链接
			updateChannelUrlCache(channelurl,cId,urlsJson);
		}

		map.put(Const.REQ_CODE, 0 + "");
	}
	
	/**
	 * 更新缓存中的渠道链接
	 * @param channelurl
	 * @param cId
	 * @param urlsJson
	 */
	private void updateChannelUrlCache(Channelurl channelurl,String cId,String urlsJson) {
		// [1]获取缓存中的链接数组
		List<Channelurl> list = (List<Channelurl>) JSONArray.toCollection(JSONArray.fromObject(urlsJson),Channelurl.class);
		boolean isHave = false;
		for(int i=0,len = list.size();i<len;i++){
			// [2]如果缓存中存在该链接则更新
			if(list.get(i).getId() == channelurl.getId()){
				list.set(i, channelurl);
				isHave = true;
				break;
			}
		}
		// [3]如果缓存中不存在该链接则新增
		if(!isHave){
			list.add(channelurl);
		}
		String value = JSONArray.fromObject(list).toString();

		RedisTool.hset(Const.INTERFACE_CHANNEL_URL_HASH, cId, value);
	}
	

}
