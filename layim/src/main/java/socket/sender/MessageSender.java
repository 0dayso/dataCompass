package socket.sender;

import pojo.SocketUser;
import pojo.message.ToClientTextMessage;
import pojo.message.ToServerMessageMine;
import pojo.message.ToServerMessageTo;
import pojo.message.ToServerTextMessage;
import pojo.result.ToClientMessageResult;
import pojo.result.ToClientMessageType;
import socket.LayIMChatType;
import socket.manager.GroupUserManager;
import util.Const;
import util.DateUtil;
import util.LayIMFactory;
import util.log.LayIMLog;

import javax.websocket.Session;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 发送信息类
 * 所有从客户端到服务端的消息转发到此类进行消息处理
 * ToServerTextMessage转换为ToClientTextMessage
 * 如果是单聊，直接从缓存取出对象的session进行消息发送，群聊则需要从缓存中取出该群里所有人的id进行遍历发送消息，
 * 遍历过后需要优化在线与否，假如100人中只有一个人在线，则会浪费99次（未做优化）
 */
public class MessageSender {
    //发送信息业务逻辑
    public void sendMessage(ToServerTextMessage message){

        int toUserId = message.getTo().getId();
        //获取发送人
        String sendUserId = Integer.toString(message.getMine().getId());
        String type =  message.getTo().getType();
        //消息提前生成，否则进行循环内生成会浪费资源
        String toClientMessage = getToClientMessage(message);

        System.out.println("当前消息类型是"+type);
        //不能用==做比较，因为一个是static final 值，另外一个是在对象中 == 为false
        if(type.equals(LayIMChatType.GROUP)){
            //群聊，需要遍历该群组里的所有人
            //第一次从缓存中取userId，否则，从数据库中取在存到缓存中
            List<String> users =  new GroupUserManager().getGroupMembers(message.getTo().getId());
            for (String userid : users) {
                //遍历发送消息 自己过滤，不给自己发送(发送人id和群成员内的某个id相同)
                if (!sendUserId.equals(userid)) {
                    sendMessage(message,Integer.parseInt(userid), toClientMessage);
                }
            }
        }else {
            sendMessage(message,toUserId, toClientMessage);
        }

        //最后保存到数据库
        saveMessage(message);

    }

    //给单个用户发
    private  void sendMessage(ToServerTextMessage message,Integer userId,String msg){
        SocketUser user = LayIMFactory.createManager().getUser(userId);
        if (user.isExist()) {
            if (user.getSession() == null) {
                LayIMLog.info("该用户不在线 ");
                offLine(message);
            } else {
                Session session = user.getSession();
                if (session.isOpen()) {
                    //构造用户需要接收到的消息
                    session.getAsyncRemote().sendText(msg);
                }
            }
        }else{
            LayIMLog.info("该用户不在线 ");
            offLine(message);
        }
    }
    
    /**
     * 离线提示
     */
    private void offLine(ToServerTextMessage message){
    	LayIMLog.info("提示离线");
    	
    	ToServerMessageMine mine = message.getMine();
	    ToServerMessageTo to = message.getTo();

	    String avatar = mine.getAvatar();
	    int id = mine.getId();
	    String content = mine.getContent();
	    String username = mine.getUsername();
	    
	    mine.setId(to.getId());	    
	    if("100000".equals(mine.getId()+"")){
	    	mine.setContent("抱歉，当前客服不在线，请稍后再次咨询！\n或拨打客服电话：400-0928-400");
	    }else{
	    	mine.setContent("咨询用户已离线！！！");
	    }
	    
	    mine.setUsername(to.getName());
	    mine.setAvatar(to.getAvatar());
	    
	    to.setAvatar(avatar);
	    to.setId(id);
	    to.setName(username);
	    
	    message.setMine(mine);
	    message.setTo(to);
	    SocketUser user = LayIMFactory.createManager().getUser(id);
	    Session session = user.getSession();
        if (session.isOpen()) {
            //构造用户需要接收到的消息
            session.getAsyncRemote().sendText(getToClientMessage(message));
        }
    }

