var config = {
	Menu: {
		Id: "visitorFlow"
	},
	Bar: {
		Enable: true,
		Set: [
		      {Div: "resultDivBar", Item: false, Filter: false,PerPage:true}
		]
	},
	DatePicker: {
		Enable: true,    //false 默认是true
		Rapid: true,    //[false, true]	false(1): 是否有快查;  true(1):是否自定义click
        rapidSel: {      //如果快查功能启动，则配置快查规则
            item:{
            	"前一天": 0,
            	"后一天": 0,
            	"近7天": 7,
                "上一周": 0,
                "下一周": 0,
                "上一月": 0,
                "下一月": 0,
                "重置": 0
            },
            external: true      //是否外置
        },
        bDimension: true,      //是否按日/周/月选择
        dimension: {
            item: ["!month!week","week","month"],
            bEmbed: true
        },
			Type: "single",        //single,range
			View: "day",     //month,day,!week(不能选周)
			Pattern: 2,		//0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
			Range: [7,30],      //[初始化近几天,最大时间范围（除选月模式）]
		DateSeg: ["DateTopValue"],      //["StartDate","EndDate"],
        bFinal: true,
        RapidType : "QuickRapid"
	}
},zbGlobal = ["UV"];

$(function(){
	
	//加载通知
	loadModuleNotice(config.Menu.Id);
	//load systemnotice
	loadSystemNotice();
	
	/*A$.setMapping("datePicker",{
	    ajax: false,
	    figure: "DATEPICKER",
	    plugin: {
	        Enable: true,    //false 默认是true
	        Rapid: true, 
	        Type: "single",        //single,range
	        View: "day",     //month,day,!week(不能选周)
	        Pattern: 2,		//0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
	        DateSeg: ["DateTopValue"],      //["StartDate","EndDate"],
	        Range: [7,30],
	        Rapid: true,
	        customQuery:"queryFilter",
            rapidSel: {      //如果快查功能启动，则配置快查规则
                item:{
                    "昨天": 0,     //0-组件计算日期
                    "前天": 0,
                    "近7天": 7,
                    "本周": 0,
                    "上周": 0,
                    "本月": 0,
                    "上月": 0
                },
                label: "快速查看",
                external: true     //是否外置
            },
            bDimension : true, // 是否按日/周/月选择
            dimension : {
                item : ["!month!week","week","month"],
                bEmbed : true
            },
            bFinal:true,
            RapidType : "QuickRapid"
	    }
	});*/
	//I$.init(["datePicker"]);
	//I$.run(A$);
	
	/*$("#query_button").click(function(){
		queryFilter();
	});*/
	
	/*$("input[type='radio']").click(function(){
		showDealBar(zbGlobal);
	});*/
	//showBar(["UV"]);//访客
	
	//renderTable();
	getOdpVersion();
});

var odpVersionStr = "";
function getOdpVersion(){
	$.ajax({
		url : context_path + "/getProductEdition.action",
		type : "post",
		dataType : "json",
		success : renderEditionInfoPage,
		error :  function(XMLHttpRequest, s, errorThrown) {
            if(XMLHttpRequest.readyState!=0){
            	if(s=="timeout"){
 				   // 请求超时
 				}else{// 请求发生异常
 					
 				}
            }
        }
	});
}

function renderEditionInfoPage(result){
	if(result){
		var resultData = result.edition;
		var ver = resultData.versionRf;
        if(ver){
        	if(ver!=""){
        		odpVersionStr = ver;
        		B$.init(config);
        		//showBar(["UV"]);
        		//renderTable();
        	}
        }
	}
}

function checkDateRangeShow(){
	var range = true;
	var timeStr = $("#DateTopValue").val().replace(new RegExp("-","gm"),"");
	if(timeStr.length == 6){//月
		if(parseInt(timeStr) < 201403){
			range = false;
		}
	}
	if(timeStr.indexOf("99") > -1){//周
		if(parseInt(timeStr) < 20149909){
	    	range = false;
	    }
	}
	if(timeStr.indexOf("99") == -1 && timeStr.length == 8){//日
		if(parseInt(timeStr) < 20140224){
	    	range = false;
	    }
	}
	return range;
}

