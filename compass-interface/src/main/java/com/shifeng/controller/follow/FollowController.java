package com.shifeng.controller.follow;

import com.shifeng.controller.BaseController;
import com.shifeng.entity.channel.Channel;
import com.shifeng.entity.follow.Cart;
import com.shifeng.entity.follow.Product;
import com.shifeng.entity.follow.Shop;
import com.shifeng.ip.IPSeeker;
import com.shifeng.service.follow.FollowService;
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
 * 关注
 * Created by yongshi on 2016/11/30.
 */
@Controller
@RequestMapping(value = "/follow")
public class FollowController extends BaseController{
    @Resource(name="followServiceImpl")
     FollowService followServiceImpl;
    /**
     *   关注商品调用参数说明
     * @param p
     * @return
     */
    @RequestMapping(value = "/goods", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> goods(Product p) {
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
        if (StringUtils.isEmpty(p.getSku())) {
            map.put(Const.REQ_MSG, "SKU不能为空");
            return map;
        }
        if (StringUtils.isEmpty(p.getCtime())
                || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(p.getCtime())) {
            map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
            return map;
        }
        if (p.getProductId() == 0) {
            map.put(Const.REQ_MSG, "产品不能为空");
            return map;
        }
        if (p.getStatus() == 0) {
            map.put(Const.REQ_MSG, "状态不能为空");
            return map;
        }
        String county = IPSeeker.I.getAddress(p.getIp());
        p.setCounty(county);
        try {
            followServiceImpl.goods(map, p);
        } catch (Exception e) {
            logger.error("关注商品调用接口异常；异常信息：" + e.toString());
        }

        return map;
    }
    /**
     *   10.	关注店铺调用参数说明
     * @param p
     * @return
     */
    @RequestMapping(value = "/shop", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> shop(Shop p) {
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
       /* if (StringUtils.isEmpty(p.getSku())) {
            map.put(Const.REQ_MSG, "SKU不能为空");
            return map;
        }*/
        if (StringUtils.isEmpty(p.getCtime())
                || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(p.getCtime())) {
            map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
            return map;
        }
        if (p.getShopId() == 0) {
            map.put(Const.REQ_MSG, "店铺不能为空");
            return map;
        }
        if (p.getStatus() == 0) {
            map.put(Const.REQ_MSG, "状态不能为空");
            return map;
        }
        String county = IPSeeker.I.getAddress(p.getIp());
        p.setCounty(county);
        try {
            followServiceImpl.shop(map, p);
        } catch (Exception e) {
            logger.error("关注店铺调用接口异常；异常信息：" + e.toString());
        }

        return map;
    }
    /**
     *   11.	购物车调用参数说明
     * @param p
     * @return
     */
    @RequestMapping(value = "/cart", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> cart(Cart p) {
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
        if (StringUtils.isEmpty(p.getSku())) {
            map.put(Const.REQ_MSG, "SKU不能为空");
            return map;
        }
        if (StringUtils.isEmpty(p.getCtime())
                || !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(p.getCtime())) {
            map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
            return map;
        }
        if (p.getProductId() == 0) {
            map.put(Const.REQ_MSG, "产品不能为空");
            return map;
        }
        if (p.getStatus() == 0) {
            map.put(Const.REQ_MSG, "状态不能为空");
            return map;
        }
        String county = IPSeeker.I.getAddress(p.getIp());
        p.setCounty(county);
        try {
            followServiceImpl.cart(map, p);
        } catch (Exception e) {
            logger.error("关注店铺调用接口异常；异常信息：" + e.toString());
        }

        return map;
    }
}
