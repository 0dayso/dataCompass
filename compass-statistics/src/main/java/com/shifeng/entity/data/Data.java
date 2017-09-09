package com.shifeng.entity.data;

import java.util.Date;

public class Data {
	//创建日期
	private Date cdate;
	//渠道id
	private Integer channelid;
	//渠道链接id
	private Integer channelurlid;
	//访问量
	private Integer visitnum;
	//购买数量
	private Integer purchasenum;
	//购买金额
	private double amount;
	//注册量
	private Integer registernum;
	//支付金额
	private double payamount;
	//订单数量
	private Integer ordernum;
	//访客数
	private Integer uv;
	//站来源类型(0 pc 1m 2app 3 微信)
	private Integer type;
	//店铺id
	private Integer shopId;
	//访问用户数
	private Integer visitusernum;
	//-----------------2016年11月21日新增
	// cookieID
	private Integer cookie;
	//-----------------2016年12月01日新增
	// 订单支付数量
	private Integer payordernum;
	// 订单退货数量
	private Integer returnordernum;
	// 订单取消数量
	private Integer cancelordernum;
	// 订单换货数量
	private Integer exchangeordernum;
	
	

	public Integer getCookie() {
		return cookie;
	}

	public void setCookie(Integer cookie) {
		this.cookie = cookie;
	}

	public Date getCdate() {
		return cdate;
	}
	public void setCdate(Date cdate) {
		this.cdate = cdate;
	}
	public Integer getChannelid() {
		return channelid;
	}
	public void setChannelid(Integer channelid) {
		this.channelid = channelid;
	}
	public Integer getChannelurlid() {
		return channelurlid;
	}
	public void setChannelurlid(Integer channelurlid) {
		this.channelurlid = channelurlid;
	}
	public Integer getVisitnum() {
		return visitnum;
	}
	public void setVisitnum(Integer visitnum) {
		this.visitnum = visitnum;
	}
	public Integer getPurchasenum() {
		return purchasenum;
	}
	public void setPurchasenum(Integer purchasenum) {
		this.purchasenum = purchasenum;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public Integer getRegisternum() {
		return registernum;
	}
	public void setRegisternum(Integer registernum) {
		this.registernum = registernum;
	}
	public double getPayamount() {
		return payamount;
	}
	public void setPayamount(double payamount) {
		this.payamount = payamount;
	}
	public Integer getOrdernum() {
		return ordernum;
	}
	public void setOrdernum(Integer ordernum) {
		this.ordernum = ordernum;
	}
	public Integer getUv() {
		return uv;
	}
	public void setUv(Integer uv) {
		this.uv = uv;
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
	public Integer getVisitusernum() {
		return visitusernum;
	}
	public void setVisitusernum(Integer visitusernum) {
		this.visitusernum = visitusernum;
	}

	public Integer getPayordernum() {
		return payordernum;
	}

	public void setPayordernum(Integer payordernum) {
		this.payordernum = payordernum;
	}

	public Integer getReturnordernum() {
		return returnordernum;
	}

	public void setReturnordernum(Integer returnordernum) {
		this.returnordernum = returnordernum;
	}

	public Integer getCancelordernum() {
		return cancelordernum;
	}

	public void setCancelordernum(Integer cancelordernum) {
		this.cancelordernum = cancelordernum;
	}

	public Integer getExchangeordernum() {
		return exchangeordernum;
	}

	public void setExchangeordernum(Integer exchangeordernum) {
		this.exchangeordernum = exchangeordernum;
	}
	 
	
	
	
}
