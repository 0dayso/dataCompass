package com.shifeng.entity.channel;

import java.io.Serializable;
import java.util.Date;
/** 
 * 商城渠道链接(channelurl)实体类
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public class Channelurl implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//id
  	 private int id;
 	//渠道ID
  	 private int cid;
 	//链接地址
  	 private String url;
 	//创建人
  	 private String cuser;
 	//创建时间
  	 private Date cdate;
 	//修改人
  	 private String updateuser;
 	//修改时间
  	 private Date updatetime;
 	//状态(0：正常；1：冻结；2：关闭)
  	 private int status;
  	 private String name;


	 
	/**
    *id
	* @return
    */ 
	public int getId() {
		return id;
	}
    /**
    *id
	* @param type
    */ 
	public void setId(int id) {
		this.id = id;
	}
    /**
    *渠道ID
	* @return
    */ 
	public int getCid() {
		return cid;
	}
    /**
    *渠道ID
	* @param type
    */ 
	public void setCid(int cid) {
		this.cid = cid;
	}
    /**
    *链接地址
	* @return
    */ 
	public String getUrl() {
		return url;
	}
    /**
    *链接地址
	* @param type
    */ 
	public void setUrl(String url) {
		this.url = url;
	}
    /**
    *创建人
	* @return
    */ 
	public String getCuser() {
		return cuser;
	}
    /**
    *创建人
	* @param type
    */ 
	public void setCuser(String cuser) {
		this.cuser = cuser;
	}
    /**
    *创建时间
	* @return
    */ 
	public Date getCdate() {
		return cdate;
	}
    /**
    *创建时间
	* @param type
    */ 
	public void setCdate(Date cdate) {
		this.cdate = cdate;
	}
    /**
    *修改人
	* @return
    */ 
	public String getUpdateuser() {
		return updateuser;
	}
    /**
    *修改人
	* @param type
    */ 
	public void setUpdateuser(String updateuser) {
		this.updateuser = updateuser;
	}
    /**
    *修改时间
	* @return
    */ 
	public Date getUpdatetime() {
		return updatetime;
	}
    /**
    *修改时间
	* @param type
    */ 
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}
    /**
    *状态(0：正常；1：冻结；2：关闭)
	* @return
    */ 
	public int getStatus() {
		return status;
	}
    /**
    *状态(0：正常；1：冻结；2：关闭)
	* @param type
    */ 
	public void setStatus(int status) {
		this.status = status;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
