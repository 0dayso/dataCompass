package com.shifeng.service.dimension;

import java.util.List;

import com.shifeng.entity.dimension.Op_county_data;
/** 
 * 地区统计表(op_county_data)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 15:28:20 
 */  
public interface Op_county_dataService {

	/**
	 * 保存地区购物车统计数据
	 * @param list
	 * @throws Exception
	 */
	void saveCart(List<Op_county_data> list,String ym)throws Exception;
	
	/**
	 * 统计用户关注SKU
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiFollowSKU(int beforeDay);

	
	/**
	 * 统计用户关注Shop
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiFollowShop(int beforeDay);

	
	/**
	 * 统计用户访问量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiVisitnum(int beforeDay);

	
	/**
	 * 统计用户Cookie
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiCookie(int beforeDay);

	
	/**
	 * 统计用户购买数量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiPurchaseNum(int beforeDay);

	
	/**
	 * 统计用户购买金额
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiAmount(int beforeDay);

	
	/**
	 * 统计用户支付金额
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiPayAmount(int beforeDay);


	/**
	 * 统计取消退换货
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiQuXiaoTuiHuanHuo(int beforeDay);


	/**
	 * 统计订单支付数量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiPayOrderNum(int beforeDay);


	/**
	 * 统计访客数
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiUv(int beforeDay);


	/**
	 * 统计访问用户数
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiVisitUserNum(int beforeDay);
    

	
}
