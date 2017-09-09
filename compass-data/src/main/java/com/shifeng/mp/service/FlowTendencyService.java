package com.shifeng.mp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shifeng.mp.dto.SearchFlowTendencyDTO;
import com.shifeng.pc.dto.day_hour_flow.ShowDayFlow;

@Service("flowTendencyService")
public interface FlowTendencyService {

	// 按小时分析
	List<ShowDayFlow> getPcFlowHourDatas(SearchFlowTendencyDTO s)throws Exception;
}
