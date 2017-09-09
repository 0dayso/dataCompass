package com.shifeng.controller;

import com.shifeng.entity.Login;
import com.shifeng.entity.shop.Cost;
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
 *   商家费用
 */
@Controller
@RequestMapping(value = "shop")
public class ShopCostController extends BaseController{

    @RequestMapping(value = "cost",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> req(Cost p){
        Map<String, String> map = new HashMap<String, String>();
        map.put(Const.REQ_CODE, "500");
            if (p.getShopid() ==0) {
                map.put(Const.REQ_MSG, "商家id不能为空");
                return map;
            }
            if (StringUtils.isEmpty(p.getIp())) {
                map.put(Const.REQ_MSG, "用户IP不能为空");
                return map;
            }
            if (StringUtils.isEmpty(p.getShopname())) {
                map.put(Const.REQ_MSG, "商家名称不能为空");
                return map;
            }
            if (StringUtils.isEmpty(p.getCtime())
                    || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(p.getCtime())) {
                map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
                return map;
            }
            if (p.getStatus() == 0) {
                map.put(Const.REQ_MSG, "费用类型不能为空");
                return map;
            }

            String county = IPSeeker.I.getAddress(p.getIp());
            p.setCounty(county);
            try{
                String orderIdJsonVal = JSONObject.fromObject(p).toString();
                RedisTool.lpush(Const.INTERFACE_SHOP_COST_LIST, orderIdJsonVal);
                map.put(Const.REQ_CODE, "0");
            }catch (Exception e){
                logger.error("商家费用调用接口异常；异常信息：" + e.toString());
            }
            return map;
    }
}
