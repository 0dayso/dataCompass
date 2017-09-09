<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>

<head>
<base href="<%=basePath%>">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>户外门户 -</title>

<link href="static/css/bootstrap.min.css" rel="stylesheet">
<link href="static/css/font-awesome.min.css" rel="stylesheet">
<link href="static/css/layerdate/layerdate.css" rel="stylesheet" />
<!-- iCheck -->
<link href="static/css/plugins/iCheck/custom.css" rel="stylesheet">
<link href="static/css/animate.min.css" rel="stylesheet">
<link href="static/css/style.min.css" rel="stylesheet">
<link href="static/css/page.css" rel="stylesheet">
<style>
body, i, b, ul, li {
	margin: 0;
	padding: 0;
}

ul, li {
	list-style: none;
}

i, b {
	font-style: normal;
	font-weight: normal;
}

body {
	min-width: 952px;
	overflow-x: hidden;
	background: #fff;
	padding: 0 30px;
}

.right_top {
	height: 30px;
	padding: 30px 0;
}

.font_RT {
	color: #333;
	font-size: 24px;
}

.data_time {
	font-size: 14px;
	border-radius: 5px;
	margin-left: 22px;
	padding: 5px 15px;
	border: 1px solid #293846;
	color: #bbb;
}

.right_middle {
	margin-top: 24px;
}

.right_middle_font {
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	text-align: center;
	font-size: 16px;
	color: #666;
	padding: 8px 20px;
	display: inline-block;
	background: #1f1f21;
	cursor: pointer;
}

.background_272 {
	background: #293846;
	color: #fff;
}

.mL10 {
	margin-left: 10px;
}

.surver1 {
	width: 160px;
	height: 50px;
	background: #1ab394;
	display: inline-block;
	border-radius: 5px;
	text-align: center;
	line-height: 50px;
	color: #fff;
	float: left;
}

.surver2 {
	width: 360px;
	height: 50px;
	line-height: 50px;
	background: #1ab394;
	display: inline-block;
	border-radius: 5px;
	color: #f9f9f9;
	padding: 0 10px;
	float: left;
	margin-left: 8px;
}

.text_left {
	text-align: left;
}

.font_green {
	color: #84a763;
	font-size: 18px;
}

.sales_Volume {
	width: 100%;
	height: 80px;
	margin-top: 9px;
}

.Volume_row1 {
	float: left;
	color: #8a8a8c;
	background: #3b3c41;
	width: 160px;
	display: inline-block;
	border-radius: 5px;
	height: 80px;
	line-height: 80px;
	text-align: center;
}

.Volume_row2 {
	float: left;
	height: 80px;
	background: #3b3c41;
	width: 360px;
	padding: 0 10px;
	margin-left: 8px;
	border-radius: 5px;
	color: #8a8a8c;
}

.tow_row {
	width: 100%;
	display: block;
	line-height: 40px;
}

.two_row_N {
	float: right;
	font-size: 18px;
	color: #d69b41;
}

.survey_top2 {
	width: 100%;
	height: 50px;
	line-height: 50px;
}

.right_button {
	margin-top: 26px;
	margin-right: 34px;
	margin-left: 34px;
	border-radius: 5px;
	background: rgba(0,0,0,0.1);
}

.button_top {
	height: 40px;
	line-height: 40px;
	width: 100%;
	font-size: 0;
}

.button_top>span {
	display: inline-block;
	text-align: center;
	font-size: 16px;
	color: #666666;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.button_top>span>i {
	font-size: 16px;
	color: #666;
	float: right;
}

.button_top>span:nth-child(1) {
	width: 11%;
}

.button_top>span:nth-child(2) {
	width: 11%;
}

.button_top>span:nth-child(3) {
	width: 11%;
}

.button_top>span:nth-child(4) {
	width: 11%;
}

.button_top>span:nth-child(5) {
	width: 11%;
}

.button_top>span:nth-child(6) {
	width: 11%;
}

.button_top>span:nth-child(7) {
	width: 11%;
}

.button_top>span:nth-child(8) {
	width: 11%;
}

.button_top>span:nth-child(9) {
	width: 11%;
}

.fontBule {
	font-size: 14px !important;
	color: #0b6099 !important;
}

.fontWhite {
	font-size: 14px !important;
	color: #333 !important;
}

.font_green {
	color: #2787c3 !important;
}

.mT9 {
	margin-top: 9px;
}
</style>
</head>
<body>
	<div class="right_top">
		<!--  RT--right_top  -->
		<span class="font_RT">经营概况<input id="date" readonly="readonly" class="data_time" style="background: #293846;" value="${date }" /></span>

	</div>

	<div class="right_middle">
		<span type-data="all" class="right_middle_font <c:if test="${type=='all' }">background_272</c:if><c:if test="${type!='all' }">mL10</c:if>">店铺整体经营概况</span>
		<span type-data="0" class="right_middle_font <c:if test="${type=='0' }">background_272</c:if><c:if test="${type!='0' }">mL10</c:if>">PC端经营概况</span>
		<span type-data="mp" class="right_middle_font <c:if test="${type=='mp' }">background_272</c:if><c:if test="${type!='mp' }">mL10</c:if>">移动端经营概况</span>
	</div>

	<div id="operatedata">
		
	</div>
</body>

<!-- 全局js -->
<script src="static/js/jquery-2.1.1.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/plugins/layer/layer.min.js"></script>
<script type="text/javascript" src="static/js/plugins/layer/laydate/laydate.js"></script>
<script type="text/javascript" src="static/js/plugins/echarts/echarts.js"></script>

<script>
	var type = "${type}";
	$(function(){
		var date = {
			elem : '#date',
			format : 'YYYY-MM-DD',
			istoday : false,
			max: laydate.now(),
			choose : function(datas) {
				operatedata(type);
			}
		};
		laydate(date);

		//设置本页layer皮肤
		layer.config({
			skin : 'layui-layer-molv',
		});
		laydate.skin('molv')
		
		
		operatedata(type);
		
		$(".right_middle_font").on("click",function(){
			var $this = $(this);
			if(!$this.hasClass("background_272")){
				$(".right_middle_font").each(function(){
					if($(this).hasClass("background_272")){
						$(this).removeClass("background_272");
						$(this).addClass("mL10");
					}
				})
				$this.removeClass("mL10");
				$this.addClass("background_272");
				type = $this.attr("type-data");
				operatedata(type);
			}
		})
	})
	
	function operatedata(type){
		var date = $("#date").val();
		$.post("operate/findOperateData.html",{date:date,type:type},function(data){
			$("#operatedata").html(data);
		})
	}
	
</script>
</html>