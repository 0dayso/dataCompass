package com.shifeng.service.visit;

import java.util.List;

import com.shifeng.entity.visit.Visit;

public interface VisitService {

	/**
	 * 保存访问信息
	 * @param visit
	 * @throws Exception
	 */
	void saveVisit(Visit visit)throws Exception;

	/**
	 * 保存访问信息
	 * @param visit
	 * @throws Exception
	 */
	void saveVisit(List<Visit> visitList)throws Exception;
	
	Visit getObject();
	void update(Visit visit);
}
