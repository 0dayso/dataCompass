package com.shifeng.job;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.shifeng.entity.dimension.Op_county_data;
import com.shifeng.entity.dimension.Op_sku_all_data;
import com.shifeng.entity.dimension.Op_sku_data;
import com.shifeng.entity.dimension.Op_user_data;
import com.shifeng.service.dimension.Op_county_dataService;
import com.shifeng.service.dimension.Op_sku_all_dataService;
import com.shifeng.service.dimension.Op_sku_dataService;
import com.shifeng.service.dimension.Op_user_dataService;
import com.shifeng.util.Const;
import com.shifeng.util.Constants;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import redis.clients.jedis.Tuple;

/**
 * 多维度数据统计任务
 * 
 * @author WinZhong
 *
 */
public class DimensionJob {

	protected Logger logger = Logger.getLogger(this.getClass());
	
	/**几天前，默认当天6*/
	private int beforeDay = 0;
	
	private String now = DateUtil.getYYYY_MM_DD();
	
	/**年月*/
	private String ym = DateUtil.getYM(now);

	@Resource(name = "op_user_dataServiceImpl")
	private Op_user_dataService op_user_dataService;

	@Resource(name = "op_county_dataServiceImpl")
	private Op_county_dataService op_county_dataService;

	@Resource(name = "op_sku_dataServiceImpl")
	private Op_sku_dataService op_sku_dataService;

	@Resource(name = "op_sku_all_dataServiceImpl")
	private Op_sku_all_dataService op_sku_all_dataService;

	/**
	 * 执行统计任务
	 */
	public void execute() {
		logger.info("===【开始】执行统计任务===");

		now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
		ym = DateUtil.getYM(now);
		logger.info("日期:"+now+"     年月："+ym);
		
		tongJiUserCart();
		tongJiCountyCart();
		tongJiSKUCart();
		tongJiSKUAllCart();
		tongJiSKUAllCart();
		
		op_sku_all_dataService.tongJiFollowSKU(beforeDay);
		
		op_user_dataService.tongJiAmount(beforeDay);
		op_user_dataService.tongJiCookie(beforeDay);
		op_user_dataService.tongJiFollowShop(beforeDay);
		op_user_dataService.tongJiFollowSKU(beforeDay);
		op_user_dataService.tongJiPayAmount(beforeDay);
		op_user_dataService.tongJiPurchaseNum(beforeDay);
		op_user_dataService.tongJiVisitnum(beforeDay);
		op_user_dataService.tongJiQuXiaoTuiHuanHuo(beforeDay);
		op_user_dataService.tongJiPayOrderNum(beforeDay);
		

		op_county_dataService.tongJiAmount(beforeDay);
		op_county_dataService.tongJiCookie(beforeDay);
		op_county_dataService.tongJiFollowShop(beforeDay);
		op_county_dataService.tongJiFollowSKU(beforeDay);
		op_county_dataService.tongJiPayAmount(beforeDay);
		op_county_dataService.tongJiPurchaseNum(beforeDay);
		op_county_dataService.tongJiVisitnum(beforeDay);
		op_county_dataService.tongJiQuXiaoTuiHuanHuo(beforeDay);
		op_county_dataService.tongJiPayOrderNum(beforeDay);
		op_county_dataService.tongJiUv(beforeDay);
		op_county_dataService.tongJiVisitUserNum(beforeDay);
		

		op_sku_dataService.tongJiAmount(beforeDay);
		op_sku_dataService.tongJiCookie(beforeDay);
		op_sku_dataService.tongJiFollowSKU(beforeDay);
		op_sku_dataService.tongJiPayAmount(beforeDay);
		op_sku_dataService.tongJiPurchaseNum(beforeDay);
		op_sku_dataService.tongJiVisitnum(beforeDay);
		op_sku_dataService.tongJiQuXiaoTuiHuanHuo(beforeDay);
		op_sku_dataService.tongJiPayOrderNum(beforeDay);
		op_sku_dataService.tongJiUv(beforeDay);
		op_sku_dataService.tongJiVisitUserNum(beforeDay);
		
		
		logger.info("===【结束】执行统计任务===");
	}

	/**
	 * 统计用户购物车
	 */
	private void tongJiUserCart() {
		logger.info("【开始】执行统计用户购物车任务");
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_user_data> list = new ArrayList<Op_user_data>();
			String dataKey = String.format(Const.STATISTICS_FOLLOW_CART_USERID_TOSAVE, now, type);
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
						data.setCart(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						op_user_dataService.saveCart(list,ym);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计用户购物车任务");
	}

	/**
	 * 统计地区购物车
	 */
	private void tongJiCountyCart() {
		logger.info("【开始】执行统计地区购物车任务");
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
		for (String type : types) {
			List<Op_county_data> list = new ArrayList<Op_county_data>();
			String dataKey = String.format(Const.STATISTICS_FOLLOW_CART_COUNTY_TOSAVE, now, type);
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
						Op_county_data data = new Op_county_data();
						data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
						data.setType(Integer.parseInt(type));
						data.setCounty(key[2]);
						data.setCart(score);
						list.add(data);
					}
				}
				if (list.size() > 0) {
					try {
						op_county_dataService.saveCart(list,ym);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		logger.info("【结束】执行统计地区购物车任务");
	}

	/**
	 * 统计SKU购物车
	 */
	private void tongJiSKUCart() {
		logger.info("【开始】执行统计SKU购物车任务");
		
		List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**shops**" + shops);
		logger.info("**types**" + types);
		for (String shopId : shops) {
			for (String type : types) {
				List<Op_sku_data> list = new ArrayList<Op_sku_data>();
				String dataKey = String.format(Const.STATISTICS_FOLLOW_CART_TOSAVE, now, type, shopId);
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
							data.setCart(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {
							op_sku_dataService.saveCart(list,ym);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		logger.info("【结束】执行统计SKU购物车任务");
	}

	/**
	 * 统计总SKU购物车
	 */
	private void tongJiSKUAllCart() {
		logger.info("【开始】执行统计总SKU购物车任务");
		
		List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
		logger.info("**types**" + types);
			for (String type : types) {
				List<Op_sku_all_data> list = new ArrayList<Op_sku_all_data>();
				String dataKey = String.format(Const.STATISTICS_FOLLOW_ALL_CART_TOSAVE,type);
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
							data.setCart(score);
							list.add(data);
						}
					}
					if (list.size() > 0) {
						try {
							op_sku_all_dataService.saveCart(list,ym);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		logger.info("【结束】执行统计总SKU购物车任务");
	}

	public static void main(String[] args) {

	}

	public int getBeforeDay() {
		return beforeDay;
	}

	public void setBeforeDay(int beforeDay) {
		this.beforeDay = beforeDay;
	}

 
	
}
