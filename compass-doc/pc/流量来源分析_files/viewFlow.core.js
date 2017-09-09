var config = {
    Menu: {
        Id: "viewFlow"
    }
};
$(document).ready(function() {
    //B$.gridRows();
    //B$.printPage();
    //B$.scrollToTop();
    //B$.initMenu(config);
	B$.init(config);
    //加载通知
	loadModuleNotice(config.Menu.Id);
	
	//load systemnotice
	loadSystemNotice();
    A$.setMapping("date1",{
        ajax: false,
        figure: "DATEPICKER",
        plugin: {
            Enable: true,    //false 默认是true
            label: "",
            Type: "range",        //single,range
            View: "!month!week",     //month,day,!week(不能选周)
            Pattern: 0,		//0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
            Range: [7,31],      //[初始化近几天,最大时间范围（除选月模式）]
            DateSeg: ["StartDate","EndDate"] ,
            customQuery:"queryFilter",
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
                    "重置": 7
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
    I$.init(["date1"]);
    I$.run(A$);
    
    //查询之前获取用户版本
    //queryFilter();
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
        		queryFilter();
        	}
        }
	}
}

function queryDetail(){
    //	I$.setDateCache($("#date1DateSeg0").val()+" \u81F3 "+$("#date1DateSeg1").val());
    I$.submit(
        context_path + "/advancedDataModel/getViewFlowResult.action",
        {"filter.startDate": $("#StartDate").val(),
          "filter.endDate": $("#EndDate").val()
        },
        function(_rlt){
            renderDtailTable(_rlt);
            closeDiv();
        },
        true
    );
}

function showBar(zbType){
    A$.setMapping("viewFlowBar",{
        ajax: true,
        action:  C$.PATH+"/advancedDataModel/getViewFlowTopResult.action",
        param: {"filter.startDate": $("#StartDate").val(),
                "filter.endDate": $("#EndDate").val(),
                "filter.zbType": zbType[0]
        },
        format: 11,
        formatKey: ["summary"],
        figure: "CHART",
        plugin: {
            bLegend: true,
            legend:{
                legendMax: 1,
                noTip: true, //是否禁用提示
                event: "viewFlowChange" //自定义指标点击事件
            },
            watermark: context_path+"/images/platform/mainform/WatermarkBig.png",
            title: "<b>TOP10流量来源</b>",
            subtitle: "",
            height: 400,
            zoom:  "x",
            type: "bar",
            columnWidth:15,
            rotation: -45,
            pixelInterval: 80,
            yDataType:  (zbType=="ArrivePagePVPERC"||zbType=="PVPERC")? 1 : 0,//数据轴展示百分比类型设为1
            opposite: {x:false,y:false},
            reversed: {x:true,y:false}
        },
        dataItem: {
            x: {
                "SourceName": {
                    name: "流量来源"
                }
            },
            y: {
                "ArrivePagePV":{
                    name: "到达页浏览量",
                    bShow: true
                }
                ,"ArrivePagePVPERC":{
                    name: "到达页浏览量占比",
                    bShow: false
                }
                , "PV":{
                    name: "浏览量",
                    bShow: false
                },"PVPERC":{
                    name:"浏览量占比",
                    bShow:false
                }
            }
        }

    });
    I$.clrAdapterCache("viewFlowBar", A$);
//    I$.setDateCache($("#date1DateSeg").val());
    A$.extMappingDataItemY("viewFlowBar", B$.DI.diShowExt(A$.getMappingDataItemY("viewFlowBar"), zbType, true));
    I$.init(["viewFlowBar"]);
   /* A$.extMappingParam("viewFlowBar",{"filter.startDate": $("#StartDate").val(),
        "filter.endDate": $("#EndDate").val()
    });*/
    I$.run(A$);
}

function viewFlowChange(zbType){
	if(!checkDateRange("1")){
		return false;
	}
    showBar(zbType);
}

function checkDateRange(ifAlert){
	var range = true;
	if(parseInt($("#StartDate").val().replace(new RegExp("-","gm"),"")) < 20140301 && parseInt($("#EndDate").val().replace(new RegExp("-","gm"),"")) >= 20140301){
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
	if(parseInt($("#StartDate").val().replace(new RegExp("-","gm"),"")) < 20140301 && parseInt($("#EndDate").val().replace(new RegExp("-","gm"),"")) < 20140301){
    	range = false;
    }
	return range;
}

function queryFilter(){
	if(!checkDateRange("1")){
		return false;
	}
	if($("#date1 .rapidSel .radiobox.r-checked").length==0){//非快查则判断前后日期控件区间(1.前小后大2.30天区间)
		var tmpDate = $("#StartDate").val().split("-");
        var tmpStartDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
        tmpDate = $("#EndDate").val().split("-");
        var tmpEndDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
		if($("#StartDate").val()>$("#EndDate").val()){
			B$.T.warn("结束日期应该大于或等于开始日期！");
			return;
		}else if(tmpStartDate.DateDiff('d', tmpEndDate)>A$.getMappingPlugin("date1").Range[1]){
			B$.T.warn("请将查询区间设置在"+A$.getMappingPlugin("date1").Range[1]+"天之内！");
			return;
		}
	}
	I$.setDateCache(($("#date1 .rapidSel .radiobox.r-checked").length>0?$("#date1 .rapidSel .radiobox.r-checked").attr("desc"):"")+" "+$("#date1DateSeg0").val()+" \u81F3 "+$("#date1DateSeg1").val());
    showLoadingV2(5);
   
    showBar(["ArrivePagePV"]);
    queryDetail();
}
function renderDtailTable(data){
	if(!checkDateRange("1")){
		return false;
	}
    var json = eval(data);
    var resultData = eval("("+json.resultData+")");
    createTable(json);
}


//全局的汇总数据
var ArrivePagePVSum = 0;
var PVSum = 0;
var curTbl;
function createTable(jsonResult){
    var strTable = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" style=\"border-collapse:collapse;\" id=\"viewFlowDetailTab\">";
    var result = eval(jsonResult);
    var detailJson = eval("(" + result.resultData + ")");
    strTable += "<thead><tr><th style=\"width:30%\" >来源</th>";
    $.each(result.allDetailZBs, function(i, n) {
        strTable += "<th>";
		//Tip the description
        if( n.des){
            strTable += '<i class="icon-help" desc="' +  n.des + '"></i>' +  n.value;
        }else{
            strTable += n.value;
        }
        strTable += "</th>";
    });
    strTable += "</tr></thead>";
    var length = detailJson.detail ?  parseInt(detailJson.detail.length):0;
    var tempIdx = 0;
    for ( var m = 0; m < length; m++) {
        //日期
        var sourceTypeStr = detailJson.detail["SourceName"].value[m];
        var sourceTypeId = detailJson.detail["FlowSourceFirst"].value[m];
        var sourceSecId = detailJson.detail["FlowSourceSecond"].value[m];
        var parentFlag = detailJson.detail["SourceLevel"].value[m];
        var imgUrl = context_path + "/images/jquerytable/details_close_new.png";
        var imgUrlOpen = context_path + "/images/jquerytable/details_open_new.png";
        if( m == 0 ){//总计
            strTable += "<tr><td class='fwb' ><label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label><i></i></td>";
            $.each(result.allDetailZBs, function(i, n) {
                var attr = n.id;
                var tdStr = (detailJson.detail[attr].value[m] != null ? detailJson.detail[attr].value[m] : "");
                if(n.id == "ArrivePagePV"){
                	ArrivePagePVSum = tdStr;
                }
                if(n.id == "PV"){
                	PVSum = tdStr;
                }
                tdStr = $.jFormatVal(tdStr, n.dataType, n.decimal);
                strTable += "<td class='t-r fwb'>" + tdStr + "</td>";
            });
            strTable += "</tr>";
        }else{
            if(parentFlag == 1){
                strTable += "<tr id='"+sourceTypeId+"' class='parent'>";
                tempIdx = m;
            }else{
                strTable += "<tr id='"+sourceTypeId+"Lev2' class="+detailJson.detail["FlowSourceFirst"].value[tempIdx]+" >";
            }
            if(isShowDetail(sourceTypeStr) && parentFlag != 1){//显示详情
                if ( parentFlag == 2 && sourceSecId != 999999 ){
                	if(sourceTypeStr == "京东搜索" && odpVersionStr == "ODP_ELEMENTARY"){//初级版不显示京东搜索详情
                		strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">"+showFlowSourceTip(sourceTypeStr)+"<label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
                	}else{
                		strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">"+showFlowSourceTip(sourceTypeStr)+"<label>" + sourceTypeStr + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceSec(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
                	}
                }else{
                    strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">"+showFlowSourceTip(sourceTypeStr)+"<label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
                }
            }else if(isShowUrlDetail(sourceTypeStr) && parentFlag != 1 && checkDateRangeShow()==true){//显示url详情
            	if ( parentFlag == 2 && sourceSecId != 999999 ){
            		if(isShowThrdLevel(sourceTypeStr) && checkDateRangeShow() == true){//展开三级分类
            			strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_2\"><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
            			//strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\"><label id='" + sourceTypeId+ "'><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + sourceTypeStr + "</label>"+showFlowSourceTip(sourceTypeStr)+"<a onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a><a style='cursor: hand' onclick='getFlowSourceUrl(\""+sourceTypeId+"\",\""+sourceTypeStr+"\",\"\")'><label class=\"icon detail\"><i></i></label></a></td>";
                	}else{
                		strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+sourceTypeId+"\",\""+sourceTypeStr+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
                		//strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\"><label>" + sourceTypeStr + "</label>"+showFlowSourceTip(sourceTypeStr)+"<a onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a><a style='cursor: hand' onclick='getFlowSourceUrl(\""+sourceTypeId+"\",\""+sourceTypeStr+"\",\"\")'><label class=\"icon detail\"><i></i></label></a></td>";
                	}
                }else{
                	strTable += "<td style=\"text-align:left;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
                    //strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\"><label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label>"+showFlowSourceTip(sourceTypeStr)+"<a onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></td>";
                }
            }else{
                if(parentFlag == 1){
                	strTable += "<td style=\"text-align:left;border:0px solid #CCC;font-weight:bold\"><div class=\"tableCtLeft_0\"><img id= '" + sourceTypeId+ "img' src="+imgUrl+" onclick='closeExspan(\""+sourceTypeId+"\")' />" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrendVirtualFirst(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
                    //strTable += "<td style=\"text-align:left;border:1px solid #CCC;font-weight:bold\" class=\"icon report\"><img id= '" + sourceTypeId+ "img' src="+imgUrl+" onclick='closeExspan(\""+sourceTypeId+"\")' />" + sourceTypeStr +showFlowSourceTip(sourceTypeStr)+"<a onclick='viewFlowTrendVirtualFirst(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></td>";
                }else{
                	if(isShowThrdLevel(sourceTypeStr)  && checkDateRangeShow() == true){//展开三级分类
                		strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_2\"><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + showFlowSourceTip(sourceTypeStr)+ sourceTypeStr +"</div><div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
                		//strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\"><label id='" + sourceTypeId+ "'><img id= '" + sourceTypeId+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+sourceTypeId+"\")' />" + sourceTypeStr + "</label>"+showFlowSourceTip(sourceTypeStr)+"<a onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></td>";
                	}else{
                		strTable += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_1\">"+showFlowSourceTip(sourceTypeStr)+"<label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></span><span class=\"tableSpace\"></span></div></td>";
                		//strTable += "<td style=\"padding-left:50px;text-align:left;border:1px solid #CCC;\" class=\"icon report\"><label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label>"+showFlowSourceTip(sourceTypeStr)+"<a onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></td>";
                	}
                    //strTable += "<td style=\"text-align:right;border:1px solid #CCC;\" class=\"icon report\"><label id='" + sourceTypeId+ "'>" + sourceTypeStr + "</label>"+showFlowSourceTip(sourceTypeStr)+"<a onclick='viewFlowTrend(\""+sourceTypeId+"\",\""+sourceSecId+"\")'><i></i></a></td>";
                }
            }
            $.each(result.allDetailZBs, function(i, n) {
                var attr = n.id;
                var tdStr = (detailJson.detail[attr].value[m] != null ? detailJson.detail[attr].value[m] : "");
                // 小数位个数
               /* if(n.dataType == 1)
                    tdStr = format_number(tdStr,2);
                if(n.dataType == 6)
                    tdStr = format_number(tdStr * 100,2)+"%";
                // 逗号分隔符
                if(n.dataType==0 ||n.dataType==1 || n.dataType == 6){
                    tdStr = CommaFormatted(tdStr);
                }*/
                tdStr = $.jFormatVal(tdStr, n.dataType, n.decimal);
                strTable += "<td style=\"text-align:right;border:0px solid #CCC;\">" + tdStr + "</td>";
            });
            strTable += "</tr>";
        }
    }// end for
    strTable += "</table>";
    $("#viewFlowDetail").html(strTable);

    curTbl = $("#viewFlowDetailTab").dataTable({
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
    B$.cfgClear("Table");
	B$.cfgAdd("Table", {GridSlider: false,ColDrag:false});
	
    B$.globalAdd("Table", curTbl, "viewFlowDetail");
    
    B$.tables["viewFlowDetail"] = curTbl;
    B$.dnExcelAdd("viewFlowDetail", "viewFlowDetailTab");
    
    $("#viewFlowDetailTab .headerWidth").css("width","280px");
    $('i.icon-help',$("#viewFlowDetailTab")).Jtips({
        "content": "暂无描述",
        "position": 'bottom',
        "width": 196
    });
    new FixTableHeader({id:"viewFlowDetailTab"});
}

function closeExspan(tagName){
    if($("img",$("#"+tagName)).eq(0).attr("src").indexOf("details_close_new.png")>=0){
        $("."+tagName).each(function(){
            $(this).hide();
            //console.log($(this).jId().replace("Lev2","") + "==" + $("#" + $(this).jId().replace("Lev2","") + "img").attr("src"));
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

function closeExspanThrdLevel(tagName){
	if(!checkDateRange("1")){
		return false;
	}
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
	        url : context_path + "/advancedDataModel/getThrdLevelResult.action",
	        type : "post",
	        dataType : "json",
	        data : "filter.flowSourceFirst="+tagName+"&filter.startDate="+ $("#StartDate").val()+"&filter.endDate="+$("#EndDate").val(),
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

function addThrdLevelTable(result, tagName){
	var json = eval(result);	
	var resultData = eval("("+json.resultData+")");
	var tdStr = "";
    var tdWidth = $("#" + tagName +"Lev2").find('td').eq(0).width() - 81 -35 -55;
    tdWidth = tdWidth >= 50 ? tdWidth : 50;
	var allFlowSourceSecond = "";
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
			var ArrivePagePVValue = resultData.detail.ArrivePagePV.value[i];
			var PVValue = resultData.detail.PV.value[i];
			
			if(i != resultData.detail.length-1){
				allFlowSourceSecond += sourceId + ",";
			}else{
				allFlowSourceSecond += sourceId;
			}
			
			tdStr += "<tr class=\""+tagName+"Lev2\">";
			//判断二级来源是否需要展开
			if(isShowUrlDetailForLevel2(sourceId)){
				tdStr += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_3\">"+showFlowSourceTip(sourceName)+"<label id='" + sourceId+ "'>" + sourceName + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\",\""+allFlowSourceSecondPar+"\")'><i></i></a></span><span><a title= \"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+tagName+"\",\""+sourceName+"\",\""+sourceId+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
				//tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\" class=\"icon report\"><label id='" + tagName+ "'>" + sourceName + "</label>"+showFlowSourceTip(sourceName)+"<a onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\")'><i></i></a><a style='cursor: hand' onclick='getFlowSourceUrl(\""+tagName+"\",\""+sourceName+"\",\""+sourceId+"\")'><label class=\"icon detail\"><i></i></label></a></td>";
			}else{
				tdStr += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_3\">"+showFlowSourceTip(sourceName)+"<label id='" + sourceId+ "'>" + sourceName + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a title=\"查看趋势\" class=\"icon report\" onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\",\""+allFlowSourceSecondPar+"\")'><i></i></a></span><span><span class=\"tableSpace\"></span></div></td>";
				//tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\" class=\"icon report\"><label id='" + tagName+ "'>" + sourceName + "</label>"+showFlowSourceTip(sourceName)+"<a onclick='viewFlowTrendLev3(\""+tagName+"\",\""+sourceId+"\")'><i></i></a></td>";
			}
			
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(ArrivePagePVValue) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(ArrivePagePVValue/ArrivePagePVSum, C$.DATATYPE_PERCENT, 2) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(PVValue) + "</td>";
			tdStr += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(PVValue/PVSum, C$.DATATYPE_PERCENT, 2) + "</td>";
			tdStr += "</tr>";
		}
	    //$("#flowSourceTrendDataSecond").val(allFlowSourceSecond);
		$("#" + tagName +"Lev2").after(tdStr);
        $("." + tagName +"Lev2").find('.tableCtLeft_3 label').css('max-width', tdWidth);
		$('i.icon-help',$("#viewFlowDetailTab")).Jtips({
		        "content": "暂无描述",
		        "position": 'bottom',
		        "width": 196
		});
	}else{
		B$.T.alert("没有数据。");
	}
}

function getFlowSourceSec(flowSourceFirst,flowSourceFirstName){
    var url = getDetailURL(flowSourceFirstName);
    if ( url != null ){
        $("#hiddenFlowSourceSecForm").attr("action",url);
    }else{
    	 $("#hiddenFlowSourceSecForm").attr("action","viewFlowSec.jsp");
    }
    $("#flowSourceSecStartDate").val($("#StartDate").val());
    $("#flowSourceSecEndDate").val($("#EndDate").val());
    $("#flowSourceFirst").val(flowSourceFirst);
    $("#flowSourceFirstName").val(flowSourceFirstName);
    $("#hiddenFlowSourceSecForm").attr("target","_blank").submit();
}

/**
 *  查看趋势
 * @param viewFlowFirst
 * @param viewFlowSecond
 */
function viewFlowTrend(viewFlowFirst,viewFlowSecond){
    $("#flowSourceTrendStartDate").val($("#StartDate").val());
    $("#flowSourceTrendEndDate").val($("#EndDate").val());
    $("#flowSourceTrendFirst").val(viewFlowFirst);
    $("#flowSourceTrendSecond").val("-2147483648");
    $("#flowSourceTrendVirtualFirst").val("-2147483648");
    $("#hiddenFlowTrendForm").attr("target","_blank").submit();
}

function viewFlowTrendVirtualFirst(viewFlowFirst){
    $("#flowSourceTrendStartDate").val($("#StartDate").val());
    $("#flowSourceTrendEndDate").val($("#EndDate").val());
    $("#flowSourceTrendVirtualFirst").val(viewFlowFirst);
    $("#hiddenFlowTrendForm").attr("target","_blank").submit();
}

/*
 * 三级分类，跳转到趋势分析，获取所有有数据的三级分类id
 */
function viewFlowTrendLev3(viewFlowFirst,viewFlowSecond,allFlowSourceSecondPar){
	$("#flowSourceTrendStartDate").val($("#StartDate").val());
    $("#flowSourceTrendEndDate").val($("#EndDate").val());
    $("#flowSourceTrendFirst").val(viewFlowFirst);
    $("#flowSourceTrendSecond").val(viewFlowSecond);
    $("#flowSourceTrendDataSecond").val(allFlowSourceSecondPar);
    $("#hiddenFlowTrendForm").attr("target","_blank").submit();
}

function getAllFlowSourceSecond(data){
    /*var json = eval(data);
    var detailJson = eval("(" + json.resultData + ")");
    if ( detailJson && detailJson.detail.FlowSourceSecond){
       var flowSourceSecond =detailJson.detail.FlowSourceSecond.value;
        if(flowSourceSecond && flowSourceSecond.length > 0 ){
            $("#flowSourceTrendDataSecond").val(flowSourceSecond.join(","));
        }
    }*/
}

/*
 * 跳转到URL详情页面
 */
function getFlowSourceUrl(flowSourceFirst,flowSourceFirstName,flowSourceSec){
	$("#flowSourceTrendStartDateForUrl").val($("#StartDate").val());
	$("#flowSourceTrendEndDateForUrl").val($("#EndDate").val());
	$("#flowSourceTrendFirstForUrl").val(flowSourceFirst);
	$("#flowSourceTrendFirstNameForUrl").val(flowSourceFirstName);
	$("#flowSourceTrendSecForUrl").val(flowSourceSec);
	$("#hiddenFlowUrlForm").attr("target","_blank").submit();
}

function getExcelName(jTitle){
    return B$.getExcelNameByStartEndDate(jTitle,"StartDate","EndDate");
}