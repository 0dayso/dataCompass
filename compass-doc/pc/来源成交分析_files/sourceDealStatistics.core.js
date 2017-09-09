var config = {
	Menu: {
		Id: "SourceDealStatistics"
	}
},zbGlobal;

$(function(){
	B$.init(config);
	A$.setMapping("datePicker",{
	    ajax: false,
	    figure: "DATEPICKER",
	    plugin: {
	        Enable: true,    //false 默认是true
	        label: "",
	        noBtn: false,
	        Type: "range",        //single,range
	        View: "!month!week",     //month,day,!week(不能选周)
	        Pattern: 0,		//0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
	        Range: [30,31],      //[初始化近几天,最大时间范围（除选月模式）]
	        DateSeg: ["DateTopValueStart","DateTopValueEnd"],      //["StartDate","EndDate"],
	        customQuery:"showDealBarHandler",
	        Rapid: true,
	        rapidSel: {      //如果快查功能启动，则配置快查规则
	            item:{
	                /*"昨天": 0,     //0-组件计算日期
	                "前天": 0,
	                "近7天":121,
	                "本周": 121,
	                "上周": 121,
	                "本月": 121,
	                "上月": 121*/
	            	"前一天": 1,
	                "后一天": 0,
	                "近7天":121,
	                "上一周": 0,
	                "下一周": 0,
	                "上一月": 0,
	                "下一月": 0,
	                "重置": 30
	            },
	            label: "快速查看",
	            external: true     //是否外置
			},
			bDimension: true,      //是否按日/周/月选择
            dimension: {
	        	item: ["!month!week"],
                bEmbed: true
            },
            bFinal:true,
            bSeparate:true,
            RapidType : "QuickRapid"
	    }
	});
	I$.init(["datePicker"]);
	I$.run(A$);
	
	/*
	$("a.btn.query:eq(0)").click(function(){
		showDealBar(zbGlobal);
	});
	*/
	
	showDealBar(["OrdProNum"]);
	//检查快查各状态
	checkRapidStatus($("#DateTopValueEnd").val());
	//加载通知
	loadModuleNotice(config.Menu.Id);
	//load systemnotice
	loadSystemNotice();
});

function checkDateRange(ifAlert){
	var range = true;
	if(parseInt($("#DateTopValueStart").val().replace(new RegExp("-","gm"),"")) < 20140301 && parseInt($("#DateTopValueEnd").val().replace(new RegExp("-","gm"),"")) >= 20140301){
    	if(ifAlert == "1"){
    		B$.T.alert("流量分类于2014年3月1日做更新，请确保查询的时间段都早于3月1日或者都晚于3月1日。");
    		$("#jqmAlert").css("width","300px");
    		$(".popModal .fakeMsg .conText").css("width","174px");
    		$(".popModal .moadalCon").css("height","105");
    	}
    	range = false;
    }
	return range;
}

function checkDateRangeShow(){
	var range = true;
	if(parseInt($("#DateTopValueStart").val().replace(new RegExp("-","gm"),"")) < 20140301 && parseInt($("#DateTopValueEnd").val().replace(new RegExp("-","gm"),"")) < 20140301){
    	range = false;
    }
	return range;
}

function showDealBarHandler(){
	showLoadingV2(0.6);
	showDealBar(zbGlobal);
}

function typeChange(obj){
	$("#sourceDealStatisticsType input").attr("val",$(obj).attr("val"));
	$(obj).siblings().removeClass('current');
	$(obj).addClass('current');
	showDealBar(zbGlobal);
}

function sourceDealStatisticsTypeChange(zbType){
	showDealBar(zbType);
}

