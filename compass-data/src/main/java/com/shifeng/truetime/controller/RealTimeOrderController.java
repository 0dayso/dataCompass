package com.shifeng.truetime.controller;

import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.Op_data;
import com.shifeng.truetime.service.RealTimeOrderService;
import com.shifeng.util.DateUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

/**
 * 实时榜单
 * @author 勇士
 */
@Controller
@RequestMapping(value="truetime_order_controller")
public class RealTimeOrderController {
    Log log= LogFactory.getLog(RealTimeOrderController.class);
    @Resource(name="realTimeOrderServiceImpl")
    private RealTimeOrderService realTimeOrderServiceImpl;
    @RequestMapping(value="/truetime_order_main_flow")
    public ModelAndView truetime_order_main_flow(ModelAndView mv){
        mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
        mv.setViewName("truetime/order_main_query");
        return mv;
    }
    @RequestMapping(value="/truetime_order_data_flow")
    public ModelAndView truetime_order_data_flow(ModelAndView mv,SearchData searchData){
        try {
            List<Op_data> op_datas = realTimeOrderServiceImpl.getOrderDatas(searchData);
            mv.addObject("op_datas", op_datas);
        }catch (Exception e){
            log.error(e.getMessage());
        }
        mv.setViewName("truetime/order_main_data");
        return mv;
    }

    @RequestMapping(value="/show_flowsource_main_flow")
    public ModelAndView show_flowsource_main_flow(ModelAndView mv){
        mv.addObject("startDate",DateUtil.getYYYY_MM_DD());
        mv.setViewName("truetime/flowsource_query");
        return mv;
    }

    @RequestMapping(value="/data_flowsource_main_flow")
    public ModelAndView data_flowsource_main_flow(ModelAndView mv,SearchData searchData){
        try {
            List<Op_data> op_datas = realTimeOrderServiceImpl.getDataVisitDetail(searchData);
            mv.addObject("op_datas", op_datas);
        }catch (Exception e){
            log.error(e.getMessage());
        }
        mv.setViewName("truetime/flowsource_data");
        return mv;
    }
}
