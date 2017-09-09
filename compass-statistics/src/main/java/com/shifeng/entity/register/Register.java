package com.shifeng.entity.register;

import java.io.Serializable;

import org.springframework.util.StringUtils;

import com.shifeng.entity.visit.Visit;

public class Register implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer userid;
	private String ip;
	private Integer channelid;
	private String channelUrlId;
	private String registertime;
	private String source;
	private String activeId;
	//省市
	private String county;
	
	//当前年月（格式：yyyy_MM）
	private String nowYearMonth;
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
	/**
	 * 省市
	 * @return
	 */
	public String getCounty() {
		return county;
	}
	/**
	 * 省市
	 * @param county
	 */
	public void setCounty(String county) {
		this.county = county;
	}


	/**
	 * 当前年月（格式：yyyy_MM）
	 * @return
	 */
	public String getNowYearMonth() {
		return nowYearMonth;
	}
	/**
	 * 当前年月（格式：yyyy_MM）
	 * @param nowYearMonth
	 */
	public void setNowYearMonth(String nowYearMonth) {
		this.nowYearMonth = nowYearMonth;
	}
}
