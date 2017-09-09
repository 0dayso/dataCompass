package com.shifeng.demo;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.shifeng.util.Const;

public class DateDemo {

	public static void main(String[] args) {
		SimpleDateFormat sdfMonth = new SimpleDateFormat("yyyy_MM");
		System.out.println(sdfMonth.format(new Date()));
		System.out.println(String.format(Const.STATISTICS_FOLLOW_CART_USERID_TOSAVE, "11","22"));
	}

}
