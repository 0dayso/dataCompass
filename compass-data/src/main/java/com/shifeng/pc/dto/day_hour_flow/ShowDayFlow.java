package com.shifeng.pc.dto.day_hour_flow;

/**
 * 天浏览量
 * @author Yan
 *
 */
public class ShowDayFlow {

	// 浏览量
	int visitnum;
	// 访客数(ip)
	int uv;
	// 访问用户量
	int visitusernum;
	// 访客数(cookie)
	int cookie;
	// 日期
	String date;
	
	
	
	
	public int getCookie() {
		return cookie;
	}
	public void setCookie(int cookie) {
		this.cookie = cookie;
	}
	public int getVisitnum() {
		return visitnum;
	}
	public void setVisitnum(int visitnum) {
		this.visitnum = visitnum;
	}
	public int getUv() {
		return uv;
	}
	public void setUv(int uv) {
		this.uv = uv;
	}
	public int getVisitusernum() {
		return visitusernum;
	}
	public void setVisitusernum(int visitusernum) {
		this.visitusernum = visitusernum;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
	
	
	
	
}
