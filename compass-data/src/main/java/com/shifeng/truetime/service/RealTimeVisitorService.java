package com.shifeng.truetime.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.shifeng.plugin.page.Page;
import com.shifeng.truetime.dto.realTimeVisitor.RealTimeVisitorResultDTO;
import com.shifeng.truetime.dto.realTimeVisitor.SearchRealTimeVisitorDTO;


/**
 * 实时访客服务接口
 * @author Yan
 *
 */
@Service("realTimeVisitorService")
public interface RealTimeVisitorService {

	
	/**
	 * 展示实时访客
	 * @return
	 */
	List<RealTimeVisitorResultDTO> show(Page<SearchRealTimeVisitorDTO> p)throws Exception;
}
