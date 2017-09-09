package com.shifeng.service.purchase.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.purchase.Purchase;
import com.shifeng.entity.visit.Visit;
import com.shifeng.service.purchase.PurchaseService;

@Service("purchaseService")
public class PurchaseServiceImpl implements PurchaseService{
	
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	

	/**
	 * 保存购买明细信息
	 * @param purchase
	 * @throws Exception
	 */
	public void savePurchase(Purchase purchase)throws Exception {
		dao.save("ResourceMapper.saveResource", purchase);
	}
	
	
	@Override
	public Purchase getObject() {
		try {
			return (Purchase)dao.findForObject("ResourceMapper.getObject");
		} catch (Exception e) {
			return null;
		}
	}


	@Override
	public void update(Purchase purchase) {
		 try {
			dao.update("ResourceMapper.update", purchase);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
