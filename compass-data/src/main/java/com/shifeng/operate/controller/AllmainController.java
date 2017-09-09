package com.shifeng.operate.controller;

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
 *  主页面 流量概况
 * @author 勇士
 *
 */
@Controller
@RequestMapping(value="/all_main_flow")
public class AllmainController {
   Log log= LogFactory.getLog(AllmainController.class);
    @Resource(name="pcmainServiceImpl")
    private PcmainService pcmainServiceImpl;
    @RequestMapping(value="/show_all_main_flow")
    public ModelAndView show_all_main_flow(ModelAndView mv){
        mv.addObject("startDate", DateUtil.YYYY_MM_DDgetBeforDay(7));
        mv.addObject("endDate", DateUtil.getYYYY_MM_DD());
        mv.setViewName("all/main_query");
        return mv;
    }


    @RequestMapping(value="/data_all_main_flow")
    public ModelAndView data_all_main_flow(ModelAndView mv,SearchData searchData){
        try {
            searchData.setWebtype("0");
            Op_data op_data = pcmainServiceImpl.getAllData(searchData);
            List<Op_data> op_datas = pcmainServiceImpl.getAllDatas(searchData);
            mv.addObject("op_data", op_data);
            mv.addObject("op_datas", op_datas);
        }catch (Exception e){
            log.error(e.getMessage());
        }
        mv.setViewName("all/main_data");
        return mv;
    }

}
