


/*全局的图表曲线的颜色 数组*/
var Chart_Color = B$.constants.Color.P.join(",").replace(/#/g,"").split(","),ChartTwoYxis_Color=new Array("99cc33"),chart_global = [];

/*设置行交替颜色
 @param tableId 表格ID*/
function setTableRowColor(tableId) {
	var colors = [ '#FOFOFO', '#F7F7F7' ];
	$("#" + tableId).find("tr").each(function(i) {
		$(this).css("background-color", colors[i % 2]);
	});
}
function getWeekFilter(hideValue,weekValue){
	$('#'+hideValue).val($('#'+weekValue).val().replace('年第','').replace('周',''));
}


/*根据日期获取周
@param n 当期日期*/
function showWeek(n){
	var thisDate = new Date(n.split("-")[0],n.split("-")[1]*1-1,n.split("-")[2], 0, 0, 0);
	var week = thisDate.getWeekNumber();
	var year = thisDate.getFullYear();
	var weekFormat = year+"年第"+week+"周";
	return weekFormat;
}

/*根据日期获取周
@param n 当期日期*/
function showWeekPatch1(n){
	var thisDate = new Date(n.split("-")[0],n.split("-")[1]*1-1,n.split("-")[2], 0, 0, 0);
	var weekNum = thisDate.getCurWeek()[1]+1;
	var week = weekNum<10?("0"+weekNum):(""+weekNum);
	var year = thisDate.getFullYear();
	var weekFormat = year+"年第"+week+"周";
	return weekFormat;
}

/*根据日期获取周
@param n 当期日期*/
function showWeekPatch0(n){
	var thisDate = new Date(n.split("-")[0],n.split("-")[1]*1-1,n.split("-")[2], 0, 0, 0);
	var week = thisDate.getWeekNumber();
	if(parseInt(week)<10)
		week = "0" + week;
	var year = thisDate.getFullYear();
	var weekFormat = year+"年第"+week+"周";
	return weekFormat;
}

/*根据日期获取周星期0-6
@param n 当期日期*/
function getDayW(n){
	var thisDate = new Date(n.split("-")[0],n.split("-")[1]*1-1,n.split("-")[2], 0, 0, 0);
	return thisDate.getDay();
}

/*根据日期获取周
@param n 当期日期*/
function showWeekOnly(n){
	var thisDate = new Date(n.split("-")[0],n.split("-")[1]*1-1,n.split("-")[2], 0, 0, 0);
	var week = thisDate.getWeekNumber();
	if(parseInt(week)<10)
		week = "0" + week;
	return week;
}

function showWeekNumOnly(n){
	var thisDate = new Date(n.split("-")[0],n.split("-")[1]*1-1,n.split("-")[2], 0, 0, 0);
	var week = thisDate.getWeekNumber();
	return week;
}


/*
 * 鼠标经过表格时改变行背景色的功能
 * 暂时不用这个效果.
 * */
function switchTableRowColor(tableId) {
	//设置表格鼠标经过时，改变背景色(主要解决ie6不支持tr:hover的问题)
	/*
	$("#" + tableId +' tbody tr').mouseover(
			function(e){
				//if(this==e.target){
					this.oldColor = this.style.backgroundColor;; //暂存旧值
					this.style.backgroundColor="#ffefd6";
				//}
			}
	);
	$("#" + tableId + ' tbody tr').mouseout(
		function(e){
			//if(this==e.target){
				this.style.backgroundColor=this.oldColor;
			//}
		}
	);*/
}

//获得某月的天数
function getMonthDays(year,month){
	var monthStartDate = new Date(year, month, 1);
	var monthEndDate = new Date(year, month + 1, 1);
	var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
	return days;
}

function getCurWeekStartEndDate(){
	var now = new Date();
	var dayOfWeek = now.getDay();
	if(dayOfWeek==0){
		dayOfWeek = 7;
	}
	var curWeekStartDate=getDateStr(-1*(dayOfWeek-1));
	
	var yestodayStr=getDateStr(-1);
	
	var tmpCurWeekStartDate=curWeekStartDate.replace("-","");
	var tmpYestoday=yestodayStr.replace("-","");
	if(tmpYestoday<tmpCurWeekStartDate){
		yestodayStr=curWeekStartDate;
	}
	return [curWeekStartDate,yestodayStr];
}

function getLastWeekStartEndDate(){
	var now = new Date();
	var dayOfWeek = now.getDay();
	if(dayOfWeek==0){
		dayOfWeek = 7;
	}
	var preWeekEndDate=getDateStr(-1*(dayOfWeek));
	var preWeekStartDate=getDateStr(-1*(dayOfWeek+6));
	return [preWeekStartDate,preWeekEndDate];
}

function getCurMonthStartEndDate(){
	var now = new Date();
	var y = now.getFullYear();
	var m = now.getMonth();// 获取当前月份的日期
	var curMonthStartDate=formatDate(new Date(y,m,1));
	var yestodayStr=getDateStr(-1);
	
	var tmpCurMonthStartDate=curMonthStartDate.replace("-","");
	var tmpYestoday=yestodayStr.replace("-","");
	if(tmpYestoday<tmpCurMonthStartDate){
		yestodayStr=curMonthStartDate;
	}
	return [curMonthStartDate,yestodayStr];
}

function getLastMonthStartEndDate(){
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
	var lastMonthYear = lastMonthDate.getFullYear();
	var lastMonth = lastMonthDate.getMonth();
	var lastMonthStartDate=formatDate(new Date(lastMonthYear,lastMonth,1));
	var lastMonthEndDate=formatDate(new Date(lastMonthYear,lastMonth,getMonthDays(lastMonthYear,lastMonth)));
	return [lastMonthStartDate,lastMonthEndDate];
}

/*
 * 设置默认日期，格式：yyyy-MM-dd @param AddDayCount 天数
 */
function getDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount);// 获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;// 获取当前月份的日期
	var d = dd.getDate();
	var str_m,str_d;
	if(m<10) str_m = "0"+m; else str_m = m; 
	if(d<10) str_d = "0"+d; else str_d = d;
	
	return y + "-" + str_m + "-" + str_d;
}
/*获取Date的前几天或后几天(AddDayCount)*/
function getDateStrByDate(n,AddDayCount) {
	var dd = new Date(n.split("-")[0],n.split("-")[1]*1-1,n.split("-")[2], 0, 0, 0);
	dd.setDate(dd.getDate() + AddDayCount);// 获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;// 获取当前月份的日期
	var d = dd.getDate();
	var str_m,str_d;
	if(m<10) str_m = "0"+m; else str_m = m; 
	if(d<10) str_d = "0"+d; else str_d = d;
	return y + "-" + str_m + "-" + str_d;
}

function formatDate(dd){
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;// 获取当前月份的日期
	var d = dd.getDate();
	var str_m,str_d;
	if(m<10) str_m = "0"+m; else str_m = m; 
	if(d<10) str_d = "0"+d; else str_d = d;
	
	return y + "-" + str_m + "-" + str_d;
}

function getWeeklyStr(AddWeeklyCount) {
	AddWeeklyCount = -AddWeeklyCount;	
	var date = new Date();
	var curYear = date.getFullYear();
	var curWeek = date.getWeekNumber();
	curWeek = curWeek - AddWeeklyCount;
	return curYear+"年第"+curWeek+"周";
}

/*
 * 设置默认月份，格式：yyyy-MM @param AddMonthCount 月数
 * 以昨天的月份为当前月份
 */
function getMonthStr(AddMonthCount) {
	AddMonthCount = -AddMonthCount;	
    
	var date = new Date();
	var curYear = date.getFullYear();
	var curMonth = date.getMonth() + 1 ;
	// 如果要减去的月份大于等于当前月份的数值
	if( (AddMonthCount - curMonth) >= 0){ 
    curYear = curYear -1 ;
    curMonth = 12 - (AddMonthCount - curMonth);
    }
    else{
    	curMonth = curMonth - AddMonthCount;
    }      
    
    //获取当前月，其他逻辑不变
    if(AddMonthCount==0){
    	date.setDate(date.getDate()-1);
    	curMonth = date.getMonth()+1;
    }
    
    if(curMonth <10){
    	curMonth = "0" + curMonth;
    } 
	var newDate = curYear + "-" + curMonth ;
	return newDate;
}

/*
 * 设置默认年，格式：yyyy @param AddYearCount 年数
 */
function getYearStr(AddYearCount) {
	var dd = new Date();
	var y = dd.getFullYear() + AddYearCount * 1;
	return y;
}

/**
 * 计算两个日期之间相差天数
 * startDate和endDate是2002-12-18格式   
 * @param startDate 开始日期
 * @param endDate	结束日期
 * @returns 相差天数
 */
function dateDiff(startDate, endDate){ 
	 var aDate, oDate1, oDate2, iDays;   
	 aDate = startDate.split("-");   
	 oDate1 = new Date(aDate[0],aDate[1]-1,aDate[2]);   
	 aDate = endDate.split("-");   
	 oDate2 = new Date(aDate[0],aDate[1]-1,aDate[2]);   
	 iDays = parseInt(Math.abs(oDate2 - oDate1)/1000/60/60/24)+1;     
	 return iDays; 
}

/**
 * 快速查看按钮样式设置--鼠标经过
 * 
 * @param value
 *            快速查看按钮id
 */
function repaidBtnOverClass(value){
	document.getElementById(value).style.background="url(\"../../images/platform/mainform/btn_filter_over.png\") no-repeat scroll 0 0 transparent";
}

/**
 * 快速查看按钮样式设置--鼠标离开
 * 
 * @param value
 *            快速查看按钮id
 * @param currentPrapid
 *            当前已经选中的快速查看按钮id
 */
function repaidBtnOutClass(value,currentPrapid){
	if(value!=currentPrapid)
		document.getElementById(value).style.background="url(\"../../images/platform/mainform/btn_filter_out.png\") no-repeat scroll 0 0 transparent";					
}

/*
 * 根据查看维度选择来 格式化选择时间组件 @param DateTop：“查看维度”select的id @param
 * DivTop：“选择时间组件”div的id 查看维度包括：[0]月度、[1]年份、[2]当日 [0]月度：格式化时间组件为只能选择年份和月份
 * [1]年度：格式化时间组件为只能选择年份 [2]当日：格式化时间组件为只能选择具体日期
 * @DateTextId 日期text的id
 */
function changeDate(DateTop, DateDivTop,DateTextId) {
	var dateTop = document.getElementById(DateTop);
	if (dateTop.options[dateTop.options.selectedIndex].value=="2"){//日
		$("#"+DateTextId).val(getDateStr(-1));
		$("#"+DateTextId).datePicker({clickInput:true,dateFormat:'yy-mm-dd',endDate: getDateStr(0)});
	}else if(dateTop.options[dateTop.options.selectedIndex].value=="1"){//周
		$("#"+DateTextId).val(showWeekPatch0(getDateStr(-1)));
		$("#"+DateTextId).datePicker({clickInput:true,selectWeek:true,dateFormat:'yy-mm-dd',endDate: getDateStr(0)});
	}
	else{//月
		$("#"+DateTextId).val(getMonthStr(0));
		$("#"+DateTextId).datePicker({clickInput:true,selectMonth:true,dateFormat:'yy-mm-dd',endDate: getDateStr(0)});
	}
}

/*
 * 获取显示的总条数 可根据年 月份 @ selectDate 当前选择的日期
 */
function getDaysCount(timeData) {
	var jsonResultTemp=timeData.slice();
	for(var i=0;i<jsonResultTemp.length;i++){
		for(var j=0;j<timeFilterInfos.length;j++){
			if(jsonResultTemp[i]==timeFilterInfos[j]){
				jsonResultTemp.splice(i,1);
			}
		}
	}
	return jsonResultTemp.length;
}

/*
 * 判断是否为数字 是返回true 不是返回false 
 * @param num 判断的值 例如：1， 1.11， -1.11 均为数字 a， 2a为字符串
 */
function checkData(num){
	num=num.toString().replace(/%|\,/g,"");
	if(!isNaN(num)){
		   return true;
		}else{
		   return false;
		}
}

/* 页面提示正在加载
 * @param autoCloseTime 设置提示信息自动隐藏的秒数，负数代表不启用自动隐藏
 */
