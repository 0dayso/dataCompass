package com.shifeng.job;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

import com.shifeng.entity.data.Data;
import com.shifeng.entity.keyword.KeywordDetail;
import com.shifeng.entity.visit.Visit;
import com.shifeng.ip.IPSeeker;
import com.shifeng.service.keyword.KeywordDetailService;
import com.shifeng.util.Const;
import com.shifeng.util.Constants;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;
import redis.clients.jedis.Tuple;

public class KeywordJob {
	
	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name="keywordDetailService")
	private KeywordDetailService keywordDetailService;

	public void execute() {
		saveGuanJianCi();
	}

	/**
	 * 保存关键词搜索明细记录
	 */
	public void saveGuanJianCi() {
		 logger.info("【保存关键词搜索明细记录任务】");
		

		 List<KeywordDetail> keywordList = new ArrayList<KeywordDetail>();
		 String str = RedisTool.rpop(Const.STATISTICS_AD_SEARCH_DATA_DAY);
		 while (!StringUtils.isEmpty(str)) {
			 JSONObject jsonobject = JSONObject.fromObject(str);
			 KeywordDetail keyword = (KeywordDetail)JSONObject.toBean(jsonobject, KeywordDetail.class);
			 keyword.setNowYearMonth(DateUtil.getNowYearMonth());
			 keywordList.add(keyword);
				 
				 if(keywordList.size() >= 100){
					 try {
						 keywordDetailService.saveKeyword(keywordList);
						 keywordList.clear();
					} catch (Exception e) {
						e.printStackTrace();
						logger.error("【执行保存访问信息任务错误】：",e);
					}
				 }
				str = RedisTool.rpop(Const.STATISTICS_AD_SEARCH_DATA_DAY);
		}
		 if(keywordList.size() > 0){
			 try {
				 keywordDetailService.saveKeyword(keywordList);
			} catch (Exception e) {
				e.printStackTrace();
				logger.error("【保存关键词搜索明细记录任务错误】：",e);
			}
		 } 
		 
		 
		 
		 
		 /*while (true) {
			 String str = RedisTool.rpop(Const.STATISTICS_AD_SEARCH_DATA_DAY);
			 if(str != null){
				 JSONObject jsonobject = JSONObject.fromObject(str);
				 KeywordDetail keyword = (KeywordDetail)JSONObject.toBean(jsonobject, KeywordDetail.class);
				 keyword.setNowYearMonth(DateUtil.getNowYearMonth());
				 logger.info(keyword.getKeyword());
				 try {
					 keywordDetailService.saveKeyword(keyword);
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
		}*/
		 /* List<String> strList = RedisTool.lrange(Const.STATISTICS_AD_SEARCH_DATA_DAY, 0, -1);
		 String str = RedisTool.rpop(Const.STATISTICS_AD_SEARCH_DATA_DAY);
		 logger.info(strList);
		 if(strList.size()>0){
	 			for(String str:strList){
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				KeywordDetail keyword = (KeywordDetail)JSONObject.toBean(jsonobject, KeywordDetail.class);
	 				logger.info(keyword.getKeyword());
	 			}
	 			
		 }	*/	
	}

	
	public static void main(String[] args) {
		/*System.out.println("【保存关键词搜索明细记录任务】");
		 while (true) {
			 String str = RedisTool.rpop(Const.STATISTICS_AD_SEARCH_DATA_DAY);
			 if(str != null){
				 JSONObject jsonobject = JSONObject.fromObject(str);
				 KeywordDetail keyword = (KeywordDetail)JSONObject.toBean(jsonobject, KeywordDetail.class);
				 System.out.println(keyword.getKeyword());
			 }
		}*/
		
		List<String> strList = RedisTool.lrange(Const.STATISTICS_AD_SEARCH_DATA_DAY, 0, -1);
		 System.out.println(strList);
		 if(strList.size()>0){
	 			for(String str:strList){
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				KeywordDetail keyword = (KeywordDetail)JSONObject.toBean(jsonobject, KeywordDetail.class);
	 				System.out.println(keyword.getKeyword());
	 			}
	 			
		 }
		
		
		 String now = DateUtil.getYYYY_MM_DD();
		 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
		 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		 System.out.println("**shops**"+shops);
		 System.out.println("**types**"+types);
		 for(String shopId:shops){
			 for(String type:types){
				 	StringBuffer sb = new StringBuffer();
					sb.append("adData_search_ad_stat_times_").append(now) .append("_").append(type).append("_").append(shopId);
					System.out.println("**key**"+sb.toString());
					long count = RedisTool.zcard(sb.toString());
					System.out.println("**count**"+count);
					List<Data> list = null;
 	                int times = (int) count / Constants.RECORD_COUNT;
 	                long remainder = count % Constants.RECORD_COUNT;
 	                long start = 0;
 	                long end = 0;
 	                int flag = 0;
 	                if (remainder > 0) {
 	                    flag = 1;
 	                }
 	                flag += times; 
 	                list = new ArrayList<Data>();
 	                for (int j = 0; j < flag; j++) {
 	                    start = (j * Constants.RECORD_COUNT);
 	                    end = (start + Constants.RECORD_COUNT - 1);
 	                    Set<Tuple> adDataList = RedisTool.zrangeWithScores(sb.toString(), start, end);
 	                    for (Tuple tuple : adDataList) {
 	                        String keys = tuple.getElement();
 	                       System.out.println("-------keys-------"+keys);
 	                        int score = (int) tuple.getScore();
 	                        if (keys != null) {
 	                            String[] key = keys.split("\\|");
 	                            
 	                        }
 	                    }
 	                }
			 }
		 }
		 	 
		// adData_search_ad_stat_times_2016-11-14_0_200159		
		// adData_search_ad_stat_times_2016-11-14_0_200159		
		
	}

	
}
