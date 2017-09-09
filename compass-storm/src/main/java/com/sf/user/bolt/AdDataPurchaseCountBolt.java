package com.sf.user.bolt;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Tuple;
import com.sf.config.ConfKeys;
import com.sf.user.bean.Purchase;
import com.sf.user.bean.Visit;
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

public class AdDataPurchaseCountBolt
        implements IRichBolt {
    private static final long serialVersionUID = 2716006364335613235L;
    private static final Logger LOG = LoggerFactory.getLogger(AdDataPurchaseCountBolt.class);
    private OutputCollector collector;
    JedisResourcePool jedisPool;
    private String host;
    private int port;
    private String zkProxyDir;
    private TpsCounter tpsCounter;
    private List<String> dataList;

    public void execute(Tuple input) {
        Purchase adDataVO = (Purchase) input.getValueByField("AdPurchase");

        int channelId = adDataVO.getChannelid();
        String channelUrlId = adDataVO.getChannelUrlId();
        int number = adDataVO.getNumber();
        double amount = adDataVO.getAmount();
        int status = adDataVO.getStatus();
        int type = adDataVO.getType();
        int shop = adDataVO.getShopId();
        String sku = adDataVO.getSku();
        String county = adDataVO.getCounty();
        Integer userid = adDataVO.getUserid();
        String statDate = CalendarFormat.switchFormatDate(adDataVO.getPurchasetime(), "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd");

        StringBuffer sb = new StringBuffer();
        //统计表
        //订单数量
        if (status == 0) {
            StringBuffer countSb = new StringBuffer();
            countSb.append(statDate).append("|").append(channelId).append("|").append(channelUrlId)
                    .append("|").append(type).append("|").append(shop);

            sb.append("adData_purchase_ad_stat_times").append("_");
            sb.append(statDate).append("_").append(channelId).append("_").append(channelUrlId).append("_").append(type).append("_").append(shop);

            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(sb.toString(), number + 0d, countSb.toString());
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

            //购买
            StringBuffer amountcountSb = new StringBuffer();
            amountcountSb.append(statDate).append("|").append(channelId).append("|").append(channelUrlId)
                    .append("|").append(type).append("|").append(shop);
            StringBuffer amountsb = new StringBuffer();
            amountsb.append("adData_purchase_amount_ad_stat_times").append("_");
            amountsb.append(statDate).append("_").append(channelId).append("_").append(channelUrlId).append("_").append(type).append("_").append(shop);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(amountsb.toString(), amount + 0d, amountcountSb.toString());
                    jedis.expire(amountsb.toString(), 172800);

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

        if (status == 1) {
            //支付
            StringBuffer payamountcountSb = new StringBuffer();
            payamountcountSb.append(statDate).append("|").append(channelId).append("|").append(channelUrlId)
                    .append("|").append(type).append("|").append(shop);
            StringBuffer paysb = new StringBuffer();
            paysb.append("adData_pay_amount_ad_stat_times").append("_");
            paysb.append(statDate).append("_").append(channelId).append("_").append(channelUrlId).append("_").append(type).append("_").append(shop);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(paysb.toString(), amount + 0d, payamountcountSb.toString());
                    jedis.expire(paysb.toString(), 172800);

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

            //支付订单数量
            StringBuffer paynumbercountSb = new StringBuffer();
            paynumbercountSb.append(statDate).append("|").append(channelId).append("|").append(channelUrlId)
                    .append("|").append(type).append("|").append(shop);
            StringBuffer paynumbersb = new StringBuffer();
            paynumbersb.append("adData_pay_nunmber_ad_stat_times").append("_");
            paynumbersb.append(statDate).append("_").append(channelId).append("_").append(channelUrlId).append("_").append(type).append("_").append(shop);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(paynumbersb.toString(), 1d, paynumbercountSb.toString());
                    jedis.expire(paynumbersb.toString(), 172800);

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
        //sku统计表
        //订单数量
        if (status == 0) {
            StringBuffer skucountSb = new StringBuffer();
            skucountSb.append(statDate).append("|").append(sku).append("|").append(shop);
            StringBuffer skusb = new StringBuffer();
            skusb.append("adData_purchase_sku_ad_stat_times").append("_");
            skusb.append(statDate).append("_").append(type);

            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(skusb.toString(), number + 0d, skucountSb.toString());
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
            //购买
            StringBuffer skuamountcountSb = new StringBuffer();
            skuamountcountSb.append(statDate).append("|").append(sku).append("|").append(shop);
            StringBuffer skuamountsb = new StringBuffer();
            skuamountsb.append("adData_purchase_sku_amount_ad_stat_times").append("_");
            skuamountsb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(skuamountsb.toString(), amount + 0d, skuamountcountSb.toString());
                    jedis.expire(skuamountsb.toString(), 172800);

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
        if (status == 1) {
            //支付
            StringBuffer skupayamountcountSb = new StringBuffer();
            skupayamountcountSb.append(statDate).append("|").append(sku).append("|").append(shop);
            StringBuffer skupaysb = new StringBuffer();
            skupaysb.append("adData_pay_sku_amount_ad_stat_times").append("_");
            skupaysb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(skupaysb.toString(), amount + 0d, skupayamountcountSb.toString());
                    jedis.expire(skupaysb.toString(), 172800);

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

            StringBuffer skupaynumbercountSb = new StringBuffer();
            skupaynumbercountSb.append(statDate).append("|").append(sku).append("|").append(shop);
            StringBuffer skupaynumbersb = new StringBuffer();
            skupaynumbersb.append("adData_pay_sku_number_ad_stat_times").append("_");
            skupaynumbersb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(skupaynumbersb.toString(), 1d, skupaynumbercountSb.toString());
                    jedis.expire(skupaynumbersb.toString(), 172800);

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
        if (status == 0) {
            //地区统计表
            //订单数量
            StringBuffer countycountSb = new StringBuffer();
            countycountSb.append(statDate).append("|").append(county);
            StringBuffer countysb = new StringBuffer();
            countysb.append("adData_purchase_county_ad_stat_times").append("_");
            countysb.append(statDate).append("_").append(type);

            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(countysb.toString(), number + 0d, countycountSb.toString());
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
            //购买
            StringBuffer countyamountcountSb = new StringBuffer();
            countyamountcountSb.append(statDate).append("|").append(county);
            StringBuffer countyamountsb = new StringBuffer();
            countyamountsb.append("adData_purchase_county_amount_ad_stat_times").append("_");
            countyamountsb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(countyamountsb.toString(), amount + 0d, countyamountcountSb.toString());
                    jedis.expire(countyamountsb.toString(), 172800);

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

        if (status == 1) {
            //支付
            StringBuffer countypayamountcountSb = new StringBuffer();
            countypayamountcountSb.append(statDate).append("|").append(county);
            StringBuffer countypaysb = new StringBuffer();
            countypaysb.append("adData_pay_county_amount_ad_stat_times").append("_");
            countypaysb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(countypaysb.toString(), amount + 0d, countypayamountcountSb.toString());
                    jedis.expire(countypaysb.toString(), 172800);

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

            StringBuffer countypaynumbercountSb = new StringBuffer();
            countypaynumbercountSb.append(statDate).append("|").append(county);
            StringBuffer countypaynumbersb = new StringBuffer();
            countypaynumbersb.append("adData_pay_county_number_ad_stat_times").append("_");
            countypaynumbersb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(countypaynumbersb.toString(), 1d, countypaynumbercountSb.toString());
                    jedis.expire(countypaynumbersb.toString(), 172800);

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
        if (status == 0) {
            //用户统计表
            //订单数量
            StringBuffer useridcountSb = new StringBuffer();
            useridcountSb.append(statDate).append("|").append(userid);
            StringBuffer useridsb = new StringBuffer();
            useridsb.append("adData_purchase_userid_ad_stat_times").append("_");
            useridsb.append(statDate).append("_").append(type);

            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(useridsb.toString(), number + 0d, useridcountSb.toString());
                    jedis.expire(useridsb.toString(), 172800);

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
            //购买
            StringBuffer useridamountcountSb = new StringBuffer();
            useridamountcountSb.append(statDate).append("|").append(userid);
            StringBuffer useridamountsb = new StringBuffer();
            useridamountsb.append("adData_purchase_userid_amount_ad_stat_times").append("_");
            useridamountsb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(useridamountsb.toString(), amount + 0d, useridamountcountSb.toString());
                    jedis.expire(useridamountsb.toString(), 172800);

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
        if (status == 1) {
            //支付
            StringBuffer useridpayamountcountSb = new StringBuffer();
            useridpayamountcountSb.append(statDate).append("|").append(userid);
            StringBuffer useridpaysb = new StringBuffer();
            useridpaysb.append("adData_pay_userid_amount_ad_stat_times").append("_");
            useridpaysb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(useridpaysb.toString(), amount + 0d, useridpayamountcountSb.toString());
                    jedis.expire(useridpaysb.toString(), 172800);

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

            StringBuffer useridpaynumbercountSb = new StringBuffer();
            useridpaynumbercountSb.append(statDate).append("|").append(userid);
            StringBuffer useridpaynumbersb = new StringBuffer();
            useridpaynumbersb.append("adData_pay_userid_number_ad_stat_times").append("_");
            useridpaynumbersb.append(statDate).append("_").append(type);
            try {
                Jedis jedis = this.jedisPool.getResource();
                try {

                    jedis.zincrby(useridpaynumbersb.toString(), 1d, useridpaynumbercountSb.toString());
                    jedis.expire(useridpaynumbersb.toString(), 172800);

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

        JSONObject jsonObject = JSONObject.fromObject(adDataVO);
        this.dataList.add(jsonObject.toString());
        if ((this.dataList != null) && (this.dataList.size() >= 1)) try {
            Jedis jedis = this.jedisPool.getResource();
            try {
                sb = new StringBuffer();
                sb.append(ConfKeys.STATISTICS_AD_PURCHASE_DATA_DAY);
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