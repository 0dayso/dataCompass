package com.shifeng.test;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.util.EntityUtils;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by yongshi on 2016/12/2.
 */

public class MyPost {
    //static String Url="http://192.168.1.222:8812/";
    static String Url="http://open.wanrma.com/";
    public static String doPost(String url,Map<String,String> paramermap){
        if(paramermap==null||paramermap.size()==0){
            return null;
        }
        String result = null;
        HttpResponse httpResponse = null;
        HttpPost post = new HttpPost(Url+url);
        DefaultHttpClient client = new DefaultHttpClient();
        client.getParams().setIntParameter(HttpConnectionParams.SO_TIMEOUT,
                30000);
        client.getParams().setIntParameter(
                HttpConnectionParams.CONNECTION_TIMEOUT, 10000);
        ArrayList<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();


        for (String key : paramermap.keySet()) {
            nameValuePairs.add(new BasicNameValuePair(key, paramermap.get(key)));
        }


        try {
            post.setEntity(new UrlEncodedFormEntity(nameValuePairs, "utf-8"));
            httpResponse = client.execute(post);
            if (httpResponse.getStatusLine().getStatusCode() == 200) {
                result = EntityUtils.toString(httpResponse.getEntity(), "utf-8");
            } else {
                result = null;
            }
        } catch (UnsupportedEncodingException e) {
            result = null;
        } catch (ClientProtocolException e) {
            result = null;
        } catch (IOException e) {
            result = null;
        }
        return result;
    }

    static void testPost() {
        try {
            URL url = new URL("https://api.mch.weixin.qq.com/pay/unifiedorder");
            URLConnection con = url.openConnection();
            con.setDoOutput(true);
            con.setRequestProperty("Pragma:", "no-cache");
            con.setRequestProperty("Cache-Control", "no-cache");
            con.setRequestProperty("Content-Type", "text/xml");

            OutputStreamWriter out = new OutputStreamWriter(con
                    .getOutputStream());
            String xmlInfo = "<xml><appid>wx2e1deda16bcced1d</appid><body>世峰户外商城-订单号：16120200625</body><mch_id>1323511701</mch_id><nonce_str>1c43707d977e4d0b97939ba893facd33</nonce_str><notify_url>http://open.sfhwsc.com/api/pay/notify_wx_url</notify_url><out_trade_no>16120200625</out_trade_no><spbill_create_ip>124.126.135.161</spbill_create_ip><total_fee>17800</total_fee><trade_type>JSAPI</trade_type><sign>03FEA7904D7DCD7674FCDCA7684EA341</sign></xml>";

            System.out.println("xmlInfo=" + xmlInfo);
            out.write(new String(xmlInfo.getBytes("ISO-8859-1")));
            out.flush();
            out.close();
            BufferedReader br = new BufferedReader(new InputStreamReader(con
                    .getInputStream()));
            String line = "";
            for (line = br.readLine(); line != null; line = br.readLine()) {
                System.out.println(line);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static String doPostXML(){
        {

            String result = null;
            HttpResponse httpResponse = null;
            HttpPost post = new HttpPost("https://api.mch.weixin.qq.com/pay/unifiedorder");
            DefaultHttpClient client = new DefaultHttpClient();
            client.getParams().setIntParameter(HttpConnectionParams.SO_TIMEOUT,
                    30000);
            client.getParams().setIntParameter(
                    HttpConnectionParams.CONNECTION_TIMEOUT, 10000);
            ArrayList<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
            nameValuePairs.add(new NameValuePair() {
                @Override
                public String getName() {
                    return "";
                }

                @Override
                public String getValue() {
                    return "<xml>" +
                            "<appid>wx2e1deda16bcced1d</appid>" +
                            "<body>世峰户外商城-订单号：16120200625</body>" +
                            "<mch_id>1323511701</mch_id>" +
                            "<nonce_str>1c43707d977e4d0b97939ba893facd33</nonce_str>" +
                            "<notify_url>http://open.sfhwsc.com/api/pay/notify_wx_url</notify_url>" +
                            "<out_trade_no>16120200625</out_trade_no>" +
                            "<spbill_create_ip>124.126.135.161</spbill_create_ip>" +
                            "<total_fee>17800</total_fee>" +
                            "<trade_type>JSAPI</trade_type>" +
                            "<sign>03FEA7904D7DCD7674FCDCA7684EA341</sign>" +
                            "</xml>";
                }
            });
            try {

                post.setEntity(new UrlEncodedFormEntity(nameValuePairs, "utf-8"));
                httpResponse = client.execute(post);
                if (httpResponse.getStatusLine().getStatusCode() == 200) {
                    result = EntityUtils.toString(httpResponse.getEntity(), "utf-8");
                } else {
                    result = null;
                }
            } catch (UnsupportedEncodingException e) {
                result = null;
            } catch (ClientProtocolException e) {
                result = null;
            } catch (IOException e) {
                result = null;
            }
            return result;
        }
    }
}
