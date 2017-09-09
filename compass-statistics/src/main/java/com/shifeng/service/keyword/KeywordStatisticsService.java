package com.shifeng.service.keyword;

import java.util.List;

import com.shifeng.entity.keyword.KeywordStatistics;
/** 
 * 关键词搜索记录统计(op_keyword_statistics)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
public interface KeywordStatisticsService {

	/**
	 * 保存关键词搜索记录统计
	 * @param keywordStatisticsList
	 */
    void saveKeywordStatistics(List<KeywordStatistics> keywordStatisticsList,String ym);

	
}
