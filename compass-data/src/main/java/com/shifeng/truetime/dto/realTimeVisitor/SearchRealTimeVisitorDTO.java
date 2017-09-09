package com.shifeng.truetime.dto.realTimeVisitor;

import org.springframework.util.StringUtils;

import com.shifeng.util.DateUtil;

/**
 * 查询实时访客
 * @author Yan
 *
 */
public class SearchRealTimeVisitorDTO {

	// 站来源类型(0 pc 1m 2app 3 微信)
	int type = 0;
	
	// 渠道ID
	String channelid;
	
	// 流量来源
	String source;
	
	// 访问页面
	String url;
	
	// 位置
	String location;

	// 开始日期
	String startDate = DateUtil.YYYY_MM_DDgetBeforDay(7);
	
	// 结束日期
	String endDate = DateUtil.getYYYY_MM_DD();
	
	// 月表名
	String tableName = "_"+DateUtil.getYM(endDate);
	
	

	public String getChannelid() {
		return channelid;
	}

	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
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

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	
	
	
}
