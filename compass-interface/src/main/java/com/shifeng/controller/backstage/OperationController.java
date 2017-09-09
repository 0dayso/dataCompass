package com.shifeng.controller.backstage;

import com.shifeng.controller.BaseController;
import com.shifeng.entity.backstage.Operation;
import com.shifeng.ip.IPSeeker;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yongshi on 2016/11/30.
 * 12.	后台操作详情
 */
@Controller
@RequestMapping(value = "/backstage")
public class OperationController extends BaseController{
    @RequestMapping(value = "/operation", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> operation(Operation p){
        Map<String, String> map = new HashMap<String, String>();
        map.put(Const.REQ_CODE, "500");
            if (p.getUserid() ==0) {
                map.put(Const.REQ_MSG, "用户ID不能为空");
                return map;
            }
            if (StringUtils.isEmpty(p.getIp())) {
                map.put(Const.REQ_MSG, "用户IP不能为空");
                return map;
            }
            if (StringUtils.isEmpty(p.getOptcontent())) {
                map.put(Const.REQ_MSG, "操作内容不能为空");
                return map;
            }
            if (StringUtils.isEmpty(p.getOptmodel())) {
                map.put(Const.REQ_MSG, "操作模块不能为空");
                return map;
            }
            if (StringUtils.isEmpty(p.getCtime())
                    || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(p.getCtime())) {
                map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
                return map;
            }
            if (p.getOpttype() == 0) {
                map.put(Const.REQ_MSG, "操作类型不能为空");
                return map;
            }
            if (p.getOptsystem() == 0) {
                map.put(Const.REQ_MSG, "操作系统不能为空");
                return map;
            }
            String county = IPSeeker.I.getAddress(p.getIp());
            p.setCounty(county);
            try{
                String orderIdJsonVal = JSONObject.fromObject(p).toString();
                RedisTool.lpush(Const.INTERFACE_OPERATION_LIST, orderIdJsonVal);
                map.put(Const.REQ_CODE, "0");
            }catch (Exception e){
                logger.error("后台操作详情调用接口异常；异常信息：" + e.toString());
            }

            return map;

    }
}
