//常量...
constant_zb = {
	PRO_NAME: "ProName"		
};

function renderGrid(_containerId, _group, _zbs, _rltData){
    $("#"+_containerId).addClass("sales-info-list").addClass("mb10").addClass("mt10");
    var buf = [],col = 4,c = 0,row = 0, dataset = [], counter = 0, extraCss = "",fontNum = _group.name.getLen();
    if(fontNum>4){
    	extraCss = "f"+fontNum;
    }
    if(_zbs){
        row = Math.ceil(_zbs.length/col);
        for(var i=0;i<col;i++){
            dataset[i] = [];
        }
        for(var i in _zbs){
            if(counter%col==0){
                c = 0;
            }
            dataset[c].push({name: _zbs[i].value, type: _zbs[i].dataType, decimal: _zbs[i].decimal, formatter: _zbs[i].formatter, desc: _zbs[i].des, value:(_rltData&&_rltData[_zbs[i].id]&&_rltData[_zbs[i].id].value)?_rltData[_zbs[i].id].value[0]:"-"});
            counter++,c++;
        }
        buf.push('<div id="'+_containerId+_group.id+'" class="sales-info-item">');
        buf.push('<h3 class="'+extraCss+'"><i class="'+_group.gClass+'"></i>'+_group.name+'</h3>');
        for(var i=0;i<col;i++){
            buf.push('<div class="info-details">');
            for(var j=0,len=(dataset[i]?dataset[i].length:0);j<len;j++){
                buf.push('<div class="info-line">');
                if(dataset[i][j].desc&&dataset[i][j].desc!=""){
                    buf.push('<i class="icon-help" desc="'+dataset[i][j].desc+'"></i>');
                }else{
                	buf.push('<i class="icon-none"></i>');
                }
                buf.push(dataset[i][j].name);
                buf.push('<strong>'+((dataset[i][j].value=="-"||dataset[i][j].value<0)?"-":(dataset[i][j].formatter?dataset[i][j].formatter(dataset[i][j].value):$.jFormatVal(dataset[i][j].value, dataset[i][j].type, dataset[i][j].decimal)))+'</strong>');
                buf.push('</div>');
            }
            buf.push('</div>');
        }
        buf.push('</div>');
    }
    $("#"+_containerId+_group.id).remove();
    $("#"+_containerId).append(buf.join(""));

    $("h3",$("#"+_containerId+_group.id)).css({"height": (30*row+10)+"px","line-height":(30*row+10)+"px"});
    $(".info-details",$("#"+_containerId+_group.id)).css({"height": (30*row+10)+"px"});

    $('i.icon-help', $("#"+_containerId+_group.id)).Jtips({
        "content": "暂无描述",
        "position": 'bottom',
        "width": 196
    });
}

/**
 * 不适用两排的指标即超过四列    指标下有与昨天相比,与昨天全天
 * _firstLoadFlag 首次加载标志
 */
