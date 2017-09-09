package com.shifeng.service.dictionary.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.dictionary.Dictionary;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.dictionary.DictionaryService;
import com.shifeng.solr.HttpSolrClient;

/** 
 * 字典词库(Dictionary)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-12-15 15:51:09 
 */  
@Service("dictionaryServiceImpl")
public class DictionaryServiceImpl implements DictionaryService{

	protected Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	/**
	 * 获取词典列表
	 * @param page
	 * @return
	 */
    public List<Dictionary> getDictionaryList(Page<Dictionary> page) {
    	try {
			List<Dictionary> list = (List<Dictionary>)dao.findForList("DictionaryMapper.getDictionaryListPage", page);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 更新关键词相关结果数量
	 */
	@Override
	public void updateWordRelatedCount(List<Dictionary> list) {
    	try {
				dao.update("DictionaryMapper.updateWord", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
    
    
}
