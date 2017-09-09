package com.shifeng.downloadApp.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.downloadApp.entity.DownloadApp;
import com.shifeng.downloadApp.service.DownloadAppService;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
import com.shifeng.util.DateUtil;

/**
 * app下载统计(downloadApp)Controller
 * 
 * @author sen
 * @version Revision: 1.00 Date: 2016-12-23 15:05:06
 */
@Controller
@RequestMapping(value = "/downloadApp")
public class DownloadAppController {

	@Resource(name = "downloadAppServiceImpl")
	private DownloadAppService downloadAppServiceImpl;

	@RequestMapping(value = "/findAlldownloadApp")
	public ModelAndView findAlldownloadApp(Page page,SearchData searchData, ModelAndView mv) throws Exception {
		List<DownloadApp> downloadApp = downloadAppServiceImpl.findAlldownloadApp(page,searchData);
		mv.addObject("list", downloadApp);
		mv.addObject("page", page);
		mv.setViewName("downloadApp/downloadApp");
		return mv;
	}

	/**
	 * 跳转APP下载统计页面
	 * @param mv
	 * @return
	 */
	@RequestMapping(value="/downloadAppData")
	public ModelAndView downloadAppData(ModelAndView mv){
		mv.addObject("startDate", DateUtil.getYYYY_MM_DD());
		mv.setViewName("downloadApp/downloadAppData");
		return mv;
	}
	
	/**
	 * APP下载统计
	 * @param mv
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/findAllDownloadAppData")
	@ResponseBody
	public ModelAndView findAllDownloadAppData(ModelAndView mv,SearchData searchData,Page page) throws Exception{
		try {
			List<DownloadApp> list = downloadAppServiceImpl.findAllDownloadAppData(page, searchData);
			
			mv.addObject("list", list);
			mv.addObject("page", page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.setViewName("downloadApp/downloadAppDataList");
		
		return mv;
	}
	
}
