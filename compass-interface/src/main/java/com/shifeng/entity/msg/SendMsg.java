package com.shifeng.entity.msg;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class SendMsg implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//用户id 必填
	private int userid;
	//用户名
	private String username;
	//Ip地址
	@JsonIgnore
	private String ip;
	//时间
	private String ctime;
	//来源
	@JsonIgnore
	private String source;
	//站来源类型 0 pc 1m 2app 3 微信
	@JsonIgnore
	private int type;
	//商家id
	private int shopid;
	//商家名称
	private String shopname;
	//消息内容
	private String content;
	//回复类型(1用户说2商家说) 
	private int status;
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getCtime() {
		return ctime;
	}
	public void setCtime(String ctime) {
		this.ctime = ctime;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getShopid() {
		return shopid;
	}
	public void setShopid(int shopid) {
		this.shopid = shopid;
	}
	public String getShopname() {
		return shopname;
	}
	public void setShopname(String shopname) {
		this.shopname = shopname;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	
	
	

}
