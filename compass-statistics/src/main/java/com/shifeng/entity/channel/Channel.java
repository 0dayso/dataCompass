package com.shifeng.entity.channel;

import java.io.Serializable;

/**
 * 商城渠道
 * @author Yan
 *
 */
public class Channel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// 渠道ID
	private int id;
	// 名称
	private String name;
	// 状态(0：正常；1：冻结；2：关闭)
	private int status;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	
	
}
