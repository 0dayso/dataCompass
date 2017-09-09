package com.shifeng.entity.channel;

import java.io.Serializable;
import java.util.Date;
/** 
 * 商城渠道(channel)实体类
 * @author sen
 * @version Revision: 1.00 
 *  Date: 2016-11-08 15:52:25 
 */  
public class Channel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

 	//id
  	 private int id;
 	//名称
  	 private String name;
 	//对接人
  	 private String pickup;
 	//联系人
  	 private String contacts;
 	//联系电话
  	 private String phone;
 	//创建时间
  	 private Date cdate;
 	//修改人
  	 private String updateuser;
 	//修改时间
  	 private Date updatetime;
 	//状态(0：正常；1：冻结；2：关闭)
  	 private int status;



	 
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
    *名称
	* @return
    */ 
	public String getName() {
		return name;
	}
    /**
    *名称
	* @param type
    */ 
	public void setName(String name) {
		this.name = name;
	}
    /**
    *对接人
	* @return
    */ 
	public String getPickup() {
		return pickup;
	}
    /**
    *对接人
	* @param type
    */ 
	public void setPickup(String pickup) {
		this.pickup = pickup;
	}
    /**
    *联系人
	* @return
    */ 
	public String getContacts() {
		return contacts;
	}
    /**
    *联系人
	* @param type
    */ 
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
    /**
    *联系电话
	* @return
    */ 
	public String getPhone() {
		return phone;
	}
    /**
    *联系电话
	* @param type
    */ 
	public void setPhone(String phone) {
		this.phone = phone;
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
	
}
