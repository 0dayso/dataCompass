package com.shifeng.activity.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 活动/雾霾(activity_haze)实体类
 * 
 * @author sen
 * @version Revision: 1.00 Date: 2016-12-22 11:00:55
 */
public class Activity_haze implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// ip
	private String ip;
	// 时间
	private Date ctime;
	// 来源
	private String source;
	// 商品sku
	private String sku;
	// 省市
	private String county;
	// 状态（1打开次数，2填写人数数，3转发次数，4点击商品次数）
	private Integer status;
	
	//商品名称
	private String productName;
	//打开人数
	private int opencount;
	//填写人数
	private int writecount;
	//转发人数
	private int transpond;
	//点击次数
	private int clickcount;
	
	
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
	 * 商品sku
	 * 
	 * @return
	 */
	public String getSku() {
		return sku;
	}

	/**
	 * 商品sku
	 * 
	 * @param type
	 */
	public void setSku(String sku) {
		this.sku = sku;
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

	/**
	 * 状态（1打开次数，2填写人数数，3转发次数，4点击商品次数）
	 * 
	 * @return
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * 状态（1打开次数，2填写人数数，3转发次数，4点击商品次数）
	 * 
	 * @param type
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getOpencount() {
		return opencount;
	}

	public void setOpencount(int opencount) {
		this.opencount = opencount;
	}

	public int getWritecount() {
		return writecount;
	}

	public void setWritecount(int writecount) {
		this.writecount = writecount;
	}

	public int getTranspond() {
		return transpond;
	}

	public void setTranspond(int transpond) {
		this.transpond = transpond;
	}

	public int getClickcount() {
		return clickcount;
	}

	public void setClickcount(int clickcount) {
		this.clickcount = clickcount;
	}


}
