var receiveProId;
var TABLE = {
	strTable : "",
	_t : function(data, tag, attrs) {
		this.append("<" + tag).append(" ");
		var self = this;
		if (attrs) {
			$.each(attrs, function(name, value) {
				self.append(name).append("='").append(value).append("'");
			});
		}
		this.append(">");
		if (data == 0 || data) {
			this.append(data).append("</" + tag + ">");
		}
		return this;
	},
	_ts : function(data, tag, fn, attrs) {
		var self = this;
		$.each(data, function(i, d) {
			if (fn) {
				d = fn(d);
			}
			self._t(d, tag, attrs);
		});
		return self;
	},
	trOpen : function(attrs) {
		return this._t(null, "tr", attrs);
	},
	trClose : function() {
		return this.append("</tr>");
	},
	th : function(data, attrs) {
		return this._t(data, "th", attrs);
	},
	ths : function(data, fn, attrs) {
		return this._ts(data, "th", fn, attrs);
	},
	td : function(data, attrs) {
		return this._t(data, "td", attrs);
	},
	tds : function(data, fn, attrs) {
		return this._ts(data, "td", fn, attrs);
	},
	append : function(data) {
		this.strTable += data;
		return this;
	},
	begin : function(attrs) {
		return this._t(null, "table", attrs);
	},
	end : function() {
		return this.append("</table>");
	},
	show : function(id) {
		$("#" + id).html(this.strTable);
		this.strTable = "";
	}
};


function renderTable(params) {
	$.ajax({
		url : C$.PATH + "/advancedDataModel/getShopProFlowFromTo.action",
		data : params,
		type : 'POST',
		dataType : "json",
		success : function(data) {
			var detail = eval("(" + data.resultData + ")").detail;
			/*var topTenData = !!detail ? detail.topTen : null;
			if (topTenData && topTenData.length > 0) {
				topTen({
					name : params['filter.proName']
				}, topTenData);
			} else {
				$("#topTen").html("");
			}*/
			var sourceData = !!detail ? detail.source : null;
			if (sourceData && sourceData.length > 0) {
				ViewManager.sourceTrendView.hideNoData();
				ViewManager.sourceTrendView.show(sourceData);//渲染来源去向图
				ViewManager.sourceTrendView.showCurrentProduct();//渲染商品图片
				$("#fromtoDiv").show();
			} else {
				ViewManager.sourceTrendView.showNoData();
			}
			$('.bus-need-tips').Jtips({
		        "content": "暂无描述",
		        "position": 'bottom',
		        "width": 200,
		        "zIndex": 100
		    });
			createTable(data);
		}
	});
}

var firstReload = 0;
function renderTableUrl(params) {
	$.ajax({
		url : C$.PATH + "/advancedDataModel/getShopProFlowUrlResult.action",
		data : params,
		type : 'POST',
		dataType : "json",
		success : function(data) {
			var detail = eval("(" + data.resultData + ")").detail;
			/*var topTenData = !!detail ? detail.topTen : null;
			if (topTenData && topTenData.length > 0) {
				topTenUrl({
					name : params['filter.proName']
				}, topTenData);
			} else {
				$("#topTen").html("");
			}*/
			var sourceData = !!detail ? detail.source : null;
			if (sourceData && sourceData.length > 0) {
				ViewManager.sourceTrendView.hideNoData();
				ViewManager.sourceTrendView.show(sourceData);//渲染来源去向图
				ViewManager.sourceTrendView.showCurrentProduct();//渲染商品图片
				$("#fromtoDiv").show();
			} else {
				ViewManager.sourceTrendView.showNoData();
			}
			createUrlTable(data);
			if(firstReload == 0){
		    	firstReload = 1;
		    	createUrlTable(data);
		    }
		}
	});
}

