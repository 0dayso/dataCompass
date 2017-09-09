package com.sf.config;

public class ConfKeys
{


  /**
   * 接口key值
   */

  // [渠道]
  public static final String INTERFACE_CHANNEL_LIST = "integerface:channel:list";//商城渠道列表
  public static final String INTERFACE_CHANNEL_LIST_NEW_DATA = "integerface:channel:list:new:data";//商城渠道最新数据列表
  public static final String INTERFACE_CHANNEL_ID = "integerface:channel:id:%s";// 渠道

  // [渠道链接]
  public static final String INTERFACE_CHANNEL_URL_LIST = "integerface:channelurl:list";//商城渠道列表
  public static final String INTERFACE_CHANNEL_URL_LIST_NEW_DATA = "integerface:channelurl:list:new:data";//商城渠道列表集合
  public static final String INTERFACE_CHANNEL_URL_HASH = "integerface:channelurl:hashs";//商城渠道链接哈希
  public static final String INTERFACE_CHANNEL_URL_ID = "integerface:channelurl:id:%s";// 渠道链接-

  // [访问]
  public static final String INTERFACE_VISIT_IP = "integerface:visit:%s";// 访问-ip
  public static final String INTERFACE_VISIT_SHOP_ID = "integerface:visit:shopid:%s";// 访问-店铺id
  public static final String INTERFACE_VISIT_TYPE = "integerface:visit:type:%s";// 访问-站内来源数据
  public static final String INTERFACE_VISIT_USER = "integerface:visit:user:%s";// 单用户-userId
  public static final String INTERFACE_VISIT_DATA_COOKIE = "integerface:visit:data:cookie:%s";// 单用户-cookieId

  // [购买]
  public static final String INTERFACE_PURCHASE_ORDER_ID = "integerface:purchase:order:id:%s";// 购买-订单id

  // [取消]
  public static final String INTERFACE_PURCHASE_CANCEL_ORDER_ID = "integerface:purchase:cancel:order:id:%s";// 购买-订单id

  // 关注商品
  public static final String INTERFACE_FOLLOW_SKU = "integerface:follow:sku:%s:%s:%s";// 关注sku-userid
  // 关注店铺
  public static final String INTERFACE_FOLLOW_SHOP = "integerface:follow:shop:%s:%s:%s";// 关注sku-userid
  // 购物车商品
  public static final String INTERFACE_FOLLOW_CART = "integerface:follow:cart:%s:%s:%s";// 购物车sku-userid
  //2016-11-30添加
  //后台操作详情
  public static final String INTERFACE_OPERATION_LIST = "integerface:operation:list";
  //商家费用
  public static final String INTERFACE_SHOP_COST_LIST = "integerface:shop:cost:list";
  //登录详细
  public static final String INTERFACE_LOGIN_LIST = "integerface:login:list";



  /**
   * 明细
   */
  public static final String STATISTICS_AD_VISIT_DATA_DAY = "ad_visit_data_day";//访问数据--明细待保存数据
  public static final String STATISTICS_AD_PURCHASE_DATA_DAY = "ad_purchase_data_day";//购买数据--明细待保存数据
  public static final String STATISTICS_AD_REGISTER_DATA_DAY = "ad_register_data_day";//注册数据--明细待保存数据
  public static final String STATISTICS_AD_SEARCH_DATA_DAY = "ad_search_data_day";//搜索数据--明细待保存数据
  public static final String STATISTICS_AD_FOLLOW_SKU_DATA_DAY  = "ad_follow_sku_data_day";//关注商品--明细待保存数据
  public static final String STATISTICS_AD_FOLLOW_SHOP_DATA_DAY  = "ad_follow_shop_data_day";//关注店铺--明细待保存数据
  public static final String STATISTICS_AD_FOLLOW_CART_DATA_DAY  = "ad_follow_cart_data_day";//购物车商品--明细待保存数据
  //2016-11-30添加
  //明细 新加
  public static final String STATISTICS_AD_PURCHASE_CANCEL_DATA_DAY = "ad_purchase_cancel_data_day";//取消 退换货订单数据--明细待保存数据
  /**
   * 统计key值
   *统计表
   */
  //key append("_").append(statDate).append("_").append(channelId).append("_").append(channelUrlId).append("_").append(type).append("_").append(shopId);
  //日期yyyy-MM-dd_渠道id_渠道链接id_站内来源id_店铺id
  public static final String STATISTICS_VISIT_AD_TOSAVE = "adData_visit_ad_stat_times_%s_%s_%s_%s_%s";//访问数据--待保存数据按日期
  public static final String STATISTICS_PURCHASE_AD_TOSAVE = "adData_purchase_ad_stat_times_%s_%s_%s_%s_%s";//购买数量数据--待保存数据按日期
  public static final String STATISTICS_PURCHASE_AMOUNT_AD_TOSAVE = "adData_purchase_amount_ad_stat_times_%s_%s_%s_%s_%s";//购买金额数据--待保存数据按日期
  public static final String STATISTICS_PAY_AMOUNT_AD_TOSAVE = "adData_pay_amount_ad_stat_times_%s_%s_%s_%s_%s";//支付金额数据--待保存数据按日期
  public static final String STATISTICS_REGISTER_AD_TOSAVE = "adData_register_ad_stat_times_%s_%s_%s_%s";//注册数据--待保存数据按日期 日期yyyy-MM-dd_渠道id_渠道链接id_站内来源id
  public static final String STATISTICS_VISIT_AD_IP_TOSAVE = "adData_visit_ad_ip_stat_times_%s_%s_%s_%s_%s";//单ip访问数据--待保存数据按日期
  public static final String STATISTICS_VISIT_AD_COOKIE_TOSAVE = "adData_visit_ad_cookie_stat_times_%s_%s_%s_%s_%s";//单cookie访问数据--待保存数据按日期
  public static final String STATISTICS_VISIT_AD_USERID_TOSAVE = "adData_visit_ad_userid_stat_times_%s_%s_%s_%s_%s";//单用户访问数据--待保存数据按日期
  public static final String STATISTICS_VISIT_AD_ORDERID_TOSAVE = "adData_visit_ad_orderid_stat_times_%s_%s_%s_%s_%s";//订单数据--待保存数据按日期
  public static final String STATISTICS_SEARCH_AD_TOSAVE = "adData_search_ad_stat_times_%s_%s_%s";//搜索访问数据--待处理按日期_站内来源_店铺id

