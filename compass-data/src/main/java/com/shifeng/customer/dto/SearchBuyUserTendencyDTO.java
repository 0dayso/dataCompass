package com.shifeng.customer.dto;

import com.shifeng.util.DateUtil;

/**
 * 卖家分析搜索DTO
 * 
 * @author Yan
 *
 */
public class SearchBuyUserTendencyDTO {

	// 开始日期
	String startDate = DateUtil.YYYY_MM_DDgetBeforDay(7);

	// 结束日期
	String endDate = DateUtil.getYYYY_MM_DD();

	// 月表名
	String tableName = "_" + DateUtil.getYM(endDate);

	// 搜索类型(0：下单单量；1：下单件数；2：下单金额)
	int type = 0;

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

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
