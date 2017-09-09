package com.shifeng.service.detailed.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.detailed.Op_follow_shop_detail;
import com.shifeng.service.detailed.Op_follow_shop_detailService;
import com.shifeng.util.DateUtil; 

/** 
 * 关注店铺明细(op_follow_shop_detail)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-30 14:23:01 
 */  
@Service("op_follow_shop_detailServiceImpl")
public class Op_follow_shop_detailServiceImpl implements Op_follow_shop_detailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 保存关注店铺明细
	 * @param detailList
	 * @throws Exception
	 */
	public void saveDetail(List<Op_follow_shop_detail> detailList)throws Exception {
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = DateUtil.getNowYearMonth();
    	map.put("nowYearMonth", nowYearMonth);
    	map.put("detailList", detailList);
		dao.save("op_follow_shop_detailMapper.saveDetail", map);
	}
	
}