function showDealBar(zbType){
	if(!checkDateRange("1")){
		return false;
	}
	I$.clrAdapterCache();
	
	if($("#datePicker .rapidSel .radiobox.r-checked").length==0){//非快查则判断前后日期控件区间(1.前小后大2.30天区间)
		var tmpDate = $("#DateTopValueStart").val().split("-");
        var tmpStartDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
        tmpDate = $("#DateTopValueEnd").val().split("-");
        var tmpEndDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
		if($("#DateTopValueStart").val()>$("#DateTopValueEnd").val()){
			B$.T.warn("结束日期应该大于或等于开始日期！");
			return;
		}else if(tmpStartDate.DateDiff('d', tmpEndDate)>A$.getMappingPlugin("datePicker").Range[1]){
			B$.T.warn("请将查询区间设置在"+A$.getMappingPlugin("datePicker").Range[1]+"天之内！");
			return;
		}
	}
	I$.setDateCache(($("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").attr("desc"):"")+" "+$("#datePickerDateSeg0").val()+" \u81F3 "+$("#datePickerDateSeg1").val());

	zbGlobal = zbType;
	A$.setMapping("statisticsChart",{
        ajax: true,
        action: context_path + "/advancedDataModel/sourceDealStatistics.action",
        param: {"filter.startDate": $("#DateTopValueStart").val(),"filter.endDate": $("#DateTopValueEnd").val(),"filter.sourceDealType": $("#sourceDealStatisticsType input").attr("val"),"filter.ZBType": zbType.join("")},
        format: 11,
        formatKey: ["summary","allDetailZBs"],
        figure: "CHART",
        plugin: {
            bLegend: true,
            legend:{
            	legendMax: 1,
            	noTip: true, //是否禁用提示
            	event: "sourceDealStatisticsTypeChange" //自定义指标点击事件
            },
            watermark: context_path+"/images/platform/mainform/WatermarkBig.png",
            title: "<b>TOP10来源成交</b>",
            subtitle: "",
            height: 400,
            zoom:  "x",
            type: "bar",
            rotation: -45,
            pixelInterval: 80,
            opposite: {x:false,y:false},
            reversed: {x:true,y:false}
        },
        dataItem: {
            x: {
                "SourceName": {
                    name: "来源类型"
                }
            },
            y: {
                "OrdProNum":{
                    name: "下单件数",
                    bShow: true
                }
                ,"OrdAmt":{
                    name: "下单金额",
                    bShow: false
                }
                , "CollectNum":{
                    name: "关注量",
                    bShow: false
                }
            }
        }
    });
	A$.extMappingDataItemY("statisticsChart", B$.DI.diShowExt(A$.getMappingDataItemY("statisticsChart"), zbType, true));
	I$.init(["statisticsChart"]);
	I$.run(A$);
	createTable(I$.getAdapterCache("statisticsChart",A$));
	//closeDiv();
}

function changeTwoDecimal_f(x){
	var f_x = parseFloat(x);
	if (isNaN(f_x)){
		return false;
	}
	var f_x = Math.round(x*100)/100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0){
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2){
		s_x += '0';
	}
	return s_x;
}

