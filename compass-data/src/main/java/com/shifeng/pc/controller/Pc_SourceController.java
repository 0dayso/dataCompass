package com.shifeng.pc.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.pc.service.SourceService;
import com.shifeng.service.channel.ChannelService;
import com.shifeng.util.DateUtil;

/**
 * 访问来源
 * @author sen
 *
 */
@Controller
@RequestMapping(value="/pc_Source")
public class Pc_SourceController {
	//访问来源
	@Resource(name="sourceServiceImpl")
	private SourceService sourceServiceImpl;
	//渠道
	@Resource(name="channelServiceImpl")
	private ChannelService channelServiceImpl;
	
	/**
	 * 访客来源
	 */
	@RequestMapping(value="/uvSource")
	public ModelAndView uvSource(ModelAndView mv){
		mv.addObject("type", "pc");
		mv.addObject("startDate",DateUtil.getYYYY_MM_DD());
		mv.setViewName("pc/source/source");
		return mv;
	}

	/**
	 * 查询访客来源
	 */
	@RequestMapping(value="/findUvSource")
	@ResponseBody
	public ModelAndView findUvSource(ModelAndView mv,SearchData searchData){
		Map<String,Object> map = new HashMap<String,Object>();
		
		try {
			map = sourceServiceImpl.uvSource(searchData);
			mv.addObject("map", map);
			mv.setViewName("pc/source/sourcechart");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return mv;
	}
}
