package com.shifeng.demo;

import java.sql.Connection;
import java.sql.DriverManager;

public class SqlServer {
	public static void main(String[] srg) { 
		String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"; //加载JDBC驱动 
		String dbURL = "jdbc:sqlserver://192.168.1.106:1433;DatabaseName=SFOutdoorMall_Test"; //连接服务器和数据库sample 
		String userName = "sa"; //默认用户名 
		String userPwd = "QWEsfh2014Svnu"; //密码 
		Connection dbConn; 

		try { 
		Class.forName(driverName); 
		dbConn = DriverManager.getConnection(dbURL, userName, userPwd); 
		System.out.println( "Connection Successful! "); //如果连接成功 控制台输出Connection Successful! 
		} catch (Exception e) { 
		e.printStackTrace(); 
		} 
		} 

}