function showLoading(autoCloseTime){
	$.blockUI({ css: { 
        border: 'none', 
        padding: '15px', 
        backgroundColor: '#000', 
        '-webkit-border-radius': '10px', 
        '-moz-border-radius': '10px', 
        opacity: .5, 
        color: 'white' 
    } 
    }); 
	if(autoCloseTime>=0)		
		setTimeout($.unblockUIV2, autoCloseTime*1000); 
}

/* 页面提示正在加载
 * @param autoCloseTime 设置提示信息自动隐藏的秒数，负数代表不启用自动隐藏
 */
function showLoadingV1(autoCloseTime){
	$.blockUI({ css: { 
        border: 'none', 
        padding: '15px', 
        backgroundColor: '#000', 
        '-webkit-border-radius': '10px', 
        '-moz-border-radius': '10px', 
        opacity: .5, 
        color: 'white' 
    } 
    }); 
	if(autoCloseTime>=0)		
		setTimeout($.unblockUI, autoCloseTime*1000); 
}

/* 日报日期格式处理
 * @param dateStr td表格里的数，输出为 "00:00 -- 01:00" 格式
 */
function dailyDateFormat(dateStr){
	if(dateStr.length==1){
		var temp=parseInt(dateStr)+1;
		if(temp<10)
			dateStr="0"+dateStr+":00 -- "+"0"+temp+":00";
		else
			dateStr="0"+dateStr+":00 -- " +temp+":00";
	}
	else if(dateStr.length==2){
		var temp=parseInt(dateStr)+1;
		dateStr=dateStr+":00 -- "+temp+":00";
	}else if(dateStr.length==8){
		dateStr=monthlyDateFormat(dateStr);
	}
	return dateStr;
}

/* 月报日期格式处理 
 @param dateStr td表格里的数，输出为 "2011-01-01" 格式 
 */
function monthlyDateFormat(dateStr){
	dateStr=dateStr.toString().substr(0, 4)
	+ "-"
	+ dateStr.toString().substr(4, 2)
	+ "-"
	+ dateStr.toString().substr(6, 2);
	return dateStr; 
}

/* 月份/日期格式化:20110101==>2011-01-01 */
function dateFormat(dateStr){
	var temDateStr="";
	// 小时段处理
	if(dateStr.length<=2){
		if(dateStr.length==1){
			var temp=parseInt(dateStr)+1;
			if(temp<10)
				temDateStr="0"+dateStr+":00 -- "+"0"+temp+":00";
			else
				temDateStr="0"+dateStr+":00 -- " +temp+":00";
		}
		else if(dateStr.length==2){
			var temp=parseInt(dateStr)+1;
			temDateStr=dateStr+":00 -- "+temp+":00";
		}
	}
	// 年月处理
	if(dateStr.length==6){
		temDateStr=dateStr.toString().substr(0, 4)
		+ "-"
		+ dateStr.toString().substr(4, 2);
	}
	// 年月日处理
	if(dateStr.length==8){
		temDateStr=dateStr.toString().substr(0, 4)
		+ "-"
		+ dateStr.toString().substr(4, 2)
		+ "-"
		+ dateStr.toString().substr(6, 2);
	}
	// 年月日处理
	if(dateStr.length==14){
		temDateStr=dateStr.toString().substr(0, 4)
		+ "-"
		+ dateStr.toString().substr(4, 2)
		+ "-"
		+ dateStr.toString().substr(6, 2)
		+" "
		+ dateStr.toString().substr(8,2)
		+":"
		+ dateStr.toString().substr(10,2)
		+":"
		+ dateStr.toString().substr(12,2);
	}
	return temDateStr; 
}

/*
 * 获取查询结果信息 渲染成table 
 * @param dataKind为"AvgSum"代表 有"汇总"或者"平均"的数据 
 * @param dateKindCount 如果"平均"和"汇总"数据都有，该参数为2，否则为1，没有留空或者""
 * @param jsonZBData 指标信息json数据
 * @param jsonResultData 结果信息json数据
 * @param tableId生成的表格id
 * @param tableDivId 渲染表格所在的div的id
 * @param ifShowInfo 表格是否显示查询，排序等信息
 * @param ifSorting 表格是允许排序
 * @param tdBorder 表格的宽度 1 或者 0
 * @param text_align 表格的内容位置
 */
function getDataTable(dataKind, dateKindCount, jsonZBData,
		jsonResultData, tableId, tableDivId, ifShowInfo,ifSorting,tdBorder,text_align,sortingColNum) {
	var daysAmount= "";
	var strTable = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" style=\"border-collapse:collapse;\" id=\""
			+ tableId + "\">";
	strTable += "<thead><tr>";
	$.each(jsonZBData, function(i, n) {
        strTable += "<th>";
        if(n.des&&n.des!=""){
            strTable += '<i class="icon-help" desc="'+ n.des+'"></i>';
        }
        strTable += n.value + "&nbsp;&nbsp;</th>";
	});
	strTable += "</tr></thead><tbody>";
	var strTR = "";
	var moneySortStr="";//针对金额排序

	if (jsonResultData && jsonResultData.length) {// 此处根据id查找value
		if (dataKind != "AvgSum") {// 正常数据
			for ( var m = 0; m < jsonResultData.length; m++) {
				strTR += "<tr>";
				$
						.each(
								jsonZBData,
								function(i, n) {
									var attr=n.id;
									var tdStr;
									if(jsonResultData[attr]){
										tdStr = jsonResultData[attr].value[m] != null ? jsonResultData[attr].value[m]
												: "";
										tdStr+="";
										if(n.id=="TimeSeg"){
											tdStr=dailyDateFormat(tdStr);
										}
										else{
											// 小数位个数
											if(n.dataType==1)
												tdStr=format_number(tdStr,2);
											if(n.dataType==6){
												if(n.percentNormal=="N"){
													tdStr=format_number(tdStr,2);
												}else{
													tdStr=format_number(tdStr * 100,2);
												}
											}
											// 逗号分隔符
											if(n.dataType==0 ||n.dataType==1 || n.dataType == 6){
												tdStr=CommaFormatted(tdStr);
											}
											if(n.dataType == 6){
												tdStr+="%";
											}
											// 判断日报日期格式
											
											if(n.dataType==5)
												tdStr=dateFormat(tdStr+"");
										}
									}else{
										tdStr="-";
									}
									if(n.dataType==0 ||n.dataType==1 || n.dataType == 6){
										if(m==0)
											moneySortStr+="{ \"sType\": \"numeric-comma\" },";
									}else{
										if(m==0)
											moneySortStr+="null,";
									}
									if(text_align){
										strTR += "<td style=\"text-align:"+text_align+";border:"+tdBorder+"px solid #CCC;\">" + tdStr + "</td>";
									}else{
										if(checkData(tdStr)){
											if(n.id=="UPV_RNG" || n.id=="OPN_RNG")
												strTR += "<td style=\"text-align:left;border:"+tdBorder+"px solid #CCC;\">" + tdStr + "</td>";
											else
												strTR += "<td style=\"text-align:right;border:"+tdBorder+"px solid #CCC;\">" + tdStr + "</td>";
										}
										else{
											if(tdStr=="-"){
												strTR += "<td style=\"text-align:middle;border:"+tdBorder+"px solid #CCC;\">" + tdStr + "</td>";
											}else{
												if(n.dataType==6){
													strTR += "<td style=\"text-align:right;border:"+tdBorder+"px solid #CCC;\">" + tdStr + "</td>";
												}else{
													strTR += "<td style=\"text-align:left;border:"+tdBorder+"px solid #CCC;\">" + tdStr + "</td>";
												}
											}
										}
									}
										
								});
				strTR += "</tr>";
			}
		}
		else{// 处理有“汇总”或者“平均”的那一部分数据
			for (var m = parseInt(daysAmount)-1; m > parseInt(daysAmount)-parseInt(dateKindCount)-1; m--) {
				strTR += "<tr>";
				$
						.each(
								jsonZBData,
								function(i, n) {
									var attr=n.id;
									var tdValue=jsonResultData[""+attr+""].value[m];
									if(tdValue == "AVG")
										tdValue="平均";
									else if(tdValue.toString().indexOf("99")>0)
										tdValue="汇总";
									var tdStr = tdValue != null ? tdValue: "";
									 strTR += "<td>" + tdStr + "</td>";
										
								});
				strTR += "</tr>";
			}
		}
	} else {
		$
		.each(
				jsonZBData,
				function(i, n) {
					moneySortStr+="null,";
				});
	}

	strTable += strTR + "</tbody>";
	strTable += "</table>";

	$("#" + tableDivId).html(strTable);

	jQuery.fn.dataTableExt.oSort['numeric-comma-asc']  = function(a,b) { 
		if(a==undefined || b==undefined){
			return false;
		}
		var x = (a == "-") ? 0 : a.replace(/<.*?>|,|-/g, "");
		var y = (b == "-") ? 0 : b.replace(/<.*?>|,|-/g, "");  
		x = parseFloat( x );     
		y = parseFloat( y );     
		return ((x < y) ? -1 : ((x > y) ?  1 : 0)); 
	};  
		
	jQuery.fn.dataTableExt.oSort['numeric-comma-desc'] = function(a,b) { 
		if(a==undefined || b==undefined){
			return false;
		}
		var x = (a == "-") ? 0 : a.replace(/<.*?>|,|-/g, "");  
		var y = (b == "-") ? 0 : b.replace(/<.*?>|,|-/g, "");  
		x = parseFloat( x );     y = parseFloat( y );     
		return ((x < y) ?  1 : ((x > y) ? -1 : 0)); 
	};
	moneySortStr="["+moneySortStr.substr(0,moneySortStr.length-1)+"]";
	
	var arraySize = jsonZBData.length;
	var aoColumnDefs="";
	for(var i=0;i<arraySize;i++){
		aoColumnDefs+="{ \"asSorting\": [\"desc\",\"asc\"],\"aTargets\": [ "+i+"] },";
	}
	aoColumnDefs="["+aoColumnDefs.substr(0,aoColumnDefs.length-1)+"]";
	
	var curTbl;
	if (ifShowInfo == "true") {
		if(sortingColNum){
			curTbl = $("#" + tableId).dataTable({
//				"sDom": 'T<"clear">lfrtip',
//				"oTableTools": {
//					"aButtons": [
//						"copy",
//						"csv",
//						"xls",
//						{
//							"sExtends": "pdf",
//							"sPdfOrientation": "landscape",
//							"sPdfMessage": "Your custom message would go here."
//						},
//						"print"
//					]
//				},
				"sPaginationType" : "full_numbers",
//				"bFilter" : false,
				"bPaginate" : true,
				"bInfo" : true,
				"bSort": eval(ifSorting),
				"aoColumns": eval(moneySortStr),
				"aaSorting": [[ sortingColNum, "desc" ]],
				"aoColumnDefs": eval(aoColumnDefs)
			});
		}else{
			curTbl = $("#" + tableId).dataTable({
//				"sDom": 'T<"clear">lfrtip',
//				"oTableTools": {
//					"aButtons": [
//						"copy",
//						"csv",
//						"xls",
//						{
//							"sExtends": "pdf",
//							"sPdfOrientation": "landscape",
//							"sPdfMessage": "Your custom message would go here."
//						},
//						"print"
//					]
//				},
				"sPaginationType" : "full_numbers",
//				"bFilter" : false,
				"bPaginate" : true,
				"bInfo" : true,
				"bSort": eval(ifSorting),
				"aoColumns": eval(moneySortStr),
				"aoColumnDefs": eval(aoColumnDefs)
			});
		}
	} else {
		if(sortingColNum){
			curTbl = $("#" + tableId).dataTable({
//				"sDom": 'T<"clear">lfrtip',
//				"oTableTools": {
//					"aButtons": [
//						"copy",
//						"csv",
//						"xls",
//						{
//							"sExtends": "pdf",
//							"sPdfOrientation": "landscape",
//							"sPdfMessage": "Your custom message would go here."
//						},
//						"print"
//					]
//				},
//				"bFilter" : false,
				"bPaginate" : false,
				"bInfo" : false,
				"bSort": eval(ifSorting),
				"aoColumns": eval(moneySortStr),
				"aaSorting": [[ sortingColNum, "desc" ]],
				"aoColumnDefs": eval(aoColumnDefs)
			});
		}else{
			curTbl = $("#" + tableId).dataTable({
//				"sDom": 'T<"clear">lfrtip',
//				"oTableTools": {
//					"aButtons": [
//						"copy",
//						"csv",
//						"xls",
//						{
//							"sExtends": "pdf",
//							"sPdfOrientation": "landscape",
//							"sPdfMessage": "Your custom message would go here."
//						},
//						"print"
//					]
//				},
//				"bFilter" : false,
				"bPaginate" : false,
				"bInfo" : false,
				"bSort": eval(ifSorting),
				"aoColumns": eval(moneySortStr),
				"aoColumnDefs": eval(aoColumnDefs)
			});
		}
	}
//	table_global[tableDivId] = curTbl;	
//	B$.loadTbls(table_global);
	B$.globalAdd("Table", curTbl, tableDivId);

    $('i.icon-help',$("#" + tableDivId)).Jtips({
        "content": "暂无描述",
        "position": 'bottom',
        "width": 196
    });
}


