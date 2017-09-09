package com.shifeng.entity.keyword;

import java.io.Serializable;
import java.util.Date;
/** 
 * 关键词搜索记录统计(op_keyword_statistics)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
public class KeywordStatistics implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//统计日期
  	 private String statistics_time;
 	//关键词
  	 private String keyword;
 	//搜索次数
  	 private int search_count;
 	//店铺id
  	 private int shopId;
 	//站来源类型 0 pc 1m 2app 3 微信 必填
  	 private int type;



	 
    /**
    *统计日期
	* @return
    */ 
	public String getStatistics_time() {
		return statistics_time;
	}
    /**
    *统计日期
	* @param type
    */ 
	public void setStatistics_time(String statistics_time) {
		this.statistics_time = statistics_time;
	}
    /**
    *关键词
	* @return
    */ 
	public String getKeyword() {
		return keyword;
	}
    /**
    *关键词
	* @param type
    */ 
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
    /**
    *搜索次数
	* @return
    */ 
	public int getSearch_count() {
		return search_count;
	}
    /**
    *搜索次数
	* @param type
    */ 
	public void setSearch_count(int search_count) {
		this.search_count = search_count;
	}
    /**
    *店铺id
	* @return
    */ 
	public int getShopId() {
		return shopId;
	}
    /**
    *店铺id
	* @param type
    */ 
	public void setShopId(int shopId) {
		this.shopId = shopId;
	}
    /**
    *站来源类型 0 pc 1m 2app 3 微信 必填
	* @return
    */ 
	public int getType() {
		return type;
	}
    /**
    *站来源类型 0 pc 1m 2app 3 微信 必填
	* @param type
    */ 
	public void setType(int type) {
		this.type = type;
	}
	
}
