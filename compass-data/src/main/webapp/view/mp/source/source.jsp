<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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

<link href="static/css/bootstrap.min.css" rel="stylesheet">
<link href="static/css/font-awesome.min.css" rel="stylesheet">
<link href="static/css/animate.min.css" rel="stylesheet">
<link href="static/css/style.min.css" rel="stylesheet">
<!-- 修正layerdate样式错乱 -->
<link href="static/css/layerdate/layerdate.css" rel="stylesheet" />
    <style>
        body,i,b,ul,li{
            margin: 0;
            padding: 0;
        }
        ul,li{
            list-style: none;
        }
        i,b{
            font-style:normal;
            font-weight: normal;
        }
        body{
            min-width: 952px;
            overflow-x: hidden;
			background: #2a2b2f;
        }
        .body_right{
            width:100%;
            background: #2a2b2f;
            float: left;
        }
        .right_top{
            height: 30px;
            padding: 30px 34px;
        }
        .font_RT{
            color: #ccc;
            font-size: 24px;
        }
        .data_time{
            font-size: 14px;
            border-radius: 5px;
            margin-left: 22px;
            padding: 5px 15px;
            border: 1px solid #555555;
        }
        .right_middle{
            margin-top: 24px;
            padding: 0 34px;
        }
        .top_top{
            width: 100%;
            font-size: 0;
            background: #202022;
        }
        .top_top>span{
            display: inline-block;
            line-height: 35px;
            height: 35px;
            font-size: 16px;
            text-align: center;
            color: #555;
        }
		.top_top>span:nth-child(1){
           width: 41.6%;
        }
		.top_top>span:nth-child(2){
           width: 25%;
        }
		.top_top>span:nth-child(3){
           width: 32.3%;
        }
        .button_top{
            height: 40px;
            line-height: 40px;
            width: 100%;
            font-size: 0;
        }

        .button_top>span{
            display: inline-block;
            text-align: center;
            font-size: 16px;
            color: #666666;
            overflow: hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
        }
        .button_top>span>i{
            font-size: 16px;
            color: #666;
            float: right;
        }
        .button_top>span:nth-child(1){
            width: 8.3%;
        }
        .button_top>span:nth-child(2){
            width: 8.3%;
        }
        .button_top>span:nth-child(3){
            width: 8.3%;
        }
        .button_top>span:nth-child(4){
            width: 8.3%;
        }
        .button_top>span:nth-child(5){
            width: 8.3%;
        }
        .button_top>span:nth-child(6){
            width: 8.3%;
        }
		.button_top>span:nth-child(7){
            width: 8.3%;
        }
		.button_top>span:nth-child(8){
            width: 8.3%;
        }
		.button_top>span:nth-child(9){
            width: 8.3%;
        }
		.button_top>span:nth-child(10){
            width: 8.3%;
        }
        .button_top>span:nth-child(11){
            width: 8.3%;
        }
        .button_top>span:nth-child(12){
            width: 8.3%;
        }
        .fontWhite{
            font-size: 14px !important;
            color: #cccccc !important;
        }
        .font_yellow{
            color: #9d352a !important;
        }
        .right_middle_font {
			width: 100px;
			height: 45px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			text-align: center;
			line-height: 45px;
			font-size: 18px;
			color: #666666;
			display: inline-block;
			background: #1f1f21;
			cursor: pointer;
		}
		.mL10 {
			margin-left: 10px;
		}
		
		.background_272 {
			background: #27282a;
			color: #fff;
		}
    </style>
</head>
<body>
<div class="body_right">
    <div class="right_top">
        <!--  RT--right_top  -->
        <span class="font_RT">流量来源分析
        	<input type="text" placeholder="开始日期" id="startDate" name="startDate" value="${startDate }" readonly class="data_time">
        	<input type="text" placeholder="结束日期" id="endDate" name="endDate" readonly class="data_time">
        	<a id="submit" class="btn btn-success">
				<i class="fa fa-search"></i> 搜索
			</a>
        </span>
    </div>
	
	<div class="right_middle">
		<span type-data="mp" class="right_middle_font background_272">流量</span>
		<span type-data="2" class="right_middle_font mL10">app</span>
		<span type-data="1" class="right_middle_font mL10">m端</span>
		<span type-data="3" class="right_middle_font mL10">微信</span>
	</div>
	
	<div class="table-responsive" id="data"></div>
</div>
</body>

<!-- 全局js -->
<script src="static/js/jquery-2.1.1.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/plugins/layer/layer.min.js"></script>
<script type="text/javascript" src="static/js/plugins/layer/laydate/laydate.js"></script>
<script type="text/javascript" src="view/pc/source/source_search.js"></script>
<script type="text/javascript" src="static/js/plugins/echarts/echarts.js"></script>

<script type="text/javascript">
	var type = "${type}";
	$(function(){
		$("#submit").on("click",function(){
			updateChart();
		})
		
		$("input[name='type']").on("change",function(){
			updateChart();
		})
		updateChart();
		
		$(".right_middle_font").on("click",function(){
			var $this = $(this);
			$(".right_middle_font").each(function(){
				if($(this).hasClass("background_272")){
					$(this).removeClass("background_272");
				}
			})
			$this.addClass("background_272");
			type = $this.attr("type-data");
			updateChart();
		})
		
		
	})
	
	function updateChart(){
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();
		if(startDate!="" && endDate!="") {
	        var date1 = startDate.split("-");
	        var date2 = endDate.split("-");
	        var myDate1 = new Date(date1[0],date1[1]-1,date1[2]);
	        var myDate2 = new Date(date2[0],date2[1]-1,date2[2]);
	        if (myDate1 <= myDate2) {
	            if(myDate1.getMonth()!=myDate2.getMonth()) {
	                layer.alert("只能查询一个月的数据", {
	                    icon : 0
	                });
	                return false;
	            }
	        } else {
	            layer.alert("开始时间不能大于结束时间", {
	                icon : 0
	            });
	            return false;
	        }
	    }
		
		$.post("mp_Source/findUvSource",{startDate:startDate,endDate:endDate,webtype:type},function(data){
			$("#data").html(data);
		})
	}
</script>
</html>