/*
 * 获取查询结果信息 渲染成table (针对概况数据定制)
 * @param dataKind为"AvgSum"代表 有"汇总"或者"平均"的数据 
 * @param dateKindCount 如果"平均"和"汇总"数据都有，该参数为2，否则为1，没有留空或者""
 * @param jsonZBData 指标信息json数据
 * @param jsonResultData 结果信息json数据
 * @param tableId生成的表格id
 * @param tableDivId 渲染表格所在的div的id
 * @param ifShowInfo 表格是否显示查询，排序等信息
 * @param ifSorting 表格是允许排序
 * @param tdBorder 表格的宽度 1 或者 0
 */
function getStatDataTable(dataKind, dateKindCount, jsonZBData,
		jsonResultData, tableId, tableDivId, ifShowInfo,ifSorting,tdBorder) {
	var daysAmount= "";
	var strTable = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" style=\"width: 100%;border-collapse:collapse;\" id=\""
			+ tableId + "\">";
	strTable += "<thead><tr>";
	$.each(jsonZBData, function(i, n) {
		if(n.des!="")
			strTable += "<th>" + n.value + "&nbsp;<span class='questionItem' onmouseover='tipsShow(this)' onmouseout='tipsHide()' style=\"color:#666666\"><a>" + n.des + "</a></span></th>";
		else
			strTable += "<th>" + n.value + "&nbsp;</th>";
	});
	strTable += "</tr></thead><tbody>";
	var strTR = "";
	var moneySortStr="";//针对金额排序

	if (jsonResultData && jsonResultData.length) {// 此处根据id查找value
		if (dataKind != "AvgSum") {// 正常数据
			for ( var m = 0; m < jsonResultData.length; m++) {
				strTR += "<tr>";
				$
						.each(
								jsonZBData,
								function(i, n) {
									var attr=n.id;
									var tdStr = jsonResultData[attr].value[m] != null ? jsonResultData[attr].value[m]
											: "";
									// 小数位个数
									if(n.dataType==1)
										tdStr=format_number(tdStr,2);
									// 逗号分隔符
									if(n.dataType==0 ||n.dataType==1){
										tdStr=CommaFormatted(tdStr);
										if(m==0)
											moneySortStr+="{ \"sType\": \"numeric-comma\" },";
									}else{
										if(m==0)
											moneySortStr+="null,";
									}
									
									// 判断日报日期格式
									if(n.id=="TimeSeg")
										tdStr=dailyDateFormat(tdStr);
									if(n.dataType==5)
										tdStr=dateFormat(tdStr+"");
									strTR += "<td style=\"font-family:Arial;font-weight:bold;text-align:center;border:"+tdBorder+"px solid #CCC;\">" + tdStr + "</td>";
										
								});
				strTR += "</tr>";
			}
		}
	} else {
		$
		.each(
				jsonZBData,
				function(i, n) {
					moneySortStr+="null,";
				});
	}

	strTable += strTR + "</tbody>";
	strTable += "</table>";

	$("#" + tableDivId).html(strTable);

	var curTbl;
	if (ifShowInfo == "true") {
		curTbl = $("#" + tableId).dataTable({
			"sPaginationType" : "full_numbers"
		});
	} else {
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
				moneySortStr="["+moneySortStr.substr(0,moneySortStr.length-1)+"]";
		curTbl = $("#" + tableId).dataTable({
			"bFilter" : false,
			"bPaginate" : false,
			"bInfo" : false,
			"bSort": eval(ifSorting),
			"aoColumns": eval(moneySortStr)
		});
	}	
//	table_global[tableDivId] = curTbl;
//	B$.loadTbls(table_global);
	B$.globalAdd("Table", curTbl, tableDivId);
}

/*
 * 获取查询结果信息渲染成table,针对商品排行，和图表联动.
 * @param chartName动态联动的图表名称
 * @param chartDivId动态联动的图表的渲染divID
 * @param zbTitle 按指标快速查询的指标key   如"PV"
 * @param zbText  按指标快速查询的指标value 如"浏览量"
 * @param tableId 要填充表格的id
 * @param tableDivId 要填充表格所在的div的id
 */
var finalResult;
var finalZBTopValue="PV"; //top页面 最后一次点击的快出查询指标
var finalZBTopText="浏览量";
var finalZBBottomValue="PV";//bottom页面 最后一次点击的快出查询指标
var finalZBBottomText="浏览量";


/*
 * 动态生成图表 
 * @param chartName 动态绑定图表名称 
 * @param zbTitle传入的指标的value
 * @param zbText传入的指标的名称
 * @param chartDivId要渲染图表的div
 */
var chart;




/**
 * 图表封装方法
 * 
 * @param renderToId
 *            图表被渲染到的div-id
 * @param seriesType
 *            图表类型：line、column等
 * @param chartTitle
 *            图表名称(显示在图表的顶部)
 * @param xAxisCategories
 *            图表x轴显示的元素名称数组：[ 'Tokyo', 'Jakarta', 'New York', ..]
 * @param yAxisTitle
 *            图表y轴显示的名称
 * @param series
 *            例如：[{name: 'PV(浏览量)',data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5]},
 *            {name: 'UV(访问量)',data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.05]}]
 * @param tooltipFormatterFun
 *            提示格式化函数
 * @param  tipFlag 
 *            单点提示还是多点提示 true-多点提示，null-单点提示    
 * @param  _rotation    
 * 			  横坐标倾斜度  
 */
var chart;
function doHighChart(renderToId, seriesType, chartTitle, xAxisCategories,
		yAxisTitle, series, tooltipFormatterFun,ylabelsFormatterFun,tipFlag,_rotation) {	
	_rotation = _rotation != undefined ? _rotation : 0;
	var tipformatter = function() {
			return '<b>' + this.series.name + '</b><br/>'
			+ this.y;
		};
	tipformatter = tooltipFormatterFun==null?tipformatter:tooltipFormatterFun;
	
	var ylabformatter = function() {
		return this.value;
	};
	ylabformatter = ylabelsFormatterFun==null?ylabformatter:ylabelsFormatterFun;
	var imageURL = context_path + "/images/platform/mainform/WatermarkBig.png";
	chart = new Highcharts.Chart({
		exporting : {enabled:false},
		chart : {
			renderTo : renderToId,
			plotBackgroundImage : imageURL,
			defaultSeriesType : seriesType,
			plotBorderWidth: (series==""||series==null||series=='undefined')? 0:1
			// margin : [ 50, 50, 100, 80 ]
		},
		title : {
			text : chartTitle,
			style : {
			    color: '#656565',
			    font: 'bold 14px 微软雅黑'
				}
		},
		xAxis : {
			categories : xAxisCategories,
			labels : {
				rotation: _rotation,
				//rotation : -45,
				align : 'right',
				style : {
					font : 'normal 13px Verdana, sans-serif'
				}
			}
		},
		yAxis : {
			min : 0,
			title : {
				text : yAxisTitle
			},
			labels : {
				formatter : ylabformatter
			},
			tickPixelInterval : 40,
			alternateGridColor: 'rgba(247,247,247, .6)'
		},
		tooltip : {
			formatter :  tooltipFormatterFun,
			crosshairs: tipFlag,
            shared: tipFlag
		},
		legend :{
			enabled:false,
			itemHoverStyle : {
				color : "#3E576F",
				cursor : "default"
			}
		},
		series : series
	});
	
	if(series==""||series==null||series=='undefined'){
        $("#"+renderToId).css({"position": "relative"});
        $("#"+renderToId).prepend("<div id='"+renderToId+"NoData' class='noData'><span>暂无数据</span></div>");
        $("#"+renderToId+"NoData").css({"left":$("#"+renderToId).width()/2-$("#"+renderToId+"NoData").width()/2,"top": $("#"+renderToId).height()/2-$("#"+renderToId+"NoData").height()/2});
	}

	B$.globalAdd("Chart", chart, renderToId);
	
}

//创建空图表
function makeChartLoading(chartName,chartDivId,message){
	var imageURL = context_path + "/images/platform/mainform/WatermarkBig.png";
	//创建一个空图表
	// Create the chart
	chart = new Highcharts.Chart({
		chart: {
			renderTo: chartDivId, 
			plotBackgroundImage : imageURL,
			plotBorderWidth:0,
			type: 'column'
		},
		exporting : {enabled:false},
	    title: { 
	        text: chartName, //主标题
	        x: -20,           //标题相对位置  默认居中
	        style : {
	        	 color: '#656565',
				 font: 'bold 14px 微软雅黑'
			}
	    }
	});
	$("#"+chartDivId).prepend("<div  id='no-data-show' style='width:100%; z-index: 20;position: absolute; padding-left: 36%; padding-top: 9%'><span style='font-weight: 600;color: #555555; font-size: 24px'>"+message+"</span></div>");
}

/**
 * 图表封装方法
 * 
 * @param renderToId
 *            图表被渲染到的div-id
 * @param seriesType
 *            图表类型：line、column等
 * @param chartTitle
 *            图表名称(显示在图表的顶部)
 * @param xAxisCategories
 *            图表x轴显示的元素名称数组：[ 'Tokyo', 'Jakarta', 'New York', ..]
 * @param yAxisTitle
 *            图表y轴显示的名称
 * @param series
 *            例如：[{name: 'PV(浏览量)',data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5]},
 *            {name: 'UV(访问量)',data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.05]}]
 * @param tooltipFormatterFun
 *            提示格式化函数
 * @param  tipFlag 
 *            单点提示还是多点提示 true-多点提示，null-单点提示       
 *  @param           signalColor   第二个y轴的颜色
 */
