package com.shifeng.truetime.service;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_data;

import java.util.List;

/**
 * Created by yongshi on 2016/11/25.
 */
public interface RealTimeOrderService {
    List<Op_data> getOrderDatas(SearchData searchData) throws Exception;

    List<Op_data> getDataVisitDetail(SearchData searchData)throws Exception;
}
