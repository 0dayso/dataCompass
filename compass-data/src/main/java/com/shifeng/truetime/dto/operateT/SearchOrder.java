package com.shifeng.truetime.dto.operateT;

import java.io.Serializable;

import org.springframework.util.StringUtils;

import com.shifeng.util.DateUtil;

public class SearchOrder implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// 开始日期
	String startDate = DateUtil.YYYY_MM_DDgetBeforDay(7);
	// 结束日期
	String endDate = DateUtil.getYYYY_MM_DD();
	// 月表名
	String tableName = "_"+DateUtil.getYM(endDate);
	// 站来源类型(0：pc；1：m；2：app；3： 微信；all：全部；mp：移动端全部)
	String type = "0";
	
	String status;
	
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		// 默认查询最近一周的流量（7天之前）
		this.startDate = StringUtils.isEmpty(startDate)?DateUtil.YYYY_MM_DDgetBeforDay(7):startDate;
	}
	
	
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = StringUtils.isEmpty(endDate)?DateUtil.getYYYY_MM_DD():endDate;
		setTableName("_"+DateUtil.getYM(endDate));
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
