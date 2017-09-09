<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>


<head>
	<base href="<%=basePath%>">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    

    <title>户外门户 - 系统用户编辑</title>

    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/font-awesome.min.css" rel="stylesheet">
    <link href="static/css/animate.min.css" rel="stylesheet">

    <link href="static/css/style.min.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="static/css/plugins/iCheck/custom.css" rel="stylesheet">

</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
		<div class="row">
			<div id="user-box" class="col-sm-12">
				<div class="ibox">
					<div class="ibox-content">
                        <form action="" id="userForm" method="post" class="form-horizontal">
                        	<input type="hidden" name="uId" id="uId" value="${user.uId }">
                        	<c:if test="${not empty user.uHeadImg }">
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><!-- 头像 --></label>

                                <div class="col-sm-10">
                                    <img alt="image" style="width: 100px; height: 100px;" class="img-circle" src="${user.uHeadImg }" >
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            </c:if>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">用户名</label>

                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="用户名" id="uName"  name="uName" value="${user.uName }">
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">性别</label>

                                <div class="col-sm-10">
                                        <label>
                                            <input type="radio" <c:if test="${ empty user.uId || user.uSex == 1 }">checked="checked"</c:if> value="1" name="uSex" class="radio i-checks"> <i></i> 男</label>
                                            &nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input type="radio" <c:if test="${user.uSex == 2 }">checked="checked"</c:if> value="2" name="uSex" class="radio i-checks"> <i></i> 女</label>
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">邮箱</label>

                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="邮箱" name="uEmail" id="uEmail" value="${user.uEmail }">
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">手机</label>

                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="手机" name="uPhone" id="uPhone" value="${user.uPhone }">
                                </div>
                            </div> 
                            <div class="hr-line-dashed"></div>
                            <c:if test="${not empty user.uId }">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">密码</label>

                                <div class="col-sm-10">
                                    <input type="password" class="form-control" placeholder="留空为不修改密码"  name="newPassword">
                                </div>
                            </div>
                            </c:if>
                            <c:if test="${empty user.uId }">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">密码</label>

                                <div class="col-sm-10">
                                    <input type="password" autocomplete="off" class="form-control" placeholder="输入密码" id="uPassword" name="uPassword">
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">密码确认</label>

                                <div class="col-sm-10">
                                    <input type="password" class="form-control" placeholder="再次输入密码"  name="checkPassword">
                                </div>
                            </div>
                            </c:if> 
                            <c:if test="${not empty user.uId }">
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">注册时间</label>

                                <div class="col-sm-10">
                                    <p class="form-control-static"><fmt:formatDate value="${user.uCreateTime }" type="both"/></p>
                                </div>
                            </div>
                            </c:if>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">角色分组</label>

                                <div class="col-sm-5">
                                <select data-placeholder="选择分组..." class="form-control m-b" id="group" >
                                    <option value>选择分组...</option>
                                    
                                    <c:forEach var="array" items="${arrays }" >
                                    	<option <c:if test="${user.aId == array.AID }">selected="selected"</c:if> value="${array.AID }">${array.ANAME }</option>
                                    </c:forEach>
                                </select>
                                </div> 
                                <div class="col-sm-5">
                                <select data-placeholder="选择角色..." class="form-control m-b" id="role" name="rId" >
                                    <option value>选择角色...</option>
                                    <c:forEach var="role" items="${roles }" >
                                    	<option <c:if test="${user.rId == role.RID }">selected="selected"</c:if> value="${role.RID }">${role.RNAME }</option>
                                    </c:forEach>
                                </select>
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <div class="col-sm-4 col-sm-offset-2">
                                    <a class="btn btn-primary" id="submit">保存内容</a>
                                    <a class="btn btn-white" id="cancel">取消</a>
                                </div>
                            </div>
                        </form>
                    </div>
				</div>
			</div>
	 </div>
