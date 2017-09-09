package com.shifeng.operation.dto;

import java.io.Serializable;

public class OperationDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	// 开始时间
	private String startDate;
	// 结束时间
	private String endDate;
	// userid
	private Integer userid;
	// 用户名称
	private String username;
	// ip
	private String ip;
	// 操作类型（1 增加 2修改 3删除 4 查询）
	private int opttype;
	// 操作内容
	private String optcontent;
	// 操作模块
	private String optmodel;
	// 操作系统（1 商家 2商城后台。。。）
	private int optsystem;
	// 站来源类型(0 pc 1m 2app 3 微信)
	private Integer type;
	// 省市
	private String county;

	private String tableName;
	
	/**
	 * 开始时间
	 * 
	 * @return
	 */
	public String getStartDate() {
		return startDate;
	}

	/**
	 * 开始时间
	 * 
	 * @param type
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	
	/**
	 * 结束时间
	 * 
	 * @return
	 */
	public String getEndDate() {
		return endDate;
	}

	/**
	 * 结束时间
	 * 
	 * @param type
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	/**
	 * userid
	 * 
	 * @return
	 */
	public Integer getUserid() {
		return userid;
	}

	/**
	 * userid
	 * 
	 * @param type
	 */
	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	/**
	 * 用户名称
	 * 
	 * @return
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * 用户名称
	 * 
	 * @param type
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * ip
	 * 
	 * @return
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * ip
	 * 
	 * @param type
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * 操作类型（1 增加 2修改 3删除 4 查询）
	 * 
	 * @return
	 */
	public int getOpttype() {
		return opttype;
	}

	/**
	 * 操作类型（1 增加 2修改 3删除 4 查询）
	 * 
	 * @param type
	 */
	public void setOpttype(int opttype) {
		this.opttype = opttype;
	}

	/**
	 * 操作内容
	 * 
	 * @return
	 */
	public String getOptcontent() {
		return optcontent;
	}

	/**
	 * 操作内容
	 * 
	 * @param type
	 */
	public void setOptcontent(String optcontent) {
		this.optcontent = optcontent;
	}

	/**
	 * 操作模块
	 * 
	 * @return
	 */
	public String getOptmodel() {
		return optmodel;
	}

	/**
	 * 操作模块
	 * 
	 * @param type
	 */
	public void setOptmodel(String optmodel) {
		this.optmodel = optmodel;
	}

	/**
	 * 操作系统（1 商家 2商城后台。。。）
	 * 
	 * @return
	 */
	public int getOptsystem() {
		return optsystem;
	}

	/**
	 * 操作系统（1 商家 2商城后台。。。）
	 * 
	 * @param type
	 */
	public void setOptsystem(int optsystem) {
		this.optsystem = optsystem;
	}

	/**
	 * 站来源类型(0 pc 1m 2app 3 微信)
	 * 
	 * @return
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * 站来源类型(0 pc 1m 2app 3 微信)
	 * 
	 * @param type
	 */
	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * 省市
	 * 
	 * @return
	 */
	public String getCounty() {
		return county;
	}

	/**
	 * 省市
	 * 
	 * @param type
	 */
	public void setCounty(String county) {
		this.county = county;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	
}
