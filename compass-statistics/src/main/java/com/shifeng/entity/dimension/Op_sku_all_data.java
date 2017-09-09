package com.shifeng.entity.dimension;

import java.io.Serializable;
import java.util.Date;
/** 
 * sku总统计表(op_sku_all_data)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-12-01 14:39:11 
 */  
public class Op_sku_all_data implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//sku
  	 private int sku;
 	//产品id
  	 private int productid;
 	//站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
 	//关注
  	 private int follow;
 	//购物车
  	 private int cart;
 	//创建日期
  	 private Date cdate;



	 
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
	
}
