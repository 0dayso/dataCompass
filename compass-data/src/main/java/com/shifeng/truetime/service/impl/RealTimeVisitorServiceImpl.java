package com.shifeng.truetime.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.plugin.page.Page;
import com.shifeng.truetime.dto.realTimeVisitor.RealTimeVisitorResultDTO;
import com.shifeng.truetime.dto.realTimeVisitor.SearchRealTimeVisitorDTO;
import com.shifeng.truetime.service.RealTimeVisitorService;

/**
 * 实时访客服务接口实现类
 * @author Yan
 *
 */
@Service("realTimeVisitorServiceImpl")
public class RealTimeVisitorServiceImpl implements RealTimeVisitorService {
	
	
	@Resource(name="baseDaoImpl")
	BaseDao dao;
	
	/**
	 * 展示实时访客
	 */
	@Override
	public List<RealTimeVisitorResultDTO> show(Page<SearchRealTimeVisitorDTO> p)throws Exception {
		List<RealTimeVisitorResultDTO> list = (List<RealTimeVisitorResultDTO>) dao.findForList("realTimeVisitorMapper.currentTimeVisitUserPage",p);
		return list;
	}

}
