package com.shifeng.controller.channel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.service.channel.ChannelurlService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 渠道链接控制器
 * 
 * @author Yan
 *
 */
@Controller
@RequestMapping(value = "/channelurl")
public class ChannelurlController {

	@Resource(name = "channelurlServiceImpl")
	ChannelurlService channelurlServiceImpl;

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 添加渠道链接
	 * 
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> add(Channelurl c) {
		// [1]定义返回对象
		Map<String, String> map = new HashMap<String, String>();
		map.put(Const.REQ_CODE, "500");
		if (c.getId() == null) {
			map.put(Const.REQ_MSG, "ID不能为空");
			return map;
		}
		if (c.getStatus() == null) {
			map.put(Const.REQ_MSG, "状态不能为空");
			return map;
		}
		if (StringUtils.isEmpty(c.getName())) {
			map.put(Const.REQ_MSG, "渠道链接名称不能为空");
			return map;
		}

		try {
			channelurlServiceImpl.add(map, c);
		} catch (Exception e) {
			logger.error("新增/修改[渠道链接]接口异常；异常信息：" + e.toString());
		}

		return map;
	}

	/**
	 * 删除渠道链接
	 */
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> del(Channelurl channelurl) {
		// [1]定义返回对象
		Map<String, String> map = new HashMap<String, String>();

		// [2]渠道key
		String key = String.format(Const.INTERFACE_CHANNEL_URL_ID, channelurl.getCid());

		// [5]该渠道链接key
		String urlKey = key.replace("%s", channelurl.getId() + "");

		RedisTool.del(urlKey);

		map.put(Const.REQ_CODE, 0 + "");

		return map;
	}
}