var chart;
function doHighChartTwoYAxis(renderToId, seriesType, chartTitle, xAxisCategories,
		yAxisTitle, series, tooltipFormatterFun,ylabelsFormatterFun,tipFlag,signalColor,y2Name,_rotation) {
	_rotation = _rotation != undefined ? _rotation : 0;
	var columnwidth=40;
	if( xAxisCategories && xAxisCategories.length){
		if(xAxisCategories.length <= 10){
			columnwidth = 40;
		} else if(xAxisCategories.length <= 20 && xAxisCategories.length > 10){
			columnwidth = 25;
		} else if(xAxisCategories.length > 20){
			columnwidth = 18;
		}
	}
	var tipformatter = function() {
			return '<b>' + this.series.name + '</b><br/>'
			+ this.y;
		};
	
	tipformatter = tooltipFormatterFun==null?tipformatter:tooltipFormatterFun;
	
	//双轴支持各自的formatter
	var ylabformatter1 = function() {
		return this.value;
	};
	var ylabformatter2 = ylabformatter1;
	if(ylabelsFormatterFun !==null && isArray(ylabelsFormatterFun) && ylabelsFormatterFun.length > 0 ){
		ylabformatter1 = ylabelsFormatterFun[0];
		ylabformatter2 = ylabelsFormatterFun[1];
	}
	var imageURL = context_path + "/images/platform/mainform/WatermarkBig.png";
	chart = new Highcharts.Chart({
		exporting : {enabled:false},
		chart : {
			renderTo : renderToId,
			plotBackgroundImage : imageURL,
			zoomType: 'xy',
			plotBorderWidth: (series==""||series==null||series=='undefined')? 0:1
		},
		title : {
			text : chartTitle,
			style : {
			    color: '#656565',
			    font: 'bold 14px 微软雅黑'
				}
		},
		xAxis : {
			categories : xAxisCategories,
			labels : {
				rotation : _rotation,
				align : 'right',
				style : {
					font : 'normal 13px Verdana, sans-serif'
				}
			}
		},
		yAxis : [{
			min : 0,
			title : {
				text : yAxisTitle,
				rotation:0
			},
			labels : {
				formatter : ylabformatter1
			}},{
			min : 0,
			title : {
				text : eval(y2Name),
				rotation:0,
				enabled:"middle",
				 style: {
                    color: eval(signalColor)
                }
			},
			labels : {
				formatter : ylabformatter2,
				 style: {
                    color: eval(signalColor)
                }
			},
			opposite: true,
			alternateGridColor: 'rgba(247,247,247, .6)'
		}],
		tooltip : {
			formatter :  tooltipFormatterFun,
			crosshairs: tipFlag,
            shared: tipFlag,
            useHTML: true
		},
		legend :{
			enabled:false,
			itemHoverStyle : {
				color : "#3E576F",
				cursor : "default"
			}
		},
		plotOptions: {
			column: {
				pointWidth: columnwidth
			}
		},
		series : series
	});
	// 屏蔽点击图例折线隐藏事件
	/*$(chart.series).each(function(i){
		chart.series[i].legendItem.on('click',function(e){ //legend上click事件
		});
	});*/
	
	if(series==""||series==null||series=='undefined'){
        $("#"+renderToId).css({"position": "relative"});
        $("#"+renderToId).prepend("<div id='"+renderToId+"NoData' class='noData'><span>暂无数据</span></div>");
        $("#"+renderToId+"NoData").css({"left":$("#"+renderToId).width()/2-$("#"+renderToId+"NoData").width()/2,"top": $("#"+renderToId).height()/2-$("#"+renderToId+"NoData").height()/2});
    }
	
	B$.globalAdd("Chart", chart, renderToId);
}

function isArray(value){
	if (value instanceof Array ||
			(!(value instanceof Object) &&
			(Object.prototype.toString.call((value)) == '[object Array]') ||
			typeof value.length == 'number' &&
			typeof value.splice != 'undefined' &&
			typeof value.propertyIsEnumerable != 'undefined' &&
			!value.propertyIsEnumerable('splice'))) {
			return true;
		}else{
			return false;
		}
}
function doHighChart_xyChart(renderToId,chartTitle, xAxisCategories,series,tipformatter,ylabformatter) {	
	var imageURL = context_path + "/images/platform/mainform/WatermarkBig.png";
	var columnwidth=22;
	if( xAxisCategories && xAxisCategories.length){
		var xlength=xAxisCategories.length;
		if(xlength <= 12){
			columnwidth = 30;
		}else if(xlength>12&&xlength<=24){
			columnwidth = 22;
		}else{
			columnwidth=15;
		}
	}
	var chart = new Highcharts.Chart({
		exporting : {enabled:false},
		chart: {
			renderTo: renderToId,
			plotBackgroundImage : imageURL,
			zoomType: 'xy',
			plotBorderWidth: (series==""||series==null||series=='undefined')? 0:1
		},
		title: {
			text: chartTitle,
			style : {
			    color: '#656565',
			    font: 'bold 14px 微软雅黑'
				}
		},
		xAxis: {
			categories: xAxisCategories
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			},
			labels : {
				formatter : ylabformatter
			},
			stackLabels: {
				enabled: true,
				style: {
					//fontWeight: 'bold',
					color:'#CC3300'
				},
				formatter:function() {
		            return CommaFormatted(format_number(this.total,0));
		        }
			},
			tickPixelInterval : 40,
			alternateGridColor: 'rgba(247,247,247, .6)'
		},
		legend: {
			enabled:false,
			itemHoverStyle : {
				color : "#3E576F",
				cursor : "default"
			}
		},
		tooltip: {
			formatter: tipformatter,
			crosshairs: true,
            shared: true
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				pointWidth: columnwidth,
				dataLabels: {
					enabled: true,
					formatter: function() {
						//return CommaFormatted(this.y);
						return "";
					}
				}
			}
		},
		series: series
	});
	// 屏蔽点击图例折线隐藏事件
	/*$(chart.series).each(function(i){
		chart.series[i].legendItem.on('click',function(e){ //legend上click事件
		});
	});*/
	
	if(series==""||series==null||series=='undefined'){
        $("#"+renderToId).css({"position": "relative"});
        $("#"+renderToId).prepend("<div id='"+renderToId+"NoData' class='noData'><span>暂无数据</span></div>");
        $("#"+renderToId+"NoData").css({"left":$("#"+renderToId).width()/2-$("#"+renderToId+"NoData").width()/2,"top": $("#"+renderToId).height()/2-$("#"+renderToId+"NoData").height()/2});
	}

	B$.globalAdd("Chart", chart, renderToId);
}

function changeQuickButtonStyle(_id){
	// 恢复上次点击过的快速查询按钮的的样式
	$(".InputQuickSel2").addClass('InputQuickSel');
	$(".InputQuickSel2").removeClass('InputQuickSel2');
	// 设置本次点击过的快速查询按钮的的样式
	$("#"+_id).removeClass('InputQuickSel');
	$("#"+_id).addClass('InputQuickSel2');
}

/**
 * 无数据不打印和输出图片,需要在export.js前加载
 */
function nodataValid(){
	var dataFlag = true;
	var _obj = document.all ? event.srcElement : arguments.callee.caller.arguments[0].target; //ie支持event，其他的为target(FF,GOOGLE通过)
	if(($(_obj).parents(".tab_content")[0]!=undefined&&$(_obj).parents(".tab_content")[0]!=null)
		&& ($(_obj).parents(".tab_content").find("#no-data-show").length > 0)){
		alert("用户数据为空！");
		dataFlag = false;
	}
	return dataFlag;
}

/** 根据指标名称获取指标对应的数据精度位数
 * @param allDetailZBs 详细指标信息
 * @param zbName 指标名称
 */
function getZBDecimal(allDetailZBs,zbName){
	for (var attr in allDetailZBs) {
		if(allDetailZBs[attr].value==zbName){
			return allDetailZBs[attr].decimal;
		}
	}
}

function getZBItemInfo(allDetailZBs,zbName){//
	for (var attr in allDetailZBs) {
		if(allDetailZBs[attr].value==zbName){
			return allDetailZBs[attr];
		}
	}
}

/**
 * 日期格式化<br>
 * 将 2012-02-22格式化成：2012年02月22日<br>
 * OR 2012-02格式化成：2012年02月<br>
 * OR 2012-9903格式化成：2012年第3周<br>
 * OR 传入的日期非上面两种格式的，视为点击了快速查询，直接返回<br>
 * @param dateStr 要格式化的日期，格式:2012-02-22 or 2012-02 or 近3天
 * @returns {String}
 */
function formateDate(dateStr){
	var temstr="";
	if(dateStr.length==10){
		temstr = dateStr.substr(0,4)+ "年"+ dateStr.substr(5, 2)+ "月"+ dateStr.substr(8, 2)+ "日";
	}else if(dateStr.length==7){
		temstr = dateStr.substr(0,4)+ "年"+ dateStr.substr(5, 2)+ "月";
	}else if(dateStr.length==8&&dateStr.substr(4, 2)=="99"){
        temstr = dateStr.substr(0,4)+ "年"+ dateStr.substr(6, 2)+ "周";
    }else if(dateStr.length==9){
        temstr = dateStr.substr(0,4)+ "年"+ dateStr.substr(7, 2)+ "周";
    }else{
		// 日期格式不对,直接返回,用于支持快速查询展示日期:近3天、近7天、近15天等
		temstr=dateStr;
	}
	return temstr;
}
function formateDateNew(dateStr){
	var temstr="";
	dateStr=(dateStr+"").replace(/-/g, "");
	if(dateStr.length==8){
		temstr = dateStr.substr(0,4)+ "年"+ dateStr.substr(4, 2)+ "月"+ dateStr.substr(6, 2)+ "日";
	}else if(dateStr.length==6){
		temstr = dateStr.substr(0,4)+ "年"+ dateStr.substr(4, 2)+ "月";
	}else{
		// 日期格式不对,直接返回,用于支持快速查询展示日期:近3天、近7天、近15天等
		temstr=dateStr;
	}
	return temstr;
}

/**
 * 日期校验
 * @param dateValue:日期信息，格式为:2012-02-23 OR 2012-02
 * @param dateType:日期类型，date-日 month-月
 * @returns {Boolean}
 */
function verifyDate(dateValue,dateType) {
	// yyyy-MM-dd 校验正则表达式
	var regexYMD = new RegExp("^(?:(?:([0-9]{4}(-|\/)(?:(?:0?[1,3-9]|1[0-2])(-|\/)(?:29|30)|((?:0?[13578]|1[02])(-|\/)31)))|([0-9]{4}(-|\/)(?:0?[1-9]|1[0-2])(-|\/)(?:0?[1-9]|1\\d|2[0-8]))|(((?:(\\d\\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))(-|\/)0?2(-|\/)29))))$");
	// yyyy-MM 校验正则表达式
	var regexYM = new RegExp("^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])))$");
	
	var maxDate = ""; // 最大日期
	if(dateType=="date"){
		if (regexYMD.test(dateValue)) {
			if(dateValue.length<10){
				return false;
			}
			maxDate = getDateStr(0);
		}else{return false;}
	}
	else if(dateType=="month"){
		if(regexYM.test(dateValue)){
			if(dateValue.length<7){
				return false;
			}
			maxDate = getMonthStr(0);
		}else{return false;}
	}
	
	/*var arrdate=dateValue.split('-');
	arrdate[1]=arrdate[1].length==1?'0'+arrdate[1]:arrdate[1];
	if(arrdate.length==3){
		arrdate[2]=arrdate[2].length==1?'0'+arrdate[2]:arrdate[2];
	}
	dateValue = arrdate.join('-');*/
	
	if(dateValue<=maxDate){
		return true;
	}else{
		return false;
	}
}
/**
 * 提示指标控制
 */
function tipsShow(tar){
    var bRight = false;
	var tipsHtml = '<div class  ="questionBox"><div class="questionBox_top"></div><div class="questionBox_middle"><p></p></div><div class="questionBox_bottom"></div></div>';
	$('body').append(tipsHtml);

	var thisTop = $(tar).offset().top,
	thisLeft = $(tar).offset().left,
    thisWidth = $(".questionBox")[0].offsetWidth,
    wndWidth = $(window).width();
	$('.questionBox').find('p').html($(tar).find('a').text());

    if((Number(thisLeft)+Number(thisWidth))>=wndWidth){
        $('.questionBox').css({"top":thisTop+16,"left":thisLeft-thisWidth+50})
            .stop(true).animate({opacity: '0.7'}, 200);
        $('.questionBox_top').addClass("r");
    }else{
        $('.questionBox').css({"top":thisTop+16,"left":thisLeft+20})
            .stop(true).animate({opacity: '0.7'}, 200);
        $('.questionBox_top').removeClass("r");
    }
}
function tipsHide(){
	$('.questionBox').remove();
}
/**
 * 提示用于表格数据，图标在后面
 */
function tipShow(tar){
    var tipsHtml = '<div class  ="questionBox"><div class="questionBox_top"></div><div class="questionBox_middle"><p></p></div><div class="questionBox_bottom"></div></div>';
    $('body').append(tipsHtml);
    thisTop = $(tar).offset().top;
    thisLeft = $(tar).offset().left;
    $('.questionBox').find('p').html($(tar).attr("desc"));
    $('.questionBox').css({"top":thisTop+16,"left":thisLeft-20})
        .stop(true).animate({opacity: '0.7'}, 200);
}
function tipHide(){
    $('.questionBox').remove();
}


/**
 * 列表条目上弹出Title
 * @param tar
 */
