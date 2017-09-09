package com.shifeng.entity;

import java.io.Serializable;

/**
 * Created by yongshi on 2016/12/23.
 */
public class App implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    //Ip地址
    private String ip;
    //时间 (接口默认当前时间)
    private String ctime;
    //来源
    private String source;

    //1商城app，2 玩嘛app
    private int status;
    //省市
    private String county;
    public String getIp() {
        return ip;
    }
    public void setIp(String ip) {
        this.ip = ip;
    }
    public String getCtime() {
        return ctime;
    }
    public void setCtime(String ctime) {
        this.ctime = ctime;
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
    public String getCounty() {
        return county;
    }
    public void setCounty(String county) {
        this.county = county;
    }

}
