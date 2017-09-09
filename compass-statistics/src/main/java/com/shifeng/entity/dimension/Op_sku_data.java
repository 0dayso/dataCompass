package com.shifeng.entity.dimension;

import java.io.Serializable;
import java.util.Date;
/** 
 * sku统计表(op_sku_data)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 15:28:20 
 */  
public class Op_sku_data implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//创建日期
  	 private Date cdate;
 	//sku
  	 private int sku;
 	//产品id
  	 private int productid;
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
 	//访客数
  	 private int uv;
 	//站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
 	//店铺id
  	 private int shopId;
 	//访问用户数
  	 private int visitusernum;
 	//cookie
  	 private int cookie;
 	//关注
  	 private int follow;
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
    *sku
	* @return
    */ 
	public int getSku() {
		return sku;
	}
    /**
    *sku
	* @param type
    */ 
	public void setSku(int sku) {
		this.sku = sku;
	}
    /**
    *产品id
	* @return
    */ 
	public int getProductid() {
		return productid;
	}
    /**
    *产品id
	* @param type
    */ 
	public void setProductid(int productid) {
		this.productid = productid;
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
    *访客数
	* @return
    */ 
	public int getUv() {
		return uv;
	}
    /**
    *访客数
	* @param type
    */ 
	public void setUv(int uv) {
		this.uv = uv;
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
    *访问用户数
	* @return
    */ 
	public int getVisitusernum() {
		return visitusernum;
	}
    /**
    *访问用户数
	* @param type
    */ 
	public void setVisitusernum(int visitusernum) {
		this.visitusernum = visitusernum;
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
    *关注
	* @return
    */ 
	public int getFollow() {
		return follow;
	}
    /**
    *关注
	* @param type
    */ 
	public void setFollow(int follow) {
		this.follow = follow;
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
	
}