function renderCompareGrid(_containerId, _group, _zbs, _rltData,_indexArr,_firstLoadFlag){
    $("#"+_containerId).addClass("sales-info-list").addClass("mb10").addClass("mt10");
    var buf = [],col = 3,c = 0,row = 0, dataset = [], ldataset = [],compareset = [],lallset=[],lallcompareset=[], counter = 0, extraCss = "",fontNum = _group.name.getLen();
    if(fontNum>3){
    	extraCss = "f"+fontNum;
    }
    if(_zbs){
        row = Math.ceil(_zbs.length/col);
        for(var i=0;i<col;i++){
            dataset[i] = [];
            compareset[i] = [];
            ldataset[i] = [];
            lallset[i] = [];
            lallcompareset[i] = [];
        }
        for(var i in _zbs){
            if(counter%col==0){
                c = 0;
            }
            dataset[c].push({name: _zbs[i].value, type: _zbs[i].dataType, decimal: _zbs[i].decimal, formatter: _zbs[i].formatter, desc: _zbs[i].des, value:(_rltData&&_rltData[_zbs[i].id]&&_rltData[_zbs[i].id].value)?_rltData[_zbs[i].id].value[_indexArr[0]]:"-"});
            ldataset[c].push({value:(_rltData&&_rltData[_zbs[i].id]&&_rltData[_zbs[i].id].value)?_rltData[_zbs[i].id].value[_indexArr[1]]:"-"});
            lallset[c].push({value:(_rltData&&_rltData[_zbs[i].id]&&_rltData[_zbs[i].id].value)?_rltData[_zbs[i].id].value[_indexArr[2]]:"-"});
            compareset[c].push({value:(_rltData&&_rltData[_zbs[i].id]&&_rltData[_zbs[i].id].value)?_rltData[_zbs[i].id].value[_indexArr[3]]:"-"});
            lallcompareset[c].push({value:(_rltData&&_rltData[_zbs[i].id]&&_rltData[_zbs[i].id].value)?_rltData[_zbs[i].id].value[_indexArr[4]]:"-"});
            counter++,c++;
        }
        var curDate=new Date();
        var curTime =  (curDate.getHours()>9?curDate.getHours():("0"+curDate.getHours()))+":"+(curDate.getMinutes()>29?"30":"00");
        if(!!_firstLoadFlag){
        	buf.push('<div id="'+_containerId+_group.id+'" class="sales-info-item">');
            buf.push('<h3 class="'+extraCss+'"><i class="'+_group.gClass+'"></i>'+_group.name+'</h3>');
            for(var i=0;i<col;i++){
                buf.push('<div class="info-details">');
                for(var j=0,len=(dataset[i]?dataset[i].length:0);j<len;j++){
                    buf.push('<div class="info-line">');
                    if(dataset[i][j].desc&&dataset[i][j].desc!=""){
                        buf.push('<i class="icon-help" desc="'+dataset[i][j].desc+'"></i>');
                    }else{
                    	buf.push('<i class="icon-none"></i>');
                    }
                    buf.push(dataset[i][j].name);
                    buf.push('<div class="odometer">'+((dataset[i][j].value=="-"||dataset[i][j].value<0) ? "-" : (dataset[i][j].formatter ? dataset[i][j].formatter(dataset[i][j].value) : (dataset[i][j].decimal==2 ? $.jFormatVal(dataset[i][j].value, dataset[i][j].type, dataset[i][j].decimal)+1  : $.jFormatVal(dataset[i][j].value, dataset[i][j].type, dataset[i][j].decimal))))+'</div>');
                    buf.push('</div>');
                    buf.push('<div class="info-line">');
                    buf.push('<i class="icon-help" desc="今日'+curTime+'和昨日'+curTime+'的对比比率"></i>');
                    buf.push('<span class="compare" style="margin-left:0px;">昨日'+curTime+'</span>');
                    var compareValue = compareset[i][j].value;
                    buf.push('<span class="compareValue">');
                    if((compareValue+"").indexOf("-")<0 || compareValue=="-" || compareValue==""){//上涨
                    	buf.push('<div class="ib mr5" style="color: #999;">'+$.jFormatVal(ldataset[i][j].value, dataset[i][j].type, dataset[i][j].decimal)+'</div>');
                    	buf.push('<div class="ib" style="text-align: right; width: 75px;color: #dd2200;">'+(compareValue.length>1?compareValue:"-")+'</div>');
                    	buf.push('<div class="ib"><i class="i-up"></i></div>');
                    }else{//下降
                    	buf.push('<div class="ib mr5" style="color: #999;">'+$.jFormatVal(ldataset[i][j].value, dataset[i][j].type, dataset[i][j].decimal)+'</div>');
                    	buf.push('<div class="ib" style="text-align: right; width: 75px;color: #00bb00;">'+compareValue.replace("-","")+'</div>');
                    	buf.push('<div class="ib"><i class="i-down"></i></div>');
                    }
                    buf.push('</span></div>');
                    
                    buf.push('<div class="info-line">');
                    buf.push('<span class="compare">昨日全天</span>');
                    compareValue = lallcompareset[i][j].value;
                    buf.push('<span class="compareValue">');
                    if((compareValue+"").indexOf("-")<0 || compareValue=="-" || compareValue==""){//上涨
                    	buf.push('<div class="ib mr5" style="color: #999;">'+$.jFormatVal(lallset[i][j].value, dataset[i][j].type, dataset[i][j].decimal)+'</div>');
                    	buf.push('<div class="ib" style="text-align: right; width: 75px;color: #dd2200;">'+(compareValue.length>1?compareValue:"-")+'</div>');
                    	buf.push('<div class="ib"><i class="i-up"></i></div>');
                    }else{//下降
                    	buf.push('<div class="ib mr5" style="color: #999;">'+$.jFormatVal(lallset[i][j].value, dataset[i][j].type, dataset[i][j].decimal)+'</div>');
                    	buf.push('<div class="ib" style="text-align: right; width: 75px;color: #00bb00;">'+compareValue.replace("-","")+'</div>');
                    	buf.push('<div class="ib"><i class="i-down"></i></div>');
                    }
                    buf.push('</span></div>');
                }
                buf.push('</div>');
            }
            buf.push('</div>');
        }else{
        	//滚动刷新
        	for(var i=0;i<col;i++){
        		for(var j=0,len=(dataset[i]?dataset[i].length:0);j<len;j++){
        			$('.odometer',$("#"+_containerId)).eq(i).html(((dataset[i][j].value=="-"||dataset[i][j].value<0)?"-":(dataset[i][j].formatter?dataset[i][j].formatter(dataset[i][j].value):$.jFormatVal(dataset[i][j].value, dataset[i][j].type, dataset[i][j].decimal))));
        			//昨日此时
        			var compareValue = compareset[i][j].value;
        			$("#"+_containerId+" .info-details:eq("+i+") .compare:eq(0)").html("昨日"+curTime);
        			$("#"+_containerId+" .info-details:eq("+i+") .icon-help:eq(1)").attr("desc","今日"+curTime+"和昨日"+curTime+"的对比比率");
        			$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(0) .ib:eq(0)").html($.jFormatVal(ldataset[i][j].value, dataset[i][j].type, dataset[i][j].decimal));
        			if((compareValue+"").indexOf("-")<0 || compareValue=="-" || compareValue==""){//上涨
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(0) .ib:eq(1)").css("color","#dd2200");
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(0) .ib:eq(1)").html(compareValue.length>1?compareValue:"-");
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(0) .ib:eq(2)").html('<i class="i-up"></i>');
        			}else{
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(0) .ib:eq(1)").css("color","#00bb00");
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(0) .ib:eq(1)").html(compareValue.length>1?compareValue.replace("-",""):"-");
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(0) .ib:eq(2)").html('<i class="i-down"></i>');
        			}
        			
        			//昨日全天
        			compareValue = lallcompareset[i][j].value;
        			$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(1) .ib:eq(0)").html($.jFormatVal(lallset[i][j].value, dataset[i][j].type, dataset[i][j].decimal));
        			if((compareValue+"").indexOf("-")<0 || compareValue=="-" || compareValue==""){//上涨
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(1) .ib:eq(1)").css("color","#dd2200");
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(1) .ib:eq(1)").html(compareValue.length>1?compareValue:"-");
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(1) .ib:eq(2)").html('<i class="i-up"></i>');
        			}else{
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(1) .ib:eq(1)").css("color","#00bb00");
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(1) .ib:eq(1)").html(compareValue.length>1?compareValue.replace("-",""):"-");
        				$("#"+_containerId+" .info-details:eq("+i+") .compareValue:eq(1) .ib:eq(2)").html('<i class="i-down"></i>');
        			}
        		}
        	}
        }
        
    }
    if(!!_firstLoadFlag){
    	$("#"+_containerId+_group.id).remove();
    	$("#"+_containerId).append(buf.join(""));
    	Odometer.init();
    }

    //$("h3",$("#"+_containerId+_group.id)).css({"height": (30*(row+1)+10)+"px","line-height":(30*(row+1)+10)+"px"});
    //$(".info-details",$("#"+_containerId+_group.id)).css({"height": (30*(row+1)+10)+"px"});

    $('i.icon-help', $("#"+_containerId+_group.id)).Jtips({
        "content": "暂无描述",
        "position": 'bottom',
        "width": 196
    });
}

