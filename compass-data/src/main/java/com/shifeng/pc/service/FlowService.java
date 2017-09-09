package com.shifeng.pc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shifeng.pc.dto.day_hour_flow.SearchDayFlow;
import com.shifeng.pc.dto.day_hour_flow.ShowDayFlow;

/**
 * 流量分析服务
 * @author Yan
 *
 */
@Service("dayFlowService")
public interface FlowService {

	// 按天分析
	List<ShowDayFlow> getPcFlowDayDatas(SearchDayFlow s)throws Exception;
	
	// 按小时分析
	List<ShowDayFlow> getPcFlowHourDatas(SearchDayFlow s)throws Exception;
}
