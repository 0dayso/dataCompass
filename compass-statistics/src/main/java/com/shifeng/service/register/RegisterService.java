package com.shifeng.service.register;

import com.shifeng.entity.register.Register;

public interface RegisterService {
	
	/**
	 * 保存注册信息
	 * @param register
	 * @throws Exception
	 */
	void saveRegister(Register register)throws Exception;
	
	Register getObject();
	void update(Register register);

}