/**
 * 功能:用指标名和指标值渲染指定div 
 * 
 * 参数: 
 * allSumZBs 指标名json 
 * resultData 指标值
 * divId 要渲染的div的id 
 * columns 每行显示几列
 * needCommas 是否需要千分位逗号(0-不需要,1-需要)，新版本中无用，由xml指定的数据类型决定，保留以备后用. 
 * decimals 保留几位小数(),新版本中此参数没有用,由xml决定,保留以备后用.
 * 
 * 示例:
 *	var resultData =eval("("+json.resultData+")");  //json为Action返回的总体json.
 *	renderSumZBs(json.allSumZBs,resultData,'div_daily_allSumZBs',5,1,2);
 * 
 * <div class="box" id="div_daily_allSumZBs"></div>
 */
function renderSumZBs(allSumZBs, resultData, divId, columns,needCommas,decimals,_chartZbs, _isSku) {
	var con = [],row = [],data,i=0,c=0,size = allSumZBs.length;	
	var strValue = ["无"],bUp,picRoot = B$.constants.Path.SUMMARYPIC;
	for (attr in allSumZBs) {
		// 匹配指标值			
		if(resultData&&resultData.summary){
			data = resultData.summary;			
		}else{
			data = resultData;
		}
		
		if (i % columns == 0){
			con.push("<ul>");
		}		
		
		con.push('<li'+((c==(size-1)&&(c+1)%columns!=0)?'  class="sl-last"':'') + (allSumZBs[attr].id == constant_zb.PRO_NAME?' style="width: 99%"':' style="width: ' + 99/columns + '%"') + '>');

        //如果按sku查询则显示图片，spu则不显示
		if(allSumZBs[attr].id==constant_zb.PRO_NAME){//如果是商品名称，则让商品名称这列结束，下一个属性单起一行
			i=-1;
			if(!!_isSku&&!!data&&data["ProNum"]){
				con.push('<div class="summaryPic"></div>');
                //135836,135837,135838
				var imgRender = function(_cache){
		        	$('.summaryPic:eq(0)').html('<img src="'+ _cache +'" />');
				};
				ajaxPic(data["ProNum"].value[0], imgRender);
			}
		}	
		
		con.push('<div class="sc-tit">');
		con.push('<span class="txt">'+allSumZBs[attr].value+'</span>');
		if(allSumZBs[attr].des){
			con.push('<div class="question"></div>');
		}
		con.push('</div>');
		
		if( data && (data.length == undefined || (data.length && data.length!=0))){
			for (var index in data){
				if (index == allSumZBs[attr].id) {
					strValue = ["无"];
                    data[index].value = !!data[index].value?data[index].value:[];
					for(var j=0,len=data[index].value.length;j<len;j++){
						try {
							strValue[j] = data[index].value[j]!= null ?data[index].value[j]:"无";
						} catch (e) {
							strValue[j] = "无";
						}			
						if(j<2){
							//处理整数、浮点、百分比型数的显示风格.
							if(allSumZBs[attr].dataType==0){ //整数
								if( isNaN(strValue[j]) ) strValue[j]=0;
								//处理千分位逗号(加逗号 1,000.23)
								strValue[j]=CommaFormatted( strValue[j] );
							}else if(allSumZBs[attr].dataType==1){ //浮点数
								if( isNaN(strValue[j]) ) strValue[j]=0;
								if(allSumZBs[attr].decimal && allSumZBs[attr].decimal>0){
									decimals=allSumZBs[attr].decimal; //要保留几位小数位
									strValue[j] = format_number(strValue[j],decimals); //四舍五入
								}
								//处理千分位逗号(加逗号 1,000.23)
								strValue[j]=CommaFormatted( strValue[j] );
							}else if(allSumZBs[attr].dataType==6){ //百分比数值
								if( isNaN(strValue[j]) ) strValue[j]=0;
								var cellData = strValue[j];
								cellData = cellData * 100;
								//处理小数位
								if(allSumZBs[attr].decimal && allSumZBs[attr].decimal>0){
									decimals=allSumZBs[attr].decimal; //要保留几位小数位
									cellData = format_number(cellData,decimals); //四舍五入
								}else{
									cellData= format_number(cellData.toString(),2); //四舍五入
								}
								cellData += "%";
								strValue[j]=cellData;
							}
						}
					}
//					console.log(strValue);
					decimals=0;
					break;
				}
				
			}
		}
	
		
		/*
		 * 
		 */
//		if(strValue=="无"){
		con.push('<div class="sc-price">' + strValue[0] + '</div>');
//				con.push("<li class='liw2' title='"+strValue+"'>" + strValue + "</li>");
//		}else{
//			con.push('<div class="sc-price">' + strValue + '</div>');
//				con.push("<li class='liw2 colFront' title='"+strValue+"'>" + strValue + "</li>");
//		}		
		
		con.push('<div class="sc-f">');
		if(_chartZbs){
			if(_chartZbs.join(",").indexOf(allSumZBs[attr].value)>=0){				
				con.push('<span class="fcheckbox" id="Chk_'+allSumZBs[attr].id+'" name="'+allSumZBs[attr].value+'" div="'+divId+'"><input type="checkbox" name=""></span>');			
			}
		}		
		
		if(!!strValue[1]&&!!strValue[2]){
			bUp = (""+strValue[2]).indexOf("-")<0;			
//			con.push('<span class="txt">于昨天相比<i class="'+(bUp?"i-up":"i-down")+'">'+format_number(strValue[2].replace(/-/g,"")*100,2)+'%</i></span>');	
			con.push('<span class="txt">于昨天相比<i class="'+(bUp?"i-up":"i-down")+'">'+(bUp?strValue[2]:(""+strValue[2]).slice(1))+'</i></span>');	
		}
		con.push('</div>');
		
		if(allSumZBs[attr].des){
			con.push('<div class="sc-tip">');
			con.push('<div class="sc-tip-con">'+allSumZBs[attr].des+'</div>');
			con.push('</div>');
		}
		con.push('</li>');
		
		if ((i+1)%columns==0){
			con.push("</ul>");
		}
				
		i++,c++;
	}
	if (i%columns != 0){
		con.push("</ul>");
	}
//	console.log(con.join(""));
	$('#'+divId).html(con.join(""));	
	B$.loadSummary();
}


