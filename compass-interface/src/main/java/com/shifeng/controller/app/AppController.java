package com.shifeng.controller.app;

import com.shifeng.controller.BaseController;
import com.shifeng.entity.App;
import com.shifeng.entity.huodong.Wumai;
import com.shifeng.ip.IPSeeker;
import com.shifeng.service.app.AppService;
import com.shifeng.service.huodong.HuodongService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;


/**
 *
 * @author 勇士
 *
 */
@Controller
@RequestMapping(value = "/app")
public class AppController extends BaseController {

    @Resource(name="appServiceImpl")
    AppService appServiceImpl;

    /**
     * 雾霾活动记录
     */
    @RequestMapping(value = "/download", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> download(App wumai) {
        Map<String, String> map = new HashMap<String, String>();
        map.put(Const.REQ_CODE, "500");

        if (StringUtils.isEmpty(wumai.getIp())) {
            map.put(Const.REQ_MSG, "用户IP不能为空");
            return map;
        }
        wumai.setCtime(DateUtil.getTime());

        if (wumai.getStatus() == 0) {
            map.put(Const.REQ_MSG, "状态不能为空");
            return map;
        }
        String county = IPSeeker.I.getAddress(wumai.getIp());
        wumai.setCounty(county);
        try {
            appServiceImpl.download(wumai);
            map.put(Const.REQ_CODE, "0");
        } catch (Exception e) {
            logger.error("app记录接口异常；异常信息：" + e.toString());
        }

        return map;
    }
}
