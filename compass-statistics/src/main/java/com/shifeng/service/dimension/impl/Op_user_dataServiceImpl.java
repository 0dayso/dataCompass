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
import com.shifeng.entity.dimension.Op_user_data;
import com.shifeng.entity.dimension.Op_user_data;
import com.shifeng.service.dimension.Op_user_dataService;
import com.shifeng.util.Const;
import com.shifeng.util.Constants;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import redis.clients.jedis.Tuple;

/**
 * 用户统计表(op_user_data)接口实现类
 * 
 * @author Win Zhong
 * @version Revision: 1.00 Date: 2016-11-30 15:28:20
 */
@Service("op_user_dataServiceImpl")
public class Op_user_dataServiceImpl implements Op_user_dataService {

	protected Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	/**
	 * 保存用户购物车统计信息
	 * 
	 * @param list
	 * @throws Exception
	 */
	public void saveCart(List<Op_user_data> list, String ym) throws Exception {
		int size = list.size();
		List<Op_user_data> insertList = new ArrayList<Op_user_data>();
		Map<String, Object> map = new HashMap<String, Object>();
		for (int k = 0; k < size; k++) {
			insertList.add(list.get(k));
			if (k > 0 && k % 100 == 0) {
				map.clear();
				map.put("nowYearMonth", ym);
				map.put("insertList", insertList);
				dao.save("op_user_dataMapper.saveCart", map);
				insertList.clear();
				;
			}
		}
		if (insertList.size() > 0) {
			map.clear();
			map.put("nowYearMonth", ym);
			map.put("insertList", insertList);
			dao.save("op_user_dataMapper.saveCart", map);
		}
	}

