package com.shifeng.service.app.impl;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.app.App;
import com.shifeng.service.app.AppService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by yongshi on 2016/12/23.
 */
@Service("appServiceImpl")
public class AppServiceImpl implements AppService {
    protected Logger logger = Logger.getLogger(this.getClass());
    @Resource(name = "baseDaoImpl")
    private BaseDao dao;
    /**
     * 保存app下载消息

     * @throws Exception
     */
    public void saveApp() {
        logger.info("【开始】执行保存app下载明细记录任务");
        String key = Const.APP_DOWNLOAD_DATA;
        List<App> detailList = new ArrayList<App>();
        //获取Redis存储的明记录
        String str = RedisTool.rpop(key);
        while (!StringUtils.isEmpty(str)) {
            App detail = (App)JSONObject.toBean(JSONObject.fromObject(str), App.class);
            detailList.add(detail);
            //每满一百条提交一次
            if(detailList.size() >= 100){
                try {
                    dao.save("appMapper.saveDetail", detailList);
                    detailList.clear();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            str = RedisTool.rpop(key);
        }
        if(detailList.size() > 0){
            try {
                dao.save("appMapper.saveDetail", detailList);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        logger.info("【结束】执行保存app下载明细记录任务");
    }

}
