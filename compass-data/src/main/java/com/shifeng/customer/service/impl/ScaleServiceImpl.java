package com.shifeng.customer.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.customer.dto.ScaleDTO;
import com.shifeng.customer.entity.UserScale;
import com.shifeng.customer.service.ScaleService;
import com.shifeng.dao.BaseDao;
@Service("scaleServiceImpl")
public class ScaleServiceImpl implements ScaleService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	


	/**
	 * 获取用户规模列表
	 * @param scale
	 * @return
	 */
	public List<UserScale> getUserScaleList(ScaleDTO scale) {
		try {
			return (List<UserScale>)dao.findForList("ScaleMapper.getUserScaleList", scale);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
}
