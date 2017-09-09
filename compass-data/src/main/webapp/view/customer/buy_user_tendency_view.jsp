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
            padding: 0 30px;
        }
        .right_top{
            height: 30px;
            padding: 30px 0;
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
            border: 1px solid #028be6;
        }
        .mL15{
            margin-left: 15px;
        }
        .day_time{
            color: #0e609a;
            font-size: 16px;
            margin-right: 15px;
        }
        .excircle{
            width: 18px;
            height: 18px;
            display: inline-block;
            border-radius: 50%;
            border: 1px solid #0b6099;
            position: relative;
            vertical-align: sub;
            margin-right: 5px;
        }
        .circle{
            width: 10px;
            height: 10px;
            display: inline-block;
            background: #0b6099;
            border-radius: 50%;
            position: absolute;
            top: 4px;
            left: 4px;
        }
        .right_middle{
            margin-top: 24px;
        }
        .right_middle_font{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-align: center;
            font-size: 18px;
            color: #bbb;
            padding: 8px 20px;
            display: inline-block;
            background: #1f1f21;
            cursor: pointer;
        }
        .background_272{
            background: #293846;
            color: #fff;
        }
        .mL10{
            margin-left: 10px;
        }
        .SVA_buttom{
            font-size: .24rem;
            color: #018be6;
            background-color: #3b3c41;
            padding: 8px 24px;
            border-radius: 5px;
            float: right;
        }
        .SVA_buttom_select{
            color: #ccc;
            background-color: #048be5;
        }
        .buyer{
            width: 600px;
            margin-top: 20px;
        }
        .buyer_top1{
            width: 100%;
            background: #bbb;
            height: 35px;
            line-height: 35px;
            font-size: 0;
        }
        .buyer_span1{
            width: 100px;
            display: inline-block;
            text-align: center;
            color: #555;
            font-size: 16px;
        }
        .buyer_span2{
            width: 375px;
            display: inline-block;
            text-align: center;
            color: #555;
            font-size: 16px;
        }
        .buyer_span3{
            width: 125px;
            display: inline-block;
            text-align: center;
            color: #555;
            font-size: 16px;
        }
    </style>
</head>
<body>
<div class="right_top">
	<form action="buy_user_tendency_controller/show.html" onsubmit="return check()">
	    <!--  RT--right_top  -->
	    <span class="font_RT">买家分析
	    	<input type="text" name="startDate" id="startDate" value="${p.t.startDate }" />
	    	--
	    	<input type="text" name="endDate" id="endDate" value="${p.t.endDate }" />
	    	
	    	<button type="submit">搜索</button>
	    </span>
    </form>
</div>

<div class="right_middle" id="chooseType">
    <span class="right_middle_font background_272" type="0">下单单量</span>
    <span class="right_middle_font mL10" type="1">下单件数</span>
    <span class="right_middle_font mL10" type="2">下单金额</span>
</div>

<div class="buyer" style="display: inline-block;">
    <div class="buyer_top1">
        <span class="buyer_span1">编号<i style="float: right;">|</i></span>
        <span class="buyer_span2">客户名称<i style="float: right;">|</i></span>
        <span class="buyer_span3" id="showOrderInfo">
	        <c:choose>
		        <c:when test="${p.t.type == 0 }">下单单量</c:when>
		        <c:when test="${p.t.type == 1 }">下单件数</c:when>
		        <c:when test="${p.t.type == 1 }">下单金额</c:when>
	        </c:choose>
        </span>
    </div>
    <customer>
    <c:forEach items="${map.pageData }" var="item" varStatus="itemIndex">
	    <div class="buyer_top1">
	        <span class="buyer_span1">${itemIndex.index+1 }</span>
	        <span class="buyer_span2">${item.userName }</span>
	        <span class="buyer_span3">${item.number }</span>
	    </div>
    </c:forEach>
    </customer>
    
    <div id="layerPage"></div>
</div>

<div id="main" style="width: 60%;height:400px;display: inline-block;right: 0;float: right;"></div>
</body>
	<script type="text/javascript" src="static/js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="static/js/plugins/layer/layer.min.js"></script>
	<script type="text/javascript" src="static/js/plugins/echarts/echarts.js"></script>
	<script type="text/javascript" src="static/js/plugins/layer/laydate/laydate.js"></script>
	<script type="text/javascript" src="static/js/plugins/layer/laypage/laypage.js"></script>
<script>

