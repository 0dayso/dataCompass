import com.shifeng.ip.IPSeeker;

import java.io.IOException;

/**
 * Created by yongshi on 2016/11/16.
 */
public class Test {
    public static void main(String[] args) throws IOException {
        String IP = "219.142.228.38";
        //IPSeeker.I.init();
        String country = IPSeeker.I.getAddress(IP);
        System.out.println(country);
          country = IPSeeker.I.getAddress("58.20.43.13");
        System.out.println(country);
          country = IPSeeker.I.getAddress("219.142.228.38");
        System.out.println(country);
          country = IPSeeker.I.getAddress("122.159.58.235");
        System.out.println(country);
    }

}
