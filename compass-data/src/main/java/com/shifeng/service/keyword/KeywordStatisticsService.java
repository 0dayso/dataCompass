package com.shifeng.service.keyword;

import java.util.List;

import com.shifeng.dto.keyword.KeywordDTO;
import com.shifeng.entity.keyword.KeywordStatistics;
import com.shifeng.plugin.page.Page;
/** 
 * 关键词搜索记录统计(op_keyword_statistics)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
public interface KeywordStatisticsService {

	/**
	 * 获取关键词统计列表
	 * @param page
	 * @return
	 * @throws Exception
	 */
	List<KeywordStatistics> getKeywordStatistics(Page<KeywordDTO> page)throws Exception;

	 
}
