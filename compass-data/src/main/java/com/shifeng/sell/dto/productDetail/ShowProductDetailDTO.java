package com.shifeng.sell.dto.productDetail;

import com.shifeng.util.DateUtil;

/**
 * 商品明细
 * @author Yan
 *
 */
public class ShowProductDetailDTO {

	// 排名
	int sort;
	// 商品名称
	String productName;
	// 商品id
	int productId;
	// 商品对应的sku集合
	java.util.List<ShowProductSkuDetailDTO> skus;
	// 结束日期
	String endDate = DateUtil.getYYYY_MM_DD();
	// 月表名
	String tableName = "_"+DateUtil.getYM(endDate);

	
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public java.util.List<ShowProductSkuDetailDTO> getSkus() {
		return skus;
	}

	public void setSkus(java.util.List<ShowProductSkuDetailDTO> skus) {
		this.skus = skus;
	}

}