function renderSumZBsTemp(allSumZBs, divId, columns) {
	var str_allSumZBs = "";
	var i = 0;
	for (attr in allSumZBs) {
		if (i % columns == 0)
			str_allSumZBs += "<ul>";
		str_allSumZBs += "<li class='liw1'>" + allSumZBs[attr].value + "</li>";
		// 匹配指标值
		var strValue = "无";
		str_allSumZBs += "<li class='liw2'>" + strValue + "</li>";
		if ((i + 1) % columns == 0)
			str_allSumZBs += "</ul>";
		i++;
	}
	if (i % columns != 0)
		str_allSumZBs += "</ul>";
	$('#' + divId).html(str_allSumZBs);
}

// 获取指标radiobutton
function renderSumZBDetailsRbtn(sumZBDetails, divId) {
	var str_allSumZBDetails = "";
	for (attr in sumZBDetails.allDetailZBs) {
		str_allSumZBDetails += "<input type=\"radio\" name=\"completeCheckCircs\" value="
				+ sumZBDetails.allDetailZBs[attr].id
				+ " />"
				+ sumZBDetails.allDetailZBs[attr].value;
	}
	$("#" + divId).html(str_allSumZBDetails);
}

 /**  
 *   添加逗号
 *   Usage: CommaFormatted(12345678);
 *   result: 12,345,678  
 **/ 
 function CommaFormatted(amount) {	  
	 if (amount == "-") {
		 return amount;
	 }
     var delimiter = ","; // replace comma if desired  
     amount = new String(amount);  
     var minus = amount.indexOf("-")>=0?'-':'';
     var a = amount.split('.',2);  
     var d ='';
     if(a.length>1) d = a[1];  
     var i = parseInt(a[0]);      
     if(isNaN(i)) { return ''; }  
     
     if(i < 0) { minus = '-'; }  
     i = Math.abs(i);  
     var n = new String(i);  
     var a = [];  
     while(n.length > 3)  
     {  
         var nn = n.substr(n.length-3);  
         a.unshift(nn);  
         n = n.substr(0,n.length-3);  
     }  
     if(n.length > 0) { a.unshift(n); }  
     n = a.join(delimiter);  
     if(d.length < 1) { amount = n; }  
     else { amount = n + '.' + d; }  
     amount = minus + amount;  
     return amount;  
 }  

