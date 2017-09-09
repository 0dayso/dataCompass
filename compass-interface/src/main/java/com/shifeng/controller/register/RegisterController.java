package com.shifeng.controller.register;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import com.shifeng.ip.IPSeeker;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shifeng.entity.register.Register;
import com.shifeng.service.register.RegisterService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/**
 * 注册控制器
 * 
 * @author Yan
 *
 */
@Controller
@RequestMapping(value = "/register")
public class RegisterController {

	@Resource(name = "registerServiceImpl")
	RegisterService registerServiceImpl;

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 注册
	 * 
	 * @param r
	 */
	@RequestMapping(value = "/reg")
	@ResponseBody
	public Map<String, String> reg(Register r) {
		Map<String, String> map = new HashMap<String, String>();
		// [1]数据校验
		map.put(Const.REQ_CODE, "500");
		if (r.getUserid() == null) {
			map.put(Const.REQ_MSG, "用户ID不能为空");
			return map;
		}

		if (StringUtils.isEmpty(r.getIp())) {
			map.put(Const.REQ_MSG, "用户IP不能为空");
			return map;
		}

		if (StringUtils.isEmpty(r.getRegistertime()) || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(r.getRegistertime())) {
			map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
			return map;
		}

		if (r.getType() == null) {
			map.put(Const.REQ_MSG, "站点来源不能为空");
			return map;
		}
		String county = IPSeeker.I.getAddress(r.getIp());
		r.setCounty(county);
		// [2]添加数据
		try {
			registerServiceImpl.reg(map, r);
		} catch (Exception e) {
			logger.error("新增[注册]接口异常；异常信息：" + e.toString());
		}
		return map;
	}

}
