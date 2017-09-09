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
body {
	margin: 0;
	padding: 0;
	min-width: 952px;
	overflow-x: hidden;
	background: #2a2b2f;
}

.body_right {
	width: 100%;
	background: #fff;
	float: left;
}

.right_top {
	height: 90px;
	padding: 30px 34px;
}

.font_RT {
	color: #333;
	font-size: 24px;
}

.RT_right_font {
	float: right;
}

.all {
	font-size: 18px;
	color: #ccc;
	padding: 8px 42px;
	border-radius: 5px;
	cursor: pointer;
}

.background_B {
	background: #028be6;
	color: #fff !important;
}

.background_bluck {
	background: #3b3c42;
	color: #028be6;
}

.right_one {
	height: 120px;
	padding: 0 34px;
}

.right_one_left {
	width: 10%;
	text-align: center;
	float: left;
	background: #ccc;
	border-radius: 5px;
	color: #fff;
}

.ROL_font {
	color: #555555;
	font-size: 24px;
	line-height: 120px;
}

.RO_left_1 {
	width: 29%;
	height: 120px;
	float: left;
	background: #ccc;
	border-radius: 5px;
	margin-left: 0.5%;
}

.RO_left_2 {
	width: 21.6%;
	height: 120px;
	float: left;
	background: #ccc;
	border-radius: 5px;
	margin-left: 0.5%;
}
.RO_left_3 {
	width: 88%;
	height: 120px;
	float: left;
	background: #ccc;
	border-radius: 5px;
	margin-left: 0.5%;
}

.RO_left_1_top {
	margin: 15px;
}

.page_view {
	font-size: 16px;
	color: #555555;
}

.page_number {
	font-size: 24px;
	color: #86af61;
	float: right;
}

.RO_left_1_middle {
	margin: 24px 10px 0 15px;
}

.yesterday {
	font-size: 14px;
	color: #ff8a01;
	margin-right: 4px;
}

.yesterday_percentage {
	color: #f32626;
	font-size: 14px;
	position: relative;
	margin-right: 5px;
	display: inline-block;
}

.icon_red {
	background: url("view/truetime/operate/img/top_red.png") no-repeat center;
	background-size: cover;
	width: 14px;
	height: 12px;
	vertical-align: middle;
	display: inline-block;
	top: 0;
}

.float_R {
	float: right;
}

.icon_green {
	background: url("view/truetime/operate/img/green_down.png") no-repeat center;
}

.verM {
	vertical-align: text-top;
}

.green {
	color: #24cb3c;
}

.right_middle {
	margin-top: 24px;
	padding: 0 34px;
}

.right_middle_font {
	width: 100px;
	height: 45px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	text-align: center;
	line-height: 45px;
	font-size: 16px;
	color: #999;
	display: inline-block;
	background: #1f1f21;
	cursor: pointer;
}

.mL10 {
	margin-left: 10px;
}

.background_272 {
	background: #293846;
	color: #fff;
}
</style>
</head>
<body>
	<div class="body_right">
		<div class="right_top">
			<!--  RT--right_top  -->
			<span class="font_RT">实时经营概况</span>
			<div class="RT_right_font">
				<span type-data="all" class="all <c:if test="${type=='all' }">background_B</c:if><c:if test="${type!='all' }">background_bluck</c:if>">全部</span>
				<span type-data="0" class="all <c:if test="${type=='0' }">background_B</c:if><c:if test="${type!='0' }">background_bluck</c:if>">pc端</span>
				<span type-data="mp" class="all <c:if test="${type=='mp' }">background_B</c:if><c:if test="${type!='mp' }">background_bluck</c:if>">移动端</span>
			</div>

		</div>

		<div id="operatedata">
			
		</div>

		<div class="right_middle">
			<span type-data="流量" class="right_middle_font background_272">流量</span>
			<span type-data="单量" class="right_middle_font mL10">单量</span>
			<span type-data="金额" class="right_middle_font mL10">金额</span>
			<span type-data="商品件数" class="right_middle_font mL10">商品件数</span>
		</div>

		<div id="a" style="height: 400px"></div>
		<div id="b" style="height: 400px"></div>
		<div id="c" style="height: 400px"></div>
		<div id="d" style="height: 400px"></div>
	</div>
</body>

<!-- 全局js -->
<script src="static/js/jquery-2.1.1.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/plugins/layer/layer.min.js"></script>
<script type="text/javascript" src="static/js/plugins/echarts/echarts.js"></script>

