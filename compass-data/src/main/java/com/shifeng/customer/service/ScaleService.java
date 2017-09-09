package com.shifeng.customer.service;

import java.util.List;

import com.shifeng.customer.dto.ScaleDTO;
import com.shifeng.customer.entity.UserScale;

public interface ScaleService {

	/**
	 * 获取用户规模列表
	 * @param scale
	 * @return
	 */
	List<UserScale> getUserScaleList(ScaleDTO scale);

}
