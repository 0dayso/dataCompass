package com.shifeng.job;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.visit.Visit;
import com.shifeng.ip.IPSeeker;
import com.shifeng.service.channel.ChannelurlService;
import com.shifeng.service.visit.VisitService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

public class VisitDetailJob {

	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name="visitService")
	private VisitService visitService;
	
	/**
	 * 定时任务
	 */
	 public void execute(){
		 logger.info("【执行保存访问信息任务】");
		 List<Visit> visitList = new ArrayList<Visit>();
		 String str = RedisTool.rpop(Const.STATISTICS_AD_VISIT_DATA_DAY);
		 //logger.info("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 	//logger.info(1);
				 Visit visit = (Visit)JSONObject.toBean(JSONObject.fromObject(str), Visit.class);
				 String county = IPSeeker.I.getAddress(visit.getIp());
				 visit.setCounty(county);
				 //visit.setNowYearMonth(DateUtil.getNowYearMonth());
				 visitList.add(visit);
				 //logger.info(2);
				 //logger.info("visitList.size---"+visitList.size());
				 if(visitList.size() >= 100){
					 try {
						 //logger.info(3);
						visitService.saveVisit(visitList);
						visitList.clear();
						 //logger.info(4);
					} catch (Exception e) {
						e.printStackTrace();
						logger.error("【执行保存访问信息任务错误】：",e);
					}
				 }
				str = RedisTool.rpop(Const.STATISTICS_AD_VISIT_DATA_DAY);
				//logger.info("str2:"+str);
		}

		 //logger.info("visitList.size---"+visitList.size());
		 if(visitList.size() > 0){
			 try {
				 //logger.info(5);
				visitService.saveVisit(visitList);
				 //logger.info(6);
			} catch (Exception e) {
				e.printStackTrace();
				logger.error("【执行保存访问信息任务错误】：",e);
			}
		 }
		 
	 }
	
	
	
	public static void main(String[] args) {
		
		
		
		

		 List<Visit> visitList = new ArrayList<Visit>();
		 String str = RedisTool.rpop(Const.STATISTICS_AD_VISIT_DATA_DAY);
		 System.out.println("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 System.out.println(1);
				 Visit visit = (Visit)JSONObject.toBean(JSONObject.fromObject(str), Visit.class);
				 String county = IPSeeker.I.getAddress(visit.getIp());
				 visit.setCounty(county);
				 //visit.setNowYearMonth(DateUtil.getNowYearMonth());
				 visitList.add(visit);
				 System.out.println(2);
				 System.out.println("visitList.size---"+visitList.size());
				 if(visitList.size() >= 100){
					 try {
						 System.out.println(3);
						//visitService.saveVisit(visitList);
						visitList.clear();
						 System.out.println(4);
					} catch (Exception e) {
						e.printStackTrace();
					}
				 }
				str = RedisTool.rpop(Const.STATISTICS_AD_VISIT_DATA_DAY);
				System.out.println("str2:"+str);
		}

		 System.out.println("visitList.size---"+visitList.size());
		
		
		 
		/* while (true) {
			 String str = RedisTool.rpop(Const.STATISTICS_AD_VISIT_DATA_DAY);
			 logger.debug("访问信息："+str);
			 if(str != null){
				 Visit visit = (Visit)JSONObject.toBean(JSONObject.fromObject(str), Visit.class);
				 String county = IPSeeker.I.getAddress(visit.getIp());
				 visit.setCounty(county);
				 visit.setNowYearMonth(DateUtil.getNowYearMonth());
				 //logger.debug("访问ip："+county);
				 try {
					//visitService.saveVisit(visit);
				} catch (Exception e) {
					e.printStackTrace();
					//logger.error("【执行保存访问信息任务错误】：",e);
				}
			 }
		}*/
	}

}