function renderTableKeyWords(params) {
	$.ajax({
		url : C$.PATH + "/advancedDataModel/getShopProFlowKWResult.action",
		data : params,
		type : 'POST',
		dataType : "json",
		success : function(data) {
			var detail = eval("(" + data.resultData + ")").detail;
			/*var topTenData = !!detail ? detail.topTen : null;
			if (topTenData && topTenData.length > 0) {
				topTen({
					name : params['filter.proName']
				}, topTenData);
			} else {
				$("#topTen").html("");
			}*/
			var sourceData = !!detail ? detail.source : null;
			if (sourceData && sourceData.length > 0) {
				ViewManager.sourceTrendView.hideNoData();
				ViewManager.sourceTrendView.show(sourceData);//渲染来源去向图
				ViewManager.sourceTrendView.showCurrentProduct();//渲染商品图片
				$("#fromtoDiv").show();
			} else {
				ViewManager.sourceTrendView.showNoData();
			}
			$('.bus-need-tips').Jtips({
		        "content": "暂无描述",
		        "position": 'bottom',
		        "width": 200,
		        "zIndex": 100
		    });
			createKeyWordsTable();
		}
	});
}

/**
 * 渲染top10图片
 * @param goods
 * @param dd
 */
function topTen(goods, dd) {
	var option = {
		elem : document.getElementById('topTen'),
		data : {
			goods : goods,
			origin : dd
		}
	};
	$("#topTen").html("");
	new GoodsGraph(option);
}

/**
 * 渲染top10图片 url
 * @param goods
 * @param dd
 */
function topTenUrl(goods, dd) {
	var option = {
		elem : document.getElementById('topTen'),
		data : {
			goods : goods,
			origin : dd
		}
	};
	$("#topTen").html("");
	new GoodsGraphUrl(option);
}

/**
 * 渲染概况信息
 */
