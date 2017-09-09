<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>




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
							<th>费用类型</th>
						</c:if>
						<c:if test="${page.t.rowFieldVO.isShowType==1 }">
							<th>访问来源</th>
						</c:if>
						<th>缴费金额</th>
						<th>缴费次数</th>
					</tr>
					</thead>
					<tbody>
					<c:forEach items="${list}" var="list" >
						<tr>
							<c:if test="${page.t.rowFieldVO.isShowDate==1 }">
								<td><fmt:formatDate value="${list.ctime }" pattern="yyyy-MM-dd"/></td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowCounty==1 }">
								<td>
									${list.county }
								</td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowShop==1 }">
								<td>
									<a target="_blank" href="http://www.seebong.com/ShopTemplate/Index.html?Sid=${list.shopid}">${list.shopid }</a>
								</td>
								<td>
									<a target="_blank" href="http://www.seebong.com/ShopTemplate/Index.html?Sid=${list.shopid}">${list.shopname }</a>
								</td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowStatus==1 }">
								<td>
									<c:if test="${list.status==1 }">
										商家保证金
									</c:if>
									<c:if test="${list.status==2 }">
										平台使用费
									</c:if>
									<c:if test="${list.status==3 }">
										广告费
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
								<a class="J_menuItem" data="缴费金额" data-index="0" 
								href="op_shop_cost_detail/findAllop_shop_cost_detail.html?
								<c:if test="${page.t.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.ctime }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.ctime }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${page.t.rowFieldVO.isShowDate!='1'}">
									startDate=${page.t.startDate}
									&&endDate=${page.t.endDate}
								</c:if>
								<c:if test="${page.t.rowFieldVO.isShowShop==1 }">
									&&shopId=${list.shopid}
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
								</c:if>">
									${list.money }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="缴费次数" data-index="0" 
								href="op_shop_cost_detail/findAllop_shop_cost_detail.html?
								<c:if test="${page.t.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.ctime }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.ctime }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${page.t.rowFieldVO.isShowDate!='1'}">
									startDate=${page.t.startDate}
									&&endDate=${page.t.endDate}
								</c:if>
								<c:if test="${page.t.rowFieldVO.isShowShop==1 }">
									&&shopId=${list.shopid}
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
								</c:if>">
									${list.count }
								</a>
							</td>
							
						</tr>
					</c:forEach>

					</tbody>
				</table>
			</div>
		</div>

		<div id="page" class="text-center">
			
		</div>
		
	</div>
<script type="text/javascript" src="view/statistics/js//contabs.min.js"></script>
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
		
	})
</script>

