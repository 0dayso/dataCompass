package com.shifeng.service.data.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.channel.Channelurl;
import com.shifeng.entity.data.Data;
import com.shifeng.service.data.DataService;
import com.shifeng.util.Const;
import com.shifeng.util.Constants;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;
import redis.clients.jedis.Tuple;
@Service("dataService")
public class DataServiceImpl implements DataService{

	protected Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	
	/**
	 * 保存访问量统计信息
	 * @param dataList
	 * @throws Exception
	 */
	public void saveVisit(List<Data> dataList,String ym)throws Exception{
		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.saveVisitList", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.saveVisitList", map);
        }
    }
		




	/**
	 * 保存注册量统计信息
	 * @param dataList
	 * @throws Exception
	 */
	public void saveRegister(List<Data> dataList,String ym)throws Exception{
		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.saveRegisterList", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.saveRegisterList", map);
        }
    }

	/**
	 * 保存购买数量统计信息
	 * @param dataList
	 * @throws Exception
	 */
	public void savePurchase(List<Data> dataList,String ym)throws Exception{
		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.savePurchaseList", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.savePurchaseList", map);
        }
    }
	


	/**
	 * 保存购买金额统计信息
	 * @param list
	 * @throws Exception
	 */
	public void saveAmount(List<Data> dataList,String ym)throws Exception{

		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.saveAmountList", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.saveAmountList", map);
        }
	}
	
	


	/**
	 * 保存购买金额合计统计信息
	 * @param dataList
	 * @throws Exception
	 */
	public void savePayamount(List<Data> dataList,String ym)throws Exception{

		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.savePayamountList", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.savePayamountList", map);
        }
	}
	


	/**
	 * 保存统计订单数量
	 * @param list
	 * @throws Exception
	 */
	public void saveOrdernum(List<Data> dataList,String ym)throws Exception{

		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.saveOrdernum", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.saveOrdernum", map);
        }
	}
	


	/**
	 * 保存统计访客数
	 * @param list
	 * @throws Exception
	 */
	public void saveUv(List<Data> dataList,String ym)throws Exception{

		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.saveUv", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.saveUv", map);
        }
	}
	

	
	/**
	 * 保存访问用户数
	 * @param list
	 * @throws Exception
	 */
	public void saveVisitusernum(List<Data> dataList,String ym)throws Exception{

		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.saveVisitusernum", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.saveVisitusernum", map);
        }
	}
	
	


	/**
	 * 保存访问Cookie
	 * @param list
	 * @throws Exception
	 */
	public void saveCookie(List<Data> dataList,String ym)throws Exception{

		int size = dataList.size();
        List<Data> insertList = new ArrayList<Data>();
        Map<String,Object> map = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        for (int k = 0; k < size; k++) {
            insertList.add(dataList.get(k));
            if (k > 0 && k % 100 == 0) {
            	map.clear();
            	map.put("nowYearMonth", nowYearMonth);
            	map.put("insertList", insertList);
            	dao.save("DataMapper.saveCookie", map);
                insertList = new ArrayList<Data>();
            }
        }
        if (insertList.size() > 0) {
        	map.clear();
        	map.put("nowYearMonth", nowYearMonth);
        	map.put("insertList", insertList);
        	dao.save("DataMapper.saveCookie", map);
        }
	}
	


	/**
	 * 保存退换货
	 * @param list
	 * @throws Exception
	 */
	public void saveTuiHuanHuo(List<Data> dataList,String ym)throws Exception{
		int size = dataList.size();
        List<Data> insertList1 = new ArrayList<Data>();
        Map<String,Object> map1 = new HashMap<String,Object>();
        List<Data> insertList2 = new ArrayList<Data>();
        Map<String,Object> map2 = new HashMap<String,Object>();
        List<Data> insertList3 = new ArrayList<Data>();
        Map<String,Object> map3 = new HashMap<String,Object>(); 
        String nowYearMonth = ym;//DateUtil.getNowYearMonth();
        
        for (int k = 0; k < size; k++) {
        	Data data = dataList.get(k);
        	if(data.getCancelordernum() != null){
                insertList1.add(data);
                if (insertList1.size() >= 100) {
                	map1.clear();
                	map1.put("nowYearMonth", nowYearMonth);
                	map1.put("insertList", insertList1);
                	dao.save("DataMapper.saveQuXiaoDingDan", map1);
                    insertList1.clear();
                }
        	}else if(data.getReturnordernum() != null){
                    insertList2.add(data);
                    if (insertList2.size() >= 100) {
                    	map2.clear();
                    	map2.put("nowYearMonth", nowYearMonth);
                    	map2.put("insertList", insertList2);
                    	dao.save("DataMapper.saveTuiHuo", map2);
                        insertList2.clear();
                    }
            }else if(data.getExchangeordernum() != null){
                insertList3.add(data);
                if (insertList3.size() >= 100) {
                	map3.clear();
                	map3.put("nowYearMonth", nowYearMonth);
                	map3.put("insertList", insertList3);
                	dao.save("DataMapper.saveHuanHuo", map3);
                    insertList3.clear();
                }
            }
        }
        if (insertList1.size() > 0) {
        	map1.clear();
        	map1.put("nowYearMonth", nowYearMonth);
        	map1.put("insertList", insertList1);
        	dao.save("DataMapper.saveQuXiaoDingDan", map1);
        }
        if (insertList2.size() > 0) {
        	map2.clear();
        	map2.put("nowYearMonth", nowYearMonth);
        	map2.put("insertList", insertList2);
        	dao.save("DataMapper.saveTuiHuo", map2);
        }
        if (insertList3.size() > 0) {
        	map3.clear();
        	map3.put("nowYearMonth", nowYearMonth);
        	map3.put("insertList", insertList3);
        	dao.save("DataMapper.saveHuanHuo", map3);
        }
	}
	
	


	/**
	 * 统计订单支付数量
	 * @param beforeDay 几天前 |当天0
	 * @throws Exception
	 */
	public void tongJiPayOrderNum(int beforeDay) {
		  logger.info("【开始执行统计访问量任务】");

		  long nowTime = System.currentTimeMillis();

			String now = DateUtil.YYYY_MM_DDgetBeforDay(beforeDay);
			String ym = DateUtil.getYM(now);
			logger.info("日期:" + now + "     年月：" + ym);
			 
			 List<String> shops = RedisTool.lrange(String.format(Const.STATISTICS_AD_SHOP_ID, now), 0, -1);
			 List<String> types = RedisTool.lrange(String.format(Const.STATISTICS_AD_TYPE_ID, now), 0, -1);
			 logger.info("**shops**"+shops);
			 logger.info("**types**"+types);   
	         
	       List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       logger.info("共有"+strList.size()+"个渠道");
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				logger.info(str);
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				logger.info("******************"+jsonobject);
	 				if(jsonobject != null){
	 					for(String shopId:shops){
	 						 for(String type:types){  
	 							 
	 		 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 		 				    List<Data> list = null;
	 		 				    String dataKey = String.format(Const.STATISTICS_PAY_NUMBER_AD_TOSAVE, now, channelurl.getCid(),channelurl.getId(),type,shopId);
	 		 					logger.info("-------key-------"+dataKey);
	 		 					long count = RedisTool.zcard(dataKey);
	 		 					logger.info("--------------"+count);
	 		 	                int times = (int) count / Constants.RECORD_COUNT;
	 		 	                long remainder = count % Constants.RECORD_COUNT;
	 		 	                long start = 0;
	 		 	                long end = 0;
	 		 	                int flag = 0;
	 		 	                if (remainder > 0) {
	 		 	                    flag = 1;
	 		 	                }
	 		 	                flag += times;

	 		 	                list = new ArrayList<Data>();
	 		 	                for (int j = 0; j < flag; j++) {
	 		 	                    start = (j * Constants.RECORD_COUNT);
	 		 	                    end = (start + Constants.RECORD_COUNT - 1);
	 		 	                    Set<Tuple> adDataList = RedisTool.zrangeWithScores(dataKey, start, end);
	 		 	                    for (Tuple tuple : adDataList) {
	 		 	                        String keys = tuple.getElement();
	 		 	                        logger.info("-------keys-------"+keys);
	 		 	                        int score = (int) tuple.getScore();
	 		 	                        if (keys != null) {
	 		 	                            String[] key = keys.split("\\|");
	 		 	                            Data data = new Data();
	 		 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 		 	                            data.setChannelid(channelurl.getCid());
	 		 	                            data.setChannelurlid(channelurl.getId());
	 		 	                            data.setType(Integer.parseInt(type));
	 		 	                            data.setShopId(Integer.parseInt(shopId));
	 		 	                            data.setPayordernum(score);
	 		 	                            list.add(data);
	 		 	                        }
	 		 	                    }
	 		 	                }
	 		 	            if (null != list && list.size() > 0) {
	 		 	            	try {
	 		 	          		int size = list.size();
	 		 	              List<Data> insertList = new ArrayList<Data>();
	 		 	              Map<String,Object> map = new HashMap<String,Object>(); 
	 		 	              for (int k = 0; k < size; k++) {
	 		 	                  insertList.add(list.get(k));
	 		 	                  if (k > 0 && k % 100 == 0) {
	 		 	                  	map.clear();
	 		 	                  	map.put("nowYearMonth", ym);
	 		 	                  	map.put("insertList", insertList);
	 		 	                  	dao.save("DataMapper.savePayOrderNum", map);
	 		 	                    insertList.clear();
	 		 	                  }
	 		 	              }
	 		 	              if (insertList.size() > 0) {
	 		 	              	map.clear();
	 		 	              	map.put("nowYearMonth", ym);
	 		 	              	map.put("insertList", insertList);
	 		 	              	dao.save("DataMapper.savePayOrderNum", map);
	 		 	              }
	 							} catch (Exception e) {
	 								// TODO Auto-generated catch block
	 								e.printStackTrace();
	 							}
	 		 	            }
	 		 					
	 		 				} 
	 						 }
	 					}

	 			}
	 		}
	 		long lastTime = System.currentTimeMillis();
	        logger.info("【统计访问量任务结束，耗时："+(lastTime - nowTime) / 1000+"s】");
		
	}
}
