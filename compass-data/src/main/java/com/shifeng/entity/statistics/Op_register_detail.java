package com.shifeng.entity.statistics;

import java.io.Serializable;
import java.util.Date;
/** 
 * 注册明细(op_register_detail)实体类
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public class Op_register_detail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//注册时间
  	 private Date registertime;
 	//userid
  	 private String userid;
 	//ip
  	 private String ip;
 	//渠道id
  	 private String channelid;
 	//来源
  	 private String source;
 	//活动ID
  	 private String activeId;
 	//渠道链接ID
  	 private String channelUrlId;
  	//省市
  	 private String county;


	 
    /**
    *注册时间
	* @return
    */ 
	public Date getRegistertime() {
		return registertime;
	}
    /**
    *注册时间
	* @param type
    */ 
	public void setRegistertime(Date registertime) {
		this.registertime = registertime;
	}
    /**
    *userid
	* @return
    */ 
	public String getUserid() {
		return userid;
	}
    /**
    *userid
	* @param type
    */ 
	public void setUserid(String userid) {
		this.userid = userid;
	}
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
    *渠道id
	* @return
    */ 
	public String getChannelid() {
		return channelid;
	}
    /**
    *渠道id
	* @param type
    */ 
	public void setChannelid(String channelid) {
		this.channelid = channelid;
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
    *活动ID
	* @return
    */ 
	public String getActiveId() {
		return activeId;
	}
    /**
    *活动ID
	* @param type
    */ 
	public void setActiveId(String activeId) {
		this.activeId = activeId;
	}
    /**
    *渠道链接ID
	* @return
    */ 
	public String getChannelUrlId() {
		return channelUrlId;
	}
    /**
    *渠道链接ID
	* @param type
    */ 
	public void setChannelUrlId(String channelUrlId) {
		this.channelUrlId = channelUrlId;
	}
	/**
	 * 省市
	 * @return
	 */
	public String getCounty() {
		return county;
	}
	/**
	 * 省市
	 * @return
	 */
	public void setCounty(String county) {
		this.county = county;
	}
}