  public static final String STATISTICS_PAY_NUMBER_AD_TOSAVE = "adData_pay_nunmber_ad_stat_times_%s_%s_%s_%s_%s";//支付订单数量数据--待保存数据按日期

  //2016-11-30添加
  //取消 退换货
  public static final String STATISTICS_VISIT_AD_CANCEL_ORDERID_TOSAVE = "adData_visit_ad_cancel_order_stat_times_%s_%s_%s_%s_%s";//取消 退换货订单数据--待保存数据按日期
  //value  (statDate).append("|").append(channelId).append("|").append(channelUrlId).append("|").append(type).append("|").append(shop).append("|").append(reasontype);
  /**
   * sku总统计表
   *
   */
  //key append(type);
  //value append(type).append("|").append(sku).append("|").append(productid);
  //所有关注商品
  public static final String STATISTICS_FOLLOW_ALL_SKU_TOSAVE = "adData_follow_all_sku_stat_times_%s";//所有关注商品--待保存数据按日期
  //key   append(type);
  //value append(type).append("|").append(sku).append("|").append(productid);
  //购物车
  public static final String STATISTICS_FOLLOW_ALL_CART_TOSAVE = "adData_follow_all_cart_stat_times_%s";//所有关注商品--待保存数据按日期


  /**
   * sku统计表
   *
   */
  //2016-11-30添加
  //key  append(statDate).append("_").append(type).append("_").append(shop);
  //value  append(statDate).append("|").append(type).append("|").append(shop).append("|").append(sku).append("|").append(reasontype);
  //取消 退换货
  public static final String STATISTICS_SKU_AD_CANCEL_ORDERID_TOSAVE = "adData_sku_ad_cancel_order_stat_times_%s_%s_%s";//取消 退换货订单数据--待保存数据按日期
  //key   append(statDate).append("_").append(type).append("_").append(shop);
  //value append(statDate).append("|").append(type).append("|").append(shop).append("|").append(sku).append("|").append(productid);
  //关注商品
  public static final String STATISTICS_FOLLOW_SKU_TOSAVE = "adData_follow_sku_stat_times_%s_%s_%s";//关注商品--待保存数据按日期
  //key   append(statDate).append("_").append(type).append("_").append(shop);
  //value append(statDate).append("|").append(type).append("|").append(shop).append("|").append(sku).append("|").append(productid);
  //购物车
  public static final String STATISTICS_FOLLOW_CART_TOSAVE = "adData_follow_cart_stat_times_%s_%s_%s";//所有关注商品--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(sku).append("|").append(shop)
  //访问
  public static final String STATISTICS_VISIT_SKU_AD_TOSAVE = "adData_visit_sku_ad_stat_times_%s_%s";//sku统计访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(sku).append("|").append(shop)
  //单ip访问
  public static final String STATISTICS_VISIT_SKU_AD_IP_TOSAVE = "adData_visit_sku_ad_ip_stat_times_%s_%s";//单ip访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(sku).append("|").append(shop)
  //单cookie
  public static final String STATISTICS_VISIT_SKU_AD_COOKIE_TOSAVE = "adData_visit_sku_ad_cookie_stat_times_%s_%s";//单cookie访问数据--待保存数据按日期

  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(sku).append("|").append(shop)
  //单用户
  public static final String STATISTICS_VISIT_SKU_AD_USERID_TOSAVE = "adData_visit_sku_ad_userid_stat_times_%s_%s";//单用户访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(sku).append("|").append(shop)
  //购买数量数据
  public static final String STATISTICS_PURCHASE_SKU_AD_TOSAVE = "adData_purchase_sku_ad_stat_times_%s_%s";//购买数量数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(sku).append("|").append(shop)
  //购买金额数据
  public static final String STATISTICS_PURCHASE_SKU_AMOUNT_AD_TOSAVE = "adData_purchase_sku_amount_ad_stat_times_%s_%s";//购买金额数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(sku).append("|").append(shop)
  //支付金额数据
  public static final String STATISTICS_PAY_AMOUNT_SKU_AD_TOSAVE = "adData_pay_sku_amount_ad_stat_times_%s_%s";//支付金额数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(sku).append("|").append(shop)
  //支付订单数据
  public static final String STATISTICS_PAY_NUMBER_SKU_AD_TOSAVE = "adData_pay_sku_number_ad_stat_times_%s_%s";//支付订单数据--待保存数据按日期

