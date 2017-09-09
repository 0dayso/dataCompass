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
    

    <title>添加菜单</title>
    <meta name="keywords" content="后台">
    <meta name="description" content="Html5+CSS3现代技术">

    <link rel="shortcut icon" href="favicon.ico"> 
    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/animate.min.css" rel="stylesheet">
    <link href="static/css/style.min.css" rel="stylesheet">
    <link href="static/css/font-awesome.min.css" rel="stylesheet">
    <link href="static/css/plugins/iCheck/custom.css" rel="stylesheet">

</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>添加菜单</h5>
                    </div>
                    <div class="ibox-content">
                        <form method="post" class="form-horizontal" id="add_menu_form" >
                            <div class="form-group">
                                <label class="col-sm-2 control-label">菜单级别</label>
                                <div class="col-sm-10">
                                    <select class="form-control m-b" name="mParentId" onchange="choose_parent(this)" id="choose_mParentId" >
                                        <option value="0">顶级菜单</option>
                                        <c:forEach items="${menus }" var="menu" >
                                        <option value="${menu.mId }">${menu.mName }</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <script type="text/javascript">
                            function choose_parent(obj){
                            	if($(obj).val() == '0'){
                            		$('#mPath').attr('disabled','disabled');
                            		$('#choose_mIcon').fadeIn();
                            	}else{
                            		$('#mPath').removeAttr('disabled');
                            		$('#choose_mIcon').fadeOut();
                            	}
                            }
                            </script>
                            <div id="choose_mIcon">
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">菜单图标</label>
                                
                                <div class="col-sm-10 checkbox i-checks">
                                    <label><input type="radio" value="fa fa-home" name="mIcon"> <i></i> <i class="fa fa-home"></i></label>
                                    <label><input type="radio" value="fa fa-cog" name="mIcon"> <i></i> <i class="fa fa-cog"></i></label>
                                    <label><input type="radio" value="fa fa-area-chart" name="mIcon"> <i></i> <i class="fa fa-area-chart"></i></label>
                                    <label><input type="radio" value="fa fa-align-justify" name="mIcon"> <i></i> <i class="fa fa-align-justify"></i></label>
                                    <label><input type="radio" value="fa fa-picture-o" name="mIcon"> <i></i> <i class="fa fa-picture-o"></i></label>
                                    <label><input type="radio" value="fa fa-user" name="mIcon"> <i></i> <i class="fa fa-user"></i></label>
                                    <label><input type="radio" value="fa fa-group" name="mIcon"> <i></i> <i class="fa fa-group"></i></label>
                                    <label><input type="radio" value="fa fa-envelope-o" name="mIcon"> <i></i> <i class="fa fa-envelope-o"></i></label>
                                    <label><input type="radio" value="fa fa-database" name="mIcon"> <i></i> <i class="fa fa-database"></i></label>
                                    <label><input type="radio" value="fa fa-book" name="mIcon"> <i></i> <i class="fa fa-book"></i></label>
                                    <label><input type="radio" value="fa fa-tags" name="mIcon"> <i></i> <i class="fa fa-tags"></i></label>
                                    <label><input type="radio" value="fa fa-tasks" name="mIcon"> <i></i> <i class="fa fa-tasks"></i></label>
                                    <label><input type="radio" value="fa fa-venus-mars" name="mIcon"> <i></i> <i class="fa fa-venus-mars"></i></label>
                                    <label><input type="radio" value="fa fa-yen" name="mIcon"> <i></i> <i class="fa fa-yen"></i></label>
                                    <label><input type="radio" value="fa fa-bookmark" name="mIcon"> <i></i> <i class="fa fa-bookmark"></i></label>
                                </div>
                            </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">菜单名称</label>
                                
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="菜单名称" id="mName" name="mName" maxlength="32" >
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">资源地址</label>

                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="资源地址" id="mPath" name="mPath" maxlength="100" disabled="disabled" >
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">排序</label>

                                <div class="col-sm-10">
                                    <input type="number" class="form-control" placeholder="排序" id="mOrder" name="mOrder" >
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <div class="col-sm-4 col-sm-offset-2">
                                    <button class="btn btn-primary" type="button" onclick="save_menu()" ><i class="fa fa-save"></i>&nbsp;保存</button>
                                    <script type="text/javascript">
                                    function save_menu(){
                                    	if(check_in()){
                                    		layer.load(0,{shade:0.3});
                                    		$.post('menus/saveMenu.html',$('#add_menu_form').serialize(),function(data){
                                    			if(data.RESPONSE_STATE == '200'){
                                    				layer.msg('保存成功',{icon:1});
                                    				setTimeout(function(){
                                    					parent.self.location.reload();
                                    				},1000);
                                    			}else{
                                    				layer.closeAll('loading');
                               						layer.alert(data.ERROR_INFO,{icon:0});
                                    			}
                                    		});
                                    	}
                                    }
                                    function check_in(){
                                    	if($('#mName').val().trim() == ''){
                                    		layer.tips('菜单名称不能为空!!!', '#mName', {
											    tips: [1, '#019F95'],
											    time: 1500
											});
											$('#mName').focus();
											return false;
                                    	}
                                    	if($('#mPath').val().trim() == '' && $('#choose_mParentId').val() != '0'){
                                    		layer.tips('资源路径不能为空!!!', '#mPath', {
											    tips: [1, '#019F95'],
											    time: 1500
											});
											$('#mPath').focus();
											return false;
                                    	}
                                    	if($('#mOrder').val().trim() == ''){
                                    		layer.tips('请正确填写序号!!!', '#mOrder', {
											    tips: [1, '#019F95'],
											    time: 1500
											});
											$('#mOrder').focus();
											return false;
                                    	}
                                    	return true;
                                    }
                                    </script>
                                    <button class="btn btn-white" type="button" onclick="parent.layer.close(parent.layer.getFrameIndex(window.name));" ><i class="fa fa-times"></i>&nbsp;取消</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="static/js/jquery-2.1.1.min.js" ></script>
    <script src="static/js/bootstrap.min.js" ></script>
    <script src="static/js/content.min.js" ></script>
    <script src="static/js/plugins/iCheck/icheck.min.js"></script>
    <script src="static/js/plugins/layer/layer.min.js"></script>
    <script>
        $(document).ready(function(){$(".i-checks").iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green",})});
    </script>
</body>

</html>