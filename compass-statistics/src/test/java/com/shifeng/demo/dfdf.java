package com.shifeng.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.shifeng.entity.channel.Channelurl;
import com.shifeng.entity.data.Data;
import com.shifeng.util.Const;
import com.shifeng.util.Constants;
import com.shifeng.util.DateUtil;
import com.shifeng.util.redis.RedisTool;

import net.sf.json.JSONObject;
import redis.clients.jedis.Tuple;

public class dfdf {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		   List<String> strList = RedisTool.lrange(Const.INTERFACE_CHANNEL_URL_LIST, 0, -1);
	       System.out.println("*********strList.size*********"+strList.size());
	 		if(strList.size()>0){
	 			for(String str:strList){
	 				System.out.println(str);
	 				
	 				JSONObject jsonobject = JSONObject.fromObject(str);
	 				System.out.println("******************"+jsonobject);
	 				if(jsonobject != null){
	 					
	 					Channelurl channelurl = (Channelurl)JSONObject.toBean(jsonobject, Channelurl.class);
	 					System.out.println(channelurl.getUrl());
	 					
	 				    List<Data> list = null;
	 					StringBuffer sb = new StringBuffer();
	 					sb.append("adData_pay_amount_ad_stat_times").append("_").append(DateUtil.getYYYY_MM_DD()).append("_").append(channelurl.getCid()).append("_").append(channelurl.getId());

	 					System.out.println("-------key-------"+sb.toString());
	 					long count = RedisTool.zcard(sb.toString());
	 					System.out.println("--------------"+count);
	 					
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
	 	                    Set<Tuple> adDataList = RedisTool.zrangeWithScores(sb.toString(), start, end);
	 	                    for (Tuple tuple : adDataList) {
	 	                        String keys = tuple.getElement();
	 	                        System.out.println("-------keys-------"+keys);
	 	                        double  score = tuple.getScore();
	 	                        if (keys != null) {
	 	                            String[] key = keys.split("\\|");
	 	                            
	 	                          Data data = new Data();
	 	                            data.setCdate(DateUtil.YYYY_MM_DDfomatDate(key[0]));
	 	                            data.setChannelid(channelurl.getCid());
	 	                            data.setChannelurlid(channelurl.getId());
	 	                            data.setPayamount(score);
	 	                            list.add(data);
	 	                        }
	 	                    }
	 	               }
	 				}
	 			}
 	            

	 	          
	 	           

	 			 

	 			}
	}

}
