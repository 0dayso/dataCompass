package com.shifeng.operation.entity;

import java.io.Serializable;
import java.util.Date;
/** 
 * 后台操作详情(op_operation_detail)实体类
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:09:25 
 */  
public class Op_operation_detail implements Serializable {

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
 	//操作类型（1 增加 2修改 3删除 4 查询）
  	 private int opttype;
 	//操作内容
  	 private String optcontent;
 	//操作模块
  	 private String optmodel;
 	//操作系统（1 商家 2商城后台。。。）
  	 private int optsystem;
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
    *操作类型（1 增加 2修改 3删除 4 查询）
	* @return
    */ 
	public int getOpttype() {
		return opttype;
	}
    /**
    *操作类型（1 增加 2修改 3删除 4 查询）
	* @param type
    */ 
	public void setOpttype(int opttype) {
		this.opttype = opttype;
	}
    /**
    *操作内容
	* @return
    */ 
	public String getOptcontent() {
		return optcontent;
	}
    /**
    *操作内容
	* @param type
    */ 
	public void setOptcontent(String optcontent) {
		this.optcontent = optcontent;
	}
    /**
    *操作模块
	* @return
    */ 
	public String getOptmodel() {
		return optmodel;
	}
    /**
    *操作模块
	* @param type
    */ 
	public void setOptmodel(String optmodel) {
		this.optmodel = optmodel;
	}
    /**
    *操作系统（1 商家 2商城后台。。。）
	* @return
    */ 
	public int getOptsystem() {
		return optsystem;
	}
    /**
    *操作系统（1 商家 2商城后台。。。）
	* @param type
    */ 
	public void setOptsystem(int optsystem) {
		this.optsystem = optsystem;
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
