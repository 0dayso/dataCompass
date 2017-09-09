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
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content  animated fadeInRight">
		<div class="row">
			<div id="user-box" class="col-sm-12">
				<div class="ibox">
					<form id="travels" action="pc_visit_flow/pc_visit_hour_flow.html">
						<div class="ibox-content">
							<h2>小时分析</h2>
							<div class="input-group col-md-6">
								<div class="col-md-3">
									<input type="text" value="${s.endDate }"
										placeholder="日期" id="endDate" name="endDate" readonly
										class="input form-control">
								</div>

								<div class="col-md-3">
									<button type="submit" class="btn btn-success">
										<i class="fa fa-search"></i> 搜索
									</button>
								</div>
							</div>

							<div class="hr-line-dashed"></div>
							<div class="tab-content">
								<div class="tab-pane active">
									<div class="full-height-scroll">
										<div class="table-responsive">
											<div id="main" style="width: 100%;height:600px; float: left;"></div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- 全局js -->
	<script src="static/js/jquery-2.1.1.min.js"></script>
	<script src="static/js/bootstrap.min.js"></script>
	<script src="static/js/plugins/layer/layer.min.js"></script>
	<script type="text/javascript" src="static/js/plugins/echarts/echarts.js"></script>
	<script type="text/javascript" src="static/js/plugins/layer/laydate/laydate.js"></script>
	<script type="text/javascript" src="view/pc/day_hour_flow/hour_flow_search.js"></script>
	
	<script type="text/javascript">
	//基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	var datas = ${list},// 数据集合
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
		
		// 指定图表的配置项和数据
		var option = {
				title : {
					text : '经营流量'
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					data : ['浏览量(pv)', '访客数(ip)' ,'访客数(cookie)' ,'访问用户数' ]
				},
				grid : {
					left : '3%',
					right : '4%',
					bottom : '3%',
					containLabel : true
				},
				toolbox : {
					feature : {
						saveAsImage : {}
					}
				},
				xAxis : {
					type : 'category',
					boundaryGap : false,
					data : dateArray
				},
				yAxis : {
					type : 'value'
				},
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

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
	</script>
</body>
</html>