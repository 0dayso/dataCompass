<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="util.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>商城客服</title>

    <link rel="stylesheet" href="layui/css/modules/layui.mobile.css">
    <link id="layuicss-skinlayim-mobilecss" rel="stylesheet" href="layui/css/modules/layim/mobile/layim.css" media="all">
    <script type="text/javascript" src="layui/layuim.js"></script>
    <script src="http://apps.bdimg.com/libs/jquery/1.8.2/jquery.min.js"></script>
    <style>
        html{background-color: #D9D9D9;}
    </style>
</head>
<body>

<%
    /* //获取cookie
    Cookie cookie = new Cookie("sfhw_uc0", "aSQyLnnxV0E=|yH4tTYSTeDA=");
    //cookie有效期一个月
    cookie.setMaxAge(60*60*24*30);
    cookie.setPath("/");
    response.addCookie(cookie);

    cookie = new Cookie("sfhw_kf0", "aSQyLnnxV0E=|yH4tTYSTeDA=");
    //cookie有效期一个月
    cookie.setMaxAge(60*60*24*30);
    cookie.setPath("/");
    response.addCookie(cookie); */

    //Cookie cookies[] = request.getCookies();
    String userName =request.getParameter("userName");
    String userId =request.getParameter("userId");
    /*if(null != cookies){
        for(int i = 0;i<cookies.length;i++){
            Cookie c = cookies[i];
            if("sfhw_uc0".equals(c.getName())){
                String[] item = c.getValue().split("\\|");
                userName = DesUtil.decode(item[1]);
                userId = DesUtil.decode(item[0]);
            }
        }
    }*/
/* if(null == userName){
	int id = (int)(Math.random()*1000000);
	userName = "游客"+id;
	userId = ""+id;
} */
    request.setAttribute("kehu", "kefu.seebong.com");
    request.setAttribute("userName", userName);
    request.setAttribute("userId", userId);

%>
<c:if test="${not empty userName}">
    <script>
        var uid = '${userId }';
        var kehu='${kehu}';
        var socket = null;
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
                        // console.log("关闭连接！!");
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

        layui.use('mobile', function(){
            var mobile = layui.mobile
                    ,layim = mobile.layim
                    ,layer = mobile.layer;
            window.layim = layim;
            //基础配置
            layim.config({
                //初始化接口
                init: {
                    mine: {
                        "username": "${userName }"
                        ,"id": uid
                        ,"status": "online"
                        ,"sign": ""
                        ,"avatar": "user_default.jpg"
                    }
                }
                //简约模式（不显示主面板）
                ,brief: true
                ,uploadImage: {
                    url: 'upload?t=img' //（返回的数据格式见下文）
                }
                ,uploadFile: {
                    url: 'upload?t=file' //（返回的数据格式见下文）
                }
            });

            layim.chat({
                name: '商城客服'
                ,type: 'kefu'
                ,avatar: 'default.jpg'
                ,id: 100000
            });
            $(".layim-chat-title").hide();
             $(".layim-chat-status").parent().hide();
            $(".layim-chat-title").css("background-color","#eee");
            //layim.setChatMin();

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
    <script type="text/javascript">
        window.location="http://passport.seebong.com/login?returnUrl=http://kefu.seebong.com";
    </script>
</c:if>

</body>
</html>

