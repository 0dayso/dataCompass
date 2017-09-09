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
import com.shifeng.entity.dimension.Op_county_data;
import com.shifeng.entity.dimension.Op_sku_data;
import com.shifeng.service.dimension.Op_sku_dataService;
import com.shifeng.util.Const;
import com.shifeng.util.Constants;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import redis.clients.jedis.Tuple; 

/** 
 * sku统计表(op_sku_data)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 15:28:20 
 */  
@Service("op_sku_dataServiceImpl")
public class Op_sku_dataServiceImpl implements Op_sku_dataService{

	protected Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	/**
	 * 保存SKU购物车统计信息
	 * @param list
	 * @throws Exception
	 */
	public void saveCart(List<Op_sku_data> list,String ym)throws Exception {
		int size = list.size();
        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(list.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("op_sku_dataMapper.saveCart", map);
                insertList.clear();;
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("op_sku_dataMapper.saveCart", map);
        }
	}

	
	/**
	 * 统计关注SKU
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiFollowSKU(int beforeDay) {
		logger.info("【开始】执行统计SKU关注任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**shops**" + shops);
		logger.info("**types**" + types);
		for (String shopId : shops) {
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_FOLLOW_SKU_TOSAVE, now, type, shopId);
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
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[3]));
							data.setProductid(Integer.parseInt(key[4]));
							data.setFollow(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveFollowSKU", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveFollowSKU", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		logger.info("【结束】执行统计SKU关注任务");
	}

	
	/**
	 * 统计访问量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiVisitnum(int beforeDay) {
		logger.info("【开始】执行统计SKU访问量任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_VISIT_SKU_AD_TOSAVE, now, type);
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
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[1]));
							data.setVisitnum(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveVisitNum", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveVisitNum", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
		}
		logger.info("【结束】执行统计SKU访问量任务");
	}

	
	/**
	 * 统计Cookie
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiCookie(int beforeDay) {
		logger.info("【开始】执行统计SKU Cookie任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_VISIT_SKU_AD_COOKIE_TOSAVE, now, type);
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
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[1]));
							data.setCookie(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveCookie", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveCookie", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
		}
		logger.info("【结束】执行统计SKU Cookie任务");
	}

	
	/**
	 * 统计购买数量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiPurchaseNum(int beforeDay) {
		logger.info("【开始】执行统计SKU购买数量任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_PURCHASE_SKU_AD_TOSAVE, now, type);
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
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[1]));
							data.setPurchasenum(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.savePurchaseNum", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.savePurchaseNum", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
		}
		logger.info("【结束】执行统计SKU购买数量任务");
	}

	
	/**
	 * 统计购买金额
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiAmount(int beforeDay) {
		logger.info("【开始】执行统计SKU购买金额任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_PURCHASE_SKU_AMOUNT_AD_TOSAVE, now, type);
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
						double score = tuple.getScore();
						if (keys != null) {
							String[] key = keys.split("\\|");
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[1]));
							data.setAmount(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveAmount", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveAmount", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
		}
		logger.info("【结束】执行统计SKU购买金额任务");
	}

	
	/**
	 * 统计支付金额
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiPayAmount(int beforeDay) {
		logger.info("【开始】执行统计SKU支付金额任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_PAY_AMOUNT_SKU_AD_TOSAVE, now, type);
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
						double score = tuple.getScore();
						if (keys != null) {
							String[] key = keys.split("\\|");
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[1]));
							data.setPayamount(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.savePayAmount", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.savePayAmount", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
		}
		logger.info("【结束】执行统计SKU支付金额任务");
	}
	


	
	/**
	 * 统计取消退换货
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiQuXiaoTuiHuanHuo(int beforeDay) {

		logger.info("【开始】执行统计SKU取消退换货任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
		 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		 logger.info("**shops**"+shops);
		 logger.info("**types**"+types);   
		 for(String shopId:shops){
			for (String type : types) {
				List<Op_sku_data> list1 = new ArrayList<Op_sku_data>();
				List<Op_sku_data> list2 = new ArrayList<Op_sku_data>();
				List<Op_sku_data> list3 = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_SKU_AD_CANCEL_ORDERID_TOSAVE, now, type,shopId);
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
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[3]));
                            //订单取消
                            if("1".equals(key[4])){
                            	data.setCancelordernum(score);
                            	list1.add(data);
                            }else if("2".equals(key[4])){//退货 
                            	data.setReturnordernum(score);
                            	list2.add(data);
                            }else{// 3 换货
                            	data.setExchangeordernum(score);
                            	list3.add(data);
                            }
							
						}
					}
					if (list1.size() > 0) {
						try {
							int size = list1.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list1.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveQuXiaoDingDan", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveQuXiaoDingDan", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}

					if (list2.size() > 0) {
						try {
							int size = list2.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list2.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveTuiHuo", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveTuiHuo", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}

					if (list3.size() > 0) {
						try {
							int size = list3.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list3.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveHuanHUo", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveHuanHUo", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		logger.info("【结束】执行统计SKU取消退换货任务");
	}


	/**
	 * 统计订单支付数量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiPayOrderNum(int beforeDay) {
		logger.info("【开始】执行统计SKU订单支付数量任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_PAY_NUMBER_SKU_AD_TOSAVE, now, type);
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
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[1]));
							data.setPayordernum(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.savePayOrderNum", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.savePayOrderNum", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
		}
		logger.info("【结束】执行统计SKU订单支付数量任务");
	}


	/**
	 * 统计访客数
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiUv(int beforeDay) {
		logger.info("【开始】执行统计SKU访客数任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_VISIT_SKU_AD_IP_TOSAVE, now, type);
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
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[1]));
							data.setUv(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveUv", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveUv", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
		}
		logger.info("【结束】执行统计SKU访客数任务");
	}


	/**
	 * 统计访问用户数
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiVisitUserNum(int beforeDay) {
		logger.info("【开始】执行统计SKU访问用户数任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_VISIT_SKU_AD_USERID_TOSAVE, now, type);
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
							Op_sku_data data = new Op_sku_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setShopId(Integer.parseInt(key[2]));
							data.setSku(Integer.parseInt(key[1]));
							data.setVisitusernum(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {

							int size = list.size();
					        List<Op_sku_data> insertList = new ArrayList<Op_sku_data>();
					        Map<String,Object> map = new HashMap<String,Object>(); 
					        for (int k = 0; k < size; k++) {
					            insertList.add(list.get(k));
					            if (k > 0 && k % 100 == 0) {
					            	map.clear();
					            	map.put("nowYearMonth", ym);
					            	map.put("insertList", insertList);
					            	dao.save("op_sku_dataMapper.saveVisitUserNum", map);
					                insertList.clear();;
					            }
					        }
					        if (insertList.size() > 0) {
					        	map.clear();
					        	map.put("nowYearMonth", ym);
					        	map.put("insertList", insertList);
					        	dao.save("op_sku_dataMapper.saveVisitUserNum", map);
					        } 
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
		}
		logger.info("【结束】执行统计SKU访问用户数任务");
	}

}