function tipTitle(tar){
//	/*
//	 * add pic
//	 */
//	var tipsHtml = '<div class="questionBox"><div class="questionBox_top"></div><div class="questionBox_middle tipPic"><img src="'+B$.constants.Path.TIPPIC+'/g10/M00/0B/1E/rBEQWVFG7IQIAAAAAAGoqUju5kQAACVeQNy510AAajB857.jpg"><p></p></div><div class="questionBox_bottom"></div></div>';
	var tipsHtml = '<div class="questionBox"><div class="questionBox_top"></div><div class="questionBox_middle"><p></p></div><div class="questionBox_bottom"></div></div>';
	$('body').append(tipsHtml);
	thisTop = $(tar).offset().top;		
	thisLeft = $(tar).offset().left;	
	$('.questionBox').find('p').html($(tar).attr("tips"));
	$('.questionBox').css({"top":thisTop+16,"left":thisLeft})
					.stop(true).animate({opacity: '0.7'}, 200);
}

/**
 * 加载指标选择区域
 * @param _json
 * @param _div
 * @param chart_index 图表编号
 * added by daipeng
 * modified by baojun
 */
function doNorm(_json, _div, _on){
	var buf = [];	
	var idx = [];	
	if(_on!="undefined"&&_on!=null&&!_on){
//		buf.push("<div class=\"weekCon\" style=\"line-height: 22px; border-right: 1px solid #D4D4D4; width: 100%\">&nbsp;</div>");
		buf.push("<div style=\"line-height: 25px; display: block; float:left;\"></div>");
		buf.push("<div class=\"fr\"><a class=\"div_norm_print\" id=\"printChart_" + _div + "\" onclick=\"printChart(this.id)\"></a><a class=\"div_norm_download\" id=\"exportChart_" + _div + "\" onclick=\"exportChart(this.id)\"></a></div>");
		$("#" + _div).height(24);			
		var norm = buf.join("");		
		$("#" + _div).html(norm);
	}else{	
		_json = _json?_json:null;		
		if (_json) {		
			try {				
				var rc_norm = ($("#" + _div).attr("rc"))?parseInt("" + $("#" + _div).attr("rc")):10; //默认每行展示10个指标					
				$("#" + _div).addClass("css_norm");
	//				$("&nbsp;&nbsp;<img id=\"img_" + _div + "\" src=\"../../images/others/ico_up.gif\" alt=\"显示/隐藏指标设置\" width=\"17px\" height=\"17px\" style=\"cursor: pointer\" /><span style=\"color: #c75f3e\">指标设置</span>").insertBefore($("#" + _div));
	//				$("#img_" + _div).click(function(){
	//					showHide(_div, this.id);
	//				});
				//buf.push("<span class=\"weekCon\" style=\"line-height: 22px; border-right: 1px solid #D4D4D4; width: 100%\">");
				buf.push("<div style=\"line-height: 25px; display: block; float:left;\">");
				buf.push("<input class=\"ml5 mr5\" id=\"all_subbox_" + _div + "\" type=\"checkbox\" checked /><label class=\"special_1\" for=\"all_subbox_" + _div+"\">全选</label>&nbsp;&nbsp;");			
				buf.push("|");
				var c = 0;			
				for (idx0 in _json) {				
					if (c > 0) {
						buf.push("<span class=\"mr10\">&nbsp;</span>");
						if (c % rc_norm == 0) {
							buf.push("<br/>");
						}
					}	
					idx[c] = _json[idx0][0];				
					buf.push("<input class=\"ml5 mr5\" type=\"checkbox\" id=\"subbox_" + _div + c + "\" name=\"subbox_" + _div + "\" onclick=\"showHideSeries(this.value, this.checked); checkOne(this)\" id=\"" + _json[idx0][0] + "\" value=\"" + (c++) + "\" checked=\"checked\" />&nbsp;");
					buf.push("<label class=\"mr5\" style=\"color: #" + Chart_Color[c-1] + "\" for=\"subbox_" + _div + (c-1) +"\">" + _json[idx0][1] + "</label>");
				}
				buf.push("</div>");
				buf.push("<div class=\"fr\"><a class=\"div_norm_print\" id=\"printChart_" + _div + "\" onclick=\"printChart(this.id)\"></a><a class=\"div_norm_download\" id=\"exportChart_" + _div + "\" onclick=\"exportChart(this.id)\"></a></div>");
				//$("#"+_div).animate({height: "+=" + (idx0/6)*20}, 500);
				$("#" + _div).height(Math.floor(c/rc_norm + (c%rc_norm)>=0?1:0) * 24);		
				var norm = buf.join("");				
				$("#" + _div).html(norm);
				
				$("#all_subbox_" + _div).click(function(){				
					checkAll(_div, "subbox_"+_div, this.checked);
					var obj = this;
					(function(_obj){
						$("#" + _div + " input[name='subbox_" + _div + "']").each(function(){
							showHideSeries(this.value, _obj.checked);
						});						
						
						$("#" + _div + " input[name='subbox_" + _div + "']").eq(0).attr("checked", true);						
						showHideSeries($("#" + _div + " input[name='subbox_" + _div + "']").eq(0).val(), true);						
					})(obj);
				});						
			} 
			catch (err) {					
				return;
			}
		}
		else {
			$("#" + _div).removeAttr("class");
		}
	}
}

/**
 * 显示、隐藏图
 * @param {Object} _idx
 * @param {Object} _bVis
 * added by daipeng
 */
function showHideSeries(_idx, _bVis){	
	if(_idx){
		try{		
			_bVis?chart.series[_idx].show():chart.series[_idx].hide();		
		}catch(err){
//			alert("无数据!");
			return;		
		}	
	}	
}

/**
 * 复选框全选、取消
 * @param {Object} _id
 * @param {Object} _subname
 * @param {Object} _bChecked
 * added by daipeng
 */
function checkAll(_id, _subname, _bChecked){	
	$("#"+_id+" input[name='"+_subname+"']").each(function(){		
		$(this).attr("checked", _bChecked);																						
	});													
}

/**
 * 复选框判断全选/取消
 * @param {Object} _obj
 * added by daipeng
 */ 
function checkOne(_obj){	
	$("#all_"+_obj.name).attr("checked", $("input[name='"+_obj.name+"']").length==$("input[name='"+_obj.name+"']:checked").length);					
}


/**
 * 添加cookie信息
 * @param objName 存储的key
 * @param objValue 存储的value
 * @param objHours 过期时间，按毫秒计算
 */
function addCookie(objName,objValue,objMs){
	var str = objName + "=" + escape(objValue)+";path=/";
	if(objMs > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
		var date = new Date();
		date.setTime(date.getTime() + objMs);
		str += ";domain=.360buy.com;expires=" + date.toGMTString();
	}
	document.cookie = str;
}

/**
 * 获取cookie信息
 * @param objName cookie-key
 * @returns cookie-value
 */
function getCookie(objName){
	try{
		if(document.cookie.length) {
			var c_start = document.cookie.indexOf(objName + '=');
			if(c_start !== -1) {
				c_start = c_start + objName.length + 1;
				var c_end = document.cookie.indexOf(';', c_start);
				if(c_end === -1) {
					c_end = document.cookie.length;
				}

				var op = document.cookie.substring(c_start, c_end).replace(/[+]/g, '%20');
				return decodeURIComponent(op);
			}
		}
	}catch(e){
		alert("err"+e);
		return "";
	}
}

/***
 * 重写print方法
 */
function printG(){
	window.print();
}

/**
 * 按下标导出图
 * @param id
 */
function exportB(id){//外置导出图片按钮,按钮id命名规则,exportB_+数字  从0开始
	var index = (id.indexOf("_")>-1) ? id.substring(id.indexOf("_")+1) : 0;
	//没有数据边框值为0，有数据边框值为1
	if(B$.charts[index].options.chart.plotBorderWidth == 0){
		alert("用户数据为空！");
	}else{
        B$.charts[index].exportChart({type:"image/jpeg"});
	}
}

/**
 * 按下标打印图片
 * @param id
 * 暂不用
 */
function printB(id){//外置打印图片按钮,按钮id命名规则,printB_+数字  从0开始
	var index = (id.indexOf("_")>-1) ? id.substring(id.indexOf("_")+1) : 0;
	if(B$.charts[index].options.chart.plotBorderWidth == 0){
		alert("用户数据为空！");
	}else{
        B$.charts[index].print();
	}
}

/**
 * 打印图片
 * @param _id
 */
function printChart(_id){	
	var beId = $("#"+_id.substr(_id.indexOf("_")+1)).attr("be");
	//没有数据边框值为0，有数据边框值为1
	if(B$.charts[beId].options.chart.plotBorderWidth == 0){
		alert("用户数据为空！");
	}else{
        B$.charts[beId].print();
	}
}

/**
 * 导出图片
 * @param _id
 */
function exportChart(_id){	
	var beId = $("#"+_id.substr(_id.indexOf("_")+1)).attr("be");
	//没有数据边框值为0，有数据边框值为1
	if(B$.charts[beId].options.chart.plotBorderWidth == 0){
		alert("用户数据为空！");
	}else{
        B$.charts[beId].exportChart({type:"image/jpeg"});
	}
}

/**
 * 
 * @param _chart_global chart_global 数组
 * @param _chart 新生成的图表
 * @param _div 渲染div ID
 * 暂不用
 */
function chart_global_Operation(_chart_global, _chart, _div){
	//先循环chart_global，里边是否有当前div的渲染，如果有则替换，无则push
	var hasCurrentDiv=false;
	for(var n=0;n<_chart_global.length;n++){
		//alert(_div[1] +"****"+chart_global[n].options.chart.renderTo);
		if(_div == _chart_global[n].options.chart.renderTo){
			_chart_global.splice(n,1,_chart);
			hasCurrentDiv=true;
			break;
		}
	}
	
	if(!hasCurrentDiv){
		_chart_global.push(_chart);
	}
	return _chart_global;
}

/**
 * 显示、隐藏图
 * @param {Object} _idx
 * @param {Object} _bVis
 */
function showSeries(_idx, _bVis, _id,_vSeries){
	var beId = $("#"+_id).attr("be");	
	
	if(_idx){
		try{	
			if($("#all_subbox_" + _id)[0].checked==false){
				var _vSeriesStr=_vSeries.join(",");
				if(_vSeriesStr.indexOf(_idx)!=-1){
                    B$.charts[beId].series[_idx].hide();//先隐藏，稍后显示
				}else{
                    B$.charts[beId].series[_idx].hide();
				}
			}else{
				_bVis?B$.charts[beId].series[_idx].show():B$.charts[beId].series[_idx].hide();
			}
		}catch(err){
			//alert("无数据!");
			return;		
		}	
	}	
}

function showSeriesOld(_idx, _bVis, _id){
	var beId = $("#"+_id).attr("be");	
	if(_idx){
		try{	
			_bVis?B$.charts[beId].series[_idx].show():B$.charts[beId].series[_idx].hide();
			
		}catch(err){
			return;
		}	
	}	
}

/*
 * 判断日期范围，结束日期是否大于开始日期
 * @beginDate 开始日期
 * @endDate 结束日期
 */
function dateRangeCheck(beginDate,endDate){
	 var beginArray= new Array();      
	 var endArray= new Array();     
	 beginArray=beginDate.split('-');      
     var sdate=new Date(beginArray[0],parseInt(beginArray[1]-1),beginArray[2]);      
     endArray=endDate.split('-');      
     var edate=new Date(endArray[0],parseInt(endArray[1]-1),endArray[2]);      
	 if(sdate > edate) {      
	   return false;         
	 }else{
	   return true;
	 }
}

/*
 * 验证时间，时间区段不能跨度超一个月 
 * @startId 开始日期控件id  
 * @endId 结束日期控件id
 */
