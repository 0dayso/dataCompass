var params;
var config = {
		Menu: {			
			Id: "3-1"
		},
		DatePicker: {
			Enable: true,    //false 默认是true
			Rapid: [true,true],    //false	默认是true			
 			Type: "single",        //single,range
 			View: "day",     //month,day,!week(不能选周)
 			Pattern: 2,		//0：周、月格式转换为时间范围传参；1：周格式201201,月格式201201传参;2:周格式20129901,月格式201201传参
 			Range: [7,30],      //[初始化近几天,最大时间范围（除选月模式）]
 			rapidSel: {      //如果快查功能启动，则配置快查规则
                item:{
                    "昨天": 0,     //0-组件计算日期
                    "前天": 0,
                    "本周": 0,
                    "上周": 0,
                    "本月": 0,
                    "上月": 0
                },
                label: "快速查看",
                external: true     //是否外置
            },
 			bDimension: true,      //是否按日/周/月选择
 	        dimension: {
 	            item: ["!month!week","week","month"],
 	            bEmbed: true
 	        },
 			bFinal: true,
			DateSeg: ["TopDateValue"]      //["StartDate","EndDate"]				
		},
		Tab: {
			Enable: false
		},
		Legend:{
			Enable: true,
			Div: ["dayTrafficChartLegend0","dayTrafficChartLegend1"]
		},
		Chart: [
		      
		],
		Bar: {			
			Enable: true,			
			Set: [
			 	{Div: "viewProfileResultBar", Item: false, Filter: true}
			]
		},
		Table: [
		        
		]		
};
$(document)
		.ready(
				function() {
					// 按默认条件查询
					showLoadingV2(5);
					B$.init(config);
					//params = $("#queryForm").serialize();
					// 一：流量概况查询
					//var url = context_path+"/dataModel/getViewProfileInitData.action";
					//query(url, params, show);
					// 二：流量分类查询
					//var urlClass = context_path+"/dataModel/getViewProfileClassResult.action";
					//query(urlClass, params,showClass);
					//加载通知
					loadModuleNotice(config.Menu.Id);
					
					//load systemnotice
					loadSystemNotice();
					tabClick(true);
				});

// 查询公共方法

var PVsum = 0;//全局pv总值,用于计算分类占比数据
var resultDataDetail;
var splineJsonData;//折线图数据
// ajax回调函数：显示汇总指标信息、图表信息、指标明细信息
function show(result) {
	splineJsonData = eval(result);
	var resultData = eval("(" + result.resultData + ")");
	// 汇总指标信息展示
	//renderSumZBs(splineJsonData.allSumZBs, resultData, 'div_top_allSumZBs', 5);
	//日报 各类汇总指标展示
    for(var i in splineJsonData.visitSumZBs){
        if(splineJsonData.visitSumZBs[i].id=="AvgStayTime"){
        	splineJsonData.visitSumZBs[i].formatter = function(_val){
                _val = $.jRoundVal(_val,0);
                var formatedValue = "";
                if (_val / 3600 > 1  ){
                    formatedValue += $.jFloorVal(_val / 3600,0) +"时";
                    if ( (_val % 3600 ) / 60 > 0 ){
                        formatedValue +=$.jFloorVal( (_val % 3600 ) / 60,0) +"分";
                    }else{
                        formatedValue += "0分";
                    }
                    formatedValue += (_val % 3600 ) % 60 +"秒";
                }else{
                    if ( _val/ 60 > 1 ){
                        formatedValue += $.jFloorVal(_val / 60,0) +"分";
                    }else{
                        formatedValue += "0分";
                    }
                    formatedValue += _val % 60 +"秒";
                }

                return formatedValue;
            };
            break;
        }
    }
	renderGrid('div_top_allSumZBs',{id: "Visit",name:"流量",gClass: "visits"},splineJsonData.visitSumZBs, resultData.summary);
	PVsum = resultData.summary&&resultData.summary.length ? resultData.summary["PV"].value[0] : 0;

	// 图表展示
	//showChart(chartJson);
	resultDataDetail=resultData.detail;
	// 指标明细信息展示
	B$.cfgClear("Table");
	B$.cfgAdd("Table", B$.cfgFormat("Table", splineJsonData.allDetailZBs, "viewProfileResult"));
	getDataTable(null, null, splineJsonData.allDetailZBs, resultData.detail,
			"viewProfileResultTable", "viewProfileResult", "false", "true", "0");
	
	new FixTableHeader({id:"viewProfileResultTable"});
	
	// 设置给行换色
	//switchTableRowColor("viewProfileResultTable");
	
	// 流量分类查询
	params = $("#queryForm").serialize();
	var urlClass = context_path+"/dataModel/getViewProfileClassResult.action";	
	query(urlClass, params,showClass);
	$.unblockUIV2();
}

