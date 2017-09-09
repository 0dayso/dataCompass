package com.shifeng.service.keyword;

import java.util.List;

import com.shifeng.entity.keyword.KeywordDetail;
/** 
 * 关键词搜索记录明细(op_keyword_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
public interface KeywordDetailService {

	/**
	 * 保存关键词明细记录
	 * @param keyword
	 */
	void saveKeyword(KeywordDetail keyword);

	/**
	 * 保存关键词明细记录
	 * @param keyword
	 */
	void saveKeyword(List<KeywordDetail> keywordList);

    

	
}