function verifyPeriod(startId,endId){
	var start = $("#"+startId).val();
	var end = $("#"+endId).val();
	if(start == "" || end == "" ){
		alert("起始日期不能为空！");
		return false;
	}
	if(!verifyDate(start,"date")){
		setTimeout(function(){
			alert('开始日期不合法，请重新输入!');
			$("#"+startId).focus();
			},1);
		return false;
	}
	if(!verifyDate(end,"date")){
		setTimeout(function(){
			alert('结束日期不合法，请重新输入!');
			$("#"+endId).focus();
			},1);
		return false;
	}
	var startArr = start.split("-");
	var endArr = end.split("-");
	var startDate = new Date(startArr[0],startArr[1],startArr[2]);//实际开始日期大一月
	var endDateReal = new Date(endArr[0],endArr[1]-1,endArr[2]);//实际结束日期
	var endDate =  new Date(endArr[0],endArr[1],endArr[2]);//实际结束日期大一月
	if(endDateReal >= startDate){
		alert("结束日期不能超过开始日期一个月");
		return false;
	}
	if(endDate < startDate){
		alert("结束日期不能小于开始日期");
		return false;
	}
	return true;
}


/*
 * 验证时间，时间区段不能跨度超7天
 * @startId 开始日期控件id  
 * @endId 结束日期控件id
 */
function verifyDayRange7(startId,endId){
	var start = $("#"+startId).val();
	var end = $("#"+endId).val();	
	if(start == "" || end == "" ){
		alert("起始日期不能为空！");
		return false;
	}
	if(!verifyDate(start,"date")){
		setTimeout(function(){
			alert('开始日期不合法，请重新输入!');
			$("#"+startId).focus();
			},1);
		return false;
	}
	if(!verifyDate(end,"date")){
		setTimeout(function(){
			alert('结束日期不合法，请重新输入!');
			$("#"+endId).focus();
			},1);
		return false;
	}
	var startArr = start.split("-");
	var endArr = end.split("-");
	var startDate = new Date(startArr[0],startArr[1]-1,startArr[2]);
	var tmpDate = new Date();	
	tmpDate.setTime(startDate.getTime()+6*24*3600*1000);
	var endDate =  new Date(endArr[0],endArr[1]-1,endArr[2]);
	
	if(endDate > tmpDate){
		alert("结束日期不能超过开始日期7天");
		return false;
	}
	if(endDate < startDate){
		alert("结束日期不能小于开始日期");
		return false;
	}
	return true;
}

/**
 * 调用ajax查询数据
 * @param _url 
 * @param _params 传递参数
 * @param _callBack 
 * 用以取代每个模型js里边的doLocalQuery方法
 */
function doAjaxQuery(_url,_params,_callBack){
	showLoadingV2(5);
	query(_url, _params,_callBack);
}
/**
 * 60秒延时遮罩 慎用
 * @param _url
 * @param _params
 * @param _callBack
 */
function doLongTimeAjaxQuery(_url,_params,_callBack){
	showLoadingV2(60,true);
	query(_url, _params,_callBack);
}

function doAjaxQueryNoCover(_url,_params,_callBack){
	query(_url, _params,_callBack);
}

function query(url, params,callback) {
	$.ajax({
		url : url,
		type : "post",
		dataType : "json",
		data : params,
		success : callback,
        complete: function(XMLHttpRequest, textStatus) {
        	if(XMLHttpRequest.getResponseHeader("ReloginLocation")){
        		window.location.href=XMLHttpRequest.getResponseHeader("ReloginLocation");
        	}
        },
		error :  function(XMLHttpRequest, s, errorThrown) {
            if(XMLHttpRequest.readyState!=0){
            	if(s=="timeout"){
 				   // 请求超时
 				}else{ 				   // 请求发生异常
 					if(errorThrown==""){
 						
 					}else{
 						window.location.href = context_path + "/exception.jsp";
 					}
 				}
            }
        }

	});
}

/**
* 	饼图渲染公用方法
*	@_divId 渲染层id
* 	@_chartTitle图表标题
*	@_data 数据字符串
*	@_tipformatter 提示格式化函数
*	@_flag 数据标识  true为有数，false为空数据
*	@_legendLocation 数组 legend的位置
*/
function renderPieChart(_divId,_chartTitle,_dataArray,_tipformatter,_flag,_legendLocation){
	var chart = doPieChart(_divId,_chartTitle,_dataArray,_tipformatter,_flag,_legendLocation);
	if(!_flag){
        $("#"+_divId).css({"position": "relative"});
        $("#"+_divId).prepend("<div id='"+_divId+"NoData' class='noData'><span>暂无数据</span></div>");
        $("#"+_divId+"NoData").css({"left":$("#"+_divId).width()/2-$("#"+_divId+"NoData").width()/2,"top": $("#"+_divId).height()/2-$("#"+_divId+"NoData").height()/2});
	}
	B$.globalAdd("Chart", chart, _divId);
}
function doPieChart(_divId,_chartTitle,_data,_tipformatter,_flag,_legendLocation){
	Highcharts.setOptions({  //设置饼块颜色.
	    colors: ["#99cc33","#FF9933","#006633","#990066","#3399CC","#003399","#336600"]
	});
	var imageURL = context_path + "/images/platform/mainform/WatermarkBig.png";
	var chart = new Highcharts.Chart({ 
        chart: {  //整体控制
            renderTo: _divId, //图表容器
            plotBackgroundImage : imageURL,
            plotBorderWidth:_flag?1:0,
            plotBorderColor:'#ffffff',
            defaultSeriesType: 'pie', //可选，默认为line【line:折线;spline:平滑的线;area:区域图;bar:曲线图;pie:饼图;scatter:点状图等等;
            marginRight: 10, //外边距控制 (上下左右空隙)
            marginBottom: 10 //外边距控制
        }, 
        exporting : {enabled:false},
        title: { 
            text: _chartTitle, //主标题
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
        tooltip: {
        	formatter :  _tipformatter
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
            enabled:false,
            x: _legendLocation&&_legendLocation[0]?_legendLocation[0]:210,
            y: _legendLocation&&_legendLocation[1]?_legendLocation[1]:140,
            //floating: true,
            shadow: false,
            /*itemHoverStyle : {
            	color : "#3E576F",
				cursor : "default"
			},*/
             width : 60//,
            // itemWidth: 210
        },
		series: [{
			type: 'pie',
			name: '访问频次占比',
			//data: _dataArray
			data:eval(_data)
		
		}]
    }); 
	B$.globalAdd("Chart", chart, _divId);
	return chart;
}

/***京东实验室相关js***/
//评论弹出
function popComment(obj){
	$(obj).mBox({
		write:true,
		submit:submitComment
	});
}
//提交评论
function submitComment(){
	var comment = $(".mBox .area").val().trim();
	if(comment == "" || comment == "请输入内容"){
		B$.T.alert("请输入评论内容！");
	}else{
		var url_submit = context_path+"/advancedDataModel/persistLabComment.action";
		var params_submit = "filter.pageCode="+B$.menuCfg.Id+"&filter.comment="+comment;
		var replay = function(){
			B$.T.success("提交成功。");
		};
		doAjaxQuery(url_submit,params_submit,replay);
	}
}
//喜好
var likeAttr = {"0": [1, "favor", "喜欢"], "1": [0, "dislike", "不喜欢"]};
function attitude(obj){
	var val = ""+$(obj).attr("value"); 
	var url_submit = context_path+"/advancedDataModel/persistLabLike.action";
	var params_submit = "filter.pageCode="+B$.menuCfg.Id+"&filter.like="+val;
	var likeBar = [];$('.labr-bar:eq(0) .fl').html("");
	var replay = function(){
//		B$.T.success("提交成功。");
//		$(obj).attr("value", likeAttr[val][0]);
//		$(obj).removeClass().addClass(likeAttr[val][1]);
//		$(obj).text(likeAttr[val][2]);	
								
		likeBar.push('<a class="'+likeAttr[val][1]+'" href="javascript: void(0);" onclick="attitude(this);" value="'+likeAttr[val][0]+'">'+likeAttr[val][2]+'</a>');
			
		$('.labr-bar:eq(0) .fl').html(likeBar.join(""));
	};
	doAjaxQuery(url_submit,params_submit,replay);
}

/**
 * 1st loading attitude
 */
function loadAttitude(_menuId){	
	var attiUrl = context_path+"/advancedDataModel/getPageLikeResult.action",tmpLike;	
	var likeBar = [], commentBar = [];$('.labr-bar:eq(0) .fl').html("");$('.labr-bar:eq(0) .fr').html("");
	$.ajax({           
		url : attiUrl,
		type : "post",
		dataType : "json",
		data : "filter.pageCode="+_menuId,
		success : function(result){			
			var detail = eval("("+result.resultData+")").detail;
			if(!!detail&&detail.length==1){
				tmpLike = ""+detail.like.value[0];
			}else{
				tmpLike = null;
			}				
			if(tmpLike!=null){				
				likeBar.push('<a class="'+likeAttr[tmpLike][1]+'" href="javascript: void(0);" onclick="attitude(this);" value="'+likeAttr[tmpLike][0]+'">'+likeAttr[tmpLike][2]+'</a>');
			}else{				
				likeBar.push('<a class="favor" href="javascript: void(0);" onclick="attitude(this);" value="1">喜欢</a>');
				likeBar.push('<a class="dislike"  href="javascript: void(0);" onclick="attitude(this);" value="0">不喜欢</a>');
			}	
			
			commentBar.push('<a class="comment" href="javascript: void(0);" onclick="popComment(this);">评论</a>	');
					
			$('.labr-bar:eq(0) .fl').html(likeBar.join(""));
			$('.labr-bar:eq(0) .fr').html(commentBar.join(""));
		},
		error :  function(XMLHttpRequest, s, errorThrown) {
            if(XMLHttpRequest.readyState!=0){
            	if(s=="timeout"){
 				   // 请求超时
 				}else{
 				   // 请求发生异常
 				   window.location.href = context_path + "/exception.jsp";
 				}
            }
        }
	});	
}

/**
 * load pics of products' details
 * @param _allIds whole products' ids
 * @param _perBatch  ids' length of every batch
 * @param _total  total number products' ids
 * @param _callback  callback function for calling
 */
function loadPic(_allIds, _total, _callback){
	B$.cache.add({"dPic": {}});
	B$.cache.clr("dPic");
	var perBatch = B$.constants.Picture.PERBATCH;
    if(_total>0){
        if(_total>perBatch){
            for(var i=0,len=_total/perBatch;i<len;i++){
                ajaxPic(_allIds.slice(i*perBatch,(i+1)*perBatch), _callback);
            }
            ajaxPic(_allIds.slice(-_total%perBatch), _callback);
        }else{
            ajaxPic(_allIds, _callback);
        }
    }
}

/**
 * interact with the background by ajax
 * @param _ids products' ids
 */
function ajaxPic(_ids, _callback){
	var bMulti = $.jIsArray(_ids);
    if(!bMulti){
        _ids = isNaN(_ids)?0:_ids;
    }
	var picUrl = context_path + (bMulti?"/getProductImageHrefList.action":"/getProductImageHref.action")
	,picParam = bMulti?"productNumStr="+_ids.join(","):"productNum=" + _ids;
	$.ajax({
		url : picUrl,
		type : "post",
		dataType : "json",
		data : picParam,
		success: function(result){
			var json,imgRoot;
			if(bMulti){
				json = eval("("+result.imageHrefList+")"),imgRoot = B$.constants.Path.DETAILPIC;
				var hrefs = !!json.ImageHref?json.ImageHref.value:[], pros = !!json.ProNum?json.ProNum.value:[];
				for(var i in hrefs){
                    if(hrefs[i]==""){
                        B$.cache.set(pros[i], "", "dPic");
                    }else{
					    B$.cache.set(pros[i], imgRoot+hrefs[i], "dPic");
                    }
				}
				_callback(B$.cache.get("dPic"));
			}else{
				imgRoot = B$.constants.Path.SUMMARYPIC;
                if(result.imageHref==""){
                    B$.cache.set("sPic", "");
                }else{
                    B$.cache.set("sPic", imgRoot+result.imageHref);
                }
				_callback(B$.cache.get("sPic"));
			}
		},
		error :  function(XMLHttpRequest, s, errorThrown) {
            if(XMLHttpRequest.readyState!=0){
            	if(s=="timeout"){
 				   // 请求超时
 				}else{
 				   // 请求发生异常
 				   window.location.href = context_path + "/exception.jsp";
 				}
            }
        }
	});	
}

/*
 * 每个模块页面加载通知
 */
function loadModuleNotice(pageCode){
	var url = context_path+"/advancedDataModel/getNoticeResult.action";
	var param = "filter.pageCode="+pageCode;
	doAjaxQueryNoCover(url,param,showModuleNotice);
} 

function showModuleNotice(result){
	var json = eval(result);
	var resultData = eval("("+json.resultData+")");
	if(resultData!=undefined && resultData.length!=undefined && resultData.length>0 && $.jTrim(resultData.message.value[0])!=""){
        $("#moduleNotice").html('<span class="fl"><i></i><label></label></span><span class="close"><label>×</label></span>');
		$("#moduleNotice span.fl label").text("说明："+resultData.message.value[0].replace("说明：",""));
        $("#moduleNotice").show();
	}else{
		var text = $.jTrim($("#moduleNotice span.fl label").text());
		
		if(text==""){//如果原div有文字则不隐藏,否则隐藏,因为div设置了高度
			$("#moduleNotice").hide();
		}else{
            $("#moduleNotice").html('<span class="fl"><i></i><label></label></span><span class="close"><label>×</label></span>');
            $("#moduleNotice span.fl label").text("说明："+text.replace("说明：",""));
            $("#moduleNotice").show();
        }
	}
    $("#moduleNotice").find(".close").die("click");
    $("#moduleNotice").find(".close").live("click", function(){
        $("#moduleNotice").hide();
    });
}

/**
 * 加载系统通知
 */
function loadSystemNotice(pageCode){
	var url = context_path+"/advancedDataModel/getSystemResult.action";
	doAjaxQueryNoCover(url,"",showSystemNotice);
} 
/**
 * 上面有一个getCookie(n)了
 * @param name
 * @returns
 */
function getCookiefn(name){
	var arrCookie = document.cookie.split(";");
	for(var i=0;i<arrCookie.length;i++){
		var arr = arrCookie[i].split("=");
		var cookieName = arr[0];
		cookieName = cookieName.trim();
		if(name == cookieName){
			return unescape(arr[1]);
		}
	} 
	return undefined;
}
function setCookie(name,value,timestamp){
	if(timestamp != undefined){
		var exp = new Date();
	    exp.setTime(exp.getTime() + timestamp);
	    var path = "/";
	    var domain = ".jd.com";
		document.cookie = name+'='+escape(value)+";expires=" + exp.toGMTString() + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '' );
		return;
	}
	document.cookie = name+'='+escape(value); 
}

