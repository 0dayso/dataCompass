var config = {
    Menu: {
        Id: "viewFlowForHour"
    },
    Tab:{
        Enable: true,
        Div: ["tab1","tab2"]
    }
};

$(document).ready(function() {
    B$.init(config);
    
    //加载通知
	loadModuleNotice(config.Menu.Id);
	
	//load systemnotice
	loadSystemNotice();

    $(".radiobox").click(function(){
       $(this).siblings().removeClass("r-checked");
       $(this).addClass("r-checked");
    });

    A$.setMapping("date1",{
        ajax: false,
        figure: "DATEPICKER",
        plugin: {
            Enable: true,    //false 默认是true
            Rapid: true,    //[false, true]	false(1): 是否有快查;  true(1):是否自定义click
            rapidSel: {      //如果快查功能启动，则配置快查规则
                item:{
                    "昨天": 0,
                    "前天": 0
                },
                external: true
            },
            bFinal: true,
            bDimension: true,      //是否按日/周/月选择
            dimension: {
            	item: ["!month!week"],
                bEmbed: true
            },
            Type: "single",        //single,range
            View: "!month!week",     //month,day,!week(不能选周)
            Pattern: 1,		//0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
            //Range: (new Date()).prevDay().Format("yyyy-MM-dd"),      //[初始化近几天,最大时间范围（除选月模式）]
            DateSeg: ["CurDate"],      //["StartDate","EndDate"],
            customQuery: "queryWatchData",
            Calendars: 2
        }
    });
    I$.init(["date1"]);
    I$.run(A$);
    
    $("#date1 .rapidSel").css("line-height","36px");
    
    A$.setMapping("chart1",{
        ajax: true,
        action: C$.PATH+"/advancedDataModel/getViewFlowHour.action",
        param: {"filter.date": $("#CurDate").val()},
        format: 1,
        figure: "CHART",
        plugin: {
            bLegend: true,
            watermark: context_path+"/images/platform/mainform/WatermarkBig.png",
            title: "<b>经营流量</b>",
            subtitle: "",
            height: 300,
            zoom:  "x",
            type: "spline",
            rotation: 0.005,
            xalign:"center",
            tickInterval:5,
            tickmarkPlacement: 'on',
            pixelInterval: 40,
            min: true,
            opposite: {x:false,y:false},
            reversed: {x:false,y:false}
        },
        dataItem: {
            x: {
                "TimeID": {
                    name: "时间段"
                }
            },
            y: {
                "PV":{
                    name: "浏览量",
                    bShow: true
                }
                ,"UV":{
                    name: "访客数",
                    bShow: true
                }
            }
        }
    });
    A$.setMapping("chart2",{
        ajax: true,
        action: C$.PATH+"/advancedDataModel/getViewFlowHour.action",
        param: {"filter.date": $("#CurDate").val()},
        format: 1,
        figure: "CHART",
        plugin: {
            bLegend: true,
            watermark: context_path+"/images/platform/mainform/WatermarkBig.png",
            title: "<b>经营流量</b>",
            subtitle: "",
            height: 300,
            zoom:  "xy",
            type: "spline",
            rotation: 0.005,
            xalign:"center",
            tickInterval:5,
            tickmarkPlacement: 'on',
            pixelInterval: 40,
            twoYAxis:true,
            yDataType:[0,1],//左边轴不显示%,右边轴%
            min: true,
            opposite: {x:false,y:false},
            reversed: {x:false,y:false}
        },
        dataItem: {
            x: {
                "TimeID": {
                    name: "时间段"
                }
            },
            y: {
                "AvgStayTime":{
                    name: "平均访问时间",
                    bShow: true
                }
                /*,"BackUvRate":{
                    name: "回访客占比",
                    yAxis:true,
                    bShow: true
                }*/
            }
        }
    });
    A$.setMapping("table1",{
        ajax: true,
        action: C$.PATH+"/advancedDataModel/getViewFlowHour.action",
        param: {"filter.date": $("#CurDate").val()},
        format: 1,
        mode: "ARRAY",
        figure: "TABLE",
        plugin: {
        	bSort: true,
            pagetype: "none",        //full_numbers、two_button
            bFilter: true,          //是否加载过滤插件
            bCustomCol: false,       //是否加载自定义列插件
            bColDrag: true,         //是否加载表格单列拉伸插件
            bGridSlider: false      //是否加载表格横向滚动箭头插件
        },
        dataType: "DETAIL",
        dataItem: {
            "TimeID":{
                name: "日期",
                bShow: true,
                bSort: true
            }
            ,"PV":{
                name: "浏览量",
                bShow: true,
                bSort: true
            }
            ,"UV":{
                name: "访客数",
                bShow: true,
                bSort: true
            }
            ,"AvgStayTime":{
                name: "平均停留时间",
                bShow: true,
                bSort: true
            }
            /*,"BackUvRate":{
            	name: "回访客占比",
            	bShow: true,
            	bSort: true
            }*/
        },
        dataItemExt: {
            "TimeID": {
                sort: "desc"
            },
            "AvgStayTime":{
            	dataType:2,//重载字段类型
            	formatter:function(_val){
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
            	}
            }
        }
    });
    I$.init(["chart1","chart2","table1"]);
    I$.run(A$);
    new FixTableHeader({id:"table1Tbl"});
    $(".tab.cxt a").bind("click",function(){
    	var width=0 ,left=0;
    	if ($('.dataTables_fixed').size() ==1 ) {
    		width = $('.dataTables_fixed').css("width");
    		left = $('.dataTables_fixed').css("left");
    	}
    	if($(this).attr("be")=="tab1"){
    		new FixTableHeader({id:"table1Tbl"});
    		$('.dataTables_fixed').width(width);
    		$('.dataTables_fixed').css("left",left);
    	}else{
    		new FixTableHeader({id:"table2Tbl"});
    		$('.dataTables_fixed').width(width);
    		$('.dataTables_fixed').css("left",left);
    	}
    });
});