// ajax回调函数：返回流量分类感慨查询信息，显示图表、分类明细信息
var columnData;
function showClass(result){
	columnData = eval("(" + result.resultData + ")");
	showChart(columnData);
	renderViewProfileClassTable("viewProfileClassResult","viewProfileClassResultTable",columnData);
}

// 图表展示函数
function showChart(columnJsonData) {
	// 图表展示的指标id及对应的图例名称数组定义
	var temp=0;
	var zbIdAndNames=new Array(),zbIdAndNames_PV=new Array();
//	if(columnJsonData != null && columnJsonData != undefined){
//		$.each(columnJsonData.detail, function(k, v) {
//			zbIdAndNames_PV[temp]=[k,k];
//			temp++;
//		});
//	}
	zbIdAndNames_PV[0] = ["商品页","商品页浏览量"];
	zbIdAndNames_PV[1] = ["店铺分类页","店铺分类页浏览量"];
	zbIdAndNames_PV[2] = ["店铺首页","店铺首页浏览量"];
	zbIdAndNames_PV[3] = ["店铺自建活动页","店铺自建活动页浏览量"];
	
	zbIdAndNames[0]=[ "PV", "浏览量" ];
	zbIdAndNames[1] = [ "UV", "访客数" ];
	zbIdAndNames[2]=[ "UVTimes", "访问次数" ];
	
	// 图表名称
	var chartTitle = formateDate($("#TopDateValue").val()) + " 流量概况分析";
	// 日期变量定义
	var tiId = "Time";
	var tiDataArray = null,spResultData;
	if(splineJsonData != null && splineJsonData != undefined){
		spResultData = eval("(" + splineJsonData.resultData + ")");
		for ( var attr in spResultData.detail) {
			if (attr == tiId) {
				tiDataArray = spResultData.detail[attr].value;
				break;
			}
		}
	}
	// 展示的数据序列
	var series = "";
	var seriesPV = "";
	//var chartColors=new Array("484891","003E3E","642100","006000","0099ff","cc0000");
//	var chartColors=new Array('4572A7','AA4643','89A54E','80699B','3D96AE','DB843D','92A8CD','A47D7C','B5CA92');
	var chartColors = Chart_Color;
	for ( var i = 0; i < zbIdAndNames.length; i++) {
		if(splineJsonData != null && splineJsonData != undefined){
			for ( var attr in spResultData.detail) {
				if(zbIdAndNames[i][0]==attr){
					series += "{name:'" + zbIdAndNames[i][1] + "' ,type: 'spline',data:["
							+ spResultData.detail[zbIdAndNames[i][0]].value
							+ "],color:'#" + chartColors[i] + "'},";
				}
			}
		}
	}
	for ( var i = 0; i < zbIdAndNames_PV.length; i++) {
		if(columnJsonData != null && columnJsonData != undefined){
			$.each(columnJsonData.detail, function(k, v) {
				if(zbIdAndNames_PV[i][0]==(k)){
					//seriesPV+="{name: '"+k+"(PV)', type: 'column', data: [500, 300, 400, 700, 200,100,200,300,400,500,600,700,800,900,100,200,300,400,500,600,700,800,900,400],color:'#"+chartColors[i]+"'},";
					if(v&&v.PV){
						seriesPV+="{name: '"+k+"', type: 'column', data: ["+v.PV.value+"],color:'#"+chartColors[i]+"'},";
					}else{
						seriesPV+="{name: '"+k+"', type: 'column', data: [0],color:'#"+chartColors[i]+"'},";
					}
				}
			});
		}
	}
	//if (series != "") {
		series = series.substr(0, series.length - 1);
		series = eval("[" + series + "]");
		seriesPV = seriesPV.substr(0, seriesPV.length - 1);
		seriesPV = eval("[" + seriesPV + "]");
		
	//}
	// 日期数据处理:只显示最后两位
	if (null != tiDataArray) {
		var tlength;
		for ( var i = 0; i < tiDataArray.length; i++) {
			tlength = (tiDataArray[i] + "").length;
			if (tlength > 2) {
				tiDataArray[i] = (tiDataArray[i] + "").substr(tlength - 2, 2);
			}

		}
	}
	
	// 指标选择区加载
	var zbOpt = [{Div: "dayTrafficChart0",Zb: zbIdAndNames},{Div: "dayTrafficChart1",Zb: zbIdAndNames_PV}];
	B$.cfgClear("Chart");
	B$.cfgAdd("Chart", zbOpt);			

	// 鼠标提示信息数据格式定义
	var tipformatter = function() {
		var xBeginStr = (this.x).toString().length > 1 ? this.x : "0" + this.x;
		var xEndStr = (parseInt(this.x) + 1).toString().length > 1 ? parseInt(this.x) + 1
				: "0" + (parseInt(this.x) + 1);
		var s = formateDate($("#TopDateValue").val())
				+ ($("#TopDateValue").val().length==10 ? (xBeginStr + '点--' + xEndStr + '点')
						: (this.x + '日'));
		$.each(this.points, function(i, point) {
			s += '<br/><span style="color:' + point.series.color + '">'
					+ point.series.name + ': </span> <b>'
					+ CommaFormatted(point.y) + '</b>';
		});
		return s;
	};
	// y轴数据格式定义
	var ylabformatter = function() {
		return CommaFormatted(this.value);
	};
	// 图表渲染
	doHighChart_xyChart("dayTrafficChart0",chartTitle,tiDataArray,series,tipformatter,ylabformatter);
	doHighChart_xyChart("dayTrafficChart1",chartTitle,tiDataArray,seriesPV,tipformatter,ylabformatter);
}

