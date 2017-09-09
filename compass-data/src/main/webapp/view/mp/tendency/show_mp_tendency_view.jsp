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
			background: #fff;
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
        .right_middle_font{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-align: center;
            font-size: 16px;
            color: #bbb;
            padding: 8px 20px;
            display: inline-block;
            background: #1f1f21;
            cursor:pointer;
        }
        .mL10{
            margin-left: 10px;
        }
        .background_272{
            background: #27282a;
            color: #fff;
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
            color: #2f8ad0;
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
            width:10%;
        }
        .button_top>span:nth-child(2){
            width: 20%;
        }
        .button_top>span:nth-child(3){
            width: 20%;
        }
        .button_top>span:nth-child(4){
            width: 20%;
        }
        .button_top>span:nth-child(5){
            width: 20%;
        }
        .button_top>span:nth-child(6){
            width: 10%;
        }
        .fontWhite{
            font-size: 14px !important;
            color: #cccccc !important;
        }
    </style>
</head>
<body>
<div class="body_right">
    <div class="right_top">
	    <form action="mp_flow_tendency_controller/show.html">
	        <!--  RT--right_top  -->
	        <span class="font_RT">
	        	流量趋势分析
	        	<input name="endDate" id="chooseLayerDate" value="${s.endDate }" />
	        	<input name="type" type="hidden" id="search_type" value="${s.type }" />
	        </span>
	    </form>
    </div>

    <div class="right_middle" id="chooseType">
        <span class="right_middle_font 
        <c:choose>
        	<c:when test="${s.type == -1 }">background_272</c:when>
        	<c:otherwise>mL10</c:otherwise>
        </c:choose>
        " type="-1">整体</span>
        
        <span class="right_middle_font 
        <c:choose>
        	<c:when test="${s.type == 0 }">background_272</c:when>
        	<c:otherwise>mL10</c:otherwise>
        </c:choose>
        " type="0">PC</span>
        
        <span class="right_middle_font 
        <c:choose>
        	<c:when test="${s.type == 1 }">background_272</c:when>
        	<c:otherwise>mL10</c:otherwise>
        </c:choose>
        " type="1">APP</span>
        
        <span class="right_middle_font 
        <c:choose>
        	<c:when test="${s.type == 2 }">background_272</c:when>
        	<c:otherwise>mL10</c:otherwise>
        </c:choose>" type="2">M端</span>
        
        <span class="right_middle_font <c:choose>
        	<c:when test="${s.type == 3 }">background_272</c:when>
        	<c:otherwise>mL10</c:otherwise>
        </c:choose>" type="3">微信</span>
    </div>

    <div class="right_middle">
        <div id="main" style="height:400px"></div>
    </div>

    <div class="right_middle">
        <div class="button_top" style="background-color: #bbb;">
            <span>日期<i>|</i></span>
            <span>浏览量<i>|</i></span>
            <span>访客数<i>|</i></span>
            <span>跳失率<i>|</i></span>
            <span>平均访问深度<i>|</i></span>
            <span>平均停留时间</span>
        </div>
        <c:forEach items="${list }" var="item">
	        <div class="button_top">
	            <span class="fontWhite">${item.date }</span>
	            <span class="fontWhite">${item.visitnum }</span>
	            <span class="fontWhite">${item.uv }</span>
	            <span class="fontWhite">暂无</span>
	            <span class="fontWhite">暂无</span>
	            <span class="fontWhite">暂无</span>
	        </div>
        </c:forEach>
    </div>
</div>
</body>
	<script src="static/js/jquery-2.1.1.min.js"></script>
	<script src="static/js/plugins/layer/layer.min.js"></script>
	<script type="text/javascript" src="static/js/plugins/echarts/echarts.js"></script>
	<script type="text/javascript" src="static/js/plugins/layer/laydate/laydate.js"></script>
	<script type="text/javascript">
	
	$(function(){
		
		var types = $("div#chooseType").children(),
			_this = null;
		types.on("click",function(){
			layer.load(0, {shade: [0.3,'#000']});
			_this = $(this);
			types.addClass("mL10");
			types.removeClass("background_272");
			
			_this.addClass("background_272");
			_this.removeClass("mL10");
			
			$("input#search_type:hidden").val(_this.attr("type"));
			$("form").submit();
		});
		
		
		var end = {
			elem : '#chooseLayerDate',
			format : 'YYYY-MM-DD',
			istoday : false,
			min:'2016-11-01',
			max : laydate.now(),
			choose : function(datas) {
				layer.load(0, {shade: [0.3,'#000']});
				$('form').submit();
			}
		};
		laydate(end);

		//设置本页layer皮肤
		layer.config({
			skin : 'layui-layer-molv',
		});
		
		
	//基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	var datas = ${listJson},// 数据集合
		data = null,// 单个数据
		dateArray = [],// 日期数组
		seriesArray = [],// 折线数据数组
		visitnums = [],// 浏览量(pv) 
		uvs = [],// 访客数(ip)
		cookie = [],// 访客数(cookie)
		visitusernums = [];// 访问用户数
		
	if(datas[0] == null){
		$("#main").html("<span style='font-size: 22px;margin-left:20px;color:red;'>暂无数据，换个日期试试O(∩_∩)O~</span>")
	}else{
		
		for(var i = 0,len = datas.length;i < len;i++){
			data = datas[i];
			dateArray.push(data.date);
			visitnums.push(data.visitnum);
			uvs.push(data.uv);
			visitusernums.push(data.visitusernum);
			cookie.push(data.cookie);
		}
	
	    // 使用
	    // 基于准备好的dom，初始化echarts图表
	    var myChart = echarts.init(document.getElementById('main'));
	    //曲线
	    option = {
	        tooltip : {
	            trigger: 'axis'
	        },
			legend : {
				data : ['浏览量(pv)', '访客数(ip)' ,'访客数(cookie)' ,'访问用户数' ],
		        textStyle : {
					fontSize : 14,
					fontWeight : 'bolder',
					color : '#CCC'
				}
			},
	        toolbox: {
	            show : true,
	            x:'40'
	        },
	        calculable : true,
	        xAxis : [
	            {
	                type : 'category',
	                boundaryGap : false,
	                data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
	                axisLabel: {
	                    show: true,
	                    textStyle: {
	                        color: '#CCC'
	                    }
	                }
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value',
	                axisLabel : {
	                    show: true,
	                    textStyle: {
	                        color: '#CCC'
	                    }
	                }
	            }
	        ],
	        series : [
				 {
			            name:'浏览量(pv)',
			            type:'line',
			            data:visitnums,
		                markPoint : {
		                    data : [
		                        {type : 'max', name: '最大值'},
		                        {type : 'min', name: '最小值'}
		                    ]
		                },
		                markLine: {
		                    data: [
		                        {type: 'average', name: '平均值'}
		                    ]
		                }
				    },
			        {
			            name:'访客数(ip)',
			            type:'line',
			            data:uvs
			        },
			        {
			            name:'访客数(cookie)',
			            type:'line',
			            data:cookie
			        },
			        {
			            name:'访问用户数',
			            type:'line',
			            data:visitusernums
			        }
	        ]
	    };
	    // 为echarts对象加载数据
	    myChart.setOption(option);
	    
	}
	})
    </script>
</html>