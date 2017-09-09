package com.shifeng.service.visit;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.shifeng.entity.visit.Visit;

@Service("visitService")
public interface VisitService {
	
	/**
	 * 访问
	 * @return
	 */
	void req(Map<String, String> map,Visit visit) throws Exception;
}
