package com.shifeng.demo;

import org.apache.xbean.spring.context.ClassPathXmlApplicationContext;
import org.springframework.util.StringUtils;

import com.shifeng.entity.purchase.Purchase;
import com.shifeng.entity.register.Register;
import com.shifeng.entity.visit.Visit;
import com.shifeng.ip.IPSeeker;
import com.shifeng.service.purchase.PurchaseService;
import com.shifeng.service.register.RegisterService;
import com.shifeng.service.visit.VisitService;

public class DataIntt {

	public static void main(String[] args) {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "spring/applicationContext.xml"});
		RegisterService registerService = (RegisterService)context.getBean("registerService");
		Register register  = registerService.getObject();
		System.out.println("开始更新数据");
		while(!StringUtils.isEmpty(register)){
			register.setCounty(IPSeeker.I.getAddress(register.getIp()));
			registerService.update(register);
			register  = registerService.getObject();
		}

		System.out.println("数据更新完毕");
		
		
		VisitService visitService = (VisitService)context.getBean("visitService");
		Visit visit  = visitService.getObject();
		System.out.println("开始更新数据");
		while(!StringUtils.isEmpty(visit)){
			visit.setCounty(IPSeeker.I.getAddress(visit.getIp()));
			visitService.update(visit);
			visit  = visitService.getObject();
		}

		System.out.println("数据更新完毕");
		
		
		PurchaseService purchaseService = (PurchaseService)context.getBean("purchaseService");
		Purchase purchase  = purchaseService.getObject();
		System.out.println("开始更新数据");
		while(!StringUtils.isEmpty(purchase)){
			purchase.setCounty(IPSeeker.I.getAddress(purchase.getIp()));
			purchaseService.update(purchase);
			purchase  = purchaseService.getObject();
		}

		System.out.println("数据更新完毕");
	}

}
