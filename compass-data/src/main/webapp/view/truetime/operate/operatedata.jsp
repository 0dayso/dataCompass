<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

		<div class="right_one">
			<div class="right_one_left">
				<span class="ROL_font">流量</span>
			</div>
			<div class="RO_left_2">
				<div class="RO_left_1_top">
					<span class="page_view">浏览量(pv)</span> <span class="page_number">${now.visitnum }</span>
				</div>
				<div class="RO_left_1_middle">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">${yesterdayNow.visitnum }</span>
						<c:if test="${yesterdayNow.visitnum!=0 }">
							<c:if test="${now.visitnum < yesterdayNow.visitnum }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterdayNow.visitnum-now.visitnum)/yesterdayNow.visitnum }" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.visitnum == yesterdayNow.visitnum }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.visitnum > yesterdayNow.visitnum }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.visitnum-yesterdayNow.visitnum)/yesterdayNow.visitnum}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterdayNow.visitnum==0 }">
							<c:if test="${now.visitnum!=0 }">
								<span class="yesterday_percentage">${now.visitnum}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.visitnum==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">${yesterday.visitnum }</span>
						<c:if test="${yesterday.visitnum!=0 }">
							<c:if test="${now.visitnum < yesterday.visitnum }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterday.visitnum-now.visitnum)/yesterday.visitnum }" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.visitnum == yesterday.visitnum }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.visitnum > yesterday.visitnum }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.visitnum-yesterday.visitnum)/yesterday.visitnum}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterday.visitnum==0 }">
							<c:if test="${now.visitnum!=0 }">
								<span class="yesterday_percentage">${now.visitnum}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.visitnum==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
			<div class="RO_left_2">
				<div class="RO_left_1_top">
					<span class="page_view">访客数（ip）</span> <span class="page_number">${now.uv}</span>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 24px;">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">${yesterdayNow.uv }</span>
						<c:if test="${yesterdayNow.uv!=0 }">
							<c:if test="${now.uv < yesterdayNow.uv }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterdayNow.uv-now.uv)/yesterdayNow.uv}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.uv == yesterdayNow.uv }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.uv > yesterdayNow.uv }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.uv-yesterdayNow.uv)/yesterdayNow.uv}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterdayNow.uv==0 }">
							<c:if test="${now.uv!=0 }">
								<span class="yesterday_percentage">${now.uv}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.uv==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">${yesterday.uv }</span>
						<c:if test="${yesterday.uv!=0 }">
							<c:if test="${now.uv < yesterday.uv }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterday.uv-now.uv)/yesterday.uv}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.uv == yesterday.uv }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.uv > yesterday.uv }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.uv-yesterday.uv)/yesterday.uv}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterday.uv==0 }">
							<c:if test="${now.uv!=0 }">
								<span class="yesterday_percentage">${now.uv}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.uv==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
			<div class="RO_left_2">
				<div class="RO_left_1_top">
					<span class="page_view">访客数（cookie）</span> <span class="page_number">${now.cookie}</span>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 24px;">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">${yesterdayNow.cookie }</span>
						<c:if test="${yesterdayNow.cookie!=0 }">
							<c:if test="${now.cookie < yesterdayNow.cookie }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterdayNow.cookie-now.cookie)/yesterdayNow.cookie}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.cookie == yesterdayNow.cookie }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.cookie > yesterdayNow.cookie }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.cookie-yesterdayNow.cookie)/yesterdayNow.cookie}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterdayNow.cookie==0 }">
							<c:if test="${now.cookie!=0 }">
								<span class="yesterday_percentage">${now.cookie}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.cookie==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">${yesterday.cookie }</span>
						<c:if test="${yesterday.cookie!=0 }">
							<c:if test="${now.cookie < yesterday.cookie }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterday.cookie-now.cookie)/yesterday.cookie}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.cookie == yesterday.cookie }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.cookie > yesterday.cookie }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.cookie-yesterday.cookie)/yesterday.cookie}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterday.cookie==0 }">
							<c:if test="${now.cookie!=0 }">
								<span class="yesterday_percentage">${now.cookie}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.cookie==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
			<div class="RO_left_2">
				<div class="RO_left_1_top">
					<span class="page_view">访问用户数</span> <span class="page_number">${now.visitusernum}</span>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 24px;">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">${yesterdayNow.visitusernum }</span>
						<c:if test="${yesterdayNow.visitusernum!=0 }">
							<c:if test="${now.visitusernum < yesterdayNow.visitusernum }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterdayNow.visitusernum-now.visitusernum)/yesterdayNow.visitusernum}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.visitusernum == yesterdayNow.visitusernum }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.visitusernum > yesterdayNow.visitusernum }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.visitusernum-yesterdayNow.visitusernum)/yesterdayNow.visitusernum}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterdayNow.visitusernum==0 }">
							<c:if test="${now.visitusernum!=0 }">
								<span class="yesterday_percentage">${now.visitusernum}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.visitusernum==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">${yesterday.visitusernum }</span>
						<c:if test="${yesterday.visitusernum!=0 }">
							<c:if test="${now.visitusernum < yesterday.visitusernum }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterday.visitusernum-now.visitusernum)/yesterday.visitusernum}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.visitusernum == yesterday.visitusernum }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.visitusernum > yesterday.visitusernum }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.visitusernum-yesterday.visitusernum)/yesterday.visitusernum}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterday.visitusernum==0 }">
							<c:if test="${now.visitusernum!=0 }">
								<span class="yesterday_percentage">${now.visitusernum}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.visitusernum==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
		</div>

		<div class="right_one" style="margin-top: 0.5%;">
			<div class="right_one_left">
				<span class="ROL_font">销量</span>
			</div>
			<div class="RO_left_1">
				<div class="RO_left_1_top">
					<span class="page_view">下单单量</span>
					<span class="page_number" style="color: #ff8a01">${now.ordernum }</span>
				</div>
				<div class="RO_left_1_middle">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">${yesterdayNow.ordernum }</span>
						<c:if test="${yesterdayNow.ordernum!=0 }">
							<c:if test="${now.ordernum < yesterdayNow.ordernum }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterdayNow.ordernum-now.ordernum)/yesterdayNow.ordernum}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.ordernum == yesterdayNow.ordernum }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.ordernum > yesterdayNow.ordernum }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.ordernum-yesterdayNow.ordernum)/yesterdayNow.ordernum}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterdayNow.ordernum==0 }">
							<c:if test="${now.ordernum!=0 }">
								<span class="yesterday_percentage">${now.ordernum}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.ordernum==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">${yesterday.ordernum }</span>
						<c:if test="${yesterday.ordernum!=0 }">
							<c:if test="${now.ordernum < yesterday.ordernum }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterday.ordernum-now.ordernum)/yesterday.ordernum}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.ordernum == yesterday.ordernum }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.ordernum > yesterday.ordernum }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.ordernum-yesterday.ordernum)/yesterday.ordernum}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterday.ordernum==0 }">
							<c:if test="${now.ordernum!=0 }">
								<span class="yesterday_percentage">${now.ordernum}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.ordernum==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
			<div class="RO_left_1">
				<div class="RO_left_1_top">
					<span class="page_view">下单金额</span>
					<span class="page_number" style="color: #ff8a01">${now.amount }</span>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">${yesterdayNow.amount }</span>
						<c:if test="${yesterdayNow.amount!=0 }">
							<c:if test="${now.amount < yesterdayNow.amount }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterdayNow.amount-now.amount)/yesterdayNow.amount}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.amount == yesterdayNow.amount }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.amount > yesterdayNow.amount }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.amount-yesterdayNow.amount)/yesterdayNow.amount}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterdayNow.amount==0 }">
							<c:if test="${now.amount!=0 }">
								<span class="yesterday_percentage">${now.amount}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.amount==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">${yesterday.amount }</span>
						<c:if test="${yesterday.amount!=0 }">
							<c:if test="${now.amount < yesterday.amount }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterday.amount-now.amount)/yesterday.amount}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.amount == yesterday.amount }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.amount > yesterday.amount }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.amount-yesterday.amount)/yesterday.amount}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterday.amount==0 }">
							<c:if test="${now.amount!=0 }">
								<span class="yesterday_percentage">${now.amount}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.amount==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
			<div class="RO_left_1">
				<div class="RO_left_1_top">
					<span class="page_view">下单商品件数</span>
					<span class="page_number">${now.purchasenum }</span>
				</div>
				<div class="RO_left_1_middle">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">${yesterdayNow.purchasenum }</span>
						<c:if test="${yesterdayNow.purchasenum!=0 }">
							<c:if test="${now.purchasenum < yesterdayNow.purchasenum }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterdayNow.purchasenum-now.purchasenum)/yesterdayNow.purchasenum}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.purchasenum == yesterdayNow.purchasenum }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.purchasenum > yesterdayNow.purchasenum }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.purchasenum-yesterdayNow.purchasenum)/yesterdayNow.purchasenum}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterdayNow.purchasenum==0 }">
							<c:if test="${now.purchasenum!=0 }">
								<span class="yesterday_percentage">${now.purchasenum}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.purchasenum==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">${yesterday.purchasenum }</span>
						<c:if test="${yesterday.purchasenum!=0 }">
							<c:if test="${now.purchasenum < yesterday.purchasenum }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterday.purchasenum-now.purchasenum)/yesterday.purchasenum}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.purchasenum == yesterday.purchasenum }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.purchasenum > yesterday.purchasenum }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.purchasenum-yesterday.purchasenum)/yesterday.purchasenum}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterday.purchasenum==0 }">
							<c:if test="${now.purchasenum!=0 }">
								<span class="yesterday_percentage">${now.purchasenum}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.purchasenum==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
		</div>

		<div class="right_one" style="margin-top: 0.5%;">
			<div class="right_one_left">
				<span class="ROL_font">成交</span>
			</div>
			<!-- <div class="RO_left_1">
				<div class="RO_left_1_top">
					<span class="page_view">成交单量</span> <span class="page_number"
						style="color: #ff8a01">CCC</span>
				</div>
				<div class="RO_left_1_middle">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">CCC</span> <span
							class="yesterday_percentage">50.00%<i class="icon_red"></i></span>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">CCC9</span> <span
							class="yesterday_percentage green">50.00%<i
							class="icon_red icon_green"></i></span>
					</div>
				</div>
			</div> -->
			<div class="RO_left_3">
				<div class="RO_left_1_top">
					<span class="page_view">成交金额</span> <span class="page_number"
						style="color: #ff8a01">${now.payamount }</span>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 24px;">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">${yesterdayNow.payamount }</span>
						<c:if test="${yesterdayNow.payamount!=0 }">
							<c:if test="${now.payamount < yesterdayNow.payamount }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterdayNow.payamount-now.payamount)/yesterdayNow.payamount}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.payamount == yesterdayNow.payamount }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.payamount > yesterdayNow.payamount }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.payamount-yesterdayNow.payamount)/yesterdayNow.payamount}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterdayNow.payamount==0 }">
							<c:if test="${now.payamount!=0 }">
								<span class="yesterday_percentage">${now.payamount}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.payamount==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">${yesterday.payamount }</span>
						<c:if test="${yesterday.payamount!=0 }">
							<c:if test="${now.payamount < yesterday.payamount }">
								<span class="yesterday_percentage green"><fmt:formatNumber value="${(yesterday.payamount-now.payamount)/yesterday.payamount}" type="percent"/><i class="icon_red icon_green"></i></span>
							</c:if>
							<c:if test="${now.payamount == yesterday.payamount }">
								<span>0%</span>
							</c:if>
							<c:if test="${now.payamount > yesterday.payamount }">
								<span class="yesterday_percentage"><fmt:formatNumber value="${(now.payamount-yesterday.payamount)/yesterday.payamount}" type="percent"/><i class="icon_red"></i></span>
							</c:if>
						</c:if>
						
						<c:if test="${yesterday.payamount==0 }">
							<c:if test="${now.payamount!=0 }">
								<span class="yesterday_percentage">${now.payamount}00%<i class="icon_red"></i></span>
							</c:if>
							<c:if test="${now.payamount==0 }">
								<span>0%</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
			<!-- <div class="RO_left_1">
				<div class="RO_left_1_top">
					<span class="page_view">成交商品件数</span> <span class="page_number">CCC</span>
				</div>
				<div class="RO_left_1_middle">
					<span class="yesterday">昨日${date}</span>
					<div class="float_R">
						<span class="yesterday">CCC</span> <span
							class="yesterday_percentage">50.00%<i class="icon_red"></i></span>
					</div>
				</div>
				<div class="RO_left_1_middle" style="margin-top: 8px;">
					<span class="yesterday verM">昨日全天</span>
					<div class="float_R">
						<span class="yesterday">CCC9</span> <span
							class="yesterday_percentage green">50.00%<i
							class="icon_red icon_green"></i></span>
					</div>
				</div>
			</div> -->
		</div>