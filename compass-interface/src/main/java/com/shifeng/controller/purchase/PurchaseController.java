package com.shifeng.controller.purchase;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import com.shifeng.entity.purchase.PurchaseCancel;
import com.shifeng.ip.IPSeeker;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shifeng.entity.purchase.Purchase;
import com.shifeng.service.purchase.PurchaseService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;

/**
 * 购买控制器
 * 
 * @author Yan
 *
 */
@Controller
@RequestMapping(value = "/purchase")
public class PurchaseController {

	@Resource(name = "purchaseServiceImpl")
	PurchaseService purchaseServiceImpl;

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 购买
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/buy", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> buy(Purchase p) {
		Map<String, String> map = new HashMap<String, String>();
		map.put(Const.REQ_CODE, "500");
		if (p.getUserid() == null) {
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
		if (StringUtils.isEmpty(p.getNumber())) {
			map.put(Const.REQ_MSG, "数量不能为空");
			return map;
		}
		if (p.getAmount() == null) {
			map.put(Const.REQ_MSG, "金额不能为空");
			return map;
		}
		if (StringUtils.isEmpty(p.getPurchasetime()) 
				|| !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(p.getPurchasetime())) {
			map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
			return map;
		}

		if (p.getStatus() == null) {
			map.put(Const.REQ_MSG, "状态不能为空");
			return map;
		}

		if (p.getType() == null) {
			map.put(Const.REQ_MSG, "站点来源不能为空");
			return map;
		}

		if (p.getShopId() == null) {
			map.put(Const.REQ_MSG, "店铺ID不能为空");
			return map;
		}

		if (StringUtils.isEmpty(p.getOrderId())) {
			map.put(Const.REQ_MSG, "订单ID不能为空");
			return map;
		}
		
		if(p.getProductId() == null){
			map.put(Const.REQ_MSG, "商品ID不能为空");
			return map;
		}
		String county = IPSeeker.I.getAddress(p.getIp());
		p.setCounty(county);
		try {
			purchaseServiceImpl.buy(map, p);
		} catch (Exception e) {
			logger.error("新增[购买]接口异常；异常信息：" + e.toString());
		}

		return map;
	}
	/**
	 * 取消订单
	 *
	 * @return
	 */
	@RequestMapping(value = "/cancel", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> cancel(PurchaseCancel p) {
		Map<String, String> map = new HashMap<String, String>();
		map.put(Const.REQ_CODE, "500");
		if (p.getUserid() == null) {
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
		if (StringUtils.isEmpty(p.getNumber())) {
			map.put(Const.REQ_MSG, "数量不能为空");
			return map;
		}
		if (p.getAmount() == null) {
			map.put(Const.REQ_MSG, "金额不能为空");
			return map;
		}
		if (StringUtils.isEmpty(p.getPurchasetime())
				|| !DateUtil.isValidDateYYYY_MM_DD_HH_MM_SS(p.getPurchasetime())) {
			map.put(Const.REQ_MSG, "请输入正确格式的时间(YYYY-MM-DD HH:mm:ss)");
			return map;
		}

		if (p.getStatus() == null) {
			map.put(Const.REQ_MSG, "状态不能为空");
			return map;
		}

		if (p.getType() == null) {
			map.put(Const.REQ_MSG, "站点来源不能为空");
			return map;
		}

		if (p.getShopId() == null) {
			map.put(Const.REQ_MSG, "店铺ID不能为空");
			return map;
		}

		if (StringUtils.isEmpty(p.getOrderId())) {
			map.put(Const.REQ_MSG, "订单ID不能为空");
			return map;
		}

		if(p.getProductId() == null){
			map.put(Const.REQ_MSG, "商品ID不能为空");
			return map;
		}
		if(p.getReasontype() == null){
			map.put(Const.REQ_MSG, "订单取消类型不能为空");
			return map;
		}
		String county = IPSeeker.I.getAddress(p.getIp());
		p.setCounty(county);
		try {
			purchaseServiceImpl.cancel(map, p);
		} catch (Exception e) {
			logger.error("新增[取消订单]接口异常；异常信息：" + e.toString());
		}

		return map;
	}

}
