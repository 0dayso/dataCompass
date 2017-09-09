package com.shifeng.controller.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.jboss.netty.handler.codec.http.multipart.FileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.entity.users.UserInfo;
import com.shifeng.entity.users.Users;
import com.shifeng.plugin.page.Page;
import com.shifeng.service.authority.ArraysService;
import com.shifeng.service.authority.RolesService;
import com.shifeng.service.users.UsersService;
import com.shifeng.util.Const;
import com.shifeng.util.DateUtil;
import com.shifeng.util.MD5Util;

/**
 * 
*    
* 项目名称：compass-data   
* 类名称：TestUserController   
* 类描述：   会员管理
* 修改备注：   
* @version    
*
 */
@Controller
@RequestMapping(value="/user")
public class UsersController {

    
    @Resource(name="usersServiceImpl")
    UsersService usersService;

	@Resource(name="rolesServiceImpl")
	private RolesService rolesServiceImpl;
	
	@Resource(name="arraysServiceImpl")
	private ArraysService arraysServiceImpl;
	
//    @Resource(name="avatarUploadOssImpl")
//    AvatarUploadOss avatarUploadOssImpl;
	
	private Logger logger = Logger.getLogger(this.getClass());
	
    /**
     * 获取系统用户列表
     * @param page
     * @param users
     * @return
     * @throws Exception
     */
	@RequestMapping(value="sysList")
	public ModelAndView sysList(Page<Users> page,Users users)throws Exception{ 
		ModelAndView mv = new ModelAndView();
		page.setT(users);
		List<Users> usersList = usersService.getSysListPage(page);
		mv.addObject("page",page);
		mv.addObject("usersList",usersList);
		mv.addObject("user",users);
		mv.setViewName("admin/user/sysUser");
		return mv;
	}

    
	/**
	 * 根据用户ID 获取系统用户详细信息
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="goEditSysUser/{userId}")
	public ModelAndView goEditSysUser(@PathVariable("userId") String userId)throws Exception{ 
		ModelAndView mv = new ModelAndView();
		//获取系统用户信息
		UserInfo user = usersService.findSysUserById(userId);
		mv.addObject("user", user);
		//获取分组
		List<Map<String,Object>> arrays = arraysServiceImpl.getSysArrayList();
		mv.addObject("arrays", arrays);
		if(!StringUtils.isEmpty(user.getaId())){
			//获取角色
			List<Map<String,Object>> roles = rolesServiceImpl.getSysUserRoleByaId(user.getaId()) ;
			mv.addObject("roles", roles);
		}
		
		mv.setViewName("admin/user/editSysUser");
		return mv;
	}	

	/**
	 * 去新增系统用户页面
	 * @return
	 * @throws Exception
	 */ 
	@RequestMapping(value="goAddSysUser")
	public ModelAndView goAddSysUser()throws Exception{
		ModelAndView mv = new ModelAndView();
		//获取分组
		List<Map<String,Object>> arrays = arraysServiceImpl.getSysArrayList();
		mv.addObject("arrays", arrays);
		mv.setViewName("admin/user/editSysUser");
		return mv;
	}
	

