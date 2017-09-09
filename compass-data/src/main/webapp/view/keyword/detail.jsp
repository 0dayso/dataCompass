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

    <title>搜索关键字明细</title>

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
                <form id="travels" action="keyword/detail.html" method="post" >
                    <div class="ibox-content">
                        <h2>搜索关键字明细</h2>
                        <div class="col-sm-12 input-group">
	                         <div class="col-md-2">
	                            <div class="input-group date">
	                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
	                                <input type="text" class="form-control" id="startDate" name="startDate" value="${k.startDate }">
	                            </div>
	                        </div>
                        	<div class="col-md-2">
                               <input type="text" placeholder="关键字" name="keyword" value='${k.keyword }' class="input form-control">
                            </div>
                        	<div class="col-md-2">
                               <select name="type" class="form-control m-b" >
                                    <option value="" >全部</option>
                                    <option value="0" <c:if test="${k.type == 0 }">selected="selected"</c:if> >PC端</option>
                                    <option value="1" <c:if test="${k.type == 1 }">selected="selected"</c:if> >M端</option>
                                    <option value="2" <c:if test="${k.type == 2 }">selected="selected"</c:if>>APP</option>
                                    <option value="3" <c:if test="${k.type == 3 }">selected="selected"</c:if>>微信</option>
                                </select>
                            </div> 
                            <div class="col-sm-2">
                                       <button type="submit" class="btn btn btn-primary"> <i class="fa fa-search"></i> 搜索</button>
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
					                                    <th>关键字</th>
					                                    <th>ip</th> 
					                                    <th>搜索时间</th> 
					                                </tr>
					                            </thead>
                                                <tbody>
                                                	<c:forEach items="${keywordList }" var="keyword" >
                                                	<tr>
                                                        <td>
                                                        	<a data-toggle="tab" class="client-link">${keyword.keyword }</a>
                                                        </td>  
                                                        <td>
                                                        	${keyword.ip }
                                                        </td> 
                                                        <td>
                                                        	 ${keyword.statistics_time } 
                                                        </td>
                                                    </tr>
                                                	</c:forEach>
                                                    
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
            laydate({
                elem: '#startDate',
        		max : laydate.now(),
        		min:'2016-11-01',
                format: 'YYYY-MM-DD'
            });
 		 
			
        });
        
        


        
    </script>


</body>


</html>