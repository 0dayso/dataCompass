package com.shifeng.controller.job;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.entity.job.ScheduleJob;
import com.shifeng.job.QuartzJob;

@Controller
@RequestMapping(value="/job")
public class JobController {
	
	/**
	 * 调度工厂 
	 */
	@Resource(name = "schedulerFactoryBean")
	Scheduler scheduler;

	@RequestMapping(value = "/quartz")
	public ModelAndView quartz(ModelAndView mv) throws SchedulerException {

		System.out.println(scheduler); // 这里获取任务信息数据
		List<ScheduleJob> jobList = new ArrayList<ScheduleJob>();
		for (int i = 0; i < 3; i++) {
			ScheduleJob job = new ScheduleJob();
			job.setJobId("10001" + i);
			job.setJobName("JobName_" + i);
			job.setJobGroup("dataWork");
			job.setJobStatus("1");
			job.setCronExpression("0/5 * * * * ?");
			job.setDesc("数据导入任务");
			jobList.add(job);
		}
		for (ScheduleJob job : jobList) {

			TriggerKey triggerKey = TriggerKey.triggerKey(job.getJobName(), job.getJobGroup());
			// 获取trigger，即在spring配置文件中定义的 bean id="myTrigger"
			CronTrigger trigger = (CronTrigger) scheduler.getTrigger(triggerKey); // 不存在，创建一个
			if (null == trigger) {
				JobBuilder jobBuilder = JobBuilder.newJob(QuartzJob.class);
				JobDetail jobDetail = jobBuilder.withIdentity(job.getJobName(), job.getJobGroup()).build();
				jobDetail.getJobDataMap().put("scheduleJob", job);
				// 表达式调度构建器
				CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(job.getCronExpression());
				TriggerBuilder<Trigger> tb = TriggerBuilder.newTrigger().withIdentity(job.getJobName(), job.getJobGroup());
				// 按新的cronExpression表达式构建一个新的trigger
				trigger = tb.withSchedule(scheduleBuilder).build();
				scheduler.scheduleJob(jobDetail, trigger);
			} else {
				// Trigger已存在，那么更新相应的定时设置 //表达式调度构建器
				CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(job.getCronExpression());
				// 按新的cronExpression表达式重新构建trigger
				trigger = trigger.getTriggerBuilder().withIdentity(triggerKey).withSchedule(scheduleBuilder).build();
				// 按新的trigger重新设置job执行 
				//scheduler.rescheduleJob(triggerKey,trigger);
			}
		}
		mv.setViewName("index");
		return mv;
	}

}
