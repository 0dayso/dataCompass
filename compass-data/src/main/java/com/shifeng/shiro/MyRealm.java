package com.shifeng.shiro;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;

import com.shifeng.entity.users.Users;
import com.shifeng.service.users.UsersService;
import com.shifeng.util.Const;
import com.shifeng.util.MD5Util;

public class MyRealm extends AuthorizingRealm {

	private Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name = "usersServiceImpl")
	private UsersService usersServiceImpl;
	
	/**
	 * 为当前登录的Subject授予角色和权限
	 * 
	 * @see 经测试:本例中该方法的调用时机为需授权资源被访问时
	 * @see 经测试:并且每次访问需授权资源时都会执行该方法中的逻辑,这表明本例中默认并未启用AuthorizationCache
	 * @see 个人感觉若使用了Spring3
	 *      .1开始提供的ConcurrentMapCache支持,则可灵活决定是否启用AuthorizationCache
	 * @see 比如说这里从数据库获取权限信息时,先去访问Spring3.1提供的缓存,而不使用Shior提供的AuthorizationCache
	 */
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		// 获取当前登录的用户
		Users user = (Users) this.getSession().getAttribute(Const.SESSION_USER);
		if (null != user) {
			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
			// 因权限逻辑中用户只拥有一种角色，所以取该属性即可
			Set<String> set = new HashSet<String>();
			if(user.getRole() != null){
				set.add(user.getRole().getrId());
			}else{
				set.add("");
			}
			// 用户角色
			info.setRoles(set);
			return info;
		} else {
			return null;
		}
	}

	/**
	 * 验证当前登录的Subject
	 * 
	 * @see 经测试:本例中该方法的调用时机为LoginController.login()方法中执行Subject.login()时
	 */
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
		// authcToken是从LoginController里面currentUser.login(token)传过来的
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		System.out.println("验证当前Subject时获取到token为" + ReflectionToStringBuilder.toString(token, ToStringStyle.MULTI_LINE_STYLE));
		
		Users user = new Users(token.getUsername(), token.getUsername(), MD5Util.hex(String.valueOf(token.getPassword())));
		user = usersServiceImpl.loginUserByPhoneOrEmail(user);
		if (null != user) {
			// 改变用户登录信息（IP、最后登录时间、登录次数）
			try {
				user.setuLoginIp(getSession().getAttribute(Const.LOGIN_IP)+"");
				getSession().removeAttribute(Const.LOGIN_IP);
				usersServiceImpl.updateUserLoginInfo(user);
			} catch (Exception e) {
				logger.error("更改用户登录信息（IP、最后登录时间、登录次数）异常："+e);
			}
			AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(token.getUsername(), token.getPassword(), this.getName());
			this.setSession(Const.SESSION_USER, user);
			return authcInfo;
		} else {
			return null;
		}
	}

	/**
	 * 将一些数据放到ShiroSession中,以便于其它地方使用
	 * 
	 * @see 比如Controller,使用时直接用HttpSession.getAttribute(key)就可以取到
	 */
	private void setSession(Object key, Object value) {
		Subject currentUser = SecurityUtils.getSubject();
		if (null != currentUser) {
			Session session = currentUser.getSession();
			if (null != session) {
				session.setAttribute(key, value);
			}
		}
	}

	/**
	 * 方法描述：获取Session判断此用户是否存在 返回类型：Session
	 * 
	 * @return
	 */
	private Session getSession() {
		Subject currentUser = SecurityUtils.getSubject();
		Session session = null;
		if (null != currentUser) {
			session = currentUser.getSession();
		}
		return session;
	}

}
