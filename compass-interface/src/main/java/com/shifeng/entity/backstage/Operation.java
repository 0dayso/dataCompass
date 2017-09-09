package com.shifeng.entity.backstage;

import java.io.Serializable;

/**
 * Created by yongshi on 2016/11/30.
 */
public class Operation implements Serializable{
    private int userid;
    private String ip;
    private String username;
    private int optsystem;
    private String ctime;
    private String source;
    private int opttype;
    private int type;
    private String optcontent;
    private String optmodel;

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getOptsystem() {
        return optsystem;
    }

    public void setOptsystem(int optsystem) {
        this.optsystem = optsystem;
    }

    public int getOpttype() {
        return opttype;
    }

    public void setOpttype(int opttype) {
        this.opttype = opttype;
    }

    public String getOptcontent() {
        return optcontent;
    }

    public void setOptcontent(String optcontent) {
        this.optcontent = optcontent;
    }

    public String getOptmodel() {
        return optmodel;
    }

    public void setOptmodel(String optmodel) {
        this.optmodel = optmodel;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
