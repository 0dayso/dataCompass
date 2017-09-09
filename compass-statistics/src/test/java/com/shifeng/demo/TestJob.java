package com.shifeng.demo;

import com.shifeng.job.DetailedJob;
import com.shifeng.job.VisitDetailJob;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestJob {

	public static void main(String[] args) {
		ApplicationContext context = new ClassPathXmlApplicationContext("spring/applicationContext.xml");
		DetailedJob visitDetailJob= (DetailedJob)context.getBean("detailedJob");
		visitDetailJob.execute();
	}

}
