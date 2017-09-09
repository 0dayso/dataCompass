package com.shifeng.service.statistics.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.dto.statistics.StatisticsFlow;
import com.shifeng.dto.statistics.StatisticsFlowSearch;
import com.shifeng.entity.statistics.Op_visit_detail;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_visit_detailService;
import com.shifeng.util.DateUtil; 

/** 
 * 访问明细(op_visit_detail)接口实现类
 * @author sen
 * @op_visit_detail Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
@Service("op_visit_detailServiceImpl")
public class Op_visit_detailServiceImpl implements Op_visit_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有访问明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_visit_detail> findAllop_visit_detail(Page<SearchData> page) throws Exception{
		if(StringUtils.isEmpty(page.getT().getStartDate())){
			if(StringUtils.isEmpty(page.getT().getEndDate())){
				page.getT().setTableName(DateUtil.getYM(new Date()));
			}else{
				page.getT().setTableName(DateUtil.getYM(page.getT().getEndDate()));
			}
		}else{
			page.getT().setTableName(DateUtil.getYM(page.getT().getStartDate()));
		}
		
		return (List<Op_visit_detail>) dao.findForList("op_visit_detailMapper.findAllop_visit_detailPage", page);
	}
	
}
