package com.shifeng.sell.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.sell.dto.SalesDTO;
import com.shifeng.sell.entity.sales.SalesAnalysis;
import com.shifeng.sell.service.SalesService;

@Service("salesServiceImpl")
public class SalesServiceImpl implements SalesService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	


	/**
	 * 获取销量分析数据
	 * @param sales
	 * @return
	 */
	public SalesAnalysis getAnalysis(SalesDTO sales) {
		try {
			SalesAnalysis order = (SalesAnalysis)dao.findForObject("salesAnalysisMapper.getOrderAnalysis", sales);
			SalesAnalysis visit = (SalesAnalysis)dao.findForObject("salesAnalysisMapper.getVisitAnalysis", sales);
			
			if(visit==null){
				visit = new SalesAnalysis();
			}
			order.setCookie_number(visit.getCookie_number());
			order.setVisit_number(visit.getVisit_number());
			return order;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

}
