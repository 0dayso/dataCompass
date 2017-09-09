package com.shifeng.sell.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.productDetail.SearchProductDetailDTO;
import com.shifeng.sell.dto.productDetail.ShowProductDetailDTO;

@Service("productDetailService")
public interface ProductDetailService {
	
	List<ShowProductDetailDTO> show(Page<SearchProductDetailDTO> page)throws Exception;

}
