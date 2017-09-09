package com.shifeng.job;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.annotation.Scheduled;

public class QuartzJob implements Job {

	static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
    public void execute(JobExecutionContext jobContext) throws JobExecutionException {
		
		System.out.println(sdf.format(jobContext.getFireTime()) + "   开始执行定时任务.......");
	}
 
}
