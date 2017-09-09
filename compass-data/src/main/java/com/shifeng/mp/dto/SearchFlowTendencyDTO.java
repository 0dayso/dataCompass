package com.shifeng.mp.dto;

import org.springframework.util.StringUtils;

import com.shifeng.util.DateUtil;

public class SearchFlowTendencyDTO {
	
	// 结束日期
	String endDate = DateUtil.getYYYY_MM_DD();
	// 月表名
	String tableName = "_"+DateUtil.getYM(endDate);
	// 站来源类型(-1所有平台  0pc 1m 2app 3微信)
	Integer type = -1;
	
	
	
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = StringUtils.isEmpty(endDate)?DateUtil.getYYYY_MM_DD():endDate;
		setTableName("_"+DateUtil.getYM(endDate));
	}
	
	
}
