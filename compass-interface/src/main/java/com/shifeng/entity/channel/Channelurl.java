package com.shifeng.entity.channel;

import java.io.Serializable;

/**
 * 渠道链接实体
 * 
 * @author Yan
 *
 */
public class Channelurl implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// id
	private Integer id;
	// 渠道ID
	private Integer cid;
	// 链接地址
	private String url;
	// 渠道链接名称
	String name;
	// 状态(0：正常；1：冻结；2：关闭)
	private Integer status;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid == null ? 0 : cid;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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
