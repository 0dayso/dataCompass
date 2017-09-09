package com.shifeng.downloadApp.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.downloadApp.entity.DownloadApp;
import com.shifeng.downloadApp.service.DownloadAppService;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page; 

/** 
 * app下载统计(downloadApp)接口实现类
 * @author sen 
 * @downloadApp Revision: 1.00 
 *  Date: 2016-12-23 15:05:06 
 */  
@Service("downloadAppServiceImpl")
public class DownloadAppServiceImpl implements DownloadAppService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询所有app下载统计
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<DownloadApp> findAlldownloadApp(Page page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		page.setT(searchData);
		return (List<DownloadApp>) dao.findForList("downloadAppMapper.findAlldownloadAppPage", page);
	}
	
	/**
	 * app下载统计
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	public List<DownloadApp> findAllDownloadAppData(Page page,SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		page.setT(searchData);
		
		return (List<DownloadApp>) dao.findForList("downloadAppMapper.findAllDownloadAppData", page);
	}
}
