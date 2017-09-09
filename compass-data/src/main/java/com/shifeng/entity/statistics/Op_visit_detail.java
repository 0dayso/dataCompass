package com.shifeng.entity.statistics;

import java.io.Serializable;
import java.util.Date;
/** 
 * 访问明细(op_visit_detail)实体类
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public class Op_visit_detail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//创建时间
  	 private Date visittime;
 	//userid
  	 private String userid;
 	//ip
  	 private String ip;
 	//渠道id
  	 private String channelid;
 	//sku
  	 private String sku;
 	//url
  	 private String url;
 	//二级
  	 private String second;
 	//三级
  	 private String three;
 	//来源
  	 private String source;
 	//活动ID
  	 private String activeId;
 	//渠道链接ID
  	 private String channelUrlId;
  	 //站来源类型(站来源类型 0 pc 1m 2app 3 微信)
  	 private String type;
  	 //店铺id
  	 private String shopId;
  	 //省市
  	 private String county;
	 //cookie
  	 private String cookieid;
  	 
    /**
    *创建时间
	* @return
    */ 
	public Date getVisittime() {
		return visittime;
	}
    /**
    *创建时间
	* @param type
    */ 
	public void setVisittime(Date visittime) {
		this.visittime = visittime;
	}
    /**
    *userid
	* @return
    */ 
	public String getUserid() {
		return userid;
	}
    /**
    *userid
	* @param type
    */ 
	public void setUserid(String userid) {
		this.userid = userid;
	}
    /**
    *ip
	* @return
    */ 
	public String getIp() {
		return ip;
	}
    /**
    *ip
	* @param type
    */ 
	public void setIp(String ip) {
		this.ip = ip;
	}
    /**
    *渠道id
	* @return
    */ 
	public String getChannelid() {
		return channelid;
	}
    /**
    *渠道id
	* @param type
    */ 
	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}
    /**
    *sku
	* @return
    */ 
	public String getSku() {
		return sku;
	}
    /**
    *sku
	* @param type
    */ 
	public void setSku(String sku) {
		this.sku = sku;
	}
    /**
    *url
	* @return
    */ 
	public String getUrl() {
		return url;
	}
    /**
    *url
	* @param type
    */ 
	public void setUrl(String url) {
		this.url = url;
	}
    /**
    *二级
	* @return
    */ 
	public String getSecond() {
		return second;
	}
    /**
    *二级
	* @param type
    */ 
	public void setSecond(String second) {
		this.second = second;
	}
    /**
    *三级
	* @return
    */ 
	public String getThree() {
		return three;
	}
    /**
    *三级
	* @param type
    */ 
	public void setThree(String three) {
		this.three = three;
	}
    /**
    *来源
	* @return
    */ 
	public String getSource() {
		return source;
	}
    /**
    *来源
	* @param type
    */ 
	public void setSource(String source) {
		this.source = source;
	}
    /**
    *活动ID
	* @return
    */ 
	public String getActiveId() {
		return activeId;
	}
    /**
    *活动ID
	* @param type
    */ 
	public void setActiveId(String activeId) {
		this.activeId = activeId;
	}
    /**
    *渠道链接ID
	* @return
    */ 
	public String getChannelUrlId() {
		return channelUrlId;
	}
    /**
    *渠道链接ID
	* @param type
    */ 
	public void setChannelUrlId(String channelUrlId) {
		this.channelUrlId = channelUrlId;
	}
	/**
	 * 站来源类型(站来源类型 0 pc 1m 2app 3 微信)
	 * @return
	 */
	public String getType() {
		return type;
	}
	/**
	 * 站来源类型(站来源类型 0 pc 1m 2app 3 微信)
	 * @return
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * 店铺ID
	 * @return
	 */
	public String getShopId() {
		return shopId;
	}
	/**
	 * 店铺ID
	 * @return
	 */
	public void setShopId(String shopId) {
		this.shopId = shopId;
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
	 * @return
	 */
	public void setCounty(String county) {
		this.county = county;
	}
	public String getCookieid() {
		return cookieid;
	}
	public void setCookieid(String cookieid) {
		this.cookieid = cookieid;
	}
	
	
}
