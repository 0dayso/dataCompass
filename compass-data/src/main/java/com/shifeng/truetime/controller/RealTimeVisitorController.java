package com.shifeng.truetime.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.entity.channel.Channel;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.truetime.dto.realTimeVisitor.RealTimeVisitorResultDTO;
import com.shifeng.truetime.dto.realTimeVisitor.SearchRealTimeVisitorDTO;
import com.shifeng.truetime.service.RealTimeVisitorService;
/**
 * 实时访客
 * @author Yan
 *
 */
@Controller
@RequestMapping(value="/truetime_visitor_controller")
public class RealTimeVisitorController {
	
	@Resource(name="realTimeVisitorServiceImpl")
	RealTimeVisitorService realTimeVisitorServiceImpl;

	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;
	
	Logger log = Logger.getLogger(this.getClass());

	/**
	 * 展示实时访客
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/show")
	public ModelAndView show(ModelAndView mv,Page<SearchRealTimeVisitorDTO> p,SearchRealTimeVisitorDTO d) {
		try {
			p.setT(d);
			List<RealTimeVisitorResultDTO> list = realTimeVisitorServiceImpl.show(p);
			
			List<Channel> channels = channelServiceImpl.findAllchannel();
			mv.addObject("channels", channels);
			
			mv.addObject("list", list);
			mv.addObject("p", p);
		} catch (Exception e) {
			log.error("实时访客异常："+e.toString());
		}
		mv.setViewName("truetime/visitor/show_truetime_visitor");
		return mv;
	}
	
	
	
}