    //保存到数据库
    //需要加入到队列
    private void saveMessage(ToServerTextMessage message){
       /* ToDBMessage dbMessage = new ToDBMessage();

        dbMessage.setSendUserId(message.getMine().getId());
        dbMessage.setAddtime(new Date().getTime());
        dbMessage.setChatType( message.getTo().getType().equals(LayIMChatType.FRIEND) ? LayIMChatType.CHATFRIEND:LayIMChatType.CHATGROUP);
        dbMessage.setMsgType(1);//这个参数先不管就是普通聊天记录
        long groupId = getGroupId(message.getMine().getId(),message.getTo().getId(),message.getTo().getType());
        dbMessage.setGroupId(groupId);
        dbMessage.setMsg(message.getMine().getContent());

        LayIMDao dao = new LayIMDao();

        dao.addMsgRecord(dbMessage); */
    	
    	
    	
    	// 创建HttpClientBuilder
		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		// HttpClient
		CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
		HttpPost httpPost = new HttpPost(Const.WWW+"/msg/send");
		//System.out.println(httpPost.getRequestLine());
		try {
			ToServerMessageMine mine = message.getMine();
		    ToServerMessageTo to = message.getTo();
			List<NameValuePair> nvps = new ArrayList<NameValuePair>();  
			if("100000".equals(mine.getId()+"")){
		        nvps.add(new BasicNameValuePair("userid", to.getId()+""));
		        nvps.add(new BasicNameValuePair("username", to.getName()));  
		        nvps.add(new BasicNameValuePair("ip", "0.0.0.0"));  
		        nvps.add(new BasicNameValuePair("ctime", DateUtil.getTime()));  
		        nvps.add(new BasicNameValuePair("source", "0"));  
		        nvps.add(new BasicNameValuePair("type", "0"));  
		        nvps.add(new BasicNameValuePair("shopid", mine.getId()+""));  
		        nvps.add(new BasicNameValuePair("shopname", mine.getUsername()));  
		        nvps.add(new BasicNameValuePair("content", mine.getContent()));   
		        nvps.add(new BasicNameValuePair("status", "2"));  
			}else{
		        nvps.add(new BasicNameValuePair("userid", mine.getId()+""));
		        nvps.add(new BasicNameValuePair("username", mine.getUsername()));  
		        nvps.add(new BasicNameValuePair("ip", "0.0.0.0"));  
		        nvps.add(new BasicNameValuePair("ctime", DateUtil.getTime()));  
		        nvps.add(new BasicNameValuePair("source", "0"));  
		        nvps.add(new BasicNameValuePair("type", "0"));  
		        nvps.add(new BasicNameValuePair("shopid", to.getId()+""));  
		        nvps.add(new BasicNameValuePair("shopname", to.getName()));  
		        nvps.add(new BasicNameValuePair("content", mine.getContent()));   
		        nvps.add(new BasicNameValuePair("status", "1"));  
				
			} 
			httpPost.setEntity(new UrlEncodedFormEntity(nvps,"UTF-8")); 
			// 执行get请求
			HttpResponse httpResponse = closeableHttpClient.execute(httpPost);
			
			  //获取响应消息实体 HttpEntity entity = httpResponse.getEntity(); //响应状态
			  /*System.out.println("status:" + httpResponse.getStatusLine());
			  //判断响应实体是否为空 if (entity != null) {
			  System.out.println("contentEncoding:" +
			  entity.getContentEncoding()); System.out.println(
			  "response content:" + EntityUtils.toString(entity)); }*/
			 
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				// 关闭流并释放资源
				closeableHttpClient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
    	
    	
    }

    //根据客户端发送来的消息，构造发送出去的消息
     /*
        *  username: data.mine.username
            , avatar: data.mine.avatar
            , id: data.mine.id
            , type: data.to.type
            , content:data.mine.content
            , timestamp: new Date().getTime()
        * */
    private String getToClientMessage(ToServerTextMessage message) {

        ToClientTextMessage toClientTextMessage = new ToClientTextMessage();

        ToServerMessageMine mine = message.getMine();

        toClientTextMessage.setUsername(mine.getUsername());
        toClientTextMessage.setAvatar(mine.getAvatar());
        toClientTextMessage.setContent(mine.getContent());
        toClientTextMessage.setType(message.getTo().getType());

        //群组和好友直接聊天不同，群组的id 是 组id，否则是发送人的id
        if (toClientTextMessage.getType().equals(LayIMChatType.GROUP)) {
            toClientTextMessage.setId(message.getTo().getId());
        } else {
            toClientTextMessage.setId(mine.getId());
        }
        toClientTextMessage.setTimestamp(new Date().getTime());

        //返回统一消息接口
        ToClientMessageResult result = new ToClientMessageResult();
        result.setMsg(toClientTextMessage);
        result.setType(ToClientMessageType.TYPE_TEXT_MESSAGE);

        return LayIMFactory.createSerializer().toJSON(result);
    }

    //生成对应的groupId
    private long getGroupId(int sendUserId,int toUserId,String type){

        //如果是组内聊天，直接返回组id，否则返回 两个id的组合
        if (type.equals(LayIMChatType.GROUP)){
            return toUserId;
        }


        String sendUserIdStr = Integer.toString(sendUserId);
        String toUserIdStr = Integer.toString(toUserId);

        String groupIdStr = "";
        //按照固定次序生成相应的聊天组
        if (sendUserId > toUserId){
            groupIdStr = sendUserIdStr + toUserIdStr;
        }else{
            groupIdStr = toUserIdStr + sendUserIdStr;
        }

        long groupId = Long.parseLong(groupIdStr);
        return groupId;
    }
}
