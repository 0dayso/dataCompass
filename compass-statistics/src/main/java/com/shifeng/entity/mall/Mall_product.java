package com.shifeng.entity.mall;

import java.io.Serializable;
import java.util.Date;
/** 
 * 商城商品(mall_product)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:27:43 
 */  
public class Mall_product implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//商品sku id
  	 private int sku;
 	//商品id
  	 private int pId;
 	//商品名称
  	 private String name;
 	//商品图片
  	 private String pic;
 	//商品颜色
  	 private String color;
 	//商品规格
  	 private String spec;
 	//商品编号
  	 private String number;
 	//商品市场价格
  	 private double marketPrice;
 	//商品销售价格
  	 private double price;
 	//商品id
  	 private int shopId;

/*************************/
 	// 图片颜色 | 分割
 	private String iColor;

	 
    /**
    *商品sku id
	* @return
    */ 
	public int getSku() {
		return sku;
	}
    /**
    *商品sku id
	* @param type
    */ 
	public void setSku(int sku) {
		this.sku = sku;
	}
    /**
    *商品名称
	* @return
    */ 
	public String getName() {
		return name;
	}
    /**
    *商品名称
	* @param type
    */ 
	public void setName(String name) {
		this.name = name;
	}
    /**
    *商品图片
	* @return
    */ 
	public String getPic() {
		//System.out.println(pic);
		//System.out.println(iColor);
		//System.out.println(color);
		if(pic != null && iColor.indexOf("-1") > 0){
			String[] c = iColor.split("\\|");
			int wz = c.length;
			int j = 0;
			for(int i = 0;i<wz;i++){
				if(color.equals(c[i])){
					j = i;
					break;
				}
			}
			//System.out.println("************"+pic.split("\\|")[wz]);
			return "http://seebong-hangzhou.oss-cn-hangzhou.aliyuncs.com/"+pic.split("\\|")[j];
		}
		return "http://seebong-hangzhou.oss-cn-hangzhou.aliyuncs.com/"+pic.split("\\|")[0];
	}
    /**
    *商品图片
	* @param type
    */ 
	public void setPic(String pic) {
		this.pic = pic;
	}
    /**
    *商品颜色
	* @return
    */ 
	public String getColor() {
		return color;
	}
    /**
    *商品颜色
	* @param type
    */ 
	public void setColor(String color) {
		this.color = color;
	}
    /**
    *商品规格
	* @return
    */ 
	public String getSpec() {
		return spec;
	}
    /**
    *商品规格
	* @param type
    */ 
	public void setSpec(String spec) {
		this.spec = spec;
	}
    /**
    *商品编号
	* @return
    */ 
	public String getNumber() {
		return number;
	}
    /**
    *商品编号
	* @param type
    */ 
	public void setNumber(String number) {
		this.number = number;
	}
    /**
    *商品市场价格
	* @return
    */ 
	public double getMarketPrice() {
		return marketPrice;
	}
    /**
    *商品市场价格
	* @param type
    */ 
	public void setMarketPrice(double marketPrice) {
		this.marketPrice = marketPrice;
	}
    /**
    *商品销售价格
	* @return
    */ 
	public double getPrice() {
		return price;
	}
    /**
    *商品销售价格
	* @param type
    */ 
	public void setPrice(double price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "Mall_product [sku=" + sku + ", pId=" + pId + ", name=" + name + ", pic=" + pic + ", color=" + color
				+ ", spec=" + spec + ", number=" + number + ", marketPrice=" + marketPrice + ", price=" + price + "]";
	}
	public int getpId() {
		return pId;
	}
	public void setpId(int pId) {
		this.pId = pId;
	}
	public String getiColor() {
		return iColor;
	}
	public void setiColor(String iColor) {
		this.iColor = iColor;
	}
	/**
	 * 店铺id
	 * @return
	 */
	public int getShopId() {
		return shopId;
	}
	/**
	 * 店铺id
	 * @param shopId
	 */
	public void setShopId(int shopId) {
		this.shopId = shopId;
	}
	
	
	
	
}