	/**
	 * 新增系统用户
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="addSysUser")
	@ResponseBody
	public Map<String,Object> addSysUser(UserInfo user,HttpServletRequest request){
		Map<String,Object> map = new HashMap<String,Object>();;
		try {
			map.put("newPassword", request.getParameter("newPassword"));
			map.put("user", user);
			usersService.saveSysUser(map);
		} catch (Exception e) {
			logger.info(e);
			e.printStackTrace();
			map.put(Const.RESPONSE_STATE, 500);
			map.put(Const.ERROR_INFO, "保存异常!!!");
		}
		return map;
	}
	
	/**
	 * 更改用户冻结状态
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="userFrozen/{userId}")
	@ResponseBody
	public Map<String,Object> userFrozen(@PathVariable("userId") String userId){
		Map<String,Object> map = new HashMap<String,Object>();;
		try {
			map.clear();
			usersService.updateUserFrozenTypeByUid(userId);
			map.put(Const.RESPONSE_STATE, Const.RESPONSE_SUCCESS);
		} catch (Exception e) {
			logger.info(e);
			e.printStackTrace();
			map.put(Const.RESPONSE_STATE, 500);
			map.put(Const.ERROR_INFO, "更新异常");
		}
		return map;
	}

	
	/**
	 * 更改用户冻结状态
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="jinyan")
	@ResponseBody
	public Map<String,Object> jinyan(HttpServletRequest request){
		Map<String,Object> map = new HashMap<String,Object>();;
		try {
			map.put("duration", request.getParameter("duration"));
			map.put("uId", request.getParameter("id"));
			usersService.updateUserGAGTypeByUid(map);
			map.clear();
			map.put(Const.RESPONSE_STATE, Const.RESPONSE_SUCCESS);
		} catch (Exception e) {
			logger.info(e);
			e.printStackTrace();
			map.put(Const.RESPONSE_STATE, 500);
			map.put(Const.ERROR_INFO, "更新异常");
		}
		return map;
	}	
	
	/**
	 * 删除系统用户
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="delSysUser/{userId}")
	@ResponseBody
	public Map<String,Object> delSysUser(@PathVariable("userId") String userId){
		Map<String,Object> map = new HashMap<String,Object>();;
		try {
			map.clear();
			usersService.deleteSysUser(userId);
			map.put(Const.RESPONSE_STATE, Const.RESPONSE_SUCCESS);
		} catch (Exception e) {
			logger.info(e);
			e.printStackTrace();
			map.put(Const.RESPONSE_STATE, 500);
			map.put(Const.ERROR_INFO, "删除异常!!!");
		}
		return map;
	}	
	
	/**
	 * 系统用户头像
	 * @param mv
	 * @return
	 * @throws Exception
	 */
//	@RequestMapping(value="sysUserAvatar")
//	public ModelAndView userAvatar(ModelAndView mv)throws Exception{ 
//		mv.addObject("avatar",this.getSessionUser().getuHeadImg());
//		mv.setViewName("admin/user/sysUserAvatar");
//		return mv;
//	}
	
	/**
	 * 修改系统用户头像
	 * @param request
	 * @return
	 * @throws Exception
	 */
//	@RequestMapping(value="/updateSysUserAvatar")
//	@ResponseBody
//	public Object updateSysUserAvatar(HttpServletRequest request) throws Exception{
//		Map<String,Object> map = new HashMap<String,Object>();
//		String  day = DateUtil.getDays(), fileName = UuidUtil.get32UUID()+".png";
//		ServletContext application = request.getSession().getServletContext();
//        String savePath = application.getRealPath("/") + "upload/avatar/"+day;
//        String saveUrl = "upload/avatar/"+day+"/";
//		String result = this.getParameter("image");         
//		if(FileUpload.Base64TurnPicture(result,savePath,fileName)){
//			try {
//				Users user = this.getSessionUser();
//				map.put("avatarUrl", saveUrl+fileName);
//				map.put("userId", user.getuId());
//				usersService.updateSysUserAvatar(map);
//				user.setuHeadImg(saveUrl+fileName);
//				map.clear();
//				map.put("src", saveUrl+fileName);
//				map.put("result", "true");
//			    avatarUploadOssImpl.upload(user);
//			} catch (Exception e) {
//				map.clear();
//				map.put("result", "err");
//			}
//		}else{
//			map.put("result", "err");
//		}
//		return map;
//	}
	
	/**
	 * 跳转修改系统用户密码页面
	 * @param mv
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="sysUserPassword")
	public ModelAndView sysUserPassword(ModelAndView mv)throws Exception{ 
		mv.setViewName("admin/user/sysUserPassword");
		return mv;
	}	
	
	/**
	 * 修改系统用户密码页面
	 * @param mv
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="updateSysUserPassword")
	@ResponseBody
	public Map<String,Object> updateSysUserPassword(ModelAndView mv,HttpServletRequest request)throws Exception{ 
		Map<String,Object> map = new HashMap<String,Object>();
		String uPassword = request.getParameter("uPassword");
		String newPassword = request.getParameter("newPassword");
		String checkPassword = request.getParameter("checkPassword");
		Users user = (Users)SecurityUtils.getSubject().getSession().getAttribute(Const.SESSION_USER);
		//判断原密码是否正确
		if(user.getuPassword().equals(MD5Util.hex(uPassword))){
			if(newPassword.equals(checkPassword)){
				map.put("newPassword",MD5Util.hex(newPassword));
				map.put("uPassword", MD5Util.hex(uPassword));
				map.put("userId", user.getuId());
				try {
					usersService.updateSysUserPassword(map);
					user.setuPassword(map.get("newPassword").toString());
					map.clear();				
					map.put("msg", "密码修改成功");
					map.put("result", "true");
				} catch (Exception e) {
					map.clear();				
					map.put("msg", "密码修改失败");
					map.put("result", "err");
				}
			}else{
				map.put("msg", "新密码两次输入不一致");
				map.put("result", "err");
			}
		}else{
			map.put("msg", "原密码输入错误！");
			map.put("result", "err");
		}
		return map;
	}		
	
	
}
