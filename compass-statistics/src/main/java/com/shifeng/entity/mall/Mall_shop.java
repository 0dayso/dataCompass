package com.shifeng.entity.mall;

import java.io.Serializable;
import java.util.Date;
/** 
 * 商城店铺(mall_shop)实体类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-11-24 10:27:43 
 */  
public class Mall_shop implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//店铺id
  	 private int sId;
 	//店铺名称
  	 private String sName;
 	//店铺Logo
  	 private String sLogo;


    
	public int getsId() {
		return sId;
	}
	public void setsId(int sId) {
		this.sId = sId;
	}
	public String getsName() {
		return sName;
	}
	public void setsName(String sName) {
		this.sName = sName;
	}
	public String getsLogo() {
		return sLogo;
	}
	public void setsLogo(String sLogo) {
		this.sLogo = sLogo;
	}
	
}
