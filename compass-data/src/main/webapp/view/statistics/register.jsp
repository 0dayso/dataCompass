<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>

<head>
	<base href="<%=basePath%>">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>户外门户 - </title>

	<link href="static/css/bootstrap.min.css" rel="stylesheet">
	<link href="static/css/font-awesome.min.css" rel="stylesheet">
	<link href="static/css/layerdate/layerdate.css" rel="stylesheet" />
	<!-- iCheck -->
	<link href="static/css/plugins/iCheck/custom.css" rel="stylesheet">
	<link href="static/css/animate.min.css" rel="stylesheet">
	<link href="static/css/style.min.css" rel="stylesheet">
	<link href="static/css/page.css" rel="stylesheet">

	<!-- 全局js -->
	<script src="static/js/jquery-2.1.1.min.js"></script>

</head>

<body class="gray-bg">
<div class="wrapper wrapper-content  animated fadeInRight">
	<div class="row">
		<div id="user-box" class="col-sm-12">
			<div class="ibox">
				<form id="travels" action="op_register_detail/findAllop_register_detail.html" method="post" >
					<div class="ibox-content">
						<h2>注册明细</h2>
						<div class="input-group">
							<div class="col-md-3">
								<input type="text" placeholder="开始日期" id="startDate" name="startDate" <c:if test="${page.t.startDate!=null && page.t.startDate!='' }">value="${page.t.startDate }"</c:if><c:if test="${page.t.startDate==null || page.t.startDate=='' }">value="${startDate }"</c:if> readonly class="input form-control">
							</div>

							<div class="col-md-3">
								<input type="text" placeholder="结束日期" id="endDate" name="endDate" value="${page.t.endDate }" readonly
									class="input form-control">
							</div>

							<div class="col-md-3">
								<select class="form-control m-b" name="channelId" id="channelId">
									<option value="">请选择渠道</option>
									<c:forEach items="${channels}" var="item">
										<option value="${item.id}">${item.name}</option>

									</c:forEach>
								</select>

							</div>

							<div class="col-md-3" id="channelurl">
								<select class="form-control m-b" name="channelurl">
									<option value="">请选择渠道链接</option>
								</select>
							</div>
							
							<div class="col-md-3">
								<input type="text" placeholder="用户ID" id="userid" name="userid" value="${page.t.userid }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="活动ID" id="activeId" name="activeId" value="${page.t.activeId }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="ip" id="ip" name="ip" value="${page.t.ip }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="省市" id="county" name="county" value="${page.t.county }" class="input form-control">
							</div>
							
							<div class="col-md-3">
								<button type="submit" class="btn btn-success"> <i class="fa fa-search"></i> 搜索</button>
							</div>
						</div>
						<div class="hr-line-dashed"></div>
						<div class="tab-content">
							<div class="tab-pane active">
								<div class="full-height-scroll">
									<div class="table-responsive">
										<table class="table table-striped table-hover">
											<thead>
											<tr>
												<th >注册时间</th>
												<th >用户ID</th>
												<th >ip</th>
												<th >省市</th>
												<th >渠道</th>
												<th >渠道链接</th>
												<th >来源</th>
												<th >活动ID</th>

											</tr>
											</thead>
											<tbody>
											<c:forEach items="${list}" var="list" >
												<tr>
													<td>
														<label><fmt:formatDate value="${list.registertime}" pattern="yyyy-MM-dd HH:mm:ss"/></label>
													</td>
													<td>${list.userid}</td>
													<td>${list.ip}</td>
													<td>${list.county}</td>
													<td>${list.channelid}</td>
													<td>${list.channelUrlId}</td>
													<td>${list.source}</td>
													<td>${list.activeId}</td>


												</tr>
											</c:forEach>

											</tbody>
										</table>
									</div>
								</div>

								<div class="hr-line-dashed"></div>
								<div class="text-center">

									${page.pageStr }

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
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/plugins/layer/layer.min.js"></script>
<script src="static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<!-- iCheck -->
<script src="static/js/plugins/iCheck/icheck.min.js"></script>
	
<script src="static/js/plugins/layer/laydate/laydate.js"></script>

<script src="view/statistics/js/search.js"></script>

<script>
	var channelId = "${page.t.channelId}",
	channelurl = "${page.t.channelurl}";
	var obj;
	$(function () {
		$(".full-height-scroll").slimScroll({
			height: "100%"
		});

		//设置本页layer皮肤
		layer.config({
			skin:'layui-layer-molv',
		});

	});





</script>


</body>


</html>