package com.shifeng.entity.dimension;

import java.io.Serializable;
import java.util.Date;
/** 
 * 用户统计表(op_user_data)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 15:28:20 
 */  
public class Op_user_data implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//创建日期
  	 private Date cdate;
 	//用户
  	 private int userid;
 	//访问量
  	 private int visitnum;
 	//购买数量
  	 private int purchasenum;
 	//下单金额
  	 private double amount;
 	//支付金额
  	 private double payamount;
 	//订单数量
  	 private int ordernum;
 	//站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
 	//cookie
  	 private int cookie;
 	//关注sku
  	 private int followsku;
 	//购物车
  	 private int cart;
 	//订单退货数量
  	 private int returnordernum;
 	//订单取消数量
  	 private int cancelordernum;
 	//订单换货数量
  	 private int exchangeordernum;
 	//订单支付数量
  	 private int payordernum;
 	//关注店铺
  	 private int followshop;



	 
    /**
    *创建日期
	* @return
    */ 
	public Date getCdate() {
		return cdate;
	}
    /**
    *创建日期
	* @param type
    */ 
	public void setCdate(Date cdate) {
		this.cdate = cdate;
	}
    /**
    *用户
	* @return
    */ 
	public int getUserid() {
		return userid;
	}
    /**
    *用户
	* @param type
    */ 
	public void setUserid(int userid) {
		this.userid = userid;
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
	* @param type
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
	* @param type
    */ 
	public void setPurchasenum(int purchasenum) {
		this.purchasenum = purchasenum;
	}
    /**
    *下单金额
	* @return
    */ 
	public double getAmount() {
		return amount;
	}
    /**
    *下单金额
	* @param type
    */ 
	public void setAmount(double amount) {
		this.amount = amount;
	}
    /**
    *支付金额
	* @return
    */ 
	public double getPayamount() {
		return payamount;
	}
    /**
    *支付金额
	* @param type
    */ 
	public void setPayamount(double payamount) {
		this.payamount = payamount;
	}
    /**
    *订单数量
	* @return
    */ 
	public int getOrdernum() {
		return ordernum;
	}
    /**
    *订单数量
	* @param type
    */ 
	public void setOrdernum(int ordernum) {
		this.ordernum = ordernum;
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
    *cookie
	* @return
    */ 
	public int getCookie() {
		return cookie;
	}
    /**
    *cookie
	* @param type
    */ 
	public void setCookie(int cookie) {
		this.cookie = cookie;
	}
    /**
    *关注sku
	* @return
    */ 
	public int getFollowsku() {
		return followsku;
	}
    /**
    *关注sku
	* @param type
    */ 
	public void setFollowsku(int followsku) {
		this.followsku = followsku;
	}
    /**
    *购物车
	* @return
    */ 
	public int getCart() {
		return cart;
	}
    /**
    *购物车
	* @param type
    */ 
	public void setCart(int cart) {
		this.cart = cart;
	}
    /**
    *订单退货数量
	* @return
    */ 
	public int getReturnordernum() {
		return returnordernum;
	}
    /**
    *订单退货数量
	* @param type
    */ 
	public void setReturnordernum(int returnordernum) {
		this.returnordernum = returnordernum;
	}
    /**
    *订单取消数量
	* @return
    */ 
	public int getCancelordernum() {
		return cancelordernum;
	}
    /**
    *订单取消数量
	* @param type
    */ 
	public void setCancelordernum(int cancelordernum) {
		this.cancelordernum = cancelordernum;
	}
    /**
    *订单换货数量
	* @return
    */ 
	public int getExchangeordernum() {
		return exchangeordernum;
	}
    /**
    *订单换货数量
	* @param type
    */ 
	public void setExchangeordernum(int exchangeordernum) {
		this.exchangeordernum = exchangeordernum;
	}
    /**
    *订单支付数量
	* @return
    */ 
	public int getPayordernum() {
		return payordernum;
	}
    /**
    *订单支付数量
	* @param type
    */ 
	public void setPayordernum(int payordernum) {
		this.payordernum = payordernum;
	}
    /**
    *关注店铺
	* @return
    */ 
	public int getFollowshop() {
		return followshop;
	}
    /**
    *关注店铺
	* @param type
    */ 
	public void setFollowshop(int followshop) {
		this.followshop = followshop;
	}
	
}
