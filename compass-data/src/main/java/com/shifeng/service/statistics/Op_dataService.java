package com.shifeng.service.statistics;

import java.util.List;
import java.util.Map;

import org.springframework.web.servlet.ModelAndView;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.dto.statistics.StatisticsFlow;
import com.shifeng.dto.statistics.StatisticsFlowSearch;
import com.shifeng.entity.statistics.Op_data;
/** 
 * 统计表(op_data)接口
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public interface Op_dataService {

    /**
	 * 查询所有统计表
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Op_data> findAllop_data(SearchData searchData) throws Exception;
	
	/**
	 * 统计经营概况
	 */
	public Op_data findOperate(String date,String type) throws Exception;
	
	/**
	 * 统计实时经营概况
	 */
	public void findOperateT(ModelAndView mv,String type) throws Exception;
	
	/**
	 *  按小时分析（实时经营状况）
	 * @param map
	 * @throws Exception
	 */
	void getOperateHourDatas(Map<String,Object> map,String date,String day,String type)throws Exception;
	
}
