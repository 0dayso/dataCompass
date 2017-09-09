package com.shifeng.dto.statistics;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import org.springframework.util.StringUtils;

import com.shifeng.util.DateUtil;

/**
 * 查询DATA
 *
 */
public class SearchData {


    private String yearMonth;

    private String startMonth;

    private String endMonth;
    
    //开始时间
    private String startDate;
    //结束时间
    private String endDate;
    //渠道ID
    private String channelId;
    //渠道链接ID
    private String channelurl;
    
    private int rowFieldLen;//显示多少列
    //显示列
    private String[] rowFields;
    
    private String rowFieldString;
    //显示列
    private RowFieldVO rowFieldVO = new RowFieldVO();
    
    //用户ID
    private String userid;
    //活动ID
    private String activeId;
    //sku
    private String sku;
    //二级
    private String second;
    //三级
    private String three;
    //支付状态
    private String paystatus;
    //ip
    private String ip;
    //省市
    private String county;
    //是否支付
    private String ispay;
    //站来源(0 pc 1m 2app 3 微信)
    private String webtype;
    //店铺ID
    private String shopId;
    //店铺名称
    private String shopname;
    //订单ID
    private String orderId;
    //查询访问明细类型(0：全部；1：访客数ip；2：访客数cookie；3：访问用户数)
    private String vdtype;
    //cookie
    private String cookie;
    //类型
    private int status;
    //spu
    private String productId;
    
    private String objectStr;
    
	private String tableName;
	

	
	public String getTableName() {
		 if(StringUtils.isEmpty(tableName)) {
			 if (!StringUtils.isEmpty(startDate)) {
				 tableName = DateUtil.getYM(startDate);
			 } else {
				 tableName = DateUtil.getYM(new Date());
			 }
		 }
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getStartMonth() {
        return startMonth;
    }

    public void setStartMonth(String startMonth) {
        this.startMonth = startMonth;
    }

    public String getEndMonth() {
        return endMonth;
    }

    public void setEndMonth(String endMonth) {
        this.endMonth = endMonth;
    }

    public String getStartDate() {
    	if(StringUtils.isEmpty(startDate)){
    		if(StringUtils.isEmpty(endDate)){
    			startDate = DateUtil.getYYYY_MM_DD();
    		}
    	}
        return startDate;
    }

    public void setStartDate(String startDate) {
    	this.startDate = startDate;
        this.tableName = DateUtil.getYM(startDate);
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getChannelurl() {
        return channelurl;
    }

    public void setChannelurl(String channelurl) {
        this.channelurl = channelurl;
    }


    public String getYearMonth() {
        return yearMonth;
    }

    public void setYearMonth(String yearMonth) {
        this.yearMonth = yearMonth;
    }

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getActiveId() {
		return activeId;
	}

	public void setActiveId(String activeId) {
		this.activeId = activeId;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getSecond() {
		return second;
	}

	public void setSecond(String second) {
		this.second = second;
	}

	public String getThree() {
		return three;
	}

	public void setThree(String three) {
		this.three = three;
	}

	public String getPaystatus() {
		return paystatus;
	}

	public void setPaystatus(String paystatus) {
		this.paystatus = paystatus;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getIspay() {
		return ispay;
	}

	public void setIspay(String ispay) {
		this.ispay = ispay;
	}

	public String getWebtype() {
		return webtype;
	}

	public void setWebtype(String webtype) {
		this.webtype = webtype;
	}

	public int getRowFieldLen() {
		return rowFieldLen;
	}

	public void setRowFieldLen(int rowFieldLen) {
		this.rowFieldLen = rowFieldLen;
	}

	public String[] getRowFields() {
		return rowFields;
	}

	public void setRowFields(String[] rowFields) {
		this.rowFields = rowFields;
	}

	public String getRowFieldString() {
		return rowFieldString;
	}

	public void setRowFieldString(String rowFieldString) {
		this.rowFieldString = rowFieldString;
	}

	public RowFieldVO getRowFieldVO() {
		return rowFieldVO;
	}

	public void setRowFieldVO(RowFieldVO rowFieldVO) {
		this.rowFieldVO = rowFieldVO;
	}

	public String getShopId() {
		return shopId;
	}

	public void setShopId(String shopId) {
		this.shopId = shopId;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		try {
			this.county = new String(county.getBytes("ISO-8859-1"),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String getVdtype() {
		return vdtype;
	}

	public void setVdtype(String vdtype) {
		this.vdtype = vdtype;
	}

	public String getCookie() {
		return cookie;
	}

	public void setCookie(String cookie) {
		this.cookie = cookie;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getShopname() {
		return shopname;
	}

	public void setShopname(String shopname) {
		this.shopname = shopname;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getObjectStr() {
		return objectStr;
	}

	public void setObjectStr(String objectStr) {
		this.objectStr = objectStr;
	}


}
