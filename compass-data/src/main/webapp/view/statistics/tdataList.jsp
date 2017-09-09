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
							<th >日期</th>
						</c:if>
						<c:if test="${searchData.rowFieldVO.isShowChannel==1 }">
							<th >渠道</th>
						</c:if>
						<c:if test="${searchData.rowFieldVO.isShowChannelurl==1 }">
							<th >渠道链接</th>
						</c:if>
						<c:if test="${searchData.rowFieldVO.isShowType==1 }">
							<th >访问来源</th>
						</c:if>
						<th >浏览量(pv)</th>
						<th >访客数(ip)</th>
						<th >访客数(cookie)</th>
						<th >访问用户数</th>
						<th >注册数</th>
					</tr>
					</thead>
					<tbody>
					<c:forEach items="${op_data}" var="list" >
						<tr>
							<c:if test="${searchData.rowFields[0]=='1' }">
								<td><fmt:formatDate value="${list.cdate }" pattern="yyyy-MM-dd"/></td>
							</c:if>
							<c:if test="${searchData.rowFields[0]=='2'||searchData.rowFields[1]=='2' }">
							<td>
								${list.channel }
							</td>
							</c:if>
							<c:if test="${searchData.rowFields[0]=='3'||searchData.rowFields[1]=='3'||searchData.rowFields[2]=='3' }">
							<td>
								${list.channelurl }
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
								<c:if test="${searchData.channelId!=null && searchData.channelId!='' }">
									&&channelId=${searchData.channelId}
								</c:if>
								<c:if test="${(searchData.channelId==null || searchData.channelId=='') && searchData.rowFieldVO.isShowChannel==1 }">
									&&channelId=${list.channelid}
								</c:if>
								<c:if test="${searchData.channelurl!=null && searchData.channelurl!='' }">
									&&channelurl=${searchData.channelurl}
								</c:if>
								<c:if test="${(searchData.channelurl==null || searchData.channelurl=='') && searchData.rowFieldVO.isShowChannelurl==1}">
									&&channelurl=${list.channelurlid}
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
								<c:if test="${searchData.channelId!=null && searchData.channelId!='' }">
									&&channelId=${searchData.channelId}
								</c:if>
								<c:if test="${(searchData.channelId==null || searchData.channelId=='') && searchData.rowFieldVO.isShowChannel==1 }">
									&&channelId=${list.channelid}
								</c:if>
								<c:if test="${searchData.channelurl!=null && searchData.channelurl!='' }">
									&&channelurl=${searchData.channelurl}
								</c:if>
								<c:if test="${(searchData.channelurl==null || searchData.channelurl=='') && searchData.rowFieldVO.isShowChannelurl==1}">
									&&channelurl=${list.channelurlid}
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
								<c:if test="${searchData.channelId!=null && searchData.channelId!='' }">
									&&channelId=${searchData.channelId}
								</c:if>
								<c:if test="${(searchData.channelId==null || searchData.channelId=='') && searchData.rowFieldVO.isShowChannel==1 }">
									&&channelId=${list.channelid}
								</c:if>
								<c:if test="${searchData.channelurl!=null && searchData.channelurl!='' }">
									&&channelurl=${searchData.channelurl}
								</c:if>
								<c:if test="${(searchData.channelurl==null || searchData.channelurl=='') && searchData.rowFieldVO.isShowChannelurl==1}">
									&&channelurl=${list.channelurlid}
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
								<c:if test="${searchData.channelId!=null && searchData.channelId!='' }">
									&&channelId=${searchData.channelId}
								</c:if>
								<c:if test="${(searchData.channelId==null || searchData.channelId=='') && searchData.rowFieldVO.isShowChannel==1 }">
									&&channelId=${list.channelid}
								</c:if>
								<c:if test="${searchData.channelurl!=null && searchData.channelurl!='' }">
									&&channelurl=${searchData.channelurl}
								</c:if>
								<c:if test="${(searchData.channelurl==null || searchData.channelurl=='') && searchData.rowFieldVO.isShowChannelurl==1}">
									&&channelurl=${list.channelurlid}
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
								<c:if test="${searchData.channelId!=null && searchData.channelId!='' }">
									&&channelId=${searchData.channelId}
								</c:if>
								<c:if test="${(searchData.channelId==null || searchData.channelId=='') && searchData.rowFieldVO.isShowChannel==1 }">
									&&channelId=${list.channelid}
								</c:if>
								<c:if test="${searchData.channelurl!=null && searchData.channelurl!='' }">
									&&channelurl=${searchData.channelurl}
								</c:if>
								<c:if test="${(searchData.channelurl==null || searchData.channelurl=='') && searchData.rowFieldVO.isShowChannelurl==1}">
									&&channelurl=${list.channelurlid}
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
						</tr>
					</c:forEach>

					</tbody>
				</table>
			</div>
		</div>


	</div>
<script type="text/javascript" src="view/statistics/js//contabs.min.js"></script>