package com.shifeng.entity;

import java.io.Serializable;

/**
 * Created by yongshi on 2016/11/30.
 */
public class Login implements Serializable{
    private int userid;
    private String ip;
    private String username;
    private String ctime;
    private String source;
    private int status;
    private int type;

    //省市
    private String county;

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }
    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

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

    public int getType() {
        return type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setType(int type) {
        this.type = type;
    }
}
