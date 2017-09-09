package com.shifeng.activity.service;

import java.util.List;

import com.shifeng.activity.entity.Activity_haze;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.plugin.page.Page;
/** 
 * 活动/雾霾(activity_haze)接口
 * @author sen 
 * @version Revision: 1.00 
 *  Date: 2016-12-22 11:00:55 
 */  
public interface Activity_hazeService {

    /**
	 * 查询活动/雾霾明细
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<Activity_haze> findAllactivity_haze(Page page,SearchData searchData) throws Exception;
	
	
	/**
	 * 活动/雾霾统计
	 * @param searchData
	 * @return
	 * @throws Exception
	 */
	public List<Activity_haze> findAllActivityHazeData(Page page,SearchData searchData) throws Exception;
	
	
}
