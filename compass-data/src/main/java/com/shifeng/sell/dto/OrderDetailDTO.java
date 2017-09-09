package com.shifeng.sell.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class OrderDetailDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	// 购买时间
	private Date purchasetime;
	// userid
	private String userid;
	//用户名
	private String username;
	// ip
	private String ip;
	// 渠道id
	private String channelid;
	// sku
	private String sku;
	//商品名称
	private String pname;
	// 数量
	private int number;
	// 金额
	private double amount;
	// 支付状态
	private String status;
	// 来源
	private String source;
	// 活动ID
	private String activeId;
	// 渠道链接ID
	private String channelUrlId;
	// 站来源类型(站来源类型 0 pc 1m 2app 3 微信)
	private String type;
	// 店铺id
	private String shopId;
	//店铺名称
	private String sname;
	// 订单号
	private String orderId;
	// 省市
	private String county;

	//订单SKU集合
	private List<OrderDetailDTO> ordersku;
	
	//dbtime
	private String tableName;
	
	/**
	 * 购买时间
	 * 
	 * @return
	 */
	public Date getPurchasetime() {
		return purchasetime;
	}

	/**
	 * 购买时间
	 * 
	 * @param type
	 */
	public void setPurchasetime(Date purchasetime) {
		this.purchasetime = purchasetime;
	}

	/**
	 * userid
	 * 
	 * @return
	 */
	public String getUserid() {
		return userid;
	}

	/**
	 * userid
	 * 
	 * @param type
	 */
	public void setUserid(String userid) {
		this.userid = userid;
	}

	/**
	 * ip
	 * 
	 * @return
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * ip
	 * 
	 * @param type
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * 渠道id
	 * 
	 * @return
	 */
	public String getChannelid() {
		return channelid;
	}

	/**
	 * 渠道id
	 * 
	 * @param type
	 */
	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}

	/**
	 * sku
	 * 
	 * @return
	 */
	public String getSku() {
		return sku;
	}

	/**
	 * sku
	 * 
	 * @param type
	 */
	public void setSku(String sku) {
		this.sku = sku;
	}

	/**
	 * 数量
	 * 
	 * @return
	 */
	public int getNumber() {
		return number;
	}

	/**
	 * 数量
	 * 
	 * @param type
	 */
	public void setNumber(int number) {
		this.number = number;
	}

	/**
	 * 金额
	 * 
	 * @return
	 */
	public double getAmount() {
		return amount;
	}

	/**
	 * 金额
	 * 
	 * @param type
	 */
	public void setAmount(double amount) {
		this.amount = amount;
	}

	/**
	 * 支付状态
	 * 
	 * @return
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * 支付状态
	 * 
	 * @param type
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * 来源
	 * 
	 * @return
	 */
	public String getSource() {
		return source;
	}

	/**
	 * 来源
	 * 
	 * @param type
	 */
	public void setSource(String source) {
		this.source = source;
	}

	/**
	 * 活动ID
	 * 
	 * @return
	 */
	public String getActiveId() {
		return activeId;
	}

	/**
	 * 活动ID
	 * 
	 * @param type
	 */
	public void setActiveId(String activeId) {
		this.activeId = activeId;
	}

	/**
	 * 渠道链接ID
	 * 
	 * @return
	 */
	public String getChannelUrlId() {
		return channelUrlId;
	}

	/**
	 * 渠道链接ID
	 * 
	 * @param type
	 */
	public void setChannelUrlId(String channelUrlId) {
		this.channelUrlId = channelUrlId;
	}

	/**
	 * 站来源类型(站来源类型 0 pc 1m 2app 3 微信)
	 * 
	 * @return
	 */
	public String getType() {
		return type;
	}

	/**
	 * 站来源类型(站来源类型 0 pc 1m 2app 3 微信)
	 * 
	 * @return
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * 店铺ID
	 * 
	 * @return
	 */
	public String getShopId() {
		return shopId;
	}

	/**
	 * 店铺ID
	 * 
	 * @return
	 */
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}

	/**
	 * 订单号
	 * 
	 * @return
	 */
	public String getOrderId() {
		return orderId;
	}

	/**
	 * 订单号
	 * 
	 * @return
	 */
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	/**
	 * 省市
	 * 
	 * @return
	 */
	public String getCounty() {
		return county;
	}

	/**
	 * 省市
	 * 
	 * @return
	 */
	public void setCounty(String county) {
		this.county = county;
	}

	public List<OrderDetailDTO> getOrdersku() {
		return ordersku;
	}

	public void setOrdersku(List<OrderDetailDTO> ordersku) {
		this.ordersku = ordersku;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
