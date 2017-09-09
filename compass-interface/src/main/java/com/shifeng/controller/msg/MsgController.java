package com.shifeng.controller.msg;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.shifeng.controller.BaseController;
import com.shifeng.entity.msg.SendMsg;
import com.shifeng.service.msg.MsgService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/**
 * 
 * @author WinZhong
 *
 */
@Controller
@RequestMapping(value = "/msg")
public class MsgController extends BaseController{
	
    @Resource(name="msgServiceImpl")
    MsgService msgServiceImpl;
    /**
     * 消息发送
     * @param msg
     * @return
     */
    @RequestMapping(value = "/send", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> send(SendMsg msg) {
           Map<String, String> map = new HashMap<String, String>();
            map.put(Const.REQ_CODE, "500");
        if (msg.getUserid() ==0) {
            map.put(Const.REQ_MSG, "用户ID不能为空");
            return map;
        }
        if (StringUtils.isEmpty(msg.getIp())) {
            map.put(Const.REQ_MSG, "用户IP不能为空");
            return map;
        }
        if (StringUtils.isEmpty(msg.getCtime()) || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(msg.getCtime())) {
            map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
            return map;
        }
        if (msg.getStatus() == 0) {
            map.put(Const.REQ_MSG, "状态不能为空");
            return map;
        }
        try {
        	msgServiceImpl.sendMsg(msg);
        	map.put(Const.REQ_CODE, "0");
        } catch (Exception e) {
            logger.error("消息发送接口异常；异常信息：" + e.toString());
        }

        return map;
    }

    /**
     * 获取消息发送历史记录
     * @param msg
     * @return
     */
    @RequestMapping(value = "/his", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> his(SendMsg msg) {
           Map<String, Object> map = new HashMap<String, Object>();
            map.put(Const.REQ_CODE, "500");
        if (msg.getUserid() ==0) {
            map.put(Const.REQ_MSG, "用户ID不能为空");
            return map;
        }
        if (StringUtils.isEmpty(msg.getIp())) {
            map.put(Const.REQ_MSG, "用户IP不能为空");
            return map;
        }
        if (StringUtils.isEmpty(msg.getCtime()) || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(msg.getCtime())) {
            map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
            return map;
        }
        try {
        	List<SendMsg> sendMsgList = msgServiceImpl.his(msg);
        	//倒序List
        	Collections.reverse(sendMsgList);
        	map.put(Const.REQ_CODE, "0");
        	map.put("data", sendMsgList);
        } catch (Exception e) {
            logger.error("获取消息发送历史记录接口异常；异常信息：" + e.toString());
        }

        return map;
    }
}