function queryFilter(){
	I$.clrAdapterCache();
	showBar(zbGlobal);//访客
	
	renderTable();
}

function renderTable(){
	I$.setDateCache($("#DateSeg").val());
	I$.submit(
			context_path + "/advancedDataModel/getVisitorFlowResult.action",
			{"filter.date": $("#DateTopValue").val()},
			function(_rlt){
				createTable(_rlt);
			},
			true
		);
}

function showBar(zbType){
	showLoadingV2(0.5);
	zbGlobal = zbType;
	I$.setDateCache($("#DateSeg").val());
	A$.setMapping("statisticsChart",{
        ajax: true,
        action: context_path + "/advancedDataModel/getTopVisitorFlowResult.action",
        param: {"filter.date": $("#DateTopValue").val(),"filter.index":zbType[0]},
        format: 11,
        formatKey: ["stat"],
        figure: "CHART",
        plugin: {
            bLegend: true,
            legend:{
            	legendMax: 1,
            	noTip: true, //是否禁用提示
            	event: "statisticsTypeChange" //自定义指标点击事件
            },
            watermark: context_path+"/images/platform/mainform/WatermarkBig.png",
            title: "<b>TOP10访客来源</b>",
            subtitle: "",
            height: 400,
            zoom:  "x",
            type: "bar",
            rotation: -45,
            pixelInterval: 80,
            yDataType:  (zbType=="SkipOut")? 1 : 0,//数据轴展示百分比类型设为1
            opposite: {x:false,y:false},
            reversed: {x:true,y:false}
        },
        dataItem: {
            x: {
                "PvSource": {
                    name: "流量来源"
                }
            },
            y: {
                "UV":{
                    name: "访客数",
                    bShow: true
                }
                ,"UPV":{
                    name: "访问次数",
                    bShow: false
                }
                , "VisitDept":{
                    name: "入店访问深度",
                    bShow: false
                }
                , "SkipOut":{
                    name: "入店跳失率",
                    bShow: false
                }
            }
        }
    });
	A$.extMappingDataItemY("statisticsChart", B$.DI.diShowExt(A$.getMappingDataItemY("statisticsChart"), zbType, true));
	I$.init(["statisticsChart"]);
	I$.run(A$);;
	//closeDiv();
}

function statisticsTypeChange(zbType){
	I$.clrAdapterCache();
	showBar(zbType);
}

