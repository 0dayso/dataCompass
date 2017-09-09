package com.shifeng.service.data;

import java.util.List;

import com.shifeng.entity.data.Data;

public interface DataService {

	/**
	 * 保存访问量统计信息
	 * @param dataList
	 * @throws Exception
	 */
	void saveVisit(List<Data> dataList,String ym)throws Exception;

	/**
	 * 保存注册量统计信息
	 * @param dataList
	 * @throws Exception
	 */
	void saveRegister(List<Data> dataList,String ym)throws Exception;

	/**
	 * 保存购买数量统计信息
	 * @param dataList
	 * @throws Exception
	 */
	void savePurchase(List<Data> dataList,String ym)throws Exception;

	/**
	 * 保存购买金额统计信息
	 * @param list
	 * @throws Exception
	 */
	void saveAmount(List<Data> dataList,String ym)throws Exception;

	/**
	 * 保存购买金额合计统计信息
	 * @param dataList
	 * @throws Exception
	 */
	void savePayamount(List<Data> dataList,String ym)throws Exception;

	/**
	 * 保存统计订单数量任务
	 * @param list
	 * @throws Exception
	 */
	void saveOrdernum(List<Data> list,String ym)throws Exception;

	/**
	 * 保存统计访客数
	 * @param list
	 * @throws Exception
	 */
	void saveUv(List<Data> list,String ym)throws Exception;
	
	/**
	 * 保存访问用户数
	 * @param list
	 * @throws Exception
	 */
	void saveVisitusernum(List<Data> list,String ym)throws Exception;

	/**
	 * 保存访问Cookie
	 * @param list
	 * @throws Exception
	 */
	void saveCookie(List<Data> list,String ym)throws Exception;

	/**
	 * 保存退换货
	 * @param list
	 * @throws Exception
	 */
	void saveTuiHuanHuo(List<Data> list,String ym)throws Exception;
	


	/**
	 * 统计订单支付数量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	void tongJiPayOrderNum(int beforeDay);
	
}
