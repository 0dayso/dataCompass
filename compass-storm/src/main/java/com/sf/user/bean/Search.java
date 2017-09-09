package com.sf.user.bean;

import java.io.Serializable;

/**
 * 关键词搜索记录明细实体类
 * @author Yan
 *
 */
public class Search implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// 用户id必填
	Integer userid;
	// Ip地址必填
	String ip;
	// 搜索关键词
	String keyword;
	// 日期
	String statistics_time;
	// 站来源类型 0 pc 1m 2app 3 微信 必填
	Integer type;
	// 店铺id  (取不到就默认是自营店铺id) 必填
	Integer shopId;

	//省市
	private String county;

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}
	
	public Integer getUserid() {
		return userid;
	}
	public void setUserid(Integer userid) {
		this.userid = userid;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getStatistics_time() {
		return statistics_time;
	}
	public void setStatistics_time(String statistics_time) {
		this.statistics_time = statistics_time;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getShopId() {
		return shopId;
	}
	public void setShopId(Integer shopId) {
		this.shopId = shopId;
	}
	
	
}
