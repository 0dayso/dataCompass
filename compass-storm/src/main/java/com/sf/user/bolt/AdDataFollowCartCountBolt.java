package com.sf.user.bolt;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Tuple;
import com.sf.config.ConfKeys;
import com.sf.user.bean.Cart;
import com.sf.user.bean.Product;
import com.sf.util.CalendarFormat;
import com.sf.util.TpsCounter;
import com.wandoulabs.jodis.JedisResourcePool;
import com.wandoulabs.jodis.RoundRobinJedisPool;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AdDataFollowCartCountBolt
        implements IRichBolt {
    private static final long serialVersionUID = 2716006364335613235L;
    private static final Logger LOG = LoggerFactory.getLogger(AdDataFollowCartCountBolt.class);
    private OutputCollector collector;
    JedisResourcePool jedisPool;
    private String host;
    private int port;
    private String zkProxyDir;
    private TpsCounter tpsCounter;
    private List<String> dataList;

    public void execute(Tuple input) {
        Cart adDataVO = (Cart) input.getValueByField("followcart");
        int type = adDataVO.getType();
        int shop = adDataVO.getShopId();
        int status = adDataVO.getStatus();
        String sku=adDataVO.getSku();
        String county=adDataVO.getCounty();
        int userid=adDataVO.getUserid();
        int productid=adDataVO.getProductId();
        String statDate = CalendarFormat.switchFormatDate(adDataVO.getCtime(), "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd");
       //sku统计表
        StringBuffer countSb = new StringBuffer();
        //countSb.append(statDate).append("|").append(type).append("|").append(shop).append("|").append(sku);
        countSb.append(statDate).append("|").append(type).append("|").append(shop).append("|").append(sku).append("|").append(productid);
        StringBuffer sb = new StringBuffer();
        sb.append("adData_follow_cart_stat_times").append("_");
        sb.append(statDate).append("_").append(type).append("_").append(shop);
        try {
            Jedis jedis = this.jedisPool.getResource();
            try {
                if(status==1) {
                    jedis.zincrby(sb.toString(), 1.0D, countSb.toString());
                }
                else{
                    jedis.zincrby(sb.toString(), -1.0D, countSb.toString());
                }
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

        if(county!=null&&!county.equals("")) {
            //地区统计表
            StringBuffer countycountSb = new StringBuffer();
            countycountSb.append(statDate).append("|").append(type).append("|").append(county);
            StringBuffer countysb = new StringBuffer();
            countysb.append("adData_follow_cart_county_stat_times").append("_");
            countysb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {
                    if (status == 1) {
                        jedis.zincrby(countysb.toString(), 1.0D, countycountSb.toString());
                    } else {
                        jedis.zincrby(countysb.toString(), -1.0D, countycountSb.toString());
                    }
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
        //用户统计表
        StringBuffer usercountSb = new StringBuffer();
        usercountSb.append(statDate).append("|").append(type).append("|").append(userid);
        StringBuffer usersb = new StringBuffer();
        usersb.append("adData_follow_cart_userid_stat_times").append("_");
        usersb.append(statDate).append("_").append(type);
        try {
            Jedis jedis = this.jedisPool.getResource();
            try {
                if(status==1) {
                    jedis.zincrby(usersb.toString(), 1.0D, usercountSb.toString());
                }
                else{
                    jedis.zincrby(usersb.toString(), -1.0D, usercountSb.toString());
                }
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

        //所有sku统计表
        StringBuffer allcountSb = new StringBuffer();
        allcountSb.append(type).append("|").append(sku).append("|").append(productid);;
        StringBuffer allsb = new StringBuffer();
        allsb.append("adData_follow_all_cart_stat_times").append("_");
        allsb.append(type);
        try {
            Jedis jedis = this.jedisPool.getResource();
            try {
                if(status==1) {
                    jedis.zincrby(allsb.toString(), 1.0D, allcountSb.toString());
                }
                else{
                    jedis.zincrby(allsb.toString(), -1.0D, allcountSb.toString());
                }


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

        JSONObject jsonObject = JSONObject.fromObject(adDataVO);
        this.dataList.add(jsonObject.toString());
        if ((this.dataList != null) && (this.dataList.size() >= 1)) try {
            Jedis jedis = this.jedisPool.getResource();
            try {
                sb = new StringBuffer();
                sb.append(ConfKeys.STATISTICS_AD_FOLLOW_CART_DATA_DAY);
                jedis.lpush(sb.toString(), (String[]) this.dataList.toArray(new String[0]));
                this.dataList = new ArrayList();
            } catch (Throwable localThrowable4) {

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