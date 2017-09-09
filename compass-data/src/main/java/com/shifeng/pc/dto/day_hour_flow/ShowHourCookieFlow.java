package com.shifeng.pc.dto.day_hour_flow;

import java.io.Serializable;

/**
 * 展示小时的cookie数量
 * @author Yan
 *
 */
public class ShowHourCookieFlow implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// cookie数量
	int cookieNum;
	// 时间(小时)
	int timehour;
	
	
	public int getCookieNum() {
		return cookieNum;
	}
	public void setCookieNum(int cookieNum) {
		this.cookieNum = cookieNum;
	}
	public int getTimehour() {
		return timehour;
	}
	public void setTimehour(int timehour) {
		this.timehour = timehour;
	}
	
	
	
}
