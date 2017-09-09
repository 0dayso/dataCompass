package com.shifeng.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.shifeng.entity.users.Users;
import com.shifeng.service.users.UsersService;
import com.shifeng.util.Common;
import com.shifeng.util.Const;

/**
 * 项目名：compass-data
 * 类描述：登录
 * 创建人：sen
 */
@Controller
@RequestMapping(value = "/login")
public class LoginController {

	@Resource(name="usersServiceImpl")
	private UsersService usersServiceImpl;
	
	/**
	 * 用户登录
	 */
	@RequestMapping(value = "/check", method = RequestMethod.POST)
	public ModelAndView login(HttpServletRequest request, 
			@RequestParam(value="username") String username, 
			@RequestParam(value="password") String password,
			ModelAndView mv
			/*,@RequestParam(value="verifyCode",required=false) String submitCode*/) {
		HttpSession session = request.getSession();
		
		// 计算当前session登录次数
		//Integer loginNum = countSessionLoginNum(session);
		
		mv.addObject("username", username);
		mv.addObject("password", password);
		//mv.addObject("loginNum", loginNum);
		
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		token.setRememberMe(true);

		// 获取当前的Subject
		Subject currentUser = SecurityUtils.getSubject();
		boolean flag = false;
		try {
			// 获取登录IP
			currentUser.getSession().setAttribute(Const.LOGIN_IP, Common.getRemoteAddrIp(request));
			// 在调用了login方法后,SecurityManager会收到AuthenticationToken（验证token）,并将其发送给已配置的Realm执行必须的认证检查
			currentUser.login(token);
			flag = true;
		} catch (Exception uae) {
			flag = false;
			mv.addObject(Const.RESPONSE_STATE, "500");
			mv.addObject(Const.ERROR_INFO, "用户名或密码不正确");
		}
		// 验证是否登录成功
		if (flag) {
			// 清除session登录次数
			session.removeAttribute(Const.SESSION_LOGIN_ERROR_NUM);
			// 必须清空(一：重定向优化访问地址栏变化；二：springMVC重向定会把参数带到地址栏后面，所以要清空)
			mv.clear();

			Users user = (Users) currentUser.getSession().getAttribute(Const.SESSION_USER);
			
			// 必须重定向 redirect:
			mv.setViewName("redirect:/admin/index.html");

			// 判断是否拥有角色
			if (StringUtils.isEmpty(user.getrId())) {
				mv.addObject(Const.RESPONSE_STATE, "500");
				mv.addObject(Const.ERROR_INFO, "当前账户还未赋予角色!");
				mv.setViewName("login");
			}

		} else {
			token.clear();
			mv.setViewName("login");
		}
		return mv;

	}
	
	/**
	 * 方法描述：计算当前session登录次数
	 * 返回类型：Integer
	 * @param session
	 * @return
	 */
	public Integer countSessionLoginNum(HttpSession session){
		Integer loginNum = 0;
		// 记录当前session次数
		Integer sessionLoginNum = (Integer) session.getAttribute(Const.SESSION_LOGIN_ERROR_NUM);
		if(sessionLoginNum == null){
			loginNum = 1;
		}else{
			loginNum = sessionLoginNum + 1;
		}
		session.setAttribute(Const.SESSION_LOGIN_ERROR_NUM, loginNum);
		
		return loginNum;
	}
	
	/**
	 * 方法描述：注销 返回类型：String
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/logout")
	public String logout(HttpServletRequest request) {
		SecurityUtils.getSubject().logout();
		return "redirect:/login.html";
	}
}
