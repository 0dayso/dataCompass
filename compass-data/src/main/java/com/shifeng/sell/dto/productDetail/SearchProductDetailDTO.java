package com.shifeng.sell.dto.productDetail;

import com.shifeng.util.DateUtil;

/**
 * 查询商品销售明细 搜索dto
 * 
 * @author Yan
 *
 */
public class SearchProductDetailDTO {

	// SPU
	String spu;
	// 行业类目
	String industryCategory;
	// 店铺分类
	String shopType;
	// 站来源类型(0 pc 1m 2app 3 微信)
	int type = -1;
	// 结束日期
	String endDate = DateUtil.getYYYY_MM_DD();
	// 月表名
	String tableName = "_" + DateUtil.getYM(endDate);


	
	
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getSpu() {
		return spu;
	}

	public void setSpu(String spu) {
		this.spu = spu;
	}

	public String getIndustryCategory() {
		return industryCategory;
	}

	public void setIndustryCategory(String industryCategory) {
		this.industryCategory = industryCategory;
	}

	public String getShopType() {
		return shopType;
	}

	public void setShopType(String shopType) {
		this.shopType = shopType;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getTableName() {
		return tableName;
	}

}
