package com.sf.user.bolt;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Tuple;
import com.sf.user.bean.Visit;
import com.sf.util.CalendarFormat;
import com.sf.util.TpsCounter;
import com.wandoulabs.jodis.JedisResourcePool;
import com.wandoulabs.jodis.RoundRobinJedisPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AdDataSendUseridCountBolt
        implements IRichBolt {
    private static final long serialVersionUID = 2716006364335613235L;
    private static final Logger LOG = LoggerFactory.getLogger(AdDataSendUseridCountBolt.class);
    private OutputCollector collector;
    JedisResourcePool jedisPool;
    private String host;
    private int port;
    private String zkProxyDir;
    private TpsCounter tpsCounter;
    private List<String> dataList;

    public void execute(Tuple input) {
        Visit adDataVO = (Visit) input.getValueByField("Aduserid");

        int channelId = adDataVO.getChannelid();
        String channelUrlId = adDataVO.getChannelUrlId();
        int type = adDataVO.getType();
        int shop = adDataVO.getShopId();
        String sku=adDataVO.getSku();
        String county=adDataVO.getCounty();
        Integer userid=adDataVO.getUserid();
        String statDate = CalendarFormat.switchFormatDate(adDataVO.getVisittime(), "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd");
        //统计表
        StringBuffer countSb = new StringBuffer();
        countSb.append(statDate).append("|").append(channelId).append("|").append(channelUrlId)
                .append("|").append(type).append("|").append(shop);
        StringBuffer sb = new StringBuffer();

        sb.append("adData_visit_ad_userid_stat_times").append("_");
        sb.append(statDate).append("_").append(channelId).append("_").append(channelUrlId)
          .append("_").append(type).append("_").append(shop);
        try {
            Jedis jedis = this.jedisPool.getResource();
            try {
                jedis.zincrby(sb.toString(), 1.0D, countSb.toString());
                jedis.expire(sb.toString(), 172800);

            } catch (Throwable localThrowable1) {

            } finally {
                if (jedis != null) try {
                    jedis.close();
                } catch (Throwable x2) {
                }
                else jedis.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(sku!=null&&!sku.equals("")) {
            //sku统计表
            StringBuffer skucountSb = new StringBuffer();
            skucountSb.append(statDate).append("|").append(sku).append("|").append(shop);
            StringBuffer skusb = new StringBuffer();

            skusb.append("adData_visit_sku_ad_userid_stat_times").append("_");
            skusb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {
                    jedis.zincrby(skusb.toString(), 1.0D, skucountSb.toString());
                    jedis.expire(skusb.toString(), 172800);

                } catch (Throwable localThrowable1) {

                } finally {
                    if (jedis != null) try {
                        jedis.close();
                    } catch (Throwable x2) {
                    }
                    else jedis.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if(county!=null&&!county.equals("")) {
            //地区统计表
            StringBuffer countycountSb = new StringBuffer();
            countycountSb.append(statDate).append("|").append(county);
            StringBuffer countysb = new StringBuffer();

            countysb.append("adData_visit_county_ad_userid_stat_times").append("_");
            countysb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {
                    jedis.zincrby(countysb.toString(), 1.0D, countycountSb.toString());
                    jedis.expire(countysb.toString(), 172800);

                } catch (Throwable localThrowable1) {

                } finally {
                    if (jedis != null) try {
                        jedis.close();
                    } catch (Throwable x2) {
                    }
                    else jedis.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if(userid!=null&&userid!=0) {
            //用户统计表
            StringBuffer usercountSb = new StringBuffer();
            usercountSb.append(statDate).append("|").append(userid);
            StringBuffer usersb = new StringBuffer();

            usersb.append("adData_visit_userid_ad_userid_stat_times").append("_");
            usersb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {
                    jedis.zincrby(usersb.toString(), 1.0D, usercountSb.toString());
                    jedis.expire(usersb.toString(), 172800);

                } catch (Throwable localThrowable1) {

                } finally {
                    if (jedis != null) try {
                        jedis.close();
                    } catch (Throwable x2) {
                    }
                    else jedis.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        this.collector.ack(input);
    }


    public void prepare(Map conf, TopologyContext context, OutputCollector collector) {
        this.collector = collector;
        this.host = conf.get("redis_host_key").toString();
        this.port = Integer.valueOf(conf.get("zk_port_key").toString()).intValue();
        this.zkProxyDir = conf.get("zk_proxy_dir").toString();
        StringBuffer hostPort = new StringBuffer();
        hostPort.append(this.host).append(":").append(this.port);
        this.jedisPool = RoundRobinJedisPool.create().curatorClient(hostPort.toString(), 30000).zkProxyDir(this.zkProxyDir).build();

        this.dataList = new ArrayList();

        this.tpsCounter = new TpsCounter(context.getThisComponentId() + ":" + context.getThisTaskId());
        LOG.info("Finished preparation " + conf);
    }

    public void declareOutputFields(OutputFieldsDeclarer declarer) {
    }

    public void cleanup() {
        this.tpsCounter.cleanup();
        LOG.info("Finish cleanup");
    }

    public Map<String, Object> getComponentConfiguration() {
        return null;
    }
}