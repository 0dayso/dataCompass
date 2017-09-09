package com.shifeng.service.follow;

import com.shifeng.entity.follow.Cart;
import com.shifeng.entity.follow.Product;
import com.shifeng.entity.follow.Shop;

import java.util.Map;

/**
 * Created by yongshi on 2016/11/30.
 */
public interface FollowService {
    void goods(Map<String, String> map, Product p);

    void shop(Map<String, String> map, Shop p);

    void cart(Map<String, String> map, Cart p);
}
