package com.shifeng.service.purchase;

import com.shifeng.entity.purchase.Purchase;

public interface PurchaseService{
	 
	/**
	 * 保存购买明细信息
	 * @param purchase
	 * @throws Exception
	 */
	void savePurchase(Purchase purchase)throws Exception;
	
	Purchase getObject();
	void update(Purchase purchase);
}