function renderProList(params) {
	A$.setMapping("ProList", {
		ajax : true,
		action : C$.PATH + "/advancedDataModel/getShopProFlowStat.action",
		param : params,
		format : 11,
		formatKey : [ "detail", "allDetailZBs" ],
		mode : "L2R8", // L2R8-左侧图20%宽、右侧数据80%宽；STANDARD-标准
		figure : "LIST",
		plugin : {
			pic : {
				item : [ "ProSKU" ],
			// SKU的KEY
			// ,code: _sku // SKU的编号
                callback:function(domImg,_spuIds){
                    //将spuid传到后台
                    $.ajax({
                        url : context_path+"/getProductSkuForOneBySpu.action",
                        async: false,
                        type : "post",
                        dataType : "json",
                        data : {"filter.spuId":_spuIds.join()},
                        success : function(jsonData){
                            loadProductSkuClass(jsonData,domImg);
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
			},
			col : 3,
			comma : true
		},
		dataType : "DETAIL"
	});
	I$.init([ "ProList" ]);
	I$.run(A$);
}

/**
 * 增加搜索按钮
 * @param _this
 */
function addSearchButton(){
	$("#SearchTbl tbody tr:eq(0) td:eq(1)").remove();
	$("#SearchTbl tbody tr:eq(0)").append("<td style=\"text-align: left\"><div style=\"display: inline-block;margin-left:10px\">" +
			"<a href=\"javascript:void(0)\" class=\"btn query mr5\" onclick=\"search_spu()\"><i>&nbsp;</i><span>查询</span></a></div></td>");
}


/**
 * 删除搜索按钮
 * @param _this
 */
function delSearchButton(){
	$("#SearchTbl tbody tr:eq(0) td:eq(1)").remove();
}


function selRange(_this) {
	var opt = $(_this).find("a>span").attr("value");
	switch (opt) {
	case "TOP15":
		$("#SearchTbl").hide();
		$("#recent20Div").hide();
		currentSel = "TOP15";
		delSearchButton();
		getTop15();
		break;
	case "Resent":
		$("#SearchTbl").hide();
		$("#top15Div").hide();
		currentSel = "Resent";
		delSearchButton();
		getRecent20();
		break;
	case "Search":
		$("#SearchTbl").show();
		$("#top15Div").hide();
		$("#recent20Div").hide();
		currentSel = "Search";
		addSearchButton();
		break;
	}
}

function refreshFilter(){
	if (currentSel == "TOP15"){
		//getTop15();
	}else if (currentSel == "Resent"){
		//getRecent20();
	}else{
		//renderData();
	}
	renderData();
}

function refreshFilterCore(){
	if (currentSel == "TOP15"){
		getTop15();
	}else if (currentSel == "Resent"){
		getRecent20();
	}else{
		renderData();
	}
}

function selChange() {
	if (currentSel == "TOP15")
		currentSelId = $("#top15 input").attr("val");
	else if (currentSel == "Resent")
		currentSelId = $("#recent20 input").attr("val");
	else
		currentSelId = $('#goodscodeHide').val();
	
	renderData();
}

// 记录当前商品名称
function getProName(proName) {
	currentSelName = proName;
}

function getRecent20() {
	$("#recent20Div").show();
	var params = "filter.date=" + $("#CurDate").val();
	query(context_path + "/advancedDataModel/getRecent20Pro.action", params,
			showRecent20);
}

function showRecent20(result) {
	var resultData = eval("(" + result.resultData + ")");
	var recent20Pro = resultData.detail;

	$("#recent20 input").val("");
	$("#recent20 ul").empty();
	if (recent20Pro != undefined && recent20Pro.length > 0) {
		for ( var i = 0; i < recent20Pro.length; i++) {
			$("#recent20 ul").append(
					"<li func='selChange()' ><a href='javascript:void(0);' onclick='getProName(\""
							+ recent20Pro.ProductName.value[i]
							+ "\")'><span value='"
							+ recent20Pro.ProductID.value[i] + "'>"
							+ recent20Pro.ProductName.value[i]
							+ "</span></a></li>");
		}
			$('#recent20').fakeSelect({
				type : "single", // single
				style : "colorize", // checkbox
				width : 200,
				initial:receiveProId
			});
			if(receiveProId != undefined && receiveProId != "null" && receiveProId != ""){
				
			}else{
				currentSelName = recent20Pro.ProductName.value[0];
			}
			receiveProId = "";
	}else{
		$("#recent20 input").val("暂无数据");
		$("#recent20 input").attr("val","");
	}
	currentSelId = $("#recent20 input").attr("val");
	renderData();
}

function getTop15() {
	$("#top15Div").show();
	var params = "filter.date=" + $("#CurDate").val()
			+ "&filter.isMergeSKU=true";
	query(context_path + "/dataModel/getProStaticTopReportInitData.action",
			params, showTop15);
}

function showTop15(result) {
	var resultData = eval("(" + result.resultData + ")");
	var top15Pro = resultData.detail;
	$("#top15 input").val("");
	$("#top15 ul").empty();
	if (top15Pro != undefined && top15Pro.length > 0) {
		for ( var i = 0; i < top15Pro.length; i++) {
			$("#top15 ul").append(
					"<li func='selChange()' ><a href='javascript:void(0);' onclick='getProName(\""
							+ top15Pro.OrdAmt.Name.value[i]
							+ "\")'><span value='"
							+ top15Pro.OrdAmt.ID.value[i] + "'>"
							+ top15Pro.OrdAmt.Name.value[i]
							+ "</span></a></li>");
		}
			$('#top15').fakeSelect({
				type : "single", // single
				style : "colorize", // checkbox
				width : 200,
				initial:receiveProId
			});
			if(receiveProId != undefined && receiveProId != "null" && receiveProId != ""){
				
			}else{
				currentSelName = top15Pro.OrdAmt.Name.value[0];
			}
			receiveProId = "";
	}else{
		$("#top15 input").val("暂无数据").attr("val","");
	}
	currentSelId = $("#top15 input").attr("val");
	renderData();
}

function loadProductSkuClass(_jsonData,img){
    var resultData = eval("("+_jsonData.resultData+")");
    if( resultData == null || resultData.length == 0 ) {
        return;
    }
    if( !resultData["SKUIDS"] ){
        $(img).attr("src",context_path+'/skin/i/noPic.png');
        return;
    }

    var skuIDs = resultData["SKUIDS"].value

    var imgRender = function(_cache){
        for(var i in skuIDs){
            if ( _cache[skuIDs[i]] ){
                $(img).attr("src", _cache[skuIDs[i]]);
                //全局的图片信息
        		proName = $("#proName").text();
        		imgSrc = _cache[skuIDs[i]];
        		proUrl = $("#proName").attr("href");
                return;
            }else{
                $(img).attr("src",context_path+'/skin/i/noPic.png');
            }
        }
    };
    loadPic(skuIDs, skuIDs.length, imgRender);
}

/**
* @表头表尾部fixed set
* @依赖jquery.dataTables
* @依赖http://datatables.net/release-datatables/extras/ColReorder/fixedcolumns.html
*/
function fixed_set(curTab){
		var once = true;
		if ($('.dataTables_fixed_left',$("#"+curTab)).size() ==1 ) {
			once = false;
			$('.dataTables_fixed_left,.dataTables_fixed_right,.dataTables_fixed_check,.dataTables_fixed_scroll',$("#"+curTab)).remove();
		}
		
		var fixed_left = $('.DTFC_LeftHeadWrapper',$("#"+curTab));
		var fixed_left_clone = fixed_left.clone(true);
		var h_width = fixed_left.outerWidth();
		var h_left = fixed_left.offset().left;
		fixed_left_clone.css({
			display:'none',
			position:'fixed',
			width:h_width,
			left:h_left,
			top:0
		});
		fixed_left_clone.addClass('dataTables_fixed_left',$("#"+curTab));
		
		
		var fixed_right = $('.dataTables_scrollHead',$("#"+curTab));
		var fixed_right_clone = fixed_right.clone(true);
		fixed_right_clone.css({
			display:'none',
			overflow:'hidden',
			position:'fixed',
			width:$('.dataTables_scroll',$("#"+curTab)).outerWidth(),
			left:h_width+h_left,
			top:0
		});
		fixed_right_clone.addClass('dataTables_fixed_right',$("#"+curTab));
		
		$('.dataTables_wrapper',$("#"+curTab)).append(fixed_left_clone).append(fixed_right_clone);
		
		//显示定位用的
		$('.dataTables_scrollBody',$("#"+curTab)).append('<div class="dataTables_fixed_check"></div>');
		
		//总宽
		var scroll_w = $('.dataTables_scrollBody',$("#"+curTab)).find('table').outerWidth() ;
		//实际宽
		var scroll_w2 = $('.dataTables_wrapper',$("#"+curTab)).outerWidth() - h_width;
		
		var html = '<div class="dataTables_fixed_scroll" style="width:'+scroll_w2+'px;overflow: auto;position:fixed;bottom:0;left:'+(h_width+h_left)+'px;z-index:100;"><div class="dataTables_fixed_scroll_main" style="width:'+scroll_w+'px;height:16px;"></div></div>';
		//控制滚动
		$('.dataTables_wrapper',$("#"+curTab)).append(html);
		
		
		//双向滚动
		var scroll_body = $('.dataTables_scroll',$("#"+curTab));
		$('.dataTables_fixed_scroll',$("#"+curTab)).scroll(function(){
			var left = $(this).scrollLeft();
			scroll_body.scrollLeft(left);
			$('.dataTables_fixed_right',$("#"+curTab)).scrollLeft(left);
		});
		
		scroll_body.scroll(function(){
			var left = $(this).scrollLeft();
			$('.dataTables_fixed_scroll',$("#"+curTab)).scrollLeft(left);
			$('.dataTables_fixed_right',$("#"+curTab)).scrollLeft(left);
		});
		
		if(scroll_body.scrollLeft()>0){
			var left = scroll_body.scrollLeft();
			$('.dataTables_fixed_scroll',$("#"+curTab)).scrollLeft(left);
			$('.dataTables_fixed_right',$("#"+curTab)).scrollLeft(left);
		}
		
		//显示头尾部
		function init(){
			var fixed_left = $('.dataTables_fixed_left',$("#"+curTab));
			var fixed_right = $('.dataTables_fixed_right',$("#"+curTab));
			
			if($('.DTFC_LeftHeadWrapper',$("#"+curTab)).eq(0).offset() == null){
				return false;
			}
			var top = $('.DTFC_LeftHeadWrapper',$("#"+curTab)).eq(0).offset().top;
			var scrollTop = $(document).scrollTop();
			if ( scrollTop > top ){
				fixed_left.show();
				fixed_right.show();
			}else{
				fixed_left.hide();
				fixed_right.hide();
			}
			
			var doc = document.compatMode == "BackCompat" ? document.body : document.documentElement;
			var clientHeight = doc.clientHeight;
			var fixed_check_top = $('.dataTables_fixed_check',$("#"+curTab)).offset() ? $('.dataTables_fixed_check',$("#"+curTab)).offset().top : 0;
			var fixed_scroll = $('.dataTables_fixed_scroll',$("#"+curTab));
			if ( (scrollTop+clientHeight) < fixed_check_top ) {
				fixed_scroll.css({visibility:'visible'});
			}else {
				fixed_scroll.css({visibility:'hidden'});
			}
		};
		
		if (once) {
			//仅绑一次
			$(window).bind('scroll',init);
		}
		init();
}