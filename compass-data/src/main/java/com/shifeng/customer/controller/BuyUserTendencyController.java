package com.shifeng.customer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.customer.dto.BuyUserTendencyResultPageDTO;
import com.shifeng.customer.dto.SearchBuyUserTendencyDTO;
import com.shifeng.customer.service.BuyUserTendencyService;
import com.shifeng.plugin.page.Page;

/**
 * 买家分析
 * @author Yan
 *
 */
@Controller
@RequestMapping(value="/buy_user_tendency_controller")
public class BuyUserTendencyController {
	
	@Resource(name="buyUserTendencyServiceImpl")
	BuyUserTendencyService buyUserTendencyServiceImpl;
	
	Logger log = Logger.getLogger(this.getClass());
	
	
	@RequestMapping(value="/show")
	public ModelAndView show(ModelAndView mv,SearchBuyUserTendencyDTO s,Page<SearchBuyUserTendencyDTO> p) {
		p.setT(s);
		
		try {
			Map<String, Object> map = buyUserTendencyServiceImpl.show(p);
			mv.addObject("map", map);
		} catch (Exception e) {
			log.error("买家分析异常："+e.toString());
		}
		
		mv.addObject("p", p);
		mv.setViewName("customer/buy_user_tendency_view");
		return mv;
	}
	
	
	@RequestMapping(value="/showPage")
	@ResponseBody
	public Map<String, Object> showPage(ModelAndView mv,SearchBuyUserTendencyDTO s,Page<SearchBuyUserTendencyDTO> p) {
		p.setT(s);
		try {
			Map<String, Object> map = new HashMap<String,Object>();
			List<BuyUserTendencyResultPageDTO> list = buyUserTendencyServiceImpl.showPage(p);
			map.put("list", list);
			map.put("p", p);
			return map;
		} catch (Exception e) {
			log.error("买家分析异常："+e.toString());
			return null;
		}
	}

}
