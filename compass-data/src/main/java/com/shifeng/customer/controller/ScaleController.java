package com.shifeng.customer.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.customer.dto.ScaleDTO;
import com.shifeng.customer.entity.UserScale;
import com.shifeng.customer.service.ScaleService;
import com.shifeng.util.DateUtil;

import net.sf.json.JSONArray;

/**
 * 客户规模
 * @author WinZhong
 *
 */
@Controller
@RequestMapping(value="/scale")
public class ScaleController {

	@Resource(name="scaleServiceImpl")
	private ScaleService scaleService;
	
	/**
	 * 销量分析
	 * @param mv
	 * @param details
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/details")
	public ModelAndView details(ModelAndView mv,ScaleDTO scale) throws Exception{
		if(StringUtils.isEmpty(scale.getStartDate())){
			scale.setStartDate(DateUtil.getYYYY_MM_DD());
			scale.setEndDate(DateUtil.getYYYY_MM_DD());
			scale.setNowYearMonth(DateUtil.getYM(new Date()));
		}else{
			scale.setNowYearMonth(DateUtil.getYM(scale.getStartDate()));
		}
		List<UserScale> userScaleList = scaleService.getUserScaleList(scale);

		String[] visit_data = null;
		int[] visit_number = null;
		if(userScaleList != null){
			int size = userScaleList.size();
			visit_data = new String[size];
			visit_number = new int[size];
			for(int i = 0;i<size;i++){
				UserScale us = userScaleList.get(i);
				visit_data[i] = us.getVisit_data();
				visit_number[i] = us.getVisit_number();
			}
			mv.addObject("visit_data", JSONArray.fromObject(visit_data));
			mv.addObject("visit_number",JSONArray.fromObject(visit_number));
		}
		mv.addObject("userScaleList", userScaleList);
		mv.addObject("scale", scale);
		mv.setViewName("customer/scale/details");
		return mv;
	}

}
