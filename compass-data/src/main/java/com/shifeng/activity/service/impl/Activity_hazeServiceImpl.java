package com.shifeng.activity.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.activity.entity.Activity_haze;
import com.shifeng.activity.service.Activity_hazeService;
import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
import com.shifeng.sell.dto.PurchasecancelDTO; 

/** 
 * 活动/雾霾(activity_haze)接口实现类
 * @author sen 
 * @activity_haze Revision: 1.00 
 *  Date: 2016-12-22 11:00:55 
 */  
@Service("activity_hazeServiceImpl")
public class Activity_hazeServiceImpl implements Activity_hazeService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 查询活动/雾霾明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Activity_haze> findAllactivity_haze(Page page,SearchData searchData) throws Exception{
		if(searchData==null){
			searchData = new SearchData();
		}
		page.setT(searchData);
		
		return (List<Activity_haze>) dao.findForList("activity_hazeMapper.findAllactivity_hazePage", page);
	}
	
	/**
	 * 活动/雾霾统计
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	public List<Activity_haze> findAllActivityHazeData(Page page,SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		page.setT(searchData);
		
		return (List<Activity_haze>) dao.findForList("activity_hazeMapper.findAllActivityHazeData", page);
	}
	
	
}
