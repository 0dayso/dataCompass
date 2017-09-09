var config = {
		DatePicker: {
			Enable: true,
			Rapid: [true,true],   //true
 			Type: "single",        //single
 			View: "!week",
 			Pattern: 1,
 			Calendar:false,
			Range: 30,
			rapidSel: {      //如果快查功能启动，则配置快查规则
	            item:{
					"近3天": 3,
	                "近7天": 7,     //0-组件计算日期
	                "近15天": 15,
	                "本周": 1,
	                "上周": 2,
	                "本月": 0,
	                "上月": 0
	            },
	            external: true     //是否外置
	        },
			DateSeg: ["dailyDate"]      //["StartDate","EndDate"]				
		},
		Menu: {
			Id: "3-4"
		}
};


/*
 * 函数：ready
 * 功能: 页面加载时,自动查询前一天流量数据.
 **/
$(document).ready(function() {
	B$.init(config);
	//页面加载时,自动查询.
	sendRequest(3,'近3天');
	
	//加载通知
	loadModuleNotice(config.Menu.Id);
	
	//load systemnotice
	loadSystemNotice();
});

var last_row_value=-1; //保存最后一行数据的值,作“x次及以上”特殊处理时用

/*
 * 函数：sendRequest
 * 功能: 发送查询请求,初始查询和快速查询皆使用此函数进行查询.
 **/
function sendRequest(quickEnum,title){
	showLoadingV2(5);//数据加载完毕之前显示遮罩
	var date = $('#dailyDate').val();
	if(date==11){//本月
		$('#dailyDate').val(getMonthStr(0));
	}else if(date==12){//上月
		$('#dailyDate').val(getMonthStr(-1));
	}
	var params = $("#viewFrequency_form").serialize(); //向Action传递快速查询的类型枚举(近3天|近7天|本月|上月 等)
	
	query(context_path + "/dataModel/getViewFrequencyResult.action", params, showViewFrequency);
}

/*
 * 功能: 显示访问频次表格、图表
 * 
 * 参数：
 * result  json数据串
 **/
function showViewFrequency(result) {
	$.unblockUIV2(); //清除遮罩
	var jsonData = eval(result);
	var resultData =eval("("+jsonData.resultData+")"); 
	
	// 汇总指标信息展示
	//renderSumZBs(jsonData.allSumZBs,resultData,'div_allSumZBs',2,1,2);
	renderGrid('div_allSumZBs',{id: "Visit",name:"流量",gClass: "visits"},jsonData.allSumZBs, resultData.summary);
	
	//根据返回的详情指标,拼表格表头.
	var trs_tmp1="";
	trs_tmp1="<table cellpadding='0' cellspacing='0' border='0' class='display' id='table_viewsource'>";
	trs_tmp1 += "<thead>";
	trs_tmp1 += "<tr>";
	if(jsonData!=null && jsonData.allDetailZBs!=null){
		for(i in jsonData.allDetailZBs){ //拼表头
			//B$.T.alert( jsonViewSourceData.allDetailZBs[i].id ); //指标ID
			//B$.T.alert( jsonViewSourceData.allDetailZBs[i].value ); //指标名称
			trs_tmp1 += "<th>" + jsonData.allDetailZBs[i].value + "</th>";
		}
	}
	trs_tmp1 += "</thead>";	
	trs_tmp1 += "<tbody>";
	
	//拼表格数据行
	if(resultData!=null && resultData.detail!=null && resultData.detail.length>0){
		var n = eval(resultData.detail['length']);
		var arrayMax = resultData.detail.UPV.value[n-1]; //防止跳跃数据.
		var _arrayIndex=-1;
		var array_table = new Array(arrayMax); //array_table用于存储生成的表格行 "<tr>...</tr>"
		for(var x=0; x<arrayMax; x++){ //初始化表格,否则跳着赋值时出错.
			array_table[x]=' ';
		}
		
		//根据返回的detail中的数据行数,构造表格.
		for(var i=0; i<n; i++){
			var _trs_tmp1="";
			_trs_tmp1 += "<tr>";
			//显示与指标匹配的数据(判断当前数据对应的指标类型、处理显示格式)
			for(x in jsonData.allDetailZBs){
				var index = jsonData.allDetailZBs[x].id; //指标id
				var dataType = jsonData.allDetailZBs[x].dataType; //dataType 数据类型
				var decimal = jsonData.allDetailZBs[x].decimal; //decimal 小数位
				var strValue = resultData.detail[index].value[i]; //表格单元格中要显示的内容
				//处理整数、浮点、百分比型数的显示风格.
				if(dataType==0){ //整数
					//处理千分位逗号(加逗号 1,000.23)
					strValue=CommaFormatted( strValue );
				}else if(dataType==1){ //浮点数
					if(decimal && decimal>0){
						strValue = format_number(strValue,decimal); //四舍五入
					}
					//处理千分位逗号(加逗号 1,000.23)
					strValue=CommaFormatted( strValue );
				}else if(dataType==6){ //百分比数值
					var cellData = strValue;
					cellData = cellData * 100;
					//处理小数位
					if(decimal && decimal>0){
						cellData = format_number(cellData,decimal); //四舍五入
					}else{
						cellData= format_number(cellData.toString(),2); //四舍五入
					}
					cellData += "%";
					strValue=cellData;
				}
				//如果是最后一行并且是访问次数,则显示xx次以上
				//if(i==n-1 && index=='UPV'){
				//	strValue+='次以上';
				//}
				
				//根据数据类型，决定对齐方式
				//if(dataType==0 || dataType==1 || dataType==6){
				//	trs_tmp1 += "<td style='text-align:right;'>" + strValue + "</td>";
				//}else{
				//	trs_tmp1 += "<td>" + strValue + "</td>";
				//}
				
				//根据表头指标类型，决定对齐方式
				if(index=='UVRatio' || index=='UV'){
					_trs_tmp1 += "<td style='text-align:right;'>" + strValue + "</td>";
				}else if(index=='UPV'){ //访问次数
					_arrayIndex=strValue-1; //用访问次数，决定_trs_tmp1存储到数组array_table中的位置.(访问次数为1存储到下标0中)
					//if(strValue==998){ //处理访问次数998时，代表N次以上，不能作为下标用.
					//	_arrayIndex=n-1; //下标设置为元素最后一行.以存储“n次以上”
					//}
					//B$.T.alert('_arrayIndex: ' + _arrayIndex);
					
					if( i==n-1 ){ //如果是最后一行,则显示"4次及以上"
						//strValue = '4次及以上'; //不能修改strValue,因为下面要用到
						_trs_tmp1 += "<td>" + strValue + "次及以上" + "</td>";
						last_row_value = strValue; //记录最后一行的访问次数.
					}else{
						_trs_tmp1 += "<td>" + strValue + "</td>";
					}
				}
			}
			_trs_tmp1 += "</tr>";
			array_table[_arrayIndex]=_trs_tmp1;
		}
		//按顺序形成表格
		for(var _i=0; _i<arrayMax; _i++){
			trs_tmp1 += array_table[_i];
		}
		
		//合计行
		var totalUV = resultData.summary.TotalUV.value[0]; //总访客数
		totalUV = CommaFormatted(totalUV); //千分位
		var total_UVRatio = resultData.summary.UVRatio.value[0]; //总百分比
		trs_tmp1 += '<tr><td>合计</td><td style="text-align:right;">' + totalUV + '</td><td style="text-align:right;">' + format_number(total_UVRatio*100,2) + '%</td></tr>';
	}else{
		trs_tmp1 += '<tr><td colspan=3>暂无数据</td></tr>';
	}
	trs_tmp1 += '</table>';
	document.getElementById('div_table_viewFrequency').innerHTML = trs_tmp1;
	
	$('#table_viewsource').dataTable({
			"bFilter":false,
			"bPaginate":false,
			"bSort":false,
			"bInfo":false
			//"iDisplayLength":10
		}); 

	//展示图表
	showPieChart(result);
	//下面代码用于将表格转在dataTable，可实现排序、分页等功能.
}

