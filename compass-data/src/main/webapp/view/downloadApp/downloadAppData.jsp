<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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

<title>户外门户 -</title>

<link href="static/css/bootstrap.min.css" rel="stylesheet">
<link href="static/css/font-awesome.min.css" rel="stylesheet">
<link href="static/css/layerdate/layerdate.css" rel="stylesheet" />
<!-- iCheck -->
<link href="static/css/plugins/iCheck/custom.css" rel="stylesheet">
<link href="static/css/animate.min.css" rel="stylesheet">
<link href="static/css/style.min.css" rel="stylesheet">
<link href="static/css/page.css" rel="stylesheet">


<style type="text/css">
.b {
	color: red;
}

strong {
	font-size: 20px;
}

.laydate_box {
	box-sizing: content-box !important;
	-moz-box-sizing: content-box !important; /* Firefox */
	-webkit-box-sizing: content-box !important; /* Safari */
}

.laydate_box div {
	box-sizing: content-box !important;
	-moz-box-sizing: content-box !important; /* Firefox */
	-webkit-box-sizing: content-box !important; /* Safari */
}
</style>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content  animated fadeInRight">
		<div class="row">
			<div id="user-box" class="col-sm-12">
				<div class="ibox">
					<form id="data" method="post">
						<div class="ibox-content">
							<h2>APP下载统计</h2>
							<div class="input-group">
								<div class="col-md-6">
									<input type="text" placeholder="查询日期" id="startDate" name="startDate" value="${startDate }" readonly
										class="input form-control">
								</div>
								
								<div>
									<table class="table">
										<tr>
											<td>统计显示列<font color="red">*</font></td>

											<td>
												<label class="checkbox-inline">
													<input type="checkbox" name="searchData.rowFields" value="1" checked="checked" />日期
												</label>
												<label class="checkbox-inline">
													<input type="checkbox" name="searchData.rowFields" value="9" />下载类型
												</label>
												<label class="checkbox-inline">
													<input type="checkbox" name="searchData.rowFields" value="7" />省市
												</label>
											</td>
										</tr>
									</table>
								</div>
								
								<div class="col-md-3">
									<button type="button" class="btn btn-success"
										onclick="searchList();">
										<i class="fa fa-search"></i> 搜索
									</button>
								</div>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="tab-content" id="dataList">
								<font color="red">暂无数据</font>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- 全局js -->
	<script src="static/js/jquery-2.1.1.min.js"></script>
	<script src="static/js/bootstrap.min.js"></script>
	<script src="static/js/plugins/layer/layer.min.js"></script>
	<script src="static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
	<script src="static/js/plugins/layer/laydate/laydate.js"></script>
	
	<!-- iCheck -->
	<script src="static/js/plugins/iCheck/icheck.min.js"></script>
	
	<!-- 分页 -->
	<script src="static/js/plugins/layer/laypage/laypage.js"></script>
	
	<script>
		$(function(){
			var start = {
				elem : '#startDate',
				format : 'YYYY-MM-DD',
				istoday : false,
				min:'2016-12-01',
				choose : function(datas) {
					end.min = datas; //开始日选好后，重置结束日的最小日期
					end.start = datas //将结束日的初始值设定为开始日
				}
			};
			laydate(start);
		})
	
		var channelId = "",
		channelurl = "",
		url = "",
		page = "";
		
		function searchList(urlStr) {
			if(urlStr=="" || urlStr==null){
				url = "";
				page = 1;
				var chk_value = "";
				$('input[name="searchData.rowFields"]:checked').each(function() {
					chk_value += $(this).val();
					chk_value += ",";
				});
				if (chk_value == "") {
					layer.alert("请至少选择一项统计列", {
						icon : 0
					});
					return false;
				}
				layer.load(0, {
					shade : 0.3
				});
				url = "downloadApp/findAllDownloadAppData.html"+"?"+$("#data").serialize()+"&&rowFieldString="+chk_value;
			}
			jQuery.post(url+"&&page="+page, function(response) {
				layer.closeAll('loading');
				if (response == "-1") {
					layer.alert("后台错误，请联系管理员", {
						icon : 0
					});
				} else {
					jQuery("#dataList").html(jQuery.trim(response));

				}
			});

		}
	</script>


</body>


</html>