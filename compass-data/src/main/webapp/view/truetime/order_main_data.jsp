<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<c:if test="${empty  op_datas}">
    <font color="red">暂无数据</font>
</c:if>
<c:if test="${not empty  op_datas}">
<div class="tab-pane active">
    <div class="full-height-scroll">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
					<th >商品名称</th>
                    <th >下单金额 </th>
                    <th >下单商品件数</th>
                    <th >下单客户数</th>
                    <th >浏览量</th>
                    <th >访客数</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${op_datas}" var="list" >
                    <tr>
						<td>
								   ${list.productname}
						</td>
                        <td>
                                    ${list.payamount }
                        </td>
                        <td>
                                    ${list.purchasenum }
                        </td>
                        <td>
                                    ${list.registernum }
                        </td>
                        <td>
                                      ${list.visitnum }
                        </td>
                        <td>
                                      ${list.cookie }
                        </td>


                    </tr>
                </c:forEach>

                </tbody>
            </table>
        </div>
    </div>


</div>
</c:if>
