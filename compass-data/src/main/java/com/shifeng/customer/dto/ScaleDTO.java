package com.shifeng.customer.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ScaleDTO {
	

 	 
 	 // 开始日期
 	private String startDate;
	// 结束日期
 	private String endDate;
 	//站来源类型 0 pc 1m 2app 3 微信 必填
 	 private Integer type;

 	//当前年月（格式：yyyy_MM）
 	@JsonIgnore
 	private String nowYearMonth;

 	
 	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
    /**
    *站来源类型 0 pc 1m 2app 3 微信 必填 
	* @return
    */ 
	public Integer getType() {
		return type;
	}
    /**
    *站来源类型 0 pc 1m 2app 3 微信 必填
	* @param type
    */ 
	public void setType(Integer type) {
		this.type = type;
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
