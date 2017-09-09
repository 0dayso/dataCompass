package com.shifeng.truetime.service.impl;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_data;
import com.shifeng.truetime.service.RealTimeOrderService;
import com.shifeng.util.DateUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by yongshi on 2016/11/25.
 */
@Service("realTimeOrderServiceImpl")
public class RealTimeOrderServiceImpl implements RealTimeOrderService {
    @Resource(name = "baseDaoImpl")
    private BaseDao dao;
    @Override
    public List<Op_data> getOrderDatas(SearchData searchData) throws Exception {
        searchData.setTableName(DateUtil.getYM(searchData.getStartDate()));
        return (List<Op_data>) dao.findForList("realtimeorderMapper.getData",searchData);
    }

    @Override
    public List<Op_data> getDataVisitDetail(SearchData searchData) throws Exception {
        searchData.setTableName("op_visit_detail_"+ DateUtil.getYM(searchData.getStartDate()));
        return (List<Op_data>) dao.findForList("realtimeorderMapper.getDataVisitDetail",searchData);
    }
}