  /**
   * 地区统计表
   *
   */
  //2016-11-30添加
  //key  append(statDate).append("_").append(type).append("_").append(shop);
  //value  append(statDate).append("|").append(type).append("|").append(shop).append("|").append(county).append("|").append(reasontype);

  //取消 退换货
  public static final String STATISTICS_COUNTY_AD_CANCEL_ORDERID_TOSAVE = "adData_county_ad_cancel_order_stat_times_%s_%s_%s_%s";//取消 退换货订单数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(type).append("|").append(county);
  //关注商品
  public static final String STATISTICS_FOLLOW_SKU_COUNTY_TOSAVE = "adData_follow_sku_county_stat_times_%s_%s";//关注商品--待保存数据按日期

  //key   append(statDate).append("_").append(type)
  //value append(statDate).append("|").append(type).append("|").append(county);
  //关注店铺
  public static final String STATISTICS_FOLLOW_SHOP_COUNTY_TOSAVE = "adData_follow_shop_county_stat_times_%s_%s";//关注商品--待保存数据按日期
  //key   append(statDate).append("_").append(type)
  //value append(statDate).append("|").append(type).append("|").append(county);
  //购物车
  public static final String STATISTICS_FOLLOW_CART_COUNTY_TOSAVE = "adData_follow_cart_county_stat_times_%s_%s";//所有关注商品--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //访问
  public static final String STATISTICS_VISIT_COUNTY_AD_TOSAVE = "adData_visit_county_ad_stat_times_%s_%s";//sku统计访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //访问
  public static final String STATISTICS_VISIT_COUNTY_AD_IP_TOSAVE = "adData_visit_county_ad_ip_stat_times_%s_%s";//单ip访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //单cookie
  public static final String STATISTICS_VISIT_COUNTY_AD_COOKIE_TOSAVE = "adData_visit_county_ad_cookie_stat_times_%s_%s";//单cookie访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //单用户
  public static final String STATISTICS_VISIT_COUNTY_AD_USERID_TOSAVE = "adData_visit_county_ad_userid_stat_times_%s_%s";//单用户访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //注册
  public static final String STATISTICS_REGISTER_COUNTY_AD_TOSAVE = "adData_register_county_ad_stat_times_%s_%s";//注册数据--待保存数据按日期 日期yyyy-MM-dd_渠道id_渠道链接id_站内来源id

  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //购买数量数据
  public static final String STATISTICS_PURCHASE_COUNTY_AD_TOSAVE = "adData_purchase_county_ad_stat_times_%s_%s";//购买数量数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //购买金额数据
  public static final String STATISTICS_PURCHASE_COUNTY_AMOUNT_AD_TOSAVE = "adData_purchase_county_amount_ad_stat_times_%s_%s";//购买金额数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //支付金额数据
  public static final String STATISTICS_PAY_AMOUNT_COUNTY_AD_TOSAVE = "adData_pay_county_amount_ad_stat_times_%s_%s";//支付金额数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(county)
  //支付订单数据
  public static final String STATISTICS_PAY_NUMBER_COUNTY_AD_TOSAVE = "adData_pay_county_number_ad_stat_times_%s_%s";//支付订单数据--待保存数据按日期


  /**
   * 用户统计表
   *
   */
  //2016-11-30添加
  //key  append(statDate).append("_").append(type).append("_").append(shop);
  //value  append(statDate).append("|").append(type).append("|").append(shop).append("|").append(userid).append("|").append(reasontype);

