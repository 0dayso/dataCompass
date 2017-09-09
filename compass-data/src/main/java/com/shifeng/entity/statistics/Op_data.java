package com.shifeng.entity.statistics;

import java.io.Serializable;
import java.util.Date;
/** 
 * 统计表(op_data)实体类
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public class Op_data implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//创建日期
  	 private Date cdate;
 	//渠道id
  	private String channelid;
  	//渠道名
  	private String channel;
 	//渠道链接id
  	 private String channelurlid;
  	 //渠道链接
  	private String channelurl;
 	//访问量
  	 private int visitnum;
 	//购买数量
  	 private int purchasenum;
 	//购买金额
  	 private double amount;
 	//注册量
  	 private int registernum;
  	 //支付金额
  	 private double payamount;
  	 //站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
  	 //店铺id
  	 private String shopId;
  	 //订单数量
  	 private int ordernum;
  	 //访客数
  	 private int uv;
  	 //访问用户数
  	 private int visitusernum;
  	 //cookie
  	 private int cookie;
	private String productname;
	private String hour;

	public String getHour() {
		return hour;
	}

	public void setHour(String hour) {
		this.hour = hour;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	/**
    *创建日期
	* @return
    */ 
	public Date getCdate() {
		return cdate;
	}
    
	public void setCdate(Date cdate) {
		this.cdate = cdate;
	}
    /**
    *渠道id
	* @return
    */ 
	public String getChannelid() {
		return channelid;
	}
     
	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}
    /**
    *渠道链接id
	* @return
    */ 
	public String getChannelurlid() {
		return channelurlid;
	}
    /**
    *渠道链接id
	
    */ 
	public void setChannelurlid(String channelurlid) {
		this.channelurlid = channelurlid;
	}
    /**
    *访问量
	* @return
    */ 
	public int getVisitnum() {
		return visitnum;
	}
    /**
    *访问量
	
    */ 
	public void setVisitnum(int visitnum) {
		this.visitnum = visitnum;
	}
    /**
    *购买数量
	* @return
    */ 
	public int getPurchasenum() {
		return purchasenum;
	}
    /**
    *购买数量
	* 
    */ 
	public void setPurchasenum(int purchasenum) {
		this.purchasenum = purchasenum;
	}
    /**
    *购买金额
	* @return
    */ 
	public double getAmount() {
		return amount;
	}
    /**
    *购买金额
	* 
    */ 
	public void setAmount(double amount) {
		this.amount = amount;
	}
    /**
    *注册量
	* @return
    */ 
	public int getRegisternum() {
		return registernum;
	}
    /**
    *注册量
	* 
    */ 
	public void setRegisternum(int registernum) {
		this.registernum = registernum;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public String getChannelurl() {
		return channelurl;
	}
	public void setChannelurl(String channelurl) {
		this.channelurl = channelurl;
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
	public String getShopId() {
		return shopId;
	}
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
	public int getOrdernum() {
		return ordernum;
	}
	public void setOrdernum(int ordernum) {
		this.ordernum = ordernum;
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
	
	
	
}
