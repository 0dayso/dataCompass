package com.shifeng.message.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 发送消息(message)实体类
 * 
 * @author sen
 * @version Revision: 1.00 Date: 2016-12-22 11:00:55
 */
public class Message implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// 用户id
	private Integer userid;
	// 用户名称
	private String username;
	// Ip地址
	private String ip;
	// 时间
	private Date ctime;
	// 来源
	private String source;
	// 站来源类型 0 pc 1m 2app 3 微信
	private Integer type;
	// 商家id
	private Integer shopid;
	// 商家名称
	private String shopname;
	// 消息内容
	private String content;
	// 回复类型(1用户说2商家说)
	private Integer status;

	/**
	 * 用户id
	 * 
	 * @return
	 */
	public Integer getUserid() {
		return userid;
	}

	/**
	 * 用户id
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
	 * Ip地址
	 * 
	 * @return
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * Ip地址
	 * 
	 * @param type
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * 时间
	 * 
	 * @return
	 */
	public Date getCtime() {
		return ctime;
	}

	/**
	 * 时间
	 * 
	 * @param type
	 */
	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}

	/**
	 * 来源
	 * 
	 * @return
	 */
	public String getSource() {
		return source;
	}

	/**
	 * 来源
	 * 
	 * @param type
	 */
	public void setSource(String source) {
		this.source = source;
	}

	/**
	 * 站来源类型 0 pc 1m 2app 3 微信
	 * 
	 * @return
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * 站来源类型 0 pc 1m 2app 3 微信
	 * 
	 * @param type
	 */
	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * 商家id
	 * 
	 * @return
	 */
	public Integer getShopid() {
		return shopid;
	}

	/**
	 * 商家id
	 * 
	 * @param type
	 */
	public void setShopid(Integer shopid) {
		this.shopid = shopid;
	}

	/**
	 * 商家名称
	 * 
	 * @return
	 */
	public String getShopname() {
		return shopname;
	}

	/**
	 * 商家名称
	 * 
	 * @param type
	 */
	public void setShopname(String shopname) {
		this.shopname = shopname;
	}

	/**
	 * 消息内容
	 * 
	 * @return
	 */
	public String getContent() {
		return content;
	}

	/**
	 * 消息内容
	 * 
	 * @param type
	 */
	public void setContent(String content) {
		this.content = content;
	}

	/**
	 * 回复类型(1用户说2商家说)
	 * 
	 * @return
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * 回复类型(1用户说2商家说)
	 * 
	 * @param type
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

}
