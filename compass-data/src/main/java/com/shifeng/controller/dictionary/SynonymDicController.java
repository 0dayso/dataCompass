package com.shifeng.controller.dictionary;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.entity.dictionary.SynonymDic;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.dictionary.SynonymDicService;

/** 
 * 同义词字典表(synonymDic)Controller
 * @author Win Zhong 
 * @version Revision: 1.00 
 *  Date: 2016-12-15 15:51:09 
 */ 
@Controller
@RequestMapping(value="/synonymDic")
public class SynonymDicController{
	
	@Resource(name="synonymDicServiceImpl")
	private SynonymDicService synonymDicService;

	
	/**
	 * 词典列表
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "/list")
	public ModelAndView quartz(ModelAndView mv,Page<SynonymDic> page,SynonymDic synonymDic){
		page.setT(synonymDic);
		List<SynonymDic> synonymDicList = synonymDicService.getSynonymDicList(page);
		mv.addObject("synonymDicList", synonymDicList);
		mv.setViewName("dictionary/synonymDicList");
		return mv;
	}
	
	/**
	 * 添加词
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "/add")
	public ModelAndView add(ModelAndView mv){
		mv.setViewName("dictionary/addSynonymDic");
		return mv;
	}

	/**
	 * 检查词是否存在
	 * @param mv
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/checkWord")
	public boolean checkWord(String word,Integer id){
		boolean bl = synonymDicService.checkWord(word,id);
		return bl;
	}

	/**
	 * 修改加词
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "/edit/{id}")
	public ModelAndView edit(ModelAndView mv,@PathVariable("id") int id){
		SynonymDic synonymDic = synonymDicService.selectWord(id);
		mv.addObject("synonymDic", synonymDic);
		mv.setViewName("dictionary/editSynonymDic");
		return mv;
	}
 
	/**
	 * 检查词是否存在
	 * @param mv
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/saveWord")
	public boolean saveWord(SynonymDic synonymDic){
		boolean bl = synonymDicService.saveWord(synonymDic);
		return bl;
	}
}
