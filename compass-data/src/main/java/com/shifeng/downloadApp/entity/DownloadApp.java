package com.shifeng.downloadApp.entity;

import java.io.Serializable;
import java.util.Date;
/** 
 * app下载统计(downloadApp)实体类
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-23 15:05:06 
 */  
public class DownloadApp implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//ip
  	 private String ip;
 	//创建时间
  	 private Date ctime;
 	//来源
  	 private String source;
 	//类型（1：商城；2：玩嘛）
  	 private int status;
 	//省市
  	 private String county;

  	 private int count;

	 
    /**
    *ip
	* @return
    */ 
	public String getIp() {
		return ip;
	}
    /**
    *ip
	* @param type
    */ 
	public void setIp(String ip) {
		this.ip = ip;
	}
    /**
    *创建时间
	* @return
    */ 
	public Date getCtime() {
		return ctime;
	}
    /**
    *创建时间
	* @param type
    */ 
	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}
    /**
    *来源
	* @return
    */ 
	public String getSource() {
		return source;
	}
    /**
    *来源
	* @param type
    */ 
	public void setSource(String source) {
		this.source = source;
	}
    /**
    *类型（1：商城；2：玩嘛）
	* @return
    */ 
	public int getStatus() {
		return status;
	}
    /**
    *类型（1：商城；2：玩嘛）
	* @param type
    */ 
	public void setStatus(int status) {
		this.status = status;
	}
    /**
    *省市
	* @return
    */ 
	public String getCounty() {
		return county;
	}
    /**
    *省市
	* @param type
    */ 
	public void setCounty(String county) {
		this.county = county;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
}
