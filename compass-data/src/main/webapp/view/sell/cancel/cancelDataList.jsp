<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<c:if test="${fn:length(list)>0 }">
		<div id="main" style="width: 100%;height: 500px;"></div>
	</c:if>
	
	<div class="tab-pane active">
		<div class="full-height-scroll">
			<div class="table-responsive">
				<table class="table table-striped table-hover">
					<thead>
					<tr>
						<c:if test="${page.t.rowFieldVO.isShowDate==1 }">
							<th>日期</th>
						</c:if>
						<c:if test="${page.t.rowFieldVO.isShowCounty==1 }">
							<th>省市</th>
						</c:if>
						<c:if test="${page.t.rowFieldVO.isShowShop==1 }">
							<th>店铺编号</th>
							<th>店铺名称</th>
						</c:if>
						<c:if test="${page.t.rowFieldVO.isShowStatus==1 }">
							<th>原因类型</th>
						</c:if>
						<c:if test="${page.t.rowFieldVO.isShowType==1 }">
							<th>访问来源</th>
						</c:if>
						<th>取消原因</th>
						<th>原因出现次数</th>
					</tr>
					</thead>
					<tbody>
					<c:forEach items="${list}" var="list" >
						<tr>
							<c:if test="${page.t.rowFieldVO.isShowDate==1 }">
								<td><fmt:formatDate value="${list.submittime }" pattern="yyyy-MM-dd"/></td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowCounty==1 }">
								<td>
									${list.county }
								</td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowShop==1 }">
								<td>
									<a target="_blank" href="http://www.seebong.com/ShopTemplate/Index.html?Sid=${item.shopId}">${item.shopId }</a>
								</td>
								<td>
									<a target="_blank" href="http://www.seebong.com/ShopTemplate/Index.html?Sid=${item.shopId}">${item.shopname }</a>
								</td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowStatus==1 }">
								<td>
									<c:if test="${list.reasontype==1 }">
										订单取消
									</c:if>
									<c:if test="${list.reasontype==2 }">
										退货
									</c:if>
									<c:if test="${list.reasontype==3 }">
										换货
									</c:if>
								</td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowType==1 }">
								<td>
									<c:if test="${list.type==0 }">
										pc
									</c:if>
									<c:if test="${list.type==1 }">
										m端
									</c:if>
									<c:if test="${list.type==2 }">
										app
									</c:if>
									<c:if test="${list.type==3 }">
										微信
									</c:if>
								</td>
							</c:if>
							
							<td>
								${list.reason }
							</td>
							<td>
								<a class="J_menuItem" data="订单取消原因" data-index="0" 
								href="op_purchase_cancel_detail/findAllop_purchase_cancel_detail?
								<c:if test="${page.t.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.submittime }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.submittime }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${page.t.rowFieldVO.isShowDate!='1'}">
									startDate=${page.t.startDate}
									&&endDate=${page.t.endDate}
								</c:if>
								<c:if test="${page.t.rowFieldVO.isShowCounty==1 }">
									&&country=${list.county}
								</c:if>
								<c:if test="${page.t.webtype!=null && page.t.webtype!='' }">
									&&webtype=${page.t.webtype}
								</c:if>
								<c:if test="${(page.t.webtype==null || page.t.webtype=='') && page.t.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>
								<c:if test="${page.t.status!=null && page.t.status!='' }">
									&&status=${page.t.status}
								</c:if>
								<c:if test="${(page.t.status==null || page.t.status=='') && page.t.rowFieldVO.isShowStatus==1}">
									&&status=${list.status}
								</c:if>&&objectStr=${list.reason }">
									${list.count }
								</a>
							</td>
							
						</tr>
					</c:forEach>

					</tbody>
				</table>
			</div>
		</div>

		<div id="page" class="text-center"></div>
	</div>
<script type="text/javascript" src="view/statistics/js//contabs.min.js"></script>
<!-- 图表 -->
<script type="text/javascript" src="static/js/plugins/echarts/echarts.js"></script>

<script type="text/javascript">
	var totalPage = "${page.totalPage}";
	var currentPage = "${page.currentPage}";
	
	$(function(){
		//显示分页
		laypage({
			cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
			pages: totalPage, //通过后台拿到的总页数
			curr: currentPage, //当前页
			skin: '#555',
			jump: function(obj, first){ //触发分页后的回调
				if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					page = obj.curr;
					searchList(url);
				}
			}
		});
		
		<c:if test="${fn:length(list)>0 }">
			//基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('main'));
	        option = {
				title : {
					text: '取消订单原因统计',
					subtext: '当前页',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data:${data}
				},
				series : [
					{
						name: '取消原因',
						type: 'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:${count},
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};
	     	// 使用刚指定的配置项和数据显示图表。
	    	myChart.setOption(option);
		</c:if>
		
	})
</script>

