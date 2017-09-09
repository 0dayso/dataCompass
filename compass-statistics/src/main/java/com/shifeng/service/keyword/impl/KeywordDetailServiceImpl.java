package com.shifeng.service.keyword.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.keyword.KeywordDetail;
import com.shifeng.service.keyword.KeywordDetailService;
import com.shifeng.util.DateUtil;

/** 
 * 关键词搜索记录明细(op_keyword_detail)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
@Service("keywordDetailService")
public class KeywordDetailServiceImpl implements KeywordDetailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	


	/**
	 * 保存关键词明细记录
	 * @param keyword
	 */
	public void saveKeyword(KeywordDetail keyword) {
		try {
			dao.save("KeywordDetailMapper.saveKeyword", keyword);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}


	/**
	 * 保存关键词明细记录
	 * @param keyword
	 */
	public void saveKeyword(List<KeywordDetail> keywordList) {
		try {
	        Map<String,Object> map = new HashMap<String,Object>(); 
	        String nowYearMonth = DateUtil.getNowYearMonth();
	    	map.put("nowYearMonth", nowYearMonth);
	    	map.put("keywordList", keywordList);
			dao.save("KeywordDetailMapper.saveKeywordList", map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
