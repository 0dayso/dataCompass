package com.shifeng.init;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;
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
	
 
	@Override
	  public void onApplicationEvent(ContextRefreshedEvent event) {
	      if(event.getApplicationContext().getParent() == null){//root application context 没有parent，他就是老大.
	           //需要执行的逻辑代码，当spring容器初始化完成后就会执行该方法。
	    	  logger.info("=================================《开始初始化自定义数据》=================================");
			try {
				 
				Channelurl channelurl2 = new Channelurl();
				channelurl2.setId(0);
				channelurl2.setCid(0);
				channelurl2.setUrl("默认");
				channelurl2.setName("默认");
				channelurl2.setStatus(0);
				String value = JSONObject.fromObject(channelurl2).toString();
				RedisTool.lrem(Const.INTERFACE_CHANNEL_URL_LIST,1, value);
				RedisTool.lpush(Const.INTERFACE_CHANNEL_URL_LIST, value);
				
				logger.info("=================================《初始化自定义数据成功！！！》=================================");
			} catch (Exception e) {
				logger.error("=================================《初始化自定义数据失败！！！》=================================");
				e.printStackTrace();
			}
			 
	      }
	  }
	
}
