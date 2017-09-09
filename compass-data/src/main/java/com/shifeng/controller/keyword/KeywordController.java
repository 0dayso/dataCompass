package com.shifeng.controller.keyword;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.keyword.KeywordDTO;
import com.shifeng.entity.keyword.KeywordDetail;
import com.shifeng.entity.keyword.KeywordStatistics;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.keyword.KeywordDetailService;
import com.shifeng.service.keyword.KeywordStatisticsService;
import com.shifeng.util.DateUtil;

import net.sf.json.JSONArray;

@Controller
@RequestMapping(value="/keyword")
public class KeywordController {

	
	@Resource(name="keywordStatisticsService")
	private KeywordStatisticsService keywordStatisticsService;	
	
	@Resource(name="keywordDetailService")
	private KeywordDetailService keywordDetailService;
	
	/**
	 * 查询关键词搜索记录统计
	 * @param page
	 * @param mv
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/statistics")
	public ModelAndView statistics(Page<KeywordDTO> page,ModelAndView mv,KeywordDTO keyword) throws Exception{
		if(StringUtils.isEmpty(keyword.getStartDate())){
			keyword.setStartDate(DateUtil.getYYYY_MM_DD());
			keyword.setEndDate(DateUtil.getYYYY_MM_DD());
			keyword.setNowYearMonth(DateUtil.getYM(new Date()));
		}else{
			keyword.setNowYearMonth(DateUtil.getYM(keyword.getStartDate()));
		}
		page.setT(keyword);
		List<KeywordStatistics> keywordList = keywordStatisticsService.getKeywordStatistics(page);
		mv.addObject("page", page);
		mv.addObject("k", keyword);
		mv.addObject("keywordList", keywordList);
		if(keywordList != null && keywordList.size() > 0){
			StringBuffer keywordData = null;
			StringBuffer keywordCountData = null;
			for(KeywordStatistics ks:keywordList){
				if(keywordData == null){
					keywordData = new StringBuffer();
					keywordCountData = new StringBuffer();
					keywordData.append("['");
					keywordData.append(ks.getKeyword());
					keywordData.append("'");

					keywordCountData.append("[{value:");
					keywordCountData.append(ks.getSearch_count());
					keywordCountData.append(", name:'");
					keywordCountData.append(ks.getKeyword());
					keywordCountData.append("'}");
				}else{

					keywordData.append(",'");
					keywordData.append(ks.getKeyword());
					keywordData.append("'");

					keywordCountData.append(",{value:");
					keywordCountData.append(ks.getSearch_count());
					keywordCountData.append(", name:'");
					keywordCountData.append(ks.getKeyword());
					keywordCountData.append("'}");
				}
			}
			if(keywordData != null){
				keywordData.append("]");
				keywordCountData.append("]");
			}
			mv.addObject("keywordData", keywordData);
			mv.addObject("keywordCountData", keywordCountData);
		}

		mv.addObject("minDate", DateUtil.YYYY_MM_DDgetBeforDay(1));
		
		mv.setViewName("keyword/statistics");
		return mv;
	}

	
	/**
	 * 查询关键词搜索记录明细
	 * @param page
	 * @param mv
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/detail")
	public ModelAndView detail(Page<KeywordDTO> page,ModelAndView mv,KeywordDTO keyword) throws Exception{
		if(StringUtils.isEmpty(keyword.getStartDate())){
			keyword.setStartDate(DateUtil.getYYYY_MM_DD());
			keyword.setNowYearMonth(DateUtil.getYM(new Date()));
		}else{
			keyword.setNowYearMonth(DateUtil.getYM(keyword.getStartDate()));
		}
		page.setT(keyword);
		List<KeywordDetail> keywordList = keywordDetailService.getKeywordDetail(page);
		mv.addObject("page", page);
		mv.addObject("k", keyword);
		mv.addObject("keywordList", keywordList);
		mv.setViewName("keyword/detail");
		return mv;
	}
 
}