function createTable(jsonResult){
	var strTable = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" style=\"border-collapse:collapse;\" id=\"detailTable\">";
	strTable += "<thead><tr><th title='流量来源'>流量来源</th>";
	
	var result = eval(jsonResult);
	var detailJson = eval("(" + result.resultData + ")");
	$.each(result.allDetailZBs, function(i, n) {
		strTable += "<th>";
			//Tip the description
        if( n.des&&n.des!=""){
            strTable += '<i class="icon-help" desc="' +  n.des + '"></i>' +  n.value;
        }else{
            strTable += n.value;
        }
        strTable += "</th>";
	});
	strTable += "</tr></thead>";
	strTable += "<tbody>";
	if(detailJson.classify&&detailJson.stat){
		var length = parseInt(detailJson.classify.length);//分类
		var statLen= parseInt(detailJson.stat.length);//
		
		var imgUrl = context_path + "/images/jquerytable/details_close_new.png";
	    var imgUrlOpen = context_path + "/images/jquerytable/details_open_new.png";
		for ( var m = 0; m < length; m++) {
			//日期
			var pvSource = detailJson.classify["PvSource"].value[m];
			var pvSourceType = detailJson.classify["PvSourceType"].value[m];
			
			strTable += "<tr id='"+pvSourceType+"' class='parent'>";
			strTable += "<td style=\"text-align:left;border:0px solid #CCC;font-weight:bold\"><div class=\"tableCtLeft_0\"><img id= '" + pvSourceType+ "img' src="+imgUrl+" onclick='closeExspan(\""+pvSourceType+"\")' />" + showFlowSourceTip(pvSource)+ pvSource + "</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend("+pvSourceType+",\"Y\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";

			$.each(result.allDetailZBs, function(i, n) {
				var attr = n.id;
				var tdStr = (detailJson.classify[attr].value[m] != null ? detailJson.classify[attr].value[m] : "");
				// 小数位个数
				if(n.dataType == 1)
					tdStr = format_number(tdStr,2);
				if(n.dataType == 6)
					tdStr = format_number(tdStr * 100,2)+"%";
				// 逗号分隔符
				if(n.dataType==0 ||n.dataType==1 || n.dataType == 6){
					tdStr = CommaFormatted(tdStr);
				}
				
				if(n.dataType == 6){
					strTable += "<td style=\"text-align:right;border:0px solid #CCC;\">" + tdStr + "</td>";
				}else{
					strTable += "<td style=\"text-align:right;border:0px solid #CCC;\">" + tdStr + "</td>";
				}
				
			});
			strTable += "</tr>";
			
			for(var i=0;i<statLen;i++){
				//日期
				var statpvSource = detailJson.stat["PvSource"].value[i];
				var statpvSourceType = detailJson.stat["PvSourceType"].value[i];
				var statpvSourceParent = detailJson.stat["PvSourceParent"].value[i];
				var moreDetailTag = detailJson.stat["MoreDetailTag"].value[i];
				if(statpvSourceParent==pvSourceType){
					strTable += "<tr class='"+pvSourceType+"' id='"+statpvSourceType+"Lev2' >";
					
					if(isShowThrdLevel(statpvSource) && checkDateRangeShow()==true){//展开三级分类
						if(isShowUrlDetail(statpvSource)){
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_2\"><img id= '" + statpvSourceType+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+statpvSourceType+"\")' />" + showFlowSourceTip(statpvSource)+ statpvSource +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+statpvSourceType+"\",\"N\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+statpvSourceType+"\",\""+statpvSource+"\")'><label class=\"icon detail\"><i></i></label></a></span></div>";
							//strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\"><label id='" + statpvSourceType+ "'><img id= '" + statpvSourceType+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+statpvSourceType+"\")' />" + statpvSource + "</label> " +showFlowSourceTip(statpvSource)+"<a onclick='getSourceTrend("+statpvSourceType+",\"N\")'><i></i></a><a style='cursor: hand' onclick='getFlowSourceUrl(\""+statpvSourceType+"\",\""+statpvSource+"\",\"\")'><label class=\"icon detail\"><i></i></label></a>";
						}else{
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_2\"><img id= '" + statpvSourceType+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+statpvSourceType+"\")' />" + showFlowSourceTip(statpvSource)+ statpvSource +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+statpvSourceType+"\",\"N\")'><i></i></a></span><span class=\"tableSpace\"></span></div>";
							//strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\"><label id='" + statpvSourceType+ "'><img id= '" + statpvSourceType+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+statpvSourceType+"\")' />" + statpvSource + "</label> " +showFlowSourceTip(statpvSource)+"<a onclick='getSourceTrend("+statpvSourceType+",\"N\")'><i></i></a>";
						}
					}else{
						if(isShowUrlDetail(statpvSource) && checkDateRangeShow()==true){
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">" + showFlowSourceTip(statpvSource)+ statpvSource +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+statpvSourceType+"\",\"N\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+statpvSourceType+"\",\""+statpvSource+"\")'><label class=\"icon detail\"><i></i></label></a></span></div>";
							//strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\">" + statpvSource +showFlowSourceTip(statpvSource)+"<a onclick='getSourceTrend("+statpvSourceType+",\"N\")'><i></i></a><a style='cursor: hand' onclick='getFlowSourceUrl(\""+statpvSourceType+"\",\""+statpvSource+"\",\"\")'><label class=\"icon detail\"><i></i></label></a>";
						}else{
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">" + showFlowSourceTip(statpvSource)+ statpvSource +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrend(\""+statpvSourceType+"\",\"N\")'><i></i></a></span>";
							//strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\">" + statpvSource +showFlowSourceTip(statpvSource)+"<a onclick='getSourceTrend("+statpvSourceType+",\"N\")'><i></i></a>";
							
							if( isShowDetail(statpvSource)){
								if(statpvSource == "京东搜索" && odpVersionStr == "ODP_ELEMENTARY"){//初级版不显示京东搜索详情
									strTable += "<span class=\"tableSpace\"></span></div>";
								}else{
									strTable +="<span><a title=\"查看详情\" style='cursor: hand' onclick='getSourceType2(\""+statpvSourceType+"\",\""+statpvSource+"\")'><label class=\"icon detail\"><i></i></label></a></span></div>";
								}
							}else{
								strTable += "<span class=\"tableSpace\"></span></div>";
							}
						}
					}
					
					//strTable += "<td style=\"text-align:right;border:1px solid #CCC;\" class=\"icon report\">" + statpvSource +showFlowSourceTip(statpvSource)+"<a onclick='getSourceTrend("+statpvSourceType+",\"N\")'><i></i></a>";
					//先全部加上详细
//					if( isShowDetail(statpvSource) && !isShowUrlDetail(statpvSource)){
//						if(moreDetailTag=="Y"){
//							strTable +="<a onclick='getSourceType2(\""+statpvSourceType+"\",\""+statpvSource+"\")'><label class=\"icon detail\"><i></i></label></a>";
//						}
//					}
					strTable += "</td>";
				
					$.each(result.allDetailZBs, function(k, n) {
						var attr = n.id;
						var tdStr = (detailJson.stat[attr].value[i] != null ? detailJson.stat[attr].value[i] : "");
						// 小数位个数
						if(n.dataType == 1)
							tdStr = format_number(tdStr,2);
						if(n.dataType == 6)
							tdStr = format_number(tdStr * 100,2)+"%";
						// 逗号分隔符
						if(n.dataType==0 ||n.dataType==1 || n.dataType == 6){
							tdStr = CommaFormatted(tdStr);
						}
						
						if(n.dataType == 6){
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\">" + tdStr + "</td>";
						}else{
							strTable += "<td style=\"text-align:right;border:0px solid #CCC;\">" + tdStr + "</td>";
						}
					});
					strTable += "</tr>";
				}
			}
		}
	}
	strTable += "</tbody></table>";
	$("#resultDiv").html(strTable);
	
	var curTbl = $("#detailTable").dataTable({
		"bPaginate" : false,
		"bFilter" : false,
		"bInfo" : false,
		"bSort": false
//        ,"sDom": 'T<"clear">lfrtip',
//        "oTableTools": {
//            "sSwfPath": C$.PATH+"/media/copy_csv_xls_pdf.swf",
//            "aButtons":["xls"]
//        }
	});
	
	/*
	$(".icon.report i",$("#resultDiv")).click(function(){
		var trendUrl = context_path + "/model/visitorFlowTrend/visitorFlowTrend.jsp";
		var formAction = "<form id='trendForm' name='trendForm' action='"+trendUrl+"' method='post'> " +
				"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValue").val()+"' />" +
				"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValue").val()+"' />" +
				"<input type='hidden' id='pvSource' name='pvSource' value='"+$(this).prev("label").jId()+"' />" +
				"</form>";
		$("#hiddenForm").html(formAction);
		var obj = document.getElementById('trendForm');
		obj.submit();
	});
	*/
	B$.globalAdd("Table", curTbl, "resultDiv");
	B$.tables["resultDiv"] = curTbl;
	B$.dnExcelAdd("resultDiv", "detailTable");
	$("#detailTable thead th").eq(0).css("width","28%");
	$("#detailTable thead th").eq(1).css("width","18%");
	$("#detailTable thead th").eq(2).css("width","18%");
	$("#detailTable thead th").eq(3).css("width","18%");
	$("#detailTable thead th").eq(4).css("width","18%");
	bindTips();
	new FixTableHeader({id:"detailTable"});
}

function bindTips(){
	$('i.icon-help').Jtips({
        "content": "暂无描述",
        "position": 'bottom',
        "width": 196
    });
}

function getSourceTrend(sourceType,type){
	var trendUrl = context_path + "/model/visitorFlowTrend/visitorFlowTrend.jsp";
	var formAction;
	if(type=="Y"){
		formAction = "<form target='_blank' id='trendForm' name='trendForm' action='"+trendUrl+"' method='post'> " +
		"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValue").val()+"' />" +
		"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValue").val()+"' />" +
		"<input type='hidden' id='topSource' name='topSource' value='"+sourceType+"' />" +
		"</form>";
	}else{
		formAction = "<form target='_blank' id='trendForm' name='trendForm' action='"+trendUrl+"' method='post'> " +
			"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValue").val()+"' />" +
			"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValue").val()+"' />" +
			"<input type='hidden' id='pvSource' name='pvSource' value='"+sourceType+"' />" +
			"</form>";
	}
	$("#hiddenForm").html(formAction);
	var obj = document.getElementById('trendForm');
	obj.submit();
}

