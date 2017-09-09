<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="util.*" %> 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>客服系统</title>
    <link rel="stylesheet" href="layui/css/layui.css"/>
    <script type="text/javascript" src="layui/layui.js"></script>
    <style>
        html{background-color: #D9D9D9;}
    </style>
</head>
<body>
<%
Cookie cookies[] = request.getCookies(); 
String userName = "1";
String userId = "1";
/*if(null != cookies){
	for(int i = 0;i<cookies.length;i++){
		Cookie c = cookies[i];
		if("sfhw_kf0".equals(c.getName())){
			 String[] item = c.getValue().split("\\|");		 
			 userName = DesUtil.decode(item[1]);
			 userId = DesUtil.decode(item[0]);
		}
	}
}*/
String URL= "192.168.1.110";
//String URL= "kefu.seebong.com";
request.setAttribute("userName", userName);
request.setAttribute("userId", userId);
request.setAttribute("kehu", URL);
request.setAttribute("kefu_Online", Const.kefu_Online);
if(!Const.kefu_Online){
	Const.kefu_session = session.getId();
}
request.setAttribute("kefu_session", Const.kefu_session);
request.setAttribute("sessionId", session.getId());
%>
<c:if test="${kefu_Online == false || sessionId == kefu_session}"> 
<c:if test="${not empty userName}">

<div style="margin: 300px auto; text-align: center; font-size: 20px;">
</div>

<script>
    var uid = '100000';
    var socket = null;
    var kehu='${kehu}';
    var im = {
        getUid:function () {
            return uid;
        },
        init:function(){
            if ('WebSocket' in window){
                var uid = im.getUid();
                if(!uid){
                    console.log('当前用户未登陆，应该跳到login');
                }else {
                    var socketUrl = 'ws://'+kehu+'/websocket/'+ uid;
                    socket = new WebSocket(socketUrl);
                    im.startListener();
                }
            } else {
                alert('当前浏览器不支持WebSocket功能，请更换浏览器访问。');
            }
        },
        startListener:function () {
            if (socket) {
                // 连接发生错误的回调方法
                socket.onerror = function () {
                    //console.log("连接失败!");
                };
                // 连接成功建立的回调方法
                socket.onopen = function (event) {
                    //console.log("连接成功");
                }
                // 接收到消息的回调方法
                socket.onmessage = function (event) {
                    //console.log("接收到消息");
                    im.handleMessage(event.data);
                }
                // 连接关闭的回调方法
                socket.onclose = function () {
                    //console.log("关闭连接！!");
                }
            }
        },
        handleMessage:function (msg) {
            var msg = JSON.parse(event.data);
            //console.log(msg);
            switch (msg.type){
                case 'TYPE_TEXT_MESSAGE':
                    layim.getMessage(msg.msg);
                    break;
                default:
                    break;
            }
        }
    };

    im.init();


    layui.use('layim', function(layim){

        window.layim = layim;

        //基础配置
        layim.config({
            //初始化接口
            init: {

                mine: {
                    "username": "客服:${userName}"
                    ,"id": uid
                    ,"status": "online"
                    ,"sign": "商城客服"
                    ,"avatar": "default.jpg"
                }
            }

            ,uploadImage: {
                url: '/upload?t=img' //（返回的数据格式见下文）
            }

            ,uploadFile: {
                url: '/upload?t=file' //（返回的数据格式见下文）
            }
            //,voice: false
        });

        //监听发送消息
        layim.on('sendMessage', function(data){
           /* if (socket.readyState !== 1) {
                socket.close();
                im.init();
                setTimeout(function() {
                    var msg = JSON.stringify(data);
                    socket.send(msg);
                }, 250);
            } else {*/
                var msg = JSON.stringify(data);
                socket.send(msg);
            //};

        });

    });

</script>

 </c:if>
 
  <c:if test="${empty userName}">
  		非法访问
  </c:if>
 
</c:if> 
<c:if test="${kefu_Online == true  && sessionId != kefu_session}">
	<script type="text/javascript">
		alert("当前已有客服在线");
  	</script>
</c:if>

</body>
</html>

