package com.shifeng.pc.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.shifeng.dto.statistics.SearchData;

/**
 * 访问来源Service
 */
@Service("sourceService")
public interface SourceService {
	/**
	 * 访客来源统计
	 */
	public Map<String,Object> uvSource(SearchData searchData) throws Exception;
	
}
