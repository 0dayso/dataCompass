package com.shifeng.init;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.shifeng.service.table.TableService;
import com.shifeng.util.DateUtil;
/**
 * 
*    
* 项目名称：compass-interface   
* 类名称：DataInit   
* 类描述：   数据初始化
* 创建人：Win Zhong   
* 创建时间：2015年12月28日 下午1:28:23   
* 修改人：Win Zhong   
* 修改时间：2015年12月28日 下午1:28:23   
* 修改备注：   
* @version    
*
 */
public class DataInit implements ApplicationListener<ContextRefreshedEvent> {

	protected Logger logger = Logger.getLogger(this.getClass());
	@Resource(name="tableService")
	private TableService tableService;
 
	@Override
	  public void onApplicationEvent(ContextRefreshedEvent event) {
	      if(event.getApplicationContext().getParent() == null){//root application context 没有parent，他就是老大.
	           //需要执行的逻辑代码，当spring容器初始化完成后就会执行该方法。
	    	  logger.info("=================================《开始初始化自定义数据》=================================");
			try {
				String nowYearMonth = DateUtil.getNowYearMonth();
		    	  logger.info("===nowYearMonth==="+nowYearMonth);
		    	  int v = tableService.checkVisitMonthTableIsExist(nowYearMonth);
		    	  logger.info("===v==="+v);
				if(v == 0){
			    	logger.info("===createVisitMonthTable===");
					tableService.createVisitMonthTable(nowYearMonth);
				}
				 
				
				logger.info("=================================《初始化自定义数据成功！！！》=================================");
			} catch (Exception e) {
				logger.error("=================================《初始化自定义数据失败！！！》=================================");
				e.printStackTrace();
			}
			 
	      }
	  }
	
}
