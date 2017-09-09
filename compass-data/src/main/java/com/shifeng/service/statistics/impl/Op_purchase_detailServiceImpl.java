package com.shifeng.service.statistics.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.paystatus.Paystatus;
import com.shifeng.entity.statistics.Op_purchase_detail;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.OrderDetailDTO;
import com.shifeng.service.statistics.Op_purchase_detailService;
import com.shifeng.util.DateUtil; 

/** 
 * 购买明细(op_purchase_detail)接口实现类
 * @author sen
 * @op_purchase_detail Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
@Service("op_purchase_detailServiceImpl")
public class Op_purchase_detailServiceImpl implements Op_purchase_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有购买明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_purchase_detail> findAllop_purchase_detail(Page<SearchData> page) throws Exception{
		if(StringUtils.isEmpty(page.getT().getStartDate())){
			if(StringUtils.isEmpty(page.getT().getEndDate())){
				page.getT().setTableName(DateUtil.getYM(new Date()));
			}else{
				page.getT().setTableName(DateUtil.getYM(page.getT().getEndDate()));
			}
		}else{
			page.getT().setTableName(DateUtil.getYM(page.getT().getStartDate()));
		}
		return (List<Op_purchase_detail>) dao.findForList("op_purchase_detailMapper.findAllop_purchase_detailPage", page);
	}
	
	/**
	 * 所有支付状态
	 * @return
	 * @throws Exception
	 */
	public List<Paystatus> findAllPayStatus() throws Exception{
		return (List<Paystatus>) dao.findForList("op_purchase_detailMapper.findAllPayStatus");
	}
	
	/**
	 * 查询订单明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<OrderDetailDTO> findOrderDetail(Page<SearchData> page) throws Exception{
		if(StringUtils.isEmpty(page.getT().getStartDate())){
			if(StringUtils.isEmpty(page.getT().getEndDate())){
				page.getT().setTableName(DateUtil.getYM(new Date()));
			}else{
				page.getT().setTableName(DateUtil.getYM(page.getT().getEndDate()));
			}
		}else{
			page.getT().setTableName(DateUtil.getYM(page.getT().getStartDate()));
		}
		
		return (List<OrderDetailDTO>) dao.findForList("op_purchase_detailMapper.findOrderDetailPage", page);
	}
	
	
}
