<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
        .RT_right_font{
            float: right;
        }
        .all{
            font-size: 18px;
            color: #ccc;
            padding: 8px 42px;
            border-radius: 5px;
        }
        .background_B{
            background: #028be6;
            color: #ccc !important;
            cursor: pointer;
        }
        .background_bluck{
            background: #3b3c42;
            color: #028be6;
            cursor: pointer;
        }
        .updata_time{
            font-size: 14px;
            color: #999999;
            margin-left: 10px;

        }
        .updata_number{
            color: #f74c31;
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
            color: #999;
        }
        .mL15{
            margin-left: 15px;
        }
        .SPU_font{
            display: inline-block;
            width: 20.2%;
            min-width: 238px;
            border: 1px solid #0a5f98;
            margin-left: 20px;
            text-align: center;
            line-height: 35px;
            background-color: #3b3c41;
            border-radius: 5px;
        }
        .inputA1{
            height: 35px;
            padding: 0 10px;
            color: #ccc;
            border: none;
            border-left: 1px solid #0a5f98;
            width: 60%;
            float: right;
            background-color: #2a2b2f;
        }
        .query_img{
            display: inline-block;
            background: url(img/piuIcon_03.png) no-repeat center;
            width: 16px;
            height: 16px;
            background-size: cover;
            position: absolute;
            left: 21px;
            top: 8px;
        }
        .query{
            font-size: 14px;
            margin-left: 36px;
            position: relative;
        }
        .right_middle_font{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-align: center;
            font-size: 16px;
            color: #666666;
            padding: 8px 20px;
            display: inline-block;
            background: #1f1f21;
            cursor:pointer;
        }
        .mL10{
            margin-left: 10px;
        }
        .background_272{
            background: #293846;
            color: #fff;
        }
        .download{
            float: right;
            padding: 8px 30px;
            background: #1f4866;
            border-radius: 5px;
            font-size: 16px;
            color: #ccc;
        }
        .show_index{
            padding: 8px 40px;
            border: 1px solid #0a5f98;
            border-radius: 5px;
            color: #ccc;
            font-size: 16px;
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
            width: 8.3%;
        }
        .button_top>span:nth-child(2){
            width: 40%;
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
            width: 10%;
        }
        .button_top>span:nth-child(7){
            width: 8.3%;
        }
        .button_top>span:nth-child(8){
            width: 8.3%;
        }
        .fontBule{
            font-size: 14px !important;
            color: #0b6099 !important;
        }
        .fontWhite{
            font-size: 14px !important;
            color: #555!important;
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
            cursor: pointer;
        }
        .plus{
            display: inline-flex;
            position: absolute;
            top: -10px;
            left: 6px;
            font-size: 17px;
            font-weight: 600;
            color: #ccc;
        }
        .page{
            width: 100%;
            height: 60px;
            background: #2a2b2f;
        }
        .paging{
            float: right;
            margin-right: 70px;
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
        .SHZE_paging{
            margin: 0 auto;
            width: 140px;
            height: 30px;
            display: inline-block;
            border: 1px solid #0a5f98;
            color: #ccc;
            font-size: 14px;
            margin-top: 20px;
            text-align: center;
            line-height: 30px;
            position: relative;
        }
        .position_R{
            position: relative;
            left: -7px;
        }
        .sanjiao{
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 10px solid #0a5f98;
            position: absolute;
            top: 3px;
            right: -15px;
        }
        .bule_paging:hover{
            background-color: #202022;
        }
        .bule_paging{
            line-height: 30px;
        }
        .bule_all{
            margin: 0 auto;
            width: 140px;
            border: 1px solid #0a5f98;
            color: #ccc;
            font-size: 14px;
            text-align: center;
            line-height: 30px;
            display: none;
        }
        .SHZE_paging:hover .bule_all{
            display: block;
        }
    </style>
</head>
<body>
<div class="body_right">
    <div class="right_top">
        <!--  RT--right_top  -->
        <span class="font_RT">商品销售明细
        	<!-- <i class="updata_time">
        		更新时间：2016-11-9 14:17:10 最近更新
        		<b class="updata_number">99</b>条记录
        	</i> -->
        </span>
        <!-- <div class="RT_right_font">
            <span class="all background_B">pc端</span>
            <span class="all background_bluck">PC</span>
            <span class="all background_bluck">无线</span>
        </div> -->
    </div>

    <!-- <div class="right_middle">
        <span class="font SPU_font">SPU<input type="text" placeholder="全部" class="inputA1"/></span>
        <span class="all background_B query"><i class="query_img"></i>查询</span>
    </div>

    <div class="right_middle">
        <span class="font">&nbsp;行业类目：<input type="text" placeholder="全部" class="inputA"/></span>
        <span class="font mL15">&nbsp;店铺分类：<input type="text" placeholder="全部" class="inputA"/></span>
    </div> -->

    <div class="right_middle">
        <span class="right_middle_font 
	    	<c:choose>
	    		<c:when test="${p.t.type == -1 }">background_272</c:when>
	    		<c:otherwise>mL10</c:otherwise>
	    	</c:choose>
	        " search_type="-1" >店铺整体销售明细</span>
        <span class="right_middle_font
	    	<c:choose>
	    		<c:when test="${p.t.type == 0 }">background_272</c:when>
	    		<c:otherwise>mL10</c:otherwise>
	    	</c:choose>
        	" search_type="0" >PC端商品销售明细</span>
        <span class="right_middle_font
	    	<c:choose>
	    		<c:when test="${p.t.type == 123 }">background_272</c:when>
	    		<c:otherwise>mL10</c:otherwise>
	    	</c:choose>
       		" search_type="123" >移动端商品销售明细</span>
    </div>
    

    <!-- <div class="right_middle">
        <span class="show_index">显示指标</span>
        <span class="download">下载</span>
    </div> -->

    <div class="right_button">
        <div class="button_top">
            <span>排名<i>|</i></span>
            <span>商品名称<i>|</i></span>
            <span>下单金额<i>|</i></span>
            <span>下单商品件数<i>|</i></span>
            <span>下单客户数<i>|</i></span>
            <span>浏览量<i>|</i></span>
            <span>访客数<i>|</i></span>
            <span>转化率</span>
        </div>
        <c:forEach items="${list }" var="item" varStatus="itemIndex">
       		<c:forEach items="${item.skus }" var="sku" varStatus="skuIndex">
	       		<c:if test="${skuIndex.index > 0 && skuIndex.index == 1}"><products style="display:none;"></c:if>
	       		<div class="button_top">
		            <span class="fontWhite">
		            	<c:if test="${skuIndex.index == 0 }">
		            		${itemIndex.index+1 }
		            	</c:if>
		            </span>
		            <span class="fontBule">
		            	<c:if test="${skuIndex.index == 0 && fn:length(item.skus) > 1 }">
		            	<span class="blue_radius" >
		            		<i class="plus">+</i>
		            	</span>
		            	</c:if>
		            	${item.productName }&nbsp;${sku.color}&nbsp;${sku.spec }
		            </span>
		            <span class="fontWhite">${sku.amount }</span>
		            <span class="fontWhite">${sku.pOrderNum }</span>
		            <span class="fontWhite">${sku.pOrderUserNum }</span>
		            <span class="fontWhite">${sku.pv }</span>
		            <span class="fontWhite">${sku.pUserNum }</span>
		            <span class="fontWhite">${sku.percentConversion }</span>
	       		 </div>
	       		 <c:if test="${skuIndex.index > 0 && skuIndex.index == (fn:length(item.skus)-1) }"></products></c:if>
       		 </c:forEach>
        </c:forEach>
    </div>

    <!-- <div class="page right_middle">
        <div class="SHZE_paging">
            <span class="position_R">每页显示 10 条<i class="sanjiao"></i></span>
            <ul class="bule_all">
                <li class="bule_paging">每页显示 20 条</li>
                <li  class="bule_paging">每页显示 50 条</li>
            </ul>
        </div>

        <div class="paging" id="page">
        </div>
    </div> -->
</div>

<form action="product_sell_detail_controller/show.html">
<input name="type" id="inputSearchType" type="hidden">
</form>
</body>
<script type="text/javascript" src="static/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="static/js/plugins/layer/layer.min.js"></script>
<script type="text/javascript" src="static/js/plugins/layer/laypage/laypage.js"></script>
<script type="text/javascript" >
$(function(){
	

    var $types = $("div.right_middle").children();
    $types.on("click",function(){
    	$types.removeClass("background_272");
    	$types.addClass("mL10");
    	
    	$(this).removeClass("mL10");
    	$(this).addClass("background_272");
    	
    	layer.load(0, {shade: [0.3,'#000']});
    	$("input#inputSearchType").val($(this).attr("search_type"));
    	$("form").submit();
   })
	
	var $next = null;
	// 展开/隐藏
	$("span.blue_radius").on("click",function(){
		$next = $(this).closest("div.button_top").next();
		if($next.css("display") == 'none'){
			$(this).children().text('-');
		}else{
			$(this).children().text('+');
		}
		$next.toggle();
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
	    		location.href="product_sell_detail_controller/show.html?currentPage="+obj.curr;
	    	}
	    }
	})
})
</script>
</html>