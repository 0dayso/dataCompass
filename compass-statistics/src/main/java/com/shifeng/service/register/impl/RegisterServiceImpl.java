package com.shifeng.service.register.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shifeng.dao.BaseDao;
import com.shifeng.entity.register.Register;
import com.shifeng.service.register.RegisterService;
@Service("registerService")
public class RegisterServiceImpl implements RegisterService{
	
	@Resource(name = "baseDaoImpl")
	private BaseDao dao;

	
	/**
	 * 保存注册信息
	 * @param register
	 * @throws Exception
	 */
	public void saveRegister(Register register)throws Exception {
		dao.save("RegisterMapper.saveRegister", register);
	}


	@Override
	public Register getObject() {
		try {
			return (Register)dao.findForObject("RegisterMapper.getObject");
		} catch (Exception e) {
			return null;
		}
	}


	@Override
	public void update(Register register) {
		 try {
			dao.update("RegisterMapper.update", register);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
