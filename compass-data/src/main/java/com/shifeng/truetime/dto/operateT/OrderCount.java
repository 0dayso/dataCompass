package com.shifeng.truetime.dto.operateT;

import java.io.Serializable;

public class OrderCount implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//时间段
	private int hour;
	//总数
	private int count;
	
	public int getHour() {
		return hour;
	}
	public void setHour(int hour) {
		this.hour = hour;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
}