// 点击查询按钮执行的函数
function queryByFilter() {
	var curDate = $("#TopDateValue").val();
	// 判断日期为空情况
	
	var type = (curDate.length==10&&"date")||(curDate.length==7&&"month")||"";	
	
	showLoadingV2(5);
	// 流量概况查询
	params = $("#queryForm").serialize();
	var url = context_path+"/dataModel/getViewProfileResult.action";
	query(url, params, show);
	// 流量分类概况查询
	//var urlClass = context_path+"/dataModel/getViewProfileClassResult.action";
	//query(urlClass, params, showClass);
}

// 回车-查询
document.onkeydown = function(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		// 日期控件收回
		$('#dp-popup').datePicker().dpClose();
		queryByFilter();
		return false;
	}
};

function doExcelDownload(){
	if (resultDataDetail && resultDataDetail.length) {
		window.location.href = context_path+"/dataModel/downViewProfileReportExcel.action"
				+ (params ? ("?" + params) : "");
	} else {
		B$.T.warn("没有数据。");
	}
}

/**
 * 概况分类table列表渲染方法
 * @param id_div 渲染table的div-id
 * @param id_table 表格id
 * @param td_data 表格数据
 */
function renderViewProfileClassTable(id_div,id_table,td_data){	
	var summary= td_data.summary;
	var sumPV=0;
	var pvPercent;
	var pvPercentTmp;
	var numberSortStr="";//针对金额排序
	var addOtherFlag = false;//增加其它标志
	var otherPV = 0;
	
	B$.cfgClear("Table");	
	B$.cfgAdd("Table", [{Div:id_div,Zb:[["category","分类"],["pv","浏览量"],["ratio","占比"]]}]);
	var strTR = "<table class=\"detail_table display\" id="+id_table+">";
	strTR += "<thead><tr><th class=\"t1 b_color\" width=30%>分类</th>" +
			"<th class=\"t1 r_color\" width=35%>浏览量</th>" +
			"<th class=\"t1 r_color\" width=35%>占比</th></tr></thead><tbody>";	
	$.each(summary, function(k, v) { 
		if(v&&v.PV){
			sumPV+=v.PV.value[0];
		}
	});	
	
	if(sumPV < PVsum){//如果全局pv大于分类sum,则增加其它
		addOtherFlag = true;
		otherPV = PVsum - sumPV;
		sumPV = PVsum;
	}
	$.each(summary, function(k, v) { 
		strTR += "<tr>";
		strTR += "<td class=\"t-l\">"+k+"</td>";
		if(v&&v.PV){
			pvPercentTmp=format_number((Math.round(v.PV.value[0]*10000/sumPV)/100),2);
			//pvPercent=(Math.round(v.PV.value[0]*10000/sumPV)/100)+"%";
			strTR += "<td class=\"dR\">"+ CommaFormatted(v.PV.value[0])+"</td>";
		}else{
			pvPercentTmp=0;
			strTR += "<td class=\"dR\">0</td>";
		}
		pvPercent=pvPercentTmp+"%";
		var barPercent=Math.round(0.8*pvPercentTmp);
		strTR+="<td class=\"t-r\">";
//		if(barPercent<0.1){
//			strTR+="<span style=\"float:right;margin-left:0px;color: #CC3300\">"+pvPercent+"</span>";
//		}else{
//			strTR+="<span style=\"float:right;margin-left:2px;color: #CC3300\">"+pvPercent+"</span>";
//		}
		strTR+="<span style=\"float:right;\">"+pvPercent+"</span>";
		strTR+="<div style=\"width:83%\"><span style=\"height:10px;float:right;margin-top:3px;background:#83cbfb;width:"+barPercent+"%\"></span>";
		strTR += "</td></tr>";
	});
	numberSortStr+="null,{ \"sType\": \"numeric-comma\" },null";
	if(addOtherFlag){
		strTR += "<tr><td class=\"t-l\">其它</td><td class=\"dR\">"+ CommaFormatted(otherPV)+"</td>";
		pvPercentTmp=format_number((Math.round(otherPV*10000/sumPV)/100),2);
		pvPercent=pvPercentTmp+"%";
		var barPercent=Math.round(0.8*pvPercentTmp);
		strTR+="<td class=\"t-r\"><span style=\"float:right;\">"+pvPercent+"</span><div style=\"width:83%\"><span style=\"height:10px;float:right;margin-top:3px;background:#83cbfb;width:"+barPercent+"%\"></span></td></tr>";
	}
	strTR+="</tbody></table>";
	var aoColumnDefs="";
	for(var i=0;i<3;i++){
		aoColumnDefs+="{ \"asSorting\": [\"desc\",\"asc\"],\"aTargets\": [ "+i+"] },";
	}
	aoColumnDefs="["+aoColumnDefs.substr(0,aoColumnDefs.length-1)+"]";
	$("#" + id_div).html(strTR);
	
	jQuery.fn.dataTableExt.oSort['numeric-comma-asc']  = 
		function(a,b) {     
			var x = (a == "-") ? 0 : a.replace( /,/g, "" );     
			var y = (b == "-") ? 0 : b.replace( /,/g, "" );     
			x = parseFloat( x );     
			y = parseFloat( y );     
			return ((x < y) ? -1 : ((x > y) ?  1 : 0)); 
		};  
		
	jQuery.fn.dataTableExt.oSort['numeric-comma-desc'] = function(a,b) {     
			var x = (a == "-") ? 0 : a.replace( /,/g, "" );     
			var y = (b == "-") ? 0 : b.replace( /,/g, "" );     
			x = parseFloat( x );     y = parseFloat( y );     
			return ((x < y) ?  1 : ((x > y) ? -1 : 0)); 
		}; 
	numberSortStr="["+numberSortStr+"]";
	var curTbl = $("#" + id_table).dataTable({		
		"bPaginate" : false,
		"bInfo" : false,
		"bSort": true,
		"aoColumns": eval(numberSortStr),
		"aoColumnDefs": eval(aoColumnDefs),
		"aaSorting": [[ "1", "desc" ]] 
	});
	
	B$.globalAdd("Table", curTbl, id_div);
}

//tab点击事件
function tabClick(isLoad){
	$(".tab.cxt a").live("click",function(){
		$(".tab.cxt a").removeClass("selected");
		$(this).addClass("selected");
		$(".tab.cxt a").each(function(){
			if(!$(this).hasClass("selected") ){
				$("#"+$(this).attr("be")).hide();
			}else{
				$("#"+$(this).attr("be")).show();
			}
		});
		showChart(columnData);
	});
	if(!!isLoad){
		$(".tab.cxt a").eq(0).click();
	}
}