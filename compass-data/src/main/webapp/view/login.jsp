<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>

<head>
    <base href="<%=basePath%>">

    <title>统计后台管理系统 - 登录</title>
    
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta http-equiv="X-UA-Compatible" content="IE=edge;chrome=1">
    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/font-awesome.min.css" rel="stylesheet">
    <link href="static/css/animate.min.css" rel="stylesheet">
    <link href="static/css/login.min.css" rel="stylesheet">
    <script>if(window.top !== window.self){ window.top.location = window.location;}</script>
	<style type="text/css">
	.layui-layer-title{
		background-color: #F8F4ED !important;
	}
	.layui-layer-content{
		color:black !important; 
	}
	</style>
</head>

<body class="signin">
    <div class="signinpanel">
        <div class="row">
            <div class="col-sm-7">
                <div class="signin-info">
                    <div class="logopanel m-b">
                        <h1>[ 商城数据统计管理系统 ]</h1>
                    </div>
                    <div class="m-b"></div>
                    <h4>欢迎使用 <strong>商城数据统计管理系统 </strong></h4>
                    <!-- <ul class="m-b">
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势一</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势二</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势三</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势四</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势五</li>
                    </ul> -->
                </div>
            </div>
            <div class="col-sm-5">
                <form method="post" action="login/check.html" id="login_form">
                	<%-- <input type="hidden" name="loginNum" value="${loginNum }" /> --%>
                    <h4 class="no-margins">登录：</h4>
                    <p class="m-t-md">登录到商城数据统计管理系统 </p>
                    <input type="text" class="form-control uname" placeholder="手机号&nbsp;/&nbsp;邮箱" value="${username }" name="username" id="user_name" maxlength="50" />
                    <input type="password" class="form-control pword m-b" placeholder="密码" value="${password }" name="password" id="user_password" />
                    <br>
					<div style="overflow: hidden;display: none;padding: 20px 0px 0px 25px;" id="check_login_geetest">
	                    <div id="div_geetest_lib">
	                    </div>
						<div id="div_id_embed"></div>
                    </div>
                    
                    
                    <a id="wjmm" href="#">忘记密码？</a>
                    <button class="btn btn-success btn-block" type="button" id="submit_btn" >登录</button>
                    <br>
                     
                </form>
            </div>
        </div>
        <div class="signup-footer">
            <div class="pull-left">
                &copy; 2016 All Rights Reserved. 世峰户外商城
            </div>
        </div>
    </div>
</body>


<script type="text/javascript" src="static/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="static/js/plugins/layer/layer.js"></script>
<script type="text/javascript">
$(function(){
	$('#user_name').focus();
	$('#token').click(function(){
		$(this).attr('src','pcimg');
	});
	$('#wjmm').click(function(){
		layer.alert('请联系系统管理员重置密码！', {icon: 0});
	});
	$('#submit_btn').click(function(){
		if($('#user_name').val().trim() == ''){
			layer.tips('<span style="color:white;">用户名不可为空，请写入注册的手机号或邮箱。</span>','#user_name', {
			    tips: [1, '#3595CC'],
			    time: 2000,
			    color: 'white'
			});
			$('#user_name').focus();
			return;
		}else if($('#user_password').val().trim() == ''){
			layer.tips('<span style="color:white;">请输入密码。</span>','#user_password', {
			    tips: [1, '#3595CC'],
			    time: 2000
			});
			$('#user_password').focus();
			return;
		}
		
		$('#login_form').submit();
		
	});
	check_login();
});

function check_login(){
	var RESPONSE_STATE ='${RESPONSE_STATE }';
	var ERROR_INFO ='${ERROR_INFO }';
	if(RESPONSE_STATE != 200 && RESPONSE_STATE != ''){
		layer.msg(ERROR_INFO,{icon:0});
	}
}

$(document).keyup(function(event){
	  if(event.keyCode ==13){
	    $("#submit_btn").trigger("click");
	  }
});


</script>
                    
</html>