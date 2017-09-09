package com.shifeng.entity.channel;

import java.io.Serializable;

public class Channelurl implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// id
	private int id;
	// 渠道ID
	private int cid;
	// 链接地址
	private String url;
	// 创建人
	private String cuser;
	// 创建时间
	private String cdate;
	// 修改人
	private String updateuser;
	// 修改时间
	private String updatetime;
	// 渠道链接名称
	private String name;
	// 状态(0：正常；1：冻结；2：关闭)
	private int status;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCid() {
		return cid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getCuser() {
		return cuser;
	}
	public void setCuser(String cuser) {
		this.cuser = cuser;
	}
	public String getUpdateuser() {
		return updateuser;
	}
	public void setUpdateuser(String updateuser) {
		this.updateuser = updateuser;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getCdate() {
		return cdate;
	}
	public void setCdate(String cdate) {
		this.cdate = cdate;
	}
	public String getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}
	
}
