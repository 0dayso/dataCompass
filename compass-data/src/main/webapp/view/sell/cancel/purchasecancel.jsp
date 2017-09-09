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
	<script src="static/js/jquery-2.1.1.min.js"></script>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content  animated fadeInRight">
	<div class="row">
		<div id="user-box" class="col-sm-12">
			<div class="ibox">
				<form id="travels" action="op_purchase_cancel_detail/findAllop_purchase_cancel_detail.html" method="post" >
					<div class="ibox-content">
						<h2>取消订单明细</h2>
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
								<select class="form-control m-b" name="paystatus" id="paystatus">
									<option value="">请选择支付状态</option>
									<c:forEach items="${paystatus}" var="item">
										<option value="${item.id}" <c:if test="${item.id==page.t.paystatus}">selected</c:if>>${item.name}</option>

									</c:forEach>
								</select>
							</div>
							
							<div class="col-md-3">
								<select class="form-control m-b" name="status" id="status">
									<option value="0">请选择原因类型</option>
									<option value="1" <c:if test="${page.t.status=='1'}">selected</c:if>>订单取消</option>
									<option value="2" <c:if test="${page.t.status=='2'}">selected</c:if>>退货</option>
									<option value="3" <c:if test="${page.t.status=='3'}">selected</c:if>>换货</option>
								</select>

							</div>
							
							<div class="col-md-3">
								<input type="text" placeholder="用户ID" id="userid" name="userid" value="${page.t.userid }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="spu" id="productId" name="productId" value="${page.t.productId }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="sku" id="sku" name="sku" value="${page.t.sku }" class="input form-control">
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
								<input type="text" placeholder="店铺ID" id="shopId" name="shopId" value="${page.t.shopId }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="订单ID" id="orderId" name="orderId" value="${page.t.orderId }" class="input form-control">
							</div>
							<div class="col-md-3">
								<input type="text" placeholder="取消原因" id="objectStr" name="objectStr" value="${page.t.objectStr }" class="input form-control">
							</div>
							
							<div class="col-md-3" id="channelurl">
								<select class="form-control m-b" name="webtype">
									<option value="">请选择站来源</option>
									<option value="0" <c:if test="${page.t.webtype=='0'}">selected</c:if>>pc</option>
									<option value="1" <c:if test="${page.t.webtype=='1'}">selected</c:if>>m端</option>
									<option value="2" <c:if test="${page.t.webtype=='2'}">selected</c:if>>app</option>
									<option value="3" <c:if test="${page.t.webtype=='3'}">selected</c:if>>微信</option>
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
													购买时间
												</th>
												<th>
													用户编号
												</th>
												<th>
													用户昵称
												</th>
												<th>
													ip
												</th>
												<th>
													渠道
												</th>
												<th>
													店铺编号
												</th>
												<th>
													店铺名称
												</th>
												<th>
													sku
												</th>
												<th>
													商品名称
												</th>
												<th>
													数量
												</th>
												<th>
													金额
												</th>
												<th>
													支付状态
												</th>
												<th>
													来源
												</th>
												<th>
													活动ID
												</th>
												<th>
													渠道链接
												</th>
												<th>
													站来源类型
												</th>
												<th>
													订单号
												</th>
												<th>
													省市
												</th>
												<th>
													原因
												</th>
												<th>
													提交时间
												</th>
												<th>
													原因类型
												</th>
											</tr>
											</thead>
											<tbody>
											<c:forEach items="${list}" var="item" >
												<tr>
													<td>
														<label><fmt:formatDate value="${item.purchasetime }" pattern="yyyy-MM-dd HH:mm:ss"/></label>
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
														${item.channelname }
													</td>
													<td>
														<a target="_blank" href="http://www.seebong.com/ShopTemplate/Index.html?Sid=${item.shopId}">${item.shopId }</a>
													</td>
													<td>
														<a target="_blank" href="http://www.seebong.com/ShopTemplate/Index.html?Sid=${item.shopId}">${item.shopName }</a>
													</td>
													<td>
														<a target="_blank" href="http://www.seebong.com/Product/${item.sku}.html">${item.sku }</a>
													</td>
													<td>
														<a target="_blank" href="http://www.seebong.com/Product/${item.sku}.html">${item.productName }</a>
													</td>
													<td>
														${item.number }
													</td>
													<td>
														${item.amount }
													</td>
													<td>
														${item.status }
													</td>
													<td>
														${item.source }
													</td>
													<td>
														${item.activeId }
													</td>
													<td>
														${item.channelUrl }
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
														${item.orderId }
													</td>
													<td>
														${item.county }
													</td>
													<td>
														${item.reason }
													</td>
													<td>
														<fmt:formatDate value="${item.submittime }" pattern="yyyy-MM-dd HH:mm:ss"/>
													</td>
													<td>
														<c:if test="${item.reasontype==1 }">
															订单取消
														</c:if>
														<c:if test="${item.reasontype==2 }">
															退货
														</c:if>
														<c:if test="${item.reasontype==3 }">
															换货
														</c:if>
													</td>

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