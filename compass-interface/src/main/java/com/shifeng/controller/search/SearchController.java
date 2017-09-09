package com.shifeng.controller.search;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import com.shifeng.ip.IPSeeker;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shifeng.entity.search.Search;
import com.shifeng.service.search.SearchService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/**
 * 搜索信息控制器
 * 
 * @author Yan
 *
 */
@Controller
@RequestMapping(value = "/search")
public class SearchController {
	
	@Resource(name="searchServiceImpl")
	SearchService searchServiceImpl;

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 记录搜索历史
	 * 
	 * @param s
	 * @return
	 */
	@RequestMapping(value = "/s", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> s(HttpServletResponse response, Search s) {
		Map<String, String> map = new HashMap<String, String>();

		map.put(Const.REQ_CODE, "500");

		if (StringUtils.isEmpty(s.getIp())) {
			map.put(Const.REQ_MSG, "用户IP不能为空");
			return map;
		}
		
		if(StringUtils.isEmpty(s.getKeyword())){
			map.put(Const.REQ_MSG, "搜索关键词不能为空");
			return map;
		}
		
		if(StringUtils.isEmpty(s.getStatistics_time()) 
				|| !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(s.getStatistics_time())) {
			map.put(Const.REQ_MSG, "请传入正确格式的数据");
			return map;
		}

		if (s.getType() == null) {
			map.put(Const.REQ_MSG, "站点来源不能为空");
			return map;
		}

		if (s.getShopId() == null) {
			map.put(Const.REQ_MSG, "店铺ID不能为空");
			return map;
		}
		String county = IPSeeker.I.getAddress(s.getIp());
		s.setCounty(county);
		try {
			searchServiceImpl.s(s, map);
		} catch (Exception e) {
			logger.error("新增[搜索记录]接口异常；异常信息：" + e.toString());
		}
		//response.setHeader("Access-Control-Allow-Origin","http://seebong.com");
		return map;
	}

}
