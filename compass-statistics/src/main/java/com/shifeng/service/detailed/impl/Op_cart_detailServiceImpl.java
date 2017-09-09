package com.shifeng.service.detailed.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.detailed.Op_cart_detail;
import com.shifeng.service.detailed.Op_cart_detailService;
import com.shifeng.util.DateUtil; 

/** 
 * 购物车(op_cart_detail)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:35:31 
 */  
@Service("op_cart_detailServiceImpl")
public class Op_cart_detailServiceImpl implements Op_cart_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	/**
	 * 保存购物车明细
	 * @param detailList
	 * @throws Exception
	 */
	public void saveDetail(List<Op_cart_detail> detailList)throws Exception {
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = DateUtil.getNowYearMonth();
    	map.put("nowYearMonth", nowYearMonth);
    	map.put("detailList", detailList);
		dao.save("op_cart_detailMapper.saveDetail", map);
	}

	
}
