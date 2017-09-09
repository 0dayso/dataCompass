package com.shifeng.service.dimension.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.dimension.Op_sku_all_data;
import com.shifeng.entity.dimension.Op_user_data;
import com.shifeng.service.dimension.Op_sku_all_dataService;
import com.shifeng.util.Const;
import com.shifeng.util.Constants;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import redis.clients.jedis.Tuple; 

/** 
 * sku总统计表(op_sku_all_data)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-12-01 14:39:11 
 */  
@Service("op_sku_all_dataServiceImpl")
public class Op_sku_all_dataServiceImpl implements Op_sku_all_dataService{

	protected Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	/**
	 * 保存SKU总的购物车统计
	 * @param list
	 * @throws Exception
	 */
	public void saveCart(List<Op_sku_all_data> list,String ym)throws Exception {
		int size = list.size();
        List<Op_sku_all_data> insertList = new ArrayList<Op_sku_all_data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(list.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("op_sku_all_dataMapper.saveCart", map);
                insertList.clear();;
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("op_sku_all_dataMapper.saveCart", map);
        }
	}
	

	
	/**
	 * 统计关注SKU
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiFollowSKU(int beforeDay){
		logger.info("【开始】执行统计SKU总的统计关注任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_all_data> list = new ArrayList<Op_sku_all_data>();
				String dataKey = String.format(Const.STATISTICS_FOLLOW_ALL_SKU_TOSAVE,type);
				logger.info("-------key-------" + dataKey);
				long count = RedisTool.zcard(dataKey);
				logger.info("--------------" + count);
				int times = (int) count / Constants.RECORD_COUNT;
				long remainder = count % Constants.RECORD_COUNT;
				long start = 0;
				long end = 0;
				int flag = 0;
				if (remainder > 0) {
					flag = 1;
				}
				flag += times;
				for (int j = 0; j < flag; j++) {
					start = (j * Constants.RECORD_COUNT);
					end = (start + Constants.RECORD_COUNT - 1);
					Set<Tuple> adDataList = RedisTool.zrangeWithScores(dataKey, start, end);
					for (Tuple tuple : adDataList) {
						String keys = tuple.getElement();
						logger.info("-------keys-------" + keys);
						int score = (int) tuple.getScore();
						if (keys != null) {
							String[] key = keys.split("\\|");
							Op_sku_all_data data = new Op_sku_all_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(now));
							data.setType(Integer.parseInt(type));
							data.setSku(Integer.parseInt(key[1]));
							data.setProductid(Integer.parseInt(key[2]));
							data.setFollow(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {
							int size = list.size();
					        List<Op_sku_all_data> insertList = new ArrayList<Op_sku_all_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_all_dataMapper.saveFollowSKU", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_all_dataMapper.saveFollowSKU", map);
					        }
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		logger.info("【结束】执行统计SKU总的统计关注任务");
	}
}
