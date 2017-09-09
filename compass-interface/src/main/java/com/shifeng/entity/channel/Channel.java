package com.shifeng.entity.channel;

import java.io.Serializable;

/**
 * 商城渠道
 * 
 * @author Yan
 *
 */
public class Channel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// 渠道ID
	private Integer id;
	// 名称
	private String name;
	// 状态(0：正常；1：冻结；2：关闭)
	private Integer status;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id == null ? 0 : id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

}
