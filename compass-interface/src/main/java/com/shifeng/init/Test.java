package com.shifeng.init;

import com.shifeng.ip.IPSeeker;

public class Test {
	public static void main(String[] args) {
		String IP = "219.142.228.38";

		String country = IPSeeker.I.getAddress(IP);
		System.out.println(country);

	}

}
