package com.shifeng.service.keyword.impl;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.keyword.KeywordDTO;
import com.shifeng.entity.keyword.KeywordDetail;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.keyword.KeywordDetailService;

/** 
 * 关键词搜索记录明细(op_keyword_detail)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-14 11:10:55 
 */  
@Service("keywordDetailService")
public class KeywordDetailServiceImpl implements KeywordDetailService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	


	/**
	 * 获取关键词明细记录
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<KeywordDetail> getKeywordDetail(Page<KeywordDTO> page)throws Exception {
		return (List<KeywordDetail>)dao.findForList("KeywordDetailMapper.getKeywordDetailListPage", page);
	}
 
	
}
