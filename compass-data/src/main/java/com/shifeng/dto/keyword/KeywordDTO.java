package com.shifeng.dto.keyword;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shifeng.util.DateUtil;
 
public class KeywordDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//搜索客户端ip
 	 private String ip;
 	//关键词
  	 private String keyword;
 	//店铺id
  	 private int shopId;
 	//站来源类型 0 pc 1m 2app 3 微信 必填
  	 private Integer type;
  	 
  	 // 开始日期
  	private String startDate;
 	// 结束日期
  	private String endDate;

  	//当前年月（格式：yyyy_MM）
  	@JsonIgnore
  	private String nowYearMonth;

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
	public Integer getType() {
		return type;
	}
    /**
    *站来源类型 0 pc 1m 2app 3 微信 必填
	* @param type
    */ 
	public void setType(Integer type) {
		this.type = type;
	}
	 

	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	/**
	 * 当前年月（格式：yyyy_MM）
	 * @return
	 */
	public String getNowYearMonth() {
		return nowYearMonth;
	}
	/**
	 * 当前年月（格式：yyyy_MM）
	 * @param nowYearMonth
	 */
	public void setNowYearMonth(String nowYearMonth) {
		this.nowYearMonth = nowYearMonth;
	}
}
