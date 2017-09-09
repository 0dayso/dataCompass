package com.shifeng.entity.detailed;

import java.io.Serializable;
import java.util.Date;
/** 
 * 登录详细(op_login_detail)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:35:31 
 */  
public class Op_login_detail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//创建时间
  	 private Date ctime;
 	//userid
  	 private int userid;
 	//用户名称
  	 private String username;
 	//ip
  	 private String ip;
 	//站来源类型(0 pc 1m 2app 3 微信)
  	 private int type;
 	//省市
  	 private String county;
 	//登录状态(1成功2 失败)
  	 private int status;
 	//来源
  	 private String source;



	 
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
    *用户名称
	* @return
    */ 
	public String getUsername() {
		return username;
	}
    /**
    *用户名称
	* @param type
    */ 
	public void setUsername(String username) {
		this.username = username;
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
    *登录状态(1成功2 失败)
	* @return
    */ 
	public int getStatus() {
		return status;
	}
    /**
    *登录状态(1成功2 失败)
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
	
}
