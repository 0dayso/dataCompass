package com.shifeng.entity.visit;

import java.io.Serializable;

import org.springframework.util.StringUtils;

public class Visit implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// 用户ID
	Integer userid;
	// ip
	String ip;
	// 渠道id
	Integer channelid;
	// 商品SKU
	String sku;
	// 当前页面路径
	String url;
	// 二级
	String second;
	// 三级
	String three;
	// 访问时间必填
	String visittime;
	// 来源
	String source;
	// 活动ID
	String activeId;
	// 渠道链接ID
	String channelUrlId;
	
	//-----------------2016年11月11日 新增
	// 站来源类型 0 pc 1m 2app 3 微信
	Integer type;
	// 店铺id
	Integer shopId;

	//省市
	private String county;
	
	//当前年月（格式：yyyy_MM）
	private String nowYearMonth;
	
	//-----------------2016年11月21日新增
	// cookieID
	String cookieid;
	
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

	public String getChannelUrlId() {
		return channelUrlId;
	}

	public void setChannelUrlId(String channelUrlId) {
		this.channelUrlId = channelUrlId;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public Integer getChannelid() {
		return channelid;
	}

	public void setChannelid(Integer channelid) {
		this.channelid = channelid;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSecond() {
		return second;
	}

	public void setSecond(String second) {
		this.second = second;
	}

	public String getThree() {
		return three;
	}

	public void setThree(String three) {
		this.three = three;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getActiveId() {
		return activeId;
	}

	public void setActiveId(String activeId) {
		this.activeId = activeId;
	}

	public String getVisittime() {
		return visittime;
	}

	public void setVisittime(String visittime) {
		this.visittime = visittime;
	}
	

	/**
	 * 省市
	 * @return
	 */
	public String getCounty() {
		return county;
	}
	/**
	 * 省市
	 * @param county
	 */
	public void setCounty(String county) {
		this.county = county;
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
	
	public String getCookieid() {
		return cookieid;
	}

	public void setCookieid(String cookieid) {
		this.cookieid = cookieid;
	}
}
