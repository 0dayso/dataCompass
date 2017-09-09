package com.shifeng.sell.dto;

import java.io.Serializable;
import java.util.Date;

public class OrderCencelDataDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// 站来源类型(0 pc 1m 2app 3 微信)
	private int type;
	// 店铺id
	private int shopId;
	// 店铺名
	private String shopName;
	// 省市
	private String county;
	// 原因
	private String reason;
	// 提交时间
	private Date submittime;
	// 原因类型1订单取消 2 退货 3 换货
	private int reasontype;
	// 数量
	private int reasoncount;



	/**
	 * 站来源类型(0 pc 1m 2app 3 微信)
	 * 
	 * @return
	 */
	public int getType() {
		return type;
	}

	/**
	 * 站来源类型(0 pc 1m 2app 3 微信)
	 * 
	 * @param type
	 */
	public void setType(int type) {
		this.type = type;
	}

	/**
	 * 店铺id
	 * 
	 * @return
	 */
	public int getShopId() {
		return shopId;
	}

	/**
	 * 店铺id
	 * 
	 * @param type
	 */
	public void setShopId(int shopId) {
		this.shopId = shopId;
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
	 * 原因
	 * 
	 * @return
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * 原因
	 * 
	 * @param type
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}

	/**
	 * 提交时间
	 * 
	 * @return
	 */
	public Date getSubmittime() {
		return submittime;
	}

	/**
	 * 提交时间
	 * 
	 * @param type
	 */
	public void setSubmittime(Date submittime) {
		this.submittime = submittime;
	}

	/**
	 * 原因类型1订单取消 2 退货 3 换货
	 * 
	 * @return
	 */
	public int getReasontype() {
		return reasontype;
	}

	/**
	 * 原因类型1订单取消 2 退货 3 换货
	 * 
	 * @param type
	 */
	public void setReasontype(int reasontype) {
		this.reasontype = reasontype;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public int getReasoncount() {
		return reasoncount;
	}

	public void setReasoncount(int reasoncount) {
		this.reasoncount = reasoncount;
	}

}
