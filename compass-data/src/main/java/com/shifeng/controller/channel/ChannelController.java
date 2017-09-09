package com.shifeng.controller.channel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.entity.channel.Channel;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.util.Const;

/** 
 * 商城渠道(channel)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-08 17:15:56 
 */ 
@Controller
@RequestMapping(value="/channel")
public class ChannelController {
	
	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;

 
}
