package com.shifeng.controller.visit;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import com.shifeng.ip.IPSeeker;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shifeng.entity.visit.Visit;
import com.shifeng.service.visit.VisitService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/**
 * 访问接口
 * 
 * @author Yan
 * @CrossOrigin(origins = "*",maxAge = 3600)
 */

@Controller
@RequestMapping(value = "/visit")
public class VisitController {

	@Resource(name = "visitServiceImpl")
	VisitService visitServiceImpl;

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 访问
	 * 
	 * @return
	 */
	@RequestMapping(value = "req", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> req(Visit visit) {
		// [1]定义返回对象，默认为失败
		Map<String, String> map = new HashMap<String, String>();
		map.put(Const.REQ_CODE, 500 + "");

		// [2]check
		if (StringUtils.isEmpty(visit.getIp())) {
			map.put(Const.REQ_MSG, "ip不能为空");
			return map;
		}
		if (StringUtils.isEmpty(visit.getUrl())) {
			map.put(Const.REQ_MSG, "URL不能为空");
			return map;
		}
		if (StringUtils.isEmpty(visit.getVisittime())
				|| !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(visit.getVisittime())) {
			map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
			return map;
		}
		if (visit.getType() == null) {
			map.put(Const.REQ_MSG, "站点来源不能为空");
			return map;
		}

		if (visit.getShopId() == null) {
			map.put(Const.REQ_MSG, "店铺ID不能为空");
			return map;
		}
		String county = IPSeeker.I.getAddress(visit.getIp());
		visit.setCounty(county);
		// [3]操作缓存
		try {
			visitServiceImpl.req(map, visit);
		} catch (Exception e) {
			logger.error("新增[访问]接口异常；异常信息：" + e.toString());
		}

		return map;
	}

}