//alert( format_number(12345.678, 2) ); //四舍五入
//alert( CommaFormatted(12345678.333) ); //添加逗号
//document.write( CommaFormatted( format_number(12345678.678,2) ) );  //四舍五入+添加逗号
 
 /**  
  *   四舍五入
  *   Usage:  format_number(12345.678, 2);  
  *   result: 12345.68
  *   
  *   解决了 format_numberV1('1.1400762319629731',2) 产生“1.140000000001”结果的的bug.
  **/ 
 function format_number(num,dec){
	 	if( isNaN(num) ) num=0; //如果是非数值数据，则设置为0，防止非法数据产生“NaN.00%”结果
	 	if(num==null || num=='') num=0;
	    var sNum = num + ''; 
	    var idx = sNum.indexOf("."); 
	    if(idx<0){ //num是整数的情况
	    	var str_decimal='.';
	    	if( dec == 0 ){
	    		str_decimal ='';
	    	}
	    	for(n=1; n<=dec; n++){
	    		str_decimal += '0';
	    	}
	    	return num+str_decimal;  //format_number(10,2)   四舍五入为 10.00
	    }
	    var result=0;
	    var n = sNum.length - idx -1;  //n代表原来的小数位
	    if(dec < n){ 
	        var e = Math.pow(10,dec); 
	        result = Math.round(num * e) / e;
	        //判断result是否包含小数位 (针对情况: format_number(15.9953,2); )
			if((result+'').indexOf('.')==-1){
				var str_decimal='.';
				if( dec == 0 ){
		    		str_decimal ='';
		    	}
		    	for(n=1; n<=dec; n++){
		    		str_decimal += '0';
		    	}
		    	result += str_decimal;
			}
	    }else if(dec==n){ 
	    	result=num;
	    }else if(dec>n){ //10.0  要转成 10.00 的情况
	    	var str_1='';
	    	for(i=1; i<=dec-n; i++) str_1+='0';
	    	result = num+str_1;
	    }
	    //补足小数位
	    var sresult = result+'';
	    var decimal_n = sresult.length - sresult.indexOf(".") -1;
	    for(i=1; i<=dec-decimal_n; i++) sresult+='0';
	    return sresult;
	}
 
