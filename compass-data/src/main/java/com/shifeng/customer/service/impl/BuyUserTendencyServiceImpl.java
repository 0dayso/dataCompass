package com.shifeng.customer.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.customer.dto.BuyUserTendencyEchartsResultDTO;
import com.shifeng.customer.dto.BuyUserTendencyResultPageDTO;
import com.shifeng.customer.dto.SearchBuyUserTendencyDTO;
import com.shifeng.customer.service.BuyUserTendencyService;
import com.shifeng.dao.BaseDao;
import com.shifeng.plugin.page.Page;

import net.sf.json.JSONArray;

/**
 * 买家分析服务实现类
 * @author Yan
 *
 */
@Service("buyUserTendencyServiceImpl")
public class BuyUserTendencyServiceImpl implements BuyUserTendencyService {

	@Resource(name = "baseDaoImpl")
	BaseDao dao;
	
	/**
	 * 买家分析
	 */
	@Override
	public Map<String,Object> show(Page<SearchBuyUserTendencyDTO> p) throws Exception {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("pageData", (List<BuyUserTendencyResultPageDTO>) dao.findForList("buyUserTendencyMapper.getBuyUserTendencyPage",p));
		map.put("echartsData", JSONArray.fromObject((List<BuyUserTendencyEchartsResultDTO>) dao.findForList("buyUserTendencyMapper.getBuyUserTendency",p)).toString());
		return map;
	}

	@Override
	public List<BuyUserTendencyResultPageDTO> showPage(Page<SearchBuyUserTendencyDTO> p) throws Exception {
		return (List<BuyUserTendencyResultPageDTO>) dao.findForList("buyUserTendencyMapper.getBuyUserTendencyPage",p);
	}

}
