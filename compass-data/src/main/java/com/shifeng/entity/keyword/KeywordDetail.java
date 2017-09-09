package com.shifeng.entity.keyword;

import java.io.Serializable;
import java.util.Date;
/** 
 * 关键词搜索记录明细(op_keyword_detail)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
public class KeywordDetail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//搜索客户端ip
  	 private String ip;
 	//用户id
  	 private int userid;
 	//搜索关键词
  	 private String keyword;
 	//日期
  	 private String statistics_time;
 	//店铺id
  	 private int shopId;
 	//站来源类型 0 pc 1m 2app 3 微信 必填
  	 private int type;



	 
    /**
    *搜索客户端ip
	* @return
    */ 
	public String getIp() {
		return ip;
	}
    /**
    *搜索客户端ip
	* @param type
    */ 
	public void setIp(String ip) {
		this.ip = ip;
	}
    /**
    *用户id
	* @return
    */ 
	public int getUserid() {
		return userid;
	}
    /**
    *用户id
	* @param type
    */ 
	public void setUserid(int userid) {
		this.userid = userid;
	}
    /**
    *搜索关键词
	* @return
    */ 
	public String getKeyword() {
		return keyword;
	}
    /**
    *搜索关键词
	* @param type
    */ 
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
    /**
    *日期
	* @return
    */ 
	public String getStatistics_time() {
		return statistics_time;
	}
    /**
    *日期
	* @param type
    */ 
	public void setStatistics_time(String statistics_time) {
		this.statistics_time = statistics_time;
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
