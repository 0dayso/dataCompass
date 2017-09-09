package com.shifeng.job;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.entity.data.Data;
import com.shifeng.entity.keyword.KeywordStatistics;
import com.shifeng.service.data.DataService;
import com.shifeng.service.keyword.KeywordStatisticsService;
import com.shifeng.util.Const;
import com.shifeng.util.Constants;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;
import redis.clients.jedis.Tuple;

public class DataJob {
	
	protected Logger logger = Logger.getLogger(this.getClass());
	
	/**几天前，默认当天6*/
	private int beforeDay = 0;
	
	private String now = DateUtil.getYYYY_MM_DD();
	
	/**年月*/
	private String ym = DateUtil.getYM(now);
	
	@Resource(name="dataService")
	private DataService dataService;
	
	@Resource(name="keywordStatisticsService")
	private KeywordStatisticsService keywordStatisticsService;
	
   public void execute(){
	   logger.info("====开始执行统计任务====");
		now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
	   
	   tongjiFangWen();
	   tongjiGouMaiJinE();
	   tongjiGouMaiLiang();
	   tongjiZhuCeLiang();
	   tongjiGouMaiJinEHeJi();
	   tongjiGuanJianCi();
	   tongjiDingDanLiang();
	   tongjiFangKeShu();
	   tongjiFangWenYongHuShu();
	   tongjiCookie(); 
	   tongjiQuXiaoTuiHuanHuo();
	   
	   dataService.tongJiPayOrderNum(beforeDay);
	   
	   logger.info("====统计任务执行完毕====");
   }

