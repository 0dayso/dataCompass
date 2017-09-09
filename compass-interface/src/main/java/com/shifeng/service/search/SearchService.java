package com.shifeng.service.search;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.shifeng.entity.search.Search;

/**
 * 搜索记录服务
 * @author Yan
 *
 */
@Service("searchService")
public interface SearchService {

	/**
	 * 记录搜索信息
	 * @param s
	 * @param map
	 */
	void s(Search s,Map<String,String> map) throws Exception;
}
