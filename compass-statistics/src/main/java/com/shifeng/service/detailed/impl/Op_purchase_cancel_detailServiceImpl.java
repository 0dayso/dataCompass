package com.shifeng.service.detailed.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.detailed.Op_purchase_cancel_detail;
import com.shifeng.service.detailed.Op_purchase_cancel_detailService;
import com.shifeng.util.DateUtil; 

/** 
 * 订单取消明细(op_purchase_cancel_detail)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 13:27:39 
 */  
@Service("op_purchase_cancel_detailServiceImpl")
public class Op_purchase_cancel_detailServiceImpl implements Op_purchase_cancel_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;


	/**
	 * 保存订单取消明细
	 * @param detailList
	 * @throws Exception
	 */
	public void saveCancelDetail(List<Op_purchase_cancel_detail> detailList)throws Exception {
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = DateUtil.getNowYearMonth();
    	map.put("nowYearMonth", nowYearMonth);
    	map.put("detailList", detailList);
		dao.save("op_purchase_cancel_detailMapper.saveCancelDetail", map);
	}
	
}