  //取消 退换货
  public static final String STATISTICS_USERID_AD_CANCEL_ORDERID_TOSAVE = "adData_userid_ad_cancel_order_stat_times_%s_%s_%s_%s";//取消 退换货订单数据--待保存数据按日期

  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(type).append("|").append(userid);
  //关注商品
  public static final String STATISTICS_FOLLOW_SKU_USERID_TOSAVE = "adData_follow_sku_userid_stat_times_%s_%s";//关注商品--待保存数据按日期

  //key   append(statDate).append("_").append(type)
  //value append(statDate).append("|").append(type).append("|").append(userid);
  //关注店铺
  public static final String STATISTICS_FOLLOW_SHOP_USERID_TOSAVE = "adData_follow_shop_userid_stat_times_%s_%s";//关注商品--待保存数据按日期


  //key   append(statDate).append("_").append(type)
  //value append(statDate).append("|").append(type).append("|").append(userid);
  //购物车
  public static final String STATISTICS_FOLLOW_CART_USERID_TOSAVE = "adData_follow_cart_userid_stat_times_%s_%s";//所有关注商品--待保存数据按日期

  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(userid)
  //访问
  public static final String STATISTICS_VISIT_USER_AD_TOSAVE = "adData_visit_userid_ad_stat_times_%s_%s";//访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(userid)
  //单ip访问
  public static final String STATISTICS_VISIT_USER_AD_IP_TOSAVE = "adData_visit_userid_ad_ip_stat_times_%s_%s";//单ip访问数据--待保存数据按日期

  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(userid)
  //单cookie
  public static final String STATISTICS_VISIT_USER_AD_COOKIE_TOSAVE = "adData_visit_userid_ad_cookie_stat_times_%s_%s";//单cookie访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(userid)
  //单用户
  public static final String STATISTICS_VISIT_USER_AD_USERID_TOSAVE = "adData_visit_userid_ad_userid_stat_times_%s_%s";//单用户访问数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(userid)
  //购买数量数据
  public static final String STATISTICS_PURCHASE_USER_AD_TOSAVE = "adData_purchase_userid_ad_stat_times_%s_%s";//购买数量数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(userid)
  //购买金额数据
  public static final String STATISTICS_PURCHASE_USER_AMOUNT_AD_TOSAVE = "adData_purchase_userid_amount_ad_stat_times_%s_%s";//购买金额数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(userid)
  //支付金额数据
  public static final String STATISTICS_PAY_AMOUNT_USER_AD_TOSAVE = "adData_pay_userid_amount_ad_stat_times_%s_%s";//支付金额数据--待保存数据按日期
  //key   append(statDate).append("_").append(type);
  //value append(statDate).append("|").append(userid)
  //支付订单数据
  public static final String STATISTICS_PAY_NUMBER_USER_AD_TOSAVE = "adData_pay_userid_number_ad_stat_times_%s_%s";//支付订单数据--待保存数据按日期



  /**
   * 实时统计key值
   */

  public static final String STORM_AD_VISIT_DATA = "ad_visit_data";//访问数据--待处理数据
  public static final String STORM_AD_PURCHASE_DATA = "ad_purchase_data";//购买数据--待处理数据
  public static final String STORM_AD_REGISTER_DATA = "ad_register_data";//注册数据--待处理数据

  public static final String STORM_AD_PURCHASE_ORDERID_DATA = "ad_purchase_orderid_data";//订单id数据--待处理数据

  public static final String STORM_AD_VISIT_DATA_IP = "ad_visit_data_ip";//单ip访问数据--待处理数据
  public static final String STORM_AD_VISIT_DATA_COOKIE = "ad_visit_data_cookie";//单cookie访问数据--待处理数据
  public static final String STORM_AD_VISIT_DATA_USERID = "ad_visit_data_userid";//单userid访问数据--待处理数据
  public static final String STORM_AD_SEARCH_DATA = "ad_search_data";//搜索数据--待处理数据

  public static final String STATISTICS_AD_SHOP_ID = "ad_shop_id_%s";//当天店铺数据数据--供统计查询当天店铺id数据(48小时过期)  val：店铺id  类型：list
  public static final String STATISTICS_AD_TYPE_ID = "ad_type_id_%s";//当天站内来源数据数据-供统计查询当天站内来源数据(48小时过期) val：站内来源   类型：list

  //2016-11-30新加
  public static final String STORM_AD_PURCHASE_CANCEL_ORDERID_DATA = "ad_purchase_cancel_orderid_data";//取消 退换货订单id数据--待处理数据
  public static final String STORM_AD_FOLLOW_SKU_DATA = "ad_follow_sku_data";//关注商品--待处理数据
  public static final String STORM_AD_FOLLOW_SHOP_DATA = "ad_follow_shop_data";//关注店铺--待处理数据
  public static final String STORM_AD_FOLLOW_CART_DATA = "ad_follow_cart_data";//购物车商品--待处理数据

}