	/**
	 * 统计关注SKU
	 * 
	 * @param beforeDay
	 *            几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiFollowSKU(int beforeDay) {

		logger.info("【开始】执行统计用户关注SKU任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_FOLLOW_SKU_USERID_TOSAVE, now, type);
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
						Op_user_data data = new Op_user_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setUserid(Integer.parseInt(key[2]));
						data.setFollowsku(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						int size = list.size();
						List<Op_user_data> insertList = new ArrayList<Op_user_data>();
						Map<String, Object> map = new HashMap<String, Object>();
						for (int k = 0; k < size; k++) {
							insertList.add(list.get(k));
							if (k > 0 && k % 100 == 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.saveFollowSKU", map);
								insertList.clear();
								;
							}
						}
						if (insertList.size() > 0) {
							map.clear();
							map.put("nowYearMonth", ym);
							map.put("insertList", insertList);
							dao.save("op_user_dataMapper.saveFollowSKU", map);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户关注SKU任务");

	}

	/**
	 * 统计关注Shop
	 * 
	 * @param beforeDay
	 *            几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiFollowShop(int beforeDay) {

		logger.info("【开始】执行统计用户关注Shop任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_FOLLOW_SHOP_USERID_TOSAVE, now, type);
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
						Op_user_data data = new Op_user_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setUserid(Integer.parseInt(key[2]));
						data.setFollowshop(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						int size = list.size();
						List<Op_user_data> insertList = new ArrayList<Op_user_data>();
						Map<String, Object> map = new HashMap<String, Object>();
						for (int k = 0; k < size; k++) {
							insertList.add(list.get(k));
							if (k > 0 && k % 100 == 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.saveFollowShop", map);
								insertList.clear();
							}
						}
						if (insertList.size() > 0) {
							map.clear();
							map.put("nowYearMonth", ym);
							map.put("insertList", insertList);
							dao.save("op_user_dataMapper.saveFollowShop", map);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户关注Shop任务");
	}

	/**
	 * 统计用户访问量
	 * 
	 * @param beforeDay
	 *            几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiVisitnum(int beforeDay) {

		logger.info("【开始】执行统计用户访问量任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_VISIT_USER_AD_TOSAVE, now, type);
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
						Op_user_data data = new Op_user_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setUserid(Integer.parseInt(key[1]));
						data.setVisitnum(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						int size = list.size();
						List<Op_user_data> insertList = new ArrayList<Op_user_data>();
						Map<String, Object> map = new HashMap<String, Object>();
						for (int k = 0; k < size; k++) {
							insertList.add(list.get(k));
							if (k > 0 && k % 100 == 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.saveVisitnum", map);
								insertList.clear();
								;
							}
						}
						if (insertList.size() > 0) {
							map.clear();
							map.put("nowYearMonth", ym);
							map.put("insertList", insertList);
							dao.save("op_user_dataMapper.saveVisitnum", map);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户访问量任务");
	}

	/**
	 * 统计用户Cookie
	 * 
	 * @param beforeDay
	 *            几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiCookie(int beforeDay) {

		logger.info("【开始】执行统计用户Cookie任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_VISIT_USER_AD_COOKIE_TOSAVE, now, type);
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
						Op_user_data data = new Op_user_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setUserid(Integer.parseInt(key[1]));
						data.setCookie(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						int size = list.size();
						List<Op_user_data> insertList = new ArrayList<Op_user_data>();
						Map<String, Object> map = new HashMap<String, Object>();
						for (int k = 0; k < size; k++) {
							insertList.add(list.get(k));
							if (k > 0 && k % 100 == 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.saveCookie", map);
								insertList.clear();
								;
							}
						}
						if (insertList.size() > 0) {
							map.clear();
							map.put("nowYearMonth", ym);
							map.put("insertList", insertList);
							dao.save("op_user_dataMapper.saveCookie", map);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户Cookie任务");
	}

	/**
	 * 统计用户购买数量
	 * 
	 * @param beforeDay
	 *            几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiPurchaseNum(int beforeDay) {

		logger.info("【开始】执行统计用户购买数量任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_PURCHASE_USER_AD_TOSAVE, now, type);
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
						Op_user_data data = new Op_user_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setUserid(Integer.parseInt(key[1]));
						data.setPurchasenum(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						int size = list.size();
						List<Op_user_data> insertList = new ArrayList<Op_user_data>();
						Map<String, Object> map = new HashMap<String, Object>();
						for (int k = 0; k < size; k++) {
							insertList.add(list.get(k));
							if (k > 0 && k % 100 == 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.savePurchaseNum", map);
								insertList.clear();
								;
							}
						}
						if (insertList.size() > 0) {
							map.clear();
							map.put("nowYearMonth", ym);
							map.put("insertList", insertList);
							dao.save("op_user_dataMapper.savePurchaseNum", map);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户购买数量任务");
	}

	/**
	 * 统计用户购买金额
	 * 
	 * @param beforeDay
	 *            几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiAmount(int beforeDay) {

		logger.info("【开始】执行统计用户购买金额任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_PURCHASE_USER_AMOUNT_AD_TOSAVE, now, type);
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
						Op_user_data data = new Op_user_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setUserid(Integer.parseInt(key[1]));
						data.setAmount(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						int size = list.size();
						List<Op_user_data> insertList = new ArrayList<Op_user_data>();
						Map<String, Object> map = new HashMap<String, Object>();
						for (int k = 0; k < size; k++) {
							insertList.add(list.get(k));
							if (k > 0 && k % 100 == 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.saveAmount", map);
								insertList.clear();
								;
							}
						}
						if (insertList.size() > 0) {
							map.clear();
							map.put("nowYearMonth", ym);
							map.put("insertList", insertList);
							dao.save("op_user_dataMapper.saveAmount", map);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户购买金额任务");
	}

	/**
	 * 统计用户支付金额
	 * 
	 * @param beforeDay
	 *            几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiPayAmount(int beforeDay) {

		logger.info("【开始】执行统计用户支付金额任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_PAY_AMOUNT_USER_AD_TOSAVE, now, type);
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
						Op_user_data data = new Op_user_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setUserid(Integer.parseInt(key[1]));
						data.setPayamount(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						int size = list.size();
						List<Op_user_data> insertList = new ArrayList<Op_user_data>();
						Map<String, Object> map = new HashMap<String, Object>();
						for (int k = 0; k < size; k++) {
							insertList.add(list.get(k));
							if (k > 0 && k % 100 == 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.savePayAmount", map);
								insertList.clear();
								;
							}
						}
						if (insertList.size() > 0) {
							map.clear();
							map.put("nowYearMonth", ym);
							map.put("insertList", insertList);
							dao.save("op_user_dataMapper.savePayAmount", map);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户支付金额任务");
	}

	/**
	 * 统计取消退换货
	 * 
	 * @param beforeDay
	 *            几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiQuXiaoTuiHuanHuo(int beforeDay) {

		logger.info("【开始】执行统计用户取消退换货任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**shops**" + shops);
		logger.info("**types**" + types);
		for (String shopId : shops) {
			for (String type : types) {
				List<Op_user_data> list1 = new ArrayList<Op_user_data>();
				List<Op_user_data> list2 = new ArrayList<Op_user_data>();
				List<Op_user_data> list3 = new ArrayList<Op_user_data>();
				String dataKey = String.format(Const.STATISTICS_USERID_AD_CANCEL_ORDERID_TOSAVE, now, type, shopId);
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
							Op_user_data data = new Op_user_data();
							data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
							data.setType(Integer.parseInt(type));
							data.setUserid(Integer.parseInt(key[3]));
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
							List<Op_user_data> insertList = new ArrayList<Op_user_data>();
							Map<String, Object> map = new HashMap<String, Object>();
							for (int k = 0; k < size; k++) {
								insertList.add(list1.get(k));
								if (k > 0 && k % 100 == 0) {
									map.clear();
									map.put("nowYearMonth", ym);
									map.put("insertList", insertList);
									dao.save("op_user_dataMapper.saveQuXiaoDingDan", map);
									insertList.clear();
									;
								}
							}
							if (insertList.size() > 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.saveQuXiaoDingDan", map);
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					

					if (list2.size() > 0) {
						try {
							int size = list2.size();
							List<Op_user_data> insertList = new ArrayList<Op_user_data>();
							Map<String, Object> map = new HashMap<String, Object>();
							for (int k = 0; k < size; k++) {
								insertList.add(list2.get(k));
								if (k > 0 && k % 100 == 0) {
									map.clear();
									map.put("nowYearMonth", ym);
									map.put("insertList", insertList);
									dao.save("op_user_dataMapper.saveTuiHuo", map);
									insertList.clear();
									;
								}
							}
							if (insertList.size() > 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.saveTuiHuo", map);
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					

					if (list3.size() > 0) {
						try {
							int size = list3.size();
							List<Op_user_data> insertList = new ArrayList<Op_user_data>();
							Map<String, Object> map = new HashMap<String, Object>();
							for (int k = 0; k < size; k++) {
								insertList.add(list3.get(k));
								if (k > 0 && k % 100 == 0) {
									map.clear();
									map.put("nowYearMonth", ym);
									map.put("insertList", insertList);
									dao.save("op_user_dataMapper.saveHuanHUo", map);
									insertList.clear();
									;
								}
							}
							if (insertList.size() > 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.saveHuanHUo", map);
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		logger.info("【结束】执行统计用户取消退换货任务");
	}


	/**
	 * 统计订单支付数量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiPayOrderNum(int beforeDay) {

		logger.info("【开始】执行统计用户订单支付数量任务");
		String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		String ym = DateUtil.getYM(now);
		logger.info("日期:" + now + "     年月：" + ym);

		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_PAY_NUMBER_USER_AD_TOSAVE, now, type);
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
						Op_user_data data = new Op_user_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setUserid(Integer.parseInt(key[1]));
						data.setPayordernum(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						int size = list.size();
						List<Op_user_data> insertList = new ArrayList<Op_user_data>();
						Map<String, Object> map = new HashMap<String, Object>();
						for (int k = 0; k < size; k++) {
							insertList.add(list.get(k));
							if (k > 0 && k % 100 == 0) {
								map.clear();
								map.put("nowYearMonth", ym);
								map.put("insertList", insertList);
								dao.save("op_user_dataMapper.savePayOrderNum", map);
								insertList.clear();
								;
							}
						}
						if (insertList.size() > 0) {
							map.clear();
							map.put("nowYearMonth", ym);
							map.put("insertList", insertList);
							dao.save("op_user_dataMapper.savePayOrderNum", map);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户订单支付数量任务");
	}
 
}
