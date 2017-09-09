package com.shifeng.downloadApp.service;

import java.util.List;

import com.shifeng.downloadApp.entity.DownloadApp;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
/** 
 * app下载统计(downloadApp)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-23 15:05:06 
 */  
public interface DownloadAppService {

    /**
	 * 查询所有app下载
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<DownloadApp> findAlldownloadApp(Page page,SearchData searchData) throws Exception;
	
	/**
	 * app下载统计
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	public List<DownloadApp> findAllDownloadAppData(Page page,SearchData searchData) throws Exception;
	
}
