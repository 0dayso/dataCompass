package com.shifeng.service.follow.impl;

import com.shifeng.entity.follow.Cart;
import com.shifeng.entity.follow.Product;
import com.shifeng.entity.follow.Shop;
import com.shifeng.service.follow.FollowService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Map;

/**
 * Created by yongshi on 2016/11/30.
 */
@Service("followServiceImpl")
public class FollowServiceImpl implements FollowService {
    @Override
    public void goods(Map<String, String> map, Product p) {


        String orderIdKey = String.format(Const.INTERFACE_FOLLOW_SKU, p.getSku(), p.getUserid(),p.getStatus());
        String orderIdJsonVal = RedisTool.get(orderIdKey);
        if (StringUtils.isEmpty(orderIdJsonVal)) {
            orderIdJsonVal = JSONObject.fromObject(p).toString();
            RedisTool.set(orderIdKey, "1");
            RedisTool.expire(orderIdKey, (int) (DateUtil.currentDayResidueTime() / 1000));
            RedisTool.lpush(Const.STORM_AD_FOLLOW_SKU_DATA, orderIdJsonVal);
        }
        map.put(Const.REQ_CODE, "0");
    }

    @Override
    public void shop(Map<String, String> map, Shop p) {
        String orderIdKey = String.format(Const.INTERFACE_FOLLOW_SHOP,   p.getShopId(),p.getStatus());
        String orderIdJsonVal = RedisTool.get(orderIdKey);
        if (StringUtils.isEmpty(orderIdJsonVal)) {
            orderIdJsonVal = JSONObject.fromObject(p).toString();
            RedisTool.set(orderIdKey, "1");
            RedisTool.expire(orderIdKey, (int) (DateUtil.currentDayResidueTime() / 1000));
            RedisTool.lpush(Const.STORM_AD_FOLLOW_SHOP_DATA, orderIdJsonVal);
        }
        map.put(Const.REQ_CODE, "0");
    }

    @Override
    public void cart(Map<String, String> map, Cart p) {
        String orderIdKey = String.format(Const.INTERFACE_FOLLOW_CART, p.getSku(), p.getUserid(),p.getStatus());
        String orderIdJsonVal = RedisTool.get(orderIdKey);
        if (StringUtils.isEmpty(orderIdJsonVal)) {
            orderIdJsonVal = JSONObject.fromObject(p).toString();
            RedisTool.set(orderIdKey, "1");
            RedisTool.expire(orderIdKey, (int) (DateUtil.currentDayResidueTime() / 1000));
            RedisTool.lpush(Const.STORM_AD_FOLLOW_CART_DATA, orderIdJsonVal);
        }
        map.put(Const.REQ_CODE, "0");
    }
}
