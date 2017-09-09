package com.shifeng.sell.entity.sales;

public class SalesAnalysis {

	//下单数
	private int order_numbber;
	//下单金额
	private double order_amount;	
	//浏览量
	private int visit_number;
	//访客数
	private int cookie_number;
	
	
	public int getOrder_numbber() {
		return order_numbber;
	}
	public void setOrder_numbber(int order_numbber) {
		this.order_numbber = order_numbber;
	}
	public double getOrder_amount() {
		return order_amount;
	}
	public void setOrder_amount(double order_amount) {
		this.order_amount = order_amount;
	}
	public int getVisit_number() {
		return visit_number;
	}
	public void setVisit_number(int visit_number) {
		this.visit_number = visit_number;
	}
	public int getCookie_number() {
		return cookie_number;
	}
	public void setCookie_number(int cookie_number) {
		this.cookie_number = cookie_number;
	}	
	
	
	
}
