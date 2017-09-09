package com.shifeng.service.search.impl;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.shifeng.entity.search.Search;
import com.shifeng.service.search.SearchService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;

/**
 * 搜索记录服务
 * @author Yan
 *
 */
@Service("searchServiceImpl")
public class SearchServiceImpl implements SearchService {

	Logger logger = Logger.getLogger(this.getClass());
	
	/**
	 * 记录搜索信息
	 */
	@Override
	public void s(Search s, Map<String, String> map) throws Exception {
		String val = JSONObject.fromObject(s).toString();
		RedisTool.lpush(Const.STORM_AD_SEARCH_DATA, val);
		
		logger.info("保存搜索记录,info:"+val);
		map.put(Const.REQ_CODE, "0");
	}

}
