package com.shifeng.customer.dto;

public class BuyUserTendencyEchartsResultDTO {

	// 用户id
	int userid;
	// 用户名称
	String userName;
	// 下单单量
	int orderNumber;
	// 下单件数
	int number;
	// 下单金额
	double amount;
	
	

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

	public int getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

}
