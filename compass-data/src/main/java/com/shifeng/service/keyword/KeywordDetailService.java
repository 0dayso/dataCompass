package com.shifeng.service.keyword;

import java.util.List;

import com.shifeng.dto.keyword.KeywordDTO;
import com.shifeng.entity.keyword.KeywordDetail;
import com.shifeng.plugin.page.Page;
/** 
 * 关键词搜索记录明细(op_keyword_detail)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
public interface KeywordDetailService {

	/**
	 * 获取关键词明细记录
	 * @param page
	 * @return
	 * @throws Exception
	 */
	List<KeywordDetail> getKeywordDetail(Page<KeywordDTO> page)throws Exception;

	 
    

	
}
