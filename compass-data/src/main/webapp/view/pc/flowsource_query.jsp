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
    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/font-awesome.min.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="static/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="static/css/animate.min.css" rel="stylesheet">
    <link href="static/css/style.min.css" rel="stylesheet">
    <link href="static/css/page.css" rel="stylesheet">
    <link href="static/css/layerdate/layerdate.css" rel="stylesheet" />

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
                <form id="travels" method="post">
                    <div class="ibox-content">
                        <h2>流量来源分析</h2>
                        <div class="input-group">
                            <div class="col-md-3">
                                <input type="text" placeholder="开始日期" id="startDate" value="${startDate }" readonly
                                       class="input form-control">
                            </div>

                            <div class="col-md-3">
                                <input type="text" placeholder="结束日期" id="endDate" value="${endDate}" readonly
                                       class="input form-control">
                            </div>

                            <div class="col-md-3">
                                <button type="button" class="btn btn-success">
                                    <i class="fa fa-search"></i> 搜索
                                </button>
                            </div>
                        </div>

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
<script type="text/javascript" src="static/js/plugins/echarts/echarts.js"></script>
<script type="text/javascript" src="static/js/plugins/echarts/china.js"></script>
<script type="text/javascript" src="/static/js/plugins/echarts/dark.js"></script>

<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/plugins/layer/layer.min.js"></script>
<script src="static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="static/js/plugins/layer/laydate/laydate.js"></script>

<script>
    $(function(){
        var start = {
            elem : '#startDate',
            format : 'YYYY-MM-DD',
            istoday : false,
            min:'2016-11-01',
            choose : function(datas) {
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        };
        var end = {
            elem : '#endDate',
            format : 'YYYY-MM-DD',
            min : laydate.now(),

            istoday : false,
            choose : function(datas) {
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };
        laydate(start);
        laydate(end);

        //设置本页layer皮肤
        layer.config({
            skin : 'layui-layer-molv',
        });
       $(".btn-success").click(searchList);
    });

    searchList();

    function searchList() {
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

        layer.load(0, {
            shade : 0.3
        });
        var url = "pc_main_flow/data_flowsource_main_flow";
        jQuery.post(url, {
            "startDate" : startDate,
            "endDate" : endDate
        }, function(response) {
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