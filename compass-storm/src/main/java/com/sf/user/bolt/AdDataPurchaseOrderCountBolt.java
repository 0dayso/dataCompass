package com.sf.user.bolt;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Tuple;
import com.sf.config.ConfKeys;
import com.sf.user.bean.Purchase;
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

public class AdDataPurchaseOrderCountBolt
        implements IRichBolt {
    private static final long serialVersionUID = 2716006364335613235L;
    private static final Logger LOG = LoggerFactory.getLogger(AdDataPurchaseOrderCountBolt.class);
    private OutputCollector collector;
    JedisResourcePool jedisPool;
    private String host;
    private int port;
    private String zkProxyDir;
    private TpsCounter tpsCounter;
    private List<String> dataList;

    public void execute(Tuple input) {
        Purchase adDataVO = (Purchase) input.getValueByField("AdPurchaseOrder");

        int channelId = adDataVO.getChannelid();
        String channelUrlId = adDataVO.getChannelUrlId();
        int type = adDataVO.getType();
        int shop = adDataVO.getShopId();

        String statDate = CalendarFormat.switchFormatDate(adDataVO.getPurchasetime(), "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd");
        StringBuffer countSb = new StringBuffer();
        countSb.append(statDate).append("|").append(channelId).append("|").append(channelUrlId)
                .append("|").append(type).append("|").append(shop);

        StringBuffer sb = new StringBuffer();
        sb.append("adData_visit_ad_orderid_stat_times").append("_");
        sb.append(statDate).append("_").append(channelId).append("_").append(channelUrlId) .append("_").append(type).append("_").append(shop);
          try {
            Jedis jedis = this.jedisPool.getResource();
            try {

                jedis.zincrby(sb.toString(), 1d, countSb.toString());
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