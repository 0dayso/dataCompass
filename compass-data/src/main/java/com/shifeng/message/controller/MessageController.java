package com.shifeng.message.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.message.entity.Message;
import com.shifeng.message.service.MessageService;
import com.shifeng.plugin.page.Page;

/** 
 * 发送消息(message)Controller
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-22 11:00:55 
 */ 
@Controller
@RequestMapping(value="/message")
public class MessageController {
	
	@Resource(name="messageServiceImpl")
	private MessageService messageServiceImpl;
	
	@RequestMapping(value="/findAllmessage")
	public ModelAndView findAllmessage(Page page,ModelAndView mv,SearchData searchData) throws Exception{
		List<Message> message = messageServiceImpl.findAllmessage(page, searchData);
		mv.addObject("message", message);
		mv.addObject("page", page);
		mv.setViewName("message/messageList");
		return mv;
	}
	
 
}
