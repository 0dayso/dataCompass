package com.shifeng.service.table;

public interface TableService {
	
	/**
	 * 检查访问明细月表是否存在
	 * @param nowYearMonth
	 * @return
	 */
	int checkVisitMonthTableIsExist(String nowYearMonth);

	/**
	 * 创建访问明细月表
	 * @param nowYearMonth
	 */
	void createVisitMonthTable(String nowYearMonth);
	
	/**
	 * 检查注册明细月表是否存在
	 * @param nowYearMonth
	 * @return
	 */
	int checkRegisterMonthTableIsExist(String nowYearMonth);

	/**
	 * 创建注册明细月表
	 * @param nowYearMonth
	 */
	void createRegisterMonthTable(String nowYearMonth);

	
	/**
	 * 检查购买明细月表是否存在
	 * @param nowYearMonth
	 * @return
	 */
	int checkPurchaseMonthTableIsExist(String nowYearMonth);

	/**
	 * 创建购买明细月表
	 * @param nowYearMonth
	 */
	void createPurchaseMonthTable(String nowYearMonth);

	
	/**
	 * 检查关键词搜索明细月表是否存在
	 * @param nowYearMonth
	 * @return
	 */
	int checkKeywordMonthTableIsExist(String nowYearMonth);

	/**
	 * 创建关键词搜索明细月表
	 * @param nowYearMonth
	 */
	void createKeywordMonthTable(String nowYearMonth);
	
}
