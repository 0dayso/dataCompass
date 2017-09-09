package com.shifeng.job;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;

import com.shifeng.entity.dictionary.Dictionary;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.dictionary.DictionaryService;
import com.shifeng.solr.HttpSolrClient;

public class SolrJob {
	
	protected Logger logger = Logger.getLogger(this.getClass());
 
	@Resource(name="dictionaryServiceImpl")
	private DictionaryService dictionaryService;
	
	@Resource(name = "productSolrServer")
	private HttpSolrClient productSolrServer;
	
   public void execute(){
	   logger.info("【开始】执行更新关键词相关结果任务");
	   Page<Dictionary> page = new Page<Dictionary>();
	   List<Dictionary> list = dictionaryService.getDictionaryList(page);
	   logger.info("总页数："+page.getTotalPage());
		int totalPage = page.getTotalPage();
		for(int i = 0;i<totalPage;i++){
			logger.info("当前页："+(i+1));
			for(Dictionary dictionary:list){
				dictionary.setRelated_count(querySum(dictionary.getWord()));
				logger.info(dictionary.getWord()+"------------------"+dictionary.getRelated_count());
			}
			dictionaryService.updateWordRelatedCount(list);
			if(i<totalPage-1){
				page.setCurrentPage((i+2));
				logger.info("下一页："+page.getCurrentPage());
				list = dictionaryService.getDictionaryList(page);
			}
		}
	   
	   logger.info("【结束】执行更新关键词相关结果任务");
   }

	public int querySum(String key){
		try {
			//创建查询条件
			SolrQuery query = new SolrQuery();
			logger.info("**************《开始搜索，关键字：" + key + "》******************");
			query.setQuery("search:"+key);
			//商品上架状态（0：下架；1：上架）
			query.addFilterQuery("pState:1");
			//查询并返回结果
			QueryResponse queryResponse = productSolrServer.query(query);
			logger.info("查询时间：" + queryResponse.getQTime());
			logger.info("**************《共搜索到" + queryResponse.getResults().getNumFound() + "条结果》******************");
			return Integer.parseInt(String.valueOf(queryResponse.getResults().getNumFound()));
		} catch (SolrServerException e) {
			e.printStackTrace();
			return 0;
		}
	}
}