function createTable(jsonResult){
	var strTable = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" style=\"border-collapse:collapse;\" id=\"detailTable\">";
	strTable += "<thead><tr><th rowspan=\"2\" class=\"headerWidth\">来源</th><th colspan=\"5\"><i class=\"icon-help\" desc=\"距离成交的一次会话内，首次入站来源指用户在这个连续访问中第一次到达京东网站的来源渠道。\"></i>作为首次入站来源</th><th colspan=\"5\"><i class=\"icon-help\" desc=\"距离成交的一次会话内，用户可能先后通过多个来源到达过店铺，首次入店来源指用户在这个连续访问中第一次到达您店铺的来源渠道。\"></i>作为首次入店来源</th><th rowspan=\"2\" class=\"tailWidth\">成交明细</th></tr>";
	
	var result = eval(jsonResult);
	var detailJson = eval("(" + result.resultData + ")");
	strTable += "<tr>";
	$.each(result.allDetailZBs, function(i, n) {
		strTable += "<th>" + '<i class="icon-help" desc="' + n.des + '"></i>' + n.value+"</th>";
	});
	$.each(result.allDetailZBs, function(i, n) {
		strTable += "<th>" + '<i class="icon-help" desc="' + n.des + '"></i>' + n.value+"</th>";
	});
	strTable += "</tr></thead>";
	
	var length = !!detailJson.detail?parseInt(detailJson.detail.length):0;
	
	if(length == 0){
		strTable += "</table>";
		$("#resultDiv").html(strTable);

		var curTbl = $("#detailTable").dataTable({
			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,
			"bSort": false
		});
		B$.globalAdd("Table", curTbl, "resultDiv");
		
		B$.tables["resultDiv"] = curTbl;
		var zbs = B$.zbExt(result.allDetailZBs,["OrdProNum","OrdAmt","OrdNum"],["OrdProNum","OrdAmt","OrdNum"]);
		B$.customColAdd("resultDiv",zbs, 0, {
		colMode: "part",
		multiGroup: 2, //设置重复列区域数目
		multiItem:["OrdProNum","OrdAmt","OrdNum","ShopUVTimes","SkipOut"], //设置重复的列名
		prevCol: 1 //设置重复列区域前面的列数目
		});
	}else{
		//计算总计
		strTable += "<tr><td class=\"fwb\">总计</td>";
		$.each(result.allDetailZBs, function(i, n) {
			var sum = 0;
			var attr = n.id;
			if(attr != "SkipOut"){
				for ( var m = 0; m < length; m++) {
					if(n.dataType == 6 || attr == "OrdAmt"){
						sum = parseFloat(sum) + parseFloat(detailJson.detail[attr].value[m]!=undefined?detailJson.detail[attr].value[m]:0);
						if(attr == "OrdAmt"){
							sum = changeTwoDecimal_f(sum);
						}
					}
					else{
						sum += parseInt(detailJson.detail[attr].value[m]!=undefined?detailJson.detail[attr].value[m]:0);
					}
				}
				if(n.dataType == 6 || attr == "OrdAmt"){
					sum = changeTwoDecimal_f(sum/2);
				}else{
					sum = sum / 2;
				}
				strTable += "<td class=\"t-r fwb\">" + CommaFormatted(sum) + "</td>";
			}else{
				strTable += "<td class=\"t-r fwb\">" + format_number(detailJson.detail["SkipOutSum"].value[0] * 100,2)+"%" + "</td>";
			}

		});
		$.each(result.allDetailZBs, function(i, n) {
			var sum = 0;
			var attr = n.id;
			if(attr != "SkipOut"){
				for ( var m = 0; m < length; m++) {
					if(n.dataType == 6 || attr == "OrdAmt"){
						sum = parseFloat(sum) + parseFloat(detailJson.detail2[attr].value[m]!=undefined?detailJson.detail2[attr].value[m]:0);
						if(attr == "OrdAmt"){
							sum = changeTwoDecimal_f(sum);
						}
					}
					else{
						sum += parseInt(detailJson.detail2[attr].value[m]!=undefined?detailJson.detail2[attr].value[m]:0);
					}
				}
				if(n.dataType == 6 || attr == "OrdAmt"){
					sum = changeTwoDecimal_f(sum/2);
				}else{
					sum = sum / 2;
				}
				strTable += "<td class=\"t-r fwb\">" + CommaFormatted(sum) + "</td>";
			}else{
				strTable += "<td class=\"t-r fwb\">" + format_number(detailJson.detail2["SkipOutSum"].value[0] * 100,2)+"%" + "</td>";
			}
		});
		strTable += "<td></td>";
		strTable += "</tr>";
		
		var tempIdx = 0;
		for ( var m = 0; m < length; m++) {
			//日期
			var sourceTypeStr = detailJson.detail["SourceParentName"].value[m];
			if(sourceTypeStr == undefined || sourceTypeStr == "undefined"){
				break;
			}
			var sourceTypeId = detailJson.detail["SourceType"].value[m];
			var sourceTypeId2 = detailJson.detail["SourceType2"].value[m];
			var parentFlag = detailJson.detail["SourceParentId"].value[m];
			var imgUrl = context_path + "/images/jquerytable/details_close_new.png";
		    var imgUrlOpen = context_path + "/images/jquerytable/details_open_new.png";
			
			if(parentFlag == 1){
				strTable += "<tr id='"+sourceTypeId+"' class='parent'>";
				tempIdx = m;
			}else{
				strTable += "<tr id='"+sourceTypeId+"Lev2' class="+detailJson.detail["SourceType"].value[tempIdx]+" >";
			}

			if(isShowDetail(sourceTypeStr)){
				if(sourceTypeId2 != 999999 && parentFlag != 1){
					if(isShowThrdLevel(sourceTypeStr) && checkDateRangeShow()==true){//展开三级分类
						strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_2\"><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getSourceType2(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
						//strTable += "<td style=\"text-align:right;border:1px solid #CCC;width:150px\" class=\"icon report\"><label id='" + sourceTypeId+ "'><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + sourceTypeStr + "</label> " + showFlowSourceTip(sourceTypeStr) + "<a onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><label id='" + sourceTypeId+ "'></label><i></i></a><a onclick='getSourceType2(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></td>";
					}else{
						strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getSourceType2(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
						//strTable += "<td style=\"text-align:right;border:1px solid #CCC;width:150px\" class=\"icon report\">" + sourceTypeStr + showFlowSourceTip(sourceTypeStr) + "<a onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><label id='" + sourceTypeId+ "'></label><i></i></a><a onclick='getSourceType2(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></td>";
					}
				}else{
					strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+statpvSourceType+"\",\"N\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
					//strTable += "<td style=\"text-align:right;border:1px solid #CCC;width:150px\" class=\"icon report\"><label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label>"+showFlowSourceTip(sourceTypeStr)+"<i></i></td>";
				}
			}else{
				if(parentFlag == 1){
					strTable += "<td style=\"text-align:left;border:0px solid #CCC;font-weight:bold\"><div class=\"tableCtLeft_0\"><img id= '" + sourceTypeId+ "img' src="+imgUrl+" onclick='closeExspan(this)' />" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+sourceTypeId+"\",\"type\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
					//strTable += "<td style=\"text-align:left;border:1px solid #CCC;font-weight:bold;width:150px\" class=\"icon report\"><img id= '" + sourceTypeId+ "img' src="+imgUrl+" onclick='closeExspan(this)' />" + sourceTypeStr + showFlowSourceTip(sourceTypeStr) + "<a onclick='getSourceTrend(\""+sourceTypeId+"\",\"type\")'><label id='" + sourceTypeId+ "'></label><i></i></a></td>";
				}else{
					if(isShowThrdLevel(sourceTypeStr) && checkDateRangeShow()==true){//展开三级分类
						if(isShowUrlDetail(sourceTypeStr) && checkDateRangeShow()==true){//跳转到url列表
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_2\"><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
							//strTable += "<td style=\"text-align:right;border:1px solid #CCC;width:150px\" class=\"icon report\"><label id='" + sourceTypeId+ "'><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + sourceTypeStr + "</label> " + showFlowSourceTip(sourceTypeStr) + "<a onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><label id='" + sourceTypeId+ "'></label><i></i></a><a style='cursor: hand' onclick='getFlowSourceUrl(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></td>";
						}else{
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_2\"><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
							//strTable += "<td style=\"text-align:right;border:1px solid #CCC;width:150px\" class=\"icon report\"><label id='" + sourceTypeId+ "'><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + sourceTypeStr + "</label> " + showFlowSourceTip(sourceTypeStr) + "<a onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><label id='" + sourceTypeId+ "'></label><i></i></a></td>";
						}
					}else{
						if(isShowUrlDetail(sourceTypeStr) && checkDateRangeShow()==true){//跳转到url列表
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
							//strTable += "<td style=\"text-align:right;border:1px solid #CCC;width:150px\" class=\"icon report\">" + sourceTypeStr + showFlowSourceTip(sourceTypeStr) + "<a onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><label id='" + sourceTypeId+ "'></label><i></i></a><a style='cursor: hand' onclick='getFlowSourceUrl(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></td>";
						}else{
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">"+showFlowSourceTip(sourceTypeStr)+"<label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
							//strTable += "<td style=\"text-align:right;border:1px solid #CCC;width:150px\" class=\"icon report\">" + sourceTypeStr + showFlowSourceTip(sourceTypeStr) + "<a onclick='getSourceTrend(\""+sourceTypeId+"\",\"sourceType\")'><label id='" + sourceTypeId+ "'></label><i></i></a></td>";
						}
					}
				}
			}
			
			$.each(result.allDetailZBs, function(i, n) {
				var attr = n.id;
				var tdStr = (detailJson.detail[attr].value[m] != null ? detailJson.detail[attr].value[m] : "");
				tdStr = $.jFormatVal(tdStr, n.dataType, n.decimal);
				
				if(n.dataType == 0 || n.dataType == 1 || n.dataType == 6){
					strTable += "<td style=\"text-align:right;border:0px solid #CCC;word-wrap:break-word;word-break:break-all;white-space: normal;\">" + tdStr + "</td>";
				}else{
					strTable += "<td style=\"text-align:left;border:0px solid #CCC;word-wrap:break-word;word-break:break-all;white-space: normal;\">" + tdStr + "</td>";
				}
			});
			
			$.each(result.allDetailZBs, function(i, n) {
				var attr = n.id;
				var tdStr = detailJson.detail2[attr].value[m] != null ? detailJson.detail2[attr].value[m] : "";
				tdStr = $.jFormatVal(tdStr, n.dataType, n.decimal);
				if(n.dataType == 0 || n.dataType == 1 || n.dataType == 6){
					strTable += "<td style=\"text-align:right;border:0px solid #CCC;word-wrap:break-word;word-break:break-all;white-space: normal;\">" + tdStr + "</td>";
				}else{
					strTable += "<td style=\"text-align:left;border:0px solid #CCC;word-wrap:break-word;word-break:break-all;white-space: normal;\">" + tdStr + "</td>";
				}
			});
			//查看
			if(parentFlag == 1){
				strTable += "<td style=\"text-align:center;border:0px solid #CCC;word-wrap:break-word;word-break:break-all;\"></td>";
			}else{
				strTable += "<td style=\"text-align:center;border:0px solid #CCC;word-wrap:break-word;word-break:break-all;\"><a href=\"#\" onclick='getSourceDealDetail(\""+sourceTypeId+"\")' >查看</a></td>";
			}
			strTable += "</tr>";
		}
		strTable += "</table>";
		$("#resultDiv").html(strTable);
		var hiddenExcelTable = "<div id=\"resultDivExcel\" class=\"hidden\">" + strTable.replace("detailTable", "detailTableExcel") + "</div>";
		$("#resultDiv").html(strTable + hiddenExcelTable);
		
		var curTbl = $("#detailTable").dataTable({
			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,
			"bSort": false,
			"fnDrawCallback":function(){
				$("#detailTable .headerWidth").css("width","300px");
				$("#detailTable .tailWidth").css("width","60px");
			}
		});
		
		B$.globalAdd("Table", curTbl, "resultDiv");
		B$.tables["resultDiv"] = curTbl;

		var zbs = B$.zbExt(result.allDetailZBs,["OrdProNum","OrdAmt","OrdNum"],["OrdProNum","OrdAmt","OrdNum"]);
		B$.customColAdd("resultDiv",zbs, 0, {
		colMode: "part",
		func: "checkLev3Expand",
		multiGroup: 2, //设置重复列区域数目
		multiItem:["OrdProNum","OrdAmt","OrdNum","ShopUVTimes","SkipOut"], //设置重复的列名
		prevCol: 1 //设置重复列区域前面的列数目
		});
		B$.dnExcelAdd("resultDiv", "detailTable");
		//alert(O.cache.get("chosenNum","customCol"));
		bindTips();
		new FixTableHeader({id:"detailTable"});
	}
}

function bindTips(){
	$('i.icon-help').Jtips({
        "content": "暂无描述",
        "position": 'bottom',
        "width": 196
    });
}

//增加显示列的时候，如果三级分类展开，那么进行关闭
function checkLev3Expand(){
	var sources =["51","88","147","148","149"];
	for( var i = 0 ;i < sources.length ;i++ ){
		var sourceId = sources[i];
		if($("#"+sourceId+"img").attr("src") != null){
			if($("#"+sourceId+"img").attr("src").indexOf("details_close_new.png")>=0){
				 $("#"+sourceId+"img").attr("src",context_path + "/images/jquerytable/details_open_new.png");
			}
		}
	}
}

function closeExspan(_this){
	var $_this = $(_this);
	if($_this.attr("src").indexOf("details_close_new.png")>=0){
		$("."+$_this.closest("tr").jId()).each(function(){
			$(this).hide(200);
			if($("#" + $(this).jId().replace("Lev2","") + "img").attr("src") != null){
				$("#" + $(this).jId().replace("Lev2","") + "img").attr("src",context_path + "/images/jquerytable/details_open_new.png");
	        }
	        $("."+$(this).jId()).each(function(){
	            $(this).remove();
	        });
		});
		$_this.eq(0).attr("src",context_path + "/images/jquerytable/details_open_new.png");
	}else{
		$("."+$_this.closest("tr").jId()).each(function(){
			$(this).show(200);
		});
		$_this.eq(0).attr("src",context_path + "/images/jquerytable/details_close_new.png");
	}
}

function getSourceTrend(sourceType, type){
	var trendUrl = context_path + "/model/sourceDealTrend/sourceDealTrend.jsp";
	var formAction = "<form target='_blank' id='trendForm' name='trendForm' action='"+trendUrl+"' method='post'> " +
			"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValueStart").val()+"' />" +
			"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValueEnd").val()+"' />" +
			"<input type='hidden' id='viewSourceId1' name='viewSourceId1' value='"+sourceType+"' />" +
			"<input type='hidden' id='rapid' name='rapid' value='"+$("#datePickerCalendarRapidSel").val()+"' />" +
			"<input type='hidden' id='zbGlobal' name='zbGlobal' value='"+zbGlobal+"' />" +
			"</form>";
	$("#hiddenForm").html(formAction);
	var obj = document.getElementById('trendForm');
	obj.submit();
}

