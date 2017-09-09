package com.shifeng.service.dictionary;

import java.util.List;

import com.shifeng.entity.dictionary.SynonymDic;
import com.shifeng.plugin.page.Page;
/** 
 * 同义词字典表(synonymDic)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-12-15 15:51:09 
 */  
public interface SynonymDicService {

	/**
	 * 获取同义词词典列表
	 * @param page
	 * @return
	 */
    List<SynonymDic> getSynonymDicList(Page<SynonymDic> page);

    /**
     * 检查同义词是否存在
     * @param word
     * @param id
     * @return
     */
	boolean checkWord(String word, Integer id);
	
	/**
	 * 根据id查询同义词
	 * @param id
	 * @return
	 */
	SynonymDic selectWord(int id);

	/**
	 * 保存词
	 * @param synonymDic
	 * @return
	 */
	boolean saveWord(SynonymDic synonymDic);

	
}