<script type="text/javascript">
	var type = "${type}";
	$(function(){
		operatedata(type);
		visit(type);
		
		$(".all").on("click",function(){
			var $this = $(this);
			$(".all").each(function(){
				if($(this).hasClass("background_B")){
					$(this).removeClass("background_B");
					$(this).addClass("background_bluck");
				}
			})
			$this.removeClass("background_bluck");
			$this.addClass("background_B");
			type = $this.attr("type-data");
			operatedata(type);
			visit(type);
		})
		
		$(".right_middle_font").on("click",function(){
			var $this = $(this);
			$(".right_middle_font").each(function(){
				if($(this).hasClass("background_272")){
					$(this).removeClass("background_272");
				}
			})
			$this.addClass("background_272");
			var charttype = $this.attr("type-data");
			
			if(charttype == "流量"){
				visit(type);
			}else if(charttype == "单量"){
				ordernum(type);
			}else if(charttype == "金额"){
				orderamount(type);
			}else if(charttype == "商品件数"){
				purchasenum(type);
			}
			
		})
		
	})

	function operatedata(type){
		$.post("operateT/findOperateData.html?type="+type,function(data){
			$("#operatedata").html(data);
		})
	}
	
	function visit(type){
		$.post("operateT/findVisitData.html?type="+type,function(data){
			$("#c").css("display","block");
			$("#d").css("display","block");
			
			var pvs = data.pvs.split(",");
			var ypvs = data.ypvs.split(",");
			var uvs = data.uvs.split(",");
			var yuvs = data.yuvs.split(",");
			var cookies = data.cookies.split(",");
			var ycookies = data.ycookies.split(",");
			var users = data.users.split(",");
			var yusers = data.yusers.split(",");
			var hour = data.yhour.split(",");
			
			//浏览量(pv)
			var aChart = echarts.init(document.getElementById('a'));
			//曲线
			option = {
				title : {
					text : '浏览量(pv)实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日浏览量(pv)',
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
				}, {
					name : '昨日浏览量(pv)',
					type : 'line',
					smooth : true,
					data : ypvs,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			aChart.setOption(option);
			
			//访客数(ip)
			var bChart = echarts.init(document.getElementById('b'));
			//曲线
			option = {
				title : {
					text : '访客数（ip）实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日访客数（ip）',
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
				}, {
					name : '昨日访客数（ip）',
					type : 'line',
					smooth : true,
					data : yuvs,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			bChart.setOption(option);
			
			//访客数(cookie)
			var cChart = echarts.init(document.getElementById('c'));
			//曲线
			option = {
				title : {
					text : '访客数（cookie）实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日访客数（cookie）',
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
				}, {
					name : '昨日访客数（cookie）',
					type : 'line',
					smooth : true,
					data : ycookies,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			cChart.setOption(option);
			
			//访问用户数
			var dChart = echarts.init(document.getElementById('d'));
			//曲线
			option = {
				title : {
					text : '访问用户数实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日访问用户数',
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
				}, {
					name : '昨日访问用户数',
					type : 'line',
					smooth : true,
					data : yusers,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			dChart.setOption(option);
			
		})
	}
	
	function ordernum(type){
		$.post("operateT/findOrderNum.html?type="+type,function(data){
			$("#c").css("display","none");
			$("#d").css("display","none");
			
			var xd = data.xd.split(",");
			var yxd = data.yxd.split(",");
			var cj = data.cj.split(",");
			var ycj = data.ycj.split(",");
			var hour = data.hour.split(",");
			
			//下单单量
			var aChart = echarts.init(document.getElementById('a'));
			//曲线
			option = {
				title : {
					text : '下单单量实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日下单单量',
					type : 'line',
					smooth : true,
					data : xd,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				}, {
					name : '昨日下单单量',
					type : 'line',
					smooth : true,
					data : yxd,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			aChart.setOption(option);
			
			//成交单量
			var bChart = echarts.init(document.getElementById('b'));
			//曲线
			option = {
				title : {
					text : '成交单量实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日成交单量',
					type : 'line',
					smooth : true,
					data : cj,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				}, {
					name : '昨日成交单量',
					type : 'line',
					smooth : true,
					data : ycj,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			bChart.setOption(option);
		})
	}
	
	function orderamount(type){
		$.post("operateT/findOrderAmount.html?type="+type,function(data){
			$("#c").css("display","none");
			$("#d").css("display","none");
			
			var xd = data.xd.split(",");
			var yxd = data.yxd.split(",");
			var cj = data.cj.split(",");
			var ycj = data.ycj.split(",");
			var hour = data.hour.split(",");
			
			//下单金额
			var aChart = echarts.init(document.getElementById('a'));
			//曲线
			option = {
				title : {
					text : '下单金额实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日下单金额',
					type : 'line',
					smooth : true,
					data : xd,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				}, {
					name : '昨日下单金额',
					type : 'line',
					smooth : true,
					data : yxd,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			aChart.setOption(option);
			
			//成交金额
			var bChart = echarts.init(document.getElementById('b'));
			//曲线
			option = {
				title : {
					text : '成交金额实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日成交金额',
					type : 'line',
					smooth : true,
					data : cj,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				}, {
					name : '昨日成交金额',
					type : 'line',
					smooth : true,
					data : ycj,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			bChart.setOption(option);
		})
	}
	
	function purchasenum(type){
		$.post("operateT/findPurchaseNum.html?type="+type,function(data){
			$("#c").css("display","none");
			$("#d").css("display","none");
			
			var xd = data.xd.split(",");
			var yxd = data.yxd.split(",");
			var cj = data.cj.split(",");
			var ycj = data.ycj.split(",");
			var hour = data.hour.split(",");
			
			//下单商品件数
			var aChart = echarts.init(document.getElementById('a'));
			//曲线
			option = {
				title : {
					text : '下单商品件数实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日下单商品件数',
					type : 'line',
					smooth : true,
					data : xd,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				}, {
					name : '昨日下单商品件数',
					type : 'line',
					smooth : true,
					data : yxd,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			aChart.setOption(option);
			
			//成交商品件数
			var bChart = echarts.init(document.getElementById('b'));
			//曲线
			option = {
				title : {
					text : '成交商品件数实时数据',
					x : "center",
					textStyle : {
						fontSize : 14,
						fontWeight : 'bolder',
						color : '#333'
					}
				},
				tooltip : {
					trigger : 'axis'
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
							color : '#555'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						show : true,
						textStyle : {
							color : '#555'
						}
					}
				} ],
				series : [ {
					name : '今日成交商品件数',
					type : 'line',
					smooth : true,
					data : cj,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				}, {
					name : '昨日成交商品件数',
					type : 'line',
					smooth : true,
					data : ycj,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				} ]
			};
			bChart.setOption(option);
		})
	}
	

</script>
</html>