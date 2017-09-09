package com.shifeng.truetime.dto.realTimeVisitor;
/**
 * 实时访客，展示DTO
 * @author Yan
 *
 */
public class RealTimeVisitorResultDTO {

	// 用户ID
	String userid;
	
	// 用户名称
	String userName;
	
	// 访问时间
	String visittime;
	
	// 访问url
	String url;
	
	// 访问页面标题
	String pageTitle;
	
	// 访问位置
	String county;
	
	// 浏览量
	String visitNum;

	// 入店来源
	String source;
	
	
	
	
	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getVisittime() {
		return visittime;
	}

	public void setVisittime(String visittime) {
		this.visittime = visittime;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPageTitle() {
		return pageTitle;
	}

	public void setPageTitle(String pageTitle) {
		this.pageTitle = pageTitle;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getVisitNum() {
		return visitNum;
	}

	public void setVisitNum(String visitNum) {
		this.visitNum = visitNum;
	}
	
	
	
}
