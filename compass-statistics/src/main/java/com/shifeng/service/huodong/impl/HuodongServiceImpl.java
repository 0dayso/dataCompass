package com.shifeng.service.huodong.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.huodong.Wumai;
import com.shifeng.service.huodong.HuodongService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

@Service("huodongServiceImpl")
public class HuodongServiceImpl implements HuodongService{
	
	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;


	/**
	 * 雾霾活动记录
	 */
	public void saveWumai(){

		logger.info("【开始】执行保存雾霾活动记录明细记录任务");
		 String key = Const.HUODONG_WUMAI_DATA;
		 List<Wumai> detailList = new ArrayList<Wumai>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 while (!StringUtils.isEmpty(str)) {
			 Wumai detail = (Wumai)JSONObject.toBean(JSONObject.fromObject(str), Wumai.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
					 dao.save("wumaiMapper.saveDetail", detailList);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				 dao.save("wumaiMapper.saveDetail", detailList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存雾霾活动记录明细记录任务");
		
	}
	
}
