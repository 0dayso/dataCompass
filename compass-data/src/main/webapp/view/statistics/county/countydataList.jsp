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
						<c:if test="${searchData.rowFieldVO.isShowDate==1 }">
							<th>日期</th>
						</c:if>
						<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
							<th>省市</th>
						</c:if>
						<c:if test="${searchData.rowFieldVO.isShowType==1 }">
							<th>访问来源</th>
						</c:if>
						<th>关注商品数</th>
						<th>关注店铺数</th>
						<th>加入购物车数</th>
						<th>浏览量(pv)</th>
						<th>访客数(ip)</th>
						<th>访客数(cookie)</th>
						<th>访问用户数</th>
						<th>注册数</th>
						<th>购买数量</th>
						<th>下单金额</th>
						<th>支付金额</th>
						<th>订单数量</th>
						<th>订单退货数量</th>
						<th>订单取消数量</th>
						<th>订单换货数量</th>
						<th>订单支付数量</th>
					</tr>
					</thead>
					<tbody>
					<c:forEach items="${op_county_data}" var="list" >
						<tr>
							<c:if test="${searchData.rowFieldVO.isShowDate==1 }">
								<td><fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/></td>
							</c:if>
							<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
								<td>
									${list.county }
								</td>
							</c:if>
							<c:if test="${searchData.rowFieldVO.isShowType==1 }">
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
								<a class="J_menuItem" data="关注商品" data-index="0" 
								href="op_follow_sku_detail/findAllop_follow_sku_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>">
									${list.follow }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="关注店铺" data-index="0" 
								href="op_follow_shop_detail/findAllop_follow_shop_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>&&vdtype=1">
									${list.followshop }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="购物车" data-index="0" 
								href="op_cart_detail/findAllop_cart_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>&&vdtype=1">
									${list.cart }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="浏览量(pv)" data-index="0" 
								href="op_visit_detail/findAllop_visit_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>">
								${list.visitnum }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="访客数(ip)" data-index="0" 
								href="op_visit_detail/findAllop_visit_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>&&vdtype=1">
									${list.uv }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="访客数(cookie)" data-index="0" 
								href="op_visit_detail/findAllop_visit_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>&&vdtype=2">
									${list.cookie }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="访问用户数" data-index="0" 
								href="op_visit_detail/findAllop_visit_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>&&vdtype=3">
									${list.visitusernum }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="注册数" data-index="0" 
								href="op_register_detail/findAllop_register_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>">
									${list.registernum }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="购买数量" data-index="0" 
								href="op_purchase_detail/findAllop_purchase_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>">
								${list.purchasenum}
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="购买金额" data-index="0" 
								href="op_purchase_detail/findAllop_purchase_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>">
								${list.amount }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="支付金额" data-index="0" 
								href="op_purchase_detail/findAllop_purchase_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>
								&&paystatus=1">
								${list.payamount }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="订单数量" data-index="0" 
								href="op_purchase_detail/findAllop_purchase_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>
								&&paystatus=1">
								${list.ordernum }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="订单退货数量" data-index="0" 
								href="op_purchase_cancel_detail/findAllop_purchase_cancel_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>&&status=2">
								${list.returnordernum }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="订单退货数量" data-index="0" 
								href="op_purchase_cancel_detail/findAllop_purchase_cancel_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>&&status=1">
								${list.cancelordernum }
								</a>
							</td>
							<td>
								<a class="J_menuItem" data="订单退货数量" data-index="0" 
								href="op_purchase_cancel_detail/findAllop_purchase_cancel_detail.html?
								<c:if test="${searchData.rowFieldVO.isShowDate=='1'}">
									startDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
									&&endDate=<fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/>
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowDate!='1'}">
									startDate=${searchData.startDate}
									&&endDate=${searchData.endDate}
								</c:if>
								<c:if test="${searchData.rowFieldVO.isShowCounty==1 }">
									&&county=${list.county}
								</c:if>
								<c:if test="${searchData.webtype!=null && searchData.webtype!='' }">
									&&webtype=${searchData.webtype}
								</c:if>
								<c:if test="${(searchData.webtype==null || searchData.webtype=='') && searchData.rowFieldVO.isShowType==1}">
									&&webtype=${list.type}
								</c:if>&&status=3">
								${list.exchangeordernum }
								</a>
							</td>
							<td>
								${list.payordernum }
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
