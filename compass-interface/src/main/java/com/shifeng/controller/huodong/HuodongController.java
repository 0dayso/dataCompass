package com.shifeng.controller.huodong;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shifeng.controller.BaseController;
import com.shifeng.entity.huodong.Wumai;
import com.shifeng.ip.IPSeeker;
import com.shifeng.service.huodong.HuodongService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/**
 * 
 * @author WinZhong
 *
 */
@Controller
@RequestMapping(value = "/huodong")
public class HuodongController extends BaseController{
	
    @Resource(name="huodongServiceImpl")
    HuodongService huodongServiceImpl;
	
	/**
	 * 雾霾活动记录
	 */
    @RequestMapping(value = "/wumai", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> wumai(Wumai wumai) {
           Map<String, String> map = new HashMap<String, String>();
            map.put(Const.REQ_CODE, "500");

        if (StringUtils.isEmpty(wumai.getIp())) {
            map.put(Const.REQ_MSG, "用户IP不能为空");
            return map;
        }
       /* if (StringUtils.isEmpty(wumai.getSku())) {
            map.put(Const.REQ_MSG, "SKU不能为空");
            return map;
        }*/
        if (StringUtils.isEmpty(wumai.getCtime()) || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(wumai.getCtime())) {
            map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
            return map;
        }
        if (wumai.getStatus() == 0) {
            map.put(Const.REQ_MSG, "状态不能为空");
            return map;
        }
        String county = IPSeeker.I.getAddress(wumai.getIp());
        wumai.setCounty(county);
        try {
        	huodongServiceImpl.wumai(wumai);
        	map.put(Const.REQ_CODE, "0");
        } catch (Exception e) {
            logger.error("雾霾活动记录接口异常；异常信息：" + e.toString());
        }

        return map;
    }
}
