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

    <title>户外门户 - 会员管理</title>

    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/font-awesome.min.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="static/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="static/css/animate.min.css" rel="stylesheet">
    <link href="static/css/style.min.css" rel="stylesheet">
    <link href="static/css/page.css" rel="stylesheet">
	<style type="text/css">
		.curr{
			background-color: #A6DBD0;
		}
		.center {
		  text-align: center;
		} 
		.img-gyrate{   
		    box-shadow: inset 0 -1px 0 #3333sf;/*设置图像阴影效果*/  
		    -webkit-box-shadow: inset 0 -1px 0 #3333sf;   
		    -webkit-transition: 0.4s;      
		    -webkit-transition: -webkit-transform 0.4s ease-out;   
		    transition: transform 0.4s ease-out;/*变化时间设置为0.4秒(变化动作即为下面的图像旋转360读）*/  
		    -moz-transition: -moz-transform 0.4s ease-out;   
		}    
		.img-gyrate:hover{/*设置鼠标悬浮在头像时的CSS样式*/  
		    box-shadow: 0 0 10px #fff; rgba(255,255,255,.6), inset 0 0 20px rgba(255,255,255,1);   
		    -webkit-box-shadow: 0 0 10px #fff; rgba(255,255,255,.6), inset 0 0 20px rgba(255,255,255,1);   
		    transform: rotateZ(360deg);/*图像旋转360度*/  
		    -webkit-transform: rotateZ(360deg);   
		    -moz-transform: rotateZ(360deg);   
		}
				
		
	</style> 

    <!-- 全局js -->
    <script src="static/js/jquery-2.1.1.min.js"></script>

