package com.shifeng.service.app.impl;

import com.shifeng.entity.App;
import com.shifeng.entity.huodong.Wumai;
import com.shifeng.service.app.AppService;
import com.shifeng.util.Const;
import com.shifeng.util.redis.RedisTool;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

/**
 * Created by yongshi on 2016/12/23.
 */
@Service("appServiceImpl")
public class AppServiceImpl implements AppService {
    @Override
    public void download(App app) throws Exception {
            String value = JSONObject.fromObject(app).toString();
            RedisTool.lpush(Const.APP_DOWNLOAD_DATA,value );
    }
}
