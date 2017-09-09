package com.shifeng.entity.huodong;

import java.io.Serializable;

public class Wumai implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//Ip地址
	private String ip;
	//时间 (接口默认当前时间)
	private String ctime;
	//来源
	private String source;
	//商品sku
	private String sku;
	//1打开次数，2填写人数数，3转发次数，4点击商品次数
	private int status;
    //省市
    private String county;
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
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getCounty() {
		return county;
	}
	public void setCounty(String county) {
		this.county = county;
	}
	 

	
	
}
