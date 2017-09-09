package com.shifeng.sell.dto;

import java.io.Serializable;
import java.util.Date;
/** 
 * 订单取消明细(op_purchase_cancel_detail)实体类
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public class PurchasecancelDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//购买时间
  	 private Date purchasetime;
 	//userid
  	 private int userid;
  	 //用户昵称
  	 private String username;
 	//ip
  	 private String ip;
 	//渠道id
  	 private int channelid;
  	 //渠道名
  	 private String channelname;
 	//sku
  	 private String sku;
  	 //商品名称
  	 private String productName;
 	//数量
  	 private int number;
 	//金额
  	 private double amount;
 	//支付状态
  	 private String status;
 	//来源
  	 private String source;
 	//活动ID
  	 private String activeId;
 	//渠道链接ID
  	 private int channelUrlId;
  	 //渠道链接
  	 private String channelUrl;
 	//站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
 	//店铺id
  	 private int shopId;
  	 //店铺名
  	 private String shopName;
 	//订单号
  	 private String orderId;
 	//省市
  	 private String county;
 	//产品id
  	 private int productId;
 	//原因
  	 private String reason;
 	//提交时间
  	 private Date submittime;
 	//原因类型1订单取消 2 退货 3 换货
  	 private int reasontype;

	 //原因出现次数
  	 private int count;
  	 
    /**
    *购买时间
	* @return
    */ 
	public Date getPurchasetime() {
		return purchasetime;
	}
    /**
    *购买时间
	* @param type
    */ 
	public void setPurchasetime(Date purchasetime) {
		this.purchasetime = purchasetime;
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
    *渠道id
	* @return
    */ 
	public int getChannelid() {
		return channelid;
	}
    /**
    *渠道id
	* @param type
    */ 
	public void setChannelid(int channelid) {
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
    *数量
	* @return
    */ 
	public int getNumber() {
		return number;
	}
    /**
    *数量
	* @param type
    */ 
	public void setNumber(int number) {
		this.number = number;
	}
    /**
    *金额
	* @return
    */ 
	public double getAmount() {
		return amount;
	}
    /**
    *金额
	* @param type
    */ 
	public void setAmount(double amount) {
		this.amount = amount;
	}
    /**
    *支付状态
	* @return
    */ 
	public String getStatus() {
		return status;
	}
    /**
    *支付状态
	* @param type
    */ 
	public void setStatus(String status) {
		this.status = status;
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
	public int getChannelUrlId() {
		return channelUrlId;
	}
    /**
    *渠道链接ID
	* @param type
    */ 
	public void setChannelUrlId(int channelUrlId) {
		this.channelUrlId = channelUrlId;
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
    *订单号
	* @return
    */ 
	public String getOrderId() {
		return orderId;
	}
    /**
    *订单号
	* @param type
    */ 
	public void setOrderId(String orderId) {
		this.orderId = orderId;
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
    *产品id
	* @return
    */ 
	public int getProductId() {
		return productId;
	}
    /**
    *产品id
	* @param type
    */ 
	public void setProductId(int productId) {
		this.productId = productId;
	}
    /**
    *原因
	* @return
    */ 
	public String getReason() {
		return reason;
	}
    /**
    *原因
	* @param type
    */ 
	public void setReason(String reason) {
		this.reason = reason;
	}
    /**
    *提交时间
	* @return
    */ 
	public Date getSubmittime() {
		return submittime;
	}
    /**
    *提交时间
	* @param type
    */ 
	public void setSubmittime(Date submittime) {
		this.submittime = submittime;
	}
    /**
    *原因类型1订单取消 2 退货 3 换货
	* @return
    */ 
	public int getReasontype() {
		return reasontype;
	}
    /**
    *原因类型1订单取消 2 退货 3 换货
	* @param type
    */ 
	public void setReasontype(int reasontype) {
		this.reasontype = reasontype;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getChannelname() {
		return channelname;
	}
	public void setChannelname(String channelname) {
		this.channelname = channelname;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getChannelUrl() {
		return channelUrl;
	}
	public void setChannelUrl(String channelUrl) {
		this.channelUrl = channelUrl;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
}
