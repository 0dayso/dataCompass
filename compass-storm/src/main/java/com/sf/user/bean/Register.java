package com.sf.user.bean;


import java.io.Serializable;

public class Register implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// 用户ID
	Integer userid;
	// 用户IP
	String ip;
	// 渠道id
	Integer channelid;
	// 渠道链接id
	String channelUrlId;
	// 注册时间
	String registertime;
	// 注册来源
	String source;
	// 活动ID
	String activeId;
	
	
	// ------------2016年11月14日新增
	// 站来源类型 0 pc 1m 2app 3 微信 必填
	String type;


	//省市
	private String county;

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Integer getChannelid() {
		return channelid;
	}

	public void setChannelid(Integer channelid) {
		this.channelid = channelid;
	}

	public String getChannelUrlId() {
		return channelUrlId;
	}

	public void setChannelUrlId(String channelUrlId) {
		this.channelUrlId = channelUrlId;
	}

	public String getRegistertime() {
		return registertime;
	}

	public void setRegistertime(String registertime) {
		this.registertime = registertime;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getActiveId() {
		return activeId;
	}

	public void setActiveId(String activeId) {
		this.activeId = activeId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


}
