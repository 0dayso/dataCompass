package com.shifeng.pc.controller;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_data;
import com.shifeng.pc.service.PcmainService;
import com.shifeng.util.DateUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

/**
 * pc 主页面 流量概况
 * @author 勇士
 *
 */
@Controller
@RequestMapping(value="/pc_main_flow")
public class PcmainController {
   Log log= LogFactory.getLog(PcmainController.class);
    @Resource(name="pcmainServiceImpl")
    private PcmainService pcmainServiceImpl;
    @RequestMapping(value="/show_pc_main_flow")
    public ModelAndView show_pc_main_flow(ModelAndView mv){
        mv.addObject("startDate", DateUtil.YYYY_MM_DDgetBeforDay(7));
        mv.addObject("endDate", DateUtil.getYYYY_MM_DD());
        mv.setViewName("pc/main_query");
        return mv;
    }


    @RequestMapping(value="/data_pc_main_flow")
    public ModelAndView data_pc_main_flow(ModelAndView mv,SearchData searchData){
        try {
            searchData.setWebtype("0");
            Op_data op_data = pcmainServiceImpl.getData(searchData);
            List<Op_data> op_datas = pcmainServiceImpl.getDatas(searchData);
            mv.addObject("op_data", op_data);
            mv.addObject("op_datas", op_datas);
        }catch (Exception e){
            log.error(e.getMessage());
        }
        mv.setViewName("pc/main_data");
        return mv;
    }
    @RequestMapping(value="/show_flowsource_main_flow")
    public ModelAndView show_flowsource_main_flow(ModelAndView mv){
        mv.addObject("startDate",  DateUtil.YYYY_MM_DDgetBeforDay(7));
        mv.addObject("endDate",DateUtil.getYYYY_MM_DD());
        mv.setViewName("pc/flowsource_query");
        return mv;
    }

    @RequestMapping(value="/data_flowsource_main_flow")
    public ModelAndView data_flowsource_main_flow(ModelAndView mv,SearchData searchData){
        try {
            searchData.setWebtype("0");
            List<Op_data> op_datas = pcmainServiceImpl.getDataVisitDetail(searchData);
            mv.addObject("op_datas", op_datas);
        }catch (Exception e){
            log.error(e.getMessage());
        }
        mv.setViewName("pc/flowsource_data");
        return mv;
    }
}
