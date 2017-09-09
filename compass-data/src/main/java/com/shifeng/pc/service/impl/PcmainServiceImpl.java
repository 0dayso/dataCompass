package com.shifeng.pc.service.impl;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_data;
import com.shifeng.pc.service.PcmainService;
import com.shifeng.util.DateUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service("pcmainServiceImpl")
public class PcmainServiceImpl implements PcmainService {
    @Resource(name = "baseDaoImpl")
    private BaseDao dao;

    @Override
    public Op_data getData(SearchData searchData) throws Exception {
        searchData.setTableName("op_data_"+ DateUtil.getYM(searchData.getStartDate()));
        return (Op_data) dao.findForObject("op_dataMapper.getPcmainByAllData",searchData);
    }

    @Override
    public List<Op_data> getDatas(SearchData searchData) throws Exception{
        searchData.setTableName("op_data_"+ DateUtil.getYM(searchData.getStartDate()));
        return (List<Op_data>) dao.findForList("op_dataMapper.getPcmainByData",searchData);
    }
    @Override
    public Op_data getAllData(SearchData searchData) throws Exception {
        searchData.setTableName("op_data_"+ DateUtil.getYM(searchData.getStartDate()));
        return (Op_data) dao.findForObject("op_dataMapper.getAllmainByAllData",searchData);
    }

    @Override
    public List<Op_data> getAllDatas(SearchData searchData) throws Exception {
        searchData.setTableName("op_data_"+ DateUtil.getYM(searchData.getStartDate()));
        return (List<Op_data>) dao.findForList("op_dataMapper.getAllmainByData",searchData);
    }
    @Override
    public List<Op_data> getDataVisitDetail(SearchData searchData) throws Exception {
        searchData.setTableName("op_visit_detail_"+ DateUtil.getYM(searchData.getStartDate()));
        return (List<Op_data>) dao.findForList("op_visit_detailMapper.getDataVisitDetail",searchData);
    }


}
