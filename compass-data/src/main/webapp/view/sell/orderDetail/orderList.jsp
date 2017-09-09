<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<div class="body_right">
    <div class="right_button scroll_x">
        <div class="button_top">
            <span>序号<i>|</i></span>
            <span>订单编号<i>|</i></span>
            <span>下单用户<i>|</i></span>
            <span>店铺名称<i>|</i></span>
            <span>商品编号<i>|</i></span>
            <span>商品名称<i>|</i></span>
            <span>商品价格<i>|</i></span>
            <span>下单商品件数<i>|</i></span>
            <!-- <span>优惠金额<i>|</i></span>
            <span>运费<i>|</i></span>
            <span>下单金额<i>|</i></span>
            <span>下单单量<i>|</i></span> -->
            <span>下单时间<i>|</i></span>
            <!-- <span>付款时间<i>|</i></span> -->
            <span>付款方式</span>
            <span>来源</span>
            <span>站来源</span>
            <span>活动ID</span>
        </div>
        <c:forEach items="${list }" var="item" varStatus="sta">
        	<c:if test="${fn:length(item.ordersku)==1 }">
        		<div class="button_top">
		            <span class="fontWhite">${sta.index+1 }</span>
		            <span class="fontWhite">${item.orderId}</span>
		            <span class="fontBule">${item.username}</span>
		            <span class="fontBule"><a style="color:#0b6099" target="_blank" href="http://www.seebong.com/ShopTemplate/Index.html?Sid=${item.shopId}">${item.sname}</a></span>
		            <span class="fontBule"><a style="color:#0b6099" target="_blank" href="http://www.seebong.com/Product/${item.sku}.html">${item.sku}</a></span>
		            <span class="fontBule"><a style="color:#0b6099" target="_blank" href="http://www.seebong.com/Product/${item.sku}.html" title="${item.pname }">${item.pname}</a></span>
		            <span class="fontWhite">${item.amount}</span>
		            <span class="fontWhite">${item.number }</span>
		            <span class="fontWhite"><fmt:formatDate value="${item.purchasetime }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
		            <span class="fontWhite">${item.status }</span>
		            <span class="fontWhite" title="${item.source }">${item.source }</span>
		            <span class="fontWhite">
		            	<c:if test="${item.type==0}">
							pc
						</c:if>
						<c:if test="${item.type==1}">
							m端
						</c:if>
						<c:if test="${item.type==2}">
							app
						</c:if>
						<c:if test="${item.type==3}">
							微信
						</c:if>
		            </span>
		            <span class="fontWhite">${item.activeId}</span>
		        </div>
        	</c:if>
        	<c:if test="${fn:length(item.ordersku)>1 }">
        		<div id="${item.orderId}" class="button_top">
		            <span class="fontWhite">${sta.index+1 }</span>
		            <span class="fontWhite">${item.orderId}</span>
		            <span class="fontBule"><span class="blue_radius"><i class="plus">+</i></span></span>
		            <span class="fontBule"></span>
		            <span class="fontWhite">${item.amount}</span>
		            <span class="fontWhite">${item.number }</span>
		            <span class="fontWhite"><fmt:formatDate value="${item.purchasetime }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
		            <span class="fontWhite">${item.status }</span>
		            <span class="fontWhite" title="${item.source }">${item.source }</span>
		            <span class="fontWhite">
		            	<c:if test="${item.type==0}">
							pc
						</c:if>
						<c:if test="${item.type==1}">
							m端
						</c:if>
						<c:if test="${item.type==2}">
							app
						</c:if>
						<c:if test="${item.type==3}">
							微信
						</c:if>
		            </span>
		            <span class="fontWhite">${item.activeId}</span>
		        </div>
	        	<c:forEach items="${item.ordersku }" var="sku">
	        		<div data="${sku.orderId}" style="display: none;">
	        			<div class="button_top">
				            <span class="fontWhite"></span>
				            <span class="fontWhite"></span>
				            <span class="fontBule"><a style="color:#0b6099" target="_blank" href="http://www.seebong.com/ShopTemplate/Index.html?Sid=${sku.shopId}.html">${sku.shopId}</a></span>
				            <span class="fontBule"><a style="color:#0b6099" target="_blank" href="http://www.seebong.com/Product/${sku.sku}.html">${sku.sku}</a></span>
				            <span class="fontWhite">${sku.amount}</span>
				            <span class="fontWhite">${sku.number }</span>
				            <span class="fontWhite"><fmt:formatDate value="${sku.purchasetime }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
				            <span class="fontWhite">${sku.status }</span>
				            <span class="fontWhite" title="${sku.source }">${sku.source }</span>
				            <span class="fontWhite">
				            	<c:if test="${sku.type==0}">
									pc
								</c:if>
								<c:if test="${sku.type==1}">
									m端
								</c:if>
								<c:if test="${sku.type==2}">
									app
								</c:if>
								<c:if test="${sku.type==3}">
									微信
								</c:if>
				            </span>
				            <span class="fontWhite">${sku.activeId}</span>
				        </div>
	        		</div>
	        	</c:forEach>
	        </c:if>
        </c:forEach>
        
    </div>
</div>

<script src="static/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript">
	var totalPage = "${page.totalPage}";
	var currentPage = "${page.currentPage}";
	
	$(function(){
		$("span.blue_radius").on("click",function(){
			var $this = $(this);
			var orderId = $this.parent().parent();
			var ordersku = orderId.parent().find("div[data='"+orderId.attr("id")+"']");
			
			if(ordersku.css("display") == "none"){
				orderId.parent().find("div[data='"+orderId.attr("id")+"']").slideDown();
				$this.find("i").css("left","6px");
				$this.find("i").html("–");
			}else{
				orderId.parent().find("div[data='"+orderId.attr("id")+"']").slideUp();
				$this.find("i").css("left","4px");
				$this.find("i").html("+");
			}
		})
		
		//显示分页
		laypage({
			cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
			pages: totalPage, //通过后台拿到的总页数
			curr: currentPage, //当前页
			skin: '#555',
			jump: function(obj, first){ //触发分页后的回调
				if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					page = obj.curr;
					updateOrder();
				}
			}
		});
	})
</script>