function queryWatchData(){
    A$.setMappingParam("chart1",{
        "filter.date": $("#CurDate").val()
    });
    A$.setMappingParam("chart2",{
        "filter.date": $("#CurDate").val()
    });
    A$.setMappingParam("table1",{
        "filter.date": $("#CurDate").val()
    });
    I$.init(["chart1","chart2","table1"]);
    I$.clrAdapterCache();
    I$.run(A$);
    
    new FixTableHeader({id:"table1Tbl"});
}

function queryCompareData(_zb){
    if($("#StartDate").val()==$("#EndDate").val()){
        B$.T.warn("请选择不同的日期.");
        return;
    }
    I$.clrAdapterCache();

    var newZb = [];
    newZb.push(B$.zbBuild("TimeID","日期",5,0,{"checked":true}));
    newZb.push(B$.zbBuild($("#StartDate").val().replace(/-/g,""),$("#StartDate").val(),0,0,{bSort: true}));
    newZb.push(B$.zbBuild($("#EndDate").val().replace(/-/g,""),$("#EndDate").val(),0,0,{bSort: true}));
    A$.setMappingParam("chart4",{
        "filter.startDate": $("#StartDate").val(),
        "filter.endDate": $("#EndDate").val()
    });
    A$.setMappingFormatKey("chart4",[_zb,newZb]);
    A$.setMappingParam("table2",{
        "filter.startDate": $("#StartDate").val(),
        "filter.endDate": $("#EndDate").val()
    });
    A$.extMappingFormatKey("table2",_zb,true);
    A$.setMappingFormatKey("table2",[_zb,newZb]);
    
//    var extDi = {};
//    extDi[$("#StartDate").val().replace(/-/g,"")] = {};
//    extDi[$("#StartDate").val().replace(/-/g,"")].name = $("#StartDate").val();
//    extDi[$("#StartDate").val().replace(/-/g,"")].bShow = true;
//    extDi[$("#StartDate").val().replace(/-/g,"")].bSort = true;
//    extDi[$("#EndDate").val().replace(/-/g,"")] = {};
//    extDi[$("#EndDate").val().replace(/-/g,"")].name =  $("#EndDate").val();
//    extDi[$("#EndDate").val().replace(/-/g,"")].bShow = true;
//    extDi[$("#EndDate").val().replace(/-/g,"")].bSort = true;
//    A$.extMappingDataItem("table2",extDi);
    
    var yExt = {};
    yExt[$("#StartDate").val().replace(/-/g,"")] = {};
    yExt[$("#StartDate").val().replace(/-/g,"")].bShow = true;
    yExt[$("#EndDate").val().replace(/-/g,"")] = {};
    yExt[$("#EndDate").val().replace(/-/g,"")].bShow = true;
    A$.extMappingDataItemY("chart4",yExt);
    I$.init(["chart4","table2"]);
    I$.run(A$);
    new FixTableHeader({id:"table2Tbl"});
}

