package com.shifeng.service.dimension;

import java.util.List;

import com.shifeng.entity.dimension.Op_user_data;
/** 
 * 用户统计表(op_user_data)接口
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 15:28:20 
 */  
public interface Op_user_dataService {

	/**
	 * 保存用户购物车统计信息
	 * @param list
	 * @throws Exception
	 */
	void saveCart(List<Op_user_data> list,String ym)throws Exception;
	
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

	
}
