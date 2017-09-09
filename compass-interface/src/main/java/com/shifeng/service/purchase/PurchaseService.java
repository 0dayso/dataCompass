package com.shifeng.service.purchase;

import java.util.Map;

import com.shifeng.entity.purchase.PurchaseCancel;
import org.springframework.stereotype.Service;

import com.shifeng.entity.purchase.Purchase;

/**
 * 购买服务接口
 * @author Yan
 *
 */
@Service("purchaseService")
public interface PurchaseService {
	
	/**
	 * 购买
	 * @param map
	 * @param purchase
	 */
	void buy(Map<String,String> map,Purchase purchase) throws Exception;

    void cancel(Map<String, String> map, PurchaseCancel p);
}