function initTab2(){
    $("#Compare").click(function(){
        queryCompareData($(this).prevAll(".radiobox.r-checked").attr("val"));
    });
    A$.setMapping("date2",{
        ajax: false,
        figure: "DATEPICKER",
        plugin: {
            Enable: true,    //false 默认是true
            Rapid: false,    //[false, true]	false(1): 是否有快查;  true(1):是否自定义click
            Type: "single",        //single,range
            View: "!month!week",     //month,day,!week(不能选周)
            Pattern: 1,		//0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
            //Range: (new Date()).prevDay().Format("yyyy-MM-dd"),      //[初始化近几天,最大时间范围（除选月模式）]
            DateSeg: ["StartDate"],      //["StartDate","EndDate"],
            filterName:["startDate"],
            Calendars: 2,
            bDimension: true,      //是否按日/周/月选择
            dimension: {
	        	item: ["!month!week"],
                bEmbed: true
            },
            bFinal:true,
            customQuery: "null"
        }
    });
    I$.init(["date2"]);
    I$.run(A$);
    A$.setMapping("date3",{
        ajax: false,
        figure: "DATEPICKER",
        plugin: {
            Enable: true,    //false 默认是true
            Rapid: false,    //[false, true]	false(1): 是否有快查;  true(1):是否自定义click
            Type: "single",        //single,range
            View: "!month!week",     //month,day,!week(不能选周)
            Pattern: 1,		//0：周、月格式转换为时间范围传参；1：周格式2012-01,月格式2012-01传参;2:周格式2012-9901,月格式2012-01传参
            Range: getDateByBrowserType($('#StartDate').val()).prevDay(1).Format("yyyy-MM-dd"),      //[初始化近几天,最大时间范围（除选月模式）]
            DateSeg: ["EndDate"],     //["StartDate","EndDate"],
            filterName:["endDate"],
            Calendars: 2,
            bDimension: true,      //是否按日/周/月选择
            dimension: {
	        	item: ["!month!week"],
                bEmbed: true
            },
            bFinal:true,
            customQuery: "null"
        }
    });
    I$.init(["date3"]);
    I$.run(A$);

    A$.setMapping("chart4",{
        ajax: true,
        action: C$.PATH+"/advancedDataModel/getViewFlowHourCompare.action",
        param: {"filter.startDate": $("#StartDate").val(),"filter.endDate":$("#EndDate").val()},
        format: 12,
        figure: "CHART",
        formatKey:[],
        plugin: {
            bLegend: true,
            watermark: context_path+"/images/platform/mainform/WatermarkBig.png",
            title: "<b>流量对比</b>",
            noSubHead: true,
            subtitle: "",
            height: 300,
            zoom:  "x",
            type: "spline",
            rotation: 0.005,
            xalign:"center",
            tickInterval:5,
            tickmarkPlacement: 'on',
            pixelInterval: 40,
            min: true,
            opposite: {x:false,y:false},
            reversed: {x:false,y:false}
        },
        dataItem: {
            x: {
                "TimeID": {
                    name: "时间段"
                }
            }
        }
    });
    A$.setMapping("table2",{
        ajax: true,
        action: C$.PATH+"/advancedDataModel/getViewFlowHourCompare.action",
        param: {"filter.startDate": $("#StartDate").val(),"filter.endDate":$("#EndDate").val()},
        format: 12,
        formatKey:[],
        mode: "ARRAY",
        figure: "TABLE",
        plugin: {
            pagetype: "none",        //full_numbers、two_button
            bSort:true,
            bFilter: true,          //是否加载过滤插件
            bCustomCol: false,       //是否加载自定义列插件
            bColDrag: true,         //是否加载表格单列拉伸插件
            bGridSlider: false      //是否加载表格横向滚动箭头插件
        } ,
        dataItemExt: {
            "TimeID": {
                sort: "desc"
            }
        }
    });
    queryCompareData($(".radiobox.r-checked").attr("val"));
}
