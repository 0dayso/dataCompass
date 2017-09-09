package com.sf.test;

import com.sf.util.TpsCounter;
import com.wandoulabs.jodis.JedisResourcePool;
import com.wandoulabs.jodis.RoundRobinJedisPool;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import net.sf.json.JSONObject;
import redis.clients.jedis.Jedis;

public class TestRedisData extends Thread
{
    private static Random random = new Random();

    private TpsCounter tpsCounter;

    public void run()
    {
        //setAdLinkData(10);
        for (int i = 0; i <10 ; i++) {
            zrank();
        }

    }

    public void zrank(){
        JedisResourcePool jedisPool = RoundRobinJedisPool.create().curatorClient("192.168.1.254:2181", 30000).zkProxyDir("/zk/codis/db_ddsdk/proxy").build();
        try {
            Jedis jedis = jedisPool.getResource();
            try {
                jedis.set("aaa","2222");
                 String value=jedis.get("aaa");

                System.out.println(value);
                //Long a=jedis.zrank("adData_link_uv_2016-06-30","2016-06-30|864566020118548|4");
                jedis.del("adData_link_stat_4_2016-06-30");
               // System.out.println(a);
            }
            catch (Throwable localThrowable1)
            {
                localThrowable1.printStackTrace();
            }
            finally
            {
                if (jedis != null)   try { jedis.close(); } catch (Throwable x2) { } else jedis.close();
            } } catch (Exception e) { e.printStackTrace(); }
    }


    public static void main(String[] args)
    {
        long start = System.currentTimeMillis();
       // for (int i = 0; i < 10; i++) {
            TestRedisData test1 = new TestRedisData();
            test1.start();
      //  }
        long end = System.currentTimeMillis();
        System.out.println((start - end) / 1000L);
    }


}