package com.shifeng.controller.authority;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shifeng.entity.authority.Roles;
import com.shifeng.entity.users.Users;
import com.shifeng.service.authority.RolesService;
import com.shifeng.util.Const;

/** 
 * 系统角色表(roles)实体类
 * @author 世峰户外商城 
 * @version Revision: 1.00 
 */ 
@Controller
@RequestMapping(value="/roles")
public class RolesController {
	
	@Resource(name="rolesServiceImpl")
	private RolesService rolesServiceImpl;
	
	/**
	 * 方法描述：添加角色
	 * 返回类型：Map<String,Object>
	 * @param session
	 * @param role
	 * @return
	 */
	@RequestMapping(value="/addRole")
	@ResponseBody
	public Map<String,Object> addRole(HttpSession session,Roles role){
		Map<String,Object> map = new HashMap<String,Object>();;
		Users user = (Users) session.getAttribute(Const.SESSION_USER);
		//role.setrId(UuidUtil.get32UUID());
		role.setrUpTime(new Date());
		role.setrUpUser(user.getuId());
		try {
			map.put("role", role);
			rolesServiceImpl.addRole(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put(Const.RESPONSE_STATE, Const.RESPONSE_ERROR);
			map.put(Const.ERROR_INFO, "保存异常，请稍后重试!!!");
		}
		return map;
	}

	/**
	 * 方法描述：删除
	 * 返回类型：Map<String,Object>
	 * @param rId
	 * @return
	 */
	@RequestMapping(value="/deleteRoleByRId")
	@ResponseBody
	public Map<String,Object> deleteRoleByRId(@RequestParam(value="rId") String rId){
		Map<String,Object> map = new HashMap<String,Object>();;
		map.put("rId", rId);
		try {
			rolesServiceImpl.deleteRoleByRId(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put(Const.RESPONSE_STATE, Const.RESPONSE_ERROR);
			map.put(Const.ERROR_INFO, "删除异常，请稍后重试!!!");
		}
		return map;
	}
	
	/**
	 * 方法描述：更新角色
	 * 返回类型：Map<String,Object>
	 * @param session
	 * @param role
	 * @return
	 */
	@RequestMapping(value="/updateRole")
	@ResponseBody
	public Map<String,Object> updateRole(HttpSession session,Roles role){
		Map<String,Object> map = new HashMap<String,Object>();;
		Users user = (Users) session.getAttribute(Const.SESSION_USER);
		role.setrUpTime(new Date());
		role.setrUpUser(user.getuId());
		map.put("role", role);
		try {
			rolesServiceImpl.updateRole(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put(Const.RESPONSE_STATE, Const.RESPONSE_ERROR);
			map.put(Const.ERROR_INFO, "更新异常，请稍后重试!!!");
		}
		return map;	
	}
 
	/**
	 * 方法描述：根据分组id获取分组下的所有角色
	 * 返回类型：Map<String,Object>
	 * @param aId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/getSysRole/{aId}")
	@ResponseBody
	public List<Map<String,Object>> getSysRole(@PathVariable("aId") String aId)throws Exception{
		List<Map<String,Object>> lr = rolesServiceImpl.getSysUserRoleByaId(aId);
		return lr;	
	}
	
	
}