// 图表展示函数
function showPieChart(json){
	var resultData =eval("("+json.resultData+")");
	var chart;
	var imageURL = context_path + "/images/platform/mainform/WatermarkSmall.png";
	if( !resultData || !resultData.detail || !resultData.detail.length ){
		makeChartWithoutData();//创建空图表
		return false;
	}
	
	//生成数组,创建图表用.
	var _length = resultData.detail.length;
	var obj_array = new Array(_length);
	for(var x=0; x<_length; x++){ //初始化表格,否则跳着赋值时出错.
		var obj = {'name':0,'y':0,'sliced':true,'data':2000};
		obj_array[x] = obj;
	}
	for(var x=0; x<_length; x++){ //初始化表格,否则跳着赋值时出错.
		obj_array[x].name = resultData.detail.UPV.value[x];
		obj_array[x].data = resultData.detail.UPV.value[x];
		obj_array[x].y = format_number(resultData.detail.UVRatio.value[x]*100,2)*1;
		obj_array[x].sliced = true;
		//设置图例显示时的文字
		//if(obj_array[x].name==4) obj_array[x].name='4次及以上';
		if(obj_array[x].name==last_row_value ){
			obj_array[x].name +='次及以上';
			//last_row_value=-1;
		}
	}
	
	//近x天
	//var _idx = document.getElementById('filter.rapidQueryValue').selectedIndex;
	//var _text = document.getElementById('filter.rapidQueryValue').options[_idx].text;
	//var _idx = document.getElementById('filter.rapidQueryValue').value;
	//var _text = arrayRapidQueryEnum[''+_idx];
	
	//创建图表
	Highcharts.setOptions({  //设置饼块颜色.
	    colors: ['#058DC7', '#EC561B', '#50B332', '#FFDE00'] 
	}); 	
	var imageURL = context_path + "/images/platform/mainform/WatermarkSmall.png";
	chart = new Highcharts.Chart({ 
        chart: {  //整体控制
            renderTo: 'viewFrequencyChart', //图表容器
            plotBackgroundImage : imageURL,
            plotBorderWidth:1,
            plotBorderColor:'#ffffff',
            defaultSeriesType: 'pie', //可选，默认为line【line:折线;spline:平滑的线;area:区域图;bar:曲线图;pie:饼图;scatter:点状图等等;
            marginRight: 10, //外边距控制 (上下左右空隙)
            marginBottom: 10 //外边距控制
        }, 
        exporting : {enabled:false},
        title: { 
            text: _text + ' 访问频次占比', //主标题
            x: -20,           //标题相对位置  默认居中
            style : {
			    color: '#656565',
			    font: 'bold 14px 微软雅黑'
			}
        },
        subtitle: {
	        text: '',//副标题
	        x: 60 //标题相对位置
        },
        tooltip: {        //数据点的提示框
            formatter: function () { 
                //return '<b>' + this.series.name + '</b><br/>' + this.point.name + ': ' + this.y;
        		//return '<b>' + this.series.name + '</b><br>访问' + this.point.name +'次:' + this.y + '%';
        	if(this.point.data==last_row_value)
        		return '访问' + this.point.data +'次及以上:' + this.y + '%';
        	else
        		return '访问' + this.point.data +'次:' + this.y + '%';
            }
        },
        credits: {
            enabled: true
        },
        plotOptions: {
			pie: {  //饼图
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: { 
					enabled: true, //false 不显示指示线
					color: '#000000',
					connectorColor: '#000000',
					formatter: function() {
			        	//return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
        				return this.y +' %';
        				//return '<b>'+ this.y +'%';
					}
				},
				showInLegend: true
			}//end-pie
		},
		 legend: {                  
            layout: 'vertical',  //水平（horizontal）/垂直（vertical）
            //backgroundColor: '#FFFFFF',
            borderColor: '#fff',
            //borderWidth: 1,
            align: 'center',
            verticalAlign: 'buttom',//默认为底部
            enabled:true,
            x: 210,
            y: 140,
            //floating: true,
            shadow: false,
/*            itemHoverStyle : {
            	color : "#3E576F",
				cursor : "default"
			},*/
             width : 60//,
            // itemWidth: 210
        },
		series: [{
			type: 'pie',
			name: '访问频次占比',
			data: obj_array
		}]
    });

    B$.globalAdd("Chart", chart, "viewFrequencyChart");
}