	  /**
	   * 执行统计访问量任务
	   */
	  public void tongjiFangWen(){
		  logger.info("【开始执行统计访问量任务】");

		  long nowTime = System.currentTimeMillis();

			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);   
	         
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 					StringBuffer sb = new StringBuffer();
	 		 					sb.append("adData_visit_ad_stat_times").append("_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
	 		 					logger.info("-------key-------"+sb.toString());
	 		 					long count = RedisTool.zcard(sb.toString());
	 		 					logger.info("--------------"+count);
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
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        int score = (int) tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            data.setVisitnum(score);
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 								dataService.saveVisit(list,ym);
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 		 					
	 		 				} 
	 						 }
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计访问量任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }

	  
	  
	  /**
	   * 执行统计注册量任务
	   */
	  public void tongjiZhuCeLiang(){
		  logger.info("【开始执行统计注册量任务】");

		  long nowTime = System.currentTimeMillis();
		  
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**types**"+types);      
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String type:types){  

		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
		 				    List<Data> list = null;
		 					StringBuffer sb = new StringBuffer();
		 					sb.append("adData_register_ad_stat_times").append("_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type);
		 					logger.info("-------key-------"+sb.toString());
		 					long count = RedisTool.zcard(sb.toString());
		 					logger.info("--------------"+count);
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
		 	                        logger.info("-------keys-------"+keys);
		 	                        int score = (int) tuple.getScore();
		 	                        if (keys != null) {
		 	                            String[] key = keys.split("\\|");
			 	                        logger.info("-------key-------"+key);
		 	                            Data data = new Data();
		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
		 	                            data.setChannelid(channelurl.getCid());
		 	                            data.setChannelurlid(channelurl.getId());
		 	                            data.setRegisternum(score);
 		 	                            data.setType(Integer.parseInt(type));
 		 	                            data.setShopId(0);
		 	                            list.add(data);
		 	                        }
		 	                    }
		 	                }
		 	            if (null != list && list.size() > 0) {
		 	            	try {
								dataService.saveRegister(list,ym);
							} catch (Exception e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
		 	            }
		 					
		 				}
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计注册量任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }
	  
	  
	  /**
	   * 执行统计购买数量任务
	   */
	  public void tongjiGouMaiLiang(){
		  logger.info("【开始执行统计购买数量任务】");

		  long nowTime = System.currentTimeMillis();

			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);   
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 					StringBuffer sb = new StringBuffer();
	 		 					sb.append("adData_purchase_ad_stat_times").append("_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
	 		 					logger.info("-------key-------"+sb.toString());
	 		 					long count = RedisTool.zcard(sb.toString());
	 		 					logger.info("--------------"+count);
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
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        int score = (int) tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setPurchasenum(score);
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 								dataService.savePurchase(list,ym);
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 		 					
	 		 				}
	 						 }
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计购买数量任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }
	  
	  
	  /**
	   * 执行统计购买金额任务
	   */
	  public void tongjiGouMaiJinE(){
		  logger.info("【开始执行统计购买金额任务】");

		  long nowTime = System.currentTimeMillis();
			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);   
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 					StringBuffer sb = new StringBuffer();
	 		 					sb.append("adData_purchase_amount_ad_stat_times").append("_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
	 		 					logger.info("-------key-------"+sb.toString());
	 		 					long count = RedisTool.zcard(sb.toString());
	 		 					logger.info("--------------"+count);
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
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        int score = (int) tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setAmount(score);
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 								dataService.saveAmount(list,ym);
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 		 					
	 		 				}
	 						 }
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计购买金额任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }
	  
	  
	  /**
	   * 执行统计购买金额合计任务
	   */
	  public void tongjiGouMaiJinEHeJi(){
		  logger.info("【开始执行统计购买金额合计任务】");

		  long nowTime = System.currentTimeMillis();

		  
			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 					StringBuffer sb = new StringBuffer();
	 		 					sb.append("adData_pay_amount_ad_stat_times").append("_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
	 		 					logger.info("-------key-------"+sb.toString());
	 		 					long count = RedisTool.zcard(sb.toString());
	 		 					logger.info("--------------"+count);
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
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        double score =  tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setPayamount(score);
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 								dataService.savePayamount(list,ym);
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 						 }
	 					}
	 					
	 				}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计购买金额合计任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }
   
	  /**
	   * 统计关键词任务
	   */
	  public void tongjiGuanJianCi(){
		  logger.info("【开始执行统计关键词任务任务】");
		  long nowTime = System.currentTimeMillis();
		  
			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);
			 for(String shopId:shops){
				 for(String type:types){
					 	StringBuffer sb = new StringBuffer();
						sb.append("adData_search_ad_stat_times_").append(now) .append("_").append(type).append("_").append(shopId);
						logger.info("**key**"+sb.toString());
						long count = RedisTool.zcard(sb.toString());
						logger.info("**count**"+count);
						List<KeywordStatistics> list = null;
	 	                int times = (int) count / Constants.RECORD_COUNT;
	 	                long remainder = count % Constants.RECORD_COUNT;
	 	                long start = 0;
	 	                long end = 0;
	 	                int flag = 0;
	 	                if (remainder > 0) {
	 	                    flag = 1;
	 	                }
	 	                flag += times; 
	 	                list = new ArrayList<KeywordStatistics>();
	 	                for (int j = 0; j < flag; j++) {
	 	                    start = (j * Constants.RECORD_COUNT);
	 	                    end = (start + Constants.RECORD_COUNT - 1);
	 	                    Set<Tuple> adDataList = RedisTool.zrangeWithScores(sb.toString(), start, end);
	 	                    for (Tuple tuple : adDataList) {
	 	                        String keys = tuple.getElement();
	 	                       logger.info("-------keys-------"+keys);
	 	                        int score = (int) tuple.getScore();
	 	                        if (keys != null) {
	 	                            String[] key = keys.split("\\|");
	 	                            KeywordStatistics keyword = new KeywordStatistics();
	 	                            keyword.setStatistics_time(key[0]);
		 	                        keyword.setKeyword(key[3]);
		 	                        keyword.setSearch_count(score);
		 	                        keyword.setShopId(Integer.parseInt(key[2]));
		 	                        keyword.setType(Integer.parseInt(key[1]));
		 	                        list.add(keyword);
	 	                        }
	 	                    }
	 	                }
		 	            if (null != list && list.size() > 0) {
		 	            	try {
		 	            		keywordStatisticsService.saveKeywordStatistics(list,ym); 
							} catch (Exception e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
		 	            }
				 }
			 }
		  

		  long lastTime = System.currentTimeMillis();
	      logger.info("【统计关键词任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	  }
	  
	  
	  


	  /**
	   * 执行统计订单数量任务
	   */
	  public void tongjiDingDanLiang(){
		  logger.info("【开始执行统计订单数量任务】");

		  long nowTime = System.currentTimeMillis();

			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);   
	         
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 					StringBuffer sb = new StringBuffer();
	 		 					sb.append("adData_visit_ad_orderid_stat_times_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
	 		 					logger.info("-------key-------"+sb.toString());
	 		 					long count = RedisTool.zcard(sb.toString());
	 		 					logger.info("--------------"+count);
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
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        int score = (int) tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            data.setOrdernum(score);
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 								dataService.saveOrdernum(list,ym);
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 		 					
	 		 				} 
	 						 }
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计订单数量任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }
	  
	  


	  /**
	   * 执行统计访客数任务
	   */
	  public void tongjiFangKeShu(){
		  logger.info("【开始执行统计访客数任务】");

		  long nowTime = System.currentTimeMillis();

			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);   
	         
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 					StringBuffer sb = new StringBuffer();
	 		 					sb.append("adData_visit_ad_ip_stat_times_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
	 		 					logger.info("-------key-------"+sb.toString());
	 		 					long count = RedisTool.zcard(sb.toString());
	 		 					logger.info("--------------"+count);
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
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        int score = (int) tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            data.setUv(score);
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 								dataService.saveUv(list,ym);
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 		 					
	 		 				} 
	 						 }
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计访客数任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }
	  


	  /**
	   * 执行统计访问用户数任务
	   */
	  public void tongjiFangWenYongHuShu(){
		  logger.info("【开始执行统计访问用户数任务】");

		  long nowTime = System.currentTimeMillis();

			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);   
	         
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 					StringBuffer sb = new StringBuffer();
	 		 					sb.append("adData_visit_ad_userid_stat_times_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
	 		 					logger.info("-------key-------"+sb.toString());
	 		 					long count = RedisTool.zcard(sb.toString());
	 		 					logger.info("--------------"+count);
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
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        int score = (int) tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            data.setVisitusernum(score);
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 								dataService.saveVisitusernum(list,ym);
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 		 					
	 		 				} 
	 						 }
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计访问用户数任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }
	  
	  
	  
	  
	  /**
	   * 执行统计Cookie任务
	   */
	  public void tongjiCookie(){
		  logger.info("【开始执行统计Cookie任务】");

		  long nowTime = System.currentTimeMillis();

			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);   
	         
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 					StringBuffer sb = new StringBuffer();
	 		 					sb.append("adData_visit_ad_cookie_stat_times").append("_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
	 		 					logger.info("-------key-------"+sb.toString());
	 		 					long count = RedisTool.zcard(sb.toString());
	 		 					logger.info("--------------"+count);
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
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        int score = (int) tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            data.setCookie(score);
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 								dataService.saveCookie(list,ym);
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 		 					
	 		 				} 
	 						 }
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计Cookie任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
	 	 
	   }
	  
	  
	  
		
		/**
		 * 取消 退换货
		 */
		public void tongjiQuXiaoTuiHuanHuo() {
			logger.info("【开始】执行取消、退换货统计任务");
			
				 
				 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
				 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
				 logger.info("**shops**"+shops);
				 logger.info("**types**"+types);   
		         
		       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
		       logger.info("共有"+strList.size()+"个渠道");
		 		if(strList.size()>0){
		 			for(String str:strList){
		 				logger.info(str);
		 				JSONObject jsonobject = JSONObject.fromObject(str);
		 				logger.info("******************"+jsonobject);
		 				if(jsonobject != null){
		 					for(String shopId:shops){
		 						 for(String type:types){  
		 							 
		 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
		 		 				    List<Data> list = null;
		 		 					StringBuffer sb = new StringBuffer();
		 		 					sb.append("adData_visit_ad_cancel_order_stat_times_").append(now).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId()).append("_").append(type).append("_").append(shopId);
		 		 					logger.info("-------key-------"+sb.toString());
		 		 					long count = RedisTool.zcard(sb.toString());
		 		 					logger.info("--------------"+count);
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
		 		 	                        logger.info("-------keys-------"+keys);
		 		 	                        int score = (int) tuple.getScore();
		 		 	                        if (keys != null) {
		 		 	                            String[] key = keys.split("\\|");
		 		 	                            Data data = new Data();
		 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
		 		 	                            data.setChannelid(channelurl.getCid());
		 		 	                            data.setChannelurlid(channelurl.getId());
		 		 	                            data.setType(Integer.parseInt(type));
		 		 	                            data.setShopId(Integer.parseInt(shopId));
		 		 	                            //订单取消
		 		 	                            if("1".equals(key[5])){
		 		 	                            	data.setCancelordernum(score);
		 		 	                            }else if("2".equals(key[5])){//退货 
		 		 	                            	data.setReturnordernum(score);
		 		 	                            }else{// 3 换货
		 		 	                            	data.setExchangeordernum(score);
		 		 	                            }
		 		 	                            list.add(data);
		 		 	                        }
		 		 	                    }
		 		 	                }
		 		 	            if (null != list && list.size() > 0) {
		 		 	            	try {
		 								dataService.saveTuiHuanHuo(list,ym);
		 							} catch (Exception e) {
		 								e.printStackTrace();
		 							}
		 		 	            }
		 		 					
		 		 				} 
		 						 }
		 					}

		 			}
		 		}
			
			logger.info("【结束】执行取消、退换货统计任务");
		}

	  


		public int getBeforeDay() {
			return beforeDay;
		}

		public void setBeforeDay(int beforeDay) {
			this.beforeDay = beforeDay;
		}  
	  
	  
	  
}
