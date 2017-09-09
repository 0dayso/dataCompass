package com.shifeng.pc.dto;

import java.io.Serializable;

/**
 * 访客来源返回结果
 * @author sen
 *
 */
public class UvSource implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//访客总数
	private int uvCount;
	//访问总数(ip)
	private int pvCount;
	//访问总数(cookie)
	private int cookieCount;
	//访问用户总数
	private int userCount;
	
	//渠道名
	private String channel;
	//渠道ID
	private String channelid;
	
	
	public int getUvCount() {
		return uvCount;
	}
	public void setUvCount(int uvCount) {
		this.uvCount = uvCount;
	}
	public int getPvCount() {
		return pvCount;
	}
	public void setPvCount(int pvCount) {
		this.pvCount = pvCount;
	}
	public int getUserCount() {
		return userCount;
	}
	public void setUserCount(int userCount) {
		this.userCount = userCount;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public String getChannelid() {
		return channelid;
	}
	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}
	public int getCookieCount() {
		return cookieCount;
	}
	public void setCookieCount(int cookieCount) {
		this.cookieCount = cookieCount;
	}
	
}
