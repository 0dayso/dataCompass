package com.shifeng.entity.detailed;

import java.io.Serializable;
import java.util.Date;
/** 
 * 关注店铺明细(op_follow_shop_detail)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:23:01 
 */  
public class Op_follow_shop_detail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//创建时间
  	 private Date ctime;
 	//userid
  	 private int userid;
 	//ip
  	 private String ip;
 	//店铺id
  	 private int shopId;
 	//url
  	 private String url;
 	//来源
  	 private String source;
 	//关注1 取消2
  	 private int status;
 	//站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
 	//省市
  	 private String county;



	 
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
    *userid
	* @return
    */ 
	public int getUserid() {
		return userid;
	}
    /**
    *userid
	* @param type
    */ 
	public void setUserid(int userid) {
		this.userid = userid;
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
    *url
	* @return
    */ 
	public String getUrl() {
		return url;
	}
    /**
    *url
	* @param type
    */ 
	public void setUrl(String url) {
		this.url = url;
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
    *关注1 取消2
	* @return
    */ 
	public int getStatus() {
		return status;
	}
    /**
    *关注1 取消2
	* @param type
    */ 
	public void setStatus(int status) {
		this.status = status;
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
	
}
