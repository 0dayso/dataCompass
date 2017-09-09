package com.shifeng.mp.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.mp.dto.SearchFlowTendencyDTO;
import com.shifeng.mp.service.FlowTendencyService;
import com.shifeng.pc.dto.day_hour_flow.ShowDayFlow;

import net.sf.json.JSONArray;

/**
 * 无限流量趋势分析
 * @author Yan
 *
 */
@Controller
@RequestMapping(value="/mp_flow_tendency_controller")
public class FlowTendencyController {


	@Resource(name="flowTendencyServiceImpl")
	FlowTendencyService flowTendencyServiceImpl;
	Logger log = Logger.getLogger(this.getClass());
	
	/**
	 * 流量分析
	 * @param mv
	 * @param s
	 * @return
	 */
	@RequestMapping(value="/show")
	public ModelAndView show(ModelAndView mv,SearchFlowTendencyDTO s) {
		try {
			List<ShowDayFlow> list = flowTendencyServiceImpl.getPcFlowHourDatas(s);
			mv.addObject("list",list);
			mv.addObject("listJson",JSONArray.fromObject(list).toString());
		} catch (Exception e) {
			log.error("【分析当天不同时段的流量】异常，错误信息："+e.toString());
		}
		mv.addObject("s",s);
		mv.setViewName("mp/tendency/show_mp_tendency_view");
		return mv;
	}
}
