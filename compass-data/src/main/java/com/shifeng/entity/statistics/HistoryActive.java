package com.shifeng.entity.statistics;

import java.io.Serializable;
import java.util.Date;

public class HistoryActive implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// 创建日期
	private Date cdate;
	// 访问量
	private int visitnum;
	// 购买数量
	private int purchasenum;
	// 购买金额
	private double amount;
	// 支付金额
	private double payamount;
	// 站来源类型(0 pc 1m 2app 3 微信)
	private int type;
	// 访客数
	private int uv;
	// 访问用户数
	private int visitusernum;
	// cookie
	private int cookie;
	//订单数量
	private int ordernum;
	//活动
	private String activeId;
	
	
	public Date getCdate() {
		return cdate;
	}
	public void setCdate(Date cdate) {
		this.cdate = cdate;
	}
	public int getVisitnum() {
		return visitnum;
	}
	public void setVisitnum(int visitnum) {
		this.visitnum = visitnum;
	}
	public int getPurchasenum() {
		return purchasenum;
	}
	public void setPurchasenum(int purchasenum) {
		this.purchasenum = purchasenum;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getPayamount() {
		return payamount;
	}
	public void setPayamount(double payamount) {
		this.payamount = payamount;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getUv() {
		return uv;
	}
	public void setUv(int uv) {
		this.uv = uv;
	}
	public int getVisitusernum() {
		return visitusernum;
	}
	public void setVisitusernum(int visitusernum) {
		this.visitusernum = visitusernum;
	}
	public int getCookie() {
		return cookie;
	}
	public void setCookie(int cookie) {
		this.cookie = cookie;
	}
	public String getActiveId() {
		return activeId;
	}
	public void setActiveId(String activeId) {
		this.activeId = activeId;
	}
	public int getOrdernum() {
		return ordernum;
	}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         	 
	public void setOrdernum(int ordernum) {
		this.ordernum = ordernum;
	}
	
	
}
