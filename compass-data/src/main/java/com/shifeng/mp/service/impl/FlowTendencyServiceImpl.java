package com.shifeng.mp.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.mp.dto.SearchFlowTendencyDTO;
import com.shifeng.mp.dto.ShowFlowTendencyHourCookieFlow;
import com.shifeng.mp.dto.ShowFlowTendencyHourPvFlow;
import com.shifeng.mp.dto.ShowFlowTendencyHourUservFlow;
import com.shifeng.mp.dto.ShowFlowTendencyHourUvFlow;
import com.shifeng.mp.service.FlowTendencyService;
import com.shifeng.pc.dto.day_hour_flow.ShowDayFlow;

@Service("flowTendencyServiceImpl")
public class FlowTendencyServiceImpl implements FlowTendencyService {

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	/**
	 * 按小时分析流量
	 */
	@Override
	public List<ShowDayFlow> getPcFlowHourDatas(SearchFlowTendencyDTO s) throws Exception {
		// [1]浏览量(pv)
		List<ShowFlowTendencyHourPvFlow> pvs = (List<ShowFlowTendencyHourPvFlow>) dao.findForList("flowTendencyMapper.statisticsPvBydate", s);
		// [2]访客数(ip)
		List<ShowFlowTendencyHourUvFlow> uvs = (List<ShowFlowTendencyHourUvFlow>) dao.findForList("flowTendencyMapper.statisticsUvBydate", s);
		// [-2]访客数(cookie)
		List<ShowFlowTendencyHourCookieFlow> cookies = (List<ShowFlowTendencyHourCookieFlow>) dao.findForList("flowTendencyMapper.statisticsUserCookieBydate", s);
		// [3]访问用户数（已登录的）
		List<ShowFlowTendencyHourUservFlow> users = (List<ShowFlowTendencyHourUservFlow>) dao.findForList("flowTendencyMapper.statisticsUservBydate", s);

		// [4]解析对象
		List<ShowDayFlow> list = null;
		ShowFlowTendencyHourPvFlow shp = null;
		int timehour = 0;
		if (pvs.size() > 0) {
			// [4.1]定义返回对象
			list = new ArrayList<ShowDayFlow>();

			// [4.2]获取已有数据的小时
			for (int i = 0, len = pvs.size(); i < len; i++) {
				shp = pvs.get(i);
				timehour = shp.getTimeHour();

				// [4.3]定义当前小时的数据对象
				ShowDayFlow sdf = new ShowDayFlow();

				// [4.3.1]获取当前小时的浏览量 浏览量(pv)
				sdf.setDate(shp.getTimeHour() + "点");
				sdf.setVisitnum(shp.getCount());

				// [4.3.2]获取当前小时的 访客数(ip)
				for (int u_i = 0, u_len = uvs.size(); u_i < u_len; u_i++) {
					if (uvs.get(u_i).getTimeHour() == timehour) {
						sdf.setUv(uvs.get(u_i).getIpNum());
					}

				}

				// [4.3.3]获取当前小时的访客数(cookie)
				for (int u_i = 0, u_len = cookies.size(); u_i < u_len; u_i++) {
					if (cookies.get(u_i).getTimehour() == timehour) {
						sdf.setCookie(cookies.get(u_i).getCookieNum());
					}
				}

				// [4.3.4]获取当前小时的访问用户数
				for (int u_i = 0, u_len = users.size(); u_i < u_len; u_i++) {
					if (users.get(u_i).getTimeHour() == timehour) {
						sdf.setVisitusernum(users.get(u_i).getUseridNum());
					}
				}

				// [4.4]封装数据
				list.add(sdf);
			}
		}
		return list;
	}

}
