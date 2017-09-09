package com.shifeng.entity.detailed;

import java.io.Serializable;
import java.util.Date;
/** 
 * 商家费用(op_shop_cost_detail)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:35:31 
 */  
public class Op_shop_cost_detail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//创建时间
  	 private Date ctime;
 	//商家id
  	 private int shopid;
 	//商家名称
  	 private String shopname;
 	//ip
  	 private String ip;
 	//站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
 	//省市
  	 private String county;
 	//1商家保证金 2平台使用费 3广告费
  	 private int status;
 	//来源
  	 private String source;
 	//金额
  	 private double money;



	 
    /**
    *创建时间
	* @return
    */ 
	public Date getCtime() {
		return ctime;
	}
    /**
    *创建时间
	* @param type
    */ 
	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}
    /**
    *商家id
	* @return
    */ 
	public int getShopid() {
		return shopid;
	}
    /**
    *商家id
	* @param type
    */ 
	public void setShopid(int shopid) {
		this.shopid = shopid;
	}
    /**
    *商家名称
	* @return
    */ 
	public String getShopname() {
		return shopname;
	}
    /**
    *商家名称
	* @param type
    */ 
	public void setShopname(String shopname) {
		this.shopname = shopname;
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
    *1商家保证金 2平台使用费 3广告费
	* @return
    */ 
	public int getStatus() {
		return status;
	}
    /**
    *1商家保证金 2平台使用费 3广告费
	* @param type
    */ 
	public void setStatus(int status) {
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
    *金额
	* @return
    */ 
	public double getMoney() {
		return money;
	}
    /**
    *金额
	* @param type
    */ 
	public void setMoney(double money) {
		this.money = money;
	}
	
}
