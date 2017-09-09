<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<div class="input-group">
    <div class="col-md-30">
        <strong>流量 </strong>
        浏览量(pv)       <strong>${op_data.visitnum}</strong>
        访客数(ip)     <strong>${op_data.uv}</strong>
        访客数(cookie) <strong>${op_data.cookie}</strong>
        访问用户数     <strong>${op_data.visitusernum}</strong>
        注册数         <strong>${op_data.registernum}</strong>
    </div>

</div>
<div id="main" style="width: 100%;height:600px;"></div>

<div class="tab-pane active">
    <div class="full-height-scroll">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
					<th >时间</th>
                    <th >浏览量(pv) </th>
                    <th >访客数(ip)</th>
                    <th >访客数(cookie)</th>
                    <th >访问用户数</th>
                    <th >注册数</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${op_datas}" var="list" >
                    <tr>
						<td>
								   ${list.hour}
						</td>
                        <td>
                                    ${list.visitnum }
                        </td>
                        <td>
                                    ${list.uv }
                        </td>
                        <td>
                                ${list.cookie }
                        </td>
                        <td>
                                    ${list.visitusernum }
                        </td>
                        <td>
                                    ${list.registernum }
                        </td>
                    </tr>
                </c:forEach>

                </tbody>
            </table>
        </div>
    </div>


</div>
<script>
    //基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    var dates = [];
    var legendData=['浏览量(pv)','访客数(ip)','访客数(cookie)','访问用户数','注册数'];
    var fwl = [],fks = [],fwyhs = [],zcl = [],cookies=[];
    <c:forEach items="${op_datas}" var="list" >
      dates.push("${list.hour}");
      fwl.push(${list.visitnum });
      fks.push(${list.uv });
      cookies.push(${list.cookie});
      fwyhs.push(${list.visitusernum });
      zcl.push(${list.registernum });
    </c:forEach>

    var option = {
        title: {
            text: '无线流量概况'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'浏览量(pv)',
                type:'line',
                data:fwl,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                }
                ,
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'访客数(ip)',
                type:'line',
                data:fks,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
            ,
            {
                name:'访客数(cookie)',
                type:'line',
                data:cookies,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
            ,
            {
                name:'访问用户数',
                type:'line',
                data:fwyhs
            }
            ,
            {
                name:'注册数',
                type:'line',
                data:zcl
            }
        ]
    };



    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>

