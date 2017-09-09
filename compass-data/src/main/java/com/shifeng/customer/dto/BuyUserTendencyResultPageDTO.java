package com.shifeng.customer.dto;

/**
 * 卖家分析结果集
 * 
 * @author Yan
 *
 */
public class BuyUserTendencyResultPageDTO {

	// 用户id
	int userid;
	// 下单单量,下单件数,下单金额
	double number;
	// 用户名称
	String userName;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName == null?"":userName;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public double getNumber() {
		return number;
	}

	public void setNumber(double number) {
		this.number = number;
	}

	
}
