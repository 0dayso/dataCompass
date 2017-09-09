<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>

<head lang="en">
	<base href="<%=basePath%>">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        .RT_right_font{
            float: right;
        }
        .all{
            font-size: 18px;
            color: #ccc;
            padding: 8px 42px;
            border-radius: 5px;
            cursor:pointer;
        }
        .background_B{
            background: #028be6;
            color: #fff !important;
        }
        .background_bluck{
            background: #3b3c42;
            color: #028be6;
        }
        .updata_time{
            font-size: 14px;
            color: #555;
            margin-left: 10px;

        }
        .updata_number{
            color: #f74c31;
        }
        .right_one{
            height: 120px;
            padding: 0 34px;
            margin-top: 23px;
        }
        .right_one_font{
            font-size: 18px;
            color: #333;
            vertical-align: top;
        }
        .checkBox{
            display: inline-block;
            width: 198px;
            height: 33px;
            border: 1px solid #0b6099;
            border-radius: 5px;
            line-height: 33px;
            font-size: 16px;
            color: #999;
        }
        .position_R{
            position: relative;
            display: inline-block;
            top: -9px;
        }
        .pull_down{
            width: 198px;
            border-radius: 5px;
            border: 1px solid #0b6099;
            font-size: 16px;
            color: #999;
            background: #2a2b2f;
            display: none;
        }
        .activity{
            line-height: 35px;
            display: block;
            padding-left: 10px;
        }
        .activity>li:hover,.hoverOne:hover{
            background: #3b3c42;
        }
        .activity>li{
            padding-left: 20px;
            margin-left: -10px;
        }
        .mL90{
            margin-left: 90px;
            vertical-align: middle !important;
        }
        .float_R{
            float: right;
            margin-right: 10px;
            margin-top: -8px;
        }
        .right_button{
            margin-top: -62px;
            margin-right: 34px;
            margin-left: 34px;
            border-radius: 5px;
            background: #ccc;
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
            color: #555;
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
            width: 10.8%;
        }
        .button_top>span:nth-child(2){
            width: 10.8%;
        }
        .button_top>span:nth-child(3){
            width: 46%;
        }
        .button_top>span:nth-child(4){
            width: 10.8%;
        }
        .button_top>span:nth-child(5){
            width: 10.8%;
        }
        .button_top>span:nth-child(6){
            width: 10.8%;
        }
        .fontBule{
            font-size: 14px !important;
            color: #333 !important;
        }
        .fontWhite{
            font-size: 14px !important;
            color: #333!important;
        }
        .page{
            width: 100%;
            height: 60px;
            background: #ccc;
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
    </style>
</head>
<body>
<div class="body_left"></div>
<div class="body_right">
    <div class="right_top">
        <!--  RT--right_top  -->
        <span class="font_RT">实时访客<i class="updata_time">更新时间：2016-11-9 14:17:10 最近更新<b class="updata_number">99</b>条记录</i></span>
        <div class="RT_right_font">
            <span class="all 
        	<c:choose>
        		<c:when test="${p.t.type == 0 }">background_B</c:when>
        		<c:otherwise>background_bluck</c:otherwise>
        	</c:choose>" type="0">pc端</span>
            <span class="all 
        	<c:choose>
        		<c:when test="${p.t.type == 1 }">background_B</c:when>
        		<c:otherwise>background_bluck</c:otherwise>
        	</c:choose>" type="1">App</span>
            <span class="all 
        	<c:choose>
        		<c:when test="${p.t.type == 2 }">background_B</c:when>
        		<c:otherwise>background_bluck</c:otherwise>
        	</c:choose>" type="2">m端</span>
            <span class="all 
        	<c:choose>
        		<c:when test="${p.t.type == 3 }">background_B</c:when>
        		<c:otherwise>background_bluck</c:otherwise>
        	</c:choose>" type="3">微信</span>
        </div>
    </div>

    <div class="right_one">

        <div style="display: inline-block;float: left;">
            <span class="right_one_font">流量来源：</span>
            
            <select id="channelId">
				<option value="">请选择渠道</option>
				
				<c:forEach items="${channels}" var="item">
					<option value="${item.id}" 
						<c:if test="${p.t.channelid ==  item.id}">selected="selected"</c:if> 
					>${item.name}</option>
				</c:forEach>
			</select>
        </div>

        <!-- <span class="all background_B float_R">下载</span> -->

    </div>

    <div class="right_button">
        <div class="button_top">
            <span>访问时间<i>|</i></span>
            <span>入店来源<i>|</i></span>
            <span>被访页面标题<i>|</i></span>
            <span>访客位置<i>|</i></span>
            <span>访客名称<i>|</i></span>
            <span>访客浏览量</span>
        </div>
        <c:forEach items="${list }" var="item">
        
	        <div class="button_top">
	            <span class="fontWhite">${item.visittime }</span>
	            <span class="fontWhite">${item.source }</span>
	            <span class="fontBule">${item.url }</span>
	            <span class="fontWhite">${item.county }</span>
	            <span class="fontBule">${item.userName }</span>
	            <span class="fontWhite">${item.visitNum }</span>
	        </div>
        
        </c:forEach>
    </div>

    <div class="page">
        <div class="paging" id="page">
        </div>
    </div>

</div>
</body>
<script type="text/javascript" src="static/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="static/js/plugins/layer/layer.min.js"></script>
<script type="text/javascript" src="static/js/plugins/layer/laypage/laypage.js"></script>
<script type="text/javascript">

$(function(){

    var $types = $("div.RT_right_font").children(),
    	currentType = 0,
    	currentChannelId = "";
    $types.on("click",function(){
    	currentType = $(this).attr("type");
    	$types.removeClass("background_B");
    	$types.addClass("background_bluck");

    	$(this).removeClass("background_bluck");
    	$(this).addClass("background_B");
    	
    	layer.load(0, {shade: [0.3,'#000']});
    	window.location.href="truetime_visitor_controller/show.html?currentPage=1&type="+currentType+"&channelid="+currentChannelId;
    })
    
    $("select#channelId").on("change",function(){
    	layer.load(0, {shade: [0.3,'#000']});
    	currentChannelId = $(this).val();
    	window.location.href="truetime_visitor_controller/show.html?currentPage=1&type="+currentType+"&channelid="+currentChannelId;
    })
    
    

	laypage({
	    cont: 'page',
	    pages: ${p.totalPage},
	    curr : ${p.currentPage},
	    skip : true,
	    last : "尾页："+${p.totalPage},
	    jump: function(obj,first){
	    	if(!first){
	    		layer.load(0, {shade: [0.3,'#000']});
	    		location.href="truetime_visitor_controller/show.html?currentPage="+obj.curr;
	    	}
	    }
	})
})

</script>
</html>