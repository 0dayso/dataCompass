package com.shifeng.sell.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.productDetail.SearchProductDetailDTO;
import com.shifeng.sell.dto.productDetail.ShowProductDetailDTO;
import com.shifeng.sell.service.ProductDetailService;

@Service("productDetailServiceImpl")
public class ProductDetailServiceImpl implements ProductDetailService {
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	@Override
	public List<ShowProductDetailDTO> show(Page<SearchProductDetailDTO> page)throws Exception {
		List<ShowProductDetailDTO> list = (List<ShowProductDetailDTO>) dao.findForList("sellProductDetailMapper.selectProductIdsPage", page);
		return list;
	}

}
