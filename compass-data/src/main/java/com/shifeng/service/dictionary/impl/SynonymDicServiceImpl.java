package com.shifeng.service.dictionary.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.dictionary.SynonymDic;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.dictionary.SynonymDicService; 

/** 
 * 同义词字典表(synonymDic)接口实现类
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-12-15 15:51:09 
 */  
@Service("synonymDicServiceImpl")
public class SynonymDicServiceImpl implements SynonymDicService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 获取同义词词典列表
	 * @param page
	 * @return
	 */
    public List<SynonymDic> getSynonymDicList(Page<SynonymDic> page) {
    	try {
			List<SynonymDic> list = (List<SynonymDic>)dao.findForList("synonymDicMapper.getSynonymDicListPage", page);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

    /**
     * 检查同义词是否存在
     * @param word
     * @param id
     * @return
     */
	public boolean checkWord(String word, Integer id) {
		try {
			if(StringUtils.isEmpty(id)){
				int count = (int)dao.findForObject("synonymDicMapper.checkWord", word);
				return count==0?true:false;
			}else{
				Map<String,Object> map = new HashMap<String,Object>();
				map.put("id", id);
				map.put("word", word);
				int count = (int)dao.findForObject("synonymDicMapper.checkWords", map);
				return count==0?true:false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * 根据id查询同义词
	 * @param id
	 * @return
	 */
	public SynonymDic selectWord(int id) {
		try {
			SynonymDic synonymDic = (SynonymDic)dao.findForObject("synonymDicMapper.selectWordById", id);
			return synonymDic;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 保存词
	 * @param synonymDic
	 * @return
	 */
	public boolean saveWord(SynonymDic synonymDic) {

		try {
			synonymDic.setUpdate_time(new Date());
			if(!StringUtils.isEmpty(synonymDic.getEscape())){
				synonymDic.setWord(synonymDic.getSynonym()+" => "+synonymDic.getEscape());
			}
			if(synonymDic.getId() == 0){
				dao.save("synonymDicMapper.saveWord", synonymDic);
			}else{
				dao.update("synonymDicMapper.updateWord", synonymDic);
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