function getSourceDealDetail(sourceType){
	var detailUrl = context_path + "/model/sourceDealDetail/sourceDealDetail.jsp";
	var formAction = "<form target='_blank' id='detailForm' name='detailForm' action='"+detailUrl+"' method='post'> " +
			"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValueStart").val()+"' />" +
			"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValueEnd").val()+"' />" +
			"<input type='hidden' id='viewSourceId1' name='viewSourceId1' value='"+sourceType+"' />" +
			"<input type='hidden' id='rapid' name='rapid' value='"+$("#datePickerCalendarRapidSel").val()+"' />" +
			"</form>";
	$("#hiddenDetailForm").html(formAction);
	var obj = document.getElementById('detailForm');
	obj.submit();
}

function getSourceType2(sourceTypeId, viewSourceName){
	var sourceType2Url = context_path + "/model/sourceDealStatistics/sourceDealStatisticsSec.jsp";
	
	var formAction = "<form target='_blank' id='sourceType2Form' name='detailForm' action='"+sourceType2Url+"' method='post'> " +
			"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValueStart").val()+"' />" +
			"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValueEnd").val()+"' />" +
			"<input type='hidden' id='viewSourceId1' name='viewSourceId1' value='"+sourceTypeId+"' />" +
			"<input type='hidden' id='viewSourceName1' name='viewSourceName1' value='"+viewSourceName+"' />";
	
	if($(".rapidSel .radiobox.r-checked").length > 0){
		formAction += "<input type='hidden' id='rapid' name='rapid' value='"+$("#datePickerCalendarRapidSel").val()+"' />";
	}
	
	formAction += "</form>";
	$("#hiddenSourceType2Form").html(formAction);
	
	var url = getDetailURL(viewSourceName);
    if (url != null){
        $("#sourceType2Form").attr("action",url);
    }
	
	var obj = document.getElementById('sourceType2Form');
	obj.submit();
}

