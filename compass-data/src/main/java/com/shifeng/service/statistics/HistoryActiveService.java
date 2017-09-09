package com.shifeng.service.statistics;

import java.util.List;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.HistoryActive;

public interface HistoryActiveService {
	/**
	 * 商城历史活动统计
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<HistoryActive> findAllActiveData(SearchData searchData) throws Exception;
}
