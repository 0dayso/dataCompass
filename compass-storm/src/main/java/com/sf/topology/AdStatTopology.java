package com.sf.topology;

import backtype.storm.Config;
import backtype.storm.LocalCluster;
import backtype.storm.StormSubmitter;
import backtype.storm.generated.AlreadyAliveException;
import backtype.storm.generated.InvalidTopologyException;
import backtype.storm.generated.TopologyAssignException;
import backtype.storm.topology.TopologyBuilder;
import backtype.storm.tuple.Fields;
import com.alibaba.jstorm.utils.JStormUtils;
import com.alibaba.jstorm.utils.LoadConf;
import com.sf.config.ConfValues;
import com.sf.user.bean.*;
import com.sf.user.bolt.*;
import com.sf.user.spout.*;

import java.io.PrintStream;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AdStatTopology
{
  private TopologyBuilder builder = new TopologyBuilder();
  private LocalCluster cluster;
  private static Logger LOG = LoggerFactory.getLogger(AdStatTopology.class);
  public static final String TOPOLOGY_SPOUT_PARALLELISM_HINT = "spout.parallel";
  public static final String TOPOLOGY_BOLT_PARALLELISM_HINT = "bolt.parallel";
  public static final String TOPOLOGY_BOLT_COUNT_PARALLELISM_HINT = "bolt.count.parallel";
  public static final String TOPOLOGY_BOLT_SEND_COUNT_PARALLELISM_HINT = "bolt.send.count.parallel";
  private static Map conf = new HashMap();

  public static void SetBuilder(TopologyBuilder builder, Map conf)
  {
    int spout_Parallelism_hint = JStormUtils.parseInt(conf.get("spout.parallel"), 1).intValue();

    int bolt_Parallelism_hint = JStormUtils.parseInt(conf.get("bolt.parallel"), 2).intValue();

    int bolt_Count_Parallelism_hint = JStormUtils.parseInt(conf.get("bolt.count.parallel"), 1).intValue();

    int bolt_send_Count_Parallelism_hint = JStormUtils.parseInt(conf.get("bolt.send.count.parallel"), 1).intValue();
    //访问
    builder.setSpout("adDataSendSpout", new AdDataSendSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataSendBolt", new AdDataSendBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataSendSpout");
    builder.setBolt("adDataSendCountBolt", new AdDataSendCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataSendBolt", "adData_send_count_stream", new Fields(new String[] { "ip" }));
    //ip访问
    builder.setSpout("adDataSendIPSpout", new AdDataSendIPSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataSendIPBolt", new AdDataSendIPBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataSendIPSpout");
    builder.setBolt("adDataSendIPCountBolt", new AdDataSendIPCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataSendIPBolt", "adData_send_ip_count_stream", new Fields(new String[] { "ip" }));
    //用户id访问
    builder.setSpout("adDataSendUseridSpout", new AdDataSendUseridSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataSendUseridBolt", new AdDataSendUseridBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataSendUseridSpout");
    builder.setBolt("adDataSendUseridCountBolt", new AdDataSendUseridCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataSendUseridBolt", "adData_send_userid_count_stream", new Fields(new String[] { "ip" }));

    //用户cookie访问
    builder.setSpout("adDataSendUsercookieSpout", new AdDataSendUsercookieSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataSendUsercookieBolt", new AdDataSendUsercookieBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataSendUsercookieSpout");
    builder.setBolt("adDataSendUsercookieCountBolt", new AdDataSendUsercookieCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataSendUsercookieBolt", "adData_send_cookie_count_stream", new Fields(new String[] { "cookie" }));

    //购买
    builder.setSpout("adDataPurchaseSpout", new AdDataPurchaseSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataPurchaseBolt", new AdDataPurchaseBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataPurchaseSpout");
    builder.setBolt("adDataPurchaseCountBolt", new AdDataPurchaseCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataPurchaseBolt", "adData_purchase_count_stream", new Fields(new String[] { "ip" }));
    //购买订单
    builder.setSpout("adDataPurchaseOrderSpout", new AdDataPurchaseOrderSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataPurchaseOrderBolt", new AdDataPurchaseOrderBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataPurchaseOrderSpout");
    builder.setBolt("adDataPurchaseOrderCountBolt", new AdDataPurchaseOrderCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataPurchaseOrderBolt", "adData_purchase_order_count_stream", new Fields(new String[] { "ip" }));

    //关注商品
    builder.setSpout("adDataFollowSkuSpout", new AdDataFollowSkuSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataFollowSkuBolt", new AdDataFollowSkuBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataFollowSkuSpout");
    builder.setBolt("adDataFollowSkuCountBolt", new AdDataFollowSkuCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataFollowSkuBolt", "adData_follow_sku_count_stream", new Fields(new String[] { "ip" }));



    //关注店铺
    builder.setSpout("adDataFollowShopSpout", new AdDataFollowShopSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataFollowShopBolt", new AdDataFollowShopBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataFollowShopSpout");
    builder.setBolt("adDataFollowShopCountBolt", new AdDataFollowShopCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataFollowShopBolt", "adData_follow_shop_count_stream", new Fields(new String[] { "ip" }));


    //购物车
    builder.setSpout("adDataFollowCartSpout", new AdDataFollowCartSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataFollowCartBolt", new AdDataFollowCartBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataFollowCartSpout");
    builder.setBolt("adDataFollowCartCountBolt", new AdDataFollowCartCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataFollowCartBolt", "adData_follow_cart_count_stream", new Fields(new String[] { "ip" }));



    //取消订单
    builder.setSpout("adDataPurchaseCancelOrderSpout", new AdDataPurchaseCancelOrderSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataPurchaseCancelOrderBolt", new AdDataPurchaseCancelOrderBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataPurchaseCancelOrderSpout");
    builder.setBolt("adDataPurchaseCancelOrderCountBolt", new AdDataPurchaseCancelOrderCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataPurchaseCancelOrderBolt", "adData_purchase_cancel_order_count_stream", new Fields(new String[] { "ip" }));


    //注册
    builder.setSpout("adDataRegisterSpout", new AdDataRegisterSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataRegisterBolt", new AdDataRegisterBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataRegisterSpout");
    builder.setBolt("adDataRegisterCountBolt", new AdDataRegisterCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataRegisterBolt", "adData_register_count_stream", new Fields(new String[] { "ip" }));
    //搜索
    builder.setSpout("adDataSearchSpout", new AdDataSearchSpout(), spout_Parallelism_hint);
    builder.setBolt("adDataSearchBolt", new AdDataSearchBolt(), bolt_Parallelism_hint).shuffleGrouping("adDataSearchSpout");
    builder.setBolt("adDataSearchCountBolt", new AdDataSearchCountBolt(), (bolt_send_Count_Parallelism_hint)).fieldsGrouping("adDataSearchBolt", "adData_search_count_stream", new Fields(new String[] { "ip" }));



    boolean kryoEnable = JStormUtils.parseBoolean(conf.get("kryo.enable"), false);

    if (kryoEnable == true) {
      System.out.println("Use Kryo ");
      boolean useJavaSer = JStormUtils.parseBoolean(conf.get("fall.back.on.java.serialization"), true);

      Config.setFallBackOnJavaSerialization(conf, useJavaSer);
      Config.registerSerialization(conf, Visit.class);
      Config.registerSerialization(conf, Purchase.class);
      Config.registerSerialization(conf, PurchaseCancel.class);
      Config.registerSerialization(conf, Register.class);
      Config.registerSerialization(conf, Visit.class);
      Config.registerSerialization(conf, Product.class);
      Config.registerSerialization(conf, Shop.class);
      Config.registerSerialization(conf, Cart.class);

    }

    int ackerNum = JStormUtils.parseInt(conf.get("topology.acker.executors"), 1).intValue();

    Config.setNumAckers(conf, ackerNum);

    int workerNum = JStormUtils.parseInt(conf.get("topology.workers"), 20).intValue();

    conf.put("topology.workers", (workerNum));
    conf.put("redis_host_key", ConfValues.REDIS_HOST);
    conf.put("zk_port_key", ConfValues.ZK_PORT);
    conf.put("zk_proxy_dir", ConfValues.ZK_PROXY_DIR);
  }

  public TopologyBuilder getBuilder()
  {
    return this.builder;
  }

  public LocalCluster getLocalCluster() {
    return this.cluster;
  }

  public static void LoadConf(String arg)
  {
    if (arg.endsWith("yaml"))
      conf = LoadConf.LoadYaml(arg);
    else
      conf = LoadConf.LoadProperty(arg);
  }

  public static boolean local_mode(Map conf)
  {
    String mode = (String)conf.get("storm.cluster.mode");
    if ((mode != null) && 
      (mode.equals("local"))) {
      return true;
    }

    return false;
  }

  public static void SetLocalTopology() throws Exception {
    TopologyBuilder builder = new TopologyBuilder();
    conf.put("bolt.parallel", (1));
    SetBuilder(builder, conf);

    LOG.debug("test");
    LOG.info("Submit log");
    LocalCluster cluster = new LocalCluster();
    cluster.submitTopology("sf_sdk_stat", conf, builder.createTopology());

   /* Thread.sleep(600000L);

    cluster.killTopology("sf_sdk_stat");

    cluster.shutdown();*/
  }

  public static void SetRemoteTopology()
    throws AlreadyAliveException, InvalidTopologyException, TopologyAssignException
  {
    String streamName = (String)conf.get("topology.name");
    if (streamName == null) {
      streamName = "sf_sdk_stat";
    }
    TopologyBuilder builder = new TopologyBuilder();
    SetBuilder(builder, conf);
    conf.put("storm.cluster.mode", "distributed");

    StormSubmitter.submitTopology(streamName, conf, builder.createTopology());
  }

  public static void main(String[] args) throws Exception
  {

    if (args.length == 0) {
       args= new String[]{"confAd.yaml"};
      System.err.println("Please input configuration file");
      /*System.exit(-1);*/
    }
    LoadConf(args[0]);
    if (local_mode(conf))
      SetLocalTopology();
    else
      SetRemoteTopology();
  }
}