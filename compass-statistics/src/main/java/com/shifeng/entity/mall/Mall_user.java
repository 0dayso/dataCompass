package com.shifeng.entity.mall;

import java.io.Serializable;
import java.util.Date;
/** 
 * 商城用户(mall_user)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:30:53 
 */  
public class Mall_user implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//用户id
  	 private int userId;
 	//用户名
  	 private String userName;
 	//账号
  	 private String account;
 	//手机号
  	 private String phone;
 	//邮箱
  	 private String email;
 	//性别
  	 private String sex;
 	//登录次数
  	 private int loginNum;
 	//最后登录ip
  	 private String lastLoginIp;
 	//最后登录时间
  	 private Date lastLoginTime;



	 
    /**
    *用户id
	* @return
    */ 
	public int getUserId() {
		return userId;
	}
    /**
    *用户id
	* @param type
    */ 
	public void setUserId(int userId) {
		this.userId = userId;
	}
    /**
    *用户名
	* @return
    */ 
	public String getUserName() {
		return userName;
	}
    /**
    *用户名
	* @param type
    */ 
	public void setUserName(String userName) {
		this.userName = userName;
	}
    /**
    *账号
	* @return
    */ 
	public String getAccount() {
		return account;
	}
    /**
    *账号
	* @param type
    */ 
	public void setAccount(String account) {
		this.account = account;
	}
    /**
    *手机号
	* @return
    */ 
	public String getPhone() {
		return phone;
	}
    /**
    *手机号
	* @param type
    */ 
	public void setPhone(String phone) {
		this.phone = phone;
	}
    /**
    *邮箱
	* @return
    */ 
	public String getEmail() {
		return email;
	}
    /**
    *邮箱
	* @param type
    */ 
	public void setEmail(String email) {
		this.email = email;
	}
    /**
    *性别
	* @return
    */ 
	public String getSex() {
		return sex;
	}
    /**
    *性别
	* @param type
    */ 
	public void setSex(String sex) {
		this.sex = sex;
	}
    /**
    *登录次数
	* @return
    */ 
	public int getLoginNum() {
		return loginNum;
	}
    /**
    *登录次数
	* @param type
    */ 
	public void setLoginNum(int loginNum) {
		this.loginNum = loginNum;
	}
    /**
    *最后登录ip
	* @return
    */ 
	public String getLastLoginIp() {
		return lastLoginIp;
	}
    /**
    *最后登录ip
	* @param type
    */ 
	public void setLastLoginIp(String lastLoginIp) {
		this.lastLoginIp = lastLoginIp;
	}
    /**
    *最后登录时间
	* @return
    */ 
	public Date getLastLoginTime() {
		return lastLoginTime;
	}
    /**
    *最后登录时间
	* @param type
    */ 
	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}
	
}
