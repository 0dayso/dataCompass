package com.shifeng.job;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.shifeng.entity.mall.Mall_product;
import com.shifeng.entity.mall.Mall_shop;
import com.shifeng.entity.mall.Mall_user;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.mall.Mall_productService;
import com.shifeng.service.mall.Mall_shopService;
import com.shifeng.service.mall.Mall_userService;

public class MallJob {

	protected Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name="mall_productServiceImpl")
	private Mall_productService productService;
	
	@Resource(name="mall_shopServiceImpl")
	private Mall_shopService shopService;
	
	@Resource(name="mall_userServiceImpl")
	private Mall_userService userService;
	
	/**
	 * 定时任务
	 */
	 public void execute(){
		 logger.info("【执行同步商城[用户、店铺、商品]信息任务】");
		 syncUser();
		 syncShop();
		 syncProduct();
	 }
	 
	 /**
	  * 同步用户
	  */
	 public void syncUser(){
		 logger.info("开始同步用户");

		 Page<String> page = new Page<String>();
		 page.setPageSize(100);
		 List<Mall_user> userList = userService.getStaySyncUser(page);
		 if(userList != null){
			 logger.info("总页数："+page.getTotalPage()+"\t"+"总条数："+page.getTotalResult()+"\t"+"当前页："+page.getCurrentPage());
			 userService.saveSyncUser(userList);
			 page.setCurrentPage( page.getCurrentPage()+1);
			 while(page.getCurrentPage() <= page.getTotalPage()){
				 userList = userService.getStaySyncUser(page);
				 if(userList != null){
					 logger.info("总页数："+page.getTotalPage()+"\t"+"总条数："+page.getTotalResult()+"\t"+"当前页："+page.getCurrentPage());
					 userService.saveSyncUser(userList);
				 }
				 page.setCurrentPage( page.getCurrentPage()+1);
			 }
			 
		 }	 

		 logger.info("用户同步完毕");
	 }
	 
	 /**
	  * 同步店铺
	  */
	 public void syncShop(){
		 logger.info("开始同步店铺");


		 Page<String> page = new Page<String>();
		 page.setPageSize(100);
		 List<Mall_shop> shopList = shopService.getStaySyncShop(page);
		 if(shopList != null){
			 logger.info("总页数："+page.getTotalPage()+"\t"+"总条数："+page.getTotalResult()+"\t"+"当前页："+page.getCurrentPage());
			 shopService.saveSyncShop(shopList);
			 page.setCurrentPage( page.getCurrentPage()+1);
			 while(page.getCurrentPage() <= page.getTotalPage()){
				 shopList = shopService.getStaySyncShop(page);
				 if(shopList != null){
					 logger.info("总页数："+page.getTotalPage()+"\t"+"总条数："+page.getTotalResult()+"\t"+"当前页："+page.getCurrentPage());
					 shopService.saveSyncShop(shopList);
				 }
				 page.setCurrentPage( page.getCurrentPage()+1);
			 }
		 }	 

		 logger.info("店铺同步完毕");
	 }
	 
	 /**
	  * 同步商品
	  */
	 public void syncProduct(){
		 logger.info("开始同步商品");
		 Page<String> page = new Page<String>();
		 page.setPageSize(100);
		 List<Mall_product> productList = productService.getStaySyncProduct(page);
		 if(productList != null){
			 logger.info("总页数："+page.getTotalPage()+"\t"+"总条数："+page.getTotalResult()+"\t"+"当前页："+page.getCurrentPage());
/*			 for(Mall_product product:productList){
				 logger.info(product.toString());
			 }*/
			 productService.saveSyncProduct(productList);
			 page.setCurrentPage( page.getCurrentPage()+1);
			 while(page.getCurrentPage() <= page.getTotalPage()){
				 productList = productService.getStaySyncProduct(page);
				 if(productList != null){
					 logger.info("总页数："+page.getTotalPage()+"\t"+"总条数："+page.getTotalResult()+"\t"+"当前页："+page.getCurrentPage());
					 productService.saveSyncProduct(productList);
				 }
				 page.setCurrentPage( page.getCurrentPage()+1);
			 }
			 
		 }

		 logger.info("商品同步完毕");
	 }
	 

}
