package socket;

import pojo.SocketUser;
import pojo.message.ToServerTextMessage;
import socket.sender.MessageSender;
import socket.manager.OnLineUserManager;
import util.Const;
import util.LayIMFactory;

import javax.servlet.http.HttpServletRequestWrapper;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

/**
 * Created by pz on 16/11/23.
 */
@ServerEndpoint("/websocket/{uid}")
public class LayIMServer {

    @OnOpen
    public  void open(Session session, @PathParam("uid") int uid){
        SocketUser user = new SocketUser();
        user.setSession(session);
        user.setUserId(uid);

        if("100000".equals(uid+"") && !Const.kefu_Online){
        	Const.kefu_Online = true;
        }
        
        //保存在线列表
        LayIMFactory.createManager().addUser(user);
        print("当前在线用户："+LayIMFactory.createManager().getOnlineCount());
        print("缓存中的用户个数："+new OnLineUserManager().getOnLineUsers().size());
    }

    @OnMessage
    public void receiveMessage(String message,Session session){
        //try {

            ToServerTextMessage toServerTextMessage =
                    LayIMFactory.createSerializer().toObject(message,ToServerTextMessage.class);
            //得到接收的对象
            MessageSender sender = new MessageSender();

            sender.sendMessage(toServerTextMessage);

        //}catch (Exception e){
          //  e.printStackTrace();
        //}
    }

    @OnError
    public void error(Throwable t) {
        print(t.getMessage());
    }

    @OnClose
    public void close(Session session){

        if(Const.kefu_session == session.getId()){
        	Const.kefu_Online = true;
        	Const.kefu_session = null;
        }
    	
        SocketUser user = new SocketUser();
        user.setSession(session);
        user.setUserId(0);
        print("用户掉线");
        

        
        //移除该用户
        LayIMFactory.createManager().removeUser(user);
       //print("当前在线用户："+LayIMFactory.createManager().getOnlineCount());

    }

    private void print(String msg){
        System.out.println(msg);
    }
}
