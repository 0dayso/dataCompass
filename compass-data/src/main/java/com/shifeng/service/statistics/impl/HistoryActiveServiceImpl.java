package com.shifeng.service.statistics.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.dto.statistics.SearchData;
import com.shifeng.entity.statistics.HistoryActive;
import com.shifeng.service.statistics.HistoryActiveService;

@Service("historyActiveServiceImpl")
public class HistoryActiveServiceImpl implements HistoryActiveService{
	
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	/**
	 * 商城历史活动统计
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public List<HistoryActive> findAllActiveData(SearchData searchData) throws Exception{
		String[] rowFields = searchData.getRowFieldString().substring(0, searchData.getRowFieldString().length()-1).split(",");
		searchData.setRowFields(rowFields);
		searchData.getRowFieldVO().setShowRowField(searchData.getRowFields());
		
		List<HistoryActive> visit = (List<HistoryActive>) dao.findForList("historyActiveMapper.findVisitByActiveId", searchData);
		List<HistoryActive> amount = (List<HistoryActive>) dao.findForList("historyActiveMapper.findAmountByActiveId", searchData);
		List<HistoryActive> payamount = (List<HistoryActive>) dao.findForList("historyActiveMapper.findPayamountByActiveId", searchData);
		List<HistoryActive> order = (List<HistoryActive>) dao.findForList("historyActiveMapper.findOrderCountByActiveId", searchData);
		
		List<HistoryActive> list = new ArrayList<HistoryActive>();
		for(int i=0,len=visit.size();i<len;i++){
			HistoryActive historyActive = new HistoryActive();
			
			historyActive.setCdate(visit.get(i).getCdate());
			historyActive.setActiveId(visit.get(i).getActiveId());
			historyActive.setType(visit.get(i).getType());
			historyActive.setVisitnum(visit.get(i).getVisitnum());
			historyActive.setVisitusernum(visit.get(i).getVisitusernum());
			historyActive.setCookie(visit.get(i).getCookie());
			historyActive.setUv(visit.get(i).getUv());
			
			for(int j=0,lenj=amount.size();j<lenj;j++){
				if(amount.get(j).getCdate().equals(visit.get(i).getCdate())&&amount.get(j).getActiveId().equals(visit.get(i).getActiveId())&&amount.get(j).getType()==visit.get(i).getType()){
					historyActive.setAmount(amount.get(j).getAmount());
					historyActive.setPurchasenum(amount.get(j).getPurchasenum());
				}
			}
			
			for(int j=0,lenj=payamount.size();j<lenj;j++){
				if(payamount.get(j).getCdate().equals(visit.get(i).getCdate())&&payamount.get(j).getActiveId().equals(visit.get(i).getActiveId())&&payamount.get(j).getType()==visit.get(i).getType()){
					historyActive.setPayamount(payamount.get(j).getPayamount());
				}
			}
			
			for(int j=0,lenj=order.size();j<lenj;j++){
				if(order.get(j).getCdate().equals(visit.get(i).getCdate())&&order.get(j).getActiveId().equals(visit.get(i).getActiveId())&&order.get(j).getType()==visit.get(i).getType()){
					historyActive.setOrdernum(order.get(j).getOrdernum());
				}
			}
			
			list.add(historyActive);
		}
		
		return list;
	}
	
}
