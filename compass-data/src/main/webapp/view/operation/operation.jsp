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
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content  animated fadeInRight">
	<div class="row">
		<div id="user-box" class="col-sm-12">
			<div class="ibox">
				<form id="travels" action="op_operation_detail/findAllop_operation_detail.html" method="post" >
					<div class="ibox-content">
						<h2>后台操作详情</h2>
						<div class="input-group">
							<div class="col-md-3">
								<input type="text" placeholder="开始日期" id="startDate" name="startDate" <c:if test="${page.t.startDate!=null && page.t.startDate!='' }">value="${page.t.startDate }"</c:if><c:if test="${page.t.startDate==null || page.t.startDate=='' }">value="${startDate }"</c:if> readonly class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="结束日期" id="endDate" name="endDate" value="${page.t.endDate }" readonly
									class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="用户ID" id="userid" name="userid" value="${page.t.userid }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="ip" id="ip" name="ip" value="${page.t.ip }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="省市" id="county" name="county" value="${page.t.county }" class="input form-control">
							</div>
							
							<div class="col-md-3" id="channelurl">
								<select class="form-control m-b" name="type">
									<option value="">请选择站来源</option>
									<option value="0" <c:if test="${page.t.type=='0'}">selected</c:if>>pc</option>
									<option value="1" <c:if test="${page.t.type=='1'}">selected</c:if>>m端</option>
									<option value="2" <c:if test="${page.t.type=='2'}">selected</c:if>>app</option>
									<option value="3" <c:if test="${page.t.type=='3'}">selected</c:if>>微信</option>
								</select>
							</div>
							
							<div class="col-md-3" id="channelurl">
								<select class="form-control m-b" name="opttype">
									<option value="0">请选择操作类型</option>
									<option value="1" <c:if test="${page.t.opttype=='1'}">selected</c:if>>增加</option>
									<option value="2" <c:if test="${page.t.opttype=='2'}">selected</c:if>>修改</option>
									<option value="3" <c:if test="${page.t.opttype=='3'}">selected</c:if>>删除</option>
									<option value="4" <c:if test="${page.t.opttype=='4'}">selected</c:if>>查询</option>
								</select>
							</div>
							
							<div class="col-md-3" id="channelurl">
								<select class="form-control m-b" name="optsystem">
									<option value="0">请选择操作系统</option>
									<option value="1" <c:if test="${page.t.optsystem=='1'}">selected</c:if>>商家</option>
									<option value="2" <c:if test="${page.t.optsystem=='2'}">selected</c:if>>商城后台</option>
								</select>
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
												<th>
													创建时间
												</th>
												<th>
													用户编号
												</th>
												<th>
													用户名称
												</th>
												<th>
													ip
												</th>
												<th>
													操作类型
												</th>
												<th>
													操作内容
												</th>
												<th>
													操作模块
												</th>
												<th>
													操作系统
												</th>
												<th>
													站来源类型
												</th>
												<th>
													省市
												</th>
											</tr>
											</thead>
											
											<c:forEach items="${list }" var="item">
												<tbody>
													<tr>
														<td>
															<fmt:formatDate value="${item.ctime }" pattern="yyyy-MM-dd HH:mm:ss"/>
														</td>
														<td>
															${item.userid }
														</td>
														<td>
															${item.username }
														</td>
														<td>
															${item.ip }
														</td>
														<td>
															<c:if test="${item.opttype==1 }">
																增加
															</c:if>
															<c:if test="${item.opttype==2 }">
																修改
															</c:if>
															<c:if test="${item.opttype==3 }">
																删除
															</c:if>
															<c:if test="${item.opttype==4 }">
																查看
															</c:if>
														</td>
														<td>
															${item.optcontent }
														</td>
														<td>
															${item.optmodel }
														</td>
														<td>
															<c:if test="${item.optsystem==1 }">
																商家
															</c:if>
															<c:if test="${item.optsystem==2 }">
																商城后台
															</c:if>
														</td>
														<td>
															<c:if test="${item.type==0 }">
																pc
															</c:if>
															<c:if test="${item.type==1 }">
																m端
															</c:if>
															<c:if test="${item.type==2 }">
																app
															</c:if>
															<c:if test="${item.type==3 }">
																微信
															</c:if>
														</td>
														<td>
															${item.county }
														</td>
													</tr>
												</tbody>
											</c:forEach>
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
<script src="static/js/jquery-2.1.1.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/plugins/layer/layer.min.js"></script>
<script src="static/js/plugins/layer/laydate/laydate.js"></script>
<script src="static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<!-- iCheck -->
<script src="static/js/plugins/iCheck/icheck.min.js"></script>
<script src="view/statistics/js/search.js"></script>

</body>


</html>