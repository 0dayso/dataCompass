<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<div id="main" style="width: 100%;height:800px;"></div>

<div class="tab-pane active">
    <div class="full-height-scroll">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th >地区</th>
                    <th >浏览量(pv) </th>
                    <th >访客数(ip) </th>
                    <th >访客数(cookie) </th>
                    <th >访问用户数 </th>
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
    var pvs = [],ips=[],cookies=[],fws=[];
    //var legendData=['浏览量(pv)','访客数(ip)','访客数(cookie)','访问用户数'];
    var legendData=['访客数(cookie)'];
    var max=0;
    var _max=0;
    <c:forEach items="${op_datas}" var="list" >
    pvs.push({name: "${list.hour}",value: ${list.visitnum } });
    ips.push({name: "${list.hour}",value: ${list.uv } });
    cookies.push({name: "${list.hour}",value: ${list.cookie } });
    fws.push({name: "${list.hour}",value: ${list.visitusernum } });
    _max=${list.cookie };
    if(max<_max)
        max=_max;
    </c:forEach>
    var option = {
        title: {
            text: 'pc流量来源分析',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:legendData
        },
        visualMap: {
            min: 0,
            max: max,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            /* {
             name: '浏览量(pv)',
             type: 'map',
             mapType: 'china',
             roam: false,
             zoom:1.2,
             label: {
             normal: {
             show: true
             },
             emphasis: {
             show: true
             }
             },
             data:pvs
             },
             {
             name: '访客数(ip)',
             type: 'map',
             mapType: 'china',
             roam: false,
             zoom:1.2,
             label: {
             normal: {
             show: true
             },
             emphasis: {
             show: true
             }
             },
             data:ips
             },*/
            {
                name: '访客数(cookie)',
                type: 'map',
                mapType: 'china',
                roam: false,
                zoom:1.2,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:cookies
            }
            /*,{
             name: '访问用户数',
             type: 'map',
             mapType: 'china',
             roam: false,
             zoom:1.2,
             label: {
             normal: {
             show: true
             },
             emphasis: {
             show: true
             }
             },
             data:fws
             }*/
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>

