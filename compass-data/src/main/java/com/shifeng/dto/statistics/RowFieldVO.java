package com.shifeng.dto.statistics;

public class RowFieldVO {

	/**
	 * 0: 不显示，1：显示
	 */
	//日期
	private int isShowDate = 0;
	//渠道
	private int isShowChannel = 0;
	//渠道链接
	private int isShowChannelurl = 0;
	//店铺
	private int isShowShop = 0;
	//站来源类型
	private int isShowType = 0;
	//用户
	private int isShowUser = 0;
	//地区
	private int isShowCounty = 0;
	//sku
	private int isShowSku = 0;
	//类型
	private int isShowStatus = 0;
	
	public static final int ROW_FIELD_DATE = 1;
	public static final int ROW_FIELD_CHANNEL = 2;
	public static final int ROW_FIELD_CHANNELURL = 3;
	public static final int ROW_FIELD_SHOPID = 4;
	public static final int ROW_FIELD_TYPE = 5;
	public static final int ROW_FIELD_USER = 6;
	public static final int ROW_FIELD_COUNTY = 7;
	public static final int ROW_FIELD_SKU = 8;
	public static final int ROW_FIELD_STATUS = 9;

	
	public void setShowRowField(String[] rowFields){
		for (String rowField : rowFields) {
			int rowValue = Integer.valueOf(rowField);
			if (rowValue == RowFieldVO.ROW_FIELD_DATE) {
				isShowDate = 1;
			} else if(rowValue == RowFieldVO.ROW_FIELD_CHANNELURL) {
				isShowChannelurl = 1;
			} else if(rowValue == RowFieldVO.ROW_FIELD_CHANNEL) {
				isShowChannel = 1;
			} else if(rowValue == RowFieldVO.ROW_FIELD_SHOPID) {
				isShowShop = 1;
			} else if(rowValue == RowFieldVO.ROW_FIELD_TYPE) {
				isShowType = 1;
			} else if(rowValue == RowFieldVO.ROW_FIELD_USER) {
				isShowUser = 1;
			} else if(rowValue == RowFieldVO.ROW_FIELD_COUNTY) {
				isShowCounty = 1;
			} else if(rowValue == RowFieldVO.ROW_FIELD_SKU) {
				isShowSku = 1;
			} else if(rowValue == RowFieldVO.ROW_FIELD_STATUS) {
				isShowStatus = 1;
			}
		}
	}


	public int getIsShowDate() {
		return isShowDate;
	}

	public void setIsShowDate(int isShowDate) {
		this.isShowDate = isShowDate;
	}

	public int getIsShowChannelurl() {
		return isShowChannelurl;
	}

	public void setIsShowChannelurl(int isShowChannelurl) {
		this.isShowChannelurl = isShowChannelurl;
	}

	public int getIsShowChannel() {
		return isShowChannel;
	}

	public void setIsShowChannel(int isShowChannel) {
		this.isShowChannel = isShowChannel;
	}

	public int getIsShowShop() {
		return isShowShop;
	}

	public void setIsShowShop(int isShowShop) {
		this.isShowShop = isShowShop;
	}

	public int getIsShowType() {
		return isShowType;
	}

	public void setIsShowType(int isShowType) {
		this.isShowType = isShowType;
	}

	public int getIsShowUser() {
		return isShowUser;
	}

	public void setIsShowUser(int isShowUser) {
		this.isShowUser = isShowUser;
	}

	public int getIsShowCounty() {
		return isShowCounty;
	}

	public void setIsShowCounty(int isShowCounty) {
		this.isShowCounty = isShowCounty;
	}

	public int getIsShowSku() {
		return isShowSku;
	}

	public void setIsShowSku(int isShowSku) {
		this.isShowSku = isShowSku;
	}

	public int getIsShowStatus() {
		return isShowStatus;
	}

	public void setIsShowStatus(int isShowStatus) {
		this.isShowStatus = isShowStatus;
	}

	
	
}
