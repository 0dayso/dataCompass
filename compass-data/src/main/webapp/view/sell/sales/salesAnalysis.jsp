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

    <title>商品销量分析</title>

    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/font-awesome.min.css" rel="stylesheet">
    <link href="static/css/animate.min.css" rel="stylesheet">
    <link href="static/css/style.min.css" rel="stylesheet">
    <link href="static/css/page.css" rel="stylesheet">
    <!-- 修正layerdate样式错乱 -->
	<link href="static/css/layerdate/layerdate.css" rel="stylesheet" />
    <!-- 全局js -->
    <script src="static/js/jquery-2.1.1.min.js"></script>

</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div id="user-box" class="col-sm-12">
                <div class="ibox">
                <form id="travels" action="sales/analysis.html" method="post" onsubmit="return check()">
                    <div class="ibox-content">
                        <h2>商品销量分析</h2>
                        <div class="col-sm-12 input-group">
	                         <div class="col-md-2">
	                            <div class="input-group date">
	                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
	                                <input type="text" class="form-control" id="startDate" name="startDate" value="${sales.startDate }">
	                            </div>
	                        </div>
	                         <div class="col-md-2">
	                            <div class="input-group date">
	                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
	                                <input type="text" class="form-control" id="endDate" name="endDate" value="${sales.endDate }">
	                            </div>
	                        </div>
                        	<div class="col-md-2">
                               <select name="type" class="form-control m-b" >
                                    <option value="" >全部</option>
                                    <option value="0" <c:if test="${sales.type == 0 }">selected="selected"</c:if> >PC端</option>
                                    <option value="1" <c:if test="${sales.type == 1 }">selected="selected"</c:if> >M端</option>
                                    <option value="2" <c:if test="${sales.type == 2 }">selected="selected"</c:if>>APP</option>
                                    <option value="3" <c:if test="${sales.type == 3 }">selected="selected"</c:if>>微信</option>
                                </select>
                            </div> 
                            <div class="col-sm-2">
                                       <button type="submit" class="btn btn btn-primary"> <i class="fa fa-search"></i> 查询</button>
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
					                                    <th>浏览量</th>
					                                    <th>访客数</th>  
					                                    <th>下单量</th>  
					                                    <th>下单金额</th> 
					                                </tr>
					                            </thead>
                                                <tbody>
                                                	<tr>
                                                        <td>
                                                        	${salesAnalysis.visit_number }
                                                        </td> 
                                                        <td>
                                                        	 ${salesAnalysis.cookie_number } 
                                                        </td>
                                                        <td>
                                                        	 ${salesAnalysis.order_numbber } 
                                                        </td>
                                                        <td>
                                                        	 ${salesAnalysis.order_amount } 
                                                        </td>
                                                    </tr>
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
    <script type="text/javascript" src="static/js/plugins/layer/laydate/laydate.js"></script>
    <script>
    	var obj;
        $(function () {
            $(".full-height-scroll").slimScroll({
                height: "100%"
            });
            
            //设置本页layer皮肤
            layer.config({
            	skin:'layui-layer-molv',
            });
            
            laydate.skin('huanglv');
            var start = {
            		elem : '#startDate',
            		min:'2016-11-01',
            		format : 'YYYY-MM-DD',
            		istoday : false,
            		max : laydate.now(),
            		choose : function(datas) {
            			end.min = datas; //开始日选好后，重置结束日的最小日期
            		}
            	};
            	var end = {
            		elem : '#endDate',
            		format : 'YYYY-MM-DD',
            		max : laydate.now(),
            		istoday : false,
            		choose : function(datas) {
            			start.max = datas; //结束日选好后，重置开始日的最大日期
            		}
            	};
            	laydate(start);
            	laydate(end);
			
        });
        
       	var check = function(){
    		var startDate = $("#startDate").val();
    		var endDate = $("#endDate").val();
    		if(startDate!="" && endDate!="") {
                var date1 = startDate.split("-");
                var date2 = endDate.split("-");
                var myDate1 = new Date(date1[0],date1[1]-1,date1[2]);
                var myDate2 = new Date(date2[0],date2[1]-1,date2[2]);
                if (myDate1 <= myDate2) {
                    if(date1[0] != date2[0] || date1[1]!=date2[1]) {
                        layer.alert("只能查询一个月的数据", {
                            icon : 0
                        });
                        return false;
                    }
                } else {
                    layer.alert("开始时间不能大于结束时间", {
                        icon : 0
                    });
                    return false;
                }
            }
    		
    		return true;

    	};    


        
    </script>


</body>


</html>