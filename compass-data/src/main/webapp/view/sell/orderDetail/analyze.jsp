<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
    <title>订单明细统计</title>
    <style>
    	html, body, div, span, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, address, big, cite, code, del, em, font, img, ins, small, strong, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend { margin: 0; padding: 0;}
		ol,ul,li{ list-style:none; list-style-position:outside;}
		:focus { outline: 0 none;}
		a,img {border: 0 none;}
		img {vertical-align: middle;}
		a,a:hover{text-decoration:none;}
		table{border-collapse:collapse;border-spacing:0;}
		address, caption, cite, code, dfn, em, th, var, b, i, s{font-style:normal;font-weight:normal;}
		body{font-size:14px; font-family: 'Microsoft Yahei', 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, 'Hiragino Sans GB', STHeiti; color:#6c6c6c;background: #fff;}
		.fl{float:left;display:inline}
		.fr{float:right;display:inline;}
		.boxw{width:1200px;margin:0 auto;}
		.topDivbtm{border-bottom: 1px solid #e4e4e4;}
		.clearfix:before, .clearfix:after {content: ".";display: block;height: 0;visibility: hidden;}
		.clearfix:after {clear: both;}
		.clearfix {zoom: 1;}
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
			background: #fff;
        }
        .body_right{
            width: 100%;
            background: #fff;
            float: left;
        }
        .right_top{
            height: 30px;
            padding: 30px 34px;
        }
        .font_RT{
            color: #333;
            font-size: 24px;
        }
        .all{
            font-size: 18px;
            color: #ccc;
            padding: 8px 42px;
            border-radius: 5px;
        }
        .background_B{
            background: #028be6;
            color: #fff !important;
        }
        .background_bluck{
            background: #3b3c42;
            color: #028be6;
        }
        .updata_number{
            color: #f74c31;
        }
        .updata_time{
            font-size: 14px;
            color: #999999;
            margin-left: 10px;
            padding: 5px 20px;
        }
        /*  中部  */
        input[type="radio"]{
            visibility: hidden;
        }
        input[type="radio"]+label {
            display: inline-block;
            margin-top: 10px;
            margin-left: 5px;
            text-align: left;
            color: #555;
            font-size: 14px;
            -webkit-box-sizing: border-box;
        }

        label::before {
            content: "";
            display: inline-block;
            width: 18px;
            height: 18px;
            background: #0f5a8d;
            border: 1px solid #0f5a8d;
            vertical-align: middle;
            -webkit-border-radius: 50%;
            margin-right: 5px;
        }
        .CB_radius{
            width: 10px;
            height: 10px;
            display: inline-block;
            border-radius: 50%;
            background: #ff8a01;
            position: absolute;
            left: 4px;
            top: 6px;
        }
        .position_R{
            position: relative;
        }
        .right_middle{
            margin-top: 24px;
            padding: 0 34px;
        }
        .inputA{
            background: none;
            width: 14.6%;
            border: 1px solid #0a5f98;
            height: 35px;
            border-radius: 5px;
            padding: 0 10px;
            color: #ccc;
        }
        .font{
            font-size: 18px;
            color: #555;
        }
        .mL15{
            margin-left: 15px;
        }
        .right_button{
            margin-top: 26px;
            margin-right: 34px;
            margin-left: 34px;
            border-radius: 5px;
            background: #f1f1f1;
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
            width: 5%;
        }
        .button_top>span:nth-child(2){
            width: 7.9%;
        }
        .button_top>span:nth-child(3){
            width: 7.9%;
        }
        .button_top>span:nth-child(4){
            width: 7.9%;
        }
        .button_top>span:nth-child(5){
            width: 7.9%;
        }
        .button_top>span:nth-child(6){
            width: 15%;
        }
        .button_top>span:nth-child(7){
            width: 7.9%;
        }
        .button_top>span:nth-child(8){
            width: 7.9%;
        }
        .button_top>span:nth-child(9){
            width: 10%;
        }
        .button_top>span:nth-child(10){
            width: 7.9%;
        }
        .button_top>span:nth-child(11){
            width: 20%;
        }
        .button_top>span:nth-child(12){
            width: 7.9%;
        }
        .button_top>span:nth-child(13){
            width: 7.9%;
        }
        .fontBule{
            font-size: 14px !important;
            color: #0b6099 !important;
        }
        .fontWhite{
            font-size: 14px !important;
            color: #cccccc !important;
        }
        .page{
            width: 100%;
            height: 60px;
            text-align: center;
			margin-top: 20px;
			display: inline-block;
        }
        .paging{
            float: right;
            margin-right: 45px;
        }
        .homePage{
            line-height: 60px;
            padding: 6px 10px;
            border-radius: 5px;
            border: 1px solid #444444;
            color: #bbbbbb;
            font-size: 12px;
            background: #3b3c42;
        }
        .scroll_x{
            overflow-x: auto;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .blue_radius{
            display: inline-block;
            width: 21px;
            height: 21px;
            border-radius: 50%;
            background: #0b6099;
            vertical-align: text-top;
            position: relative;
            margin-top: 10px;
            margin-right: 3px;
            float: left;
            top: -8px;
			cursor: pointer;
        }
        .plus{
            display: inline-flex;
            position: absolute;
            top: -10px;
            left: 4px;
            font-size: 17px;
            font-weight: 600;
            color: #ccc;
        }
    </style>
    <link href="static/css/bootstrap.min.css" rel="stylesheet">
	<link href="static/css/font-awesome.min.css" rel="stylesheet">
	<link href="static/css/layerdate/layerdate.css" rel="stylesheet" />
	<!-- iCheck -->
	<link href="static/css/plugins/iCheck/custom.css" rel="stylesheet">
	<link href="static/css/animate.min.css" rel="stylesheet">
	<link href="static/css/style.min.css" rel="stylesheet">
	<link href="static/css/page.css" rel="stylesheet">
	
</head>
<body>
<div class="body_right">
    <div class="right_top">
        <!--  RT--right_top  -->
        <span class="font_RT">订单明细统计</span>

    </div>

	<form id="orderForm">
	    <div class="right_middle">
	        <span class="font">&nbsp;订单编号：<input name="orderId" type="text" placeholder="请输入编号" class="inputA"/></span>
	        <span class="font mL15">&nbsp;商品编号：<input name="sku" type="text" placeholder="请输入编号" class="inputA"/></span>
	        <span class="font mL15">支付状态&nbsp;&nbsp;<input name="paystatus" type="text" placeholder="所有" class="inputA"/></span>
	    </div>
	
	    <div class="right_middle">
	        <!-- <span class="font">&nbsp;店铺名称：<input type="text" placeholder="全部" class="inputA"/></span> -->
	        <span class="font">&nbsp;店铺编号：<input name="shopId" type="text" placeholder="请输入编号" class="inputA"/></span>
	        <span class="font mL15">&nbsp;开始日期：<input id="startDate" name="startDate" value="${startDate }" readonly="readonly" type="text" placeholder="请输入开始日期" class="inputA"/></span>
	        <span class="font mL15">&nbsp;结束日期：<input id="endDate" name="endDate" type="text" readonly="readonly" placeholder="请输入结束日期" class="inputA"/></span>
	    </div>
	
	    <div class="right_middle" id="type">
	        <input type="radio" value="all" checked="checked" name="webtype">
	        <label for="guangpan" class="position_R"><i class="CB_radius"></i>店铺整体</label>
	        <input type="radio" value="0" name="webtype">
	        <label for="guangpan1" class="position_R"><i class="CB_radius" style="display: none;"></i>pc端</label>
	        <input type="radio" value="mp" name="webtype">
	        <label for="guangpan2" class="position_R"><i class="CB_radius"  style="display: none;"></i>移动端整体</label>
	        <input type="radio" value="1" name="webtype">
	        <label for="guangpan3" class="position_R"><i class="CB_radius"  style="display: none;"></i>M端</label>
	        <input type="radio" value="2" name="webtype">
	        <label for="guangpan4" class="position_R"><i class="CB_radius"  style="display: none;"></i>APP</label>
	        <input type="radio" value="3" name="webtype">
	        <label for="guangpan5" class="position_R"><i class="CB_radius"  style="display: none;"></i>微信</label>
	        <span class="all background_B" id="submit" style="font-size: 14px;margin-left: 23.8%;cursor: pointer;">查询</span>
	        <span class="all background_B" style="font-size: 14px;float: right">下载</span>
	    </div>
	</form>

    <div id="orderList">
    </div>
    <div id="page" class="page">
    </div>
</div>


<!-- 全局js -->
<script src="static/js/jquery-2.1.1.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/plugins/layer/layer.min.js"></script>
<script src="static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<!-- iCheck -->
<script src="static/js/plugins/iCheck/icheck.min.js"></script>
<script src="static/js/plugins/layer/laydate/laydate.js"></script>

<!-- 分页 -->
<script src="static/js/plugins/layer/laypage/laypage.js"></script>

<script type="text/javascript">
	$(function(){
		updateOrder();
		
		var start = {
			elem : '#startDate',
			format : 'YYYY-MM-DD',
			istoday : false,
			min:'2016-11-01',
			choose : function(datas) {
				end.min = datas; //开始日选好后，重置结束日的最小日期
				end.start = datas //将结束日的初始值设定为开始日
			}
		};
		var end = {
			elem : '#endDate',
			format : 'YYYY-MM-DD',
			min : laydate.now(),
			istoday : false,
			choose : function(datas) {
				start.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		laydate(start);
		laydate(end);

		//设置本页layer皮肤
		layer.config({
			skin : 'layui-layer-molv',
		});
		
		$("#submit").on("click",function(){
			updateOrder();
		})
		
		$("#type label").on("click",function(){
			var $this = $(this);
			$("#type label").find("i").css("display","none");
			$this.find("i").css("display","block");
			$this.prev().trigger("click");
			updateOrder();
		})
	})
	
	var page = 1;
	
	//按条件查询订单
	function updateOrder(){
		$.post("orderDetail/findOrderDetail.html?page="+page,$("#orderForm").serialize(),function(data){
			$("#orderList").html(data);
		})
	}
	
</script>

</body>
</html>