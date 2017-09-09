package com.shifeng.merchant.dto;

import java.io.Serializable;
import java.util.Date;
/** 
 * 关注商品明细(op_follow_sku_detail)实体类
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public class FollowskuDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//创建时间
  	 private Date ctime;
 	//userid
  	 private int userid;
  	 //用户昵称
  	 private String username;
 	//ip
  	 private String ip;
 	//sku
  	 private String sku;
 	//url
  	 private String url;
 	//来源
  	 private String source;
 	//关注1 取消2
  	 private int status;
 	//站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
 	//省市
  	 private String county;
 	//商品ID
  	 private int productId;
  	 //商品名称
  	 private String productName;
  	 //店铺ID
  	 private String shopId;
  	 //店铺名
  	 private String shopName;


	 
    /**
    *创建时间
	* @return
    */ 
	public Date getCtime() {
		return ctime;
	}
    /**
    *创建时间
	* @param type
    */ 
	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}
    /**
    *userid
	* @return
    */ 
	public int getUserid() {
		return userid;
	}
    /**
    *userid
	* @param type
    */ 
	public void setUserid(int userid) {
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
    *关注1 取消2
	* @return
    */ 
	public int getStatus() {
		return status;
	}
    /**
    *关注1 取消2
	* @param type
    */ 
	public void setStatus(int status) {
		this.status = status;
	}
    /**
    *站来源类型(0 pc 1m 2app 3 微信)
	* @return
    */ 
	public int getType() {
		return type;
	}
    /**
    *站来源类型(0 pc 1m 2app 3 微信)
	* @param type
    */ 
	public void setType(int type) {
		this.type = type;
	}
    /**
    *省市
	* @return
    */ 
	public String getCounty() {
		return county;
	}
    /**
    *省市
	* @param type
    */ 
	public void setCounty(String county) {
		this.county = county;
	}
    /**
    *商品ID
	* @return
    */ 
	public int getProductId() {
		return productId;
	}
    /**
    *商品ID
	* @param type
    */ 
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getShopId() {
		return shopId;
	}
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	
}