var check = function(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	if(startDate!="" && endDate!="") {
        var date1 = startDate.split("-");
        var date2 = endDate.split("-");
        var myDate1 = new Date(date1[0],date1[1]-1,date1[2]);
        var myDate2 = new Date(date2[0],date2[1]-1,date2[2]);
        if (myDate1 <= myDate2) {
            if(date1[0] != date2[0] || date1[1]!=date2[1]) {
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
	
	return true;

};

$(function(){
	var start = {
		elem : '#startDate',
		format : 'YYYY-MM-DD',
		istoday : false,
		min:'2016-11-01',
		max : laydate.now(),
		choose : function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
		}
	};
	var end = {
		elem : '#endDate',
		format : 'YYYY-MM-DD',
		max : laydate.now(),
		min:'2016-11-01',
		istoday : false,
		choose : function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	laydate(start);
	laydate(end);
	
	var types = $("div#chooseType").children(),
		_this = null,
		currentPage = null,
		type = null;
	types.on("click",function(){
		_this = $(this);
		types.addClass("mL10");
		types.removeClass("background_272");
		
		_this.addClass("background_272");
		_this.removeClass("mL10");
		
		$("span#showOrderInfo").text(_this.text());

		layer.load(0, {shade: [0.3,'#000']});
		
		$.post("buy_user_tendency_controller/showPage.html",{
			type:_this.attr("type"),
			startDate:$("input#startDate").val(),
			endDate:$("input#endDate").val()
		},function(data){
			layer.closeAll();
			if(data){
				var str = "";
				for(var i=0,len=data.list.length;i<len;i++){
					str+=
						'<div class="buyer_top1" style="background: #27282a;">'
    					+'<span class="buyer_span1">'+(i+1)+'</span>'
    			        +'<span class="buyer_span2">'+data.list[i].userName+'</span>'
    			        +'<span class="buyer_span3">'+data.list[i].number+'</span>'
    			        +'</div>';
				}
				
				$("customer").html(str);
				layerPageLoad(data.p.totalPage,data.p.currentPage,_this.attr("type"));
			}else{
				layer.alert("请求异常!");
			}
		})
		
		
		
	});
	
	var layerPageLoad = function(totalPage,curr,type){
		laypage({
		    cont: 'layerPage',
		    pages: totalPage,
		    curr : curr,
		    skip : true,
		    last : "尾页："+totalPage,
		    jump: function(obj,first){
		    	if(!first){
		    		layer.load(0, {shade: [0.3,'#000']});
		    		$.post("buy_user_tendency_controller/showPage.html",{
		    			currentPage:obj.curr,
		    			type:type,
		    			startDate:$("input#startDate").val(),
		    			endDate:$("input#endDate").val()
		    		},function(data){
		    			layer.closeAll();
		    			if(data){
		    				var str = "";
		    				for(var i=0,len=data.list.length;i<len;i++){
		    					str+=
		    						'<div class="buyer_top1" style="background: #27282a;">'
			    					+'<span class="buyer_span1">'+(i+1)+'</span>'
			    			        +'<span class="buyer_span2">'+data.list[i].userName+'</span>'
			    			        +'<span class="buyer_span3">'+data.list[i].number+'</span>'
			    			        +'</div>';
		    				}
		    				
		    				$("customer").html(str);
		    			}else{
		    				layer.alert("请求异常!");
		    			}
		    		})
		    		
		    	}
		    }
		})
	}
	
	layerPageLoad(${p.totalPage},${p.currentPage},0);

    
    var list = ${map.echartsData },
    	legendData = ['下单量', '下单件数' ,'下单金额'],
    	userData = [],//['张三','李四','王五']
    	series0 = [],
    	series1 = [],
    	series2 = [],
    	item = null;
    
    for(var i=0,len = list.length;i<len;i++){
    	item = list[i];
    	userData.push(item.userName)
    	series0.push(item.orderNumber)
    	series1.push(item.number)
    	series2.push(item.amount)
    }
    
    /* 
    series  数据结构
    [
        {
            name: '下单量',
            type: 'bar',
            data: [18203, 23489, 29034]
        },
        {
            name: '下单件数',
            type: 'bar',
            data: [19325, 23438, 31000]
        },
        {
            name: '下单金额',
            type: 'bar',
            data: [19325, 23438, 31000]
        }
    ] */
    
    
    

    var myChart = echarts.init(document.getElementById('main')),
  		option = {
        title: {
            text: '买家分析',
	        textStyle : {
				fontSize : 14,
				fontWeight : 'bolder',
				color : '#333'
			}
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: legendData,
	        textStyle : {
				fontSize : 14,
				fontWeight : 'bolder',
				color : '#333'
			}
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
			axisLabel : {
				show : true,
				textStyle : {
					color : '#555'
				}
			}
        },
        yAxis: {
            type: 'category',
            data: userData,
			axisLabel : {
				show : true,
				textStyle : {
					color : '#555'
				}
			}
        },
        series: [
            {
                name: '下单量',
                type: 'bar',
                data: series0
            },
            {
                name: '下单件数',
                type: 'bar',
                data: series1
            },
            {
                name: '下单金额',
                type: 'bar',
                data: series2
            }
        ]
        
    };
    myChart.setOption(option);
})
</script>
</html>