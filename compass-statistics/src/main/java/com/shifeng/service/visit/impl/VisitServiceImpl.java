package com.shifeng.service.visit.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.register.Register;
import com.shifeng.entity.visit.Visit;
import com.shifeng.service.visit.VisitService;
import com.shifeng.util.DateUtil;
@Service("visitService")
public class VisitServiceImpl implements VisitService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	
	/**
	 * 保存访问信息
	 * @param visit
	 * @throws Exception
	 */
	public void saveVisit(Visit visit)throws Exception {
		dao.save("VisitMapper.saveVisit", visit);
	}
	
	/**
	 * 保存访问信息
	 * @param visit
	 * @throws Exception
	 */
	public void saveVisit(List<Visit> visitList)throws Exception {
		System.out.println("保存访问信息*****************");
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = DateUtil.getNowYearMonth();
    	map.put("nowYearMonth", nowYearMonth);
    	map.put("visitList", visitList);
		dao.save("VisitMapper.saveVisitList", map);
	}


	@Override
	public Visit getObject() {
		try {
			return (Visit)dao.findForObject("VisitMapper.getObject");
		} catch (Exception e) {
			return null;
		}
	}


	@Override
	public void update(Visit visit) {
		 try {
			dao.update("VisitMapper.update", visit);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
