package com.shifeng.service.keyword.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.keyword.KeywordDTO;
import com.shifeng.entity.keyword.KeywordStatistics;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.keyword.KeywordStatisticsService; 

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
	 * 获取关键词统计列表
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<KeywordStatistics> getKeywordStatistics(Page<KeywordDTO> page)throws Exception {
		return (List<KeywordStatistics>)dao.findForList("KeywordStatisticsMapper.getKeywordStatisticsListPage", page);
	}
 
}
