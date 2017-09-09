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
    

    <title>修改头像</title>

    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/font-awesome.min.css" rel="stylesheet">
	<link href="static/css/plugins/cropper/cropper.min.css" rel="stylesheet">
    <link href="static/css/animate.min.css" rel="stylesheet">
    <link href="static/css/style.min.css" rel="stylesheet">
<style type="text/css">
.image-crop{
width: 400px; height: 400px;
}
.img-preview{
width: 200px; height: 200px;
}
</style>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
       
       
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <p>
                            		 修改头像
                        </p>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="image-crop">
                                    <img src="${avatar }">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h4>图片预览：</h4>
                                <div class="img-preview img-preview-sm"></div>
                                 
                                <h4>说明：</h4>
                                <p style="color: red;font-size: 20px;font-weight: bold;">
                                   	 如果图片来自阿里云OSS地址，图像裁剪出现跨域异常，可忽略！
                                </p>
                                <p>
                                </p>
                                <div class="btn-group">
                                    <label title="上传图片" for="inputImage" class="btn btn-primary">
                                        <input type="file" accept="image/*" name="file" id="inputImage" class="hide"> 上传新图片
                                    </label>
                                    　　　
                                    <button title="保存头像" id="save" class="btn btn-primary">保存头像</button>
                                </div>
                                <p></p>
                                <div class="btn-group">
                                    <button class="btn btn-white" id="zoomIn" type="button">放大</button>
                                    <button class="btn btn-white" id="zoomOut" type="button">缩小</button>
                                    <button class="btn btn-white" id="rotateLeft" type="button">左旋转</button>
                                    <button class="btn btn-white" id="rotateRight" type="button">右旋转</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    

    <!-- 全局js -->
    <script src="static/js/jquery-2.1.1.min.js"></script>
    <script src="static/js/bootstrap.min.js"></script>
	<script src="static/js/plugins/layer/layer.min.js"></script>
    <!-- Image cropper -->
    <script src="static/js/plugins/cropper/cropper.min.js"></script>

    <script>
    
    $(function() {
    	'use strict';
        var d = $(".image-crop > img");
        $(d).cropper({
            aspectRatio: 1,
            preview: ".img-preview" 
           
        });
        var e = $("#inputImage");
        if (window.FileReader) {
            e.change(function() {
                var k = new FileReader(),
                    m = this.files,
                    l;
                if (!m.length) {
                    return
                }
                l = m[0];
                if (/^image\/\w+$/.test(l.type)) {
                    k.readAsDataURL(l);
                    k.onload = function() {
                        e.val("");
                        d.cropper("reset", true).cropper("replace", this.result);
                    };
                } else {
                    showMessage("请选择图片文件");
                }
            });
        } else {
            e.addClass("hide");
        }
        $("#download").click(function() {
            window.open(d.cropper("getDataURL", "image/jpeg"));
        });
        $("#zoomIn").click(function() {
            d.cropper("zoom", 0.1);
        });
        $("#zoomOut").click(function() {
            d.cropper("zoom", -0.1);
        });
        $("#rotateLeft").click(function() {
            d.cropper("rotate", 45);
        });
        $("#rotateRight").click(function() {
            d.cropper("rotate", -45);
        });
        $("#setDrag").click(function() {
            d.cropper("setDragMode", "crop");
        });
        $("#save").click(function() {
            $.post("user/updateSysUserAvatar.html",{image:d.cropper("getDataURL", "image/jpeg")},function(data){
			 	if(data.result = "true"){
			 		parent.$("#userAvatar").prop("src",data.src);
			 		layer.msg("头像修改成功", {icon: 1});
			 	}else{
			 		layer.msg("头像修改失败", {icon: 5});
			 	}
			});
           
        });
        
    });
    </script>


</body>


</html>