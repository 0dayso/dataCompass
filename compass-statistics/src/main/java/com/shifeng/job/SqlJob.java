package com.shifeng.job;

import com.shifeng.dao.BaseDao;
import org.apache.log4j.Logger;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * 自动生成表结构
 * Created by yongshi on 2016/11/18.
 */
public class SqlJob {
    protected Logger logger = Logger.getLogger(this.getClass());
    @Resource(name = "baseDaoImpl")
    private BaseDao dao;
    /**
     *
     * 描述:获取下一个月.
     *
     * @return
     */
    public static String getPreMonth() {
        Calendar cal = Calendar.getInstance();
        cal.add(cal.MONTH, 1);
        SimpleDateFormat dft = new SimpleDateFormat("yyyy_MM");
        String preMonth = dft.format(cal.getTime());
        return preMonth;
    }
    public   void execute(){
        String month= getPreMonth();
        logger.info("【执行sql"+month+"任务】");
        List<String> sqls =getModel();
       StringBuffer sql2=new StringBuffer();
        for (String sql : sqls) {
            sql2.append("CREATE TABLE IF NOT EXISTS " + sql.split("_model")[0] + "_" + (month) + " LIKE " + sql +" ;");
        }
        try {
            dao.update("SqlMapper.batchUpdate",sql2.toString());
        } catch (Exception e) {
            e.printStackTrace();
            logger.info("【执行sql"+month+"出错】");
        }
        logger.info("【执行sql"+month+"任务完成】");
    }

    public static List<String> getModel(){
        List sqls=new ArrayList();
        sqls.add("op_data_model");
        sqls.add("op_keyword_detail_model");
        sqls.add("op_keyword_statistics_model");
        sqls.add("op_purchase_detail_model");
        sqls.add("op_register_detail_model");
        sqls.add("op_visit_detail_model");
        sqls.add("op_cart_detail_model");
        sqls.add("op_county_data_model");
        sqls.add("op_follow_shop_detail_model");
        sqls.add("op_follow_sku_detail_model");
        sqls.add("op_login_detail_model");
        sqls.add("op_operation_detail_model");
        sqls.add("op_purchase_cancel_detail_model");
        sqls.add("op_shop_cost_detail_model");
        sqls.add("op_sku_all_data_model");
        sqls.add("op_sku_data_model");
        sqls.add("op_user_data_model");
        sqls.add("message_model");

        return sqls;
    }
}