/*处理一级流量来源展开*/
function closeExspanThrdLevel(tagName){
	
	if($("#"+tagName+"img").attr("src").indexOf("details_close_new.png")>=0){
        $("."+tagName + "Lev2").each(function(){
            $(this).hide(200);
        });
        $("#"+tagName+"img").attr("src",context_path + "/images/jquerytable/details_open_new.png");
        return false;
    }else{
    	$("#"+tagName+"img").attr("src",context_path + "/images/jquerytable/details_close_new.png");
    }
	
	//查询当前二级分类下的三级分类
	 $.ajax({
	        url : context_path + "/advancedDataModel/getSourceDealThrdLevelResult.action",
	        type : "post",
	        dataType : "json",
	        data : "filter.sourceType="+tagName+"&filter.startDate="+ $("#DateTopValueStart").val()+"&filter.endDate="+$("#DateTopValueEnd").val(),
	        success : function(_rlt){
	        	addThrdLevelTable(_rlt, tagName);
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

var viewSourceId2Str = "";
function addThrdLevelTable(result, tagName){
	var json = eval(result);	
	var resultData = eval("("+json.resultData+")");
	var tdStr = "";
	var tdWidth = $("#" + tagName +"Lev2").find('td').eq(0).width() - 81 -35 -55;
	tdWidth = tdWidth >= 50 ? tdWidth : 50;
	viewSourceId2Str = "";//清空
	if(resultData.detail && resultData.detail.length>0){
		var allFlowSourceSecondPar = "";
		for(var i =0; i < resultData.detail.length; i ++){
			var sourceId = resultData.detail.SourceType2.value[i];
			if( i!=resultData.detail.length-1 ){
				allFlowSourceSecondPar += sourceId + ",";
			}else{
				allFlowSourceSecondPar += sourceId;
			}
		}
		for(var i =0; i < resultData.detail.length; i ++){
			var sourceName = resultData.detail.SourceName.value[i];
			var sourceId = resultData.detail.SourceType2.value[i];

			if( i!=resultData.detail.length-1 ){
				viewSourceId2Str += sourceId + ",";
			}else{
				viewSourceId2Str += sourceId;
			}
			
			//首次入店
			var ordProNum = resultData.detail.OrdProNum.value[i];
			var ordAmt = resultData.detail.OrdAmt.value[i];
			var ordNum = resultData.detail.OrdNum.value[i];
			var shopUVTimes = resultData.detail.ShopUVTimes.value[i];
			var skipOutSum = resultData.detail.SkipOutSum.value[i];
			//末次入店
			var ordProNum2 = resultData.detail2.OrdProNum.value[i];
			var ordAmt2 = resultData.detail2.OrdAmt.value[i];
			var ordNum2 = resultData.detail2.OrdNum.value[i];
			var shopUVTimes2 = resultData.detail2.ShopUVTimes.value[i];
			var skipOutSum2 = resultData.detail2.SkipOutSum.value[i];
			
			tdStr += "<tr class=\""+tagName+"Lev2\">";
			if(isShowUrlDetailForLevel2(sourceId)){//二级来源展示url详情
				tdStr += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_3\">"+showFlowSourceTip(sourceName)+"<label id='" + tagName+ "'>" + sourceName + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\",\""+allFlowSourceSecondPar+"\")'><i></i></a></span><span><span class=\"tableSpace\"><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+tagName+"\",\""+sourceName+"\",\""+sourceId+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
			}else{
				tdStr += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_3\">"+showFlowSourceTip(sourceName)+"<label id='" + tagName+ "'>" + sourceName + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\",\""+allFlowSourceSecondPar+"\")'><i></i></a></span><span><span class=\"tableSpace\"></span></div></td>";
			}
			//tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\" class=\"icon report\"><label id='" + tagName+ "'>" + sourceName + "</label>"+showFlowSourceTip(sourceName)+"<a onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\")'><i></i></a></td>";
			
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(ordProNum) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(ordAmt, C$.DATATYPE_DOUBLE, 2) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(ordNum) + "</td>";
			
			if(checkTableCol("入店次数")){
				tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(shopUVTimes) + "</td>";
			}
			if(checkTableCol("跳失率")){
				tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(skipOutSum, C$.DATATYPE_PERCENT, 2) + "</td>";
			}
			
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(ordProNum2) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(ordAmt2, C$.DATATYPE_DOUBLE, 2) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(ordNum2) + "</td>";
			if(checkTableCol("入店次数")){
				tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(shopUVTimes2) + "</td>";
			}
			if(checkTableCol("跳失率")){
				tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(skipOutSum2, C$.DATATYPE_PERCENT, 2) + "</td>";
			}
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: center;\"><a onclick='getSourceDealDetailForLev3(\""+tagName+"\",\""+sourceId+"\",\""+allFlowSourceSecondPar+"\")' href=\"#\">查看</a></td>";
			tdStr += "</tr>";
		}
		$("#" + tagName +"Lev2").after(tdStr);
		$("." + tagName +"Lev2").find('.tableCtLeft_3 label').css('max-width', tdWidth);
	}else{
		B$.T.alert("没有数据。");
	}
	bindTips();
}

function checkTableCol(col){
	var exist = false; 
	$("#detailTable").find('th').each(function (thindex, thitem) { //遍历Table dgItem的th  
	    var headCaption = $(thitem).text();
	    if (headCaption.indexOf(col) == 0) {
		    exist = true;
	    	return false;
	    }
	});
	return exist;
}

/*
 * 跳转到趋势页面 
 */
function viewFlowTrendLev3(sourceId1, sourceId2,allFlowSourceSecondPar){
	var trendUrl = context_path + "/model/sourceDealTrend/sourceDealTrend.jsp";
	var formAction = "<form id='trendFormThrd' name='trendFormThrd' action='"+trendUrl+"' target='_blank' method='post'> " +
			"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValueStart").val()+"' />" +
			"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValueEnd").val()+"' />" +
			"<input type='hidden' id='viewSourceId1' name='viewSourceId1' value='"+sourceId1+"' />" +
			"<input type='hidden' id='viewSourceId2' name='viewSourceId2' value='"+sourceId2+"' />" +
			"<input type='hidden' id='viewSourceId2Str' name='viewSourceId2Str' value='"+allFlowSourceSecondPar+"' />" +
			"<input type='hidden' id='rapid' name='rapid' value='"+$("#datePickerCalendarRapidSel").val()+"' />" +
			"<input type='hidden' id='zbGlobal' name='zbGlobal' value='"+zbGlobal+"' />" + 
			"</form>";
	$("#hiddenForm").html(formAction);
	var obj = document.getElementById('trendFormThrd');
	obj.submit();
}

/*
 * 跳转到url列表页面
 */
function getFlowSourceUrl(flowSourceFirst,flowSourceFirstName,flowSourceSec){
	
	var sourceTypeUrl = context_path + "/model/sourceDealStatistics/sourceDealStatisticsUrl.jsp";
	
	var formAction = "<form target='_blank' id='sourceTypeUrlForm' name='detailForm' action='"+sourceTypeUrl+"' method='post'> " +
			"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValueStart").val()+"' />" +
			"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValueEnd").val()+"' />" +
			"<input type='hidden' id='viewSourceId1' name='viewSourceId1' value='"+flowSourceFirst+"' />" +
			"<input type='hidden' id='viewSourceName1' name='viewSourceName1' value='"+flowSourceFirstName+"' />" +
			"<input type='hidden' id='rapid' name='rapid' value='"+$("#datePickerCalendarRapidSel").val()+"' />" +
			"<input type='hidden' id='viewSourceId2' name='viewSourceId2' value='"+flowSourceSec+"' />" +
			"</form>";
	$("#hiddenSourceUrlForm").html(formAction);
	
	var obj = document.getElementById('sourceTypeUrlForm');
	obj.submit();
	
}

/*
 * 三级来源查看成交明细
 */
function getSourceDealDetailForLev3(sourceType,sourceType2,sourceType2Str){
	var detailUrl = context_path + "/model/sourceDealDetail/sourceDealDetail.jsp";
	var formAction = "<form target='_blank' id='detailFormForLev3' name='detailFormForLev3' action='"+detailUrl+"' method='post'> " +
			"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValueStart").val()+"' />" +
			"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValueEnd").val()+"' />" +
			"<input type='hidden' id='viewSourceId1' name='viewSourceId1' value='"+sourceType+"' />" +
			"<input type='hidden' id='viewSourceId2' name='viewSourceId2' value='"+sourceType2+"' />" +
			"<input type='hidden' id='rapid' name='rapid' value='"+$("#datePickerCalendarRapidSel").val()+"' />" +
			"<input type='hidden' id='viewSourceId2Str' name='viewSourceId2Str' value='"+sourceType2Str+"' />" +
			"</form>";
	$("#hiddenSourceDetailForLevel3Form").html(formAction);
	var obj = document.getElementById('detailFormForLev3');
	obj.submit();
}

function getExcelName(jTitle){
    return B$.getExcelNameByStartEndDate(jTitle,"DateTopValueStart","DateTopValueEnd");
}