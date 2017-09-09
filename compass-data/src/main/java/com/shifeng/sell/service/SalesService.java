package com.shifeng.sell.service;

import com.shifeng.sell.dto.SalesDTO;
import com.shifeng.sell.entity.sales.SalesAnalysis;

public interface SalesService {

	/**
	 * 获取销量分析数据
	 * @param sales
	 * @return
	 */
	SalesAnalysis getAnalysis(SalesDTO sales);

 
}
