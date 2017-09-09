package com.shifeng.job;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.quartz.JobExecutionException;

public class MyJob {

	static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public void execute() throws JobExecutionException {
		
		System.out.println(sdf.format(new Date()) + "   开始执行定时任务.......");
	}
}
