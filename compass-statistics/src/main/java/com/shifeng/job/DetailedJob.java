package com.shifeng.job;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import com.shifeng.service.app.AppService;
import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

import com.shifeng.entity.detailed.Op_cart_detail;
import com.shifeng.entity.detailed.Op_follow_shop_detail;
import com.shifeng.entity.detailed.Op_follow_sku_detail;
import com.shifeng.entity.detailed.Op_login_detail;
import com.shifeng.entity.detailed.Op_operation_detail;
import com.shifeng.entity.detailed.Op_purchase_cancel_detail;
import com.shifeng.entity.detailed.Op_shop_cost_detail;
import com.shifeng.service.detailed.Op_cart_detailService;
import com.shifeng.service.detailed.Op_follow_shop_detailService;
import com.shifeng.service.detailed.Op_follow_sku_detailService;
import com.shifeng.service.detailed.Op_login_detailService;
import com.shifeng.service.detailed.Op_operation_detailService;
import com.shifeng.service.detailed.Op_purchase_cancel_detailService;
import com.shifeng.service.detailed.Op_shop_cost_detailService;
import com.shifeng.service.huodong.HuodongService;
import com.shifeng.service.msg.MsgService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;
/**
 * 明细记录任务
 * @author WinZhong
 *
 */
public class DetailedJob {

	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name="op_purchase_cancel_detailServiceImpl")
	private Op_purchase_cancel_detailService op_purchase_cancel_detailService;
	
	@Resource(name="op_follow_sku_detailServiceImpl")
	private Op_follow_sku_detailService op_follow_sku_detailService;
	
	@Resource(name="op_follow_shop_detailServiceImpl")
	private Op_follow_shop_detailService op_follow_shop_detailService;
	
	@Resource(name="op_login_detailServiceImpl")
	private Op_login_detailService op_login_detailService;
	
	@Resource(name="op_cart_detailServiceImpl")
	private Op_cart_detailService op_cart_detailService;
	
	@Resource(name="op_operation_detailServiceImpl")
	private Op_operation_detailService op_operation_detailService;
	
	@Resource(name="op_shop_cost_detailServiceImpl")
	private Op_shop_cost_detailService op_shop_cost_detailService;
	
	@Resource(name="huodongServiceImpl")
	private HuodongService huodongServiceImpl;
	
	@Resource(name="msgServiceImpl")
	private MsgService msgServiceImpl;
	@Resource(name="appServiceImpl")
	private AppService appServiceImpl;
	/**
	 * 执行保存明细记录任务
	 */
	public void execute() {
		logger.info("===【开始】执行明细记录任务===");
		 quXiaoDingDan();
		guanZhuShangPin();
		guanZhuDianPu();
		dengLuXiangXi();
		gouWuChe();
		houTaiCaoZuo();
		shangJiaFeiYong();
		
		huodongServiceImpl.saveWumai();
		msgServiceImpl.saveSendMsg();
		appServiceImpl.saveApp();
		logger.info("===【结束】执行明细记录任务===");
	}
	
	/**
	 * 取消订单明细记录
	 */
	public void quXiaoDingDan() {
		logger.info("【开始】执行保存取消订单明细记录任务");
		 String key = Const.STATISTICS_AD_PURCHASE_CANCEL_DATA_DAY;
		 List<Op_purchase_cancel_detail> detailList = new ArrayList<Op_purchase_cancel_detail>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 //logger.info("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 Op_purchase_cancel_detail detail = (Op_purchase_cancel_detail)JSONObject.toBean(JSONObject.fromObject(str), Op_purchase_cancel_detail.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
					op_purchase_cancel_detailService.saveCancelDetail(detailList);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				op_purchase_cancel_detailService.saveCancelDetail(detailList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存取消订单明细记录任务");
	}
	
	/**
	 * 关注商品明细记录
	 */
	public void guanZhuShangPin() {
		logger.info("【开始】执行保存关注商品明细记录任务");
		 String key = Const.STATISTICS_AD_FOLLOW_SKU_DATA_DAY;
		 List<Op_follow_sku_detail> detailList = new ArrayList<Op_follow_sku_detail>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 //logger.info("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 Op_follow_sku_detail detail = (Op_follow_sku_detail)JSONObject.toBean(JSONObject.fromObject(str), Op_follow_sku_detail.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
					 op_follow_sku_detailService.saveDetail(detailList);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				 op_follow_sku_detailService.saveDetail(detailList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存关注商品明细记录任务");
	}
	
	/**
	 * 关注店铺明细记录
	 */
	public void guanZhuDianPu() {
		logger.info("【开始】执行保存关注店铺明细记录任务");
		 String key = Const.STATISTICS_AD_FOLLOW_SHOP_DATA_DAY;
		 List<Op_follow_shop_detail> detailList = new ArrayList<Op_follow_shop_detail>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 //logger.info("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 Op_follow_shop_detail detail = (Op_follow_shop_detail)JSONObject.toBean(JSONObject.fromObject(str), Op_follow_shop_detail.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
					 op_follow_shop_detailService.saveDetail(detailList);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				 op_follow_shop_detailService.saveDetail(detailList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存关注店铺明细记录任务");
	}

	/**
	 * 登录明细记录
	 */
	public void dengLuXiangXi() {
		logger.info("【开始】执行保存登录明细记录任务");
		 String key = Const.INTERFACE_LOGIN_LIST;
		 List<Op_login_detail> detailList = new ArrayList<Op_login_detail>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 //logger.info("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 Op_login_detail detail = (Op_login_detail)JSONObject.toBean(JSONObject.fromObject(str), Op_login_detail.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
					 op_login_detailService.saveDetail(detailList);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				 op_login_detailService.saveDetail(detailList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存登录明细记录任务");
	}
	
	/**
	 * 购物车明细记录
	 */
	public void gouWuChe() {
		logger.info("【开始】执行保存购物车明细记录任务");
		 String key = Const.STATISTICS_AD_FOLLOW_CART_DATA_DAY;
		 List<Op_cart_detail> detailList = new ArrayList<Op_cart_detail>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 //logger.info("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 Op_cart_detail detail = (Op_cart_detail)JSONObject.toBean(JSONObject.fromObject(str), Op_cart_detail.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
					 op_cart_detailService.saveDetail(detailList);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				 op_cart_detailService.saveDetail(detailList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存购物车明细记录任务");
	}

	/**
	 * 后台操作明细记录
	 */
	public void houTaiCaoZuo() {
		logger.info("【开始】执行保存后台操作明细记录任务");
		 String key = Const.INTERFACE_OPERATION_LIST;
		 List<Op_operation_detail> detailList = new ArrayList<Op_operation_detail>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 //logger.info("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 Op_operation_detail detail = (Op_operation_detail)JSONObject.toBean(JSONObject.fromObject(str), Op_operation_detail.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
					 op_operation_detailService.saveDetail(detailList);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				 op_operation_detailService.saveDetail(detailList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存后台操作明细记录任务");
	}

	/**
	 * 商家费用明细记录
	 */
	public void shangJiaFeiYong() {
		logger.info("【开始】执行保存商家费用明细记录任务");
		 String key = Const.INTERFACE_SHOP_COST_LIST;
		 List<Op_shop_cost_detail> detailList = new ArrayList<Op_shop_cost_detail>();
		 //获取Redis存储的明记录
		 String str = RedisTool.rpop(key);
		 //logger.info("str1:"+str);
		 while (!StringUtils.isEmpty(str)) {
			 Op_shop_cost_detail detail = (Op_shop_cost_detail)JSONObject.toBean(JSONObject.fromObject(str), Op_shop_cost_detail.class);
			 detailList.add(detail);
			 //每满一百条提交一次
			 if(detailList.size() >= 100){
				 try {
					 op_shop_cost_detailService.saveDetail(detailList);
					 detailList.clear();
				} catch (Exception e) {
					e.printStackTrace();
				}
			 }
			 str = RedisTool.rpop(key);
		 }
		 if(detailList.size() > 0){
			 try {
				 op_shop_cost_detailService.saveDetail(detailList);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		logger.info("【结束】执行保存商家费用明细记录任务");
	}
	
	public static void main(String[] args) {

	}

}