var noticeComment_Array = new Array();
function showSystemNotice(result){
	function showFirstNotice(title,message,code,link){
		if(message.length >60){
			message = message.substring(0,60) + "...";
		}
		var cookieName = "_sysNoticeClose";
		if(getCookiefn(cookieName)!= undefined){return;}
		var buf = [];
		buf.push('<div id="sysNoticeDiv" style="min-height:30px;background-color:#fafafa;');
		buf.push('border-bottom:1px solid #e7e6e6;line-height:30px;');
		buf.push('padding:2px 5px 2px 20px;font-size:12px;color:#4e4e4e;">');
		buf.push('<span><img src="'+context_path+'/skin/i/icon_notice.png"/></span>');
		buf.push("<span style='margin-left:8px;color:#000000;font-weight:bold'>"+title+"：</span>");
		buf.push('<a id=\'sysNoticeLink\' target=\'_blank\' href=\'#\' onclick=\'showSystemNoticeDtl("'+code+'","'+link+'")\'>'+removeHTMLTag(message)+'</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		buf.push('<span style="margin-left:8px;color:#48A7E7;cursor: pointer;"');
		buf.push('      onClick="setCookie(\''+cookieName+'\',1,60*60*1000);$(this).parent().hide();">我知道了</span>');
		buf.push('</div>');
		$("#container").find('#main').before(buf.join(''));
	}
	var json = eval(result);
//	showFirstNotice('数据延迟公告','显示第一个系统消息显示第一个消息显示个系统消息显示第一个系统消息显示第一个系统消息');//显示第一个系统消息
	var resultData = eval("("+json.resultData+")");
	if(resultData!=undefined && resultData.length!=undefined && resultData.length>0){
		showFirstNotice(resultData.title.value[0],resultData.message.value[0],resultData.menuCode.value[0],resultData.messageLink.value[0]);//显示第一个系统消息
		$("#header").append('<div id="System_Notice"></div>');
		var html = "<div class='notice_container'>";
		for(var i=0;i<resultData.length;i++){
			var title = resultData.title.value[i].replace(/"/g,'\\"');
			var time = resultData.startDate.value[i]+"";
			var content = resultData.message.value[i].replace(/"/g,'\\"');
			noticeComment_Array[title]=content;
			html += "<div class='mt3'>";
			html += "<div class='notice_left'><a href='#' onclick='notice(\""+title+"\",\""+time+"\");'>"+resultData.title.value[i]+"</a></div><div class='notice_right'>"+time+"</div>";
			html += "</div>";
		}
		html += "</div>";
		html += "<div class='hr_nt'><a href='"+context_path+"/common/noticeAll.jsp' target='_blank' class='text_nt'>查看所有公告</a></div>";
		$("#System_Notice").append(html);
		$("#System_Notice").hide();
		/*var btn = $("#noticeButton");
		$("#noticeButton").mouseover(function(){
			$("#System_Notice").show();
		}).mouseleave(function(){
			$("#System_Notice").hide();
		});
		$("#System_Notice").mouseover(function(){
			$("#System_Notice").show();
		}).mouseleave(function(){
			$("#System_Notice").hide();
		});*/
	}
	
	
}

/**
 * 点击系统公告
 */
function showSystemNoticeDtl(menuCode, messageLink){
	if(menuCode == "BBSNotice"){
		$("#sysNoticeLink").attr("href",messageLink);
	}else{
		var noticeAllUrl = context_path+"/common/noticeAll.jsp?notice=notice";
		$("#sysNoticeLink").attr("href",noticeAllUrl);
	}
	$("#sysNoticeLink").click();
}



function notice(title,time){
    var	OpenWindow = window.open("about:blank",'','width=790,height=590'); 
    OpenWindow.document.write("<TITLE>"+title+"</TITLE>"); 
    OpenWindow.document.write("<BODY>"); 
    OpenWindow.document.write("<div style='font-size: 24px;text-align:center;'>"+title+"</div>");
    OpenWindow.document.write("<div style='font-size: 14px;text-align:center;'>"+time+"</div>");
    OpenWindow.document.write("<div style='font-size: 20px;text-indent:2em;'>"+noticeComment_Array[title]+"</div>"); 
    OpenWindow.document.write("</BODY>");
    OpenWindow.document.write("</HTML>");
    OpenWindow.document.close();
}

/*
 * 判断商家是否开通京东快车
 */
function checkIfAuthorized(containerId,content){
	document.getElementById(containerId).innerHTML = content;
}

/**
 * 流量来源描述
 *
 * @param sourceName
 * @returns {string}
 */
function getFlowSourceDesc(sourceName){
    return C$.DESC_FLOWSOURCE[sourceName] == null ? "暂无描述":C$.DESC_FLOWSOURCE[sourceName];
}

/**
 * 流量来源描述
 *
 * @param sourceName
 * @returns {string}
 */
function getMobileFlowSourceDesc(sourceName, mobileType){
	if(mobileType == 1){//M端
	    return C$.DESC_MOBILE_FLOWSOURCE_M[sourceName] == null ? "暂无描述":C$.DESC_MOBILE_FLOWSOURCE_M[sourceName];
	} else if(mobileType == 2){//App
	    return C$.DESC_MOBILE_FLOWSOURCE_APP[sourceName] == null ? "暂无描述":C$.DESC_MOBILE_FLOWSOURCE_APP[sourceName];
	} else if(mobileType == 3 || mobileType == 4){//微信手Q
	    return C$.DESC_MOBILE_FLOWSOURCE_WX[sourceName] == null ? "暂无描述":C$.DESC_MOBILE_FLOWSOURCE_WX[sourceName];
	} else{
		return C$.DESC_MOBILE_FLOWSOURCE_WX[sourceName] == null ? "暂无描述":C$.DESC_MOBILE_FLOWSOURCE_WX[sourceName];
	}
}

/**
 * 针对一下几个特殊的流量来源的详细按钮 返回指定链接
 *
 * @param sourceName
 * @returns {*}
 */
function getDetailURL(sourceName){
    if ("京东搜索" == sourceName ){
        return context_path+"/model/visitKeyWord/visitKeyWord.jsp"
    }else if ("京东快车" == sourceName ){
        return context_path+"/model/kuaicheRealTime/kuaicherealtime.jsp"
    }else if ("网络联盟" == sourceName ){
        return context_path+"/model/adPromotion/adPromotionPlan.jsp"
    }else if ("邮件推广" == sourceName){
        return context_path+"/model/emailEffect/emailEffect.jsp"
    }
    return null;
}

function isShowDetail(sourceName){
    var sourceNames =["京东搜索",
                       "网络联盟","邮件推广",
                        "一级类目","二级类目",
                        "三级类目","站外直接访问",
                        "搜索引擎","导航网站",
                        "比价网站","京东站外邮件",
                        "非京东网盟","新闻媒体",
                        "休闲娱乐"
                      ];
    for( var i = 0 ;i < sourceNames.length ;i++ ){
        if( sourceNames[i] == sourceName ){
            return true;
        }
    }
    return false;
}

function isShowThrdLevel(sourceName){
    var sourceNames =["双十一综合活动","店铺页面","我的京东","搜索","导航","比价","双12三免一活动","超级大促：京喜圣诞","超级大促-京喜圣诞",
		"618综合会场","京东3C","服饰家居","消费品","京东家电","生鲜","京东官方其他活动","频道页","京东搜索","直接访问","商详","京东内部工具","其他免费流量页"];
    for( var i = 0 ;i < sourceNames.length ;i++ ){
        if( sourceNames[i] == sourceName ){
            return true;
        }
    }
    return false;
}

function isShowMobileThrdLevel(sourceId, sourceIdStr){
	var array = new Array();
	if(sourceIdStr != undefined && sourceIdStr != ""){
		array = sourceIdStr.split(",");
		for(var i = 0; i < array.length; i++) {
			if(sourceId == array[i]){
				return true;
			}
		}
	}
    return false;
}

/*
 * 判断一级来源是否显示url详
 */
function isShowUrlDetail(sourceName){
    var sourceNames =["京东社区","双十一综合活动",
                       "京东论坛","京东官方活动",
                        "商家自建活动","频道页",
                        "商品比较","商品图片页",
                        "凑单商品","个人主页",
                        "品牌页","店铺页面",
                        "京东站内其它","京东站外","其它",
                        "站内京东快车","京挑客","京东直投",
                        "京选展位","sem","adx","站外京东快车","双12三免一活动","超级大促：京喜圣诞","超级大促-京喜圣诞",
						"618综合会场","京东3C","服饰家居","消费品","京东家电","生鲜","京东官方其他活动"];
    for( var i = 0 ;i < sourceNames.length ;i++ ){
        if( sourceNames[i] == sourceName ){
            return true;
        }
    }
    return false;
}

/*
 * 判断二级来源是否显示url详
 * 142-店铺首页  143-店铺商品页  144-店铺搜索
 */
function isShowUrlDetailForLevel2(sourceName){
    var sourceNames =["142","143","144","131","133","146","151","152","153","154","155","156","157","158","159","160","161",
		"162","100002","100003","421000401","421000402","421000403","421000404","421000405","421000406","421000407","421000408",
		"421000409","421000410","421000411","421000412","421000413","421000414","421000415","421000416","421000417","421000418",
		"421000419","421000420","421000421","421000422","421000423","421000424",
		"166180101","166180102","166180103","166180104","166180105","166180106","166180107","166180108","166180109","166180110","166180111","166180112","166180113","166180114","166180201","166180202","166180203","166180204","166180205","166180206","166180207","166180208","166180209","166180210","166180211","166180212","166180213","166180214","166180215","166180216","166180217","166180218","166180219","166180220","166180221","166180222","166180223","166180224","166180225","166180226","166180227","166180228","166180229","166180230","166180231","166180232","166180233","166180234","166180235","166180236","166180237","166180238","166180239","166180240","166180241","166180242","166180243","166180244","166180245","166180246","166180247","166180248","166180249","166180250","166180251","166180252","166180301","166180302","166180303","166180304","166180305","166180306","166180307","166180308","166180309","166180310","166180311","166180312","166180313","166180314","166180315","166180316","166180317","166180318","166180319","166180320","166180321","166180322","166180323","166180324","166180325","166180326","166180327","166180328","166180329","166180330","166180331","166180332","166180333","166180334","166180335","166180336","166180337","166180338","166180339","166180340","166180341","166180342","166180343","166180344","166180345","166180346","166180347","166180348","166180349","166180350","166180351","166180352","166180353","166180354","166180355","166180356","166180357","166180358","166180359","166180360","166180361","166180362","166180363","166180364","166180365","166180366","166180367","166180368","166180369","166180370","166180371","166180372","166180373","166180374","166180375","166180376","166180377","166180378","166180379","166180380","166180381","166180382","166180383","166180384","166180385","166180386","166180387","166180388","166180389","166180390","166180391","166180392","166180393","166180394","166180395","166180396","166180397","166180398","166180399",
		"1661803100","1661803101","1661803102","1661803103","1661803104","1661803105","1661803106","1661803107","1661803108","1661803109","1661803110","1661803111","1661803112","1661803113","1661803114","1661803115","1661803116","1661803117","1661803118","1661803119","1661803120","1661803121","1661803122","1661803123","1661803124","1661803125","1661803126","1661803127","1661803128","1661803129","1661803130","1661803131","1661803132","1661803133","1661803134","1661803135","1661803136","1661803137","1661803138","1661803139","1661803140","1661803141","1661803142","1661803143","1661803144","1661803145","1661803146","1661803147","1661803148","1661803149","1661803150","1661803151","1661803152","1661803153","1661803154","1661803155","1661803156","1661803157","1661803158","1661803159","1661803160","1661803161","1661803162","1661803163","1661803164","1661803165","1661803166","1661803167","1661803168","1661803169","1661803170","1661803171","1661803172","1661803173","1661803174","1661803175","1661803176","1661803177","1661803178","1661803179","1661803180","1661803181","1661803182","1661803183","1661803184","1661803185","1661803186","1661803187","1661803188","1661803189","1661803190","1661803191","1661803192","1661803193","1661803194","1661803195","1661803196","1661803197","1661803198","1661803199","1661803200","1661803201","1661803202","1661803203","1661803204","1661803205","1661803206","1661803207","1661803208","1661803209","1661803210","1661803211","1661803212","1661803213","1661803214","1661803215","1661803216","1661803217","1661803218",
		"166180401","166180402","166180403","166180404","166180405","166180406","166180407","166180408","166180409","166180410","166180411","166180412","166180413","166180414","166180415","166180416","166180417","166180418","166180419","166180420","166180421","166180422","166180423","166180424","166180425","166180426","166180427","166180428","166180429","166180430","166180431","166180432","166180433","166180434","166180435","166180436","166180437","166180438","166180439","166180440","166180441","166180442","166180443","166180444","166180445","166180446","166180447","166180448","166180449","166180450","166180451","166180452","166180453","166180454","166180455","166180456","166180457","166180458","166180459","166180460","166180461","166180462","166180463","166180464","166180465","166180466","166180501","166180502","166180503","166180504","166180505","166180506","166180507","166180508","166180509","166180510","166180511","166180512","166180513","166180514","166180601","166180602","166180603","166180604","166180605","166180606","166180607","166180608",
		"410050001","410051001","410051002","410051003","410051004","410051005","410051006","410051007",
		"420061001","420075002","420075003","420075004","420075005","420075006","420075007","420075008",
		"420061009","420075010","420075011","420075012","420075013","420075014","420075015","420075016","420061017","420075018","420075019","420075020",
		"420088001","420001001","420002001","420002002","420002003","420003001","420004001","420005001","420005002","420005003","420005004","420005005","420005006","420005007","420005008","420006001","420006002","420006003","420006004","420006005","420006006","430001001","430002001",
		"161101001","161101002","161101003","161101004","161101005","161101006","161101007","161101008","161101009","161101010","161101011","161101012","161101013","161101014","161101015","161101016","161101017","161101018","161101019","161101020","161101021","161101022","161101023","161101024","161101025","161101026","161101027","161101028","161101029","161101030","161101031","161101032","161101033","161101034","161101035","161101036","161101037","161101038","161101039","161101040","161101041","161101042","161101043","161101044","161101045","161101046","161101047","161101048","161101049","161101050","161101051","161101052","161101053","161101054","161101055","161101056","161101057","161101058","161101059","161101060","161101061","161101062","161101063","161101064","161101065","161101066","161101067","161101068","161101069","161101070","161101071","161101072","161101073","161101074","161101075","161101076","161101077","161101078","161101079","161101080","161101081","161101082","161101083","161101084","161101085","161101086","161101087","161101088","161101089","161101090","161101091","161101092","161101093","161101094","161101095","161101096","161101097","161101098","161101099","161101100","161101101","161101102","161101103","161101104","161101105","161101106","161101107","161101108","161101109","161101110","161101111","161101112","161101113","161101114","161101115","161101116","161101117","161101118","161101119","161101120","161101121","161101122","161101123","161101124","161101125","161101126","161101127","161101128","161101129","161101130","161101131","161101132","161101133","161101134","161101135","161101136","161101137","161101138","161101139","161101140","161101141","161101142","161101143","161101144","161101145","161101146","161101147","161101148","161101149","161101150","161101151","161101152","161101153","161101154","161101155","161101156","161101157","161101158","161101159","161101160","161101161","161101162","161101163","161101164","161101165","161101166","161101167","161101168","161101169","161101170","161101171","161101172","161101173","161101174","161101175","161101176","161101177","161101178","161101179","161101180","161101181","161101182"];
    for( var i = 0 ;i < sourceNames.length ;i++ ){
        if( sourceNames[i] == sourceName ){
            return true;
        }
    }
    return false;
}

/*function showMobileFlowSourceTip(sourceTypeStr, mobileType){
    if (getMobileFlowSourceDesc(sourceTypeStr, mobileType) !=='暂无描述' ){
        return '<i class="icon-help" desc="'+getMobileFlowSourceDesc(sourceTypeStr, mobileType) +'"></i>';
    }else{
        return "";
    }

}*/

function showFlowSourceTip(sourceTypeStr){
    if ( getFlowSourceDesc(sourceTypeStr) !=='暂无描述' ){
        return '<i class="icon-help" desc="'+getFlowSourceDesc(sourceTypeStr) +'"></i>';
    }else{
        return "";
    }

}
//data table 后期加标题及细节调整
//new  TableTitle([{id: tableDivId ,name:'广告结算明细'},{}]);
function TableTitle(arr){
	this.titleArr = arr;
	$(this.titleArr).each(function(i,item){
    	 //$('#'+item.id+'Bar').css({height:'46px',marginBottom:'0px'});
    	 $('#'+item.id+'Bar').append('<div id="'+item.id+'_title" class="bus-tableTitle"><div class="bus-tableTitle-innerTitle fl">'+item.name+'</div></div>');
    	 //$('#'+item.id+'Bar').children(".fr").css({height:'26px',marginTop:'9px',marginRight:'10px'});
    	 $('#'+item.id).find('.dataTables_length').css({marginLeft:'10px',marginTop:'8px'});
    	 $('#'+item.id).find('thead').first().find('th:first').css({borderLeft:'0px'});
    	 $('#'+item.id).find('thead').first().find('th:last').css({borderRight:"0px"});
    	 //适配字段过滤位置
    	 if($('#'+item.id+'Bar').find('.button-slider').length > 0){
	    	 $('#'+item.id+'Bar').find('.bus-tableTitle').append($('#'+item.id+'Bar').find('.button-slider'));
	    	 $('#'+item.id+'Bar').find('.button-slider').css({marginLeft:'10px',marginTop:'8px',fontSize:'12px',fontWeight:'normal'});
    	 }
    });
}

/**
 * getSumZBs(resultData.allSumZBs,["PV","UV","UPV"])
 * @param _allZBs 
 * @param _zbArr
 * @returns {Array} 返回指定的指标数组
 */
function getSumZBs(_allZBs,_zbArr){
	var zbs = new Array();
	$.each(_allZBs,function(i,n){
		if($.inArray(n.id,_zbArr)>=0){
			zbs.push(n);
		}
	});
	return zbs;
}

//显示精准通提示
function showJZTTip(){
	tb_show('','#TB_inline?height=370&width=610&inlineId=jztTip&modal=true',false);
	$("#TB_ajaxContent").css("width","610px");
	$("#TB_ajaxContent").css("height","370px");
	$("#TB_overlay").css("opacity","0.5");
}

function getMonthRange(monthStr, result){
	if(monthStr == "01" || monthStr == "03" || monthStr == "05" || monthStr == "07" || monthStr == "09"){
		result = result + "-31";
	}else if(monthStr == "02"){
		result = result + "-28";
	}else{
		result = result + "-30";
	}
	return result;
}

function checkRapidStatus(endDate){
	var yesterdayStr = getDateStr(-1);
	yesterdayStr = yesterdayStr.replace(/-/g, "");
	var dateCheck = new Date();
	if(parseInt(endDate.replace(/-/g, "")) >= parseInt(yesterdayStr)){
		$("a[desc='后一天']").hide();
    	$("span[desc='后一天_']").show();
	}else{
		$("a[desc='后一天']").show();
    	$("span[desc='后一天_']").hide();
	}
	if( parseInt(endDate.replace(/-/g, "")) >= parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
    	$("a[desc='下一周']").hide();
    	$("span[desc='下一周_']").show();
    }else{
    	$("a[desc='下一周']").show();
    	$("span[desc='下一周_']").hide();
    }
    if( parseInt(endDate.replace(/-/g, "")) >= parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
    	$("a[desc='下一月']").hide();
    	$("span[desc='下一月_']").show();
    }else{
    	$("a[desc='下一月']").show();
    	$("span[desc='下一月_']").hide();
    }
}

/**
 * 过滤htlm标签
 * @param str
 * @returns
 */
function removeHTMLTag(str) {
	str = str.replace(/<[^>]+>/g,"");
	str = str.replace(/(^\s*)|(\s*$)/g, "");
	str = str.replace(/&nbsp;/ig,"");
	str = str.trim();
    return str;
}

/**
 * 替换坑爹标点符号
 * 
 */
function replaceBiaodian(str){
    return str.replace(/\'/g,"’").replace(/\"/g,"”").replace(/</g,"〈").replace(/>/g,"〉");
}

/**
 * 平均停留时间格式化，秒转成几分几秒
 * @param _val
 * @returns {String}
 */
function getAvgStayTimeFormat(_val){
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
    return formatedValue.replace("-","");
}

/**
 * 解决其他列排序后标题序号错乱的问题
 * @param renderId
 * @param aoSettings
 */
function reRenderIndex(renderId, aoSettings){
	  var $table = $('#'+renderId);

		if(!$table[0].aoSettings){
			  $table[0].aoSettings = aoSettings; 
		}else{
		    aoSettings =   $table[0].aoSettings;
		}
	  
		if(!aoSettings){
		   return ;
		}
	   (function( $table, aoSettings){
	        setTimeout(function(){
	            var rows =  $table.find('tbody tr>td:first-child'), ht;
	            for(var i=0, len=rows.length; i<len; i++){
	             
	               ht = $(rows[i]).html();
	               ht = ht.replace(/\d+/, aoSettings._iDisplayStart+i+1 );
	               $(rows[i]).html(ht);
	            
	            }
	            
	        }, 50);
	    })( $table,aoSettings);
	    
}

/**
 * 通过来源ID获取来源描述
 * @param result
 */
function getViewFlowDescByJson(result, sourceId) {
	var sourceDesc = "";
	if(result && result != "") {
		for(var i = 0; i < result.length; i ++){
			var viewFlowId = result.id.value[i];
			var viewFlowDesc = result.name.value[i];
			if(sourceId == viewFlowId) {
				sourceDesc = viewFlowDesc;
				break;
			}
		}
	}
	if(sourceDesc == ""){
		return "";
	}
	return '<i class="icon-help" desc="'+sourceDesc+'"></i>';
}