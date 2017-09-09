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
						<c:if test="${page.t.rowFieldVO.isShowSku==1 }">
							<th>sku</th>
							<th>商品名称</th>
						</c:if>
						<c:if test="${page.t.rowFieldVO.isShowCounty==1 }">
							<th>省市</th>
						</c:if>
						<th>来源</th>
						<th>打开次数</th>
						<th>填写人数</th>
						<th>转发次数</th>
						<th>点击商品次数</th>
					</tr>
					</thead>
					<tbody>
					<c:forEach items="${list}" var="list" >
						<tr>
							<c:if test="${page.t.rowFieldVO.isShowDate==1 }">
								<td><fmt:formatDate value="${list.ctime }" pattern="yyyy-MM-dd"/></td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowSku==1 }">
								<td>
									<a target="_blank" href="http://www.seebong.com/Product/${list.sku}.html">${list.sku }</a>
								</td>
								<td>
									<a target="_blank" href="http://www.seebong.com/Product/${list.sku}.html">${list.productName }</a>
								</td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowCounty==1 }">
								<td>
									${list.county }
								</td>
							</c:if>
							
							<td>
								${list.source }
							</td>
							<td>
								${list.opencount }
							</td>
							<td>
								${list.writecount }
							</td>
							<td>
								${list.transpond }
							</td>
							<td>
								${list.clickcount }
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

