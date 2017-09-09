package com.shifeng.controller.channel;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shifeng.entity.channel.Channel;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.util.Const;

/**
 * 渠道控制器
 * 
 * @author Yan
 *
 */
@Controller
@RequestMapping(value = "/channel")
public class ChannelController {

	@Resource(name = "channelServiceImpl")
	ChannelService channelServiceImpl;

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 添加渠道
	 * 
	 * @param channel
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> add(Channel channel) {

		// [1]定义返回对象
		Map<String, String> map = new HashMap<String, String>();
		map.put(Const.REQ_CODE, "500");
		if (StringUtils.isEmpty(channel.getName())) {
			map.put(Const.REQ_MSG, "名称不能为空");
			return map;
		}
		if (channel.getStatus() == null) {
			map.put(Const.REQ_MSG, "状态不能为空");
			return map;
		}

		try {
			channelServiceImpl.add(channel, map);
		} catch (Exception e) {
			logger.error("新增/修改[渠道]接口异常；异常信息：" + e.toString());
		}

		return map;
	}

	/**
	 * 删除渠道
	 * 
	 * @param channel
	 * @return
	 */
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> del(Channel channel) {
		// [1]定义返回对象
		Map<String, String> map = new HashMap<String, String>();

		// [2]删除服务
		channelServiceImpl.del(channel);

		map.put(Const.REQ_CODE, 0 + "");
		return map;
	}

	@RequestMapping(value = "/test")
	@ResponseBody
	public Map<String, String> test() {
		Map<String, String> map = new HashMap<String, String>();
		// TODO Auto-generated method stub
		map.put("res_msg", "test post response success");
		return map;
	}

}
