package com.shifeng.service.statistics.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_register_detail;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.statistics.Op_register_detailService;
import com.shifeng.util.DateUtil; 

/** 
 * 注册明细(op_register_detail)接口实现类
 * @author sen
 * @op_register_detail Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
@Service("op_register_detailServiceImpl")
public class Op_register_detailServiceImpl implements Op_register_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有注册明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_register_detail> findAllop_register_detail(Page<SearchData> page) throws Exception{
		if(StringUtils.isEmpty(page.getT().getStartDate())){
			if(StringUtils.isEmpty(page.getT().getEndDate())){
				page.getT().setTableName(DateUtil.getYM(new Date()));
			}else{
				page.getT().setTableName(DateUtil.getYM(page.getT().getEndDate()));
			}
		}else{
			page.getT().setTableName(DateUtil.getYM(page.getT().getStartDate()));
		}
		
		return (List<Op_register_detail>) dao.findForList("op_register_detailMapper.findAllop_register_detailPage", page);
	}
	
	
}
