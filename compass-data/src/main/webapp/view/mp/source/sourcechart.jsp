<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<style>
td {
	border: solid #555;
	border-width: 0px 1px 1px 0px;
	padding: 10px 0px;
	text-align: center;
}

table {
	width: 1500px;
	border: solid #555;
	border-width: 1px 0px 0px 1px;
}
</style>
<div class="right_middle">
	<div id="main" style="width: 100%; height: 400px;"></div>
</div>

<div class="right_middle" style="height: 330px;">
	<div class="top_top">
		<span>浏览</span> <span>质量</span> <span>转化</span>
	</div>
	<div class="button_top" style="background-color: #202022;">
		<span>来源<i>|</i></span>
		<span>访客数(ip)<i>|</i></span>
		<span>访客数(cookie)<i>|</i></span>
		<span>浏览量<i>|</i></span>
		<span>访问用户数<i>|</i></span>
		<span>平均访问深度<i>|</i></span>
		<span>平均停留时间<i>|</i></span>
		<span>跳失率<i>|</i></span>
		<span>下单金额<i>|</i></span>
		<span>下单单量<i>|</i></span>
		<span>下单商品件数<i>|</i></span>
		<span>转化率</span>
	</div>
	<c:forEach items="${map.finalList }" var="item">
		<div class="button_top">
			<span class="fontWhite">${item.channel }</span>
			<span class="fontWhite">${item.uvCount }</span>
			<span class="fontWhite">${item.cookieCount }</span>
			<span class="fontWhite">${item.pvCount }</span>
			<span class="fontWhite">${item.userCount }</span>
			<span class="fontWhite">暂无</span>
			<span class="fontWhite">暂无</span>
			<span class="fontWhite">暂无</span>
			<span class="fontWhite">${item.amount }</span>
			<span class="fontWhite">${item.ordernum }</span>
			<span class="fontWhite">${item.purchasenum }</span>
			<span class="fontWhite">
				<c:if test="${item.cookieCount!='0' }">
					<fmt:formatNumber value="${item.orderuser/item.cookieCount }" type="percent"/>
				</c:if>
				<c:if test="${item.cookieCount=='0' }">
					0%
				</c:if>
			</span>
		</div>
	</c:forEach>
</div>

<script>
	//基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	var channel = "${map.channel}".split(",");
	var uvCount = "${map.uvCount}".split(",");
	var cookieCount = "${map.cookieCount}".split(",");
	var pvCount = "${map.pvCount}".split(",");
	var userCount = "${map.userCount}".split(",");

	// 指定图表的配置项和数据
	var option = {
		title : {
			text : "来源统计",
			textStyle : {
				fontSize : 14,
				fontWeight : 'bolder',
				color : '#CCC'
			}
		},
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'shadow'
			}
		},
		legend : {
			data : [ '访客来源（ip）', '访客来源（cookie）', '访问来源', '访问用户来源' ],
			textStyle : {
				fontSize : 14,
				fontWeight : 'bolder',
				color : '#CCC'
			}
		},
		grid : {
			left : '3%',
			right : '4%',
			bottom : '3%',
			containLabel : true
		},
		xAxis : {
			type : 'value',
			boundaryGap : [ 0, 0.01 ]
		},
		yAxis : {
			type : 'category',
			data : channel,
			axisLabel : {
				show : true,
				textStyle : {
					color : '#CCC'
				}
			}
		},
		series : [ {
			name : '访问来源',
			type : 'bar',
			data : pvCount,
			markPoint : {
				data : [ {
					type : 'max',
					name : '最大值'
				}, {
					type : 'min',
					name : '最小值'
				} ]
			},
			markLine : {
				data : [ {
					type : 'average',
					name : '平均值'
				} ]
			}
		}, {
			name : '访客来源（ip）',
			type : 'bar',
			data : uvCount
		}, {
			name : '访客来源（cookie）',
			type : 'bar',
			data : cookieCount
		},

		{
			name : '访问用户来源',
			type : 'bar',
			data : userCount
		}

		]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
</script>