/*舍去的方式*/
 function format_number_floor(num,dec){
	 	if( isNaN(num) ) num=0; //如果是非数值数据，则设置为0，防止非法数据产生“NaN.00%”结果
	 	if(num==null || num=='') num=0;
	    var sNum = num + ''; 
	    var idx = sNum.indexOf("."); 
	    if(idx<0){ //num是整数的情况
	    	var str_decimal='.';
	    	if( dec == 0 ){
	    		str_decimal ='';
	    	}
	    	for(n=1; n<=dec; n++){
	    		str_decimal += '0';
	    	}
	    	return num+str_decimal;  //format_number_floor(10,2)   四舍五入为 10.00
	    }
	    var result=0;
	    var n = sNum.length - idx -1;  //n代表原来的小数位
	    if(dec < n){ 
	        var e = Math.pow(10,dec); 
	        result = Math.floor(num * e) / e;
	        //判断result是否包含小数位 (针对情况: format_number(15.9953,2); )
			if((result+'').indexOf('.')==-1){
				var str_decimal='.';
				if( dec == 0 ){
		    		str_decimal ='';
		    	}
		    	for(n=1; n<=dec; n++){
		    		str_decimal += '0';
		    	}
		    	result += str_decimal;
			}
	    }else if(dec==n){ 
	    	result=num;
	    }else if(dec>n){ //10.0  要转成 10.00 的情况
	    	var str_1='';
	    	for(i=1; i<=dec-n; i++) str_1+='0';
	    	result = num+str_1;
	    }
	    //补足小数位
	    var sresult = result+'';
	    var decimal_n = sresult.length - sresult.indexOf(".") -1;
	    for(i=1; i<=dec-decimal_n; i++) sresult+='0';
	    return sresult;
	
	 
 }

	$(".btn").live('mouseover',function () {
        $(this).addClass("btnOver");
    }).live('mouseout',function () {
        $(this).removeClass("btnOver");
    });
	/*$(".j_btnCon .btn").live('click',function () {
            $(this).addClass("btnSel").siblings('.btnSel').removeClass("btnSel");
    });*/
/*
 * dataTable长数字排序函数重写,引入之前需要先引入jquery.dataTables.js,因为该js涉及表格内的数据格式转换,暂先放在该js中
 */
jQuery.fn.dataTableExt.oSort['numeric-comma-asc']  = function(a,b) { 
	if(a==undefined || b==undefined){
		return false;
	}
	var x = (a == "-") ? 0 : a.replace(/<.*?>|,/g, "");
	var y = (b == "-") ? 0 : b.replace(/<.*?>|,/g, "");  
	x = parseFloat( x );     
	y = parseFloat( y );     
	return ((x < y) ? -1 : ((x > y) ?  1 : 0)); 
};  
	
jQuery.fn.dataTableExt.oSort['numeric-comma-desc'] = function(a,b) { 
	if(a==undefined || b==undefined){
		return false;
	}
	var x = (a == "-") ? 0 : a.replace(/<.*?>|,/g, "");  
	var y = (b == "-") ? 0 : b.replace(/<.*?>|,/g, "");  
	x = parseFloat( x );     y = parseFloat( y );     
	return ((x < y) ?  1 : ((x > y) ? -1 : 0)); 
};
