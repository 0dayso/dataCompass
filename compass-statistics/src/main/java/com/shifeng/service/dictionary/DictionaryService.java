package com.shifeng.service.dictionary;

import java.util.List;

import com.shifeng.entity.dictionary.Dictionary;
import com.shifeng.plugin.page.Page;

/** 
 * 字典词库(Dictionary)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-12-15 15:51:09 
 */  
public interface DictionaryService {

	/**
	 * 获取词典列表
	 * @param page
	 * @return
	 */
    List<Dictionary> getDictionaryList(Page<Dictionary> page);

	/**
	 * 更新关键词相关结果数量
	 */
	void updateWordRelatedCount(List<Dictionary> list);
	
}
