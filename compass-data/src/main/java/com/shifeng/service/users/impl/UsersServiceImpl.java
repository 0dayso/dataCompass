package com.shifeng.service.users.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.users.UserInfo;
import com.shifeng.entity.users.Users;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.users.UsersService;
import com.shifeng.util.Const;
import com.shifeng.util.MD5Util;


@Service("usersServiceImpl")
public class UsersServiceImpl implements UsersService{

	@Resource(name = "baseDaoImpl")
	private BaseDao dao;
	
	
	
	
	/**
	 * 方法描述：利用手机号或者邮箱登录
	 * 实现接口：@see com.shifeng.service.users.UsersService#loginUserByPhoneOrEmail(com.op.entity.users.Users)
	 * @param user
	 * @return
	 */
	@Override
	public Users loginUserByPhoneOrEmail(Users user){
		try {
			user = (Users) dao.findForObject("UsersMapper.loginUserByPhoneOrEmail", user);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return user;
	}
	
	
	
	/**
	 * 获取用户列表
	 * @param page
	 * @return
	 * @throws Exception 
	 */
	@Override
	public List<Users> getUsersListPage(Page<?> page) throws Exception{
		return  (List<Users>) dao.findForList("UsersMapper.getUsersListPage", page);
	}
	
	/**
	 * 根据用户ID获取用户详细信息
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	public UserInfo findUserById(String userId) throws Exception{
		return (UserInfo) dao.findForObject("UsersMapper.findUserById", userId);
	}
	
	
	/**
	 * 获取后台管理用户列表
	 * @param page
	 * @return
	 */
	public List<Users> getSysListPage(Page<?> page) throws Exception{
		return  (List<Users>) dao.findForList("UsersMapper.getSysListPage", page);
	}
	
	/**
	 * 根据用户ID获取系统用户详细信息
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	public UserInfo findSysUserById(String userId) throws Exception{
		return (UserInfo) dao.findForObject("UsersMapper.findSysUserById", userId);
	}


	/**
	 * 方法描述：注册新用户
	 * 实现接口：@see com.shifeng.service.users.UsersService#saveUser(com.op.entity.users.Users)
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@Override
	public Map<String,Object> saveUser(Map<String,Object> map) throws Exception {
		Users user = (Users)map.get("user");
		// 判断手机号是否唯一
		int phone = (int) dao.findForObject("UsersMapper.checkUserPhoneUnique", user.getuPhone());
		if(phone > 0){
			map.clear();// 防止返回json丢失客户信息
			map.put(Const.RESPONSE_STATE, "phonecf");
			return map;
		}
		user.setuCreateTime(new Date());// 用户创建时间
		user.setuPassword(MD5Util.hex(user.getuPassword()));// 系统MD5加密处理
		dao.save("UsersMapper.saveUser", user);// save
		map.clear();
		map.put(Const.RESPONSE_STATE, Const.RESPONSE_SUCCESS);
		return map;
	}
	
	/**
	 * 添加系统管理用户
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public Map<String,Object> saveSysUser(Map<String,Object> map) throws Exception{
		Users user = (Users)map.get("user");
		//新增用户
		if(StringUtils.isEmpty(user.getuId())){
			//设置用户身份
			user.setuType(4);
			//设置登录次数
			user.setuLoginCount(0);
			user.setuCreateTime(new Date());
			user.setuPassword(MD5Util.hex(user.getuPassword()));
			dao.save("UsersMapper.saveSysUser", user);
		}else{
			if(!StringUtils.isEmpty(map.get("newPassword"))){
				//设置新密码
				user.setuPassword(MD5Util.hex(map.get("newPassword").toString()));
			}
			dao.update("UsersMapper.updateSysUser", user);
		}

		map.clear();
		map.put(Const.RESPONSE_STATE, Const.RESPONSE_SUCCESS);
		return map;
	}
	/**
	 * 方法描述：验证手机号唯一性
	 * 实现接口：@see com.shifeng.service.users.UsersService#checkUserPhoneUnique(java.lang.String)
	 * @param phone
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean checkUserPhoneUnique(String phone)throws Exception{
		int num = (int) dao.findForObject("UsersMapper.checkUserPhoneUnique", phone);
		if(num > 0){
			return false;
		}
		return true;
	}
	
	/**
	 * 验证用户名邮箱手机号是否有重复
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public int checkUserInfo(Map<String,Object> map) throws Exception{
		return (int) dao.findForObject("UsersMapper.checkUserInfo", map);
	}
	
	/**
	 * 更改用户冻结 解冻状态
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public void updateUserFrozenTypeByUid(String uId) throws Exception{
		dao.update("UsersMapper.updateUserFrozenTypeByUid", uId);
	}
	
	/**
	 * 
	 * @Description: 更新用户禁言状态
	 * @param map   
	 * @return void  
	 * @throws
	 */
	public void updateUserGAGTypeByUid(Map<String,Object> map)throws Exception{
		dao.update("UsersMapper.updateUserGAGTypeByUid", map);
	}

	/**
	 * 方法描述：更新用户角色
	 * 实现接口：@see com.shifeng.service.authority.RolesService#updateUserRole(java.util.Map)
	 * @param map {uId:'用户ID',rId:'角色ID'}
	 * @return
	 * @throws Exception
	 */
	@Override
	public void updateUserRole(Map<String, Object> map) throws Exception {
		// 判断当前用户是否冻结
		int isFroZen = (int) dao.findForObject("UsersMapper.checkUserIsFroZen", map.get("uId")+"");
		if(isFroZen == 1){
			map.clear();
			map.put(Const.RESPONSE_STATE, Const.RESPONSE_ERROR);
			map.put(Const.ERROR_INFO, "该用户已冻结，不可操作!");
		}
		dao.update("UsersMapper.updateUserRoleByUid", map);
		map.clear();
		map.put(Const.RESPONSE_STATE, Const.RESPONSE_SUCCESS);
	}
	
	/**
	 * 删除系统用户
	 * @param userId
	 */
	public void deleteSysUser(String userId) throws Exception {
		dao.delete("UsersMapper.deleteSysUser", userId);
	}


	/**
	 * 方法描述： 改变用户登录信息（IP、最后登录时间、登录次数）
	 * 实现接口：@see com.shifeng.service.users.UsersService#updateUsersLoginInfo(com.op.entity.users.Users)
	 * @param user
	 * @throws Exception
	 */
	@Override
	public void updateUserLoginInfo(Users user) throws Exception {
		user.setuLoginDate(new Date());// 最后登录时间
		user.setuLoginCount(user.getuLoginCount()+1);// 登录次数
		dao.update("UsersMapper.updateUserLoginInfo", user);
	}
	
	/**
	 * 修改系统用户头像
	 * @param map(String userId,String avatarUrl)
	 * @throws Exception
	 */
	public void updateSysUserAvatar(Map<String,Object> map) throws Exception{
		dao.update("UsersMapper.updateSysUserAvatar", map);
	}
	
	/**
	 * 修改系统用户密码
	 * @param map
	 * @throws Exception
	 */
	public void updateSysUserPassword(Map<String,Object> map) throws Exception{
		dao.update("UsersMapper.updateSysUserPassword", map);
	}


//	/**
//	 * 方法描述：根据用户ID集合获取用户信息
//	 * 实现接口：@see com.shifeng.service.users.UsersService#getOnLineUserByIds(com.op.plugin.Page)
//	 * @param page
//	 * @return
//	 * @throws Exception
//	 */
//	@Override
//	public List<Users> getOnLineUserByIds(Page<SearchDTO> page) throws Exception {
//		
//		return (List<Users>) dao.findForList("UsersMapper.getOnLineUserByIdsPage", page);
//	}
	
	/**
	 * 
	 * @Description: 更新系统用户头像地址为OSS地址
	 * @param user
	 * @throws Exception   
	 * @return void  
	 */
	public void updateSysUserAvatarOssUrl(Users user) throws Exception{
		dao.update("UsersMapper.updateSysUserAvatarOssUrl", user);
	}
	
}