function closeExspan(tagName){
	if($("img",$("#"+tagName)).eq(0).attr("src").indexOf("details_close_new.png")>=0){
		$("."+tagName).each(function(){
            $(this).hide();
            if($("#" + $(this).jId().replace("Lev2","") + "img").attr("src") != null){
            	$("#" + $(this).jId().replace("Lev2","") + "img").attr("src",context_path + "/images/jquerytable/details_open_new.png");
            }
            $("."+$(this).jId()).each(function(){
                $(this).remove();
            });
        });
		$("img",$("#"+tagName)).eq(0).attr("src",context_path + "/images/jquerytable/details_open_new.png");
	}else{
		$("."+tagName).each(function(){
			$(this).show(200);
		});
		$("img",$("#"+tagName)).eq(0).attr("src",context_path + "/images/jquerytable/details_close_new.png");
	}
}

function getSourceType2(pvSource, pvSourceName){
	var sourceType2Url = context_path + "/model/visitorFlow/visitorFlowSec.jsp";
	var formAction = "<form target='_blank' id='sourceType2Form' name='detailForm' action='"+sourceType2Url+"' method='post'> " +
			"<input type='hidden' id='date' name='date' value='"+$("#DateTopValue").val()+"' />" +
			"<input type='hidden' id='pvSource' name='pvSource' value='"+pvSource+"' />" +
			"<input type='hidden' id='pvSourceName' name='pvSourceName' value='"+pvSourceName+"' />" +
			"</form>";
	$("#hiddenSourceType2Form").html(formAction);
	var url = getDetailURL(pvSourceName);
	if ( url != null ){
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
	        url : context_path + "/advancedDataModel/getVisitorFlowThrdLevelResult.action",
	        type : "post",
	        dataType : "json",
	        data : "filter.flowSourceFirst="+tagName+"&filter.date="+ $("#DateTopValue").val(),
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

var allFlowSourceSecond = "";
function addThrdLevelTable(result, tagName){
	var json = eval(result);	
	var resultData = eval("("+json.resultData+")");
	var tdStr = "";
	var tdWidth = $("#" + tagName +"Lev2").find('td').eq(0).width() - 81 -35 -55;
	tdWidth = tdWidth >= 50 ? tdWidth : 50;
	allFlowSourceSecond = "";
	
	if(resultData.detail && resultData.detail.length>0){
		var allFlowSourceSecondPar = "";
		for(var i =0; i < resultData.detail.length; i ++){
			var sourceId = resultData.detail.flowSourceSecond.value[i];
			if(i != resultData.detail.length-1){
				allFlowSourceSecondPar += sourceId + ",";
			}else{
				allFlowSourceSecondPar += sourceId;
			}
		}

		for(var i =0; i < resultData.detail.length; i ++){
			var sourceName = resultData.detail.SourceName.value[i];
			var sourceId = resultData.detail.flowSourceSecond.value[i];
			var UV = resultData.detail.UV.value[i];
			var UPV = resultData.detail.UPV.value[i];
			var VisitDept = resultData.detail.VisitDept.value[i];
			var SkipOut = resultData.detail.SkipOut.value[i];
			
			if(i != resultData.detail.length-1){
				allFlowSourceSecond += sourceId + ",";
			}else{
				allFlowSourceSecond += sourceId;
			}
			
			tdStr += "<tr class=\""+tagName+"Lev2\">";
			if(isShowUrlDetailForLevel2(sourceId)){
				tdStr += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_3\">"+showFlowSourceTip(sourceName)+"<label id='" + tagName+ "'>" + sourceName + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrendLev3(\""+tagName+"\",\""+sourceId+"\",\""+allFlowSourceSecondPar+"\")'><i></i></a></span><span><a title= \"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+tagName+"\",\""+sourceName+"\",\""+sourceId+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
				//tdStr += "<td style=\"border: 1px solid #CCCCCC;text-align: right;\" class=\"icon report\"><label id='" + tagName+ "'>" + sourceName + "</label>"+showFlowSourceTip(sourceName)+"<a onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\")'><i></i></a><a style='cursor: hand' onclick='getFlowSourceUrl(\""+tagName+"\",\""+sourceName+"\",\""+sourceId+"\")'><label class=\"icon detail\"><i></i></label></a></td>";
			}else{
				tdStr += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_3\">"+showFlowSourceTip(sourceName)+"<label id='" + tagName+ "'>" + sourceName + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='getSourceTrendLev3(\""+tagName+"\",\""+sourceId+"\",\""+allFlowSourceSecondPar+"\")'><i></i></a></span><span><span class=\"tableSpace\"></span></div></td>";
				//tdStr += "<td style=\"border: 1px solid #CCCCCC;text-align: right;\" class=\"icon report\"><label id='" + tagName+ "'>" + sourceName + "</label>"+showFlowSourceTip(sourceName)+"<a onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\")'><i></i></a></td>";
			}
			
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(UV) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(UPV) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(VisitDept, C$.DATATYPE_DOUBLE, 2) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(SkipOut, C$.DATATYPE_PERCENT, 2) + "</td>";
			tdStr += "</tr>";
		}
		$("#" + tagName +"Lev2").after(tdStr);
		$("." + tagName +"Lev2").find('.tableCtLeft_3 label').css('max-width', tdWidth);
	}else{
		B$.T.alert("没有数据。");
	}
	bindTips();
}

/*
 * 三级来源跳转到趋势页面
 */
function getSourceTrendLev3(sourceType,pvSourceSec,allFlowSourceSecondPar){
	var trendUrl = context_path + "/model/visitorFlowTrend/visitorFlowTrend.jsp";
	var formAction = "<form target='_blank' id='trendForm' name='trendForm' action='"+trendUrl+"' method='post'> " +
			"<input type='hidden' id='startDate' name='startDate' value='"+$("#DateTopValue").val()+"' />" +
			"<input type='hidden' id='endDate' name='endDate' value='"+$("#DateTopValue").val()+"' />" +
			"<input type='hidden' id='pvSource' name='pvSource' value='"+sourceType+"' />" +
			"<input type='hidden' id='pvSourceSec' name='pvSourceSec' value='"+pvSourceSec+"' />" +
			"<input type='hidden' id='allFlowSourceSecond' name='allFlowSourceSecond' value='"+allFlowSourceSecondPar+"' />" +
			"</form>";
	$("#hiddenForm").html(formAction);
	var obj = document.getElementById('trendForm');
	obj.submit();
}

function getFlowSourceUrl(flowSourceFirst,flowSourceFirstName,flowSourceSec){
	$("#flowSourceTrendDateForUrl").val($("#DateTopValue").val());
	$("#flowSourceTrendFirstForUrl").val(flowSourceFirst);
	$("#flowSourceTrendFirstNameForUrl").val(flowSourceFirstName);
	$("#flowSourceTrendSecForUrl").val(flowSourceSec);
	$("#hiddenFlowUrlForm").attr("target","_blank").submit();
}


function getExcelName(jTitle){
    return B$.getExcelNameByDate(jTitle,"DateTopValue");
}