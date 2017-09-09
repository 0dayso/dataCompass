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
							<h2>sku统计</h2>
							<div class="input-group">

								<div class="col-md-3">
									<input type="text" placeholder="开始日期" id="startDate" name="startDate" value="${startDate }" readonly
										class="input form-control">
								</div>

								<div class="col-md-3">
									<input type="text" placeholder="结束日期" id="endDate" name="endDate" readonly
										class="input form-control">
								</div>

								<div class="col-md-3">
									<select class="form-control m-b" name="webtype">
										<option value="">请选择站来源</option>
										<option value="0">pc</option>
										<option value="1">m端</option>
										<option value="2">app</option>
										<option value="3">微信</option>
									</select>
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
													<input type="checkbox" name="searchData.rowFields" value="8" checked="checked" />sku
												</label>
												<label class="checkbox-inline">
													<input type="checkbox" name="searchData.rowFields" value="4" />店铺
												</label>
												<label class="checkbox-inline">
													<input type="checkbox" name="searchData.rowFields" value="5" />站来源
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
	
	<!-- iCheck -->
	<script src="static/js/plugins/iCheck/icheck.min.js"></script>
	<script src="static/js/plugins/layer/laydate/laydate.js"></script>
	<script src="view/statistics/js/search.js"></script>
	<!-- 分页 -->
	<script src="static/js/plugins/layer/laypage/laypage.js"></script>
	
	<script>
		var channelId = "",
		channelurl = "",
		url = "",
		page = "";
		
		function searchList(urlStr) {
			if(urlStr=="" || urlStr==null){
				url = "";
				page = 1;
				var startDate = $("#startDate").val();
				if (startDate == "") {
					layer.alert("开始日期必选", {
						icon : 0
					});
					return false;
				}
				var endDate = $("#endDate").val();
				
				if(startDate!="" && endDate!="") {
		            var date1 = startDate.split("-");
		            var date2 = endDate.split("-");
		            var myDate1 = new Date(date1[0],date1[1]-1,date1[2]);
		            var myDate2 = new Date(date2[0],date2[1]-1,date2[2]);
		            if (myDate1 <= myDate2) {
		                if(myDate1.getMonth()!=myDate2.getMonth()) {
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
				url = "op_sku_data/findAllSkuData.html"+"?"+$("#data").serialize()+"&&rowFieldString="+chk_value;
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