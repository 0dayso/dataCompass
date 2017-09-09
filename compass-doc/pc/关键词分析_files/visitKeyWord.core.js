var curTbl;
var config = {
		Menu: {
			Id: "9-3"
		},
		Bar: {
			Enable: true,
			//Div: ["div_kw_bar"]
			Set: [
			      {Div: "div_detailBar", Item: false, Filter: true,PerPage:true}
			]
		},
		Table: [
		]
		
}

var tempParams,dateTitle;

$(function(){
	/*初始化配置*/
	B$.init(config);
	
	A$.setMapping("date1",{
        ajax: false,
        figure: "DATEPICKER",
        plugin: {
            Enable: true,    //false 默认是true
            label: "",
            Type: "single",        //single,range
            View: "!month!week",     //month,day,!week(不能选周)
            Pattern: 0,		//0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
            Range: [7,30],      //[初始化近几天,最大时间范围（除选月模式）]
            DateSeg: ["dateb"] ,
            customQuery:"queryFilter",
            Rapid: true,
            rapidSel: {      //如果快查功能启动，则配置快查规则
                item:{
					"昨天":0,
					"前天":0,
					"近7天":7,
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
            bFinal:true
        }
    });
    I$.init(["date1"]);
    I$.run(A$);
	
	queryFilter();
	//加载通知
	loadModuleNotice(config.Menu.Id);
	
	//load systemnotice
	loadSystemNotice();
	$(".pop-dialog-close").bind("click",function(){
		$("#odp_pop_dialog").hide();
	});
});

function queryFilter(ifQuickTime){
	dateTitle = ($("#date1 .rapidSel .radiobox.r-checked").length>0?$("#date1 .rapidSel .radiobox.r-checked").attr("desc"):"")+" "+$("#dateb").val();
	
	var params = $("#visitKeyWordForm").serialize();
	tempParams = params;
	doAjaxQuery(url,params,show);
}

var resultData;
function show(result){
	var json = eval(result);
	resultData = eval("("+json.resultData+")");
	
	/*渲染table*/
	B$.cfgClear("Table");
	B$.cfgAdd("Table", B$.cfgFormat("Table", json.allDetailZBs, "div_detail", {GridSlider: false}));
	getDetailTable(json.allDetailZBs,resultData.detail,"ClickNum");
	new FixTableHeader({id:"kwTable"});
	$.unblockUIV2();
}


//数据下载
function doKeyWordExcel(){
	if(resultData && resultData.detail && resultData.detail.length > 0 ){
		window.location.href = context_path+"/interDataModel/downKeyWordExcel.action"
				+ (tempParams ? ("?" + tempParams) : "");
	}else{
		B$.T.alert("没有数据。");
	}
}

//判断百分率是否数字类型 如 50%
function checkRate(str){
	str = str.toString().replace(/%/g,"");
	if(!isNaN(str)){
	   return true;
	}else{
	   return false;
	}
}

/**
 * 
 * @param allDetailZBs 所有明细指标
 * @param detail	明细数据
 * @param zb_Id		需要排序的指标id
 */
function getDetailTable(allDetailZBs,detail,zb_Id){
	var indexSort=0;
	var strTable = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" style=\"border-collapse:collapse;\" id=\"kwTable\">";
	strTable += "<thead><tr>";
	$.each(allDetailZBs, function(i, n) {
		//strTable += "<th title=\"" + n.des + "\" style=\"white-space:nowrap;\">" + n.value + "</th>";
		strTable += "<th>";
        if(n.des&&n.des!=""){
            strTable += '<i class="icon-help" desc="'+ n.des+'"></i>';
        }
        strTable += n.value + "&nbsp;&nbsp;</th>";
		if(n.id==zb_Id){
			indexSort=i;
		}
	});
	strTable += "</tr></thead><tbody>";
	var strTR = "";
	var moneySortStr="";//针对金额排序
	if (detail && detail.length > 0) {// 此处根据id查找value
			for ( var m = 0; m < detail.length ; m++) {
				strTR += "<tr>";
				$
						.each(
								allDetailZBs,
								function(i, n) {
									var attr=n.id;
									var tdStr = (detail[attr] && detail[attr].value[m]!= null) ? detail[attr].value[m]: "";
									// 小数位个数
									if(n.dataType==1){
										tdStr=format_number(tdStr,2);
									}else if(n.dataType==6){
										tdStr=format_number(tdStr * 100,2)+"%";
									}
									// 逗号分隔符
									if(n.dataType==0 ||n.dataType==1 ||n.dataType==6){
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
									
									if(n.id=="KW_kw"){//关键词居左
										strTR += "<td style=\"text-align:left;border:0px;\">" + tdStr + "</td>";
									}else if(n.id=="PageName"){
										strTR += "<td style=\"text-align:center;border:0px;\"><a href=\"javascript:void(0);\" onclick=\"popKw('"+detail["KWhash"].value[m]+"')\">商品页</a></td>";
									}else if(checkData(tdStr)||checkRate(tdStr)){
										strTR += "<td style=\"text-align:right;border:0px;\">" + tdStr + "</td>";
									}else{
										strTR += "<td style=\"text-align:left;border:0px;\">" + tdStr + "</td>";
									}
										
								});
				strTR += "</tr>";
			}
	} else{
		$
		.each(
				allDetailZBs,
				function(i, n) {
					moneySortStr+="null,";
				});
	}
	//moneySortStr+="{ \"sType\": \"num-html\" },";//占比特殊处理
	strTable += strTR + "</tbody>";
	strTable += "</table>";
	$("#div_detail").html(strTable);
	var strTableHidden = strTable.replace("kwTable","kwTableHidden");
	$("#div_detail_hidden").html(strTableHidden);
	
	var arraySize=allDetailZBs.length;
	var aoColumnDefs="";
	for(var i=0;i<arraySize;i++){
		aoColumnDefs+="{ \"asSorting\": [\"desc\",\"asc\"],\"aTargets\": [ "+i+"] },";
	}
	aoColumnDefs="["+aoColumnDefs.substr(0,aoColumnDefs.length-1)+"]";
	
	var ifShowInfo =false;
	if (ifShowInfo == "true") {
		curTbl = $("#kwTable").dataTable({
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
//			jQuery.extend( jQuery.fn.dataTableExt.oSort, {
//			    "num-html-pre": function ( a ) {
//			        var x = a.replace( /<.*?>/g, "" );
//			        return parseFloat( x );
//			    },
//			    "num-html-asc": function ( a, b ) {
//			        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
//			    },
//			    "num-html-desc": function ( a, b ) {
//			        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
//			    }
//			} );
			moneySortStr="["+moneySortStr.substr(0,moneySortStr.length-1)+"]";
//		$.each(
//				allDetailZBs,
//				function(i, n) {
//					if( n.id == zbObj.zb){
//						indexSort = i + 1;
//						return;
//					}
//				});
			curTbl = $("#kwTable").dataTable({
			"sPaginationType" : "full_numbers",
			"bPaginate" : true,
			"bFilter" : true,
			"bInfo" : false,
			"bSort": true,
			"aoColumns": eval(moneySortStr),
			"iDisplayLength": 20, //每页显示个数	
			"aLengthMenu":[20,50,100],
//			"aoColumns": [
//			    {"asSorting": [ ] },//单列不排序
//				null,//默认排序
//				null,
//				null,
//				null
//				]
			"aaSorting": [[ indexSort, "desc" ]] ,
			"aoColumnDefs": eval(aoColumnDefs)
		});
			
	}
	B$.globalAdd("Table",curTbl,"div_detail");
	B$.dnExcelAdd("div_detail", "kwTableHidden");//下载
	$('i.icon-help',$("#kwTable")).Jtips({
        "content": "暂无描述",
        "position": 'bottom',
        "width": 196
    });
}

function popKw(kwCode){
	A$.setMapping("KWTable",{
        ajax: true,
        action: C$.PATH+"/interDataModel/getVisitKWPageDetail.action",
        param: {"filter.date": $("#dateb").val(),"filter.code":kwCode},
        format: 1,
        mode: "ARRAY",
        figure: "TABLE",
        plugin: {
        	bSort: true,
            perpage: 5,
            pagetype: "full_numbers",        //full_numbers、two_button
            //lengthMenu: [15],
            bDnXls: true,
            bFilter: false,          //是否加载过滤插件
            bCustomCol: false,       //是否加载自定义列插件
            bColDrag: true,         //是否加载表格单列拉伸插件
            bGridSlider: false,      //是否加载表格横向滚动箭头插件
            colExt: {
	            "PageName": [
	                {bHead: true, bPic: true,bLink: true, ref: "ProID", href: "http://item.jd.com/##.html",par:"SPUID",bParent: true}
	            ]
        	},
        	drawCallBack:function(){
            	$("#KWTable tbody tr").css("height","60px");
            	$("#KWTable tbody tr a").each(function(){
            		$(this).html(t$.lenValParam(replaceBiaodian($(this).html()), 10));
            		$(this).parent().siblings(".addSKUID").remove();
            		$(this).parent().after("<span class='addSKUID'>"+$(this).next(".bParent").html()+"</span>");
            		//$(this).siblings(".addSKUID").remove();
            		//$(this).after("<span class='addSKUID'>"+$(this).attr("href").replace("http://item.jd.com/","").replace(".html","")+"</span>");
            	});
            	
            }
        },
        dataType: "DETAIL",
        dataItem: {
            "PageName":{
                name: "商品名称",
                bShow: true,
                bSort: true,
                width:"20%"
            }
            ,"ClickNum":{
                name: "点击量",
                bShow: true,
                bSort: true
            }
            /*,"ClickRate":{
            	name: "点击率",
            	bShow: true,
            	bSort: true
            }*/
            ,"OrdNum":{
                name: "下单单量",
                bShow: true,
                bSort: true
            }
            ,"OrdAmt":{
                name: "下单金额",
                bShow: true,
                bSort: true
            }
            ,"Rate":{
            	name: "转化率",
            	bShow: true,
            	bSort: true
            }
            ,"ProID":{
            	name: "",
                bShow:false,
                bForbid: true
            }
        	,"SPUID":{
        		name: "",
        		bShow:false,
        		bForbid: true
        	}
        },
        dataItemExt: {
            "ClickNum": {
                sort: "desc"
            }
        }
    });
	$.blockUIV2(5);
    I$.init(["KWTable"]);
    I$.run(A$);
    $.unblockUIV2();
    $("#odp_pop_dialog .pop-dialogWindow").css("height",($(document).height())+"px");
    $("#odp_pop_dialog .dialogContainer").css("left",(($(window).width()-950)/2)+"px");
    $("#odp_pop_dialog").show();
}

function getExcelName(jTitle){
	var name = ("关键词转化明细"+$("#dateb").val()).replace(/\s+/g,"");
    return name;
}