</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div id="user-box" class="col-sm-12">
                <div class="ibox">
                <form id="sysUser" action="user/sysList.html" method="post">
                    <div class="ibox-content">
                        <h2>系统用户管理</h2>
                        <div class="input-group">
                        	<div class="col-md-6">
                               <input type="text" placeholder="用户昵称" name="uName" value="${user.uName }" class="input form-control">
                            </div> 
                           <div class="col-md-4">
                                       <button type="submit" class="btn btn btn-primary"> <i class="fa fa-search"></i> 搜索</button>
                            </div>
                        </div>
                       <div class="hr-line-dashed"></div> 
                            <div class="tab-content">
                                <div class="tab-pane active">
                                    <div class="full-height-scroll">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover">
	                                            <thead>
					                                <tr>
					                                	<th>
						                                   <label><input type="checkbox" id="checkAll" class="i-checks"></label>
														</th>
					                                    <th></th>
					                                    <th>姓名</th>
					                                    <th>性别</th>
					                                    <th>Email</th>
					                                    <th>电话</th>
					                                    <th>角色分组</th>               
					                                    <th>最后登录时间</th>              
					                                    <th>最后登录IP</th>            
					                                    <th>登录次数</th>
					                                    <th class="center">操作</th>
					                                </tr>
					                            </thead>
                                                <tbody>
                                                	<c:forEach items="${usersList }" var="user" >
                                                	<tr>
                                                		<td>
						                                   <label><input type="checkbox" id="uid" value="${user.uId }"  class="i-checks" ></label>
                                                		</td>
                                                        <td class="client-avatar">
                                                        	<img alt="image" src="${user.uHeadImg }" > 
                                                        </td>
                                                        <td>
                                                        	<a data-toggle="tab" href="#contact-1" class="client-link">${user.uName }</a>
                                                        </td>
                                                        <td>
                                                          <c:if test="${user.uSex == 1 }">
                                                          		男
                                                          </c:if>
                                                          <c:if test="${user.uSex == 2 }">
                                                          		女
                                                          </c:if>
                                                        </td>
                                                        <td>
                                                        	<a href="mailto:${user.uEmail }">
		                                                        <i class="fa fa-envelope"></i> 
		                                                        ${user.uEmail }
	                                                        </a>
                                                        </td>
                                                        <td>
	                                                        <i class="fa fa-phone"></i> 
	                                                         ${user.uPhone }
                                                        </td>
                                                        <td>
                                                          <span class="label label-info">${user.rName }</span> 
                                                          	 
                                                        </td>
                                                        
                                                        <td> <fmt:formatDate value="${user.uLoginDate }" type="both"/> </td>
                                                        <td>${user.uLoginIp }</td>
                                                        <td>${user.uLoginCount }</td>
                                                        </td>
                                                        <td class="center">
	                                                        <p data-id="${user.uId }">
										                        <button type="button" id="user-edit" class="btn btn-outline btn-primary"><i class="fa fa-paste"></i> 编辑</button>
										                        <button type="button" id="user-delete" class="btn btn-outline btn-danger"><i class="fa fa-trash"></i> 删除</button>
										                        <c:if test="${user.isFroZen == 2 }">
										                        <button type="button" id="user-frozen" class="btn btn-outline btn-warning"><i class="fa fa-lock"></i> 冻结</button>
										                        </c:if>
										                        <c:if test="${user.isFroZen == 1 }">
										                        <button type="button" id="user-frozen" class="btn btn-outline btn-warning"><i class="fa fa-unlock"></i> 解冻</button>
										                        </c:if>
										                    </p>
                                                        </td>
                                                    </tr>
                                                	</c:forEach>
                                     
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    
                                    <div class="ibox-content">
	                                     <p>
					                        <button type="button" id="user-add" class="btn btn-sm btn-primary">新增</button>
					                       <!--  <button type="button" id="users-delete" class="btn btn-sm btn-danger">删除</button> -->
										 </p>
                                    </div>
                                    
                       <div class="hr-line-dashed"></div>
                        <div class="text-center">

						  ${page.pageStr }
				 
                        </div>
                                </div>
                               
                            </div>
 						</div>
                   </form> 
                </div>
            </div>
        </div>
    </div>

    <!-- 全局js -->
    <script src="static/js/bootstrap.min.js"></script>
	<script src="static/js/plugins/layer/layer.min.js"></script>
    <script src="static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- iCheck -->
    <script src="static/js/plugins/iCheck/icheck.min.js"></script>
    <script>
    	var obj;
        $(function () {
            $(".full-height-scroll").slimScroll({
                height: "100%"
            });
            
            //设置本页layer皮肤
            layer.config({
            	skin:'layui-layer-molv',
            });
            
          	//ifCreated 事件在插件初始化之前绑定   全选
            $("input[id='checkAll']").on("ifChecked", function(event){ 
            	$("input[id='uid']").iCheck("check");
          	}); 
          	//反选
            $("input[id='checkAll']").on("ifUnchecked", function(event){ 
            	$("input[id='uid']").iCheck("uncheck");
          	}); 
            $(".i-checks").iCheck({
                checkboxClass: "icheckbox_square-green",
                radioClass: "iradio_square-green",
            });
            
 			//编辑系统用户
            $("button[id='user-edit']").on("click" , function(){
            	uid = $(this).parent().attr("data-id");
                 layer.open({
                    type: 2,
                    title: "编辑系统用户信息",
                    shade: 0.2,
                    area: ["70%", "90%"],
                    content: "user/goEditSysUser/"+uid+".html"
                });  
            	//layer.alert("你无权编辑用户信息！", {icon: 2});
            });          
            
			//删除系统用户
            $("button[id='user-delete']").on("click" , function(){
            	uid = $(this).parent().attr("data-id");
            	layer.confirm("确定删除该用户？\n删除后将无法恢复！", {
            		icon: 0,btn: ["确定","取消"]
            	}, function(){
            		 $.post("user/delSysUser/"+uid+".html",function(data){
            			 
            			 if(data.RESPONSE_STATE == "200"){
     	            	    layer.msg("删除成功！", {icon: 1, time: 1000}, function(){
     	            	    	//关闭后的操作
     	            	    	$("#sysUser").submit();
     	            	    });
     	            	}else{
     	            		layer.alert(data.ERROR_INFO, {icon: 0});
     	            	}	 
     				});
            	});
            });
            
 			//新增系统用户
            $("button[id='user-add']").on("click" , function(){
                 layer.open({
                    type: 2,
                    title: "新增系统用户",
                    shade: 0.2,
                    area: ["70%", "90%"],
                    content: "user/goAddSysUser.html"
                });  
            }); 
			
			
			//批量删除系统用户
			$("button[id='users-delete']").on("click" , function(){
				 if($("input[id='uid']:checked").length < 1){
			   	     layer.alert("请至少选择一条数据！", {icon: 0});
			   	     return;
			   	 }
				 $("input[id='uid']:checked").each(function () { 
		       		 alert($(this).val());
		       	 });  
			});
			
			//冻结解冻系统用户
			$("button[id='user-frozen']").on("click" , function(){
            	uid = $(this).parent().attr("data-id");
            	layer.confirm("确定更新用户冻结状态吗？", {
            		icon: 0,btn: ["确定","取消"]
            	}, function(){
            		$.post("user/userFrozen/"+uid+".html",function(data){
            			
            			if(data.RESPONSE_STATE == "200"){
    	            	    layer.msg("更新成功！", {icon: 1, time: 1000}, function(){
    	            	    	//关闭后的操作
    	            	    	//$("#sysUser").submit();
    	            	    	window.location.reload();//刷新当前页面.
    	            	    });
    	            	}else{
    	            		layer.alert(data.ERROR_INFO, {icon: 0});
    	            	}
    				}); 
            		

            	}, function(){
            		 
            	});
 
			});
			
			
			
			
        });
        
        


        
    </script>


</body>


</html>