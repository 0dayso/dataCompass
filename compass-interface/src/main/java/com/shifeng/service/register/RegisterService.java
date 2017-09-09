package com.shifeng.service.register;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.shifeng.entity.register.Register;

/**
 * 注册接口服务
 * @author Yan
 *
 */
@Service("registerService")
public interface RegisterService {

	/**
	 * 注册
	 * @param map
	 * @param r
	 */
	void reg(Map<String,String> map,Register r) throws Exception;
}
