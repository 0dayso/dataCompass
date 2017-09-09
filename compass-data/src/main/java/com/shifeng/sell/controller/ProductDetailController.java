package com.shifeng.sell.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.productDetail.SearchProductDetailDTO;
import com.shifeng.sell.dto.productDetail.ShowProductDetailDTO;
import com.shifeng.sell.service.ProductDetailService;

/**
 * 商品销售明细
 * @author Yan
 *
 */
@Controller
@RequestMapping(value="/product_sell_detail_controller")
public class ProductDetailController {

	@Resource(name="productDetailServiceImpl")
	ProductDetailService productDetailServiceImpl;
	
	Logger log = Logger.getLogger(this.getClass());
	
	/**
	 * 展示商品销售明细
	 * @param mv
	 * @param page
	 * @param s
	 * @return
	 */
	@RequestMapping(value="/show")
	public ModelAndView show(ModelAndView mv,Page<SearchProductDetailDTO> page,SearchProductDetailDTO s) {
		page.setT(s);
		try {
			List<ShowProductDetailDTO> list = productDetailServiceImpl.show(page);
			mv.addObject("list", list);
			mv.addObject("p", page);
		} catch (Exception e) {
			log.error("展示商品销售明细异常，异常信息:"+e.toString());
		}
		mv.addObject("s", s);
		mv.setViewName("sell/productDetail/show_product_sell_detail_view");
		return mv;
	}
	
	
}
