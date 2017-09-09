package com.shifeng.sell.dto.productDetail;


/**
 * sku集合
 * @author Yan
 *
 */
public class ShowProductSkuDetailDTO {

	// skuID
	int skuId;
	// 颜色
	String color;
	// 规格
	String spec;
	// 下单金额
	Double amount;
	// 下单商品件数
	int pOrderNum;
	// 下单客户数
	int pOrderUserNum;
	// 浏览量
	int pv;
	// 访客数
	int pUserNum;
	// 转化率
	String percentConversion;
	
	

	public int getSkuId() {
		return skuId;
	}

	public void setSkuId(int skuId) {
		this.skuId = skuId;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSpec() {
		return spec;
	}

	public void setSpec(String spec) {
		this.spec = spec;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public int getpOrderNum() {
		return pOrderNum;
	}

	public void setpOrderNum(int pOrderNum) {
		this.pOrderNum = pOrderNum;
	}

	public int getpOrderUserNum() {
		return pOrderUserNum;
	}

	public void setpOrderUserNum(int pOrderUserNum) {
		this.pOrderUserNum = pOrderUserNum;
	}

	public int getPv() {
		return pv;
	}

	public void setPv(int pv) {
		this.pv = pv;
	}

	public int getpUserNum() {
		return pUserNum;
	}

	public void setpUserNum(int pUserNum) {
		this.pUserNum = pUserNum;
	}

	public String getPercentConversion() {
		return percentConversion;
	}

	public void setPercentConversion(String percentConversion) {
		this.percentConversion = percentConversion;
	}

}
