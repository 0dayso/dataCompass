package com.shifeng.operate.dto;

import java.io.Serializable;

public class OperateTableDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//时间段
	private int hour;
	//浏览量
	private int pv;
	//访客数
	private int uv;
	//访客数cookie
	private int cookie;
	//访问用户数
	private int useruv;
	//订单数
	private int ordernum;
	//订单金额
	private double amount;
	//商品数量
	private int purchasenum;
	//下单用户数
	private int orderuser;
	//渠道名
	private String channel;
	//渠道ID
	private int channelid;
	
	public int getHour() {
		return hour;
	}
	public void setHour(int hour) {
		this.hour = hour;
	}
	public int getPv() {
		return pv;
	}
	public void setPv(int pv) {
		this.pv = pv;
	}
	public int getUv() {
		return uv;
	}
	public void setUv(int uv) {
		this.uv = uv;
	}
	public int getCookie() {
		return cookie;
	}
	public void setCookie(int cookie) {
		this.cookie = cookie;
	}
	public int getUseruv() {
		return useruv;
	}
	public void setUseruv(int useruv) {
		this.useruv = useruv;
	}
	public int getOrdernum() {
		return ordernum;
	}
	public void setOrdernum(int ordernum) {
		this.ordernum = ordernum;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public int getPurchasenum() {
		return purchasenum;
	}
	public void setPurchasenum(int purchasenum) {
		this.purchasenum = purchasenum;
	}
	public int getOrderuser() {
		return orderuser;
	}
	public void setOrderuser(int orderuser) {
		this.orderuser = orderuser;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public int getChannelid() {
		return channelid;
	}
	public void setChannelid(int channelid) {
		this.channelid = channelid;
	}
	
}