</div>
	<!-- 全局js -->
    <script src="static/js/jquery-2.1.1.min.js"></script>
    <script src="static/js/bootstrap.min.js"></script>
	<script src="static/js/plugins/layer/layer.min.js"></script>
    <!-- jQuery Validation plugin javascript-->
    <script src="static/js/plugins/validate/jquery.validate.min.js"></script>
    <script src="static/js/plugins/validate/messages_zh.min.js"></script>
    <!-- iCheck -->
    <script src="static/js/plugins/iCheck/icheck.min.js"></script>
    <script>
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
		$(function() {
			 $(".i-checks").iCheck({
			    radioClass: "iradio_square-green",
			 });
	    });
					
					 $.validator.setDefaults({
					     highlight: function(a) {
					         $(a).closest(".form-group").removeClass("has-success").addClass("has-error");
					     },
					     success: function(a) {
					         a.closest(".form-group").removeClass("has-error").addClass("has-success");
					     },
					     errorElement: "span",
					     errorPlacement: function(a, b) {
					         if (b.is(":radio") || b.is(":checkbox")) {
					             a.appendTo(b.parent().parent().parent());
					         } else {
					             a.appendTo(b.parent());
					         }
					     },
					     errorClass: "help-block m-b-none",
					     validClass: "help-block m-b-none"
					 });
					 var err = "<i class='fa fa-times-circle'></i> ";
					 // 密码验证，以字母开头，长度在8-15之间，密码至少包含一个大写字母、一个小写字母。
					 jQuery.validator.addMethod("passwordCheck", function(value, element) {       
						 return this.optional(element) || /^(?=^.{8,15}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
					 }, err+"密码至少包含一个大写字母、一个小写字母，长度至少8位"); 
					 //手机号码验证   
					 jQuery.validator.addMethod("mobileCheck", function(value,element) {   
					        var length = value.length;   
					        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;   
					        return this.optional(element) || (length==11 && mobile.test(value));   
					 }, err+"请填写正确的手机号码"); 
					 $().ready(function() {
					     
					     $("#userForm").validate({
					         rules: {
					        	 
					             uName: {
					                 required: true,
					                 minlength: 2,
					                 maxlength: 10,
					                 remote: {
					                	    url: "check/user.html",     //后台处理程序
					                	    type: "post",               //数据发送方式
					                	    dataType: "json",           //接受数据格式    只能返回 "true" 或 "false"，不能有其他输出。
					                	    data: {                     //要传递的数据 
					                	    	uName: function() {
					                	            return $("#uName").val();
					                	        },                     //要传递的数据 
						             	    	uId: function() {
						            	            return $("#uId").val();
						            	        }
					                	    }
					                	}
					             },
					     		uEmail:{
					     			required: true,
					     			email:true,
					                 remote: {
					                	    url: "check/user.html",      
					                	    type: "post",                
					                	    dataType: "json",            
					                	    data: {                      
					                	    	uEmail: function() {
					                	            return $("#uEmail").val();
					                	        },                     //要传递的数据 
						             	    	uId: function() {
						            	            return $("#uId").val();
						            	        }
					                	    }
					                	}
					     		},
					     		uPhone:{
					     			required: true,
					     			mobileCheck:true,
					                 remote: {
					                	    url: "check/user.html",      
					                	    type: "post",                
					                	    dataType: "json",           
					                	    data: {                      
					                	    	uPhone: function() {
					                	            return $("#uPhone").val();
					                	        },                     //要传递的数据 
						             	    	uId: function() {
						            	            return $("#uId").val();
						            	        }
					                	    }
					                	}
					     		},
					     		uPassword:{
					     			required: true,
					     			passwordCheck:true
					     		},
					     		newPassword:{
					     			required: false,
					     			passwordCheck:true
					     		},
					     		checkPassword:{
					     			required: true,
					     			rangelength: [8, 15],
					     			equalTo: "#uPassword"
					     		},
					     		uSex: {
					     			required: true
					     		}, 
					     		rId:{
					     			required: true
					     		}
					         },
					         messages: {
					        	 uName: {
					                 required: err + "请输入您的用户名",
					                 minlength: err + "用户名必须两个字符以上",
					                 remote: err + "用户名已存在"
					             },
					             uEmail:{
					            	 required: err + "请输入邮箱",
					            	 email: "请输入正确格式的邮箱",
					                 remote: err + "邮箱已存在"
					             },
					             checkPassword: {  
				                        required: err +"请输入确认密码",  
				                        rangelength: err +"确认密码不能小于8个字符",  
				                        equalTo: err +"两次输入密码不一致"  
				                  },
						     	  uSex: {
						     			required: err +"请选择性别"
						     	  },
						     	  uPhone:{
						     			required: err +"请输入手机号码",
						                 remote: err + "手机号已存在"
						     	  },
						     	  uPassword:{
						     			required: err +"请输入密码"
						     	  },
						     	 rId:{
						     		required: err +"请选择角色" 
						     	 }
					         }
					     }); 
					 });				
					  
			 			//保存系统用户
			            $("#submit").on("click" , function(){
			            	 if($("#userForm").valid()){
			            		 var loadingIndex = 0;
			            		 $.ajax({
			            	            type:"POST",
			            	            url:"user/addSysUser.html",
			            	            data:$("#userForm").serialize(),
			            	            datatype: "json",
			            	            //在请求之前调用的函数
			            	            beforeSend:function(){
			            	            	loadingIndex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
			            	            },
			            	            //成功返回之后调用的函数             
			            	            success:function(data){
			            	            	
			            	            	layer.close(loadingIndex);
			            	            	if(data.RESPONSE_STATE == "200"){
			            	            	    layer.msg("保存成功！", {icon: 1, time: 1000}, function(){
			            	            	    	//关闭后的操作
			            	            	    	parent.window.location.reload();//$("#sysUser").submit();
			            	            	    });
			            	            	}else{
			            	            		layer.alert(data.ERROR_INFO, {icon: 0});
			            	            	}
				            	        },
			            	            error: function(){
			            	            	layer.close(loadingIndex);
			            	            	layer.alert("未知错误！", {icon: 0});
			            	            }         
			            	         });
			            	 }
			            }); 
			           
			 			//取消
			            $("#cancel").on("click" , function(){
			            	 parent.layer.close(index);
			            }); 
			 			
			            $("#group").change(function() {
			        		var aId = $(this).val();
			        		$.post("roles/getSysRole/"+aId+".html",function(data){
			        			
			        		   var role = $("#role");	
			        		   role.empty(); 
			        		   role.append("<option value>选择角色...</option>");
			      		       $.each(data,function(idx,item){
			      		    		role.append("<option value='"+item.RID+"' >"+item.RNAME+"</option>");
			      		       });
							}); 
			        	});

	</script>


</body>


</html>