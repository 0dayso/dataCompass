package com.shifeng.pc.service;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_data;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * pc流量概况
 */
@Service("pcmainService")
public interface PcmainService {

    public Op_data getData(SearchData searchData) throws Exception;

    List<Op_data> getDatas(SearchData searchData) throws Exception;

    List<Op_data> getDataVisitDetail(SearchData searchData)throws Exception;

    Op_data getAllData(SearchData searchData)throws Exception;

    List<Op_data> getAllDatas(SearchData searchData)throws Exception;
}
