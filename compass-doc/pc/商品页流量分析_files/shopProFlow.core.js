var config = {
	Menu : {
		Id : "shopProFlow"
	}
}, zbGlobal, currentSel = "TOP15", currentSelId = "", currentSelName = "";

var proName = "", proUrl = "", imgSrc = "";//全局的图片信息

$(function() {
	B$.init(config);
	//加载通知
	loadModuleNotice(config.Menu.Id);
	//load systemnotice
	loadSystemNotice();
	A$.setMapping("datePicker", {
		ajax : false,
		figure : "DATEPICKER",
		plugin : {
			Enable : true, // false 默认是true
			label : "",
			Rapid : true, // [false, true] false(1): 是否有快查; true(1):是否自定义click
			rapidSel : { // 如果快查功能启动，则配置快查规则
				item : {
					"昨天" : 0,
					"前天" : 0,
					"本周" : 0,
					"上周" : 0,
					"本月" : 0,
					"上月" : 0
				},
				external : true
			// 是否外置
			},
			customQuery : "refreshFilterCore",
			bNote : false, // 判断是否有日期选择器说明
			bDimension : true, // 是否按日/周/月选择
			dimension : {
				item : [ "!month!week", "week", "month" ],
				bEmbed : true
			},
			Type : "single", // single,range
			View : "day", // month,day,!week(不能选周)
			Pattern : 2, // 0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
			Range : [ 7, 30 ], // [初始化近几天,最大时间范围（除选月模式）]
			Calendars : 2,
			DateSeg : [ "CurDate" ]
		}
	});
	
	
	I$.init([ "datePicker" ]);
	I$.run(A$);
	A$.setMapping("RangeSel", {
		format : 0,
		custom : {
			customData : {
				"TOP15" : "TOP15商品页",
				"Resent" : "最新上架",
				"Search" : "按SPU搜索"
			}
		},
		figure : "SELECT",
		plugin : {
			type : "single",
			style : "colorize",
			label : "选择商品页",
			width : 120,
			event : "selRange"
		}
	});
	I$.init([ "RangeSel" ]);
	I$.run(A$);
	//getTop15();
	getOdpVersion();
	
	tabClick();
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
        		getTop15();
        	}
        }
	}
}

/**
 * 渲染所有数据
 */
function renderData() {
	I$.clrAdapterCache();
	var params;
	if (currentSelId && currentSelId != '') {
		params = {
			 "filter.date" : $("#CurDate").val(),
			 "filter.spu" : currentSelId
			 //"filter.proName" : currentSelName
		};
	}else{
		 params = {
				 "filter.date" : $("#CurDate").val(),
				 "filter.spu" : '00000000'
				 //"filter.proName" : '无'
		};
	}
	//renderProList(params);
	doAjaxQuery(C$.PATH + "/advancedDataModel/getShopProFlowStat.action",params,renderProDiv);
}

function renderProDiv(result){
	var json = eval(result);
	var resultData = eval("("+json.resultData+")");
	var params;
	if(resultData!=null && resultData!=undefined 
			&& resultData.detail!=null && resultData.detail!=undefined 
			&& !!resultData.detail.length && resultData.detail.length>0){
		
		loadProductSpuPic(resultData.detail.ProSKU.value[0]);
		$("#proName").text(resultData.detail.ProName.value[0].replace("&#40;","(").replace("&#41;",")"));
		params = {
				"filter.date" : $("#CurDate").val(),
				"filter.spu" : currentSelId,
				"filter.proName" : resultData.detail.ProName.value[0].replace("&#40;","(").replace("&#41;",")")
		};
    }else{
    	loadProductSpuPic("");
    	$("#proName").text("");
    	params = {
    			"filter.date" : $("#CurDate").val(),
    			"filter.spu" : '00000000',
    			"filter.proName" : '无'
    	};
    }
	renderGrid('div_allSumZBs',{id: "Visit",name:"流量",gClass: "visits"},json.allSumZBs, resultData.detail);
	//渲染较上期比较数据
	var index = 0;
	$('.info-line').each(function(){
		if(resultData.detail && resultData.detail.flowRate && resultData.detail.flowRate.value.length > 0){
			var flowRate = resultData.detail.flowRate.value[index];
			if(flowRate > 0){
				$(this).html($(this).html() + "<div style='left:32px;top:27px;position:absolute;'><span style='color:gray'>较上期</span></div><div style='left:auto;padding-right:9px;right:1px;top:27px;position: absolute;'><i class='i-up'>"+$.jFormatVal(flowRate, C$.DATATYPE_PERCENT, 2)+"</i></div>");
			}else{
				flowRate = flowRate.toString().replace("-","");
				$(this).html($(this).html() + "<div style='left:32px;top:27px;position:absolute;'><span style='color:gray'>较上期</span></div><div style='left:auto;padding-right:9px;right:1px;top:27px;position: absolute;'><i class='i-down'>"+$.jFormatVal(flowRate, C$.DATATYPE_PERCENT, 2)+"</i></div>");
			}
			index += 1;
		}else{
			$(this).html($(this).html() + "<div style='left:32px;top:27px;position:absolute;'><span style='color:gray'>较上期</span></div><div style='left:auto;padding-right:9px;right:1px;top:27px;position: absolute;'>--</div>");
		}
	});
	$(".info-details").css("height", "65px");
	$(".visits").parent().css("height", "65px");
	$(".visits").parent().css("line-height", "65px");
	if(currentTab == "currentTab1"){
		renderTable(params);
	} else if(currentTab == "currentTab2"){
		queryConvertData();
	} else{
		queryRelativeData();
	}
	$.unblockUIV2();
}

