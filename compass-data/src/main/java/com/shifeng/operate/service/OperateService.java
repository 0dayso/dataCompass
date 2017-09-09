package com.shifeng.operate.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shifeng.operate.dto.OperateTableDTO;

/**
 * 经营概况
 * @author sen
 *
 */
@Service("operateService")
public interface OperateService {
	
	/**
	 * 经营概况流量信息
	 */
	public List<OperateTableDTO> findOperateTable(String date,String type) throws Exception;
}
