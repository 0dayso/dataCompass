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
						<c:if test="${page.t.rowFieldVO.isShowStatus==1 }">
							<th>下载类型</th>
						</c:if>
						<c:if test="${page.t.rowFieldVO.isShowCounty==1 }">
							<th>省市</th>
						</c:if>
						<th>下载次数</th>
					</tr>
					</thead>
					<tbody>
					<c:forEach items="${list}" var="list" >
						<tr>
							<c:if test="${page.t.rowFieldVO.isShowDate==1 }">
								<td><fmt:formatDate value="${list.ctime }" pattern="yyyy-MM-dd"/></td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowStatus==1 }">
								<td>
									<c:if test="${list.status==1 }">
										商城
									</c:if>
									<c:if test="${list.status==2 }">
										玩嘛
									</c:if>
								</td>
							</c:if>
							<c:if test="${page.t.rowFieldVO.isShowCounty==1 }">
								<td>
									${list.county }
								</td>
							</c:if>
							
							<td>
								${list.count }
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

