package com.sf.user.spout;

import backtype.storm.spout.SpoutOutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichSpout;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Values;
import com.alibaba.jstorm.client.ConfigExtension;
import com.alibaba.jstorm.utils.JStormUtils;
import com.sf.config.ConfKeys;
import com.sf.user.bean.Purchase;
import com.sf.user.bean.PurchaseCancel;
import com.sf.util.TpsCounter;
import com.wandoulabs.jodis.JedisResourcePool;
import com.wandoulabs.jodis.RoundRobinJedisPool;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;

import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

public class AdDataPurchaseCancelOrderSpout
  implements IRichSpout
{
  private static final long serialVersionUID = -6260803932233430770L;
  private static final Logger LOG = LoggerFactory.getLogger(AdDataPurchaseCancelOrderSpout.class);
  private SpoutOutputCollector collector;
  JedisResourcePool jedisPool;
  private String host;
  private int port;
  private String zkProxyDir;
  private long tupleId;
  private long succeedCount;
  private long failedCount;
  private AtomicLong handleCounter = new AtomicLong(0L);
  private TpsCounter tpsCounter;
  private boolean isLimited = false;
  private long SPOUT_MAX_SEND_NUM;
  private boolean isFinished;
  private Long MAX_PENDING_COUNTER;
  private int bufferLen = 0;

  public void nextTuple()
  {
    if (!this.isLimited) {
      emit();
      return;
    }
    if (this.isFinished == true) {
      LOG.info("Finish sending ");
      JStormUtils.sleepMs(10000L);
      return;
    }
    if (this.tupleId > this.SPOUT_MAX_SEND_NUM) {
      this.isFinished = true;
      return;
    }
    emit();
  }

  public void emit() {
    try {
      Jedis jedis = this.jedisPool.getResource(); 
      try { String adDataRedis = jedis.rpop(ConfKeys.STORM_AD_PURCHASE_CANCEL_ORDERID_DATA);
        if ((adDataRedis == null) || ("nil".equals(adDataRedis))) {
          try {
            Thread.sleep(300L);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
        else {
          JSONObject adDataObject = JSONObject.fromObject(adDataRedis);
          PurchaseCancel adVO = (PurchaseCancel)JSONObject.toBean(adDataObject, PurchaseCancel.class);
          this.collector.emit(new Values(new Object[] { Long.valueOf(this.tupleId), adVO }), Long.valueOf(this.tupleId));
          this.tupleId += 1L;
          this.handleCounter.incrementAndGet();
          while (this.handleCounter.get() >= this.MAX_PENDING_COUNTER.longValue() - 1L)
            try {
              Thread.sleep(1L);
            }
            catch (InterruptedException e)
            {
            }
          this.tpsCounter.count();
        }
      }
      catch (Throwable localThrowable1)
      {
        
      }
      finally
      {
        if (jedis != null)  try { jedis.close(); } catch (Throwable x2) {  } else jedis.close();  
      } } catch (Exception e) { e.printStackTrace(); }

  }

  public void open(Map conf, TopologyContext context, SpoutOutputCollector collector)
  {
    this.collector = collector;
    this.host = conf.get("redis_host_key").toString();
    this.port = Integer.valueOf(conf.get("zk_port_key").toString()).intValue();

    this.zkProxyDir = conf.get("zk_proxy_dir").toString();
    StringBuffer hostPort = new StringBuffer();
    hostPort.append(this.host).append(":").append(this.port);
    this.jedisPool = RoundRobinJedisPool.create().curatorClient(hostPort.toString(), 30000).zkProxyDir(this.zkProxyDir).build();

    if (conf.get("spout.max.sending.num") == null) {
      this.isLimited = false;
    } else {
      this.isLimited = true;
      this.SPOUT_MAX_SEND_NUM = JStormUtils.parseLong(conf.get("spout.max.sending.num")).longValue();
    }

    this.isFinished = false;

    this.tpsCounter = new TpsCounter(context.getThisComponentId() + ":" + context.getThisTaskId());

    this.MAX_PENDING_COUNTER = Long.valueOf(getMaxPending(conf));
    this.bufferLen = JStormUtils.parseInt(conf.get("byte.buffer.len"), 0).intValue();
  }

  public void declareOutputFields(OutputFieldsDeclarer declarer)
  {
    declarer.declare(new Fields(new String[] { "id", "AdPurchaseCancelOrder" }));
  }

  public long getMaxPending(Map conf)
  {
    if (ConfigExtension.isSpoutSingleThread(conf)) {
      return 9223372036854775807L;
    }

    Object pending = conf.get("topology.max.spout.pending");
    if (pending == null) {
      return 9223372036854775807L;
    }

    int pendingNum = JStormUtils.parseInt(pending).intValue();
    if (pendingNum == 1) {
      return 9223372036854775807L;
    }

    return pendingNum;
  }

  public void close()
  {
    this.tpsCounter.cleanup();
    LOG.info("Sending :" + this.tupleId + ", success:" + this.succeedCount + ", failed:" + this.failedCount);
  }

  public void activate()
  {
    LOG.info("Start active");
  }

  public void deactivate()
  {
    LOG.info("Start deactive");
  }

  public void ack(Object id)
  {
    Long tupleId = (Long)id;

    this.succeedCount += 1L;
    this.handleCounter.decrementAndGet();
  }

  public void fail(Object id)
  {
    this.failedCount += 1L;
    this.handleCounter.decrementAndGet();
    Long failId = (Long)id;
    LOG.info("Failed to handle " + failId);
  }

  public Map<String, Object> getComponentConfiguration()
  {
    return null;
  }
}