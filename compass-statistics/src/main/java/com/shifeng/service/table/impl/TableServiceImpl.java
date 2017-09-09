package com.shifeng.service.table.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.service.table.TableService;

@Service("tableService")
public class TableServiceImpl implements TableService{

	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	
	/**
	 * 检查访问明细月表是否存在
	 * @param nowYearMonth
	 * @return
	 */
	public int checkVisitMonthTableIsExist(String nowYearMonth) {
		try {
			return (int)dao.findForObject("TableMapper.checkVisitMonthTableIsExist", nowYearMonth);
		} catch (Exception e) {
			logger.error(e);
			return 0;
		}
	}

	/**
	 * 创建访问明细月表
	 * @param nowYearMonth
	 */
	public void createVisitMonthTable(String nowYearMonth) {
		try {
			logger.info("***********nowYearMonth:"+nowYearMonth);
			dao.update("TableMapper.createVisitMonthTable", nowYearMonth);
		} catch (Exception e) {
			logger.error(e);
		}
	}
	
	/**
	 * 检查注册明细月表是否存在
	 * @param nowYearMonth
	 * @return
	 */
	public int checkRegisterMonthTableIsExist(String nowYearMonth) {
		return 0;
	}

	/**
	 * 创建注册明细月表
	 * @param nowYearMonth
	 */
	public void createRegisterMonthTable(String nowYearMonth) {
	}

	
	/**
	 * 检查购买明细月表是否存在
	 * @param nowYearMonth
	 * @return
	 */
	public int checkPurchaseMonthTableIsExist(String nowYearMonth) {
		return 0;
	}

	/**
	 * 创建购买明细月表
	 * @param nowYearMonth
	 */
	public void createPurchaseMonthTable(String nowYearMonth) {
	}

	
	/**
	 * 检查关键词搜索明细月表是否存在
	 * @param nowYearMonth
	 * @return
	 */
	public int checkKeywordMonthTableIsExist(String nowYearMonth) {
		return 0;
	}

	/**
	 * 创建关键词搜索明细月表
	 * @param nowYearMonth
	 */
	public void createKeywordMonthTable(String nowYearMonth) {
	}
	
}
