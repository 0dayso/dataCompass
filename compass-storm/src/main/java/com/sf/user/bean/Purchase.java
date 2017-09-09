package com.sf.user.bean;


import java.io.Serializable;

/**
 * 购买
 * 
 * @author Yan
 *
 */
public class Purchase implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// 用户ID
	Integer userid;
	// IP
	String ip;
	// 渠道ID
	Integer channelid;
	// sku
	String sku;
	// 数量
	Integer number;
	// 金额
	Double amount;
	// 购买时间
	String purchasetime;
	// 渠道链接ID
	String channelUrlId;
	// 来源
	String source;
	// 活动ID
	String activeId;
	// 支付状态
	Integer status;
	
	//------------2016年11月14日
	// 站来源类型 0 pc 1m 2app 3 微信 必填
	Integer type;
	// 店铺id 必填
	Integer shopId;
	// 订单号
	String orderId;
	
	
	//------------2016年11月23日
	// 商品ID
	Integer productId;


	//省市
	private String county;

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getShopId() {
		return shopId;
	}

	public void setShopId(Integer shopId) {
		this.shopId = shopId;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
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

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getPurchasetime() {
		return purchasetime;
	}

	public void setPurchasetime(String purchasetime) {
		this.purchasetime = purchasetime;
	}

	public String getChannelUrlId() {
		return channelUrlId;
	}

	public void setChannelUrlId(String channelUrlId) {
		this.channelUrlId = channelUrlId;
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

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	


}