function loadProductSpuPic(_spuIds){
    //将spuid传到后台
    $.ajax({
        url : context_path+"/getProductSkuForOneBySpu.action",
        async: false,
        type : "post",
        dataType : "json",
        data : {"filter.spuId":_spuIds},
        success : function(jsonData){
            loadProductSkuClass(jsonData,$("#proImg"));
            initProNameLinkBySPU(jsonData);
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

function initProNameLinkBySPU(_jsonData){
    var resultData = eval("("+_jsonData.resultData+")");
    if( resultData == null || resultData.length == 0 ) {
        return;
    }
    if( !resultData["SKUIDS"] ){
        $("#proImg").attr("src",context_path+'/skin/i/noPic.png');
        return;
    }

    var skuIDs = resultData["SKUIDS"].value;
    if( skuIDs.length > 0 ){
        initProNameLink(skuIDs[0]);
    }
}

function checkDateRangeShow(){
	var range = true;
	var timeStr = $("#CurDate").val().replace(new RegExp("-","gm"),"");
	if(timeStr.length == 6){//月
		if(parseInt(timeStr) < 201406){
			range = false;
		}
	}
	if(timeStr.indexOf("99") > -1){//周
		if(parseInt(timeStr) < 20149923){
	    	range = false;
	    }
	}
	if(timeStr.indexOf("99") == -1 && timeStr.length == 8){//日
		if(parseInt(timeStr) < 20140601){
	    	range = false;
	    }
	}
	return range;
}

function initProNameLink(sku){
    $("#proName").attr("href","http://item.jd.com/"+sku+".html");
}

var pvSum = 0;
function createTable(data) {
    var result = eval("(" + data.resultData + ")").detail;
    var allDetailZBs = data.allDetailZBs;
    var imgUrl = context_path + "/images/jquerytable/details_close_new.png";
    var imgUrlOpen = context_path + "/images/jquerytable/details_open_new.png";
    var root = !!result ? result.zbData: null;
    var sumSkipOutRate = 0.00;
    var sumAvgStayTime = 0.00;
    if(root != null){
        pvSum = root.data[0];
        sumSkipOutRate = result.sumSkipOutRate;
        sumAvgStayTime = result.sumAvgStayTime;
    }
    TABLE.begin({
        cellpadding: 0,
        cellspacing: 0,
        border: 0,
        "class": "display",
        style: "border-collapse:collapse;",
        id: "detailTable"
    }).append("<thead>").trOpen().th("最近访问来源").th("流量", {
        colspan: 2
    }).th("渠道质量", {
        colspan: 2
    }).th("最近访问去向", {
        colspan: 5
    }).trClose().trOpen().th("渠道");
    $.each(allDetailZBs,
    function(i, n) {
        var str = "";
        if (n.des) {
            str += '<i class="icon-help" desc="' + n.des + '"></i>' + n.value;
        } else {
            str += n.value;
        }
        //str += "</label>";
        TABLE.th(str);
    });
    TABLE.trClose().append("</thread>").append("<tbody>");
    if (root) {
    	root.data[2] = sumAvgStayTime;
    	root.data[3] = sumSkipOutRate;
    	for(var i=0; i<root.data.length; i++){
        	if(i != 1){
        		if(root.data[i].toString().indexOf("%") > -1){
        			root.data[i] = root.data[i];
        		} else{
        			if(i == 3){
                		root.data[i] = $.jFormatVal(root.data[i], C$.DATATYPE_PERCENT, 2)
        			} else if(i == 2){
        				root.data[i] = getAvgStayTimeFormat(root.data[i]);
        			} else{
        				root.data[i] = CommaFormatted(root.data[i]);
        			}
        		}
        	}
        }
    	
        TABLE.trOpen().td("总计",{
        	'class': 'fwb'
        }).tds(root.data, null, {
            'class': 'td-r fwb'
        }).trClose();
        var children = root.children || [];
        // 渲染数据
        $.each(children,
        function(index, levelOne) {
            var source = levelOne.sourceType;
            if (source) {
                var source1ID = source.id,
                name = source.name;
                TABLE.trOpen({
                    "class": "parent",
                    id: source1ID
                }).append("<td class = 'levelOne chart-column'>")
                  .append("<div class=\"tableCtLeft_0\"><img src = '" + imgUrl + "' onclick = ' closeExspan(" + source1ID + ")'>")
                  .append(showFlowSourceTip(name) +"<label>" + name + "</label></div>" )
                  .append("<div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+source1ID+"\",\""+name+"\",\"999999\",\"N\",\"999999\",\"N\",\"N\")' title=\"查看趋势\"><i></i></a></span><span class=\"tableSpace\"></span></div>")
                  .append("</td>");
                for(var i=0; i<levelOne.data.length; i++){
                	if(i != 1){
                		if(i == 3){
                			levelOne.data[i] = $.jFormatVal(levelOne.data[i], C$.DATATYPE_PERCENT, 2);
                		} else if(i == 2){
                			levelOne.data[i] = getAvgStayTimeFormat(levelOne.data[i]);
                		} else{
                			levelOne.data[i] = CommaFormatted(levelOne.data[i]);
                		}
                	}
                }
                TABLE.tds(levelOne.data, null, {
                    'class': 'td-r'
                });
                TABLE.trClose();
                $.each(levelOne.children,
                function(index, levelTwo) {
                    var sourceType = levelTwo.sourceType;
                    if (sourceType) {
                        var source2Name = sourceType.name,
                        pid = sourceType.pid,
                        source2ID = sourceType.id;
                        TABLE.trOpen({
                            "class": pid,
                            id:source2ID + "Lev2"
                        });
                        if (isShowDetail(source2Name)) {
                        		if(source2Name=="京东搜索" && odpVersionStr=="ODP_ELEMENTARY"){
                        			TABLE.append("<td><div class=\"tableCtLeft_1\">"+showFlowSourceTip(source2Name)+"<label>" + source2Name + "</label></div>" )
                        		 .append("<div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+pid+"\",\"N\",\""+source2ID+"\",\""+source2Name+"\",\"999999\",\"N\",\"N\")' title=\"查看趋势\"><i></i></a></span><span class=\"tableSpace\"></span></div>")
                                 .append("</td>");
                        		}else if(source2Name=="京东搜索" && odpVersionStr!="ODP_ELEMENTARY"){
                        			TABLE.append("<td><div class=\"tableCtLeft_1\">"+ showFlowSourceTip(source2Name)+"<label>" + source2Name + "</label></div>" )
                        		 .append("<div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+pid+"\",\"N\",\""+source2ID+"\",\""+source2Name+"\",\"999999\",\"N\",\"N\")' title=\"查看趋势\"><i></i></a></span>")
                                 .append("<a onclick='popKW(\""+pid+"\",\"N\",\""+source2ID+"\",\""+source2Name+"\",\"999999\",\"N\")'><label class=\"icon detail\">")
                        		 .append("<i></i></label></a></div>").append("</td>");
                        		}else{
                        			TABLE.append("<td><div class=\"tableCtLeft_1\">"+ showFlowSourceTip(source2Name)+"<label>" + source2Name + "</label></div>" )
                           		 .append("<div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+pid+"\",\"N\",\""+source2ID+"\",\""+source2Name+"\",\"999999\",\"N\",\"N\")' title=\"查看趋势\"><i></i></a></span>")
                                    .append("<a onclick='getSourceType3(\"" + source2ID + "\",\"" + source1ID + "\",\"" + source2Name + "\")'><label class=\"icon detail\">")
                                    .append("<i></i></label></a></div>").append("</td>");
                           		}
                        } else {
                        	if(isShowThrdLevel(source2Name) && checkDateRangeShow() == true){//展开三级分类
                        		if(isShowUrlDetail(source2Name) && checkDateRangeShow() == true){//显示url详情
                        			 TABLE.append("<td><div class=\"tableCtLeft_2\"><img id= '" + source2ID+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+source1ID+"\",\""+source2ID+"\")' />"+showFlowSourceTip(source2Name)+"<label>" + source2Name + "</label></div><div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+pid+"\",\"N\",\""+source2ID+"\",\""+source2Name+"\",\"999999\",\"N\",\"N\")' title=\"查看趋势\"><i></i></a></span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+source1ID+"\",\""+source2Name+"\",\""+source2ID+"\")'><label class=\"icon detail\"><i></i></label></a></div>" )
                        			 .append("</td>");
                        		}else{
                        			 TABLE.append("<td><div class=\"tableCtLeft_2\"><img id= '" + source2ID+ "img' src="+imgUrlOpen+" onclick='closeExspanThrdLevel(\""+source1ID+"\",\""+source2ID+"\")' />"+showFlowSourceTip(source2Name)+"<label>" + source2Name + "</label></div>" )
                                     .append("<div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+pid+"\",\"N\",\""+source2ID+"\",\""+source2Name+"\",\"999999\",\"N\",\"N\")' title=\"查看趋势\"><i></i></a></span><span class=\"tableSpace\"></span></div>")
                        			 .append("</td>");
                        		}
                        	}else{
                        		if(isShowUrlDetail(source2Name) && checkDateRangeShow() == true){//显示url详情
                                    TABLE.append("<td><div class=\"tableCtLeft_1\">"+showFlowSourceTip(source2Name)+"<label>" + source2Name + "</label></div><div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+pid+"\",\"N\",\""+source2ID+"\",\""+source2Name+"\",\"999999\",\"N\",\"N\")' title=\"查看趋势\"><i></i></a></span><a title=\"查看详情\" style='cursor: hand' onclick='getFlowSourceUrl(\""+source1ID+"\",\""+source2Name+"\",\""+source2ID+"\")'><label class=\"icon detail\"><i></i></label></a></div>" )
                                    .append("</td>");
                        		}else{
                                    TABLE.append("<td><div class=\"tableCtLeft_1\">"+showFlowSourceTip(source2Name)+"<label>" + source2Name + "</label></div>" )
                                    .append("<div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+pid+"\",\"N\",\""+source2ID+"\",\""+source2Name+"\",\"999999\",\"N\",\"N\")' title=\"查看趋势\"><i></i></a></span><span class=\"tableSpace\"></span></div>")
                                    .append("</td>");
                        		}
                        	}
                        }
                        for(var i=0; i<levelTwo.data.length; i++){
                        	if(i != 1){
                        		if(i == 3){//跳失率格式
                        			levelTwo.data[i] = $.jFormatVal(levelTwo.data[i], C$.DATATYPE_PERCENT, 2);
                        		} else if(i == 2){
                               		levelTwo.data[i] = getAvgStayTimeFormat(levelTwo.data[i]);
                        		} else{
                        			levelTwo.data[i] = CommaFormatted(levelTwo.data[i]);
                        		}
                        	}
                        }
                        TABLE.tds(levelTwo.data, null, {
                            'class': 'td-r'
                        });
                        TABLE.trClose();
                    }
                });
            }
        });
    } else {
        TABLE.append("</thread>").append("<tbody>");
    }
    TABLE.append("</tbody>").end().show("resultDiv");
    $("#downTBDiv").html($("#resultDiv").html().replace("detailTable","downTB"));
    
    $("#detailTable thead tr th").eq(0).css("width","295px");
    var tableObj = $("#detailTable").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "bSort": false,
        "sScrollX": "100%",
        "sScrollXInner": "110%",
        "bScrollCollapse": true,
        "bAutoWidth": true
    });
    B$.dnExcelAdd("resultDiv", "downTB");
    
    $('.dataTables_scrollBody').css({"overflow-x":"scroll"});//鼠标划过table内容时,表格所占区域变大bug修复
    if(root != null){
    	var fc = new FixedColumns(tableObj, {
    		"sLeftWidth": "fixed",
     		"iLeftColumns": 1,
    		"iLeftWidth": 295,
    		"fnDrawCallback": function (_left, _right) {
    			$(".dataTables_scroll").css("overflow","auto");
                $(".dataTables_scroll .dataTables_scrollHead").css("overflow","");
                $(".dataTables_scroll .dataTables_scrollBody").css("overflow","");
    			$(".DTFC_LeftHeadWrapper th:eq(0)").attr("style","width:295px");
    			$(".DTFC_LeftBodyWrapper").css({"overflow":"visible"});
    		}
     	});
        $(".dataTables_scroll .dataTables_scrollBody").css("overflow-x","");
        fixed_set("resultDiv");
        $('i.icon-help').Jtips({
            "content": "暂无描述",
            "position": 'bottom',
            "width": 196
        });
        setTimeout(function(){
        	fc._fnGridLayout();
        },0);
    }
}

function getSourceType3(source2ID, source1ID, source2Name) {
	var sourceType2Url = context_path + "/model/shopProFlow/shopProFlowSec.jsp";
	var formAction = "<form target='_blank' id='sourceType2Form' name='detailForm' action='"
			+ sourceType2Url
			+ "' method='post'> "
			+ "<input type='hidden' id='source1ID' name='source1ID' value='"
			+ source1ID
			+ "' />"
			+ "<input type='hidden' id='source2ID' name='source2ID' value='"
			+ source2ID
			+ "' />"
			+ "<input type='hidden' id='date' name='date' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='currentSel' name='currentSel' value='"
			+ currentSel
			+ "' />"
			+ "<input type='hidden' id='currentSelId' name='currentSelId' value='"
			+ currentSelId
			+ "' />"
			+ "<input type='hidden' id='dimension' name='dimension' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("ref"):"")
			+ "' />"
			+ "<input type='hidden' id='proName_name' name='proName' value='"
			+ currentSelName
			+ "' />"
			+ "<input type='hidden' id='rapid' name='rapid' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("desc"):"")
			+ "' />"
			+ "<input type='hidden' id='searchProName' name='searchProName' value='"
			+ $('#goodscode').val()
			+ "' />"
			+ "<input type='hidden' id='searchProId' name='searchProId' value='"
			+ $('#goodscodeHide').val()
			+ "' />"
			+ "<input type='hidden' id='viewSourceName1' name='viewSourceName1' value='"
			+ source2Name + "' />" + "</form>";
	$("#hiddenSourceType2Form").html(formAction);
	var url = getDetailURL(source2Name);
	if (url != null) {
		$("#sourceType2Form").attr("action", url);
	}
	var obj = document.getElementById('sourceType2Form');
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

/*处理一级流量来源展开*/
function closeExspanThrdLevel(source1ID, tagName){
	var currentTableHeight = $(".DTFC_ScrollWrapper").height();
	var needToDelHeight = 0;
	if(tagName == 51){
		needToDelHeight = Height_51;
	} else if(tagName == 88){
		needToDelHeight = Height_88;
	} else if(tagName == 147){
		needToDelHeight = Height_147;
	}
	if($("#"+tagName+"img").attr("src").indexOf("details_close_new.png")>=0){
        $("."+tagName + "Lev2").each(function(){
            $(this).hide(200);
        });
        $("#"+tagName+"img").attr("src",context_path + "/images/jquerytable/details_open_new.png");
        $(".DTFC_ScrollWrapper").height(currentTableHeight - needToDelHeight);
        return false;
    }else{
    	$("#"+tagName+"img").attr("src",context_path + "/images/jquerytable/details_close_new.png");
    }
	
	//查询当前二级分类下的三级分类
	 $.ajax({
	        url : context_path + "/advancedDataModel/getShopProFlowThrdLevelResult.action",
	        type : "post",
	        dataType : "json",
	        data : "filter.source1ID="+source1ID+"&filter.source2ID="+ tagName+"&filter.date="+ $("#CurDate").val()+"&filter.spu="+currentSelId,
	        success : function(_rlt){
	        	addThrdLevelTable(_rlt, tagName, source1ID);
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

var allFlowSourceSecondPar = "";
var Height_51 = 0, Height_88 = 0, Height_147 = 0;
function addThrdLevelTable(result, tagName, source1ID){
	allFlowSourceSecondPar = "";
	var json = eval(result);	
	var resultData = eval("("+json.resultData+")");
	var tdStrLeft = "";
	var tdStrRight = "";
	var tdWidth = $("#" + tagName +"Lev2").find('td').eq(0).width() - 81 -35 -55;
	tdWidth = tdWidth >= 50 ? tdWidth : 50;
	if(resultData.detail && resultData.detail.length>0){
		var needToAddHeight = 0;
		//var allFlowSourceSecondPar = "";
		for(var i =0; i < resultData.detail.length; i ++){
			var sourceId = resultData.detail.Source2.value[i];
			if(i != resultData.detail.length-1){
				allFlowSourceSecondPar += sourceId + ",";
			}else{
				allFlowSourceSecondPar += sourceId;
			}
		}
		for(var i =0; i < resultData.detail.length; i ++){
			var sourceName = resultData.detail.SourceName.value[i];
			var sourceId = resultData.detail.Source2.value[i];
			var pv = resultData.detail.PV.value[i];
			var avgStayTime = getAvgStayTimeFormat(resultData.detail.AvgStayTime.value[i]);
			var skipOutRate = resultData.detail.SkipOutRate.value[i];
			var toOrderPV = resultData.detail.ToOrderPV.value[i];
			var toCartPV = resultData.detail.ToCartPV.value[i];
			var toOtherPagePV = resultData.detail.ToOtherPagePV.value[i];
			var toAttentionPV = resultData.detail.ToAttentionPV.value[i];
			var exitPV = resultData.detail.ExitPV.value[i];
			
			tdStrLeft += "<tr class=\""+tagName+"Lev2\">";
			//判断三级来源是否显示详情
			if(isShowUrlDetailForLevel2(sourceId)){
				tdStrLeft += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_3\">"+showFlowSourceTip(sourceName)+"<label id='" + tagName+ "'>" + sourceName + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+source1ID+"\",\"N\",\""+tagName+"\",\"N\",\""+sourceId+"\",\""+sourceName+"\",\""+allFlowSourceSecondPar+"\")' title=\"查看趋势\"><i></i></a></span><span><a title= \"查看详情\" style='cursor: hand' onclick='getFlowSourceUrlForLev3(\""+tagName+"\",\""+sourceName+"\",\""+sourceId+"\")'><label class=\"icon detail\"><i></i></label></a></span></div></td>";
			}else{
				tdStrLeft += "<td style=\"text-align:right;border:0px solid #CCC;\"><div class=\"tableCtLeft_3\">"+showFlowSourceTip(sourceName)+"<label id='" + tagName+ "'>" + sourceName + "</label></div>"+"<div class=\"fr\"><span class=\"mr5\"><a class=\"icon report\" onclick='getSourceTrend(\""+source1ID+"\",\"N\",\""+tagName+"\",\"N\",\""+sourceId+"\",\""+sourceName+"\",\""+allFlowSourceSecondPar+"\")' title=\"查看趋势\"><i></i></a></span><span><span class=\"tableSpace\"></span></div></td>";
			}
			tdStrLeft += "</tr>";
			
			tdStrRight += "<tr class=\""+tagName+"Lev2\">";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(pv) + "</td>";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(pv/pvSum, C$.DATATYPE_PERCENT, 2) + "</td>";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + avgStayTime + "</td>";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + $.jFormatVal(skipOutRate, C$.DATATYPE_PERCENT, 2)  + "</td>";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(toCartPV) + "</td>";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(toOrderPV) + "</td>";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(toAttentionPV) + "</td>";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(toOtherPagePV) + "</td>";
			tdStrRight += "<td style=\"border: 0px solid #CCCCCC;text-align: right;\">" + CommaFormatted(exitPV) + "</td>";
			tdStrRight += "</tr>";
			needToAddHeight += 25;
		}
		$(".DTFC_LeftWrapper #" + tagName +"Lev2").after(tdStrLeft);
		$(".DTFC_LeftWrapper ." + tagName +"Lev2").find('.tableCtLeft_3 label').css('max-width', tdWidth);
		$("#" + tagName + "Lev2",$('.dataTables_scroll .dataTables_scrollBody')).after(tdStrRight);
		
		setTimeout(function(){
			$('i.icon-help').Jtips({
		        "content": "暂无描述",
		        "position": 'bottom',
		        "width": 196
			});
		},100);
		if(tagName == 51){
			Height_51 = needToAddHeight + resultData.detail.length*8;
		} else if(tagName == 88){
			Height_88 = needToAddHeight + resultData.detail.length*8;
		} else if(tagName == 147){
			Height_147 = needToAddHeight + resultData.detail.length*8;
		}
		$(".DTFC_ScrollWrapper").height($(".DTFC_ScrollWrapper").height() + needToAddHeight + resultData.detail.length*8);
	}else{
		B$.T.alert("没有数据。");
	}
}

/*
 * 跳转到URL详情页面
 */
function getFlowSourceUrl(flowSourceFirst,flowSourceFirstName,flowSourceSec){
	var sourceType2Url = context_path + "/model/shopProFlow/shopProFlowUrl.jsp";
	var formAction = "<form target='_blank' id='sourceTypeUrlForm' name='detailForm' action='"
			+ sourceType2Url
			+ "' method='post'> "
			+ "<input type='hidden' id='source1ID' name='source1ID' value='"
			+ flowSourceFirst
			+ "' />"
			+ "<input type='hidden' id='source2ID' name='source2ID' value='"
			+ flowSourceSec
			+ "' />"
			+ "<input type='hidden' id='source3ID' name='source3ID' value='999999'/>"
			+ "<input type='hidden' id='date' name='date' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='currentSel' name='currentSel' value='"
			+ currentSel
			+ "' />"
			+ "<input type='hidden' id='currentSelId' name='currentSelId' value='"
			+ currentSelId
			+ "' />"
			+ "<input type='hidden' id='dimension' name='dimension' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("ref"):"")
			+ "' />"
			+ "<input type='hidden' id='proName' name='proName' value='"
			+ currentSelName
			+ "' />"
			+ "<input type='hidden' id='rapid' name='rapid' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("desc"):"")
			+ "' />"
			+ "<input type='hidden' id='searchProName' name='searchProName' value='"
			+ $('#goodscode').val()
			+ "' />"
			+ "<input type='hidden' id='searchProId' name='searchProId' value='"
			+ $('#goodscodeHide').val()
			+ "' />"
			+ "<input type='hidden' id='viewSourceName1' name='viewSourceName1' value='"
			+ flowSourceFirstName + "' />" + "</form>";
	
	$("#hiddenSourceTypeUrlForm").html(formAction);
	
	var obj = document.getElementById('sourceTypeUrlForm');
	//obj.setAttribute("target", "_blank");
	obj.submit();
}

/*
 * 跳转到URL详情页面
 */
function getFlowSourceUrlForLev3(flowSourceFirst,flowSourceFirstName,flowSourceSec){
	var sourceType2Url = context_path + "/model/shopProFlow/shopProFlowUrl.jsp";
	var formAction = "<form target='_blank' id='sourceTypeUrlFormLev3' name='detailForm' action='"
			+ sourceType2Url
			+ "' method='post'> "
			+ "<input type='hidden' id='source2ID' name='source2ID' value='"
			+ flowSourceFirst
			+ "' />"
			+ "<input type='hidden' id='source3ID' name='source3ID' value='"
			+ flowSourceSec
			+ "' />"
			+ "<input type='hidden' id='source2IDALL' name='source2IDALL' value='"
			+ allFlowSourceSecondPar
			+ "' />"
			+ "<input type='hidden' id='date' name='date' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='currentSel' name='currentSel' value='"
			+ currentSel
			+ "' />"
			+ "<input type='hidden' id='currentSelId' name='currentSelId' value='"
			+ currentSelId
			+ "' />"
			+ "<input type='hidden' id='dimension' name='dimension' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("ref"):"")
			+ "' />"
			+ "<input type='hidden' id='proName' name='proName' value='"
			+ currentSelName
			+ "' />"
			+ "<input type='hidden' id='rapid' name='rapid' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("desc"):"")
			+ "' />"
			+ "<input type='hidden' id='searchProName' name='searchProName' value='"
			+ $('#goodscode').val()
			+ "' />"
			+ "<input type='hidden' id='searchProId' name='searchProId' value='"
			+ $('#goodscodeHide').val()
			+ "' />"
			+ "<input type='hidden' id='viewSourceName1' name='viewSourceName1' value='"
			+ flowSourceFirstName + "' />" + "</form>";
	
	$("#hiddenSourceTypeUrlForm").html(formAction);
	
	var obj = document.getElementById('sourceTypeUrlFormLev3');
	//obj.setAttribute("target", "_blank");
	obj.submit();
}

function getExcelName(jTitle){
	if($("#odp_pop_dialog").css("display")=="block"){
		return "商品页流量分析SPU"+currentSelId;
	}
	if(currentTab == "currentTab1"){
		return "商品页流量分析";
	} else if(currentTab == "currentTab2"){
		return "商品页成交转化";
	}
    return B$.getExcelNameByOther(jTitle);
}

/**
 * 查看趋势
 * @param source2ID
 * @param source1ID
 * @param source2Name
 */
function getSourceTrend(source1ID, source1Name, source2ID, source2Name, source3ID, source3Name,source2IDALL) {
	var sourceTrendUrl = context_path + "/model/shopProFlow/shopProFlowTrend.jsp";
	var formAction = "<form target='_blank' id='sourceTrendForm' name='sourceTrendForm' action='"
			+ sourceTrendUrl
			+ "' method='post'> "
			+ "<input type='hidden' id='source1ID' name='source1ID' value='"
			+ source1ID
			+ "' />"
			+ "<input type='hidden' id='source1Name' name='source1Name' value='"
			+ source1Name
			+ "' />"
			+ "<input type='hidden' id='source2ID' name='source2ID' value='"
			+ source2ID
			+ "' />"
			+ "<input type='hidden' id='source2Name' name='source2Name' value='"
			+ source2Name
			+ "' />"
			+ "<input type='hidden' id='source3ID' name='source3ID' value='"
			+ source3ID
			+ "' />"
			+ "<input type='hidden' id='source3Name' name='source3Name' value='"
			+ source3Name
			+ "' />"
			+ "<input type='hidden' id='source2IDALL' name='source2IDALL' value='"
			+ source2IDALL
			+ "' />"
			+ "<input type='hidden' id='date' name='date' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='startDate' name='startDate' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='endDate' name='endDate' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='currentSel' name='currentSel' value='"
			+ currentSel
			+ "' />"
			+ "<input type='hidden' id='currentSelId' name='currentSelId' value='"
			+ currentSelId
			+ "' />"
			+ "<input type='hidden' id='dimension' name='dimension' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("ref"):"")
			+ "' />"
			+ "<input type='hidden' id='proName_name' name='proName' value='"
			+ currentSelName 
			+ "' />"
			+ "<input type='hidden' id='rapid' name='rapid' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("desc"):"")
			+ "' />"
			+ "<input type='hidden' id='searchProName' name='searchProName' value='"
			+ $('#goodscode').val()
			+ "' />"
			+ "<input type='hidden' id='searchProId' name='searchProId' value='"
			+ $('#goodscodeHide').val()
			+ "' />"
			+ "<input type='hidden' id='viewSourceName1' name='viewSourceName1' value='"
			+ source2Name + "' />" + "</form>";
	$("#hiddenSourceTrendForm").html(formAction);
	var obj = document.getElementById('sourceTrendForm');
	obj.submit();
}

var currentTab = "currentTab1";
function tabClick(){
	//点击事件
	$(".tab li a").click(function() {
	$(".tab .selected").removeClass("selected");
	$(this).addClass("selected"); //激活选中的pan	
	if ($(this).text() =='成交转化'){
		$("#tab2").show();
		$("#tab1").hide();
		$("#tab3").hide();
		currentTab = "currentTab2";
	}else if($(this).text() =='来源去向'){
		$("#tab1").show();
		$("#tab2").hide();
		$("#tab3").hide();
		currentTab = "currentTab1";
	}else{
		$("#tab3").show();
		$("#tab2").hide();
		$("#tab1").hide();
		currentTab = "currentTab3";
	}
	renderData();
	return false;
  });
}

/**
 * 查询成交转化数据
 */
function queryConvertData(){
	var params = {
			"filter.date" : $("#CurDate").val(),
			"filter.spu" : currentSelId
	};
	doAjaxQuery(C$.PATH + "/advancedDataModel/getShopProFlowConvertResult.action", params, renderConvertDiv);
}
function renderConvertDiv(result){
	var resultData = eval("(" + result.resultData + ")").summary;
	if (resultData && resultData.pv) {
		if(resultData.pv != 0){
			ViewManager.conversionView.hideNoData();
			ViewManager.conversionView.show(resultData);
			$(".compass-people p").hide();
		} else{
			ViewManager.conversionView.showNoData();
		}
	} else {
		ViewManager.conversionView.showNoData();
	}
	createConvertTable(result);
}
function createConvertTable(data){
	 var result = eval("(" + data.resultData + ")").detail;
	    var allDetailZBs = data.allDetailZBs;
	    var imgUrl = context_path + "/images/jquerytable/details_close_new.png";
	    var imgUrlOpen = context_path + "/images/jquerytable/details_open_new.png";
	    var root = !!result ? result.zbData: null;
	    TABLE.begin({
	        cellpadding: 0,
	        cellspacing: 0,
	        border: 0,
	        "class": "display",
	        style: "border-collapse:collapse;",
	        id: "convertTable"
	    }).append("<thead>").trOpen().th("渠道");
	    $.each(allDetailZBs,
	    function(i, n) {
	        var str = "";
	        if (n.des) {
	            str += '<i class="icon-help" desc="' + n.des + '"></i>' + n.value;
	        } else {
	            str += n.value;
	        }
	        TABLE.th(str);
	    });
	    TABLE.trClose().append("</thread>").append("<tbody>");
	    if (root) {
	    	for(var i=0; i<root.data.length; i++){
	        	if(i != 1){
	        		if(root.data[i].toString().indexOf("%") > -1){
	        			root.data[i] = root.data[i];
	        		} else{
	        			root.data[i] = CommaFormatted(root.data[i]);
	        		}
	        	}
	        }
	        var children = root.children || [];
	        // 渲染数据
	        $.each(children,
	        function(index, levelOne) {
	            var source = levelOne.sourceType;
	            if (source) {
	                var source1ID = source.id + "-Convert",
	                name = source.name;
	                TABLE.trOpen({
	                    "class": "parent",
	                    id: source1ID
	                }).append("<td class = 'levelOne chart-column'>")
	                  .append("<div class=\"tableCtLeft_0\"><img src = '" + imgUrl + "' onclick = ' closeExspan(\"" + source1ID + "\")'>")
	                  .append(showFlowSourceTip(name) +"<label>" + name + "</label></div>" )
	                  .append("<div class=\"fr\"><span class=\"mr5\"></span><span class=\"tableSpace\"></span></div>")
	                  .append("</td>");
	                for(var i=0; i<levelOne.data.length; i++){
	                	if(i != 1){
	                		levelOne.data[i] = CommaFormatted(levelOne.data[i]);
	                	}
	                }
	                TABLE.tds(levelOne.data, null, {
	                    'class': 'td-r'
	                });
	                TABLE.trClose();
	                $.each(levelOne.children,
	                function(index, levelTwo) {
	                    var sourceType = levelTwo.sourceType;
	                    if (sourceType) {
	                        var source2Name = sourceType.name,
	                        pid = sourceType.pid + "-Convert",
	                        source2ID = sourceType.id;
	                        TABLE.trOpen({
	                            "class": pid,
	                            id:source2ID + "Lev2"
	                        });
	                        TABLE.append("<td><div class=\"tableCtLeft_1\">"+showFlowSourceTip(source2Name)+"<label>" + source2Name + "</label></div>" )
                            .append("<div class=\"fr\"><span class=\"mr5\"></span><span class=\"tableSpace\"></span></div>")
                            .append("</td>");
	                        for(var i=0; i<levelTwo.data.length; i++){
	                        	if(i != 1){
	                        		levelTwo.data[i] = CommaFormatted(levelTwo.data[i]);
	                        	}
	                        }
	                        TABLE.tds(levelTwo.data, null, {
	                            'class': 'td-r'
	                        });
	                        TABLE.trClose();
	                    }
	                });
	            }
	        });
	    } else {
	        TABLE.append("</thread>").append("<tbody>");
	    }
	    TABLE.append("</tbody>").end().show("convertDiv");
	    $("#downConvertDiv").html($("#convertDiv").html().replace("convertTable","downConvertTB"));
	    
	    $("#convertTable thead tr th").eq(0).css("width","295px");
	    var tableObj = $("#convertTable").dataTable({
	        "bPaginate": false,
	        "bFilter": false,
	        "bInfo": false,
	        "bSort": false,
	        "sScrollX": "100%",
	        "sScrollXInner": "110%",
	        "bScrollCollapse": true,
	        "bAutoWidth": true
	    });
	    B$.dnExcelAdd("convertDiv", "downConvertTB");
	    $('.dataTables_scrollBody').css({"overflow-x":"scroll"});//鼠标划过table内容时,表格所占区域变大bug修复
	    if(root != null){
	    	new FixedColumns(tableObj, {
				"sLeftWidth": "fixed",
		 		"iLeftColumns": 1,
				"iLeftWidth": 295,
				"fnDrawCallback": function (_left, _right) {
					$(".dataTables_scroll").css("overflow","auto");
		            $(".dataTables_scroll .dataTables_scrollHead").css("overflow","");
		            $(".dataTables_scroll .dataTables_scrollBody").css("overflow","");
					$(".DTFC_LeftHeadWrapper th:eq(0)").attr("style","width:295px");
					$(".DTFC_LeftBodyWrapper").css({"overflow":"visible"});
				}
		 	});
		    $(".dataTables_scroll .dataTables_scrollBody").css("overflow-x","");
		    fixed_set("convertDiv");
	    }
	    closeDiv();
	    setTimeout(function(){
	    	$('i.icon-help').Jtips({
		        "content": "暂无描述",
		        "position": 'bottom',
		        "width": 196
		    });
	    },100);
}

/**
 * 跳转到关键词详情页
 * @param proNum
 */
function popKW(source1ID, source1Name, source2ID, source2Name, source3ID, source3Name){
	var sourceKeyWordsUrl = context_path + "/model/shopProFlow/shopProFlowKeyWords.jsp";
	var formAction = "<form target='_blank' id='sourceKeyWordsForm' name='sourceKeyWordsForm' action='"
			+ sourceKeyWordsUrl
			+ "' method='post'> "
			+ "<input type='hidden' id='source1ID' name='source1ID' value='"
			+ source1ID
			+ "' />"
			+ "<input type='hidden' id='source1Name' name='source1Name' value='"
			+ source1Name
			+ "' />"
			+ "<input type='hidden' id='source2ID' name='source2ID' value='"
			+ source2ID
			+ "' />"
			+ "<input type='hidden' id='source2Name' name='source2Name' value='"
			+ source2Name
			+ "' />"
			+ "<input type='hidden' id='source3ID' name='source3ID' value='"
			+ source3ID
			+ "' />"
			+ "<input type='hidden' id='source3Name' name='source3Name' value='"
			+ source3Name
			+ "' />"
			+ "<input type='hidden' id='date' name='date' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='startDate' name='startDate' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='endDate' name='endDate' value='"
			+ $("#CurDate").val()
			+ "' />"
			+ "<input type='hidden' id='currentSel' name='currentSel' value='"
			+ currentSel
			+ "' />"
			+ "<input type='hidden' id='currentSelId' name='currentSelId' value='"
			+ currentSelId
			+ "' />"
			+ "<input type='hidden' id='dimension' name='dimension' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("ref"):"")
			+ "' />"
			+ "<input type='hidden' id='proName_name' name='proName' value='"
			+ currentSelName 
			+ "' />"
			+ "<input type='hidden' id='rapid' name='rapid' value='"
			+ ( $("#datePicker .rapidSel .radiobox.r-checked").length>0?$("#datePicker .rapidSel .radiobox.r-checked").eq(0).attr("desc"):"")
			+ "' />"
			+ "<input type='hidden' id='searchProName' name='searchProName' value='"
			+ $('#goodscode').val()
			+ "' />"
			+ "<input type='hidden' id='searchProId' name='searchProId' value='"
			+ $('#goodscodeHide').val()
			+ "' />"
			+ "<input type='hidden' id='viewSourceName1' name='viewSourceName1' value='"
			+ source2Name + "' />" + "</form>";
	$("#hiddenSourceKeyWordsForm").html(formAction);
	var obj = document.getElementById('sourceKeyWordsForm');
	obj.submit();
}

/**
 * 查询关联分析数据
 */
function queryRelativeData(){
	var params = {
			"filter.date" : $("#CurDate").val(),
			"filter.spu" : currentSelId
	};
	doAjaxQuery(C$.PATH + "/advancedDataModel/getShopProFlowRelativeResult.action", params, renderRelativeDiv);
}
function renderRelativeDiv(result){
	var resultData = eval("(" + result.resultData + ")").summary;
	if (resultData) {
		ViewManager.relationView.hideNoData();
		ViewManager.relationView.show(resultData);
		ViewManager.relationView.showCurrentProduct();
	} else {
		ViewManager.relationView.showNoData();
	}
	closeDiv(); 
	$('.bus-need-tips').Jtips({
        "content": "暂无描述",
        "position": 'bottom',
        "width": 200,
        "zIndex": 100
    });
}