//访问超时和异常时调用该函数，向页面输出信息
function processTimeoutAndError(){
	//摘要数据 div_allSumZBs
	var trs_sumzbs="<ul><li class='liw1'>总访问次数:</li><li class='liw2'>无</li>  <li class='liw1'>总访客数:</li><li class='liw2'>无</li></ul>";
	document.getElementById('div_allSumZBs').innerHTML = trs_sumzbs;
	
	//表格
	var trs_tmp1="";
	trs_tmp1="<table cellpadding='0' cellspacing='0' border='0' class='display' id='table_viewsource'>";
	trs_tmp1 += "<thead>";
	trs_tmp1 += "<tr><th>访问次数</th><th>访客数</th><th>百分比</th></tr></thead>";
	trs_tmp1 += "<tbody><tr><td colspan=3>暂无数据</td></tr></tbody></table>";
	document.getElementById('div_table_viewFrequency').innerHTML = trs_tmp1;
	makeChartWithoutData();//创建空图表
}

//创建空图表
function makeChartWithoutData(title){
	var imageURL = context_path + "/images/platform/mainform/WatermarkSmall.png";
	//近x天
	//var _idx = document.getElementById('filter.rapidQueryValue').selectedIndex;
	//var _text = document.getElementById('filter.rapidQueryValue').options[_idx].text;
	//var _idx = document.getElementById('filter.rapidQueryValue').value;
	//var _text = arrayRapidQueryEnum[''+_idx];
	
	//创建一个空图表
	chart = new Highcharts.Chart({
        chart: {  //整体控制
            renderTo: 'viewFrequencyChart', //图表容器
            plotBackgroundImage : imageURL,
            plotBorderWidth:0,
            defaultSeriesType: 'pie', //可选，默认为line【line:折线;spline:平滑的线;area:区域图;bar:曲线图;pie:饼图;scatter:点状图等等;
            marginRight: 10, //外边距控制 (上下左右空隙)
            marginBottom: 10 //外边距控制
        }, 
        exporting : {enabled:false},
        title: { 
            text: _text + ' 访问频次占比', //主标题
            x: -20,           //标题相对位置  默认居中
	        style : {
			    color: '#656565',
			    font: 'bold 14px 微软雅黑'
			}        
        },
		series: [{
			type: 'pie',
			name: '访问频次占比',
			data: []
		}]
    });
    var chartDivId = "viewFrequencyChart";
    $("#"+chartDivId).css({"position": "relative"});
    $("#"+chartDivId).prepend("<div id='"+chartDivId+"NoData' class='noData'><span>暂无数据</span></div>");
    $("#"+chartDivId+"NoData").css({"left":$("#"+chartDivId).width()/2-$("#"+chartDivId+"NoData").width()/2,"top": $("#"+chartDivId).height()/2-$("#"+chartDivId+"NoData").height()/2});
    B$.globalAdd("Chart", chart, "viewFrequencyChart");
}