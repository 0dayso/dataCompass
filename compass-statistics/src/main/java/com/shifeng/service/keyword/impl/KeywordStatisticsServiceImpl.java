package com.shifeng.service.keyword.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.keyword.KeywordStatistics;
import com.shifeng.service.keyword.KeywordStatisticsService;
import com.shifeng.util.DateUtil; 

/** 
 * 关键词搜索记录统计(op_keyword_statistics)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
@Service("keywordStatisticsService")
public class KeywordStatisticsServiceImpl implements KeywordStatisticsService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	


	/**
	 * 保存关键词搜索记录统计
	 * @param keywordStatisticsList
	 */
    public void saveKeywordStatistics(List<KeywordStatistics> keywordStatisticsList,String ym) {
    	try {
            Map<String,Object> map = new HashMap<String,Object>(); 
            String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("keywordStatisticsList", keywordStatisticsList);
			dao.save("KeywordStatisticsMapper.saveKeywordStatisticsList", map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
}
