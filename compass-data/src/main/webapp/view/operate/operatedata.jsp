<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="survey_top2 mT9">
	<div class="survey_row">
		<span class="surver1">流量</span>
		<span class="surver2">
			<span class="text_left">浏览量(pv)
				<span class="font_green">${op_data.visitnum }</span>
			</span>
		</span>
		<span class="surver2">
			<span class="text_left">访客数(ip)
				<span class="font_green">${op_data.uv }</span>
			</span>
		</span>
		<span class="surver2">
			<span class="text_left">访客数(cookie)
				<span class="font_green">${op_data.cookie }</span>
			</span>
		</span>
		<span class="surver2">
			<span class="text_left">访问用户数
				<span class="font_green">${op_data.visitusernum }</span>
			</span>
		</span>
	</div>
</div>

<div class="survey_top2 mT9">
	<div class="survey_row">
		<span class="surver1">销量</span>
		<span class="surver2">
			<span class="text_left">下单金额<span class="two_row_N">${op_data.amount }</span></span>
		</span>
		<span class="surver2">
			<span class="text_left">支付金额<span class="two_row_N">${op_data.payamount }</span></span>
		</span>
		<span class="surver2">
			<span class="text_left">下单单量<span class="two_row_N">${op_data.ordernum }</span></span>
		</span>
		<span class="surver2">
			<span class="text_left">下单商品件数<span class="two_row_N">${op_data.purchasenum }</span></span>
		</span>
	</div>
</div>

<div id="a" style="height: 400px;margin-top: 20px;"></div>
<div id="b" style="height: 400px;margin-top: 20px;"></div>

<div class="right_button">
	<c:forEach items="${operateTable }" var="item" varStatus="vst">
		<c:if test="${vst.index==0 }">
			<div class="button_top">
				<span class="font_green">时间段<i>|</i></span>
				<span class="font_green">浏览量(pv)<i>|</i></span>
				<span class="font_green">访客数(ip)<i>|</i></span>
				<span class="font_green">访客数(cookie)<i>|</i></span>
				<span class="font_green">访问用户数<i>|</i></span>
				<span class="font_green">下单金额<i>|</i></span>
				<span class="font_green">下单客户数<i>|</i></span>
				<span class="font_green">下单单量<i>|</i></span>
				<span class="font_green">下单商品件数</span>
			</div>
		</c:if>

		<div class="button_top">
			<span class="fontWhite">${item.hour }</span>
			<span class="fontWhite">${item.pv }</span>
			<span class="fontWhite">${item.uv }</span>
			<span class="fontWhite">${item.cookie }</span>
			<span class="fontWhite">${item.useruv }</span>
			<span class="fontWhite">${item.amount }</span>
			<span class="fontWhite">${item.orderuser }</span>
			<span class="fontWhite">${item.ordernum }</span>
			<span class="fontWhite">${item.purchasenum }</span>
		</div>
	</c:forEach>

</div>

<script>
$(function(){
	var type = "${type}";
	var date = "${date}";
	visit(type,date);
	piechart(date);
})

function visit(type,date){
	$.post("operate/findVisitData.html",{type:type,date:date},function(data){
		var pvs = data.pvs.split(",");
		var uvs = data.uvs.split(",");
		var cookies = data.cookies.split(",");
		var users = data.users.split(",");
		var hour = data.hour.split(",");
		
		//浏览量
		var aChart = echarts.init(document.getElementById('a'));
		//曲线
		option = {
			title : {
				text : '整体经营概况趋势分析'+date,
				textStyle : {
					fontSize : 14,
					fontWeight : 'bolder',
					color : '#333'
				}
			},
			tooltip : {
				trigger : 'axis'
			},
			legend: {
		        data:['浏览量(pv)','访客数(ip)','访客数(cookie)','访问用户数'],
		        textStyle : {
					fontSize : 14,
					fontWeight : 'bolder',
					color : '#333'
				}
		    },
			toolbox : {
				show : true,
				x : '40'
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : hour,
				axisLabel : {
					show : true,
					textStyle : {
						color : '#ff8a01'
					}
				}
			} ],
			yAxis : [ {
				type : 'value',
				axisLabel : {
					show : true,
					textStyle : {
						color : '#ff8a01'
					}
				}
			} ],
			series : [ {
				name : '浏览量(pv)',
				type : 'line',
				smooth : true,
				data : pvs,
				markPoint : {
					data : [ {
						type : 'max',
						name : '最大值'
					}, {
						type : 'min',
						name : '最小值'
					} ]
				}
			}, 
			{
				name : '访客数(ip)',
				type : 'line',
				smooth : true,
				data : uvs,
				markPoint : {
					data : [ {
						type : 'max',
						name : '最大值'
					}, {
						type : 'min',
						name : '最小值'
					} ]
				}
			},
			{
				name : '访客数(cookie)',
				type : 'line',
				smooth : true,
				data : cookies,
				markPoint : {
					data : [ {
						type : 'max',
						name : '最大值'
					}, {
						type : 'min',
						name : '最小值'
					} ]
				}
			},
			{
				name : '访问用户数',
				type : 'line',
				smooth : true,
				data : users,
				markPoint : {
					data : [ {
						type : 'max',
						name : '最大值'
					}, {
						type : 'min',
						name : '最小值'
					} ]
				}
			}
			]
		};
		aChart.setOption(option);
	})
}

function piechart(date){
	$.post("operate/findVisitPercent.html",{date:date},function(data){
		var bChart = echarts.init(document.getElementById('b'));
		
		option = {
		    title : {
		        text: '浏览量占比分析',
		        left: '17%',
		        textStyle : {
					fontSize : 14,
					fontWeight : 'bolder',
					color : '#333'
				}
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['pc','m端','app','微信'],
		        textStyle : {
					fontSize : 14,
					fontWeight : 'bolder',
					color : '#333'
				}
		    },
		    series : [
		        {
		            name: '浏览量',
		            type: 'pie',
		            radius : '55%',
		            center: ['20%', '60%'],
		            data:[
		                {value:data.pc, name:'pc'},
		                {value:data.m, name:'m端'},
		                {value:data.app, name:'app'},
		                {value:data.wx, name:'微信'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: '#555'
		                }
		            }
		        }
		    ]
		};
		
		bChart.setOption(option);
		
	})
}

</script>
