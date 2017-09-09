package com.shifeng.entity.shop;

import java.io.Serializable;

/**
 * Created by yongshi on 2016/11/30.
 */
public class Cost implements Serializable {
    private int shopid;
    private String shopname;
    private String ip;
    private String source;
    private int status;
    private int type;
    private String ctime;
    private double money;

    //省市
    private String county;

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }
    public int getShopid() {
        return shopid;
    }

    public void setShopid(int shopid) {
        this.shopid = shopid;
    }

    public String getShopname() {
        return shopname;
    }

    public void setShopname(String shopname) {
        this.shopname = shopname;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getCtime() {
        return ctime;
    }

    public void setCtime(String ctime) {
        this.ctime = ctime;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }
}
