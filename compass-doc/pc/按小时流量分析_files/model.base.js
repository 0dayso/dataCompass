document.write('<script type="text/javascript" src="'+context_path+'/js/jTips.js"></script>');
var datePreviewCount = 1;
var dateNextCount = 0;
var preWeekCount = 0;
var nextWeekCount = 0;
var currentGloalWeekStartDate = "";
var currentGloalWeekEndDate = "";
var multiRapid7Day = 0;
var multiRapid30Day = 0;
$.extend({
	  getUrlVars: function(){
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	      hash = hashes[i].split('=');
	      vars.push(hash[0]);
	      vars[hash[0]] = hash[1];
	    }
	    return vars;
	  },
	  getUrlVar: function(name){
	    return $.getUrlVars()[name];
	  }
	});

/**
 * Base definition
 * @param {Object} _title
 */
function Base(_name){
    this.name = name;
    this.toString = function(){
        return _name;
    };
}

/**
 * Base class
 */
Base.prototype = {
    constructor: Base,
    constants: {
        Config:{
            MENU: "Menu",
            DATEPICKER: "DatePicker",
            CHART: "Chart",
            LEGEND: "Legend",
            TABLE: "Table",
            GRIDSLIDER: "GridSlider",
            FIXHEADER: "FixHeader",
            LAZYLOAD: "LazyLoad",
            SET: "Set",
            ITEM: "Item",
            FILTER: "Filter",
            PERPAGE: "PerPage",
            BAR: "Bar",
            TAB: "Tab",
            ENABLE: "Enable",
            ID: "Id",
            NAME: "Name",
            DESC: "Desc",
            VER: "Ver",
            DIV: "Div",
            ZB: "Zb",
            RAPID: "Rapid",
            TYPE: "Type",
            STYLE: "Style",
            PATTERN: "Pattern",
            VIEW: "View",
            RANGE: "Range",
            DATESEG: "DateSeg",
            CALENDARS: "Calendars",
            CUSTOMCHANGE: "CustomChange",
            PARAM: "Param",
            DATE: "Date",
            DIMENSION: "Dimension",
            MAXDISPLAY:"maxDisplay",
            HELP: "Help",
            TIP: "Tip"
        },
        DatePicker:{
        	BSEPARATE: "bSeparate",
            SINGLE: "single",
            RANGE: "range",
            VDAY: "day",
            VMONTH: "month",
            VWEEK: "week",
            SIMPLE: "simple",
            COMPLEX: "complex",
            VNMONTH: "!month",           //forbid month
            VNWEEK: "!week",           //forbid week
            VODAY: "!month!week",      //only day
            CURWEEK: "本周",
            PREVWEEK: "上周",
            CURMONTH: "本月",
            PREVMONTH: "上月",
            PREV1: "昨天",
            PREV2: "前天",
            PREV3:"近3天",
            PREV7:"近7天",
            PREV15:"近15天",
            PREV30:"近30天",
            PREV90:"近90天",
            PREVSEASON: "上季",
            PREVMONTH3: "最近3月",
            PREVMONTH6: "最近6月",
            PREVMONTH12: "最近12月",
            PREVHALFYEAR: "近半年",
            PREVYEAR: "近一年",
            PREFIX_SEASON: 90,
            PREFIX_MONTH: 95,
            PREFIX_WEEK: 99,
            NEXT_DAY: "后一天",
            PREV_DAY: "前一天",
            NEXT_MONTH: "下一月",
            PREV_MONTH: "上一月",
            NEXT_WEEK: "下一周",
            PREV_WEEK: "上一周",
            RESET_DATE: "重置"
        },
        Color: {
            P:["#99cc33"
                ,"#FF9933"
                ,"#006633"
                ,"#990066"
                ,"#3399CC"
                ,"#003399"
                ,"#CC3399"
                ,"#6699FF"
                ,"#66CC33"
                ,"#FF9900"
                ,"#FF6246"
                ,"#BF86F8"
                ,"#30D0B1"
                ,"#F8BB00"
                ,"#41C4F3"
                ,"#05C705"
                ,"#FF63EE"
                ,"#97B7E8"
                ,"#80E5A1"
                ,"#EDEA0C"
                ,"#88D0FF"
                ,"#FF694E"
                ,"#DC99FF"
                ,"#66F2FF"
                ,"#FFB23F"
                ,"#63F1D6"
                ,"#FF9F8E"
            ],
            X:["#6D869F"],
            Y:["#6D869F"]
        },
        Path: {
            SUMMARYPIC: "//img10.360buyimg.com/n2/",
            TIPPIC: "//img10.360buyimg.com/n3/",
            DETAILPIC:  "//img10.360buyimg.com/n3/",
            ERRORPIC: "//misc.360buyimg.com/lib/skin/e/i/error-jd.gif"
        },
        Picture: {
            PERBATCH: 	500
        },
        Cache: {
            LASTDATE: "lastDate"
        }
    },
    preLoad: [],
    menuCfg: {},
    datePickerCfg: {},
    tabCfg: {},
    legendCfg: {},
    chartCfg: [],
    barCfg: [],
    tableCfg: [],
    charts: [],
    tables: [],
    datepicker: null,
    datepickers: [],
    cache: {
        mem: {},
        add: function(_kv, _g){
            var mem = this.mem;
            if(!!_g){
                $.extend(mem[_g], _kv);
            }else{
                $.extend(mem, _kv);
            }
        },
        set: function(_k, _v, _g){
            var mem = this.mem;
            if(!!_g){
                mem[_g] = !!mem[_g]?mem[_g]:{};
                mem[_g][_k] = _v;
            }else{
                mem[_k] = _v;
            }
        },
        get: function(_k, _g){
            var mem = this.mem;
            if(!!_g){
                if(!mem[_g]){
                    mem[_g] = {};
                }
                return mem[_g][_k];
            }else{
                return mem[_k];
            }
        },
        clr: function(_g){
            var mem = this.mem;
            if(!!_g){
                mem[_g] = {};
            }else{
                mem = {};
            }
        }
    },
    init:function(_config){
        var O = this;
        O.reload(_config);
        for(var i in O.preLoad){
            O.preLoad[i]();
        }
        O.gridRows();
        O.printPage();
        O.scrollToTop();
        O.initTab();
        O.initMenu();
        O.initFeedback();
        O.initDatePicker();
    },
    /**
     * 重载Base
     * 1)Charts的DivID和对应的指标顺序
     * @param _config
     * {
		 * Chart:[
		 * 		{Div: divid1; Zb: [[zbId11,zbName11],[zbId12,zbName12]...]},
		 * 		{Div: divid2; Zb: [[zbId21,zbName21],[zbId22,zbName22]...}
		 * 		...
		 * }]
     * }
     */
    preloadAdd: function(_preload){
        var O = this;
        O.preLoad.push(_preload);
    },
    reload:function(_config){
        var O = this,cfg = _config;
        //load charts config
        O.loadCfg(_config, O.constants.Config.MENU);
        O.loadCfg(_config, O.constants.Config.TAB);
        O.loadCfg(_config, O.constants.Config.LEGEND);
        O.loadCfg(_config, O.constants.Config.CHART);
        O.loadCfg(_config, O.constants.Config.BAR);
        O.loadCfg(_config, O.constants.Config.TABLE);
        O.loadCfg(_config, O.constants.Config.DATEPICKER);
    },
    loadTbls: function(_tbls){
        var O = this;
        if(!!_tbls){
            O.tables = _tbls;
        }
    },
    loadCharts: function(_charts){
        var O = this;
        if(!!_charts){
            O.charts = _charts;
        }
    },
    paramAdd: function(_key, _opt){
        var O = this;
        switch(_key){
            case O.constants.Config.DATEPICKER:  $.extend(O.datePickerCfg[O.constants.Config.PARAM], _opt);
                break;
        }
    },
    globalAdd: function(_key, _global, _div){
        var O = this,cfg;
        if(_key==O.constants.Config.TABLE){
            cfg = O.tableCfg;
            O.tables[_div] = _global;
            O.loadBar(_div);
           
            if(cfg){
                for(var i in cfg){
                    if(cfg[i]["ColDrag"]==undefined || cfg[i]["ColDrag"]){
                        O.colDragAdd(_div);
                    }
                    if(cfg[i][O.constants.Config.DIV]==_div){
                        if(!!cfg[i][O.constants.Config.GRIDSLIDER]){
                        	if($.jIsArray(cfg[i][O.constants.Config.GRIDSLIDER])){
                        		O.gridSliderAdd(_div,cfg[i][O.constants.Config.GRIDSLIDER][1]);
                        	}else{
                        		O.gridSliderAdd(_div);
                        	}
                        }else{
                            if(!!cfg[i][O.constants.Config.FIXHEADER]){
                                O.fixHeaderAdd(_global);
                            }
                        }
                        if(!!cfg[i][O.constants.Config.LAZYLOAD]){
                            O.lazyLoadAdd(_div);
                        }
                    }
                }
            }else{
            	//临时修改
            	O.colDragAdd(_div);
            }
        }else if(_key==O.constants.Config.CHART){  
        	//O.charts[_div]&&O.charts[_div].destroy();
        	//O.charts[_div] = null;
            O.charts[_div] = _global;
            O.loadLegend();
        }else{
            //TODO
        };
    },
    colDragAdd: function(_div){
        $("#"+_div).addClass("grid-wrap");
        $("#"+_div+" .dataTable th").css({"white-space":"normal"});
        $("#"+_div).colDrag();
    },
    gridSliderAdd: function(_div,_width){
        var curTbl = $("#"+_div+" .dataTable:eq(0)").jId();
        $("#"+curTbl).wrap("<div class=\"grid-wrap\"></div>");
        $("#"+_div+" .grid-wrap:eq(0)").append("<div class=\"gt-l\">&nbsp;</div><div class=\"gt-r\">&nbsp;</div>");
        if(!!_width){
        	$("#"+curTbl).css({"width": _width+"px"});
        }else{
        	$("#"+curTbl).css({"width": "2200px"});
        }

        $('#'+_div+' .grid-wrap').gridSlider({
            step:2,
            time:200
        });
    },
    fixHeaderAdd: function(_global){
        new FixedHeader(_global);
    },
    lazyLoadAdd: function(_div){
        $("img.dtlPic",$("#"+_div)).lazyload({
            threshold : 200,
            effect : "fadeIn"
        });
    },
    loadCfg: function(_config, _key){
        var O = this;
        if(!!_config){
            switch(_key){
                case O.constants.Config.MENU:   O.menuCfg = _config[O.constants.Config.MENU]?_config[O.constants.Config.MENU]:null;
                    break;
                case O.constants.Config.TAB:    O.tabCfg = _config[O.constants.Config.TAB]?_config[O.constants.Config.TAB]:null;
                    break;
                case O.constants.Config.LEGEND: O.legendCfg = _config[O.constants.Config.LEGEND]?_config[O.constants.Config.LEGEND]:null;
                    break;
                case O.constants.Config.CHART:  O.chartCfg = _config[O.constants.Config.CHART]?_config[O.constants.Config.CHART]:null;
                    break;
                case O.constants.Config.BAR:   	O.barCfg = _config[O.constants.Config.BAR]?_config[O.constants.Config.BAR]:null;
                    break;
                case O.constants.Config.TABLE:  O.tableCfg = _config[O.constants.Config.TABLE]?_config[O.constants.Config.TABLE]:null;
                    break;
                case O.constants.Config.DATEPICKER:   O.datePickerCfg = _config[O.constants.Config.DATEPICKER]?_config[O.constants.Config.DATEPICKER]:null;
                    break;
                default: 	break;

            }
        }
    },
    initMenu:function(_cfg){
        var O = this,cfg = !!_cfg?_cfg[O.constants.Config.MENU]:O.menuCfg,$menu = $("#"+cfg[O.constants.Config.ID]);
        var ifUserSet = $.getUrlVar('user');
        if(ifUserSet == "set"){
        	$menu = $("#"+cfg[O.constants.Config.ID]+"_Set");
        }
        $menu.addClass("curr").closest(".lev2").jDisplay(true);;
        $('#menu .lev2 a').bind("click",function(){
            $('#menu .curr').removeClass('curr');
            $(this).addClass("curr");
        });
        $('#menu .tit').bind('click',function(){
            var _$obj = $(this).addClass('on-toggle').next();
            if(_$obj.hasClass('on-toggle')) return;
            _$obj.addClass('on-toggle').slideToggle("normal",function(){
                $(this).removeClass('on-toggle');
            });
        });
        $('#menu a').bind('focus',function(){$(this).blur();});

        var bHelp = O.menuCfg[O.constants.Config.HELP];
        if(!!bHelp){
            var cont = [];
            cont.push('<label class="fl">'+$('#main span.ft-0').text()+'</label>');
            cont.push('<div class="question fl"></div>');
            cont.push('<div class="clr"></div>');
            $('#main span.ft-0').html(cont.join(""));
            
            cont = [];
            
            cont.push('<div class="descBarContainer">');
            cont.push('<div class="descBarArrow"></div>');
            cont.push('<div class="descBar">');
            cont.push('<div class="desc">'+O.menuCfg[O.constants.Config.DESC]+'</div>');
            cont.push('</div>');
            cont.push('</div>');
            $('.btn-con').eq(0).after(cont.join(""));

            //$('.descBar').stop().show(1000).animate({bottom:  '0px'},2000);

            $('#main span.ft-0 .question').bind("mouseover",function(){
//                $('.descBar').stop().show(1000).animate({bottom:  '0px'},2000);
                $('.descBarContainer').show(1000);
            }).bind("mouseout",function(){
            	$('.descBarContainer').hide(1000);
            });

//            $('.descBar .close > label').click(function(){
//                $(this).closest('.descBar').hide(1000);
//            });
        }
    },
    gridRows:function(){
        $('.grid').each(function(){
            $('tr:even',this).addClass('tr-even');
        });
    },
    loadSummary:function(){
        var O = this;
        $('.sc-handle .switch').unbind("click");
        $('.sc-handle .switch').bind("click",function(){
            $(this).toggleClass('switch-on').parent().prev().toggleClass('sl-on');
        });
        if($.jIsIE(9)){
            $('.slider-lists ul li .sc-tip').css({"background-color": "transparent\\9"});
        }

        //all checked for default
        $('.fcheckbox').each(function(){
            $(this).find('input').attr('checked',true);
            $(this).addClass('f-checked').parent().parent().addClass('sl-checked');
        });
        //模拟复选框
        $('.fcheckbox').bind('click',function(){
            var checked = $(this).hasClass('f-checked')?false:true;
            $(this).find('input').attr('checked',checked);
            $(this).toggleClass('f-checked').parent().parent().toggleClass('sl-checked');

            //获取概况的DivID
            var curDivs = $("#"+$(this).attr("div")).attr("be").split(",");

            //获取当前指标的ID
            var curZb = $(this).jName();

            var divCfgs=O.chartCfg,zbCfgs=[],curIdx,curDiv;
            for(var p in curDivs){
                for(var j in divCfgs){
                    if(divCfgs[j][O.constants.Config.DIV]==curDivs[p]){
                        zbCfgs = divCfgs[j][O.constants.Config.ZB];
                        for(var i=0,len=zbCfgs.length;i<len;i++){
                            if(curZb==zbCfgs[i][1]){
                                curIdx=i;
                                O.showSeries(curIdx, checked, curDivs[p]);
                            }
                        }
                    }
                }
            }
        });
        $(".question.icon-help").Jtips({
            "content": "暂无描述",
            "position": 'leftBottom',
            "width": 196
        });
        /*$('.sc-tit .question').bind('mouseover',function(e){
            $(this).parent().siblings('.sc-tip').show().parent().addClass('hover');
        });
        $('.sc-tip').bind('mouseout',function(e){
            if($(e.target).is("a")){
                $(this).show().parent().parent().addClass('hover');
            }else{
                $(this).hide().parent().parent().removeClass('hover');
            }
        });*/
    },
    initTab: function(_settings){
        var O = this,$body = $(document.body), cfg = (_settings&&_settings.cfg)?_settings.cfg:O.tabCfg
            ,$curTab = (_settings&&_settings.id)?$("#"+_settings.id):$body;
        if(cfg&&cfg[O.constants.Config.ENABLE]){
            var bLoads = [],divs = cfg[O.constants.Config.DIV]
                ,tabCss = cfg.bGild?"tab-tit":"tab"
                ,curCss = cfg.bGild?"curr":"selected"
                ,mockCss = (_settings&&_settings.tabId)?_settings.tabId:"cxt";
            for(var i=0,len=divs.length;i<len;i++){
                bLoads[divs[i]] = false;
            };
            //if(cfg.bGild){
            //$(".tab-con."+mockCss, $curTab).css({"border":"0 none"});
            //}
            var tmpWidth = 0;
            $(".tab-con."+mockCss, $curTab).each(function(){
                if(!tmpWidth){
                    tmpWidth = $(this).width();
                }
                $(this).attr("custWidth",tmpWidth);
                $(this).jWidth(tmpWidth+"px");
                $(this).hide();
            });
            $(".tab-con."+mockCss+":first", $curTab).show();
            bLoads[divs[0]] = true;
            $('.'+tabCss+'.'+mockCss+' li a', $curTab).die('click');
            $('.'+tabCss+'.'+mockCss+' li a', $curTab).live('click',function(){
                //hide all tab contents
                $(".tab-con."+mockCss, $curTab).hide();
                var curTabCon = $(this).attr("be"),func = $(this).attr("func");
                $('.'+tabCss+'.'+mockCss+' .'+curCss).removeClass(curCss);
                if(cfg.bGild){
                    $(this).closest("li").addClass(curCss);
                }else{
                    $(this).addClass(curCss);
                }
                $("#"+curTabCon).show();
                if(cfg.revert){
                    for(var i=0,len=divs.length;i<len;i++){
                        bLoads[divs[i]] = false;
                    };
                }
                if(!bLoads[curTabCon]){
                    if(!!func){
                        //eval(func+'()');
                    	var func = new Function('return ' + func)(); func();
                    }
                    bLoads[curTabCon] = true;
                }
                cfg.revert = false;
                return;
            });
        }
    },
    loadBar: function(_div){
        var O = this,cfg = O.barCfg;
        $("#"+_div+" .dataTables_filter").html("");
        $("#"+_div+" .dataTables_filter").css({"height": 0,"margin": 0,"padding":0});
        if(!!cfg&&cfg[O.constants.Config.ENABLE]){
            var tableCfgs = O.tableCfg,setCfgs = cfg[O.constants.Config.SET];
            $(setCfgs).each(function(i, set){
                var content = [],barDiv = set[O.constants.Config.DIV],tblDiv = $("#"+barDiv).attr("be");
                $("#"+barDiv).removeClass("ctrl-con");
                //$("#"+barDiv).removeClass("mb10").addClass("mb5");
                if(!!set[O.constants.Config.ITEM]&&tblDiv==_div){
                    if($.jIsIE(7)){
                        $("a.download.fr",$("#"+barDiv)).eq(0).removeClass("fr").addClass("fl");
                        $("a.download",$("#"+barDiv)).closest("span.fr").eq(0).removeClass("fr").addClass("fl");
                    }
                    $('#'+barDiv+" .fl:eq(0)").find("dl").remove();
                    $(tableCfgs).each(function(j, setting){
                        if(setting[O.constants.Config.DIV]==tblDiv){
                            content = [];
                            content.push('<dl class="">');
                            content.push('<dt class="">');
                            content.push('<span>显示指标</span>');
                            content.push('</dt>');
                            content.push('<dd>');
                            content.push('<div class="choose-cols">');
                            content.push('<ul class="cc-r">');
                            $(setting[O.constants.Config.ZB]).each(function(p, zb){
                                content.push('<li>');
                                content.push('<input type="checkbox" name="" id="'+tblDiv+zb[0]+'" index="'+p+'" checked '+(zb[2]?"disabled":"")+' />');
                                content.push('<label for="'+tblDiv+zb[0]+'">');
                                content.push(zb[1]);
                                content.push('</label>');
                                content.push('</li>');
                            });
                            content.push('</ul>');
                            content.push('</div>');
                            content.push('</dd>');
                            content.push('</dl>');
                            $('#'+barDiv+" .fl:eq(0)").append(content.join(""));
                        }
                    });
                    $(".choose-cols input:checkbox",$("#"+barDiv)).click({containerId: tblDiv},function(e){
                        O.showCols($(this).attr("index"), this.checked, e.data.containerId, this);
                        O.cache.set("chosenNum", $(".choose-cols ul li input:checkbox:checked").length, "customCol");
                    });
                    $('.button-slider',$("#"+barDiv)).buttonSlider();
                }
                /**
                 * 增加表格的过滤筛选功能
                 */
                if(!!set[O.constants.Config.FILTER]&&tblDiv==_div){
                    $('#'+barDiv+" .fr:eq(0)").find(".key-search").remove();

                    content = [];
                    content.push('<label class="key-search fl mr20">');
                    content.push('<i></i><input class="ks-no" title="请输入关键字" value="请输入关键字" type="text" />');
                    content.push('</label>');
                    $('#'+barDiv+" .fr:eq(0)").prepend(content.join(""));
//                    if($.jIsIE(7)){
//                        $('#'+barDiv+" .fr:eq(0)").css({"width": "25%"});
//                    }
                    //if search bar is the rightest
                    if($('#'+barDiv+" .key-search:eq(0)").siblings().length==0){
                        $('#'+barDiv+" .key-search:eq(0)").removeClass("mr20");
                    }

                    var $input = $('#'+barDiv+' .key-search input').eq(0),input;
                    var $i = $('#'+barDiv+' .key-search i').eq(0);

                    $input.focus(function(){
                        if($input.val()=="请输入关键字"){
                            $input.val("");
                        }
                    }).blur(function(){
                            if($input.val()==""){
                                $input.val("请输入关键字");
                            }
                        });
//					$i.click(function(){
//						input = $input.val()=="请输入关键字"?"":$input.val();
//						O.tables[tblDiv].fnFilter(input);
//					});
                    $input.keyup(function(){
                        input = $input.val()=="请输入关键字"?"":$input.val();
                        O.tables[tblDiv].fnFilter(input);
                    });
                }
                /**
                 * 开启表格自定义每页条数功能
                 */
                if(tblDiv==_div){
                    if(set[O.constants.Config.PERPAGE]){
                        $("#"+_div+" .dataTables_paginate").before($("#"+_div+" .dataTables_length"));
                        $("#"+_div+" .dataTables_length").css({"float":"left","margin-top": "6px", "text-align": "left"});
                    }else{
                        $("#"+_div+" .dataTables_length").html("");
                        $("#"+_div+" .dataTables_length").css({"height": 0,"margin": 0,"padding":0});
                    }
                }
            });
        }
    },
    tblFilterAdd: function(_id, _tbl, _extSettings){
        var buf = [], barId = _id+"Bar";
        //如果工具条不存在，渲染工具条区域
        if(!$.jDomExist(barId)){
            buf.push('<div class="mb10 mt10 ml10 mr10" id="'+barId+'"></div>');
            $(buf.join("")).insertBefore($("#"+_id));
            $("#"+barId).jHeight(30);
            $("#"+barId).jWidth($("#"+_id)[0].style.width);
            $("#"+barId).jFloat($("#"+_id).jFloat());
        }
        if(!$.jDomExist(barId, "fr")){
            $("#"+barId).append('<div class="fr"></div>');
        }

        if(_extSettings&&_extSettings.specCol){
            var $container = $("#"+_id), filterColNum;
            $('thead th',$container).each(function(i,n){
                if($(n).find("label:first").jName().replace("Th","")==_extSettings.specCol.ref){
                    filterColNum = i;
                }
            });
            if(filterColNum||filterColNum==0){
                //渲染过滤插件区域
                $('#'+barId+" .fr:eq(0)").find(".colFilter").remove();
                buf = [];
                if(_extSettings.specCol.type=="input"){
                    //TODO
                }else{
                    var selData = B$.tables[_id].fnGetColumnData(filterColNum),selId = _id+"ColFilter";
                    buf.push('<span id="'+selId+'" class="colFilter">');
                    buf.push("<input type='hidden' name='filter."+selId+"Flt' id='"+selId+"Flt' />");
                    buf.push("<span class='fack-select ml10 mr10' id='"+selId+"Sel'>");
                    buf.push("<span>请选择:</span>");
                    buf.push("<input type='text' class='selIpt' readonly='readonly'>");
                    buf.push("<i>&nbsp;</i>");
                    buf.push("<ul>");

                    var ev = function(_obj){
                        var selVal = $(_obj).find("a>span").attr("value");
                        _tbl.fnFilter(selVal,filterColNum);
                    }
                    buf.push("<li><a href='javascript:void(0);'><span value=''>全部</span></a></li>");
                    for(var i in selData){
                        buf.push("<li><a href='javascript:void(0);'><span value='"+selData[i]+"'>"+selData[i]+"</span></a></li>");
                    }
                    buf.push("</ul></span>");
                    buf.push("</span>");
                    $('#'+barId+" .fr:eq(0)").prepend(buf.join(""));

                    $("#"+selId).fakeSelect({
                        type: "single",
                        style: "colorize",
                        width: 80,
                        initial: "",
                        event: ev
                    });
                }
            }
        }else{
            //渲染过滤插件区域
            $('#'+barId+" .fr:eq(0)").find(".key-search").remove();

            var defTxt = "请输入关键字";
            if(!!_extSettings&&!!_extSettings.text){
                defTxt = _extSettings.text;
            }
            buf = [];
            buf.push('<label class="key-search fl">');
            buf.push('<i></i><input class="ks-no" title="'+defTxt+'" value="'+defTxt+'" type="text" />');
            buf.push('</label>');
            $('#'+barId+" .fr:eq(0)").prepend(buf.join(""));

            var $input = $('#'+barId+' .key-search input').eq(0);
            var $i = $('#'+barId+' .key-search i').eq(0);

            $input.focus(function(){
                if($input.val()==defTxt){
                    $input.val("");
                }
            }).blur(function(){
                    if($input.val()==""){
                        $input.val(defTxt);
                    }
                });
            $input.keyup(function(){
                _tbl.fnFilter(($input.val()==defTxt)?"":$input.val());
            });
        }
    },
    /**
     * 表格列自定义显示/隐藏
     * @param _id
     * @param _dis
     * @param _extColNum  扩展增加的列数，只对表格最左侧增加列生效
     */
    customColAdd: function(_id, _dis, _extColNum, _extSettings){
        var O = this, buf = [], barId = _id+"Bar", non = [], nonDis = {}, extColNum = (!!_extColNum?_extColNum:0);
        //如果工具条不存在，渲染工具条区域
        if(!$.jDomExist(barId)){
            buf.push('<div class="mt10 mb10 mr10 ml10" id="'+barId+'" style=""></div>');
            $(buf.join("")).insertBefore($("#"+_id));

            $("#"+barId).jHeight(30);
            $("#"+barId).jWidth($("#"+_id)[0].style.width);
            $("#"+barId).jFloat($("#"+_id).jFloat());
        }
        if(!$.jDomExist(barId, "fl")){
            $("#"+barId).append('<div class="fl"></div>');
        }
        //渲染表格自定义列区域
        $("#"+barId+" .fl:eq(0)").append('<div class="button-slider fl"></div>');
        $('#'+barId+" .button-slider:eq(0)").find("dl").remove();
        if($('#'+barId+" .button-slider:eq(0)").prev().length>0){
            $('#'+barId+" .button-slider:eq(0)").addClass("ml10");
        }
        buf = [],counter = 0;
        buf.push('<dl class="">');
        buf.push('<dt class="">');
        buf.push('<span>显示指标</span>');
        buf.push('</dt>');
        buf.push('<dd>');
        buf.push('<div class="choose-cols">');
        buf.push('<ul class="cc-r">');
        for(var i in _dis){
            if(!_dis[i][C$.DATAITEM_FORBID]){
                buf.push('<li>');
                buf.push('<input type="checkbox" name="" id="'+_dis[i][C$.RESULT_ID]+'" index="'+counter+'"'+(!!_dis[i][C$.DATAITEM_CHECKED]?" checked":"")+(!!_dis[i][C$.DATAITEM_STATIC]?" disabled=\"disabled\"":"")+' />');
                if(!_dis[i][C$.DATAITEM_CHECKED]){
                    non.push(i);
                    nonDis[_dis[i][C$.RESULT_ID]] = i;
                }
                buf.push('<label for="'+_dis[i][C$.RESULT_ID]+'">');
                buf.push(_dis[i][C$.RESULT_VAL]);
                buf.push('</label>');
                buf.push('</li>');
                counter++;
            }
        };
        buf.push('</ul>');
        buf.push('</div>');
        buf.push('</dd>');
        buf.push('</dl>');
        $('#'+barId+" .button-slider:eq(0)").append(buf.join(""));

        //判断是否隐藏列数目等于所有列，则全部显示
        if(non.length==_dis.length){
            non = [];
            $("input:checkbox",$("#"+barId)).each(function(){
                $(this).jCheck(true);
            });
        }
        if(!!_extSettings&&!!_extSettings.multiGroup){
            var curIdxes = [], prevCol = (!!_extSettings.prevCol?_extSettings.prevCol:0);
            for(var i in _dis){
                if(_extSettings.colMode!="part"){
                    $("li input:checkbox",$("#"+barId)).unbind("click");
                    $("li input:checkbox",$("#"+barId)).click(function(){
                        curIdxes = [];
                        if(_extSettings.multiItem.join().indexOf($(this).jId())>=0){
                            for(var g=0;g<_extSettings.multiGroup;g++){
                                curIdxes.push(((Number(i)-Number(prevCol)+Number(1))*g+Number($(this).attr("index"))));
                            }
                            O.showCols(curIdxes, this.checked, _id, this);
                        }else{
                            O.showCols(Number(i)+Number(extColNum), this.checked, _id, this);
                        }
                        if(!!_extSettings.func){
                        	eval(_extSettings.func+"()");
                        }
                    });
                }else{
                    $("li input:checkbox",$("#"+barId)).unbind("click");
                    $("li input:checkbox",$("#"+barId)).click(function(){
                        curIdxes = [];
                        if(_extSettings.multiItem.join().indexOf($(this).jId())>=0){
                            for(var g=0;g<_extSettings.multiGroup;g++){
                                curIdxes.push(Number(prevCol)+_extSettings.multiItem.length*g+Number($(this).attr("index")));
                            }
                            for(var j in curIdxes){
                                O.showCols(curIdxes[j], this.checked, _id);
                            }
                        }else{
                            O.showCols(Number(i)+Number(extColNum), this.checked, _id, this);
                        }
                        if(!!_extSettings.func){
                        	eval(_extSettings.func+"()");
                        }
                    });
                }
            }
        }else{
            for(var i in _dis){
                $("li input:checkbox",$("#"+barId)).unbind("click");
                $("li input:checkbox",$("#"+barId)).click(function(){
                    O.showCols(Number($(this).attr("index"))+Number(extColNum), this.checked, _id, _extSettings, this);
                });
            }
        }
        if(!!_extSettings&&!!_extSettings.multiGroup){
            var prevCol = (!!_extSettings.prevCol?_extSettings.prevCol:0);
            if(_extSettings.colMode!="part"){
                for(var key in nonDis){
                    if(_extSettings.multiItem.join().indexOf(key)>=0){
                        for(var g=0;g<_extSettings.multiGroup;g++){
                            O.showCols(Number(prevCol)+_extSettings.multiItem.length*g+Number(nonDis[key]), false, _id);
                        }
                    }else{
                        O.showCols(Number(non[i])+Number(extColNum), false, _id);
                    }
                }
            }else{
                for(var key in nonDis){
                    if(_extSettings.multiItem.join().indexOf(key)>=0){
                        for(var g=0;g<_extSettings.multiGroup;g++){
                            O.showCols(Number(prevCol)+_extSettings.multiItem.length*g+Number(nonDis[key]), false, _id);
                        }
                    }else{
                        O.showCols(Number(non[i])+Number(extColNum), false, _id);
                    }
                }
            }
        }else{
            for(var i=0,len=non.length;i<len;i++){
                O.showCols(Number(non[i])+Number(extColNum), false, _id, _extSettings);
            }
        }
        $('.button-slider',$("#"+barId)).buttonSlider();
    },
    dnExcelAdd: function(_id, _tbl,_func){
        var buf = [], barId = _id+"Bar";
        if(!$.jDomExist(barId)){
            buf.push('<div class="ctrl-con mb10 mt10 mr10 ml10" id="'+barId+'"></div>');
            $(buf.join("")).insertBefore($("#"+_id));

            $("#"+barId).jHeight(30);
            $("#"+barId).jWidth($("#"+_id)[0].style.width);
            $("#"+barId).jFloat($("#"+_id).jFloat());
        }
        if(!$.jDomExist(barId, "fr")){
            $("#"+barId).append('<div class="fr"></div>');
        }

        buf = [];
        buf.push('<span class="fr mt1 ml10">');
        buf.push('<a href="javascript:void(0);" class="btn download"><i>&nbsp;</i><span>下载</span></a>');
        buf.push('</span>');
        $("#"+barId).find(".fr").find(".download").eq(0).parent().remove();
        $("#"+barId).find(".fr").eq(0).prepend(buf.join(""));
        $("#"+barId).find(".fr").eq(0).find(".download").unbind('click');
        $("#"+barId).find(".fr").eq(0).find(".download").bind('click',function(){
        	if(!!_func){
        		_func();
        	}else{
        		if(!!_tbl){
        			$.jDnExcelJson(_tbl, getExcelName($("#"+_tbl).jTitle()));
        		}else{
        			$.jDnExcelJson(_id+"Tbl",getExcelName($("#"+_id+"Tbl").jTitle()));
        		}
        	}
        });
    },
    getDefalutExcelName: function(name){
    	//生成excelName类型1（有开始和截至时间的）
    	if( !name && !!$("#PageTitle").html() ){
    		name = $("#PageTitle").html();
    	}else if(!!$("title").html()){
    		name = $("title").html();
    	}
    	if(!!name){
        	return name;
    	}else{
    		return "";
    	}
    }
    ,getExcelNameByStartEndDate: function(name,start,end){
    	name = B$.getDefalutExcelName(name);
    	if(!name){
        	return "";
    	}
    	if(!!$("#"+start).val()&&!!$("#"+end).val()&&!!name){
    		name = $("#"+start).val().replace(/-/g,"")+"~"+$("#"+end).val().replace(/-/g,"")+name;
    	}
        return name;
    },
    getExcelNameByDate: function(name,dateSeg){
    	//生成excelName类型2（昨天前天近7天本周上周本月上月）
    	name = B$.getDefalutExcelName(name);
    	if(!name){
        	return "";
    	}
    	var d = $("#"+dateSeg).val();
    	if( !!d){
    		if(d.length == 10 || d.length == 7){
    			name=d.replace(/-/g,"")+name;
    		}else if(d.length <= 2){
    			var date = new Date();
    			var start_milliseconds=date.getTime()-(1000*60*60*24);
    			var end_milliseconds=date.getTime()-(1000*60*60*24*d);
    			var start = new Date(start_milliseconds).Format("YYYYMMDD");
    		//	start.setTime(start_milliseconds);
    			var end = new Date(end_milliseconds).Format("YYYYMMDD");;
    		//	end.setTime(end_milliseconds);
    			name=start+"~"+end+name;
    		}else if(d.length == 8){
    			name= d.substring(0,4)+"年第"+d.substring(6,8)+"周"+name;
    		}
    	}
        return name;
    },
    getExcelNameByOther: function(name){
    	//生成excelName类型1（有开始和截至时间的）
    	name = B$.getDefalutExcelName(name);
    	if(!name){
        	return "";
    	}
        return name;
    },
    loadSearch: function(){
        //查询输入关键字提示
        $('.key-search input').keyInput();
    },
    showSeries: function(_idx, _bVis, _div, _extSettings){
        var O = this;
        try{
            if(O.charts[_div].options.chart.defaultSeriesType=="spline"){
                _bVis?O.charts[_div].series[_idx].show():O.charts[_div].series[_idx].hide();
            }else if(O.charts[_div].options.chart.defaultSeriesType=="pie"){
                _bVis?O.charts[_div].series[0].data[_idx].setVisible(true):O.charts[_div].series[0].data[_idx].setVisible(false);
            }else{
                _bVis?O.charts[_div].series[_idx].show():O.charts[_div].series[_idx].hide();
            }
        }catch(err){
            return;
        }
    },
    /**
     * 显示、隐藏表列
     * @param {Object} _idx
     * @param {Object} _bVis
     */
    showCols: function(_idx, _bVis, _div, _this, _ext){
        var O = this;
        try{
            if(!_bVis&&_this){
                var min = $("input:checkbox:disabled",$(_this).closest("ul")).length + 1;
                if($("input:checkbox:checked",$(_this).closest("ul")).length<min){
                    O.T.warn("至少选择一个指标进行查看！");
                    _this.checked = true;
                    return;
                }
            }
            O.tables[_div].fnSetColumnVis(_idx,_bVis);
            //判断表格是否加载横向滚动插件
            if($(".gt-l",$("#"+_div)).length>0&&$(".gt-r",$("#"+_div)).length>0){
                var perThW = 185,
                    step = 2,
                    lastMl = $('.dataTable',this.o).css("margin-left").replace("px", ""),
                    nw = $("th",$("#"+_div)).length*perThW,
                    bw = $('#'+_div+' .grid-wrap').outerWidth(),
                    lastI = 0;
                lastMl = ((Number(nw)+Number(lastMl))>bw)?lastMl:((Number(lastMl)+perThW)>0?0:(Number(lastMl)+perThW));
                lastI = Math.ceil((Number((lastMl+"").replace("-",""))/perThW)/step);
                O.tables[_div].css({"width": (nw>bw?nw:bw)+"px"});

                $('#'+_div+' .grid-wrap').gridSlider({
                    step:step,
                    time:200,
                    lastMl: lastMl,
                    lastI: lastI
                });
            }
        }catch(err){
            return;
        }
    },
    /**
     * 渲染概况时，从初始化设置里过滤出Charts用到的指标，给上述指标添加CheckBox
     * @param _div
     */
    cfgFilter: function(_div){
        var O = this;

        //通过概况的DivID获取Charts的DivID
        var curDivs = $("#"+_div).attr("be").split(",");

        var divCfgs=O.chartCfg,zbCfgs=[],chartZbs=[];
        for(var p in curDivs){
            for(var j in divCfgs){
                if(divCfgs[j][O.constants.Config.DIV]==curDivs[p]){
                    zbCfgs = divCfgs[j][O.constants.Config.ZB];
                    for(var i=0,len=zbCfgs.length;i<len;i++){
                        chartZbs.push(zbCfgs[i][1]);
                    }
                }
            }
        }
        return chartZbs;
    },
    zbHead: function(_key, _zb, _div){
        var O = this,cfg = {};
        if(!!_key){
            switch(_key){
                case O.constants.Config.CHART:	 	cfg = O.chartCfg;
                    for(var i in cfg){
                        if(cfg[i][O.constants.Config.DIV]==_div){
                            cfg[i][O.constants.Config.ZB].unshift(_zb);
                        }
                    }
                    O.tableCfg = cfg;
                    break;
                case O.constants.Config.TABLE: 	 	cfg = O.tableCfg;
                    for(var i in cfg){
                        if(cfg[i][O.constants.Config.DIV]==_div){
                            cfg[i][O.constants.Config.ZB].unshift(_zb);
                        }
                    }
                    O.tableCfg = cfg;
                    break;
                default:	break;
            }

        }
    },
    zbTail: function(_key, _zb, _div){
        var O = this,cfg = {};
        if(!!_key){
            switch(_key){
                case O.constants.Config.CHART:		cfg = O.chartCfg;
                    for(var i in cfg){
                        if(cfg[i][O.constants.Config.DIV]==_div){
                            cfg[i][O.constants.Config.ZB].push(_zb);
                        }
                    }
                    O.chartCfg = cfg;
                    break;
                case O.constants.Config.TABLE: 	 	cfg = O.tableCfg;
                    for(var i in cfg){
                        if(cfg[i][O.constants.Config.DIV]==_div){
                            cfg[i][O.constants.Config.ZB].push(_zb);
                        }
                    }
                    O.tableCfg = cfg;
                    break;
                default:	break;
            }

        }
    },
    /**
     * 扩展返回的指标集属性
     * @param _defaultZbs
     * @param _checkedCols 默认选中的
     * @param _staticCols 默认固定不变的
     * @returns {*}
     */
    zbExt: function(_defaultZbs, _checkedCols, _staticCols){
        var zbs = $.jClone(_defaultZbs),ext = {};
        for(var i in zbs){
            if(_checkedCols.join().indexOf(zbs[i][C$.RESULT_ID])>=0){
                ext = {};
                ext[C$.DATAITEM_CHECKED] = true;
                $.extend(zbs[i],ext);
            }
            if(_staticCols.join().indexOf(zbs[i][C$.RESULT_ID])>=0){
                ext = {};
                ext[C$.DATAITEM_STATIC] = true;
                $.extend(zbs[i],ext);
            }
        }
        return zbs;
    },
    /**
     * 构造新的指标
     * @param _id
     * @param _val
     * @param _datatype
     * @param _decimal
     * @param _ext {
     *       "checked": true,
     *       "static": true,
     *       "sortable": true,
     *       "total": true
     *       "average": true
     * }
     * @returns {*}
     */
    zbBuild: function(_id, _val, _datatype, _decimal, _ext){
        var zbs = {};
        zbs[C$.RESULT_ID] = _id;
        zbs[C$.RESULT_VAL] = _val;
        zbs[C$.RESULT_TYPE] = _datatype;
        zbs[C$.RESULT_DEC] = _decimal;
        if(!!_ext){
            $.extend(zbs, _ext);
        }
        return zbs;
    },
    /**
     * 配置数据项扩展
     */
    DI: {
        /**
         * 配置数据项扩展数据项的初始化显示状态
         * @param _defaultDis   当前操作的数据项集
         * @param _curDiId    当前更改的数据项
         * @param _bSingle  是否单选
         * @returns {*}
         */
        diShowExt: function(_defaultDis, _curDiId, _bSingle){
            var dis = $.jClone(_defaultDis);
            if(!!_bSingle){
                for(var id in _defaultDis){
                    dis[id].bShow = false;
                }
            }
            dis[_curDiId].bShow = true;
            return dis;
        }
    },
    cfgAdd: function(_key, _options){
        var O = this;
        if(!!_key){
            switch(_key){
                case O.constants.Config.MENU:   $.extend(O.menuCfg, _options);
                    break;
                case O.constants.Config.DATEPICKER: if($.jIsArray(O.datePickerCfg)){
                    $.merge(O.datePickerCfg, _options);
                    O.datePickerCfg = $.unique(O.datePickerCfg);
                }else{
                    $.extend(O.datePickerCfg, _options);
                }
                    break;
                case O.constants.Config.LEGEND:   $.extend(O.legendCfg, _options);
                    break;
                case O.constants.Config.CHART:   $.merge(O.chartCfg, _options);
                    O.chartCfg = $.unique(O.chartCfg);
                    break;
                case O.constants.Config.BAR:     $.extend(O.barCfg, _options);
                    break;
                case O.constants.Config.TAB:     $.extend(O.tabCfg, _options);
                    break;
                case O.constants.Config.TABLE:   $.merge(O.tableCfg, _options);
                    O.tableCfg = $.unique(O.tableCfg);
                    break;
                default:	break;
            }
        }
    },
    cfgFormat: function(_key, _xml, _div, _extra){
        var O = this,cfg = {};
        if(!!_key){
            switch(_key){
                case O.constants.Config.CHART:
                case O.constants.Config.TABLE:
                    var opt=[],zbs=[],zb = [];
                    cfg[O.constants.Config.DIV] = _div;
                    if($.jIsArray(_xml)&&$.jIsArray(_xml[0])){
                        for(var i in _xml[0]){
                            zb = [];
                            if(_xml[1].join(",").indexOf(_xml[0][i].id)<0){
                                zb.push(_xml[0][i].id);
                                zb.push(_xml[0][i].value);
                                if(_xml[0][i].disabled){
                                    zb.push(true);
                                }
                                zbs.push(zb);
                            }
                        }
                    }else{
                        for(var i in _xml){
                            zb = [];
                            zb.push(_xml[i].id);
                            zb.push(_xml[i].value);
                            if(_xml[i].disabled){
                                zb.push(true);
                            }
                            zbs.push(zb);
                        }
                    }
                    cfg[O.constants.Config.ZB] = zbs;
                    if(_extra){
                        $.extend(cfg, _extra);
                    }
                    opt.push(cfg);
                    break;
                default:	break;
            }
        }
        return opt;
    },
    cfgClear: function(_key){
        var O = this;
        if(!!_key){
            switch(_key){
                case O.constants.Config.CHART:   O.chartCfg = [];
                    break;
                case O.constants.Config.TABLE:   O.tableCfg = [];
                    break;
                default:	break;
            }
        }
    },
    printPage:function(){
        $('a.print').click(function(){
            printG();
        });
    },
    scrollToTop:function(){
        var $win = $(window);
        $("#sys-b-bar").css({top: (document.documentElement.clientHeight - $("#sys-b-bar").jHeight()-$("#sys-b-bar").jHeight()/2-100) + "px"});
        //回到顶端
        //$win.scroll( function() {
        //if($win.scrollTop()>0){
        $('#sys-b-bar .toTop:eq(0)').show();
        //}else{
        //$('#sys-b-bar .to-top:eq(0)').hide();
        //}
        //});
    },
    /**
     * 增加商家反馈按钮
     */
    initFeedback:function(_cfg){
        var O = this,cfg = !!_cfg?_cfg[O.constants.Config.MENU]:O.menuCfg,$menu = $("#"+cfg[O.constants.Config.ID]);
        $("#sys-feedbackDiv").css({top: (document.documentElement.clientHeight - $("#sys-feedbackDiv").jHeight()-10)- 15 + "px"});
        $("#sys-feedbackSubmitDiv").css({top: (document.documentElement.clientHeight - $("#sys-feedbackSubmitDiv").jHeight()-10) -15 + "px"});
        //初始化各输入域
        //$('#popFeedback_popId').val(venderId);
        //$('#popFeedback_shopId').val(shopId);
        //$('#popFeedback_popName').val(shopName);
        var level2Name = "->"+($('#PageTitle').text()==""?$("span",$menu).text():$('#PageTitle').text());
        var level1Name = $(".tit span",$menu.closest(".lev1")).text()==""?"":("->"+$(".tit span",$menu.closest(".lev1")).text());
        var navName = $('#'+curGroup+' span').text();
        var pageName = navName + level1Name + level2Name;
        $('#popFeedback_pageName').val(pageName);

        $('#sys-b-bar .toHelper').click(function(){
            $('#sys-feedbackSubmitDiv').hide();
            $('.warnMessageDiv').hide();
            $('#sys-feedbackDiv .content textarea').css("height","148px").css("max-height","148px");
            $('.warnMessageDiv_contact').hide();
            $('#sys-feedbackDiv').toggle();
        });
        $('#feedbackSubmit').click(function(){
            if($.jTrim($('#popFeedback_feedback').val())==""){
                $('.warnMessageDiv').show();
                $('.warnMessageContent').text("反馈内容不能为空");
                $('#sys-feedbackDiv .content textarea').css("height","110px").css("max-height","110px");
                return false;
            }else if($('#popFeedback_feedback').val().length>500){
                $('.warnMessageDiv').show();
                $('.warnMessageContent').text("反馈内容长度不能超过500");
                $('#sys-feedbackDiv .content textarea').css("height","110px").css("max-height","110px");
                return false;
            }else if($('#popFeedback_contact').val().length>128){
                $('.warnMessageDiv_contact').show();
                return false;
            }else{
                $('.warnMessageDiv').hide();
                $('.warnMessageDiv_contact').hide();
                $('#sys-feedbackDiv .content textarea').css("height","148px").css("max-height","148px");
                doAjaxQuery(context_path+"/advancedDataModel/addFeedback.action",$('#feedbackForm').serialize(),function(result){
                    $('#popFeedback_feedback').val("");
                    $('#popFeedback_contact').val("");
                    $('#sys-feedbackDiv').hide();
                    $('#sys-feedbackSubmitDiv').show();
                    $.unblockUIV2();
                });
            }
        });
        $('#closeBtn').click(function(){
            $('#sys-feedbackDiv').hide();
        });
        $('#feedbackCancel').click(function(){
            $('#popFeedback_feedback').val("");
            $('#popFeedback_contact').val("");
            $('#sys-feedbackDiv').hide();
        });
        $('.pop_close').click(function(){
            $('#sys-feedbackSubmitDiv').hide();
        });


    },
    /**
     * initialize the date picker
     */
    initDatePicker: function(_cfg){
        var O = this,cfg = !!_cfg?_cfg:O.datePickerCfg;
        if(cfg){
            if($.jIsArray(cfg)){
                O.multiDatePicker(cfg);
            }else{
            	//覆盖cfg.maxDate
            	var maxDate_temp = (!!cfg&&!!cfg.maxDate)?cfg.maxDate:1;
                $.ajax({
                    url : context_path+"/getMenuTime.action",
                    type : "post",
                    dataType : "json",
                    async:false,
                    data : {"menuCode":O.menuCfg[O.constants.Config.ID]},
                    success :function(data){
                    	//将缓存中的最大时间赋值给maxDate_temp
                    	var result_tmp = data.result;
                        if(result_tmp != null && result_tmp != ""){
                        	maxDate_temp = parseInt(result_tmp);
                        }
                    } ,
                    error :  function(XMLHttpRequest, s, errorThrown) {
                    	
                    }
                });
            	cfg.maxDate = maxDate_temp;
                var buf = [],bRapidInitial = false,bak;
                var rapid_index;
                //新快查方式
                if(cfg.RapidType == "QuickRapid"){
                	if(cfg.Rapid&&cfg.rapidSel&&(cfg.rapidSel.external||cfg.rapidSel.noPicker)){
                        $("#widgetCalendarRapidSel").remove();
                        buf.push('<span class="rapidSel ml15">');
                        buf.push('<input type="hidden" id="widgetCalendarRapidSel" />');
                        buf.push('<label class="filterLbl" for="">'+(cfg.rapidSel.label?cfg.rapidSel.label:"快速查看")+'</label>');
                        var counter = 0, today = new Date(), disabled = false, maxDate = !!cfg.maxDate?cfg.maxDate:1,ref = "!month!week";
                        for(var desc in cfg.rapidSel.item){
                        	if(desc=="前一天" || desc=="后一天" || desc=="重置"){
                        		ref = "!month!week";
                        	}else if(desc=="上一周" || desc=="下一周"){
                        		ref = "week";
                        	}else if(desc=="上一月" || desc=="下一月"){
                        		ref = "month";
                        	}else{
                        		ref = O.constants.DatePicker.VODAY;
                        	}
                        	if(desc=="后一天" || desc=="下一周" || desc=="下一月"){
                        		buf.push('<span style="vertical-align:middle;font-family:微软雅黑;font-size:14px;color:gray;padding-right:10px;" desc="'+desc+'_" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'">'+desc+'</span>');
                        		buf.push('<a class="rapid-a" style="vertical-align:middle;cursor:pointer;font-family:微软雅黑;font-size:14px;display:none;padding-right:10px;" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'">'+desc+'</a>');
                        	}else if(desc=="前一天" || desc=="上一周" || desc=="上一月"){
                        		buf.push('<a class="rapid-a" style="vertical-align:middle;cursor:pointer;font-family:微软雅黑;font-size:14px;padding-right:10px;" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'">'+desc+'</a>');
                        	}else{
                        		//buf.push('<span class="rapid-a radiobox" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib pointer" style="color: #333333" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                        		buf.push('<span style="vertical-align:middle;font-family:微软雅黑;font-size:14px;color:gray;padding-right:10px;display:none;" desc="'+desc+'_" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'">'+desc+'</span>');
                        		buf.push('<a class="rapid-a" style="vertical-align:middle;cursor:pointer;font-family:微软雅黑;font-size:14px;padding-right:10px;" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'">'+desc+'</a>');
                        		/*if(desc=="近30天"){
                        			buf.push('&nbsp;&nbsp;&nbsp;');
                        		}*/
                        	}
                        }
                        buf.push('</span>');
                        $("#widget").after(buf.join(""));
                    }
                }else{
                	if(cfg.Rapid&&cfg.rapidSel&&(cfg.rapidSel.external||cfg.rapidSel.noPicker)){
                        $("#widgetCalendarRapidSel").remove();
                        buf.push('<span class="rapidSel ml15">');
                        buf.push('<input type="hidden" id="widgetCalendarRapidSel" />');
                        buf.push('<label class="filterLbl" for="">'+(cfg.rapidSel.label?cfg.rapidSel.label:"快速查看")+'</label>');
                        var counter = 0, today = new Date(), disabled = false, maxDate = !!cfg.maxDate?cfg.maxDate:1,ref = "!month!week";
                        for(var desc in cfg.rapidSel.item){
                            if(desc.indexOf(C$.DIMENSION_DATE[O.constants.DatePicker.VMONTH])>=0){
                                ref = O.constants.DatePicker.VMONTH;
                            }else if(desc.indexOf(C$.DIMENSION_DATE[O.constants.DatePicker.VWEEK])>=0){
                                ref = O.constants.DatePicker.VWEEK;
                            }else{
                                ref = O.constants.DatePicker.VODAY;
                            }
                            if(desc==B$.constants.DatePicker.CURWEEK){
                                disabled = today.getDay()&&today.getDay()<=maxDate;
                                buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                            }else if(desc==B$.constants.DatePicker.CURMONTH){
                                disabled = today.getDate()<=maxDate;
                                buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                            }else if(desc==B$.constants.DatePicker.PREV1){
                                disabled = 2<=maxDate;
                                buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                            }else if(desc==B$.constants.DatePicker.PREV2){
                                disabled = 3<=maxDate;
                                buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                            }else if($.jIsArray(cfg.rapidSel.item[desc])){
                                //判断是否初始化加载快查
                                if(cfg.rapidSel.item[desc][1]){
                                    bRapidInitial = true;
                                    rapid_index = counter;
                                }
                                buf.push('<span class="radiobox '+(!!cfg.rapidSel.item[desc][1]?" r-checked":"")+'" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc][0]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="mr10 ml2 p-ib pointer" style="color: #333333" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                            }else{
                                buf.push('<span class="radiobox" desc="'+desc+'" ref="'+ref+'" val="'+cfg.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib pointer" style="color: #333333" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                            }
                            counter++;
                        }
                        buf.push('</span>');
                        $("#widget").after(buf.join(""));
                    }
                }
                if(cfg.bDimension&&cfg.dimension.bEmbed){
                    buf = [];
                    buf.push('<div id="widgetDimension" class="embedDimension">');
                    buf.push('<ul>');
                    if(cfg.View=="day"||cfg.View=="!week"||cfg.View=="!month"){
                        for(var i in cfg.dimension.item){
                            buf.push('<li val="'+cfg.dimension.item[i]+'">按'+C$.DIMENSION_DATE[cfg.dimension.item[i]]+'查看</li>');
                        }
                    }else{
                        buf.push('<li val="'+cfg.View+'">按'+C$.DIMENSION_DATE[cfg.View]+'查看</li>');
                    }
                    buf.push('</ul>');
                    buf.push('</div>');
                    $(buf.join("")).insertBefore($("#Picker"));
                    $("#Calendar").addClass("fl");
                    $("#Calendar").siblings(".c-btn").addClass("clear");
                    var bParam = true;
                    $("ul li",$("#widgetDimension")).die('click');
                    $("ul li",$("#widgetDimension")).live("click",function(){
                        $(this).addClass("sel").css({"border-right": "0 none"});
                        $(this).siblings().removeClass("sel");
                        $(".datepicker",$("#Calendar")).remove();
                        $(".radiobox.r-checked",$("#widget").next(".rapidSel")).removeClass("r-checked");
                        $(".rapid-a.r-checked",$("#widget").next(".rapidSel")).removeClass("r-checked");
                        //店铺诊断限制
                        if(cfg.datePickerCfg!=undefined && cfg.datePickerCfg.Param!=undefined && cfg.datePickerCfg.Param=="shopDiagnosis" && $(this).attr("val")=="week"){
                            cfg.maxDate=7;
                        }
                        if(cfg.datePickerCfg!=undefined && cfg.datePickerCfg.Param!=undefined && cfg.datePickerCfg.Param=="shopDiagnosis" && $(this).attr("val")=="!month!week"){
                            cfg.maxDate=1;
                        }
                        O.soloDatePicker($.extend(cfg, {View: $(this).attr("val"),Param: (bParam&&cfg.Param)?cfg.Param:{}}));
                        O.cache.set("widthCode",0,"widget");
                        bak = O.cache.get("bak","widget");
                        bak = bak||{finalDateSeg: [],lastDateSeg: [],finalField: "",lastField: ""};                        
                        O.cache.set({"bak": bak},"widget");
                        bParam = false;
                        //手动选择和快查关联
                        if(cfg.RapidType == "QuickRapid"){
                        	var dateDim = new Date();
                        	var yesterdayStr = getDateStr(-1);
                    		yesterdayStr = yesterdayStr.replace(/-/g, "");
                        	var urStartDate = bak.finalDateSeg[0];
                        	var urEndDate = bak.finalDateSeg[1] ? bak.finalDateSeg[1] : "";
                        	var urDate = bak.finalDateSeg[2] ? bak.finalDateSeg[2] : "";
                        	var checkDate = "";
                        	if(urDate == ""){
                        		if(urStartDate.length == 7){
                        			checkDate = urStartDate + "-31";
                        		}else{
                        			checkDate = urStartDate;
                        		}
                        	}else{
                        		if(urDate.indexOf(99) > -1){//周
                            		currentGloalWeekStartDate = urStartDate;
                            		currentGloalWeekEndDate = urEndDate;
                            	}
                        		checkDate = urEndDate;
                        	}
                        	
                        	if( parseInt(checkDate.replace(/-/g, "")) < parseInt(dateDim.curWeek(0)[0].replace(/-/g, "")) ){
                            	$("a[desc='下一周']").show();
                            	$("span[desc='下一周_']").hide();
                            }else{
                            	$("a[desc='下一周']").hide();
                            	$("span[desc='下一周_']").show();
                            }
                        	if( parseInt(checkDate.replace(/-/g, "")) < parseInt(yesterdayStr) ){
                            	$("a[desc='后一天']").show();
                            	$("span[desc='后一天_']").hide();
                            }else{
                            	$("a[desc='后一天']").hide();
                            	$("span[desc='后一天_']").show();
                            }
                        	if( parseInt(checkDate.replace(/-/g, "")) < parseInt(dateDim.curMonth(0)[0].replace(/-/g, "")) ){
                            	$("a[desc='下一月']").show();
                            	$("span[desc='下一月_']").hide();
                            }else{
                            	$("a[desc='下一月']").hide();
                            	$("span[desc='下一月_']").show();
                            }
                        	//点击维度,所有的后一天下一周下一月都不能点，因为时间恢复当前可选最晚时间
                        	$("a[desc='下一周']").hide();
                        	$("span[desc='下一周_']").show();
                        	$("a[desc='后一天']").hide();
                        	$("span[desc='后一天_']").show();
                        	$("a[desc='下一月']").hide();
                        	$("span[desc='下一月_']").show();
                        }
                    });
                    var paramCfg = cfg[O.constants.Config.PARAM],dimension = paramCfg&&paramCfg[O.constants.Config.DIMENSION];
                    if(dimension){
                        $('ul li[val="'+dimension+'"]',$("#widget")).click();
                    }else{
                        $("ul li:first",$("#widget")).click();
                    }
                    $(".btn:first",$("#widget")).click();
                }else{
                    O.soloDatePicker(cfg);
                }

                //判断初始化快查是否选中
                if(cfg.Rapid&&cfg.rapidSel&&(cfg.rapidSel.external||cfg.rapidSel.noPicker)){
                    if(bRapidInitial){
                        $("#widget").next(".rapidSel").find(".radiobox").eq(rapid_index).click();
                    }
                }
            }
        }
    },
    multiDatePicker: function(_cfg){
        var O = this,cfgs = _cfg,cfg,date = new Date(),curDate,pickerId,tmp=[],currs=[],states=[];
        if(!!cfgs){
            for(var ele in cfgs){
                cfg = cfgs[ele];
                if(!!cfg.maxDate&&cfg.maxDate>=2){
                    //TODO
                }else{
                    if(date.getHours()<8){
                        cfg.maxDate = 2;
                    }else{
                        if(!!O.cache.get(O.constants.Cache.LASTDATE)){
                            cfg.maxDate = Number(date.Format("yyyyMMdd"))-Number(O.cache.get(O.constants.Cache.LASTDATE).replace(/-/g,""));
                        }
                    }
                }
                
                /**
                 * setting show width
                 * param _model 1-170,125; 2-285,240; 3-385,340:
                 */
                var widthSet = function(_model, _pickerId){
                    _model = bSimple?1:_model;
                    switch(_model){
                        case 1:  $('.widgetField',currs[_pickerId]).css({"width": "170px"});
                            $('.widgetField input',currs[_pickerId]).css({"width": "125px"});
                            break;
                        case 2:  $('.widgetField',currs[_pickerId]).css({"width": "285px"});
                            $('.widgetField input',currs[_pickerId]).css({"width": "240px"});
                            break;
                        case 3:  $('.widgetField',currs[_pickerId]).css({"width": "340px"});
                            $('.widgetField input',currs[_pickerId]).css({"width": "295px"});
                            break;
                        case 4:  $('.widgetField',currs[_pickerId]).css({"width": "385px"});
                            $('.widgetField input',currs[_pickerId]).css({"width": "340px"});
                            break;
                        case 5:  $('.widgetField',currs[_pickerId]).css({"width": "197px"});
                            $('.widgetField input',currs[_pickerId]).css({"width": "150px"});
                            break;
                        default: break;
                    }
                };
                var bSeparate = !!cfg[O.constants.DatePicker.BSEPARATE];
                
                if(bSeparate){
                	var pickerId = [];
                	var pickerBak = [];
                	pickerId[0] = cfg[O.constants.Config.ID][0];
                	pickerId[1] = cfg[O.constants.Config.ID][1];
                    currs[pickerId[0]] = $("#"+pickerId[0]);
                    currs[pickerId[1]] = $("#"+pickerId[1]);
                    var paramCfg = cfg[O.constants.Config.PARAM]
                        ,type = cfg[O.constants.Config.TYPE]
                        ,style = cfg[O.constants.Config.STYLE],bSimple = (!!style&&style==O.constants.DatePicker.SIMPLE)
                        ,patt = cfg[O.constants.Config.PATTERN]
                        ,range = !!cfg[O.constants.Config.RANGE]?cfg[O.constants.Config.RANGE]:[]
                        ,view = cfg[O.constants.Config.VIEW],bMonth = (view==O.constants.DatePicker.VMONTH),bWeek = (view==O.constants.DatePicker.VWEEK)
                        ,dateSeg = cfg[O.constants.Config.DATESEG]
                        ,bSingle = (type==O.constants.DatePicker.SINGLE)
                        ,bRange = (type==O.constants.DatePicker.RANGE)
                        ,maxDate = !!cfg.maxDate?(new Date()).prevDay(cfg.maxDate).Format("yyyy-MM-dd"):(new Date()).prevDay().Format("yyyy-MM-dd")
                        ,fbdDate = !!cfg.maxDate?(new Date()).prevDay(Number(cfg.maxDate)-1).Format("yyyy-MM-dd"):(new Date()).Format("yyyy-MM-dd")
                        ,calendars = !!cfg[O.constants.Config.CALENDARS]?cfg[O.constants.Config.CALENDARS]:2
                        ,inRapid = !!$(".radiobox.r-checked",currs[pickerId[0]].next(".rapidSel")).length
                        ,customChanges = !!cfg[O.constants.Config.CUSTOMCHANGE]?cfg[O.constants.Config.CUSTOMCHANGE]:[];
                        pickerBak[0] = O.cache.get(pickerId[0]+"_bak","widget")||{finalDateSeg: [],lastDateSeg: [],finalField: "",lastField: ""};
                        pickerBak[1] = O.cache.get(pickerId[1]+"_bak","widget")||{finalDateSeg: [],lastDateSeg: [],finalField: "",lastField: ""};
                       
                    //页面跳转传参,前一个日期控件只能选日周月,后一个日期控件为时间范围选择,导致前边传至后边startdate和enddate为同一值且可能是周20149905或是月201402
                    if(!!paramCfg&&paramCfg!={}){
                    	var paramDate = paramCfg[O.constants.Config.DATE];
                    	if(!!paramDate&&paramDate.length==2&&paramDate[0]==paramDate[1]){
                    		if(paramDate[0].length==7){//月
                    			var y=parseInt(paramDate[0].slice(0,4)),m=parseInt(paramDate[0].slice(5,7).indexOf("0")>=0?paramDate[0].slice(6,7):paramDate[0].slice(5,7)),d=1;
                    			var tmpParamDate = new Date(y,m-1,d);
                    			paramDate[0]=tmpParamDate.firstDayOfMonth().Format("yyyy-MM-dd");
                    			paramDate[1]=tmpParamDate.lastDayOfMonth().Format("yyyy-MM-dd");
                    		}else if(paramDate[0].indexOf("99")>=0){//周
                    			var y=parseInt(paramDate[0].slice(0,4)),ww=paramDate[0].slice(paramDate[0].indexOf("99")).replace("99",""),w=parseInt(ww.indexOf("0")==0?ww.replace("0",""):ww);
                    			var tmpParamDate = $.jGetWeekByNum(w, y);
                    			paramDate[0]=tmpParamDate[0];
                    			paramDate[1]=tmpParamDate[1];
                    		}else{
                    			//日传参无需处理
                    		}
                    	}
                    }
                        
                    var confirmPicker = function(_valSet,_pickerId){
                    	if(_valSet.dateSeg.length<3){
                    		for(var i in _valSet.dateSeg){
                    			$('#'+_valSet.idSeg[i]).val(_valSet.dateSeg[i]);
                    		}
                    	}else{
                    		$('#'+_valSet.idSeg[0]).val(_valSet.dateSeg[2]);
                    	}
                    	$('.widgetField input[type!=hidden]',currs[_pickerId]).val(_valSet.field);
                    	O.datepickers[_pickerId].DatePickerSetDate(_valSet.dateSeg.length>1?[_valSet.dateSeg[0],_valSet.dateSeg[1]]:_valSet.dateSeg[0]);
                    };
                    var _wc_hide=function(_pickerId){
                    	$('.widgetCalendar',currs[_pickerId]).stop().animate({height:0}, 100,function(){
                    		currs[_pickerId].removeClass('widgetField-on');
                    	});
                    	states[_pickerId] = false;
                    	$('.widgetField>a',currs[_pickerId]).removeClass("on")
                    },closeState = function(e){
                    	states[e.data.pickerId] = false;
                    };
                	
            		widthSet(1, pickerId[0]);
            		widthSet(1, pickerId[1]);
            		if(!!range[0]&&$.jIsArray(range[0])){
                        tmp[0] = date.prevDay(cfg.maxDate-1).prevDay(range[0][0]).Format("yyyy-MM-dd");
                        tmp[1] = date.prevDay(range[0][1]).Format("yyyy-MM-dd");
                    }else{
                        tmp[0] = date.prevDay(cfg.maxDate-1).prevDay(range[0]).Format("yyyy-MM-dd");
                        tmp[1] = date.prevDay(1).Format("yyyy-MM-dd");
                    }
            		tmp[1] = maxDate<tmp[1]?maxDate:tmp[1];
            		curDate = [tmp[0],tmp[1]];
            		$("#"+dateSeg[0]).val(tmp[0]);
                    $("#"+dateSeg[1]).val(tmp[1]);
                    $('.widgetField input[type!=hidden]',currs[pickerId[0]]).val(tmp[0]);
                    $('.widgetField input[type!=hidden]',currs[pickerId[1]]).val(tmp[1]);
                    
                    if(!inRapid){
                    	pickerBak[0].lastDateSeg = pickerBak[0].finalDateSeg = [$.jClone(tmp[0])];
                    	pickerBak[0].lastField = pickerBak[0].finalField = $('.widgetField input[type!=hidden]',currs[pickerId[0]]).val();
                    	pickerBak[1].lastDateSeg = pickerBak[1].finalDateSeg = [$.jClone(tmp[1])];
                    	pickerBak[1].lastField = pickerBak[1].finalField = $('.widgetField input[type!=hidden]',currs[pickerId[1]]).val();
                    }
                    
                    if(cfg&&cfg.dimension&&cfg.dimension.bEmbed){
                    	$('.widgetCalendar', currs[pickerId[0]]).css({"width": (90+Number(244*calendars))+"px"});
                    	$('.widgetCalendar', currs[pickerId[1]]).css({"width": (90+Number(244*calendars))+"px"});
                    }else{
                    	$('.widgetCalendar', currs[pickerId[0]]).css({"width": (10+Number(244*calendars))+"px"});
                    	$('.widgetCalendar', currs[pickerId[1]]).css({"width": (10+Number(244*calendars))+"px"});
                    }
                    
                    $('.widgetCalendar .Calendar',currs[pickerId[0]]).html("");
                    $('.widgetCalendar .Calendar',currs[pickerId[1]]).html("");
                    
                    for(var i=0;i<2;i++){
                    	O.datepickers[pickerId[i]] = $('.widgetCalendar .Calendar',currs[pickerId[i]]).DatePicker({
                            cfg: cfg,
                            flat: true,
                            format: 'Y-m-d',
                            date: curDate[i],
                            current: date.prevDay(1).Format("yyyy-MM-dd"),
                            minDate:(bSingle||!!range[1])?'2004-06-18':0,
                            maxDate:(bSingle||!!range[1])?fbdDate:0,
                            calendars: calendars,//bMonth?1:2,//bSingle?1:(bRange?2:1),
                            type: type,
                            mode: 'range',
                            view: view,
                            starts: 0,
                            onChange: function(formated) {
                                var date = formated.toString(),dates = date.split(","),options = $(this).data('datepicker');
                                var tmpCfg = options.cfg
                                    ,tmpPickerId = $(this).parents(".widget").attr("id")
                                    ,tmpType = tmpCfg[O.constants.Config.TYPE]
                                    ,tmpPatt = tmpCfg[O.constants.Config.PATTERN]
                                    ,tmpDateSeg = tmpCfg[O.constants.Config.DATESEG]
                                    ,tmpBSingle = (tmpType==O.constants.DatePicker.SINGLE)
                                    ,tmpBRange = (tmpType==O.constants.DatePicker.RANGE)
                                    ,tmpCustomChanges = !!tmpCfg[O.constants.Config.CUSTOMCHANGE]?tmpCfg[O.constants.Config.CUSTOMCHANGE]:[];
                                var startDate = dates[0],endDate = dates[1],month = dates[2],year = dates[3],week = dates[4],tmpDate,tmpStartDate,tmpEndDate;
                                tmpDate = startDate.split("-");
                                tmpStartDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
                                tmpDate = endDate.split("-");
                                tmpEndDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
                                var index = $.inArray(tmpPickerId,tmpCfg[O.constants.Config.ID]);

                                var isYear = (!!year&&year!=""),isWeek = (!!week&&week!=""),isMonth = (!!month&&month!=""),show = (isYear?(year+'\u5e74'):"");
                                if(!isMonth&&!isWeek){
                                    options.date[0] = options.date[1] = options.curSel;
                                }

                                startDate = endDate = (new Date(options.curSel)).Format("yyyy-MM-dd");
                                if(tmpCfg.bFinal){
                                	//O.cache.set(tmpPickerId+"_widthCode",1,"widget");
                                	pickerBak[index].finalDateSeg = [endDate];
                                }else{
                                	//widthSet(1, tmpPickerId);
                                	$('#'+tmpDateSeg[index]).val(endDate);
                                }
                               
                                //show += (isWeek?(((week<10)?("0"+week):week)+'\u5468'):"")||(isMonth?(((month<10)?("0"+month):month)+'\u6708'):"");
                                if((!isWeek&&!isMonth)||!bSimple){
                                    show += ((!isMonth&&!isWeek)?endDate:dates.slice(0,2).join(' \u81F3 '));
                                }
                                if(tmpCfg.bFinal){
                                    pickerBak[index].finalField = show;
                                }else{
                                	$('.widgetField input[type!=hidden]',currs[tmpPickerId]).val(show);
                                }
                                
                                switch(patt){
                                    case 0:   break;
                                    case 1:   
                                    	if(tmpCfg.bFinal){
                                            (isWeek&&(pickerBak[index].finalDateSeg[2] = year+"-"+(week<10?("0"+week):week)))||(isMonth&&(pickerBak[index].finalDateSeg[2] = year+"-"+(month<10?("0"+month):month)));
                                        }else{
                                        	(isWeek&&$('#'+tmpDateSeg[index]).val(year+"-"+(week<10?("0"+week):week)))||(isMonth&&$('#'+tmpDateSeg[index]).val(year+"-"+(month<10?("0"+month):month)));
                                        }
                                        break;
                                    case 2:   
                                    	if(tmpCfg.bFinal){
                                            (isWeek&&(pickerBak[index].finalDateSeg[2] = year+"-99"+(week<10?("0"+week):week)))||(isMonth&&(pickerBak[index].finalDateSeg[2] = year+"-"+(month<10?("0"+month):month)));
                                        }else{
                                        	(isWeek&&$('#'+tmpDateSeg[index]).val(year+"-99"+(week<10?("0"+week):week)))||(isMonth&&$('#'+tmpDateSeg[index]).val(year+"-"+(month<10?("0"+month):month)));
                                        }
                                        break;
                                    default:  break;
                                }
                                O.cache.add(tmpPickerId+"_bak",pickerBak[index],"widget");
                                //custom function of onchange
                                if(!tmpCfg.bFinal){
                                	for(var i in tmpCustomChanges){
                                		if(typeof(tmpCustomChanges[i])=="string"){
                                			eval(tmpCustomChanges[i]+"()");
                                		}else{
                                			tmpCustomChanges[i]();
                                		}
                                	}
                                }

                                //去除快查显示状态
                                if(tmpCfg.Rapid){
                                    if(tmpCfg.rapidSel&&tmpCfg.rapidSel.external){
                                        currs[tmpPickerId].siblings().find("span.radiobox.r-checked").removeClass("r-checked");
                                    }else{
                                        $(".quick-chose",currs[tmpPickerId]).find("a.chosen").removeClass("chosen");
                                    }
                                }
                                
                                //如果结束日期小于开始日期,自动交换
                                /*if((index==0 && endDate > $('#'+tmpDateSeg[1]).val())||(index==1 && $('#'+tmpDateSeg[0]).val() > endDate)){
                                	if(tmpCfg.bFinal){
                                		if(index==0){
                                			pickerBak[1] = O.cache.get(pickerId[1]+"_bak","widget");
                                			pickerBak[0].finalDateSeg = $.jClone(pickerBak[1].finalDateSeg);
                                			pickerBak[0].finalField = $.jClone(pickerBak[1].finalField);
                                			pickerBak[1].finalDateSeg = [endDate];
                                			pickerBak[1].finalField = endDate;
                                		}else{
                                			pickerBak[0] = O.cache.get(pickerId[0]+"_bak","widget");
                                			pickerBak[1].finalDateSeg = $.jClone(pickerBak[0].finalDateSeg);
                                			pickerBak[1].finalField = $.jClone(pickerBak[0].finalField);
                                			pickerBak[0].finalDateSeg = [endDate];
                                			pickerBak[0].finalField = endDate;
                                		}
                                	}else{
                                		if(index==0){
                                			var tempSeg = $('#'+tmpDateSeg[1]).val();
                                			$('.widgetField input[type!=hidden]',currs[tmpCfg[O.constants.Config.ID][0]]).val(tempSeg);
                                			$('#'+tmpDateSeg[0]).val(tempSeg);
                                			$('.widgetField input[type!=hidden]',currs[tmpCfg[O.constants.Config.ID][1]]).val(endDate);
                                			$('#'+tmpDateSeg[1]).val(endDate);
                                		}else{
                                			var tempSeg = $('#'+tmpDateSeg[0]).val();
                                			$('.widgetField input[type!=hidden]',currs[tmpCfg[O.constants.Config.ID][0]]).val(endDate);
                                			$('#'+tmpDateSeg[0]).val(endDate);
                                			$('.widgetField input[type!=hidden]',currs[tmpCfg[O.constants.Config.ID][1]]).val(tempSeg);
                                			$('#'+tmpDateSeg[1]).val(tempSeg);
                                		}
                                	}
                                }*/
                            }
                        });
                    	
                    	//load param
                        if(!!paramCfg&&paramCfg!={}){
                            var paramDate = paramCfg[O.constants.Config.DATE],paramRapid = paramCfg[O.constants.Config.RAPID];
                            if(!paramRapid&&!!paramDate){
                                $('#'+dateSeg[i]).val(paramDate[i]);
                                $('.widgetField input[type!=hidden]',currs[pickerId[i]]).val(paramDate[i]);
                                O.datepickers[pickerId[i]].DatePickerSetDate(paramDate[i]);
                                pickerBak[i].lastDateSeg = [$('#'+dateSeg[i]).val()];
                                pickerBak[i].finalDateSeg = [$('#'+dateSeg[i]).val()];
                                pickerBak[i].lastField = [$('.widgetField input[type!=hidden]',currs[pickerId[i]]).val()];
                                pickerBak[i].finalField = [$('.widgetField input[type!=hidden]',currs[pickerId[i]]).val()];
                            }
                        }
                        O.cache.set(pickerId[i]+"_bak",pickerBak[i],"widget");
                        
                        states[pickerId[i]] = false;
                        $('.widgetField>a,.widgetField input,.widgetCalendar',currs[pickerId[i]]).unbind('mouseover').bind('mouseover', function(e){
                        	var $picker = $(e.target).closest(".widget"),tmpPickerId = $picker.jId();
                        	states[tmpPickerId]?$('.widgetField>a',currs[tmpPickerId]).removeClass("on"):$('.widgetField>a',currs[tmpPickerId]).addClass("on");
                        	currs[tmpPickerId].addClass('widgetField-on');
//                        if((currs[tmpPickerId].offset().left + currs[tmpPickerId].width())>$(".widgetCalendar", currs[tmpPickerId]).width()){
//                            $(".widgetCalendar",currs[tmpPickerId]).addClass("r0");
//                        }else{
//                            $(".widgetCalendar",currs[tmpPickerId]).removeClass("r0");
//                        }
                        	$('.widgetCalendar',currs[tmpPickerId]).stop().animate({height: states[tmpPickerId] ? 0 : $('.widgetCalendar div:first',currs[tmpPickerId]).get(0).offsetHeight}, 100);
                        	states[tmpPickerId] = true;
                        	$('.Calendar td,.calendar th',currs[tmpPickerId]).unbind('click',closeState).bind('click',{pickerId: tmpPickerId},closeState);
                        	if(states[tmpPickerId]) {
                        		$('.c-btn',currs[tmpPickerId]).unbind('click').bind('click',function(){
                        			_wc_hide(tmpPickerId);
                        		});
                        		
                        		$(this).unbind('mouseout').bind('mouseout',function(){
                        			_wc_hide(tmpPickerId);
                        		});
                        	}else {
                        		$(this).unbind('mouseout',_wc_hide);
                        	}
                        	return false;
                        });
              
                        if(cfg.bFinal){
                        	$(".widgetField>a,.widgetField input",currs[pickerId[i]]).unbind("mouseenter").bind("mouseenter",function(e){
                        		for(var j=0;j<2;j++){
                        			var bak = O.cache.get(pickerId[j]+"_bak","widget");
                        			confirmPicker({
                        				id: "widget",
                            			idSeg: [dateSeg[j]],
                            			field: bak.lastField,
                            			dateSeg: bak.lastDateSeg
                        			},pickerId[j]);
                        			bak.finalDateSeg = $.jClone(bak.lastDateSeg);
                            		bak.finalField = bak.lastField;
                        			O.cache.set(pickerId[j]+"_bak",bak,"widget");
                        		}
                        	});
                        	
                        	/**
                             * 拦截页面的onclick，并加入控件click队列
                             * @type {*|jQuery}
                             */
                        	var click = $(".btn:first",currs[pickerId[i]]).attr("onclick");
                        	if(click!=""){
                        		O.cache.set(pickerId[i]+"_click",click,"widget");
                        		$(".btn:first",currs[pickerId[i]]).attr("onclick","");
                        	}else{
                        		click = O.cache.get(pickerId[i]+"_click","widget");
                        	}
                        	
                        	$(".btn:first",currs[pickerId[i]]).unbind("click").bind("click", function(){
                        		for(var j=0;j<2;j++){
                        			var bak = O.cache.get(pickerId[j]+"_bak","widget");
                        			confirmPicker({
                        				id: "widget",
                        				idSeg: [dateSeg[j]],
                        				dateSeg: bak.finalDateSeg,
                        				field: bak.finalField
                        			},pickerId[j]);
                        			bak.lastDateSeg = $.jClone(bak.finalDateSeg);
                        			bak.lastField = bak.finalField;
                        			O.cache.set(pickerId[j]+"_bak",bak,"widget");
                        		}
                            	for(var j in customChanges){
                            		if(typeof(customChanges[j])=="string"){
                            			eval(customChanges[i]+"()");
                            		}else{
                            			customChanges[i]();
                            		}
                            	}
                        	}).bind("click",function(){
                        		//eval(click);
                        		var click = new Function('return ' + click.replace('()', ''))();  click();
                        	});
                        }
                    }
                    
                    //点查询按钮时候如果起始时间大于结束时间则交换
                    var queryClick = $(".btn.query",currs[pickerId[0]].siblings(".queryBtn")).attr("onclick");
                    if(queryClick!=""){
                    	$(".btn.query",currs[pickerId[0]].siblings(".queryBtn")).attr("onclick","");
                	}
                    $(".btn.query",currs[pickerId[0]].siblings(".queryBtn")).unbind("click").bind("click", function(){
                    	if($("#"+dateSeg[0]).val()>$("#"+dateSeg[1]).val()){
                    		O.datepickers[pickerId[0]].DatePickerSetDate($("#"+dateSeg[1]).val());
                    		O.datepickers[pickerId[1]].DatePickerSetDate($("#"+dateSeg[0]).val());
                    		pickerBak[0] = O.cache.get(pickerId[0]+"_bak","widget");
                    		pickerBak[1] = O.cache.get(pickerId[1]+"_bak","widget");
                    		var tempBak = $.jClone(pickerBak[0]);
                    		pickerBak[0] = $.jClone(pickerBak[1]);
                    		pickerBak[1] = tempBak;
                    		
                    		O.cache.set(pickerId[0]+"_bak",pickerBak[0],"widget");
                    		O.cache.set(pickerId[1]+"_bak",pickerBak[1],"widget");
                    		
                    		var tempSeg = $("#"+dateSeg[0]).val();
                			$('.widgetField input[type!=hidden]',currs[pickerId[0]]).val($("#"+dateSeg[1]).val());
                			$('#'+dateSeg[0]).val($("#"+dateSeg[1]).val());
                			$('.widgetField input[type!=hidden]',currs[pickerId[1]]).val(tempSeg);
                			$('#'+dateSeg[1]).val(tempSeg);
                    	}
                    	//手动选择日期校验快查状态
            			if(cfg.RapidType == "QuickRapid"){
            				var yesterdayStr = getDateStr(-1*cfg.maxDate);
                    		yesterdayStr = yesterdayStr.replace(/-/g, "");
                    		var dateCheck = new Date();
                    		
                        	if(parseInt($("#"+dateSeg[1]).val().replace(/-/g, "")) >= parseInt(yesterdayStr)){
                        		$("a[desc='后一天']").hide();
                            	$("span[desc='后一天_']").show();
                        	}else{
                        		$("a[desc='后一天']").show();
                            	$("span[desc='后一天_']").hide();
                        	}
                        	if( parseInt($("#"+dateSeg[1]).val().replace(/-/g, "")) >= parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                            	$("a[desc='下一周']").hide();
                            	$("span[desc='下一周_']").show();
                            }else{
                            	$("a[desc='下一周']").show();
                            	$("span[desc='下一周_']").hide();
                            }
                            if( parseInt($("#"+dateSeg[1]).val().replace(/-/g, "")) >= parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                            	$("a[desc='下一月']").hide();
                            	$("span[desc='下一月_']").show();
                            }else{
                            	$("a[desc='下一月']").show();
                            	$("span[desc='下一月_']").hide();
                            }
                            
                            if(multiRapid7Day == 0){
                            	$("a[desc='近7天']").show();
                            	$("span[desc='近7天_']").hide();
                            }else{
                            	multiRapid7Day = 0;
                            }
                            if(multiRapid30Day == 0){
                            	$("a[desc='近30天']").show();
                            	$("span[desc='近30天_']").hide();
                            }else{
                            	multiRapid30Day = 0;
                            }
            			}
                   }).bind("click",function(){
                    	eval(queryClick);
                    });
                        
                    var rapid = cfg[O.constants.Config.RAPID];
                    if(rapid!=undefined){
                    	if(($.jIsArray(rapid)&&rapid[0])||(!$.jIsArray(rapid)&&rapid)||false){
                    		O.initMultiRapid(widthSet, cfg, currs[pickerId[0]]);
                    	}
                    }
                  //custom function of onchange
                    for(var i in customChanges){
                    	customChanges[i]();
                    }
                    
                }else{
                	pickerId = cfg[O.constants.Config.ID];
                    currs[pickerId] = $("#"+pickerId);
                    var paramCfg = cfg[O.constants.Config.PARAM]
                        ,type = cfg[O.constants.Config.TYPE]
                        ,style = cfg[O.constants.Config.STYLE],bSimple = (!!style&&style==O.constants.DatePicker.SIMPLE)
                        ,patt = cfg[O.constants.Config.PATTERN]
                        ,range = !!cfg[O.constants.Config.RANGE]?cfg[O.constants.Config.RANGE]:[]
                        ,view = cfg[O.constants.Config.VIEW],bMonth = (view==O.constants.DatePicker.VMONTH),bWeek = (view==O.constants.DatePicker.VWEEK)
                        ,dateSeg = cfg[O.constants.Config.DATESEG]
                        ,bSingle = (type==O.constants.DatePicker.SINGLE)
                        ,bRange = (type==O.constants.DatePicker.RANGE)
                        ,bSeparate = !!cfg[O.constants.DatePicker.BSEPARATE]
                        ,maxDate = !!cfg.maxDate?(new Date()).prevDay(cfg.maxDate).Format("yyyy-MM-dd"):(new Date()).prevDay().Format("yyyy-MM-dd")
                        ,fbdDate = !!cfg.maxDate?(new Date()).prevDay(Number(cfg.maxDate)-1).Format("yyyy-MM-dd"):(new Date()).Format("yyyy-MM-dd")
                        ,calendars = !!cfg[O.constants.Config.CALENDARS]?cfg[O.constants.Config.CALENDARS]:2
                        ,pickerBak = O.cache.get(pickerId+"_bak","widget")||{finalDateSeg: [],lastDateSeg: [],finalField: "",lastField: ""}
                        ,inRapid = !!$(".radiobox.r-checked",currs[pickerId].next(".rapidSel")).length
                        ,customChanges = !!cfg[O.constants.Config.CUSTOMCHANGE]?cfg[O.constants.Config.CUSTOMCHANGE]:[];
                        
                	if(bSingle){
                    	var tmpField,tmpSeg;
                        if(bMonth){
                        	//为应对双十一期间,改成设置显示延迟时间,当延迟天数大于日数（延迟3天，当前为周二）,可能会造成当前月不能选,但会有跨年周的问题,仅对于有周月维度的日期控件
                            date = date.prevDay(cfg.maxDate);
                        	
                        	!inRapid?widthSet(4, pickerId):widthSet(3, pickerId);
                            tmp[0] = date.Format("yyyy-MM");
                            if(!!range&&!$.jIsArray(range)){
                                tmp[0] = range;
                            }
                            tmpSeg = [tmp[0]];
                            $("#"+dateSeg[0]).val(tmp[0]);
                            var yy = parseInt(tmp[0].slice(0,4)),m = tmp[0].slice(5),mm = parseInt(m.slice(0,1)=="0"?m.slice(1):m.slice(0));
                            tmp[1] = new Date(yy, mm-1, 1).curMonth(cfg.maxDate);
                            curDate = tmp[1];
                            tmpField = yy+'\u5e74'+m+'\u6708'+(bSimple?"":(" "+tmp[1].join(' \u81F3 ')));
                            $('.widgetField input[type!=hidden]',currs[pickerId]).val(tmpField);
                        }else if(bWeek){
                        	if(!inRapid){
                        		widthSet(4, pickerId);
                            }else{
                                var finalDateSeg = O.cache.get(pickerId+"_bak","widget").finalDateSeg;
                                if(finalDateSeg[0]==finalDateSeg[1]){
                                	widthSet(5, pickerId);
                                }else{
                                	widthSet(3, pickerId);
                                }
                            }
                            var yy = date.getFullYear(),ww = date.getWeekNumber(),w = "";
                            var today = getDateStr(0);
                            if (today == "2016-01-01" || today == "2016-01-02" || today == "2016-01-03") {
                            	yy = "2015";
                            }
                            //为应对双十一期间,改成设置显示延迟时间,当延迟天数大于日数（延迟3天，当前为周二）,可能会造成当前周不能选,但会有跨年周的问题,仅对于有周月维度的日期控件
                            /*var tmp_weekDay = date.getDay();
                            if(tmp_weekDay<=cfg.maxDate){
                            	ww = ww-1;
                            	if(ww == 0){
                            		ww=52;
                            		yy = yy-1;
                            	}
                            }*///end
                            switch(patt){
                                case 0:
                                case 1: tmp[0] = yy+"-"+(ww<10?("0"+ww):ww);
                                    break;
                                case 2: tmp[0] = yy+"-99"+(ww<10?("0"+ww):ww);
                                    break;
                                default:
                                    tmp[0] = yy+"-"+(ww<10?("0"+ww):ww);
                                    break;
                            }
                            if(range&&!$.jIsArray(range)){
                                tmp[0] = range;
                                yy = parseInt(tmp[0].split("-")[0]);
                                w = tmp[0].split("-")[1],ww = parseInt(w.slice(0,1)=="0"?w.slice(1,2):w);
                            }
                            $("#"+dateSeg[0]).val(tmp[0]);
                            if(yy == 2016){
                            	tmp[1] = $.jDateByWeek(yy,ww+1).curWeek(cfg.maxDate);
                            } else {
                            	tmp[1] = $.jDateByWeek(yy,ww).curWeek(cfg.maxDate);
                            }
                            curDate = $.jClone(tmp[1]);
                            tmpSeg = $.jClone(tmp[1]);
                            tmpSeg[2] = tmp[0];
                            tmpField = yy+'\u5e74'+(ww<10?("0"+ww):ww)+'\u5468'+(bSimple?"":(" "+tmp[1].join(' \u81F3 ')));
                            $('.widgetField input[type!=hidden]',currs[pickerId]).val(tmpField);
                        }else{
                        	if(!inRapid){
                        		widthSet(1, pickerId);
                            }else{
                                var finalDateSeg = O.cache.get(pickerId+"_bak","widget").finalDateSeg;
                                if(finalDateSeg[0]==finalDateSeg[1]){
                                	widthSet(5, pickerId);
                                }else{
                                	widthSet(3, pickerId);
                                }
                            }
                        	//为应对双十一期间,改成设置显示延迟时间,当延迟天数大于日数（延迟3天，当前为周二）,可能会造成当前月不能选,但会有跨年周的问题,仅对于有周月维度的日期控件
                            date = date.prevDay(cfg.maxDate);
                            //tmp[0] = date.prevDay(1).Format("yyyy-MM-dd");
                            tmp[0] = date.Format("yyyy-MM-dd");
                            if(!!range&&!$.jIsArray(range)){
                                tmp[0] = range;
                            }
                            $("#"+dateSeg[0]).val(tmp[0]);
                            tmp[0] = maxDate<tmp[0]?maxDate:tmp[0];
                            tmpSeg = [tmp[0]];
                            tmp[1] = [tmp[0],tmp[0]];
                            curDate = tmpField = tmp[0];
                            $('.widgetField input[type!=hidden]',currs[pickerId]).val(tmpField);
                        }
                        if(!inRapid){
                            pickerBak.lastDateSeg = $.jClone(tmpSeg);
                            pickerBak.finalDateSeg = $.jClone(tmpSeg);
                            pickerBak.lastField = pickerBak.finalField = tmpField;
                        }
                    }else if(bRange){
                        if(bMonth){
                            widthSet(4, pickerId);
                            tmp[0] = date.Format("yyyy-MM");
                            if(!!range&&!$.jIsArray(range)){
                                tmp[0] = range;
                            }
                            $("#"+dateSeg[0]).val(tmp[0]);
                            var yy = parseInt(tmp[0].slice(0,4)),m = tmp[0].slice(5),mm = parseInt(m.slice(0,1)=="0"?m.slice(1):m.slice(0));
                            tmp[1] = new Date(yy, mm-1, 1).curMonth(cfg.maxDate);
                            curDate = tmp[1];
                            $('.widgetField input[type!=hidden]',currs[pickerId]).val(yy+'\u5e74'+m+'\u6708'+(bSimple?"":(" "+tmp[1].join(' \u81F3 '))));
                        }else if(bWeek){
                            widthSet(4, pickerId);
                            var yy = date.getFullYear(),ww = date.getWeekNumber(),w = "";
                            var today = getDateStr(0);
                            if (today == "2016-01-01" || today == "2016-01-02" || today == "2016-01-03") {
                            	yy = "2015";
                            }
                            tmp[0] = yy+"-"+(ww<10?("0"+ww):ww);
                            if(!!range&&!$.jIsArray(range)){
                                tmp[0] = range;
                                yy = parseInt(tmp[0].split("-")[0]);
                                w = tmp[0].split("-")[1],ww = parseInt(w.slice(0,1)=="0"?w.slice(1,2):w);
                            }
                            $("#"+dateSeg[0]).val(tmp[0]);
                            tmp[1] = $.jDateByWeek(yy,ww).curWeek(cfg.maxDate);
                            curDate = tmp[1];
                            $('.widgetField input[type!=hidden]',currs[pickerId]).val(yy+'\u5e74'+(ww<10?("0"+ww):ww)+'\u5468'+(bSimple?"":(" "+tmp[1].join(' \u81F3 '))));
                        }else{
                            widthSet(2, pickerId);
                            if(!!range[0]&&$.jIsArray(range[0])){
                                tmp[0] = date.prevDay(range[0][0]).Format("yyyy-MM-dd");
                                tmp[1] = date.prevDay(range[0][1]).Format("yyyy-MM-dd");
                            }else{
                                tmp[0] = date.prevDay(range[0]).Format("yyyy-MM-dd");
                                tmp[1] = date.prevDay(1).Format("yyyy-MM-dd");
                            }
                            tmp[1] = maxDate<tmp[1]?maxDate:tmp[1];
                            curDate = [tmp[0],tmp[1]];
                            $("#"+dateSeg[0]).val(tmp[0]);
                            $("#"+dateSeg[1]).val(tmp[1]);
                            $('.widgetField input[type!=hidden]',currs[pickerId]).val(tmp[0]+' \u81F3 '+tmp[1]);
                        }
                        if(!inRapid){
                            pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $("#"+dateSeg[0]).val();
                            pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = $("#"+dateSeg[1]).val();
                            pickerBak.lastField = pickerBak.finalField = $('.widgetField input[type!=hidden]',currs[pickerId]).val();
                        }
                    }else{
                        //TODO
                    }
                    //控件宽度=日历数*244px
                    if(cfg&&cfg.dimension&&cfg.dimension.bEmbed){
                        $('.widgetCalendar', currs[pickerId]).css({"width": (90+Number(244*calendars))+"px"});
                    }else{
                        $('.widgetCalendar', currs[pickerId]).css({"width": (10+Number(244*calendars))+"px"});
                    }
                    $('.widgetCalendar .Calendar',currs[pickerId]).html("");
                    O.datepickers[pickerId] = $('.widgetCalendar .Calendar',currs[pickerId]).DatePicker({
                        cfg: cfg,
                        flat: true,
                        format: 'Y-m-d',
                        date: curDate,
                        current: date.prevDay(1).Format("yyyy-MM-dd"),
                        minDate:(bSingle||!!range[1])?'2004-06-18':0,
                        maxDate:(bSingle||!!range[1])?fbdDate:0,
                        calendars: calendars,//bMonth?1:2,//bSingle?1:(bRange?2:1),
                        type: type,
                        mode: 'range',
                        view: view,
                        starts: 0,
//    					onBeforeShow: function(){
//    						$('.inputDate').DatePickerSetDate($('.inputDate').val(), true);
//    					},
                        onChange: function(formated) {
                            var date = formated.toString(),dates = date.split(","),options = $(this).data('datepicker');
                            var tmpCfg = options.cfg
                                ,tmpPickerId = tmpCfg[O.constants.Config.ID]
                                ,tmpType = tmpCfg[O.constants.Config.TYPE]
                                ,tmpPatt = tmpCfg[O.constants.Config.PATTERN]
                                ,tmpDateSeg = tmpCfg[O.constants.Config.DATESEG]
                                ,tmpBSingle = (tmpType==O.constants.DatePicker.SINGLE)
                                ,tmpBRange = (tmpType==O.constants.DatePicker.RANGE)
                                ,tmpCustomChanges = !!tmpCfg[O.constants.Config.CUSTOMCHANGE]?tmpCfg[O.constants.Config.CUSTOMCHANGE]:[];
                            var startDate = dates[0],endDate = dates[1],month = dates[2],year = dates[3],week = dates[4],tmpDate,tmpStartDate,tmpEndDate;
                            tmpDate = startDate.split("-");
                            tmpStartDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
                            tmpDate = endDate.split("-");
                            tmpEndDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
                            
                            if(startDate == "2015-12-28") {
                            	year = 2015;
                            }

                            var isYear = (!!year&&year!=""),isWeek = (!!week&&week!=""),isMonth = (!!month&&month!=""),show = (isYear?(year+'\u5e74'):"");
                            if(tmpBSingle&&!isMonth&&!isWeek){
                                options.date[0] = options.date[1] = options.curSel;
                            }

                            if(tmpBSingle){
                            	if(isWeek||isMonth){
                                    if(tmpCfg.bFinal){
                                        O.cache.set(tmpPickerId+"_widthCode",1,"widget");
                                        pickerBak.finalDateSeg[0] = (new Date(options.date[0])).Format("yyyy-MM-dd");
                                        pickerBak.finalDateSeg[1] = (new Date(options.date[1])).Format("yyyy-MM-dd");
                                    }else{
                                    	widthSet(1, tmpPickerId);
                                        $('#'+tmpDateSeg[0]).val(endDate);
                                    }
                                }else{
                                    startDate = endDate = (new Date(options.curSel)).Format("yyyy-MM-dd");
                                    if(tmpCfg.bFinal){
                                        O.cache.set(tmpPickerId+"_widthCode",1,"widget");
                                        pickerBak.finalDateSeg = [endDate,endDate,endDate];
                                    }else{
                                    	widthSet(1, tmpPickerId);
                                        $('#'+tmpDateSeg[0]).val(endDate);
                                    }
                                }
                            }else if(tmpBRange){
                            	if(tmpCfg.bFinal){
                                    O.cache.set(tmpPickerId+"_widthCode",2,"widget");
                                    pickerBak.finalDateSeg[0] = startDate;
                                    pickerBak.finalDateSeg[1] = endDate;
                                }else{
    	                            widthSet(2, tmpPickerId);
    	                            $('#'+tmpDateSeg[0]).val(startDate);
    	                            $('#'+tmpDateSeg[1]).val(endDate);
                                }
                            }else{
                                //TODO
                            }
                            //非按月模式下设置天数上限
                            if(!tmpBSingle&&!isMonth){
                                if(!!range[1]){
                                    if(tmpStartDate.DateDiff('d', tmpEndDate)>range[1]){
                                        $('.message.warn',currs[tmpPickerId]).html("请将查询区间设置在"+range[1]+"天之内");
                                        options.date[0] = tmpStart;
                                        options.date[1] = tmpEnd;
                                        options.lastSel = !options.lastSel;
                                        return;
                                    }else{
                                        options.firstSel = options.selVal;
                                        $('.message.warn',currs[tmpPickerId]).html("");
                                    }
                                }
                            }

                            if(isWeek||isMonth){
                            	if(tmpCfg.bFinal){
                                    O.cache.set(tmpPickerId+"_widthCode",4,"widget");
                                }else{
                                	widthSet(4, tmpPickerId);
                                }
                            }
                            show += (isWeek?(((week<10)?("0"+week):week)+'\u5468'):"")||(isMonth?(((month<10)?("0"+month):month)+'\u6708'):"");
                            if((!isWeek&&!isMonth)||!bSimple){
                                show += " "+((bSingle&&!isMonth&&!isWeek)?endDate:dates.slice(0,2).join(' \u81F3 '));
                            }
                            if(tmpCfg.bFinal){
                                pickerBak.finalField = show;
                            }else{
                            	$('.widgetField input[type!=hidden]',currs[tmpPickerId]).val(show);
                            }
                            
                            switch(patt){
                                case 0:   break;
                                case 1:   
                                	if(tmpCfg.bFinal){
                                        (isWeek&&(pickerBak.finalDateSeg[2] = year+"-"+(week<10?("0"+week):week)))||(isMonth&&(pickerBak.finalDateSeg[2] = year+"-"+(month<10?("0"+month):month)));
                                    }else{
                                    	(isWeek&&$('#'+tmpDateSeg[0]).val(year+"-"+(week<10?("0"+week):week)))||(isMonth&&$('#'+tmpDateSeg[0]).val(year+"-"+(month<10?("0"+month):month)));
                                    }
                                    break;
                                case 2:   
                                	if(tmpCfg.bFinal){
                                        (isWeek&&(pickerBak.finalDateSeg[2] = year+"-99"+(week<10?("0"+week):week)))||(isMonth&&(pickerBak.finalDateSeg[2] = year+"-"+(month<10?("0"+month):month)));
                                    }else{
                                    	(isWeek&&$('#'+tmpDateSeg[0]).val(year+"-99"+(week<10?("0"+week):week)))||(isMonth&&$('#'+tmpDateSeg[0]).val(year+"-"+(month<10?("0"+month):month)));
                                    }
                                    break;
                                default:  break;
                            }
                            O.cache.add(tmpPickerId+"_bak",pickerBak,"widget");
                            //custom function of onchange
                            for(var i in tmpCustomChanges){
                                if(typeof(tmpCustomChanges[i])=="string"){
                                    eval(tmpCustomChanges[i]+"()");
                                }else{
                                    tmpCustomChanges[i]();
                                }
                            }

                            //去除快查显示状态
                            if(tmpCfg.Rapid){
                                if(tmpCfg.rapidSel&&tmpCfg.rapidSel.external){
                                    currs[tmpPickerId].siblings().find("span.radiobox.r-checked").removeClass("r-checked");
                                }else{
                                    $(".quick-chose",currs[tmpPickerId]).find("a.chosen").removeClass("chosen");
                                }
                            }
                        }
                    });
                    //load param
                    if(!!paramCfg&&paramCfg!={}){
                        var paramDate = paramCfg[O.constants.Config.DATE],paramRapid = paramCfg[O.constants.Config.RAPID];
                        if(!paramRapid&&!!paramDate){
                            if($.jIsArray(paramDate)){
                                widthSet(2, pickerId);
                                $('#'+dateSeg[0]).val(paramDate[0]);
                                $('#'+dateSeg[1]).val(paramDate[1]);
                                $('.widgetField input[type!=hidden]',currs[pickerId]).val(paramDate[0]+' \u81F3 '+paramDate[1]);
                                O.datepickers[pickerId].DatePickerSetDate(paramDate);
                                pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $('#'+dateSeg[0]).val();
                                pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = $('#'+dateSeg[1]).val();
                                pickerBak.lastField = pickerBak.finalField = $('.widgetField input[type!=hidden]',currs[pickerId]).val();
                            }else{
                            	if(paramDate=="7"){//传近七天 7
                            		widthSet(4, pickerId);
                            		$('#'+dateSeg[0]).val(paramDate);
                            		var date = new Date();
                            		fDay = date.prevDay7()[0];
                            		lDay = date.prevDay7()[1];
                            		pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = fDay;
                                    pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = lDay;
                                    pickerBak.lastDateSeg[2] = pickerBak.finalDateSeg[2] = $('#'+dateSeg[0]).val();
                                    $('.widgetField input[type!=hidden]',currs[pickerId]).val(O.constants.DatePicker.PREV7+" "+fDay+' \u81F3 '+lDay);
                                    O.datepickers[pickerId].DatePickerSetDate([fDay, lDay]);
                            	}
                                //传日
                            	else if(paramDate.length==10){
                                    widthSet(1, pickerId);
                                    $('#'+dateSeg[0]).val(paramDate);
                                    $('.widgetField input[type!=hidden]',currs[pickerId]).val(paramDate);
                                    O.datepickers[pickerId].DatePickerSetDate(paramDate);
                                    pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $('#'+dateSeg[0]).val();
                                }
                                //传周
                                else if((paramDate.length==9||paramDate.length==8)&&paramDate.indexOf("99")>=0){
                                    widthSet(4, pickerId);
                                    var y=parseInt(paramDate.slice(0,4)),ww=paramDate.slice(paramDate.indexOf("99")).replace("99",""),w=parseInt(ww.indexOf("0")==0?ww.replace("0",""):ww);
                                    var tmpParamDate = $.jGetWeekByNum(w, y),fDay=tmpParamDate[0],lDay=tmpParamDate[1];
                                    if(bSingle){
                                        $('#'+dateSeg[0]).val(paramDate);
                                        pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = fDay;
                                        pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = lDay;
                                        pickerBak.lastDateSeg[2] = pickerBak.finalDateSeg[2] = $('#'+dateSeg[0]).val();
                                    }else if(bRange){
                                        $('#'+dateSeg[0]).val(fDay);
                                        $('#'+dateSeg[1]).val(lDay);
                                        pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $('#'+dateSeg[0]).val();
                                        pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = $('#'+dateSeg[1]).val();
                                    }
                                    $('.widgetField input[type!=hidden]',currs[pickerId]).val(y+'\u5e74'+ww+'\u5468'+" "+fDay+' \u81F3 '+lDay);
                                    O.datepickers[pickerId].DatePickerSetDate([fDay, lDay]);
                                }
                                //传月
                                else{
                                    widthSet(4, pickerId);
                                    var y=parseInt(paramDate.slice(0,4)),m=parseInt(paramDate.slice(5,7).indexOf("0")>=0?paramDate.slice(6,7):paramDate.slice(5,7)),d=1;
                                    var tmpParamDate = new Date(y,m-1,d),fDay=tmpParamDate.firstDayOfMonth().Format("yyyy-MM-dd"),lDay=tmpParamDate.lastDayOfMonth().Format("yyyy-MM-dd");
                                    if(bSingle){
                                        $('#'+dateSeg[0]).val(paramDate);
                                        pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = fDay;
                                        pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = lDay;
                                        pickerBak.lastDateSeg[2] = pickerBak.finalDateSeg[2] = $('#'+dateSeg[0]).val();
                                    }else if(bRange){
                                        $('#'+dateSeg[0]).val(fDay);
                                        $('#'+dateSeg[1]).val(lDay);
                                        pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $('#'+dateSeg[0]).val();
                                        pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = $('#'+dateSeg[1]).val();
                                    }
                                    $('.widgetField input[type!=hidden]',currs[pickerId]).val(tmpParamDate.getFullYear()+'\u5e74'+paramDate.slice(5,7)+'\u6708'+" "+fDay+' \u81F3 '+lDay);
                                    O.datepickers[pickerId].DatePickerSetDate([tmpParamDate.firstDayOfMonth().Format("yyyy-MM-dd"), tmpParamDate.lastDayOfMonth().Format("yyyy-MM-dd")]);
                                }
                                pickerBak.lastField = pickerBak.finalField = $('.widgetField input[type!=hidden]',currs[pickerId]).val();
                            }
                        }
                    }
                    O.cache.set(pickerId+"_bak",pickerBak,"widget");
                    
                    var confirmPicker = function(_valSet,_pickerId){
                    	if(_valSet.dateSeg.length<3){
                    		for(var i in _valSet.dateSeg){
                    			$('#'+_valSet.idSeg[i]).val(_valSet.dateSeg[i]);
                    		}
                    	}else{
                    		$('#'+_valSet.idSeg[0]).val(_valSet.dateSeg[2]);
                    	}
                    	$('.widgetField input[type!=hidden]',currs[_pickerId]).val(_valSet.field);
                    	O.datepickers[_pickerId].DatePickerSetDate(_valSet.dateSeg.length>1?[_valSet.dateSeg[0],_valSet.dateSeg[1]]:_valSet.dateSeg[0]);
                    };
                    var _wc_hide=function(_pickerId){
                    	$('.widgetCalendar',currs[_pickerId]).stop().animate({height:0}, 100,function(){
                    		currs[_pickerId].removeClass('widgetField-on');
                    	});
                    	states[_pickerId] = false;
                    	$('.widgetField>a',currs[_pickerId]).removeClass("on")
                    },closeState = function(e){
                    	states[e.data.pickerId] = false;
                    };
                    
                    states[pickerId] = false;
                    $('.widgetField>a,.widgetField input,.widgetCalendar',currs[pickerId]).unbind('mouseover').bind('mouseover', function(e){
                    	var $picker = $(e.target).closest(".widget"),tmpPickerId = $picker.jId();
                    	states[tmpPickerId]?$('.widgetField>a',currs[tmpPickerId]).removeClass("on"):$('.widgetField>a',currs[tmpPickerId]).addClass("on");
                    	currs[tmpPickerId].addClass('widgetField-on');
//                    if((currs[tmpPickerId].offset().left + currs[tmpPickerId].width())>$(".widgetCalendar", currs[tmpPickerId]).width()){
//                        $(".widgetCalendar",currs[tmpPickerId]).addClass("r0");
//                    }else{
//                        $(".widgetCalendar",currs[tmpPickerId]).removeClass("r0");
//                    }
                    	$('.widgetCalendar',currs[tmpPickerId]).stop().animate({height: states[tmpPickerId] ? 0 : $('.widgetCalendar div:first',currs[tmpPickerId]).get(0).offsetHeight}, 100);
                    	states[tmpPickerId] = true;
                    	$('.Calendar td,.calendar th',currs[tmpPickerId]).unbind('click',closeState).bind('click',{pickerId: tmpPickerId},closeState);
                    	if(states[tmpPickerId]) {
                    		$('.c-btn',currs[tmpPickerId]).unbind('click').bind('click',function(){
                    			_wc_hide(tmpPickerId);
                    		});
                    		
                    		$(this).unbind('mouseout').bind('mouseout',function(){
                    			_wc_hide(tmpPickerId);
                    		});
                    	}else {
                    		$(this).unbind('mouseout',_wc_hide);
                    	}
                    	return false;
                    });
                    
                    if(cfg.bFinal){
                    	$(".widgetField>a,.widgetField input",currs[pickerId]).unbind("mouseenter").bind("mouseenter",function(e){
                    		var bak = O.cache.get(pickerId+"_bak","widget");
                    		confirmPicker({
                    			id: "widget",
                    			idSeg: dateSeg,
                    			field: bak.lastField,
                    			dateSeg: bak.lastDateSeg
                    		},pickerId);
                    		bak.finalDateSeg = $.jClone(bak.lastDateSeg);
                    		bak.finalField = bak.lastField;
                    		O.cache.set(pickerId+"_bak",bak,"widget");
                    	});
                    }
                    
                    var rapid = cfg[O.constants.Config.RAPID];
                    if(rapid!=undefined){
                    	if(($.jIsArray(rapid)&&rapid[0])||(!$.jIsArray(rapid)&&rapid)||false){
                    		O.initMultiRapid(widthSet, cfg, currs[pickerId]);
                    	}
                    }
                    //custom function of onchange
                    for(var i in customChanges){
                    	customChanges[i]();
                    }
                    
                    /**
                     * 拦截页面的onclick，并加入控件click队列
                     * @type {*|jQuery}
                     */
                    if(cfg.bFinal){
                    	var click = $(".btn:first",currs[pickerId]).attr("onclick");
                    	if(click!=""){
                    		O.cache.set(pickerId+"_click",click,"widget");
                    		$(".btn:first",currs[pickerId]).attr("onclick","");
                    	}else{
                    		click = O.cache.get(pickerId+"_click","widget");
                    	}
                    	
                    	$(".btn:first",currs[pickerId]).unbind("click").bind("click", function(){
                    		var bak = O.cache.get(pickerId+"_bak","widget");
                    		confirmPicker({
                    			id: "widget",
                    			idSeg: dateSeg,
                    			dateSeg: bak.finalDateSeg,
                    			field: bak.finalField
                    		},pickerId);
                    		bak.lastDateSeg = $.jClone(bak.finalDateSeg);
                    		bak.lastField = bak.finalField;
                    		inRapid = !!$(".radiobox.r-checked",$("#"+pickerId).next(".rapidSel")).length;
                    		if(!inRapid&&O.cache.get(pickerId+"_widthCode","widget")){
                    			widthSet(O.cache.get(pickerId+"_widthCode","widget"),pickerId);
                    			O.cache.set(pickerId+"_widthCode",null,"widget");
                    		}
                    		O.cache.set(pickerId+"_bak",bak,"widget");
                    	}).bind("click",function(){
                    		eval(click);
                    	});
                    }
                }
                
                
                
            }
        }
    },
    soloDatePicker: function(_cfg){
        var O = this,cfg = _cfg,date = new Date(),tmp=[],curDate,lastDate,revertInput,revertDates = [];
        if(!!cfg&&cfg[O.constants.Config.ENABLE]){
            if(!!cfg.maxDate&&cfg.maxDate>=2){
                //TODO
            }else{
                if(date.getHours()<8){
                    cfg.maxDate = 2;
                }else{
                    if(!!O.cache.get(O.constants.Cache.LASTDATE)){
                        cfg.maxDate = Number(date.Format("yyyyMMdd"))-Number(O.cache.get(O.constants.Cache.LASTDATE).replace(/-/g,""));
                    }
                }
            }
            var paramCfg = cfg[O.constants.Config.PARAM]
                ,type = cfg[O.constants.Config.TYPE]
                ,style = cfg[O.constants.Config.STYLE],bSimple = (!!style&&style==O.constants.DatePicker.SIMPLE)
                ,patt = cfg[O.constants.Config.PATTERN]
                ,range = !!cfg[O.constants.Config.RANGE]?cfg[O.constants.Config.RANGE]:[]
                ,view = cfg[O.constants.Config.VIEW],bMonth = (view==O.constants.DatePicker.VMONTH),bWeek = ((view==O.constants.DatePicker.VWEEK))
                ,dateSeg = cfg[O.constants.Config.DATESEG]
                ,bSingle = (type==O.constants.DatePicker.SINGLE)
                ,bRange = (type==O.constants.DatePicker.RANGE)
                ,maxDate = !!cfg.maxDate?(new Date()).prevDay(cfg.maxDate).Format("yyyy-MM-dd"):(new Date()).prevDay().Format("yyyy-MM-dd")
                ,fbdDate = !!cfg.maxDate?(new Date()).prevDay(Number(cfg.maxDate)-1).Format("yyyy-MM-dd"):(new Date()).Format("yyyy-MM-dd")
                ,calendars = !!cfg[O.constants.Config.CALENDARS]?cfg[O.constants.Config.CALENDARS]: 2
                ,customChanges = !!cfg[O.constants.Config.CUSTOMCHANGE]?cfg[O.constants.Config.CUSTOMCHANGE]:[]
                ,pickerBak = O.cache.get("bak","widget")||{finalDateSeg: [],lastDateSeg: [],finalField: "",lastField: ""}
                ,inRapid = !!$(".radiobox.r-checked",$("#widget").next(".rapidSel")).length;
                if(cfg.RapidType == "QuickRapid"){
                	inRapid = !!$(".rapid-a.r-checked",$("#widget").next(".rapidSel")).length;
                }
            /**
             * setting show width
             * param _model 1-170,125; 2-285,240; 3-385,340:
             */
            var widthSet = function(_model){
                _model = bSimple?1:_model;
                switch(_model){
                    case 1:  $('#widgetField').css({"width": "170px"});
                        $('#widgetField input').css({"width": "125px"});
                        break;
                    case 2:  $('#widgetField').css({"width": "285px"});
                        $('#widgetField input').css({"width": "240px"});
                        break;
                    case 3:  $('#widgetField').css({"width": "340px"});
                        $('#widgetField input').css({"width": "295px"});
                        break;
                    case 4:  $('#widgetField').css({"width": "385px"});
                        $('#widgetField input').css({"width": "340px"});
                        break;
                    case 5:  $('#widgetField').css({"width": "197px"});
                        $('#widgetField input').css({"width": "150px"});
                        break;
                    default: break;
                }
            };
            if(bSingle){
                var tmpField,tmpSeg;
                if(bMonth){
                    !inRapid?widthSet(4):widthSet(3);
                    
                    //为应对双十一期间,改成设置显示延迟时间,当延迟天数大于日数（延迟3天，当前为周二）,可能会造成当前月不能选,但会有跨年周的问题,仅对于有周月维度的日期控件
                    date = date.prevDay(cfg.maxDate);
                    
                    tmp[0] = date.Format("yyyy-MM");
                    tmpSeg = [tmp[0]];
                    $("#"+dateSeg[0]).val(tmp[0]);
                    curDate = date.curMonth(cfg.maxDate);
                    tmpField = tmp[0].slice(0,4)+'\u5e74'+tmp[0].slice(5)+'\u6708'+" "+date.curMonth(cfg.maxDate).join(' \u81F3 ');
                    $('#widgetField input[type!=hidden]').val(tmpField);
                }else if(bWeek){
                    if(!inRapid){
                        widthSet(4);
                    }else{
                        var finalDateSeg = O.cache.get("bak","widget").finalDateSeg;
                        if(finalDateSeg[0]==finalDateSeg[1]){
                            widthSet(5);
                        }else{
                            widthSet(3);
                        }
                    }
                    var yy = date.getFullYear(),ww = date.getWeekNumber(),w = "";
                    var today = getDateStr(0);
                    if (today == "2016-01-01" || today == "2016-01-02" || today == "2016-01-03") {
                    	yy = "2015";
                    }
                    //为应对双十一期间,改成设置显示延迟时间,当延迟天数大于日数（延迟3天，当前为周二）,可能会造成当前周不能选,但会有跨年周的问题,仅对于有周月维度的日期控件
                    /*var tmp_weekDay = date.getDay();
                    if(tmp_weekDay<=cfg.maxDate){
                    	ww = ww-1;
                    	if(ww == 0){
                    		ww=52;
                    		yy = yy-1;
                    	}
                    }*///end
                    switch(patt){
                        case 0:
                        case 1: tmp[0] = yy+"-"+(ww<10?("0"+ww):ww);
                            break;
                        case 2:
                            //店铺诊断特殊处理
                            if(cfg.datePickerCfg!=undefined &&cfg.datePickerCfg.Param!=undefined && cfg.datePickerCfg.Param=="shopDiagnosis"){
                                if(cfg.datePickerCfg.FirstFlag !=undefined && cfg.datePickerCfg.FirstFlag==1){
                                    ww = cfg.datePickerCfg.PassDate=="shopDia" ? ww-1 : cfg.datePickerCfg.PassDate ;
                                    cfg.datePickerCfg.FirstFlag++;
                                }
                                if (ww==1){
                                    yy= (Number(yy)-1)+"";
                                    tmp[0] = yy+"-9952";
                                    ww=52;
                                }else {
                                    if(cfg.datePickerCfg.FirstFlag !=undefined && cfg.datePickerCfg.FirstFlag==2){
                                        tmp[0] = yy+"-99"+(ww<10?("0"+ww):ww);
                                        cfg.datePickerCfg.FirstFlag++;
                                    }else {
                                        tmp[0] = yy+"-99"+(ww<10?("0"+(ww-1)):ww-1);
                                        ww=ww-1;
                                    }
                                }
                            }else {
                                tmp[0] = yy+"-99"+(ww<10?("0"+ww):ww);
                            }
                            break;
                        default:
                            tmp[0] = yy+"-"+(ww<10?("0"+ww):ww);
                            break;
                    }
                    $("#"+dateSeg[0]).val(tmp[0]);
                    if(yy == 2016) {
                    	tmp[1] = $.jDateByWeek(yy,ww+1).curWeek(cfg.maxDate);
                    } else {
                    	tmp[1] = $.jDateByWeek(yy,ww).curWeek(cfg.maxDate);
                    }
                    curDate = $.jClone(tmp[1]);
                    tmpSeg = $.jClone(tmp[1]);
                    tmpSeg[2] = tmp[0];
                    //店铺诊断限制
                    if(cfg.datePickerCfg!=undefined &&cfg.datePickerCfg.FirstFlag !=undefined && cfg.datePickerCfg.FirstFlag==3){
                        if(cfg.datePickerCfg.PassDate=="shopDia"){
                            tmpField = yy+'\u5e74'+(ww<10?("0"+ww):ww)+'\u5468'+(bSimple?"":(" "+tmp[1].join(' \u81F3 ')));
                        }else{
                            tmpField = yy+'\u5e74'+(ww<10?("0"+(ww-1)):(ww-1))+'\u5468'+(bSimple?"":(" "+tmp[1].join(' \u81F3 ')));
                        }
                        cfg.datePickerCfg.FirstFlag++;
                    }else {
                        tmpField = yy+'\u5e74'+(ww<10?("0"+ww):ww)+'\u5468'+(bSimple?"":(" "+tmp[1].join(' \u81F3 ')));
                    }
                    $('#widgetField input[type!=hidden]').val(tmpField);
                }else{
                	//为应对双十一期间,改成设置显示延迟时间,当延迟天数大于日数（延迟3天，当前为周二）,可能会造成当前月不能选,但会有跨年周的问题,仅对于有周月维度的日期控件
                    date = date.prevDay(cfg.maxDate);
                    
                    if(!inRapid){
                        widthSet(1);
                    }else{
                        var finalDateSeg = O.cache.get("bak","widget").finalDateSeg;
                        if(finalDateSeg[0]==finalDateSeg[1]){
                            widthSet(5);
                        }else{
                            widthSet(3);
                        }
                    }
                    //tmp[0] = date.prevDay(1).Format("yyyy-MM-dd");
                    tmp[0] = date.Format("yyyy-MM-dd");
                    //判断是否大于最大设置日期
                    tmp[0] = maxDate<tmp[0]?maxDate:tmp[0];
                    tmpSeg = [tmp[0]];
                    $("#"+dateSeg[0]).val(tmp[0]);
                    curDate = tmpField = tmp[0];
                    $('#widgetField input[type!=hidden]').val(tmpField);
                }
                if(!inRapid){
                    pickerBak.lastDateSeg = $.jClone(tmpSeg);
                    pickerBak.finalDateSeg = $.jClone(tmpSeg);
                    pickerBak.lastField = pickerBak.finalField = tmpField;
                }
            }else if(bRange){
                widthSet(2);
                if(!!range[0]&&$.jIsArray(range[0])){
                    tmp[0] = date.prevDay(range[0][0]).Format("yyyy-MM-dd");
                    tmp[1] = date.prevDay(range[0][1]).Format("yyyy-MM-dd");
                }else{
                    tmp[0] = date.prevDay(range[0]).Format("yyyy-MM-dd");
                    tmp[1] = date.prevDay(1).Format("yyyy-MM-dd");
                }
                tmp[1] = maxDate<tmp[1]?maxDate:tmp[1];
                curDate = [tmp[0],tmp[1]];
                $("#"+dateSeg[0]).val(tmp[0]);
                $("#"+dateSeg[1]).val(tmp[1]);
                $('#widgetField input[type!=hidden]').val(tmp[0]+' \u81F3 '+tmp[1]);
                if(!inRapid){
                    pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $("#"+dateSeg[0]).val();
                    pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = $("#"+dateSeg[1]).val();
                    pickerBak.lastField = pickerBak.finalField = $('#widgetField input[type!=hidden]').val();
                }
            }else{
                //TODO
            }
            //控件宽度=日历数*248px
            //控件宽度=日历数*248px
            if(cfg&&cfg.dimension&&cfg.dimension.bEmbed){
                $('#widgetCalendar').css({"width": (90+Number(244*calendars))+"px"});
            }else{
                $('#widgetCalendar').css({"width": (10+Number(244*calendars))+"px"});
            }
            O.datepicker = $('#widgetCalendar #Calendar').DatePicker({
                flat: true,
                format: 'Y-m-d',
                date: $.jClone(curDate),
                current: date.prevDay(1).Format("yyyy-MM-dd"),
                minDate:(bSingle||!!range[1])?'2004-06-18':0,
                maxDate:(bSingle||!!range[1])?fbdDate:0,
                calendars: calendars,
                type: type,
                mode: 'range',
                view: view,
                starts: 0,
//				onBeforeShow: function(){
//					$('#inputDate').DatePickerSetDate($('#inputDate').val(), true);
//				},
                onChange: function(formated) {
                    var date = formated.toString(),dates = date.split(","),options = $(this).data('datepicker');
                    var startDate = dates[0],endDate = dates[1],month = dates[2],year = dates[3],week = dates[4],tmpDate,tmpStartDate,tmpEndDate;
                    if(startDate == "2015-12-28") {
                    	year = 2015;
                    }
                    tmpDate = startDate.split("-");
                    tmpStartDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);
                    tmpDate = endDate.split("-");
                    tmpEndDate = new Date(tmpDate[0],tmpDate[1]-1,tmpDate[2]);

                    var isYear = (!!year&&year!=""),isWeek = (!!week&&week!=""),isMonth = (!!month&&month!=""),show = (isYear?(year+'\u5e74'):"");
                    if(bSingle&&!isMonth&&!isWeek){
                        options.date[0] = options.date[1] = options.curSel;
                    }
                    if(bSingle){
                        if(bWeek||bMonth){
                            if(cfg.bFinal){
                                O.cache.set("widthCode",1,"widget");
                                pickerBak.finalDateSeg[0] = (new Date(options.date[0])).Format("yyyy-MM-dd");
                                pickerBak.finalDateSeg[1] = (new Date(options.date[1])).Format("yyyy-MM-dd");
                            }else{
                                widthSet(1);
                                $('#'+dateSeg[0]).val(endDate);
                            }
                        }else{
                            startDate = endDate = (new Date(options.curSel)).Format("yyyy-MM-dd");
                            if(cfg.bFinal){
                                O.cache.set("widthCode",1,"widget");
                                pickerBak.finalDateSeg = [endDate,endDate,endDate];
                            }else{
                                widthSet(1);
                                $('#'+dateSeg[0]).val(endDate);
                            }
                        }
                    }else if(bRange){
                        if(cfg.bFinal){
                            O.cache.set("widthCode",2,"widget");
                            pickerBak.finalDateSeg[0] = startDate;
                            pickerBak.finalDateSeg[1] = endDate;
                        }else{
                            widthSet(2);
                            $('#'+dateSeg[0]).val(startDate);
                            $('#'+dateSeg[1]).val(endDate);
                        }
                    }else{
                        //TODO
                    }
                    //非按月模式下设置天数上限
                    if(!bSingle&&!isMonth){
                        if(!!range[1]){
                            if(tmpStartDate.DateDiff('d', tmpEndDate)>range[1]){
                                $('#message').html("请将查询区间设置在"+range[1]+"天之内");
                                options.date[0] = tmpStart;
                                options.date[1] = tmpEnd;
                                options.lastSel = !options.lastSel;
                                return;
                            }else{
                                options.firstSel = options.selVal;
                                $('#message').html("");
                            }
                        }
                    }
                    if(isWeek||isMonth){
                        if(cfg.bFinal){
                            O.cache.set("widthCode",4,"widget");
                        }else{
                            widthSet(4);
                        }
                    }
                    show += (isWeek?(((week<10)?("0"+week):week)+'\u5468'):"")||(isMonth?(((month<10)?("0"+month):month)+'\u6708'):"");
                    if((!isWeek&&!isMonth)||!bSimple){
                        if(show!=""){
                            show += " ";
                        }
                        show += ((bSingle&&!isMonth&&!isWeek)?endDate:dates.slice(0,2).join(' \u81F3 '));
                    }
                    if(cfg.bFinal){
                        pickerBak.finalField = show;
                    }else{
                        $('#widgetField input').val(show);
                    }
                    switch(patt){
                        case 0:   break;
                        case 1:  if(cfg.bFinal){
                            (isWeek&&(pickerBak.finalDateSeg[2] = year+"-"+(week<10?("0"+week):week)))||(isMonth&&(pickerBak.finalDateSeg[2] = year+"-"+(month<10?("0"+month):month)));
                        }else{
                            (isWeek&&$('#'+dateSeg[0]).val(year+"-"+(week<10?("0"+week):week)))||(isMonth&&$('#'+dateSeg[0]).val(year+"-"+(month<10?("0"+month):month)));
                        }
                            break;
                        case 2:  if(cfg.bFinal){
                            (isWeek&&(pickerBak.finalDateSeg[2] = year+"-99"+(week<10?("0"+week):week)))||(isMonth&&(pickerBak.finalDateSeg[2] = year+"-"+(month<10?("0"+month):month)));
                        }else{
                            (isWeek&&$('#'+dateSeg[0]).val(year+"-99"+(week<10?("0"+week):week)))||(isMonth&&$('#'+dateSeg[0]).val(year+"-"+(month<10?("0"+month):month)));
                        }
                            break;
                        default:  break;
                    }
                    O.cache.add({"bak":pickerBak},"widget");
                    for(var i in customChanges){
                        customChanges[i]();
                    }
                    //去除快查显示状态
                    if(cfg.Rapid){
                        if(cfg.rapidSel&&cfg.rapidSel.external){
                            $("#widget").siblings().find("span.radiobox.r-checked").removeClass("r-checked");
                        }else{
                            $(".quick-chose",$("#widget")).find("a.chosen").removeClass("chosen");
                        }
                    }
                }
            });
            //load param
            if(!inRapid&&paramCfg&&paramCfg!={}){
                var paramDate = paramCfg[O.constants.Config.DATE],paramRapid = paramCfg[O.constants.Config.RAPID];
                if(!paramRapid&&!!paramDate){
                    if($.jIsArray(paramDate)){
                        widthSet(2);
                        $('#'+dateSeg[0]).val(paramDate[0]);
                        $('#'+dateSeg[1]).val(paramDate[1]);
                        $('#widgetField input[type!=hidden]').val(paramDate[0]+' \u81F3 '+paramDate[1]);
                        O.datepicker.DatePickerSetDate(paramDate);
                        pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $('#'+dateSeg[0]).val();
                        pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = $('#'+dateSeg[1]).val();
                        pickerBak.lastField = pickerBak.finalField = $('#widgetField input[type!=hidden]').val();
                    }else{
                        if(paramDate.length==10){
                            widthSet(1);
                            $('#'+dateSeg[0]).val(paramDate);
                            $('#widgetField input').val(paramDate);
                            O.datepicker.DatePickerSetDate(paramDate);
                            pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $('#'+dateSeg[0]).val();
                        }//传周
                        else if(paramDate.indexOf("99")>=0){
                            widthSet(4);
                            var y=parseInt(paramDate.slice(0,4)),ww=paramDate.slice(paramDate.indexOf("99")).replace("99",""),w=parseInt(ww.indexOf("0")==0?ww.replace("0",""):ww);
                            var tmpParamDate = $.jGetWeekByNum(w, y),fDay=tmpParamDate[0],lDay=tmpParamDate[1];
                            if(bSingle){
                                $('#'+dateSeg[0]).val(paramDate);
                                pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = fDay;
                                pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = lDay;
                                pickerBak.lastDateSeg[2] = pickerBak.finalDateSeg[2] = $('#'+dateSeg[0]).val();
                            }else if(bRange){
                                $('#'+dateSeg[0]).val(fDay);
                                $('#'+dateSeg[1]).val(lDay);
                                pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $('#'+dateSeg[0]).val();
                                pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = $('#'+dateSeg[1]).val();
                            }
                            //店铺诊断限制
                            if(cfg.datePickerCfg!=undefined &&cfg.datePickerCfg.FirstFlag !=undefined && cfg.datePickerCfg.FirstFlag==4){
                                $('#widgetField input').val(y+'\u5e74'+(Number(ww)-1)+'\u5468'+" "+fDay+' \u81F3 '+lDay);
                                cfg.datePickerCfg.FirstFlag++;
                            }else {
                                $('#widgetField input').val(y+'\u5e74'+ww+'\u5468'+" "+fDay+' \u81F3 '+lDay);
                            }
                            O.datepicker.DatePickerSetDate([fDay, lDay]);
                        }else{
                            widthSet(4);
                            var y=parseInt(paramDate.slice(0,4)),m=parseInt(paramDate.slice(5,7).indexOf("0")>=0?paramDate.slice(6,7):paramDate.slice(5,7)),d=1;
                            var tmpParamDate = new Date(y,m-1,d),fDay=tmpParamDate.firstDayOfMonth().Format("yyyy-MM-dd"),lDay=tmpParamDate.lastDayOfMonth().Format("yyyy-MM-dd");
                            if(bSingle){
                                $('#'+dateSeg[0]).val(paramDate);
                                pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = fDay;
                                pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = lDay;
                                pickerBak.lastDateSeg[2] = pickerBak.finalDateSeg[2] = $('#'+dateSeg[0]).val();
                            }else if(bRange){
                                $('#'+dateSeg[0]).val(fDay);
                                $('#'+dateSeg[1]).val(lDay);
                                pickerBak.lastDateSeg[0] = pickerBak.finalDateSeg[0] = $('#'+dateSeg[0]).val();
                                pickerBak.lastDateSeg[1] = pickerBak.finalDateSeg[1] = $('#'+dateSeg[1]).val();
                            }
                            $('#widgetField input').val(tmpParamDate.getFullYear()+'\u5e74'+paramDate.slice(5,7)+'\u6708'+" "+fDay+' \u81F3 '+lDay);
                            O.datepicker.DatePickerSetDate([fDay, lDay]);
                        }
                        pickerBak.lastField = pickerBak.finalField = $('#widgetField input[type!=hidden]').val();
                    }
                }
            }
            O.cache.add({"bak":pickerBak},"widget");
            var confirmPicker = function(_valSet){
                if(_valSet.dateSeg.length<3){
                    for(var i in _valSet.dateSeg){
                        $('#'+_valSet.idSeg[i]).val(_valSet.dateSeg[i]);
                    }
                }else{
                    $('#'+_valSet.idSeg[0]).val(_valSet.dateSeg[2]);
                }
                $('#widgetField input').val(_valSet.field);
                O.datepicker.DatePickerSetDate(_valSet.dateSeg.length>1?[_valSet.dateSeg[0],_valSet.dateSeg[1]]:_valSet.dateSeg[0]);
            };
            var state = false,_wc_hide=function(){
                $('#widgetCalendar').stop().animate({height:0}, 100,function(){
                    $(this).prev().removeClass('widgetField-on');
                });
                state = false;
                $('#widgetField>a').removeClass("on");
            },closeState = function(){
                state = false;
            };

            
            $('#widgetField>a,#widgetField input,#widgetCalendar').unbind('mouseover').bind('mouseover', function(){
                $(this).parent().addClass('widgetField-on');
                if(state){
                    $('#widgetField>a').removeClass("on");
                }else{
                    $('#widgetField>a').addClass("on");
                }
                $('#widgetCalendar').stop().animate({height: state ? 0 : $('#widgetCalendar div:first').get(0).offsetHeight}, 100);
                state = !state;
                $('#Calendar td,#Calendar th').unbind("click",closeState).bind("click" ,closeState);
                if(state) {
                    $('.c-btn').unbind("click").bind("click",function(){
                        _wc_hide();
                    });
                    $(this).unbind('mouseout').bind('mouseout',function(event){
                        _wc_hide();
                    });
                }else {
                    $(this).unbind('mouseout',_wc_hide);
                }
                return false;
            });
            
            if(cfg.bFinal){
                $("#widgetField>a,#widgetField input").unbind("mouseenter").bind("mouseenter",function(e){
                    var bak = O.cache.get("bak","widget");
                    confirmPicker({
                        id: "widget",
                        idSeg: dateSeg,
                        field: bak.lastField,
                        dateSeg: bak.lastDateSeg
                    });
                    bak.finalDateSeg = $.jClone(bak.lastDateSeg);
                    bak.finalField = bak.lastField;
                    O.cache.add({"bak":bak},"widget");
                });
            }

            var rapid = cfg[O.constants.Config.RAPID];
            if(rapid!=undefined){
                if(($.jIsArray(rapid)&&rapid[0])||(!$.jIsArray(rapid)&&rapid)||false){
                    O.initRapid(widthSet, cfg);
                }
            }

            //custom function of onchange
            for(var i in customChanges){
                customChanges[i]();
            }

            /**
             * 拦截页面的onclick，并加入控件click队列
             * @type {*|jQuery}
             */
            if(cfg.bFinal){
                var click = $(".btn:first",$("#widget")).attr("onclick");
                if(click!=""){
                    O.cache.set("click",click,"widget");
                    $(".btn:first",$("#widget")).attr("onclick","");
                }else{
                    click = O.cache.get("click","widget");
                }

                $(".btn:first",$("#widget")).unbind("click");
                $(".btn:first",$("#widget")).bind("click", function(){
                    var bak = O.cache.get("bak","widget");
                    confirmPicker({
                        id: "widget",
                        idSeg: dateSeg,
                        dateSeg: bak.finalDateSeg,
                        field: bak.finalField
                    });
                    bak.lastDateSeg = $.jClone(bak.finalDateSeg);
                    //手动选择和快查关联
                    if(cfg.RapidType == "QuickRapid"){
                    	var yesterdayStr = getDateStr(-1*cfg.maxDate);
                		yesterdayStr = yesterdayStr.replace(/-/g, "");
                    	var urStartDate = bak.finalDateSeg[0];
                    	var urEndDate = bak.finalDateSeg[1] ? bak.finalDateSeg[1] : "";
                    	var urDate = bak.finalDateSeg[2] ? bak.finalDateSeg[2] : "";
                    	var checkDate = "";
                    	if(urDate == ""){
                    		if(urStartDate.length == 7){
                    			checkDate = urStartDate + "-31";
                    		}else{
                    			checkDate = urStartDate;
                    		}
                    	}else{
                    		if(urDate.indexOf(99) > -1){//周
                        		currentGloalWeekStartDate = urStartDate;
                        		currentGloalWeekEndDate = urEndDate;
                        	}
                    		checkDate = urEndDate;
                    	}
                    	
                    	var dateWeekCheck = new Date();
                    	if(getDayNum() == "Monday"){//如果是周一取上一周的第一天
                    		dateWeekCheck = dateWeekCheck.prevDay(1);
                    	}
                    	if( parseInt(checkDate.replace(/-/g, "")) < parseInt(dateWeekCheck.curWeek(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一周']").show();
                        	$("span[desc='下一周_']").hide();
                        }else{
                        	$("a[desc='下一周']").hide();
                        	$("span[desc='下一周_']").show();
                        }
                    	if( parseInt(checkDate.replace(/-/g, "")) < parseInt(yesterdayStr) ){
                        	$("a[desc='后一天']").show();
                        	$("span[desc='后一天_']").hide();
                        }else{
                        	$("a[desc='后一天']").hide();
                        	$("span[desc='后一天_']").show();
                        }
                    	if( parseInt(checkDate.replace(/-/g, "")) < parseInt(date.curMonth(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一月']").show();
                        	$("span[desc='下一月_']").hide();
                        }else{
                        	$("a[desc='下一月']").hide();
                        	$("span[desc='下一月_']").show();
                        }
                    	//近几天
                    	if(urDate == "7"){
                    		$("a[desc='近7天']").hide();
                    		$("span[desc='近7天_']").show();
                    	}else{
                    		$("a[desc='近7天']").show();
                    		$("span[desc='近7天_']").hide();
                    	} 
                    	if(urDate == "15"){
                    		$("a[desc='近15天']").hide();
                        	$("span[desc='近15天_']").show();
                    	}else{
                    		$("a[desc='近15天']").show();
                        	$("span[desc='近15天_']").hide();
                    	} 
                    	if(urDate == "30"){
                    		$("a[desc='近30天']").hide();
                    		$("span[desc='近30天_']").show();
                    	}else{
                    		$("a[desc='近30天']").show();
                    		$("span[desc='近30天_']").hide();
                    	}
                    }
                    
                    bak.lastField = bak.finalField;
                    inRapid = !!$(".radiobox.r-checked",$("#widget").next(".rapidSel")).length;
                    if(!inRapid&&O.cache.get("widthCode","widget")){
                        widthSet(O.cache.get("widthCode","widget"));
                        O.cache.set("widthCode",null,"widget");
                    }
                    O.cache.set("bak",bak,"widget");
                }).bind("click",function(){
                        eval(click);
                    });
            }
        }
    },
    //单个日期控件的快查
    initRapid:function(_widthSet, _cfg){
        var O = this,datePicker = O.constants.DatePicker,cfg = !!_cfg?_cfg:O.datePickerCfg,rapid=cfg[O.constants.Config.RAPID],paramCfg = cfg[O.constants.Config.PARAM],specDate;
        var type = cfg[O.constants.Config.TYPE],
            dateSeg = cfg[O.constants.Config.DATESEG],
            bSingle = (type==O.constants.DatePicker.SINGLE),
            bRange = (type==O.constants.DatePicker.RANGE),
            bSimple = (cfg[O.constants.Config.STYLE]==O.constants.DatePicker.SIMPLE);
        var $a,$selfa,date = new Date(),dateIpt="",startDate,endDate,nonDate=false;
        if(cfg.rapidSel&&(cfg.rapidSel.external||cfg.rapidSel.noPicker)){
        	if(cfg.RapidType == "QuickRapid"){
                $a = $("#widget").next(".rapidSel").find(".rapid-a");
                $selfa = $("#widgetCalendar .selfRapidSel").find(".rapid-a");
        	}else{
                $a = $("#widget").next(".rapidSel").find(".radiobox:not(.r-disabled)");
                $selfa = $("#widgetCalendar .selfRapidSel").find(".radiobox:not(.r-disabled)");
        	}
        }else{
            $a = $("#widgetCalendar .quick-chose").find("a");
            $selfa = $("#widgetCalendar .self-quick-chose").find("a");
        }

        var rapidSet = function(_desc, _val){
    		var bSpec = _val==0, bBoth = _val==121||_val==undefined, tmpNum;   //设置0-组件自动计算日期和特殊日期格式，如90/95/99;设置121-组件转换为起始和结束
        	dateCheck = new Date();
        	//新快查样式判断
        	if(_cfg.RapidType == "QuickRapid"){
        		var yesterdayStr_temp = getDateStr(-1*cfg.maxDate);
        		var yesterdayStr = yesterdayStr_temp.replace(/-/g, "");
        		cfg[O.constants.Config.RAPID] = "";
                switch(_desc){
                    case datePicker.PREV_WEEK:   	
                    	preWeekCount += 1;
                    	if(currentGloalWeekStartDate != ""){
                    		date = getDateByBrowserType(currentGloalWeekStartDate);
                    	}else{
                    		if($('#'+dateSeg[0]).val().length==10){
                        		date = getDateByBrowserType($('#'+dateSeg[0]).val());
                    		}else{
                    			if($('#'+dateSeg[0]).val().length<3){
                    				date = getDateByBrowserType(yesterdayStr_temp);
                    			}else if($('#'+dateSeg[0]).val().indexOf("99") > -1){
                    				date = getDateByBrowserType(getDateStr(-1));
                    			}else{
                            		//date = getDateByBrowserType($('#'+dateSeg[0]).val());
                            		date = getDateByBrowserType(date.curMonth(0)[0]);
                    			}
                    		}
                    	}
                    	startDate = date.preWeekN(preWeekCount)[0];
                        endDate = date.preWeekN(preWeekCount)[1];
                        currentGloalWeekStartDate = startDate;
                        currentGloalWeekEndDate = endDate;
                        tmpNum = date.prevDay(7).getWeekNumber();
                        var fullYear = getDateByBrowserType(startDate).getFullYear();
                        if(startDate == "2015-12-28") {
                        	fullYear = "2015";
                        }
                        specDate = ""+fullYear+O.constants.DatePicker.PREFIX_WEEK+(tmpNum<10?("0"+tmpNum):tmpNum);
                        if(parseInt(currentGloalWeekStartDate.replace(/-/g, "")) < parseInt(yesterdayStr)){
                        	$("a[desc='后一天']").show();
                        	$("span[desc='后一天_']").hide();
                        }
                        if( parseInt(currentGloalWeekStartDate.replace(/-/g, "")) < parseInt(date.curWeek(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一周']").show();
                        	$("span[desc='下一周_']").hide();
                        }
                        if( parseInt(currentGloalWeekStartDate.replace(/-/g, "")) < parseInt(date.curMonth(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一月']").show();
                        	$("span[desc='下一月_']").hide();
                        }
                        $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
                        break;
                    case datePicker.NEXT_WEEK:    	
                    	nextWeekCount += 1;
                    	if($('#'+dateSeg[0]).val().length==7){//上一次是月
                    		date = getDateByBrowserType($('#'+dateSeg[0]).val());
                    		date = getDateByBrowserType(date.curMonth(0)[1]);
                    	}else{
                    		if($('#'+dateSeg[0]).val().length == 10){
                    			date = getDateByBrowserType($('#'+dateSeg[0]).val());
                    		}else{
                    			if($('#'+dateSeg[0]).val().length<3){
                    				date = getDateByBrowserType(yesterdayStr_temp);
                    			}else if($('#'+dateSeg[0]).val().indexOf("99") > -1){
                    				if(currentGloalWeekStartDate == ""){
                        				date = getDateByBrowserType(getDateStr(-1));
                    				}else{
                    					date = getDateByBrowserType(currentGloalWeekStartDate);
                    				}
                    			}
                    		}
                    	}
                    	startDate = date.nextWeekN(nextWeekCount)[0];
                        endDate = date.nextWeekN(nextWeekCount)[1];
                        currentGloalWeekStartDate = startDate;
                        currentGloalWeekEndDate = endDate;
                        tmpNum = date.nextDay(7).getWeekNumber();
                        var fullYear = getDateByBrowserType(startDate).getFullYear();
                        if(startDate == "2015-12-28") {
                        	fullYear = "2015";
                        }
                        specDate = ""+fullYear+O.constants.DatePicker.PREFIX_WEEK+(tmpNum<10?("0"+tmpNum):tmpNum);
                        if(parseInt(currentGloalWeekEndDate.replace(/-/g, "")) >= parseInt(yesterdayStr)){
                        	$("a[desc='后一天']").hide();
                        	$("span[desc='后一天_']").show();
                        }
                        if(getDayNum() == "Monday"){//如果是周一取上一周的第一天
                        	var dateWeekMonday = dateCheck.prevDay(1);
                            if( parseInt(currentGloalWeekEndDate.replace(/-/g, "")) >= parseInt(dateWeekMonday.curWeek(0)[0].replace(/-/g, "")) ){
                            	$("a[desc='下一周']").hide();
                            	$("span[desc='下一周_']").show();
                            }
                        }else{
                        	if( parseInt(currentGloalWeekEndDate.replace(/-/g, "")) >= parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                            	$("a[desc='下一周']").hide();
                            	$("span[desc='下一周_']").show();
                            }
                        }
                        if( parseInt(currentGloalWeekEndDate.replace(/-/g, "")) >= parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一月']").hide();
                        	$("span[desc='下一月_']").show();
                        }
                        $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
                        break;
                    case datePicker.PREV_MONTH:
                    	if($('#'+dateSeg[0]).val().length<3){
                    		date = getDateByBrowserType(yesterdayStr_temp);
            			}else if($('#'+dateSeg[0]).val().indexOf("99")>-1){
                    		if(currentGloalWeekStartDate == ""){
                    			date = getDateByBrowserType(getDateStr(-1));
                    		}else{
                            	date = getDateByBrowserType(currentGloalWeekStartDate);
                    		}
                    	}else{
                        	date = getDateByBrowserType($('#'+dateSeg[0]).val());
                    	}
                    	startDate = date.preMonth()[0];
                        endDate = date.preMonth()[1];
                        specDate = startDate.slice(0, startDate.length-3);
                        $("a[desc='后一天']").show();
                    	$("span[desc='后一天_']").hide();
                    	if( parseInt(date.preWeekN(1)[1].replace(/-/g, "")) < parseInt(date.curWeek(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一周']").show();
                        	$("span[desc='下一周_']").hide();
                        }
                    	$("a[desc='下一月']").show();
                    	$("span[desc='下一月_']").hide();
                    	$("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
                        break;
                    case datePicker.NEXT_MONTH:    
                    	if($('#'+dateSeg[0]).val().length<3){
                    		date = getDateByBrowserType(yesterdayStr_temp);
            			}else if($('#'+dateSeg[0]).val().indexOf("99")>-1){
                    		if(currentGloalWeekStartDate == ""){
                    			date = getDateByBrowserType(getDateStr(-1));
                    		}else{
                            	date = getDateByBrowserType(currentGloalWeekStartDate);
                    		}
                    	}else{
                        	date = getDateByBrowserType($('#'+dateSeg[0]).val());
                    	}
                    	startDate = date.nextMonth()[0];
                        endDate = date.nextMonth()[1];
                        specDate = startDate.slice(0, startDate.length-3);
                        //本月最后一天
                    	date = getDateByBrowserType($('#'+dateSeg[0]).val());
                		date = getDateByBrowserType(date.curMonth(0)[1]);
                        if(parseInt(date.nextMonth(0)[1].replace(/-/g, "")) >= parseInt(yesterdayStr)){
                        	$("a[desc='后一天']").hide();
                        	$("span[desc='后一天_']").show();
                        }
                        if( parseInt(date.nextMonth(0)[1].replace(/-/g, "")) >= parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一周']").hide();
                        	$("span[desc='下一周_']").show();
                        }
                        if( parseInt(date.nextMonth(0)[1].replace(/-/g, "")) >= parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一月']").hide();
                        	$("span[desc='下一月_']").show();
                        }
                        $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
                        break;
                    case datePicker.PREV_DAY:
                    	if($('#'+dateSeg[0]).val().length<3){
                    		date = getDateByBrowserType(yesterdayStr_temp);
            			}else if($('#'+dateSeg[0]).val().indexOf("99")>-1){
                    		if(currentGloalWeekStartDate == ""){
                    			date = getDateByBrowserType(getDateStr(-1));
                    		}else{
                            	date = getDateByBrowserType(currentGloalWeekStartDate);
                    		}
                    	}else{
                        	date = getDateByBrowserType($('#'+dateSeg[0]).val());
                    	}
                    	specDate = startDate = endDate = date.prevDay(1).Format("yyyy-MM-dd");
                        if(parseInt(yesterdayStr) > parseInt(endDate.replace(/-/g, ""))){
                        	$("a[desc='后一天']").show();
                        	$("span[desc='后一天_']").hide();
                        }
                        if( parseInt(date.preWeekN(1)[1].replace(/-/g, "")) < parseInt(date.curWeek(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一周']").show();
                        	$("span[desc='下一周_']").hide();
                        }
                        if( parseInt(startDate.replace(/-/g, "")) < parseInt(date.curMonth(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一月']").show();
                        	$("span[desc='下一月_']").hide();
                        }
                        $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
                        break;
                    case datePicker.NEXT_DAY:  
                    	if($('#'+dateSeg[0]).val().length<3){
                    		date = getDateByBrowserType(yesterdayStr_temp);
            			}else if($('#'+dateSeg[0]).val().indexOf("99")>-1){
                    		if(currentGloalWeekEndDate == ""){
                    			date = getDateByBrowserType(getDateStr(-1));
                    		}else{
                            	date = getDateByBrowserType(currentGloalWeekEndDate);
                    		}
                    	}else if($('#'+dateSeg[0]).val().length==7){
                        	date = getDateByBrowserType($('#'+dateSeg[0]).val());
                        	date = getDateByBrowserType(date.lastDayOfMonth());
                    	}else{
                    		date = getDateByBrowserType($('#'+dateSeg[0]).val());
                    	}
                    	specDate = startDate = endDate = date.nextDay(1).Format("yyyy-MM-dd");
                    	if(parseInt(yesterdayStr) == parseInt(endDate.replace(/-/g, ""))){
                        	$("a[desc='后一天']").hide();
                        	$("span[desc='后一天_']").show();
                        }
                        if( parseInt(startDate.replace(/-/g, "")) == parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一周']").hide();
                        	$("span[desc='下一周_']").show();
                        }
                        if( parseInt(startDate.replace(/-/g, "")) == parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                        	$("a[desc='下一月']").hide();
                        	$("span[desc='下一月_']").show();
                        }
                        $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
                        break;
                    case datePicker.PREV3:   	
                    	date = new Date();
                    	startDate = date.prevDay3()[0];
	                    endDate = date.prevDay3()[1];
	                    $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
	                    break;
	                case datePicker.PREV7:    	
	                	date = new Date();
	                	startDate = date.prevDay7()[0];
	                    endDate = date.prevDay7()[1];
	                    $("a[desc='近7天']").hide();
                    	$("span[desc='近7天_']").show();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
	                    break;
	                case datePicker.PREV15:    	
	                	date = new Date();
	                	startDate = date.prevDay15()[0];
	                    endDate = date.prevDay15()[1];
	                    $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").hide();
                    	$("span[desc='近15天_']").show();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
	                    break;
	                case datePicker.PREV30:    	
	                	date = new Date();
	                	startDate = date.prevDay30()[0];
	                    endDate = date.prevDay30()[1];
	                    $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").hide();
                    	$("span[desc='近30天_']").show();
	                    break;
	                case datePicker.PREV90:    	startDate = date.prevDay90()[0];
		                endDate = date.prevDay90()[1];
		                $("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
		                break;
                    case datePicker.RESET_DATE:
                    	preWeekCount = 0;
                    	nextWeekCount = 0;
                    	currentGloalWeekStartDate = "";
                    	currentGloalWeekEndDate = "";
                    	specDate = startDate = endDate = dateCheck.prevDay().Format("yyyy-MM-dd");
                    	$("a[desc='近7天']").show();
                    	$("span[desc='近7天_']").hide();
                    	$("a[desc='近15天']").show();
                    	$("span[desc='近15天_']").hide();
                    	$("a[desc='近30天']").show();
                    	$("span[desc='近30天_']").hide();
                        break;
                    default:	nonDate = true;
                        break;
                }
        	}else{
                switch(_desc){
                    case datePicker.PREVWEEK:   	startDate = date.preWeek()[0];
                        endDate = date.preWeek()[1];
                        tmpNum = date.prevDay(7).getWeekNumber();
                        specDate = ""+date.prevDay(7).getFullYear()+O.constants.DatePicker.PREFIX_WEEK+(tmpNum<10?("0"+tmpNum):tmpNum);
                        break;
                    case datePicker.CURWEEK:    	startDate = date.curWeek(cfg.maxDate)[0];
                        endDate = date.curWeek(cfg.maxDate)[1];
                        tmpNum = date.getWeekNumber();
                        specDate = ""+date.getFullYear()+O.constants.DatePicker.PREFIX_WEEK+(tmpNum<10?("0"+tmpNum):tmpNum);
                        break;
                    case datePicker.PREVMONTH:  	startDate = date.preMonth()[0];
                        endDate = date.preMonth()[1];
                        specDate = startDate.slice(0, startDate.length-3);
                        break;
                    case datePicker.CURMONTH:    startDate = date.curMonth(cfg.maxDate)[0];
                        endDate = date.curMonth(cfg.maxDate)[1];
                        specDate = startDate.slice(0, startDate.length-3);
                        break;
                    case datePicker.PREV1:  specDate = startDate = endDate = date.prevDay().Format("yyyy-MM-dd");
                        break;
                    case datePicker.PREV2:  specDate = startDate = endDate = date.prevDay(2).Format("yyyy-MM-dd");
                        break;
                    case datePicker.PREV3:   	startDate = date.prevDay3()[0];
                        endDate = date.prevDay3()[1];
                        break;
                    case datePicker.PREV7:    	startDate = date.prevDay7()[0];
                        endDate = date.prevDay7()[1];
                        break;
                    case datePicker.PREV15:    	startDate = date.prevDay15()[0];
                        endDate = date.prevDay15()[1];
                        break;
                    case datePicker.PREV30:    	startDate = date.prevDay30()[0];
                        endDate = date.prevDay30()[1];
                        break;
                    case datePicker.PREV90:    	startDate = date.prevDay90()[0];
    	                endDate = date.prevDay90()[1];
    	                break;
                    case datePicker.PREVSEASON:
                        startDate = date.prevSeason()[0];
                        endDate = date.prevSeason()[1];
                        var counter = date.prevSeasonCounter();
                        specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_SEASON + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                        break;
                    case datePicker.PREVMONTH3:
                        startDate = date.prevMonth3()[0];
                        endDate = date.prevMonth3()[1];
                        var counter = date.prevMonthCounter3();
                        specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_MONTH + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                        break;
                    case datePicker.PREVMONTH6:
                        startDate = date.prevMonth6()[0];
                        endDate = date.prevMonth6()[1];
                        var counter = date.prevMonthCounter6();
                        specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_MONTH + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                        break;
                    case datePicker.PREVMONTH12:
                        startDate = date.prevMonth12()[0];
                        endDate = date.prevMonth12()[1];
                        var counter = date.prevMonthCounter12();
                        specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_MONTH + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                        break;
                    default:	nonDate = true;
                        break;
                }
        	}
            

            //if rapid is !date
            if(!nonDate){
                var bak = O.cache.get("bak","widget");
                if(bRange){
                    _widthSet(3);
                    //判断是否特殊值（生成固定值由推送数据计算）
                    if(bSpec){
                        $('#'+dateSeg[0]).val(specDate);
                        $('#'+dateSeg[1]).val(specDate);
                    }else{
                        if(bBoth){
                            $('#'+dateSeg[0]).val(startDate);
                            $('#'+dateSeg[1]).val(endDate);
                        }else{
                            $('#'+dateSeg[0]).val(_val);
                            $('#'+dateSeg[1]).val(_val);
                        }
                    }
                    O.datepicker.DatePickerSetDate([startDate, endDate]);
                    dateIpt += _desc+ " "+startDate+' \u81F3 '+endDate;
                    bak.lastDateSeg = bak.finalDateSeg = [$('#'+dateSeg[0]).val(),$('#'+dateSeg[1]).val()];
                    bak.lastField = bak.finalField = dateIpt;
                }else if(bSingle){
                    //判断是否特殊值（生成固定值由推送数据计算）
                    if(bSpec){
                        $('#'+dateSeg[0]).val(specDate);
                    }else{
                        $('#'+dateSeg[0]).val(_val);
                    }
                    //判断是否属于范围日期
                    var dateSegDes = $('#'+dateSeg[0]).val();
                    if(cfg.RapidType=="QuickRapid"){
                    	if(dateSegDes.indexOf("99") > 0){
                    		_desc = dateSegDes.substring(0,4) + "年" + dateSegDes.substring(6,8) + "周";
                    	}else if(dateSegDes.length == 7){
                    		_desc = dateSegDes.substring(0,4) + "年" + dateSegDes.substring(5,7) + "月";
                    	}else if(dateSegDes.length < 3){
                    		//快查不需要更改值
                    	}else{
                    		_desc = "";
                    	}
                    }
                    if(startDate==endDate){
                        _widthSet(5);
                        O.datepicker.DatePickerSetDate([startDate, endDate]);
                        dateIpt += _desc+(bSimple?"":(" "+startDate));
                    }else{
                        _widthSet(3);
                        O.datepicker.DatePickerSetDate([startDate, endDate]);
                        dateIpt += _desc+(bSimple?"":(" "+startDate+' \u81F3 '+endDate));
                    }
                	
                    bak.lastDateSeg = bak.finalDateSeg = [startDate, endDate, $('#'+dateSeg[0]).val()];
                    bak.lastField = bak.finalField = dateIpt;
                }
                O.cache.add({"bak":bak},"widget");

                $('#widgetField input[readonly=readonly]').val(dateIpt);
            }
            dateIpt = "";
        };

        var inRapid = !!$(".radiobox.r-checked",$("#widget").next(".rapidSel")).length;
        if(!inRapid&&!!paramCfg&&paramCfg!={}){
            var paramRapid = paramCfg[O.constants.Config.RAPID];
            if(!!paramRapid){
                _widthSet(3);
                if(!!cfg.rapidSel&&(!!cfg.rapidSel.external||!!cfg.rapidSel.noPicker)){
                    $a.each(function(){
                        if(paramRapid==$(this).attr("desc")){
                            $(this).addClass("r-checked");
                            rapidSet($(this).attr("desc"),$(this).attr("val"));
                        }
                    });
                }else{
                    $a.each(function(){
                        if(paramRapid==$(this).attr("desc")){
                            $(this).addClass("chosen");
                            rapidSet($(this).attr("desc"),$(this).attr("val"));
                        }
                    });
                }
            }
        }
        //common defined rapid query(type of date)
        $a.unbind("click");
        $a.bind("click", function(){
            if(cfg.rapidSel&&(cfg.rapidSel.external||cfg.rapidSel.noPicker)){
                //快查单选按钮渲染
                $(this).siblings().removeClass("r-checked");
                $(this).addClass("r-checked");
                $(this).find("input:radio").jCheck($(this).is(".r-checked"));
            }else{
                $("#widgetCalendar .quick-chose").find("a.chosen").removeClass("chosen");
                $(this).addClass("chosen");
            }

            $("#Calendar .datepickerSelected").removeClass("datepickerSelected");

            var desc = $(this).attr("desc"),val = $(this).attr("val");
            rapidSet(desc,val);

            //如果有维度选择，点击快查变换相应的维度模式
            if(cfg.bDimension&&cfg.dimension.bEmbed){
                var $dimensionLi = $('ul li[val="'+$(this).attr("ref")+'"]',$("#widget"));
                $dimensionLi = $dimensionLi.length>0?$dimensionLi:$('ul li:first',$("#widget"));

                $dimensionLi.addClass("sel").css({"border-right": "0 none"});
                $dimensionLi.siblings().removeClass("sel");
                $(".datepicker",$("#Calendar")).remove();
                O.soloDatePicker($.extend(cfg, {View: $dimensionLi.attr("val")}));
            }
            if(cfg.RapidType=="QuickRapid"){
            	if($dimensionLi.attr("val")=="month" || $dimensionLi.attr("val")=="week"){
            		$("#widgetField").css("width","385px");
            		$("#DateSeg").css("width","340px");
            	}else if(val.length<3){
            		//近几天的快查不做处理
            	}else{
                	$("#widgetField").css("width","207px");
                	$("#DateSeg").css("width","160px");
            	}
            }

            if(($.jIsArray(rapid)&&rapid[1])||(!$.jIsArray(rapid)&&rapid)){
                if(cfg.bFinal){
                    $('.btn:first',$('#widget')).click();
                }else{
                    if($(".btn.query").length==1){
                        $(".btn.query").eq(0).click();
                    }else{
                        $('#widget .c-btn .btn:first').click();
                    }
                }
            }
        });

        //self defined rapid query(type of !date)
        $selfa.click(function(){
            $("#widgetCalendar .self-quick-chose").find("a.chosen").removeClass("chosen");
            $(this).addClass("chosen");
        });
    },
    initMultiRapid:function(_widthSet, _cfg, $_datepicker){
        var O = this,datePicker = O.constants.DatePicker,cfg = !!_cfg?_cfg:O.datePickerCfg,rapid=cfg[O.constants.Config.RAPID],paramCfg = cfg[O.constants.Config.PARAM],specDate;
        var type = cfg[O.constants.Config.TYPE],
            dateSeg = cfg[O.constants.Config.DATESEG],
            bSingle = (type==O.constants.DatePicker.SINGLE),
            bRange = (type==O.constants.DatePicker.RANGE),
            bSimple = (cfg[O.constants.Config.STYLE]==O.constants.DatePicker.SIMPLE),
            bSeparate = !!cfg[O.constants.DatePicker.BSEPARATE];

        var $a,$selfa;
        if(!!cfg.rapidSel&&(!!cfg.rapidSel.external||!!cfg.rapidSel.noPicker)){
        	if(cfg.RapidType == "QuickRapid"){
                $a = $_datepicker.siblings(".rapidSel").find(".rapid-a");
                $selfa = $(".widgetCalendar .selfRapidSel",$_datepicker).find(".rapid-a");
        	}else{
                $a = $_datepicker.siblings(".rapidSel").find(".radiobox:not(.r-disabled)");
                $selfa = $(".widgetCalendar .selfRapidSel",$_datepicker).find(".radiobox:not(.r-disabled)");
        	}
        }else{
            $a = $(".widgetCalendar .quick-chose",$_datepicker).find("a");
            $selfa = $(".widgetCalendar .self-quick-chose",$_datepicker).find("a");
        }
        var date = new Date(),dateIpt="",startDate,endDate,nonDate=false;
        var prevDayFirst = false;
        var rapidSet = function(_desc, _val){
            var bSpec = _val==0, bBoth = _val==121, tmpNum;   //设置0-组件自动计算日期和特殊日期格式，如90/95/99;设置121-组件转换为起始和结束
            var dateCheck = new Date();
            var yesterdayStr = getDateStr(-1*cfg.maxDate);
            yesterdayStr = yesterdayStr.replace(/-/g, "");
            if(cfg.RapidType == "QuickRapid"){
            	//页面传参日期后，开始日期定位
            	var paramDate = $("#" + dateSeg[1]).val();
            	if(paramDate != null && paramDate != ""){
            		if(!(_desc==datePicker.PREV_DAY && _val==1)){
                		date = getDateByBrowserType(paramDate);
            		}else{
            			if(!prevDayFirst){
                			date = getDateByBrowserType(date.prevDay().Format("yyyy-MM-dd"));
                			prevDayFirst = true;
            			}
            		}
            	}
            	multiRapid7Day = 0;
            	multiRapid30Day = 0;
            	switch(_desc){
                case datePicker.PREV_WEEK:   	
                	startDate = date.preWeek()[0];
                    endDate = date.preWeek()[1];
                    tmpNum = date.prevDay(7).getWeekNumber();
                    specDate = ""+date.prevDay(7).getFullYear()+O.constants.DatePicker.PREFIX_WEEK+(tmpNum<10?("0"+tmpNum):tmpNum);
                    //判断往后操作
                	if(parseInt(endDate.replace(/-/g, "")) < parseInt(yesterdayStr)){
                		$("a[desc='后一天']").show();
                    	$("span[desc='后一天_']").hide();
                	}
                	if(parseInt(endDate.replace(/-/g, "")) < parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一周']").show();
                    	$("span[desc='下一周_']").hide();
                    }
                    if(parseInt(endDate.replace(/-/g, "")) < parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一月']").show();
                    	$("span[desc='下一月_']").hide();
                    }
                    date = getDateByBrowserType(startDate);
                    break;
                case datePicker.NEXT_WEEK:    	
                	startDate = date.nextWeekN(1)[0];
                    endDate = date.nextWeekN(1)[1];
                    tmpNum = date.getWeekNumber();
                    specDate = ""+date.getFullYear()+O.constants.DatePicker.PREFIX_WEEK+(tmpNum<10?("0"+tmpNum):tmpNum);
                    //判断往后操作
                	if(parseInt(endDate.replace(/-/g, "")) >= parseInt(yesterdayStr)){
                		$("a[desc='后一天']").hide();
                    	$("span[desc='后一天_']").show();
                	}
                	if( parseInt(endDate.replace(/-/g, "")) >= parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一周']").hide();
                    	$("span[desc='下一周_']").show();
                    }
                    if( parseInt(endDate.replace(/-/g, "")) >= parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一月']").hide();
                    	$("span[desc='下一月_']").show();
                    }
                    date = getDateByBrowserType(startDate);
                    break;
                case datePicker.PREV_DAY:
                    specDate = startDate = endDate = date.prevDay().Format("yyyy-MM-dd");
                	//判断往后操作
                	if(parseInt(endDate.replace(/-/g, "")) < parseInt(yesterdayStr)){
                		$("a[desc='后一天']").show();
                    	$("span[desc='后一天_']").hide();
                	}
                	if(parseInt(endDate.replace(/-/g, "")) < parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一周']").show();
                    	$("span[desc='下一周_']").hide();
                    }
                    if(parseInt(endDate.replace(/-/g, "")) < parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一月']").show();
                    	$("span[desc='下一月_']").hide();
                    }
                	date = getDateByBrowserType(startDate);
                	break;
                case datePicker.NEXT_DAY:  
                	specDate = startDate = endDate = date.nextDay(1).Format("yyyy-MM-dd");
                	//判断往后操作
                	if(parseInt(endDate.replace(/-/g, "")) >= parseInt(yesterdayStr)){
                		$("a[desc='后一天']").hide();
                    	$("span[desc='后一天_']").show();
                	}
                	if( parseInt(endDate.replace(/-/g, "")) >= parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一周']").hide();
                    	$("span[desc='下一周_']").show();
                    }
                    if( parseInt(endDate.replace(/-/g, "")) >= parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一月']").hide();
                    	$("span[desc='下一月_']").show();
                    }
                    date = getDateByBrowserType(startDate);
                	break;
                case datePicker.PREV_MONTH:  	
                	startDate = date.preMonth()[0];
                	endDate = date.preMonth()[1];
                	specDate = startDate.slice(0, startDate.length-3);
                	//判断往后操作
                	if(parseInt(endDate.replace(/-/g, "")) < parseInt(yesterdayStr)){
                		$("a[desc='后一天']").show();
                    	$("span[desc='后一天_']").hide();
                	}
                	if(parseInt(endDate.replace(/-/g, "")) < parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一周']").show();
                    	$("span[desc='下一周_']").hide();
                    }
                    if(parseInt(endDate.replace(/-/g, "")) < parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一月']").show();
                    	$("span[desc='下一月_']").hide();
                    }
                	date = getDateByBrowserType(startDate);
                	break;
                case datePicker.NEXT_MONTH:    
                	startDate = date.nextMonth()[0];
                	endDate = date.nextMonth()[1];
                	specDate = startDate.slice(0, startDate.length-3);
                	//判断往后操作
                	if(parseInt(endDate.replace(/-/g, "")) >= parseInt(yesterdayStr)){
                		$("a[desc='后一天']").hide();
                    	$("span[desc='后一天_']").show();
                	}
                	if( parseInt(endDate.replace(/-/g, "")) >= parseInt(dateCheck.curWeek(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一周']").hide();
                    	$("span[desc='下一周_']").show();
                    }
                    if( parseInt(endDate.replace(/-/g, "")) >= parseInt(dateCheck.curMonth(0)[0].replace(/-/g, "")) ){
                    	$("a[desc='下一月']").hide();
                    	$("span[desc='下一月_']").show();
                    }
                	date = getDateByBrowserType(startDate);
                	break;
                case datePicker.PREV7:    	
                	specDate = startDate = dateCheck.prevDay(7).Format("yyyy-MM-dd");
                	endDate = dateCheck.prevDay().Format("yyyy-MM-dd");
                    date = getDateByBrowserType(startDate);
                    $("a[desc='近7天']").hide();
                	$("span[desc='近7天_']").show();
                	multiRapid7Day += 1;
                    break;
                case datePicker.PREV30:    	
                	specDate = startDate = dateCheck.prevDay(30).Format("yyyy-MM-dd");
                	endDate = dateCheck.prevDay().Format("yyyy-MM-dd");
                    date = getDateByBrowserType(startDate);
                    $("a[desc='近30天']").hide();
                	$("span[desc='近30天_']").show();
                	multiRapid30Day += 1;
                    break;
                case datePicker.RESET_DATE:
                	if(_val != null && _val != ""){
                    	specDate = startDate = dateCheck.prevDay(_val).Format("yyyy-MM-dd");
                	}else{
                    	specDate = startDate = dateCheck.prevDay(7).Format("yyyy-MM-dd");
                	}
                	endDate = dateCheck.prevDay().Format("yyyy-MM-dd");
                	date = new Date();
                	prevDayFirst = false;
                	break;
                default:	nonDate = true;
                break;
            	}
            }else{
            	switch(_desc){
                case datePicker.PREVWEEK:   	startDate = date.preWeek()[0];
                    endDate = date.preWeek()[1];
                    tmpNum = date.prevDay(7).getWeekNumber();
                    specDate = ""+date.prevDay(7).getFullYear()+O.constants.DatePicker.PREFIX_WEEK+(tmpNum<10?("0"+tmpNum):tmpNum);
                    break;
                case datePicker.CURWEEK:    	startDate = date.curWeek(cfg.maxDate)[0];
                    endDate = date.curWeek(cfg.maxDate)[1];
                    tmpNum = date.getWeekNumber();
                    specDate = ""+date.getFullYear()+O.constants.DatePicker.PREFIX_WEEK+(tmpNum<10?("0"+tmpNum):tmpNum);
                    break;
                case datePicker.PREVMONTH:  	startDate = date.preMonth()[0];
                    endDate = date.preMonth()[1];
                    specDate = startDate.slice(0, startDate.length-3);
                    break;
                case datePicker.CURMONTH:    startDate = date.curMonth(cfg.maxDate)[0];
                    endDate = date.curMonth(cfg.maxDate)[1];
                    specDate = startDate.slice(0, startDate.length-3);
                    break;
                case datePicker.PREV1:  specDate = startDate = endDate = date.prevDay().Format("yyyy-MM-dd");
                    break;
                case datePicker.PREV2:  specDate = startDate = endDate = date.prevDay(2).Format("yyyy-MM-dd");
                    break;
                case datePicker.PREV3:   	startDate = date.prevDay3()[0];
                    endDate = date.prevDay3()[1];
                    break;
                case datePicker.PREV7:    	startDate = date.prevDay7()[0];
                    endDate = date.prevDay(cfg.maxDate).Format("yyyy-MM-dd");
                    break;
                case datePicker.PREV15:    	startDate = date.prevDay15()[0];
                    endDate = date.prevDay15()[1];
                    break;
                case datePicker.PREV30:    	startDate = date.prevDay30()[0];
                    endDate = date.prevDay30()[1];
                    break;
                case datePicker.PREV90:    	startDate = date.prevDay90()[0];
	                endDate = date.prevDay90()[1];
	                break;
                case datePicker.PREVSEASON:
                    startDate = date.prevSeason()[0];
                    endDate = date.prevSeason()[1];
                    var counter = date.prevSeasonCounter();
                    specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_SEASON + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                    break;
                case datePicker.PREVMONTH3:
                    startDate = date.prevMonth3()[0];
                    endDate = date.prevMonth3()[1];
                    var counter = date.prevMonthCounter3();
                    specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_MONTH + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                    break;
                case datePicker.PREVMONTH6:
                    startDate = date.prevMonth6()[0];
                    endDate = date.prevMonth6()[1];
                    var counter = date.prevMonthCounter6();
                    specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_MONTH + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                    break;
                case datePicker.PREVMONTH12:
                    startDate = date.prevMonth12()[0];
                    endDate = date.prevMonth12()[1];
                    var counter = date.prevMonthCounter12();
                    specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_MONTH + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                    break;
                case datePicker.PREVHALFYEAR:
                    startDate = date.prevMonth6()[0];
                    endDate = date.prevMonth6()[1];
                    var counter = date.prevMonthCounter6();
                    specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_MONTH + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                    break;
                case datePicker.PREVYEAR:
                    startDate = date.prevMonth12()[0];
                    endDate = date.prevMonth12()[1];
                    var counter = date.prevMonthCounter12();
                    specDate = counter.split(".")[0] + O.constants.DatePicker.PREFIX_MONTH + (counter.split(".")[1]<10?("0"+counter.split(".")[1]):counter.split(".")[1]);
                    break;
                default:	nonDate = true;
                    break;
            	}
            }

            if(bSeparate){
            	var bak = [];
            	bak[0] = O.cache.get(cfg[O.constants.Config.ID][0]+"_bak","widget");
            	bak[1] = O.cache.get(cfg[O.constants.Config.ID][1]+"_bak","widget");
            	
            	$('#'+dateSeg[0]).val(startDate);
				$('#'+dateSeg[1]).val(endDate);
				O.datepickers[cfg[O.constants.Config.ID][0]].DatePickerSetDate(startDate);
				O.datepickers[cfg[O.constants.Config.ID][1]].DatePickerSetDate(endDate);
				
				bak[0].lastDateSeg = bak[0].finalDateSeg = [$('#'+dateSeg[0]).val()];
				bak[1].lastDateSeg = bak[1].finalDateSeg = [$('#'+dateSeg[1]).val()];
    			bak[0].lastField = bak[0].finalField = $('#'+dateSeg[0]).val();
    			bak[1].lastField = bak[1].finalField = $('#'+dateSeg[1]).val();
    			
    			$('.widgetField input[readonly=readonly]',$("#"+cfg[O.constants.Config.ID][0])).val($('#'+dateSeg[0]).val());
    			$('.widgetField input[readonly=readonly]',$("#"+cfg[O.constants.Config.ID][1])).val($('#'+dateSeg[1]).val());
        		O.cache.set(cfg[O.constants.Config.ID][0]+"_bak",bak[0],"widget");
        		O.cache.set(cfg[O.constants.Config.ID][1]+"_bak",bak[1],"widget");
            }else{
            	//if rapid is !date
            	if(!nonDate){
            		var bak = O.cache.get($_datepicker.jId()+"_bak","widget");
            		if(bRange){
            			_widthSet(3, $_datepicker.jId());
            			//判断是否特殊值（生成固定值由推送数据计算）
            			if(bSpec){
            				$('#'+dateSeg[0]).val(specDate);
            				$('#'+dateSeg[1]).val(specDate);
            			}else{
            				if(bBoth){
            					$('#'+dateSeg[0]).val(startDate);
            					$('#'+dateSeg[1]).val(endDate);
            				}else{
            					$('#'+dateSeg[0]).val(_val);
            					$('#'+dateSeg[1]).val(_val);
            				}
            			}
            			O.datepickers[cfg[O.constants.Config.ID]].DatePickerSetDate([startDate, endDate]);
            			dateIpt += _desc+ " "+startDate+' \u81F3 '+endDate;
            			bak.lastDateSeg = bak.finalDateSeg = [$('#'+dateSeg[0]).val(),$('#'+dateSeg[1]).val()];
            			bak.lastField = bak.finalField = dateIpt;
            		}else if(bSingle){
            			//判断是否特殊值（生成固定值由推送数据计算）
            			if(bSpec){
            				$('#'+dateSeg[0]).val(specDate);
            			}else{
            				$('#'+dateSeg[0]).val(_val);
            			}
            			//判断是否属于范围日期
            			if(startDate==endDate){
            				_widthSet(5, $_datepicker.jId());
            				O.datepickers[cfg[O.constants.Config.ID]].DatePickerSetDate([startDate, endDate]);
            				dateIpt += _desc+(bSimple?"":(" "+startDate));
            			}else{
            				_widthSet(3, $_datepicker.jId());
            				O.datepickers[cfg[O.constants.Config.ID]].DatePickerSetDate([startDate, endDate]);
            				dateIpt += _desc+(bSimple?"":(" "+startDate+' \u81F3 '+endDate));
            			}
            			bak.lastDateSeg = bak.finalDateSeg = [startDate, endDate, $('#'+dateSeg[0]).val()];
            			bak.lastField = bak.finalField = dateIpt;
            		}
            		$('.widgetField input[readonly=readonly]',$_datepicker).val(dateIpt);
            		O.cache.set($_datepicker.jId()+"_bak",bak,"widget");
            	}
            	dateIpt = "";
            }
            
        };

        
        if(bSeparate){
        	//TODO
        }else{
        	if(!!paramCfg&&paramCfg!={}){
        		var paramRapid = paramCfg[O.constants.Config.RAPID];
        		if(!!paramRapid){
        			_widthSet(3,$_datepicker.jId());
        			$a.each(function(){
        				if(paramRapid==$(this).attr("desc")){
        					if(!!cfg.rapidSel&&(!!cfg.rapidSel.external||!!cfg.rapidSel.noPicker)){
        						$(this).siblings().removeClass("r-checked");
        						$(this).addClass("r-checked");
        						$(this).find("input:radio").jCheck($(this).is(".r-checked"));
        					}else{
        						$(this).addClass("chosen");
        					}
        					rapidSet($(this).attr("desc"),$(this).attr("val"));
        				}
        			});
        		}
        	}
        }
        //common defined rapid query(type of date)
        $a.unbind("click");
        $a.click(function(){
            if(!!cfg.rapidSel&&(!!cfg.rapidSel.external||!!cfg.rapidSel.noPicker)){
                //快查单选按钮渲染
                $(this).siblings().removeClass("r-checked");
                $(this).addClass("r-checked");
                $(this).find("input:radio").jCheck($(this).is(".r-checked"));
            }else{
                $(".widgetCalendar .quick-chose",$_datepicker).find("a.chosen").removeClass("chosen");
                $(this).addClass("chosen");
            }

            //如果有维度选择，点击快查变换相应的维度模式
            if(cfg.bDimension&&cfg.dimension.bEmbed){
                var $dimensionLi = $('ul li[val="'+$(this).attr("ref")+'"]',$_datepicker);
                if(bSeparate){
                	if($dimensionLi.length>0){
                		$dimensionLi.click();
                	}else{
                		$('ul li:first',$_datepicker).click();
                	}
                }else{
                    $dimensionLi = $dimensionLi.length>0?$dimensionLi:$('ul li:first',$_datepicker);

                    $dimensionLi.addClass("sel").css({"border-right": "0 none"});
                    $dimensionLi.siblings().removeClass("sel");
                    $(".datepicker",$_datepicker).remove();
                	O.multiDatePicker([$.extend(cfg, {View: $dimensionLi.attr("val")})]);
                }
            }

            $(".Calendar .datepickerSelected",$_datepicker).removeClass("datepickerSelected");
            var desc = $(this).attr("desc"),val = $(this).attr("val");
            rapidSet(desc,val);
            if(bSeparate){
            	$("#"+$_datepicker.jId().substring(0,$_datepicker.jId().length-1)+"RapidSel").val(desc);
            }else{
            	$("#"+$_datepicker.jId()+"RapidSel").val(desc);
            }

            if(($.jIsArray(rapid)&&rapid[1])||(!$.jIsArray(rapid)&&rapid)){
            	if(bSeparate){
            		$(".btn.query",$_datepicker.siblings(".queryBtn")).eq(0).click();
            	}else{
            		if($(".btn.query").length==1){
            			$(".btn.query").eq(0).click();
            		}else{
            			$('.widgetCalendar .c-btn .btn',$_datepicker).eq(0).click();
            		}
            	}
            }
        });

        //self defined rapid query(type of !date)
        $selfa.click(function(){
            $(".widgetCalendar .self-quick-chose",$_datepicker).find("a.chosen").removeClass("chosen");
            $(this).addClass("chosen");
        });
    },
    chartExt: {
        addMeanLine: function(_chart, _plotLines, _ids){
            if(_ids){
                for(var i= 0,len=_ids.length;i<len;i++){
                    for(var j in _plotLines){
                        if(_ids[i]==_plotLines[j].id){
                            _chart.yAxis[0].addPlotLine(_plotLines[j]);
                            break;
                        }
                    }
                }
            }else{
                for(var j in _plotLines){
                    _chart.yAxis[0].addPlotLine(_plotLines[j]);
                }
            }
        },
        removeMeanLine: function(_chart, _plotLines, _ids){
            if(_ids){
                for(var i= 0,len=_ids.length;i<len;i++){
                    for(var j in _plotLines){
                        if(_ids[i]==_plotLines[j].id){
                            _chart.yAxis[0].removePlotLine(_plotLines[j].id);
                            break;
                        }
                    }
                }
            }else{
                for(var j in _plotLines){
                    _chart.yAxis[0].removePlotLine(_plotLines[j].id);
                }
            }
        }
    },
    tableExt: {
        /**
         * 加入对比对话框
         * @param _containerId
         * @param _title
         * @param _threshold
         */
        compareLoad: function(_containerId, _title, _threshold){
            $(".popModal",$("#"+_containerId)).remove();
            var buf = [];
            buf.push('<div class="popModal w200 p-a">');
            buf.push('<h1 class="tl">');
            buf.push('<div class="tr">');
            buf.push('<span class="tit">'+_title+'</span>');
            buf.push('<span class="modalClose jqmClose">关闭</span>');
            buf.push('</div>');
            buf.push('</h1>');
            buf.push('<div class="moadalCon">');
            if(_threshold){
                buf.push('<div class="tips warn">');
                if(_threshold[0]&&_threshold[0]){
                    buf.push('至少选择'+_threshold[0]+'、最多选择'+_threshold[1]+'个关键词比对哦！');
                }else{
                    if(_threshold[0]){
                        buf.push('至少选择'+_threshold[0]+'个关键词比对哦！');
                    }
                    if(_threshold[1]){
                        buf.push('最多选择'+_threshold[1]+'个关键词比对哦！');
                    }
                }
                buf.push('</div>');
            }
            buf.push('<table id="'+_containerId+'CompareTbl" class="popup-mini-compare">');
            buf.push('</table>');
            buf.push('</div>');
            buf.push('<div class="modalFooter pb20">');
            buf.push('<input type="button" class="btn-confirm" value="确定">');
            buf.push('</div>');
            buf.push('<div class="bl">');
            buf.push('<div class="br">');
            buf.push('</div>');
            buf.push('</div>');

            $("#"+_containerId).append(buf.join(""));
            $(".popModal .modalClose",$("#"+_containerId)).one("click",function(){
                $(this).closest(".popModal").hide();
            });

            $("a.del",$("#"+_containerId)).die("click").live("click",function(){
                if($(this).attr("cur")){
                    B$.tables[_containerId].fnPageChange(parseInt($(this).attr("cur"))-1);
                }
                var $cur = $('span.fcheckbox[val="'+$(this).attr("val")+'"]',$("#"+_containerId));
                $cur.removeClass("f-checked");
                $(this).closest("tr").remove();
                B$.cache.set("counter",Number(B$.cache.get("counter",_containerId))-1,_containerId);
                $(".popModal",$("#"+_containerId)).css({
                    "left":parseInt($cur.offset().left)-210,
                    "top":(document.documentElement.clientHeight-$(".popModal",$("#"+_containerId)).jHeight())/2
                });
            });
        },
        /**
         * 对比表格动态添加对比行
         * @param _containerId  对比表格所属容器ID
         * @param _dset  [{id: 1,txt: 2},{id: 3, txt: 4}...]
         */
        compareAdd: function(_this, _containerId, _dSet, _ext, _callback){
            var buf = [];
            if($(_this).hasClass("f-checked")){
                if(_dSet){
                    for(var i in _dSet){
                        buf.push('<tr><th>'+_dSet[i].txt+'</th><td><a val="'+_dSet[i].txt+'" class="del"'+(_ext?(' cur="'+_ext.curPage+'"'):'')+' href="javascript: void(0)">删除</a></td></tr>');
                        $("#"+_containerId+"CompareTbl").append(buf.join(""));
                    }
                }
            }else{
                $('.popModal a[val="'+$(_this).attr('val')+'"]',$("#"+_containerId)).closest("tr").remove();
            }
            /*$(".popModal",$("#"+_containerId)).css({
             "left":parseInt($(_this).offset().left)-210,
             "top":$(_this).offset().top-$(document).scrollTop()
             }).show();*/
            $(".popModal",$("#"+_containerId)).css({
                "left":parseInt($(_this).offset().left)-210,
                "top":(document.documentElement.clientHeight-$(".popModal",$("#"+_containerId)).jHeight())/2
            }).show();
            $(".popModal",$("#"+_containerId)).draggable({cursor: "move", containment: "#main", scroll: false});
            $(".popModal .modalClose",$("#"+_containerId)).die("click").live("click",function(){
                $(this).parents(".popModal").hide();
            });

            $(".popModal .btn-confirm",$("#"+_containerId)).die("click").live("click",function(){
                if($('tbody tr',$("#"+_containerId+"CompareTbl")).length>0){
                    if(_callback){
                        _callback();
                    }
                }else{
                    B$.T.warn("至少选择1项！");
                }
            });
        }
    },
    /**
     * 图形增加图例
     * @param _id
     * @param _dis
     */
    legendAdd: function(_id, _dis, _extSettings){
        var O = this, buf = [], barId = _id+"Bar",tmpClick,non = [],
            max = (!!_extSettings?_extSettings.legendMax:0);
        //如果工具条不存在，渲染图形工具条区域
        if(!$.jDomExist(barId)){
            buf.push('<div class="wrap-tools" id="'+barId+'"></div>');
            $(buf.join("")).insertBefore($("#"+_id));

            $("#"+barId).jWidth($("#"+_id)[0].style.width);
            $("#"+barId).jFloat($("#"+_id).jFloat());
        }

        var $bar = $('#'+barId)
            ,bIcoMode = _extSettings&&_extSettings.mode&&_extSettings.mode=="ico"
            ,checkCss,uncheckCss,checkboxCss,legendCss;

        buf = [];
        $("#"+_id+"Legend").remove();

        //判断图例是否ICO风格
        if(bIcoMode){
            checkCss = "nothui",uncheckCss = "hui",checkboxCss = "hc-fc",legendCss = "hc-box";
            buf.push('<div id="'+_id+'Legend" class="'+legendCss+' fl">');
            for(var j=0,len=_dis.length;j<len;j++){
                buf.push('<span class="'+checkboxCss+' fc-'+(j+1)+(!!_dis[j][C$.DATAITEM_CHECKED]?(" "+checkCss):(" "+uncheckCss))+'" idx="'+j+'" id="Legend'+_dis[j][C$.RESULT_ID]+'"><i>&nbsp;</i>'+_dis[j][C$.RESULT_VAL]+'</span>');
                if(!_dis[j][C$.DATAITEM_CHECKED]){
                    non.push(j);
                }
            }
            if(!!_extSettings&&!_extSettings.noTip){
                buf.push('<span class="hc-fc" id="warnMessage_'+_id+'" style="color:red;display:none"><label>最多只能显示'+(!!max?max:len)+'个指标</label></span>');
            }
            buf.push('</div>');
        }else{
        	var radioFlag = max == 1;
            checkCss = radioFlag?"r-checked":"f-checkbox-check",uncheckCss = radioFlag?"r-unchecked":"f-checkbox-uncheck",checkboxCss = radioFlag?"radiobox":"f-checkbox",legendCss = "checkbox-con";
            buf.push('<div id="'+_id+'Legend" class="'+legendCss+' fl mr10">');
            for(var j=0,len=_dis.length;j<len;j++){
                buf.push('<span class="'+checkboxCss+' pointer'+(!!_dis[j][C$.DATAITEM_CHECKED]?(" "+checkCss):(" "+uncheckCss))+'" idx="'+j+'"  id="Legend'+_dis[j][C$.RESULT_ID]+'"></span>');
                buf.push('<span class="f-checkbox-label mr15" for="Legend'+_dis[j][C$.RESULT_ID]+'" style="color: '+ O.constants.Color.P[j]+'">'+_dis[j][C$.RESULT_VAL]+'</span>');
                if(!_dis[j][C$.DATAITEM_CHECKED]){
                    non.push(j);
                }
            }
            if(!!_extSettings&&!_extSettings.noTip){
                buf.push('<span class="warnMessage" style="color:red;display:none"><label>最多只能显示'+(!!max?max:len)+'个指标</label></span>');
            }
            buf.push('</div>');
        }

        /**
         * 判断是否控制平均线
         */
        if(_extSettings&&_extSettings.meanLine){
            buf.push('<div id="'+_id+'Ctrl" class="extCtrl fr">');
            buf.push('<span class="meanLine">');
            if(_extSettings.meanLine.ctrlType==C$.CTRL_TYPE_CHECKBOX){
                buf.push('<input id="'+_id+'CtrlMeanLine" type="checkbox" checked />');
                buf.push('<label for="'+_id+'CtrlMeanLine">显示平均线</label>');
            }else if(_extSettings.meanLine.ctrlType==C$.CTRL_TYPE_LEGEND){
                buf.push('<em></em>');
                buf.push('<label>平均线</label>');
            }
            buf.push('</span>');
            buf.push('</div>');
        }

        $("#"+barId).append(buf.join(""));
        $("#"+barId).jHeight(Number($('#'+_id+'Legend').jHeight()));
        $("#"+barId).css({"line-height":$("#"+barId).jHeight()+"px"});
        if(non.length==_dis.length){
            non = [];
        }

        //判断是否单选，如果单选并且自定义函数渲染，则渲染数据时只产生1个数据项，所以勿初始化
        if(!_extSettings||(!!_extSettings&&!_extSettings.event)){
            for(var i=0,len=non.length;i<len;i++){
                O.showSeries(non[i], false, _id);
            }
        }

        /**
         * 判断是否禁用图例的点击
         */
        if(_extSettings&&_extSettings.noClick){
            //图例选项绑定点击事件
            $("span."+checkboxCss,$bar).each(function(){
                $(this).addClass("noClick");
            });
        }else{
            //图例选项绑定点击事件
            $("span."+checkboxCss,$bar).unbind('click');
            $("span."+checkboxCss,$bar).click(function(){
                var div = $(this).closest("."+legendCss).jId().replace("Legend","");
                O.extLegendEvent(this,div,$(this).attr("idx"),!!max?max:$("span."+checkboxCss,$bar).length,_extSettings);
            });
        }

        /**
         * 判断是否加载平均线的控制
         */
        if(_extSettings&&_extSettings.meanLine){
            //初始化当前显示指标的平均线
            $("span.hc-fc").each(function(){
                if($(this).hasClass("hui")){
                    O.chartExt.removeMeanLine(O.charts[_id], B$.cache.get("meanLine",_id), ["MeanLine"+$(this).jId().replace("Legend","")]);
                }
            });
            //平均线控制添加出发事件
            if(_extSettings.meanLine.ctrlType==C$.CTRL_TYPE_CHECKBOX){
                $("span.meanLine",$("#"+_id+"Ctrl")).find("input:checkbox").unbind("click").bind("click", function(){
                    var ids = [];
                    $("span."+checkboxCss).each(function(){
                        if($(this).hasClass(checkCss)){
                            ids.push("MeanLine"+$(this).jId().replace("Legend",""));
                        }
                    });
                    if($(this)[0].checked){
                        O.chartExt.addMeanLine(O.charts[_id], B$.cache.get("meanLine",_id), ids);
                    }else{
                        O.chartExt.removeMeanLine(O.charts[_id], B$.cache.get("meanLine",_id), ids);
                    }
                });
            }else if(_extSettings.meanLine.ctrlType==C$.CTRL_TYPE_LEGEND){
                $("span.meanLine",$("#"+_id+"Ctrl")).unbind("click").bind("click", function(){
                    $(this).toggleClass("disable");
                    var ids = [];
                    $("span."+checkboxCss).each(function(){
                        if($(this).hasClass(uncheckCss)){
                            ids.push("MeanLine"+$(this).jId().replace("Legend",""));
                        }
                    });
                    if($(this).hasClass("disable")){
                        O.chartExt.removeMeanLine(O.charts[_id], B$.cache.get("meanLine",_id), ids);
                    }else{
                        O.chartExt.addMeanLine(O.charts[_id], B$.cache.get("meanLine",_id), ids);
                    }
                });
            }
        }
    },
    loadLegend: function(){
        var O = this,cfg = O.legendCfg;
        if(!!cfg&&cfg[O.constants.Config.ENABLE]){
            $(cfg[O.constants.Config.DIV]).each(function(i,n){
                if($("#"+n).length){
                    //遍历config.Chart取指标
                    $(O.chartCfg).each(function(index,node){
                        if(node[O.constants.Config.DIV]==$("#"+n).attr("be")){
                            if(node.mode=="ico"){
                                //如果chart中设置了LegendNotReload:true,则reload的时候不重新加载
                                if(node["LegendNotReload"]&&$("#"+n+" span").length>0){
                                    //do nothing
                                }else{
                                    var content = [], tmpClick;
                                    $(node[O.constants.Config.ZB]).each(function(j,elem){
                                        if(!!node.ExtFunc){
                                            tmpClick = 'B$.addClassOfHui(this,\''+node[O.constants.Config.DIV]+'\','+j+','+node[O.constants.Config.MAXDISPLAY]+',\''+node.ExtFunc+'\')';
                                        }else{
                                            tmpClick = 'B$.addClassOfHui(this,\''+node[O.constants.Config.DIV]+'\','+j+','+node[O.constants.Config.MAXDISPLAY]+')';
                                        }
                                        if(elem[2]==undefined || elem[2]==true){
                                            content.push('<span class="hc-fc fc-'+(j+1)+' nothui" id="'+O.constants.Config.LEGEND+elem[0]+'" onclick="'+tmpClick+'"><i>&nbsp;</i>'+elem[1]+'</span>');
                                        }else{
                                            content.push('<span class="hc-fc fc-'+(j+1)+' hui" id="'+O.constants.Config.LEGEND+elem[0]+'" onclick="'+tmpClick+'"><i>&nbsp;</i>'+elem[1]+'</span>');
                                        }
                                    });
                                    content.push('<span class="hc-fc" id="warnMessage_'+node[O.constants.Config.DIV]+'" style="color:red;display:none"><label>最多只能显示'+node[O.constants.Config.MAXDISPLAY]+'个指标</label></span>');
                                    $("#"+n).html(content.join(""));
                                }
                            }else{
                                //如果chart中设置了LegendNotReload:true,则reload的时候不重新加载
                                if(node["LegendNotReload"]&&$("#"+n+" span").length>0){
                                    //do nothing
                                }else{
                                    var content = [], tmpClick;
                                    content.push('<div class="checkbox-con fl mr10">');
                                    $(node[O.constants.Config.ZB]).each(function(j,elem){
                                        if(node.ExtFunc){
                                            tmpClick = 'B$.legendCheck(this,\''+n+'\','+j+','+node[O.constants.Config.MAXDISPLAY]+',\''+node.ExtFunc+'\')';
                                        }else{
                                            tmpClick = 'B$.legendCheck(this,\''+n+'\','+j+','+node[O.constants.Config.MAXDISPLAY]+')';
                                        }
                                        if(elem[2]==undefined || elem[2]==true){
                                            content.push('<span class="f-checkbox-check pointer" id="'+O.constants.Config.LEGEND+elem[0]+'" onclick="'+tmpClick+'"></span>');
                                        }else{
                                            content.push('<span class="f-checkbox-uncheck pointer" id="'+O.constants.Config.LEGEND+elem[0]+'" onclick="'+tmpClick+'"></span>');
                                        }
                                        content.push('<span class="f-checkbox-label mr15" for="'+O.constants.Config.LEGEND+elem[0]+'" style="color: '+ O.constants.Color.P[j]+'">'+elem[1]+'</span>');
                                    });
                                    content.push('<span class="warnMessage" style="margin-left: 10px; vertical-align: middle; display: none; color: #ff0000"><label>最多只能显示'+node[O.constants.Config.MAXDISPLAY]+'个指标</label></span>');
                                    content.push('</div>');
                                    $("#"+n).html(content.join(""));
                                }
                            }
                        }
                    });
                }
            });
        }

    },
    cleanLegend:function(){
        var O = this,cfg = O.legendCfg;
        if(!!cfg&&cfg[O.constants.Config.ENABLE]){
            $(cfg[O.constants.Config.DIV]).each(function(i,n){
                if($("#"+n).length){
                    //遍历config.Chart取指标
                    $(O.chartCfg).each(function(index,node){
                        if(node[O.constants.Config.DIV]==$("#"+n).attr("be")){
                            //如果chart中设置了LegendNotReload:true,则加载的时候清理该div
                            if(node["LegendNotReload"]){
                                $("#"+n).html("");
                            }
                        }
                    });
                }
            });
        }
    },
    /**
     * ico模式交互的图例
     * @param obj
     * @param _div
     * @param _index
     * @param _display
     * @param _extFunc
     */
    addClassOfHui:function(obj,_div,_index,_display, _extFunc){
        var O = this;
        //如果设置了maxDisplay属性,那么图表只显示该数目的指标
        if($(obj).hasClass("hui") && $(obj).siblings(".nothui").length >= _display){
            $("#warnMessage_"+_div).css("display","inline");
        }else{
            $("#warnMessage_"+_div).css("display","none");
            //$(obj).hasClass("hui")?$(obj).removeClass("hui").addClass("nothui"):$(obj).addClass("hui").removeClass("nothui");
            var flag=true;
            if($(obj).hasClass("hui")){
                $(obj).removeClass("hui").addClass("nothui");
            }else{
                $(obj).addClass("hui").removeClass("nothui");
                flag=false;
            }
            this.showSeries(_index,flag,_div);
        }

        if(!!_extFunc){
            setTimeout(
                function(){
                    for(var i=0,funcs=_extFunc.split(","),len=funcs.length;i<len;i++){
                        eval(funcs[i])(obj);
                    }
                },500
            );
        }
    },
    /**
     * checkbox模式交互的图例
     * @param _this
     * @param _legendId
     * @param _index
     * @param _max
     * @param _extFunc
     */
    legendCheck: function(_this,_legendId,_index,_max,_extFunc){
        var O = this,containerId = $("#"+_legendId).attr("be"),$legend = $("#"+_legendId);
        //如果设置了maxDisplay属性,那么图表只显示该数目的指标
        if($(_this).hasClass("f-checkbox-uncheck")&&$(_this).siblings(".f-checkbox-check").length >= _max){
            $(".warnMessage", $legend).css("display","inline-block");
        }else{
            $(".warnMessage", $legend).css("display","none");
            var flag = true;
            if($(_this).hasClass("f-checkbox-uncheck")){
                $(_this).removeClass("f-checkbox-uncheck").addClass("f-checkbox-check");
            }else{
                $(_this).addClass("f-checkbox-uncheck").removeClass("f-checkbox-check");
                flag = false;
            }
            this.showSeries(_index, flag,containerId);
        }

        if(_extFunc){
            setTimeout(
                function(){
                    for(var i=0,funcs=_extFunc.split(","),len=funcs.length;i<len;i++){
                        eval(funcs[i])(_this);
                    }
                },500
            );
        }
    },
    extLegendEvent:function(obj,_div,_index,_max,_extSettings){
        var O = this
            ,bIcoMode = _extSettings&&_extSettings.mode&&_extSettings.mode=="ico"
            ,$curLegend = $("#"+_div+"Legend")
            ,checkCss,uncheckCss,checkboxCss,legendCss;
        var radioFlag = !!_extSettings&&_extSettings.legendMax==1 ;
        if(bIcoMode){
            checkCss = "nothui",uncheckCss = "hui",checkboxCss = "hc-fc",legendCss = "hc-box";
        }else{
            checkCss = radioFlag?"r-checked":"f-checkbox-check",uncheckCss = radioFlag?"r-unchecked":"f-checkbox-uncheck",checkboxCss = radioFlag?"radiobox":"f-checkbox",legendCss = "checkbox-con";
        }
        if(!!_extSettings&&_extSettings.legendMax==1){
            if(!!_extSettings.event){
                $(obj).removeClass(uncheckCss).addClass(checkCss);
                $(obj).siblings("."+checkCss).removeClass(checkCss).addClass(uncheckCss);
                if(!!_extSettings&&!!_extSettings.event){
                    var params = [];
                    $("span."+checkCss, $curLegend).each(function(){
                        params.push($(this).jId().replace("Legend",""));
                    });
                    eval(_extSettings.event+"(params)");
                }
            }else{
                $(obj).siblings("."+checkCss).each(function(){
                    O.showSeries($(this).attr("idx"),false,_div);
                });
                $(obj).siblings("."+checkCss).removeClass(checkCss).addClass(uncheckCss);
                O.showSeries($(obj).attr("idx"),true,_div);
                $(obj).removeClass(uncheckCss).addClass(checkCss);
            }
        }else{
            //如果设置了maxDisplay属性,那么图表只显示该数目的指标
            if($(obj).hasClass(uncheckCss) && $(obj).siblings("."+checkCss).length >= _max){
                if(!!_extSettings&&!!_extSettings.noTip){
                    //TODO
                }else{
                    $(".warnMessage",$curLegend).css("display","inline");
                }
            }else{
                if(!!_extSettings&&!!_extSettings.noTip){
                    //TODO
                }else{
                    $(".warnMessage",$curLegend).css("display","none");
                }
                var flag=true;
                if($(obj).hasClass(uncheckCss)){
                    $(obj).removeClass(uncheckCss).addClass(checkCss);
                }else{
                    $(obj).addClass(uncheckCss).removeClass(checkCss);
                    flag=false;
                }
                O.showSeries(_index,flag,_div);

                //控制平均线的显示
                var bMeanLine = false;
                if(_extSettings&&_extSettings.meanLine){
                    if(_extSettings.meanLine.ctrlType==C$.CTRL_TYPE_CHECKBOX){
                        bMeanLine = $("span.meanLine",$("#"+_div+"Bar")).find("input:checkbox")[0].checked;
                    }else if(_extSettings.meanLine.ctrlType==C$.CTRL_TYPE_LEGEND){
                        bMeanLine = !$("span.meanLine",$("#"+_div+"Bar")).hasClass("disable");
                    }
                }
                if(flag&&bMeanLine){
                    O.chartExt.addMeanLine(O.charts[_div], B$.cache.get("meanLine",_div), ["MeanLine"+$(obj).jId().replace("Legend","")]);
                }else{
                    O.chartExt.removeMeanLine(O.charts[_div], B$.cache.get("meanLine",_div), ["MeanLine"+$(obj).jId().replace("Legend","")]);
                }
            }
        }
    },
    T: {
        alert: function(_content){
            jqm.alert({
                w:260,
                title:' ',
                type:'warning',
                content:'<div>'+(!!_content?_content:"")+'</div>',
                onConfirm:function(){
                    alert("删除操作");//this 指向触发的a标签
                }
            });
        },
        popUp: function(_title,_content){
            jqm.popUp({
                w:840,
                title:!!_title?_title:" ",
                type:'warning',
                content:'<div>'+(!!_content?_content:"")+'</div>',
                onConfirm: function(){
                    //TODO
                }
            });
        },
        warn: function(_content){
            jqm.alert({
                w:260,
                title:' ',
                type:'warning',
                content:'<div>'+(!!_content?_content:"")+'</div>',
                onConfirm: function(){
                    //TODO
                }
            });
        },
        confirm: function(_content, _exec){
            jqm.confirm({
                w:350,
                title:'提示信息',
                type:'warning',//有warning 和  attention 两种
                content:'<div>'+(!!_content?_content:"")+'</div>',
                onConfirm:function(){
                    if(!!_exec){
                        _exec();
                    }
                }
            });
        },
        success: function(_content){
            jqm.msg({
                w:300,
                type:"success",
                title:'成功提示',
                content:'<div>'+(!!_content?_content:"")+'</div>'
            });
        },
        full: function(_content){
            jqm.full({
                type:"success",
                closeClass: "fullClose",
                title:'成功提示',
                content:'<div>'+(!!_content?_content:"")+'</div>'
            });
        }
    }
};
var B$ = new Base("基础类");

/*
 * buttonSlider
 */
function buttonSlider(o){
    this.o = $(o);
}

buttonSlider.prototype={
    init:function(){
        var _this = this,timer;

        /*
         * click the event
         */
//		$('dt',this.o).bind('click',function(){
//			$(document).unbind('click',_this.hide);
//			setTimeout(function(){
//				_this.show();
//			});
//			$(document).bind('click',_this.hide);
//		});
//		$('dd',this.o)
//		.bind('mouseenter',function(){
//			$(document).unbind('click',_this.hide);
//		})
//		.bind('mouseleave',function(){
//			$(document).bind('click',_this.hide);
//		});

        /*
         * mouseover/mouseout the event
         */
        $('dt',this.o).unbind("mouseover");
        $('dt',this.o).unbind("mouseout");
        $('dt',this.o).bind('mouseover',function(){
            _this.show();
        }).bind('mouseout',function(){
                var bOver = false;
                $('dd',this.o).unbind("mouseover");
                $('dd',this.o).unbind("mouseout");
                $('dd',this.o).bind('mouseover',function(){
                    _this.show();
                    bOver = true;
                }).bind('mouseout',function(){
                        _this.hide();
                    });
                if(!bOver){
                    _this.hide();
                }
            });
    },
    show:function(){
        $('dl',this.o).addClass('on');
        $('dd',this.o).show();
    },
    hide:function(){
        $('dl',this.o).removeClass('on');
        $('dd',this.o).hide();
    }
};

/*
 * keyInput
 */
function keyInput(o){
    this.o=$(o);
}
keyInput.prototype={
    init:function () {
        var _this = this, o = _this.o,tip = o.attr('title'),val = o.val();
        _this.o[val === tip?'addClass':'removeClass']('ks-no');
        this.o.bind('focus', function () {
            _this.removeInputTip();
        });
        this.o.bind('blur', function () {
            _this.addInputTip();
        });
    },
    addInputTip:function () {
        var o = this.o,tip = o.attr('title'),val = o.val();
        if (val === '') {
            o.val(tip);
            o.addClass('ks-no');
        }
    },
    removeInputTip:function () {
        var o = this.o,tip = o.attr('title'),val = o.val();
        if (val === tip) {
            o.val('');
            o.removeClass('ks-no');
        }
    }
};


/*
 * Grid slider
 */
function gridSlider(o,opts){
    this.o = $(o);
    this.opts = $.extend(this.def,opts);
}
gridSlider.prototype={
    def:{
        step:2,
        disClass:'disabled',
        time:250,
        lastMl: 0,
        lastI: 0
    },
    init:function(){
        this.cache={
            i:(!!this.opts.lastI?this.opts.lastI:0),
            grid:$('.dataTable',this.o),
            boxW:this.o.outerWidth(),
            tableW:$('.dataTable',this.o).outerWidth(),
            rows:[],
            ml:this.opts.lastMl,
            lastMl: this.opts.lastMl
        };
        var _this = this, _c = _this.cache, tw = 0;
        $('.dataTable tr:first th',_this.o).each(function(i){
            var _j = Math.floor(i/_this.opts.step);
            if(_c.rows[_j]==undefined) _c.rows[_j] = 0;
            _c.rows[_j]+=$(this).outerWidth();
            tw+=$(this).outerWidth();
        });
        if(tw<=_c.boxW){
            $('.gt-l',this.o).addClass(_this.opts.disClass);
            $('.gt-r',this.o).addClass(_this.opts.disClass);
        }else{
            if((_c.boxW-Number(_c.lastMl)-_c.tableW)>=0){
                $('.gt-r',this.o).addClass(_this.opts.disClass);
            }else{
                $('.gt-r',this.o).removeClass(_this.opts.disClass);
            }
            if(Number(_c.lastMl)>=0){
                $('.gt-l',this.o).addClass(_this.opts.disClass);
            }else{
                $('.gt-l',this.o).removeClass(_this.opts.disClass);
            }
        }
        $('.gt-l',this.o).unbind('click');
        $('.gt-l',this.o).bind('click',function(){
            _this.slideL();
        });
        $('.gt-r',this.o).unbind('click');
        $('.gt-r',this.o).bind('click',function(){
            _this.slideR();
        });
        $(window).bind('resize',function(){
            _this.resize();
        });

        _c.grid.css({
            "margin-left":_c.lastMl+"px"
        });
        _c.ml = -_c.lastMl;
    },
    slideR:function(){
        var _this = this, _c = this.cache, _sl = 0;
        if((_c.ml-_c.tableW+_c.boxW)>=0){
            $('.gt-r',_this.o).addClass(_this.opts.disClass);
            return false;
        }
        else{
            if((_c.ml+_c.rows[_c.i])>=(_c.tableW-_c.boxW)){
                _c.ml=_c.tableW-_c.boxW;
                $('.gt-r',_this.o).addClass(_this.opts.disClass);
            }
            else{
                _c.ml+=_c.rows[_c.i];
            }
            _c.grid.animate({
                "margin-left":-_c.ml
            }, _this.opts.time );
            _c.i++;
            $('.gt-l',_this.o).removeClass(_this.opts.disClass);
        }
    },
    slideL:function(){
        var _this = this, _c = this.cache;
        if(_c.ml<=0){
            $('.gt-l',_this.o).addClass(_this.opts.disClass);
            return false;
        }else{
            _c.i--;
            if((_c.ml-_c.rows[_c.i])<=0){
                _c.ml=0;
            }
            else{
                _c.ml-=_c.rows[_c.i];
            }
            _c.grid.animate({
                "margin-left":-_c.ml
            }, _this.opts.time,function(){
            } );
            $('.gt-r',_this.o).removeClass(_this.opts.disClass);
        }
    },
    resize:function(){
        var _this = this, _c = this.cache;
        _this.cache.boxW=_this.o.width();
        if(_c.ml>=0&&(_c.ml+_c.boxW)>=_c.tableW){
            _c.ml=(_c.tableW-_c.boxW)>0?(_c.tableW-_c.boxW):(_c.i=0);
            _c.grid.css({
                "margin-left":-_c.ml
            });
        }
        $('.gt-l',this.o)[_c.ml>0?'removeClass':'addClass'](_this.opts.disClass);
        $('.gt-r',this.o)[(_c.ml+_c.boxW)>=_c.tableW?'addClass':'removeClass'](_this.opts.disClass);
    }
};

/*
 * Graph slider
 */
function graphSlider(o,opts){
    this.o = $(o);
    this.p = $(o).parent();
    this.opts = $.extend(this.def,opts);
}
graphSlider.prototype={
    def:{
        curpage: 1,
        perpage: 4,
        width: 4000,
        speed: "slow"     //normal,fast
    },
    init:function(){
        var _this = this, $o = _this.o, $p = _this.p,  _def = _this.def;
        var overLeft = [];overRight = [];
        overLeft.push('<div class="graphOverLeft">');
        overLeft.push('<div class="graphLeft">');
        overLeft.push('<span>');
        overLeft.push('<a onfocus="this.blur()" href="javascript:void(0);"></a>');
        overLeft.push('</span>');
        overLeft.push('</div>');
        overLeft.push('</div>');
        overRight.push('<div class="graphOverRight">');
        overRight.push('<div class="graphRight">');
        overRight.push('<span>');
        overRight.push('<a onfocus="this.blur()" href="javascript:void(0);"></a>');
        overRight.push('</span>');
        overRight.push('</div>');
        overRight.push('</div>');
        $o.wrap('<div class="graphMain"></div>').parent().before(overLeft.join("")).after(overRight.join(""));

        $o.css({"width": _def.width+"px", "position": "relative"});

        $('.graphOverLeft', $p).mouseover(function(){
            $('.graphLeft', $p).show();
        }).mouseout(function(){
                $('.graphLeft', $p).hide();
            });

        $('.graphOverRight', $p).mouseover(function(){
            $('.graphRight', $p).show();
        }).mouseout(function(){
                $('.graphRight', $p).hide();
            });

        _this.slideL();
        _this.slideR();
    },
    slideR:function(){
        var _this = this, _sl = 0;
        $('.graphRight > span', _this.p).click(function(){
            var perpage = _this.def.perpage,perwidth = _this.o.parent().width(),len = $('li',_this.o).length,pages = Math.ceil(len/perpage),speed=_this.def.speed;
            if(!_this.o.is(":animated") ){
                if(_this.def.curpage==pages){
                    _this.o.animate({left:'0px'},speed);
                    _this.def.curpage = 1;
                }else{
                    _this.o.animate({left:'-='+perwidth},speed);
                    _this.def.curpage++;
                }
            }
        });

    },
    slideL:function(){
        var _this = this, _c = this.cache;
        $('.graphLeft > span', _this.p).click(function(){
            var perpage = _this.def.perpage,perwidth = _this.o.parent().width(),len = $('li',_this.o).length,pages = Math.ceil(len/perpage),speed=_this.def.speed;
            if(!_this.o.is(":animated") ){
                if(_this.def.curpage == 1){
                    _this.o.animate({left: '-='+perwidth*(pages-1)},speed);
                    _this.def.curpage = pages;
                }else{
                    _this.o.animate({left:'+='+perwidth},speed);
                    _this.def.curpage--;
                }
            }
        });
    }
};

/**
 * col drag for table
 */
function colDrag(o){
    this.o = $(o);
}

colDrag.prototype={
    current: null,
    func: null,
    init: function(){
        var O = this;
        $('.dataTable tr:first th',O.o).each(function(){
            var $th = $(this);
            if($.jIsIE(7)){
                $(this).html('<label class="fl">'+$(this).html()+'</label><div class="resizeBar">&nbsp;</div>');
                $(this).css({"padding-left": $(this).width()/2+"px"})
            }else{
                $(this).append('<div class="resizeBar">&nbsp;</div>');
            }
            $(this).find(".resizeBar").mousedown(function(e){
                O.mouseDown(e);
            });
            $(this).find(".resizeBar").click(function(){
                return false;
            });
        });
        $(document).mousemove(function(e){
            O.mouseMove(e);
        }).mouseup(function(e){
                O.mouseUp();
            });
    },
    mouseDown: function(e){
        var O = this;
        O.current = e.target;
        O.current.mouseDownX = e.clientX;
        O.current.parentTdW = O.current.parentNode.offsetWidth;
        O.current.parentTblW = O.current.parentNode.offsetParent.offsetWidth;
        if(O.current.setCapture){
            O.current.setCapture();
        }else{
            e.preventDefault();
        }
    },
    mouseMove: function(e){
        var O = this;
        if(!O.current){
            return ;
        }
        if(!O.current.mouseDownX){
            return ;
        }
        var newWidth = O.current.parentTdW*1+e.clientX*1-O.current.mouseDownX;
        if(newWidth>100){
            //change current th width
            $(O.current.parentNode).css({"width": newWidth});
            //change table width
//			$(O.current.parentNode.offsetParent).css({"width": obj.parentTblW*1+e.clientX*1-obj.mouseDownX});	
        }else{
            return;
        }
    },
    mouseUp: function(){
        var O = this;
        if(!O.current){
            return;
        }
        if (O.current.releaseCapture){
            O.current.releaseCapture();
        }
        O.current = null;
    }
};

/**
 * drop down for textarea
 * @param o
 * @param opts
 * @returns {multipEdit}
 */
function multipEdit(o,opts){
    this.o = $(o);
}
multipEdit.prototype={
    init:function(){
        var _this = this;
        $('textarea',this.o).unbind('focus');
        $('textarea',this.o).unbind('blur');
        $('textarea',this.o)
            .bind('focus',function(){
                _this.show();
            })
            .bind('blur',function(){
                _this.hide();
            });
        $('.txt>span',this.o).unbind('click');
        $('.txt>span',this.o).bind('click', function(){
            _this.clear();
        });
//		$('.ft-l',this.o)
//		.bind('click',function(){
//			$('textarea',_this.o).focus();
//		});
        var content = $('textarea',this.o).val(),$txt = $('.f-txt',this.o),$con = $('.f-con',this.o),cons = content.split("\n");
        if(content!=''){
            $txt.text($txt.attr('title'));
        }else{
            $txt.text('多行输入');
        }
        if(cons.length>2){
            $con.text(cons.slice(0,2).join(",")+" ...");
        }else{
            $con.text(cons.join(","));
        }
    },
    show:function(){
        $('.fa-con',this.o).removeClass('off').animate({
            "height":102
        });
    },
    hide:function(){
        $('.fa-con',this.o).addClass('off').animate({
            "height": 28
        });
        var content = $('textarea',this.o).val(),$txt = $('.f-txt',this.o),$con = $('.f-con',this.o),cons = content.split("\n");
        if(content!=''){
            $txt.text($txt.attr('title'));
        }else{
            $txt.text('多行输入');
        }
        if(cons.length>2){
            $con.text(cons.slice(0,2).join(",")+" ...");
        }else{
            $con.text(cons.join(","));
        }
    },
    clear: function(){
        $('textarea',this.o).val("");
        $('.f-con',this.o).text("");
        $('.f-txt',this.o).text('多行输入');
    }
};

/**
 * drop down for input
 * @param o
 * @param opts
 * @returns {completeInput}
 */
function completeInput(o,opts){
    this.o = $(o);
}
completeInput.prototype={
    init:function(){
        var _this = this,_show, _hide;
        _show = function(){
            $(document).bind('click',_hide);
            setTimeout(function(){
                $('.fa-con',_this.o).slideDown();
            },200);
        };
        _hide = function(){
            $('.fa-con',_this.o).slideUp();
            $(document).unbind('click',_hide);
        };

        $('input',this.o)
            .bind('focus',_show)
            .bind('blur',_hide);

        $('.ft-l',this.o)
            .bind('click',function(){
                $('input',_this.o).focus();
            });

        $('.ft-m',this.o)
            .bind('mouseenter',function(){
                $('input',this.o).unbind('blur',_hide);
                $(document).unbind('click',_hide);
            })
            .bind('mouseleave',function(){
                $('input',this.o).bind('blur',_hide);
                $(document).bind('click',_hide);
            });


        $('.fa-con li',this.o)
            .bind('click',function(){
                $('input',_this.o).val($(this).text());
            });
    }/*,
     show:function(){
     var _this = this;
     return function(){
     $('.fa-con',_this.o).slideDown();
     }
     },
     hide:function(){
     var _this = this;
     return function(){
     $('.fa-con',_this.o).slideUp();
     $(document).bind('click',_hide);
     }
     }*/
};
/**
 * pop message box
 * @param o
 * @param opts
 * @returns {mBox}
 */
function mBox(o,opts){
    this.o = $(o);
    this.p = this.o.parent();
    this.opts = $.extend(this.def,opts);
}
mBox.prototype={
    def: {
        write: false,
        content: "请输入内容"
    },
    init:function(){
        var _this = this,_cancel,box = [],bWrite=!!_this.def.write,func;
        _cancel = function(){
            $('.mBox', _this.p).eq(0).remove();
        };
        _cancel();

        box.push('<div class="mBox">');
        box.push('<div class="arrow"></div>');
        if(bWrite){
            box.push('<div class="cont">');
            box.push('<textarea class="area">'+_this.def.content+'</textarea>');
            box.push('</div>');
            box.push('<div class="c-btn">');
            box.push('<a class="btn submit" href="javascript:void(0);">提交</a>');
            box.push('<a class="btn cancel" href="javascript:void(0);">取消</a>');
            box.push('</div>');
        }else{
            box.push('<div class="cont">');
            box.push(_this.def.content);
            box.push('</div>');
        }
        box.push('</div>');
        _this.o.after(box.join(""));

        if(bWrite){
            $('.mBox .c-btn .cancel', _this.p).bind('click', function(){
                func = _this.def.cancel;
                if(func){
                    func();
                }
                _cancel();
            });

            $('.mBox .c-btn .submit', _this.p).bind('click', function(){
                func = _this.def.submit;
                if(func){
                    func();
                }
                _cancel();
            });

            var $text = $('.mBox .area', _this.p);
            $text.focus(function(){
                if($text.val()=="请输入内容"){
                    $text.val("");
                    $text.css({"color": "#000000"});
                }
            }).blur(function(){
                    if($text.val()==""){
                        $text.val("请输入内容");
                        $text.css({"color": "#aaaaaa"});
                    }
                });
        }
    }
};

/*
 * fakeSelect
 */
function fakeSelect(o, opts){
    this.o = $(o);
    if(!!opts){
        this.def = {
            type: "single"
            ,style: "colorize"
        }
        this.opts = $.extend(this.def,opts);
    }
}
fakeSelect.prototype={
    def:{
        type: "single"    //single
        ,style: "colorize"  //checkbox
//		,initial: [1,3,5]
//      ,width: 30
//      ,event: "test"     //点击事件
    },
    init: function(){
        var _this = this;
        if(_this.def.bFilter){
            _this.initFilterSel();
        }else{
            _this.initSel();
        }
    },
    initSel: function(){
        var _this = this,_hide = this.hide(this),func;
        var bMulti = (_this.def.type=="multiple"),bColor = (_this.def.style=="colorize"),bCheckBox = (_this.def.style=="checkbox");
        var initials = _this.def.initial,tmpVal="",tmpTxt="";
        if(bMulti){
            if(bColor){
                if(!!initials&&$.jIsArray(initials)){
                    for(var i=0,len=initials.length;i<len;i++){
                        $('ul li[enable!="false"] span[value="'+initials[i]+'"]',this.o).closest("a").addClass('sel');
                        if(i>0){
                            tmpVal += ",",tmpTxt += ",";
                        }
                        tmpVal += $('ul li[enable!="false"] span[value="'+initials[i]+'"]',this.o).attr("value");
                        tmpTxt += $('ul li[enable!="false"] span[value="'+initials[i]+'"]',this.o).text();
                    }
                }else{
                    $('ul li[enable!="false"]:first a',this.o).addClass('sel');
                    tmpTxt = $('ul li[enable!="false"]:first span',this.o).text(),tmpTxt = !!tmpTxt?tmpTxt:"请选择";
                    tmpVal = $('ul li[enable!="false"]:first span',this.o).attr("value");
                }
            }else if(bCheckBox){
                if(!!initials&&$.jIsArray(initials)){
                    for(var i=0,len=initials.length;i<len;i++){
                        $('ul li[enable!="false"] span[value="'+initials[i]+'"]',this.o).prev(".fcheckbox").addClass('f-checked');
                        if(i>0){
                            tmpVal += ",",tmpTxt += ",";
                        }
                        tmpVal += $('ul li[enable!="false"] span[value="'+initials[i]+'"]',this.o).attr("value");
                        tmpTxt += $('ul li[enable!="false"] span[value="'+initials[i]+'"]',this.o).text();
                    }
                }else{
                    $('ul li[enable!="false"]:first .fcheckbox',this.o).addClass('f-checked');
                    tmpTxt = $('ul li[enable!="false"]:first span',this.o).text(),tmpTxt = !!tmpTxt?tmpTxt:"请选择";
                    tmpVal = $('ul li[enable!="false"]:first span',this.o).attr("value");
                }
            }
        }else{
            if(!!initials&&!$.jIsArray(initials)){
                if(bColor){
                    $('ul li[enable!="false"] span[value="'+initials+'"]',this.o).closest("a").addClass('sel');
                }else if(bCheckBox){
                    $('ul li[enable!="false"] span[value="'+initials+'"]',this.o).prev(".fcheckbox").addClass('f-checked');
                }
                tmpVal = $('ul li[enable!="false"] span[value="'+initials+'"]',this.o).attr("value");
                tmpTxt = $('ul li[enable!="false"] span[value="'+initials+'"]',this.o).text();
            }else{
                if(bColor){
                    $('ul li[enable!="false"]:first a',this.o).addClass('sel');
                }else if(bCheckBox){
                    $('ul li[enable!="false"]:first .fcheckbox',this.o).addClass('f-checked');
                }
                tmpTxt = $('ul li[enable!="false"]:first span',this.o).text(),tmpTxt = !!tmpTxt?tmpTxt:"请选择";
                tmpVal = $('ul li[enable!="false"]:first span',this.o).attr("value");
            }
        }
        $('input[type!="hidden"]:not(.checkbox)',this.o).val(tmpTxt);
        $('input[type!="hidden"]:not(.checkbox)',this.o).attr("val",tmpVal);
        $('#'+$('input[type!="hidden"]:not(.checkbox)',_this.o).attr("re")).val(tmpVal);
        $("ul li[enable='false']",this.o).find("span").css("color","#dddddd");

        $('i',this.o).unbind('click');
        $('i',this.o).bind('click',function(){
            $('ul',_this.o).slideToggle();
        });
        $('input[type!="hidden"]:not(.checkbox)',this.o).unbind('click');
        $('input[type!="hidden"]:not(.checkbox)',this.o).bind('click',function(){
            $('ul',_this.o).slideToggle();
        });
        $(this.o)
            .bind('mouseenter',function(){
                $(document).unbind('click',_hide);
            })
            .bind('mouseleave',function(){
                $(document).bind('click',_hide);
            });
        $('li',this.o).bind('click',function(){
            if($(this).attr("enable")=="false"){
                return;
            }
            if(bMulti){
                var tmpTxt=[],tmpVal=[];
                if(bColor){
                    $('a',$(this)).toggleClass("sel");
                    var $as = $("li > a.sel",_this.o);
                    for(var i=0,len=$as.length;i<len;i++){
                        tmpTxt.push($as.eq(i).find("span").eq(0).text());
                        tmpVal.push($as.eq(i).find("span").eq(0).attr("value"));
                    }
                    $('input[type!="hidden"]:not(.checkbox)',_this.o).val(tmpTxt.join(","));
                    $('#'+$('input[type!="hidden"]:not(.checkbox)',_this.o).attr("re")).val(tmpVal.join(","));
                }else if(bCheckBox){
                    $('.fcheckbox',$(this)).toggleClass("f-checked");
                    var $chks = $("li > a .fcheckbox.f-checked",_this.o);
                    for(var i=0,len=$chks.length;i<len;i++){
                        tmpTxt.push($chks.eq(i).siblings("span").eq(0).text());
                        tmpVal.push($chks.eq(i).siblings("span").eq(0).attr("value"));
                    }
                    $('input[type!="hidden"]:not(.checkbox)',_this.o).val(tmpTxt.join(","));
                    $('#'+$('input[type!="hidden"]:not(.checkbox)',_this.o).attr("re")).val(tmpVal.join(","));
                }
            }else{
                if(bColor){
                    $('a.sel',_this.o).removeClass("sel");
                    $('a',$(this)).addClass("sel");
                    $('input[type!="hidden"]:not(.checkbox)',_this.o).val($(this).find("span").eq(0).text());
                    $('input[type!="hidden"]:not(.checkbox)',_this.o).attr("val",$(this).find("span").eq(0).attr("value"));
                    $('#'+$('input[type!="hidden"]:not(.checkbox)',_this.o).attr("re")).val($(this).find("span").eq(0).attr("value"));
                }else if(bCheckBox){
                    $('.fcheckbox.f-checked',_this.o).removeClass("f-checked");
                    $('.fcheckbox',$(this)).addClass("f-checked");
                    $('input[type!="hidden"]:not(.checkbox)',_this.o).val($(this).find("span:not('.fcheckbox')").eq(0).text());
                    $('input[type!="hidden"]:not(.checkbox)',_this.o).attr("val",$(this).find("span:not('.fcheckbox')").eq(0).attr("value"));
                    $('#'+$('input[type!="hidden"]:not(.checkbox)',_this.o).attr("re")).val($(this).find("span:not('.fcheckbox')").eq(0).attr("value"));
                }

                $('ul',_this.o).slideToggle();
                func = $(this).attr("func");
                if(!!func&&func!=""){
                    eval($(this).attr("func"));
                }else if(!!_this.def.event){
                    if(typeof(_this.def.event)=="function"){
                        _this.def.event(this);
                    }else{
                        eval(_this.def.event+"(this)");
                    }
                }
            }
        });
        //下拉框的宽度设置
        if(!!this.def.width){
            $('input[readonly=readonly]', this.o).css({"width": this.def.width+"px"});
        }
        //判断是否初始化即出发点击事件
        if(!!this.def.bTrigger){
            if(bColor){
                $("ul li>a.sel",_this.o).click();
            }else if(bCheckBox){
                $("ul li>a .fcheckbox.f-checked",_this.o).click();
            }
            _hide();
        }
    },
    /**
     * 下框框中附加搜索框
     */
    initFilterSel: function(){
        var _this = this,_hide = this.hide(this),func;
        var bMulti = (_this.def.type=="multiple"),bColor = (_this.def.style=="colorize"),bCheckBox = (_this.def.style=="checkbox");
        var initials = _this.def.initial,tmpVal="",tmpTxt="";
        if(bMulti){
            if(bColor){
                if(!!initials&&$.jIsArray(initials)){
                    for(var i=0,len=initials.length;i<len;i++){
                        $('ul table tr span[value="'+initials[i]+'"]',this.o).closest("a").addClass('sel');
                        if(i>0){
                            tmpVal += ",",tmpTxt += ",";
                        }
                        tmpVal += $('ul table tr span[value="'+initials[i]+'"]',this.o).attr("value");
                        tmpTxt += $('ul table tr span[value="'+initials[i]+'"]',this.o).text();
                    }
                }else{
                    $('ul table tr:first a',this.o).addClass('sel');
                    tmpTxt = $('ul table tr:first span',this.o).text(),tmpTxt = !!tmpTxt?tmpTxt:"请选择";
                    tmpVal = $('ul table tr:first span',this.o).attr("value");
                }
            }else if(bCheckBox){
                if(!!initials&&$.jIsArray(initials)){
                    for(var i=0,len=initials.length;i<len;i++){
                        $('ul table tr span[value="'+initials[i]+'"]',this.o).prev(".fcheckbox").addClass('f-checked');
                        if(i>0){
                            tmpVal += ",",tmpTxt += ",";
                        }
                        tmpVal += $('ul table tr span[value="'+initials[i]+'"]',this.o).attr("value");
                        tmpTxt += $('ul table tr span[value="'+initials[i]+'"]',this.o).text();
                    }
                }else{
                    $('ul table tr:first .fcheckbox',this.o).addClass('f-checked');
                    tmpTxt = $('ul table tr:first span',this.o).text(),tmpTxt = !!tmpTxt?tmpTxt:"请选择";
                    tmpVal = $('ul table tr:first span',this.o).attr("value");
                }
            }
        }else{
            if(!!initials&&!$.jIsArray(initials)){
                if(bColor){
                    $('ul table tr span[value="'+initials+'"]',this.o).closest("a").addClass('sel');
                }else if(bCheckBox){
                    $('ul table tr span[value="'+initials+'"]',this.o).prev(".fcheckbox").addClass('f-checked');
                }
                tmpVal = $('ul table tr span[value="'+initials+'"]',this.o).attr("value");
                tmpTxt = $('ul table tr span[value="'+initials+'"]',this.o).text();
            }else{
                if(bColor){
                    $('ul table tr:first a',this.o).addClass('sel');
                }else if(bCheckBox){
                    $('ul table tr:first .fcheckbox',this.o).addClass('f-checked');
                }
                tmpTxt = $('ul table tr:first span',this.o).text(),tmpTxt = !!tmpTxt?tmpTxt:"请选择";
                tmpVal = $('ul table tr:first span',this.o).attr("value");
            }
        }
        $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',this.o).val(tmpTxt);
        $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',this.o).attr("val",tmpVal);
        $('#'+$('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).attr("re")).val(tmpVal);
        $("ul table tr",this.o).find("span").css("color","#dddddd");

        $('i',this.o).unbind('click');
        $('i',this.o).bind('click',function(){
            $('ul',_this.o).slideToggle();
        });
        $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',this.o).unbind('click');
        $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',this.o).bind('click',function(){
            $('ul',_this.o).slideToggle();
        });
        $(this.o)
            .bind('mouseenter',function(){
                $(document).unbind('click',_hide);
            })
            .bind('mouseleave',function(){
                $(document).bind('click',_hide);
            });
        $('ul table tr',this.o).bind('click',function(){
            if($(this).attr("enable")=="false"){
                return;
            }
            if(bMulti){
                var tmpTxt=[],tmpVal=[];
                if(bColor){
                    $('a',$(this)).toggleClass("sel");
                    var $as = $("li > a.sel",_this.o);
                    for(var i=0,len=$as.length;i<len;i++){
                        tmpTxt.push($as.eq(i).find("span").eq(0).text());
                        tmpVal.push($as.eq(i).find("span").eq(0).attr("value"));
                    }
                    $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).val(tmpTxt.join(","));
                    $('#'+$('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).attr("re")).val(tmpVal.join(","));
                }else if(bCheckBox){
                    $('.fcheckbox',$(this)).toggleClass("f-checked");
                    var $chks = $("td .fcheckbox.f-checked",_this.o);
                    for(var i=0,len=$chks.length;i<len;i++){
                        tmpTxt.push($chks.eq(i).siblings("span").eq(0).text());
                        tmpVal.push($chks.eq(i).siblings("span").eq(0).attr("value"));
                    }
                    $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).val(tmpTxt.join(","));
                    $('#'+$('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).attr("re")).val(tmpVal.join(","));
                }
            }else{
                if(bColor){
                    $('a.sel',_this.o).removeClass("sel");
                    $('a',$(this)).addClass("sel");
                    $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).val($(this).find("span").eq(0).text());
                    $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).attr("val",$(this).find("span").eq(0).attr("value"));
                    $('#'+$('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).attr("re")).val($(this).find("span").eq(0).attr("value"));
                }else if(bCheckBox){
                    $('.fcheckbox.f-checked',_this.o).removeClass("f-checked");
                    $('.fcheckbox',$(this)).addClass("f-checked");
                    $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).val($(this).find("span:not('.fcheckbox')").eq(0).text());
                    $('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).attr("val",$(this).find("span:not('.fcheckbox')").eq(0).attr("value"));
                    $('#'+$('input[type!="hidden"]:not(.checkbox):not(.ks-no)',_this.o).attr("re")).val($(this).find("span:not('.fcheckbox')").eq(0).attr("value"));
                }

                $('ul',_this.o).slideToggle();
                func = $(this).attr("func");
                if(!!func&&func!=""){
                    eval($(this).attr("func"));
                }else if(!!_this.def.event){
                    if(typeof(_this.def.event)=="function"){
                        _this.def.event(this);
                    }else{
                        eval(_this.def.event+"(this)");
                    }
                }
            }
        });
        //下拉框的宽度设置
        if(!!this.def.width){
            $('input[readonly=readonly]', this.o).css({"width": this.def.width+"px"});
        }
        //判断是否初始化即出发点击事件
        if(!!this.def.bTrigger){
            if(bColor){
                $("ul li>a.sel",_this.o).click();
            }else if(bCheckBox){
                $("ul li>a .fcheckbox.f-checked",_this.o).click();
            }
            _hide();
        }
    },
    hide:function(_this){
        var _this = _this;
        return function(){
            $('ul',_this.o).slideUp();
        };
    }
};

$.fn.extend({
    gridSlider:function(opts){
        $(this).each(function(){
            var _o = new gridSlider(this,opts);
            _o.init();
        });
        return this;
    },
    colDrag: function(){
        $(this).each(function(){
            var o = new colDrag(this);
            o.init();
        });
        return this;
    },
    multipEdit:function(opts){
        $(this).each(function(){
            var _o = new multipEdit(this,opts);
            _o.init();
        });
        return this;
    },
    completeInput:function(opts){
        $(this).each(function(){
            var _o = new completeInput(this,opts);
            _o.init();
        });
        return this;
    },
    fakeSelect:function(opts){
        $(this).each(function(){
            var _o = new fakeSelect(this, opts);
            _o.init();
        });
        return this;
    },
    mBox:function(opts){
        $(this).each(function(){
            var _o = new mBox(this,opts);
            _o.init();
        });
        return this;
    },
    graphSlider:function(opts){
        $(this).each(function(){
            var _o = new graphSlider(this,opts);
            _o.init();
        });
        return this;
    }
});

function getDateByBrowserType(str){
	if(checkBrowserType()){
		return parseISO8601(str);
	}else{
		return new Date(str);
	}
}
function parseISO8601(dateStringInRange) {
	   if(dateStringInRange.length == 7){
		   dateStringInRange = dateStringInRange + "-01";
	   }
	   var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,  
	       date = new Date(NaN), month,  
	       parts = isoExp.exec(dateStringInRange);  
	  
	   if(parts) {  
	     month = +parts[2];  
	     date.setFullYear(parts[1], month - 1, parts[3]);  
	     if(month != date.getMonth() + 1) {  
	       date.setTime(NaN);  
	     }  
	   }  
	   return date;  
}

function checkBrowserType(){
	if($.browser.msie){
		if($.browser.version == "6.0" || $.browser.version == "7.0" || $.browser.version == "8.0"){
			return true;
		}
	}
	//判断京麦的webkit版本，京麦的webkit里包含qt，可能是一个类型名称
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent != "" && userAgent.indexOf("qt") > -1){
		return true;
	}
	return false;
}

function getDayNum(){
	var date=new Date();
	var strdate=date.getDay();
	switch(strdate){
		case 0:
		strdate="Sunday";
		break;
		case 1:
		strdate="Monday";
		break;
		case 2:
		strdate="Tuesday";
		break;
		case 3:
		strdate="Wednesday";
		break;
		case 4:
		strdate="Thursday";
		break;
		case 5:
		strdate="Friday";
		break;
		case 6:
		strdate="Saturday";
		break;
	}
	return strdate;
}