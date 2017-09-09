package com.shifeng.customer.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.shifeng.customer.dto.BuyUserTendencyResultPageDTO;
import com.shifeng.customer.dto.SearchBuyUserTendencyDTO;
import com.shifeng.plugin.page.Page;

/**
 * 卖家分析服务
 * @author Yan
 *
 */
@Service("buyUserTendencyService")
public interface BuyUserTendencyService {

	/**
	 * 买家分析(初始加载)
	 * @param p
	 * @return
	 * @throws Exception 
	 */
	Map<String, Object> show(Page<SearchBuyUserTendencyDTO> p) throws Exception;

	/**
	 * 买家分析
	 * @param p
	 * @return
	 * @throws Exception 
	 */
	List<BuyUserTendencyResultPageDTO> showPage(Page<SearchBuyUserTendencyDTO> p) throws Exception;
	
}
