package com.sf.user.bean;

/**
 * Created by yongshi on 2016/11/30.
 */
public class PurchaseCancel extends  Purchase{

    //原因
    String reason;

    //1订单取消 2 退货 3 换货
    Integer reasontype;
    // 购买时间
    String submittime;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Integer getReasontype() {
        return reasontype;
    }

    public void setReasontype(Integer reasontype) {
        this.reasontype = reasontype;
    }

    public String getSubmittime() {
        return submittime;
    }

    public void setSubmittime(String submittime) {
        this.submittime = submittime;
    }
}
