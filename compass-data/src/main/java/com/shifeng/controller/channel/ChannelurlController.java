package com.shifeng.controller.channel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.channel.ChannelurlService;
import com.shifeng.util.Const;

/** 
 * 商城渠道链接(channelurl)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-08 17:15:56 
 */ 
@Controller
@RequestMapping(value="/channelurl")
public class ChannelurlController {
	
	@Resource(name="channelurlServiceImpl")
	private ChannelurlService channelurlServiceImpl;

	/**
	 * 根据渠道ID查询所有渠道链接
	 * @param mv
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findChannelurlByCId")
	@ResponseBody
	public Map<String,Object> findChannelurlByCId(String id) throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		map.put(Const.RESPONSE_STATE, Const.RESPONSE_ERROR);

		try {
			List<Channelurl> channelurls = channelurlServiceImpl.findChannelurlByCId(id);
			
			map.put(Const.RESPONSE_STATE, Const.RESPONSE_SUCCESS);
			map.put("channelurls", channelurls);
		} catch (Exception e) {
			e.printStackTrace();
			map.put(Const.ERROR_INFO, "查询异常，请稍后重试!!!");
		}
		return map;
	}
	
 
}
