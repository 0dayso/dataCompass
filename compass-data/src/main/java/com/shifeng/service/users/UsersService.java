package com.shifeng.service.users;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.shifeng.entity.users.UserInfo;
import com.shifeng.entity.users.Users;
import com.shifeng.plugin.page.Page;


@Service("usersService")
public interface UsersService {
	
	/**
	 * 检查用户名密码是否正确     用户登录
	 * @param user
	 * @return
	 */
	public Users loginUserByPhoneOrEmail(Users user);
	
	/**
	 * 获取用户列表
	 * @param page
	 * @return
	 */
	List<Users> getUsersListPage(Page<?> page) throws Exception;
	/**
	 * 根据用户ID获取用户详细信息
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	UserInfo findUserById(String userId) throws Exception;
	

	
/*******************************系统用户********************************************************/	
	
	
	/**
	 * 获取后台管理用户列表
	 * @param page
	 * @return
	 */
	List<Users> getSysListPage(Page<?> page) throws Exception;	
	
	/**
	 * 根据用户ID获取系统用户详细信息
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	UserInfo findSysUserById(String userId) throws Exception;
	
	
	/**
	 * 方法描述：保存用户
	 * 返回类型：Map<String,Object>
	 * @param map
	 * @return
	 * @throws Exception
	 */
	Map<String,Object> saveUser(Map<String,Object> map) throws Exception;
	
	/**
	 * 添加系统管理用户
	 * @param map
	 * @return
	 * @throws Exception
	 */
	Map<String,Object> saveSysUser(Map<String,Object> map) throws Exception;
	
	/**
	 * 验证用户名邮箱手机号是否有重复
	 * @param map
	 * @return
	 * @throws Exception
	 */
	int checkUserInfo(Map<String,Object> map) throws Exception;	
	
	/**
	 * 方法描述：检索用户手机号是否唯一
	 * 返回类型：boolean
	 * @param phone
	 * @return
	 * @throws Exception
	 */
	public boolean checkUserPhoneUnique(String phone)throws Exception;
	
	
	/**
	 * 更改用户冻结 解冻状态
	 * @param map
	 * @return
	 * @throws Exception
	 */
	void updateUserFrozenTypeByUid(String uId) throws Exception;	

	/**
	 * 方法描述：更新用户角色
	 * 返回类型：void
	 * @param map
	 * @throws Exception
	 */
	public void updateUserRole(Map<String,Object> map) throws Exception;
	
	/**
	 * 删除系统用户
	 * @param userId
	 */
	void deleteSysUser(String userId)throws Exception;
	
	/**
	 * 方法描述：更新用户登录状态
	 * 返回类型：void
	 * @param user
	 * @throws Exception
	 */
	void updateUserLoginInfo(Users user) throws Exception;

	/**
	 * 
	 * @Description: 更新用户禁言状态
	 * @param map   
	 * @return void  
	 * @throws
	 * @author WinZhong
	 * @date 2016年1月4日 下午2:43:05
	 */
	void updateUserGAGTypeByUid(Map<String,Object> map) throws Exception;
	
	/**
	 * 修改系统用户头像
	 * @param map(String userId,String avatarUrl)
	 * @throws Exception
	 */
	void updateSysUserAvatar(Map<String,Object> map) throws Exception;

	/**
	 * 修改系统用户密码
	 * @param map
	 * @throws Exception
	 */
	void updateSysUserPassword(Map<String,Object> map) throws Exception;
	
//	/**
//	 * 方法描述：根据用户ID集合获取用户信息
//	 * 返回类型：List<Users>
//	 * @param page
//	 * @return
//	 * @throws Exception
//	 */
//	List<Users> getOnLineUserByIds(Page<SearchDTO> page)throws Exception;
	
	/**
	 * 
	 * @Description: 更新系统用户头像地址为OSS地址
	 * @param user
	 * @throws Exception   
	 * @return void  
	 * @author WinZhong
	 * @date 2016年1月21日 下午4:00:10
	 */
	void updateSysUserAvatarOssUrl(Users user) throws Exception;
	
}
