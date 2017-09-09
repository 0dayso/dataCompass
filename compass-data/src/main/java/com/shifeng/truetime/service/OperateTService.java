package com.shifeng.truetime.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service("operateTService")
public interface OperateTService {
	/**
	 *  订单单量（实时经营状况）
	 * @param map
	 * @throws Exception
	 */
	void findOrderNum(Map<String,Object> map,String type)throws Exception;
	
	/**
	 *  订单金额（实时经营状况）
	 * @param map
	 * @throws Exception
	 */
	void findOrderAmount(Map<String,Object> map,String type)throws Exception;
	
	/**
	 *  商品件数（实时经营状况）
	 * @param map
	 * @throws Exception
	 */
	void findPurchaseNum(Map<String,Object> map,String type)throws Exception;
	
}
