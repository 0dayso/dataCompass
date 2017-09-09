package com.shifeng.service.msg.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.detailed.Op_shop_cost_detail;
import com.shifeng.entity.msg.SendMsg;
import com.shifeng.service.msg.MsgService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

@Service("msgServiceImpl")
public class MsgServiceImpl implements MsgService{
	
	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	/**
	 * 保存发送消息
	 * @param msg
	 * @throws Exception
	 */
	public void saveSendMsg() {
		logger.info("【开始】执行保存发送消息明细记录任务");
		 String key = Const.MSG_SC_DATA;
		 List<SendMsg> detailList = new ArrayList<SendMsg>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 Map<String,Object> map = new HashMap<String,Object>(); 
		 String nowYearMonth = DateUtil.getNowYearMonth();
		 while (!StringUtils.isEmpty(str)) {
			 SendMsg detail = (SendMsg)JSONObject.toBean(JSONObject.fromObject(str), SendMsg.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
				     map.put("nowYearMonth", nowYearMonth);
				     map.put("detailList", detailList);
					 dao.save("msgMapper.saveDetail", map);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				 map.put("nowYearMonth", nowYearMonth);
			     map.put("detailList", detailList);
			     dao.save("msgMapper.saveDetail", map);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存发送消息明细记录任务");
	}

 
}
