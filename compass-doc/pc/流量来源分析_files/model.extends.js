/**
 * 新增自定义jQuery插件 
 * @author daipeng
 * 
 * 
 * $(obj).jColor()     对象加颜色
 * $(obj).jBackground()对象加背景
 * $(obj).jBorder()    对象加边框
 * $(tbl).jAlterTbBg() 表格行变色
 * 
 * 
 * jQuery.jLtrim(...)  删除左边空格
 * jQuery.jRtrim(...)  删除右边空格
 * jQuery.jIsNum(...)  判断是否数字
 */

var hasExtends = true;

/**
 * 无关业务的公用扩展方法
 */
;(function($){
	$.fn.extend({		
		"jColor": function(_value){
			if(_value==undefined){
				return this.css("color");
			}else{
				return this.css("color", _value);
			}			
		},
		"jDisplay": function(_bool){
			if(_bool==undefined){
				return this.css("display");
			}else{
				return this.css("display", _bool&&"block"||"none");
			}			
		},
		"jBackground": function(_value){
			if(_value==undefined){
				return this.css("background");
			}else{
				return this.css("background", _value);
			}			
		},
		"jBorder": function(_value){
			if(_value==undefined){
				return this.css("border");
			}else{
				return this.css("border", _value);
			}			
		},		
		"jSrc": function(_value){
			if(_value==undefined){
				return this.attr("src");
			}else{
				return this.attr("src", _value);
			}			
		},
		"jHref": function(_value){
			if(_value==undefined){
				return this.attr("href");
			}else{
				return this.attr("href", _value);
			}			
		},
		"jTitle": function(_value){
			if(_value==undefined){
				return this.attr("title");
			}else{
				return this.attr("title", _value);
			}			
		},
		"jId": function(_value){
			if(_value==undefined){
				return this.attr("id");
			}else{
				return this.attr("id", _value);
			}			
		},
		"jName": function(_value){
			if(_value==undefined){
				return this.attr("name");
			}else{
				return this.attr("name", _value);
			}			
		},
		"jCheck": function(_value){
			if(_value==undefined){
				return this.attr("checked");
			}else{
				return this.attr("checked", _value);
			}			
		},		
		"jSize": function(_value){
			if(_value==undefined){
				return this.attr("size");
			}else{
				return this.attr("size", _value);
			}			
		},
		"jDisable": function(){
			return this.each(function(){
				if(typeof this.disabled !="undefined") this.disabled = true;
			});		
		},
		"jCheckAll": function(){
			return this.each(function(){
				if(typeof this.disabled !="undefined") this.disabled = false;
			});		
		},
		"jLeft": function(_value){
			if(_value==undefined){
				return $(this).offset().left; 
			}else{
				$(this).css("left", _value);
			}
		},
        "jRight": function(_value){
            if(_value==undefined){
                return $(this).offset().right;
            }else{
                $(this).css("right", _value);
            }
        },
		"jTop": function(_value){
            if(_value==undefined){
                return $(this).offset().top;
            }else{
                $(this).css("top", _value);
            }
        },
        "jBottom": function(_value){
            if(_value==undefined){
                return $(this).offset().bottom;
            }else{
                $(this).css("bottom", _value);
            }
        },
		"jHeight": function(_value){
			if(_value==undefined){
				return $(this).height();
			}else{
				$(this).css("height", _value);
			}
		},
		"jWidth": function(_value){
			if(_value==undefined){
				return $(this).width(); 
			}else{
				$(this).css("width", _value);
			}
		},
        "jFloat": function(_value){
            if(_value==undefined){
                return $(this).css("float");
            }else{
                $(this).css("float", _value);
            }
        },
		"jAlterBg": function(_options){			
			options = $.extend({
				odd: "odd",
				even: "even",
				selected: "selected"
			}, _options);
			$("tbody>tr:odd", this).addClass(options.odd);
			$("tbody>tr:even", this).addClass(options.even);
			$("tbody>tr", this).click(function(){
				//var hasSelected = $(this).is("."+options.selected);
				//$(this)[hasSelected?"removeClass":"addClass"](options.selected).find(":checkbox").attr("checked", !hasSelected);
				//$("tbody>tr:has(:checked)", this).addClass(options.selected);
				return this;
			});
		},
		buttonSlider:function(){
			this.each(function(){
				var _o = new buttonSlider(this);
				_o.init();
			});
		},
		keyInput:function(){
			$(this).each(function(){
				var _o = new keyInput(this);
				_o.init();
			});
			return this;
		}
	});
	$.extend({
        jIsIE: function(_ver){
			if(_ver){
				return $.browser.msie&&($.browser.version==_ver+".0")?true:false;
			}else{
				return $.browser.msie?true:false;
			}							
		},		
		jIsSA: function(){
			return $.browser.safari?true:false;
		},
		jIsFF: function(){
			return $.browser.mozilla?true:false;
		},
		jIsOP: function(){
			return $.browser.opera?true:false;
		},
		jTrim: function(_text){
			return (_text||"").trim();
		},
		jLtrim: function(_text){
			return (_text||"").ltrim();
		},
		jRtrim: function(_text){
			return (_text||"").rtrim();
		},		
		jIsNumber: function(_text){
			return _text.isNumber();
		},
		jIsInt: function(_text){
			return _text.isInt();
		},
		jIsPlusInt: function(_text){
			return _text.isPlusInt();
		},
		jIsTel: function(_text){
			return _text.isTel();
		},
		jIsMobile: function(_text){
			return _text.isMobile();
		},
		jIsEmail: function(_text){
			return _text.isEmail();
		},
		jIsZip: function(_text){
			return _text.isZip();
		},
		jGetRootPath: function(){			
			var curPath = window.document.location.href;	
			var pathName = window.document.location.pathname;		
			var path = curPath.substring(0,curPath.indexOf(pathName));		
			var rootPath = pathName.substring(0,pathName.substr(1).indexOf('/')+1);    
			return path+rootPath;
		},		
		jString2Date: function(_text, _split){								
		    var myDate = new Date(Date.parse(_text));		    		
		    if (isNaN(myDate)){
				if(_text.indexOf(_split)>=0){				
			        var arys= _text.split(_split);	
					switch(arys.length){
						case 1: myDate = new Date(arys[0],0,1); 
								break;						
						case 2:	myDate = new Date(arys[0],--arys[1],1); 								
								break;
						case 3: myDate = new Date(arys[0],--arys[1],arys[2]); 
								break; 
					}			        	  
				}else{
					var tmp = "";				
					switch(_text.length){
						case 4: tmp = _text.substr(0, 4) + "/01/01" ;
								break;						
						case 6: tmp = _text.substr(0, 4) + "/" + _text.substr(4, 2) + "/01" ;								
								break;
						case 8: tmp = _text.substr(0, 4) + "/" + _text.substr(4, 2) + "/" + _text.substr(6, 2);		
								break; 
					}					
					myDate = new Date(Date.parse(tmp));			 
				}
		    }  				
		    return myDate;   
		},				
		jFormatDate: function(_obj, _split){		   
			var date = _obj+"";				
			switch(date.length){
				case 4: date = date.substr(0, 4) + _split + "01" + _split + "01" ;
						break;						
				case 6: date = date.substr(0, 4) + _split + date.substr(4, 2) + _split + "01" ;								
						break;
				case 8: date = date.substr(0, 4) + _split + date.substr(4, 2) + _split + date.substr(6, 2);		
						break; 
			}									
		    return date;   
		},
        /**
         * 重新构造日期格式
         * 20121010构造为2012年10月10日
         * 20121010构造为2012{-/.}10{-/.}10
         * @param _dateStr
         * @param _split
         * @returns {string}
         */
        jRebuildDate: function(_dateStr, _split){
            if(_split!=undefined){
                if(_dateStr&&_dateStr!=undefined&&_dateStr.length==8){
                    return _dateStr.substr(0,4) + _split + _dateStr.substr(4, 2)+ _split+ _dateStr.substr(6, 2);
                }else if(_dateStr&&_dateStr!=undefined&&_dateStr.length==19){
                    return _dateStr.substr(0,4)+ _split + _dateStr.substr(5, 2)+ _split + _dateStr.substr(8, 2);
                }else{
                    return "";
                }
            }else{
                if(_dateStr&&_dateStr!=undefined&&_dateStr.length==8){
                    return _dateStr.substr(0,4)+ "年"+ _dateStr.substr(4, 2)+ "月"+ _dateStr.substr(6, 2)+ "日";
                }else if(_dateStr&&_dateStr!=undefined&&_dateStr.length==19){
                    return _dateStr.substr(0,4)+ "年"+ _dateStr.substr(5, 2)+ "月"+ _dateStr.substr(8, 2)+ "日";
                }else{
                    return "";
                }
            }
        },
        /*
         * 2012-06-01 10转化为1341828000000
         * 20120601 10
         */
        jTime2Utc: function(_timeStr){
            if(_timeStr&&_timeStr!=undefined){
                if(_timeStr.indexOf("-")>=0){
                    var year = _timeStr.substr(0,4);
                    var month = _timeStr.substr(5, 2);
                    month = month.indexOf("0")==0?month.substr(1,1):month;
                    var day = _timeStr.substr(8, 2);
                    day = day.indexOf("0")==0?day.substr(1,1):day;
                    var hour = _timeStr.substr(11, _timeStr.length);
                    hour = (hour.length==2&&hour.indexOf("0")==0)?hour.substr(1,1):hour;
//				this.log(year+","+month+","+day+","+hour);

                    return Date.UTC(year, month-1, day, hour);
                }else if(_timeStr.indexOf("-")<0){
                    var year = _timeStr.substr(0,4);
                    var month = _timeStr.substr(4, 2);
                    month = month.indexOf("0")==0?month.substr(1,1):month;
                    var day = _timeStr.substr(6, 2);
                    day = day.indexOf("0")==0?day.substr(1,1):day;
                    var hour = _timeStr.substr(9, _timeStr.length);
                    hour = (hour.length==2&&hour.indexOf("0")==0)?hour.substr(1,1):hour;
//				this.log(year+","+month+","+day+","+hour);

                    return Date.UTC(year, month-1, day, hour);
                }else{
                    return 0;
                }
            }
        },
		jNum2Date: function(_num, _format){
			var date = new Date();				
		    if(_num&&$.jIsNumber(_num+"")){				
				date.setTime(_num);				
				return date.Format(_format?_format:"yyyy-MM-dd");				
			}else{				
				return "";
			}		   
		},
		jInArray: function(_array, _item){
			return RegExp("\\b"+item+"\\b").test(_array);
		},
		jBetween: function(_d1, _d2){
			var month1 = _d1.substring(5,_d1.lastIndexOf ('-'));   
		    var day1 = _d1.substring(_d1.length,_d1.lastIndexOf ('-')+1);   
		    var year1 = _d1.substring(0,_d1.indexOf ('-'));   
		   
		    var month2 = _d2.substring(5,_d2.lastIndexOf ('-'));   
		    var day2 = _d2.substring(_d2.length,_d2.lastIndexOf ('-')+1);   
		    var year2 = _d2.substring(0,_d2.indexOf ('-'));   
		   
		    var cha = ((Date.parse(month1+'/'+day1+'/'+year1)- Date.parse(month2+'/'+day2+'/'+year2))/86400000);    
		    return Math.abs(cha);   
		},
		jKeyDown: function(_id, _f){
			$('#'+_id).keydown(_f);
		},
		jKeyPress: function(_id, _f){
			$('#'+_id).keypress(_f);
		},
		jKeyUp: function(_id, _f){
			$('#'+_id).keyup(_f);
		},
		jXml2Json: function(_data) {
			var dom;
			if (typeof(_data)=="object") {
				dom = _data;
			}else if (typeof(_data)=="string"){				
				if(this.jIsIE()){                       //IE
					dom = new ActiveXObject("Microsoft.XmlDom");
					dom.async = "false";
					dom.loadXML(_data);			//_data是*.xml或者txt		
				}else{					        //FireFox、Chrome
					if(_data.indexOf(".xml")>=0){
						dom = document.implementation.createDocument("","",null);    //_data是*.xml
						dom.async = "false";
						dom.loadXML(_data);						
					}else{
						dom = new DOMParser().parseFromString(_data, "text/xml");	  //_data是txt
						dom.loadXML(_data,"text/xml");
					}					
				}			
			}
			var exec = function(ele) {
				var o = {};
				var len = (ele.attributes)?ele.attributes.length:0;
				for(var i = 0; i < len; i++){
					o["$" + ele.attributes[i].name] = ele.attributes[i].value;					
				}
				
				len = ele.childNodes.length;
				if(len==0){
					return o;
				}				

				var tmp;
				for ( var i = 0; i < len; i++) {
					tmp = o[ele.childNodes[i].nodeName];
					if (typeof(tmp)=="undefined"){
						if (ele.childNodes[i].childNodes.length==0){
							if (ele.childNodes[i].nodeName == "#text"
									|| ele.childNodes[i].nodeName == "#cdata-section"){
								o["$$"] = ele.childNodes[i].nodeValue;
							} else {
								o[ele.childNodes[i].nodeName] = [exec(ele.childNodes[i])];
							}

						} else {
							o[ele.childNodes[i].nodeName] = [exec(ele.childNodes[i])];
						}
					} else {
						tmp[tmp.length] = exec(ele.childNodes[i]);
						o[ele.childNodes[i].nodeName] = tmp;
					}
				}
				return o;
			};

			var json = {};
			json[dom.documentElement.nodeName] = exec(dom.documentElement);
			return json;
		},
		jAlarmClock: function(_flag,_time,_funs){
			setInterval(function(){
				if(_flag){
					_funs;
					clearInterval();
				}
			}, _time);
		},
		jClzssName: function(_clzss){  
		    if(typeof(_clzss)=="string"){  
		        return _clzss;  
		    }  
		    var cl = _clzss.toString();  
		    if(cl.indexOf("function")<0){  
		        return null;  
		    }else{  
		    	cl = cl.replace("function",""); 		      
		        cl = cl.substring(0, cl.indexOf("("));  
		        cl = cl.replace(" ", "");  
		    }  
		    return cl;  
		},
		jRun: function(_name){
			try{  
			    eval("new "+name+"()");			     
			}catch(e){  
			    alert("Wrong Clzss!");  
			}  
		},
		jMakeArray: function(_obj){
		    return Array.prototype.slice.call(_obj,0);
		},
		jArrayMax: function(_array){
			return Math.max.apply({},_array); 			
		},
		jArrayMin: function(_array){
			return Math.min.apply({},_array); 			
		},
		jIsArray: function(_obj){
			return _obj instanceof Array;
		},
		/**
		 * get date by '_y-_w'
		 * @param _y
		 * @param _w
		 */
		jDateByWeek: function(_y,_w){			
			var date = new Date(_y,0,1);
			date.setTime(date.getTime()+(_w-1)*6048e5);
			return date;
		},
        /**
         * judge if page exsits dom
         * @param _id
         */
        jDomExist: function(_id, _css){
            if(!!_css){
                return $("#"+_id).find("."+_css).length>0;
            }else{
                return $("#"+_id).length>0;
            }
        },
        /**
         * add commas
         *   usage: $.jCommaVal(12345678);
         *   result: 12,345,678
         * @param _val
         * @returns {string}
         */
        jCommaVal: function(_val){
            var delimiter = ","; // replace comma if desired
            _val = new String(_val);
            var minus = _val.indexOf("-")>=0?'-':'';
            var a = _val.split('.',2);
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
            if(d.length < 1) { _val = n; }
            else { _val = n + '.' + d; }
            _val = minus + _val;
            return _val;
        },
        /**
         * round the value
         *   usage:  $.jRoundVal(12345.678, 2);
         *   result: 12345.68
         * @param _val
         * @param _dec
         * @returns {string}
         */
        jRoundVal: function(_val, _dec){
            if( isNaN(_val) ) _val=0; //如果是非数值数据，则设置为0，防止非法数据产生“NaN.00%”结果
            if(_val==null || _val=='') _val=0;
            var sNum = _val + '';
            var idx = sNum.indexOf(".");
            if(idx<0){ //num是整数的情况
                var str_decimal='.';
                if( _dec == 0 ){
                    str_decimal ='';
                }
                for(n=1; n<=_dec; n++){
                    str_decimal += '0';
                }
                return _val+str_decimal;  //format_number(10,2)   四舍五入为 10.00
            }
            var result=0;
            var n = sNum.length - idx -1;  //n代表原来的小数位
            if(_dec < n){
                var e = Math.pow(10,_dec);
                result = Math.round(_val * (e*10)/10) / e;
                //判断result是否包含小数位 (针对情况: format_number(15.9953,2); )
                if((result+'').indexOf('.')==-1){
                    var str_decimal='.';
                    if( _dec == 0 ){
                        str_decimal ='';
                    }
                    for(n=1; n<=_dec; n++){
                        str_decimal += '0';
                    }
                    result += str_decimal;
                }
            }else if(_dec==n){
                result=_val;
            }else if(_dec>n){ //10.0  要转成 10.00 的情况
                var str_1='';
                for(i=1; i<=_dec-n; i++) str_1+='0';
                result = _val+str_1;
            }
            //补足小数位
            var sresult = result+'';
            var decimal_n = sresult.length - sresult.indexOf(".") -1;
            for(i=1; i<=_dec-decimal_n; i++) sresult+='0';
            return sresult;
        },
        /**
         * 任意小数位去尾法
         * @param _val
         * @param _dec
         * @returns {number}
         */
        jFloorVal: function(_val, _dec){
            var val,power=1;
            if(typeof(_val)=="string"){
                val = Number(_val);
            }else{
                val = _val;
            }
            if(!isNaN(val)){
                if(_dec){
                    power = Math.pow(10, _dec);
                    return Math.floor(val*power)/power;
                }else{
                    return Math.floor(val);
                }
            }else{
                return null;
            }
        },
        /**
         * format the value
         * @param _val
         * @param _type
            DATATYPE_INT: 0,
            DATATYPE_DOUBLE: 1,
            DATATYPE_STRING: 2,
            DATATYPE_BOOL: 3,
            DATATYPE_ARRAY: 4,
            DATATYPE_DATE: 5,
            DATATYPE_PERCENT: 6
         * @param _decimal
         * @returns {*}
         */
        jFormatVal: function(_val, _type, _decimal){
            var d = _val==0?0:(_val||"");
            if((d+"").indexOf("<")>=0){
                if((!!$(d+"")&&$(d+"").text()=="-")){
                    return d;
                }
            }else{
                if((d+"")=="-"){
                    return d;
                }
            }
            switch(_type){
                case C$.DATATYPE_DOUBLE:
                    d = $.jCommaVal($.jRoundVal(d,!!_decimal?_decimal:0)); //四舍五入
                    break;
                case C$.DATATYPE_PERCENT:
                    //if data type is percent and the value contains %
                    if((d+"").indexOf("%")>=0){
                        return d;
                    }
                    d = $.jRoundVal(d*100,!!_decimal?_decimal:0)+"%"; //四舍五入
                    break;
                case C$.DATATYPE_INT:
                    d = $.jCommaVal(d);
                    break;
                case C$.DATATYPE_DATE:
                    if((d+"").isNumber()&&(d+"").length>10){
                        d = $.jNum2Date(d, "yyyy-MM-dd hh:mm:ss");
                    }
                    break;
                case C$.DATATYPE_ALLPERCENT://用于已计算好但是未加%的数值
                    //if data type is percent and the value contains %
                    if((d+"").indexOf("%")>=0){
                        return d;
                    }
                    d = $.jRoundVal(d,!!_decimal?_decimal:0)+"%"; //四舍五入
                    break;
                case C$.DATATYPE_BOOL:
                case C$.DATATYPE_STRING:
                case C$.DATATYPE_ARRAY:
                    break;
                default:	break;
            }
            return d;
        },
        /**
        *  比较两个JSON对象，转换为字符串后比较
         */
        jCompJson: function(_json1, _json2){
           return JSON.stringify(_json1)==JSON.stringify(_json2);
        },
        /**
         * 如果数字小于10，则十位补零，多用于时间显示
         * @param _val
         * @returns {string}
         */
        jZeroFill: function(_val){
            return _val<10?("0"+_val):_val;
        },
        /**
         * 页面导出EXCEL
         * @param _tbl
         * @param _name
         */
        jDnExcel: function(_tbl, _name){
            if($.jIsIE()){
                try{
//                    var WshShell=new ActiveXObject("WScript.Shell");
//                    WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1201","0","REG_DWORD");
                    var $curTbl = $("#"+_tbl);
                    $("th a",$curTbl).each(function(){
                        $(this).remove();
                    });
                    $("img",$curTbl).each(function(){
                        $(this).remove();
                    });
                    $("input:hidden",$curTbl).each(function(){
                        $(this).remove();
                    });
                    var tbl = $curTbl[0]
                    ,oXL = new ActiveXObject("Excel.Application") //创建AX对象excel
                    ,oWB = oXL.Workbooks.Add()  //获取workbook对象
                    ,oSheet = oWB.ActiveSheet;  //激活当前sheet

                    var sel = document.body.createTextRange();
                    sel.moveToElementText(tbl);     //把表格中的内容移到TextRange中
                    sel.execCommand("Copy");     //复制TextRange中内容
                    oSheet.Paste();    //粘贴到活动的EXCEL中
                    oXL.Visible = true;    //设置excel可见属性
                }catch(e){
                    $.jLog(e);
                }finally{
//                    WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1201","3","REG_DWORD");
                }
            }else{
                var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function(s) {
                    var tblCont = s.substring(s.indexOf("<table>"), s.indexOf("</table>")+8)
                        ,$curTbl = $(tblCont);
                    s = s.replace(tblCont, "###");
                    $("th a",$curTbl).each(function(){
                       $(this).remove();
                    });
                    $("img",$curTbl).each(function(){
                        $(this).remove();
                    });
                    $("input:hidden",$curTbl).each(function(){
                        $(this).remove();
                    });
                    s = s.replace("###", $curTbl[0].outerHTML);
                    return window.btoa(unescape(encodeURIComponent(s)));
                },
                format = function(s, c) {
                    return s.replace(/{(\w+)}/g,function(m, p) { return c[p]; });
                };
                if (!_tbl.nodeType) {
                    _tbl = document.getElementById(_tbl);
                }
                var ctx = {worksheet: _name || 'Worksheet', table: _tbl.innerHTML};
                window.location.href = uri + base64(format(template, ctx));
    //            var wnd;
    //            wnd = window.open(uri + base64(format(template, ctx)),"", "width=0, height=0,status=0");
    //            wnd.document.execCommand("SaveAs",false,"测试.xls");
    //            wnd.close();
            }
        },
        /**
         *	前端获取table内容组装ExcelJson交后端下载
         * */
        jDnExcelJson: function(_tbl, _name){
        	try{
        		var $curTbl = $("#"+_tbl);
        		var jsonData = "{\"thead\":[";
        		if($curTbl.find(".dataTables_scroll").length>0){//用于滚动表格
        			$(".dataTables_scroll .dataTables_scrollHead .dataTables_scrollHeadInner thead tr",$curTbl).each(function(i){
        				jsonData += "[";
        				$(this).find("th").each(function(j){
        					if (j != 0 ){
        						jsonData +=",";
        					}
        					var dataText = ($(this).text()||"").replace(/\'/g,"‘").replace(/\"/g,"＂");
        					jsonData +="{\"data\":\""+dataText+"\"";
        					var colspan = $(this).attr("colspan");
        					var rowspan = $(this).attr("rowspan");
        					if(!!colspan &&colspan>1){
        						jsonData += ",\"colspan\":"+colspan;
        					}if(!!rowspan && rowspan>1){
        						jsonData += ",\"rowspan\":"+rowspan;
        					}
        					jsonData += "}";
        					
        					//补空列
        					for(var ii = 2; ii <= colspan; ii++){
        						jsonData += ",{\"data\":\"\"}";
        					}
        				});
        				jsonData += "]";
        				if (i < $(".dataTables_scroll .dataTables_scrollHead .dataTables_scrollHeadInner thead tr",$curTbl).length-1){
        					jsonData +=",";
        				}
        			});
        			jsonData+="]";
        			if($(".dataTables_scroll .dataTables_scrollBody tbody tr",$curTbl).length>0){
        				jsonData+=",\"tbody\":[";
        				$(".dataTables_scroll .dataTables_scrollBody tbody tr",$curTbl).each(function(i){
        					jsonData += "[";
        					var thlength = $(this).find("td").length;
        					$(this).find("td").each(function(j){
        						var v = ($(this).text()||"").replace(/\'/g,"‘").replace(/\"/g,"＂");
        						if(v.isInt()){
        							jsonData += "{\"data\":\""+v.replace(/,/g,"")+"\",\"dataType\":0}";
        						}else if(v.isFloat()){
        							jsonData += "{\"data\":\""+v.replace(/,/g,"")+"\",\"dataType\":1}";
        						}else if(v.isPercent()){
        							jsonData += "{\"data\":\""+((v.replace(/,/g,"").replace("%",""))/100)+"\",\"dataType\":6}";
        						}else{
        							if($(this).css("font-weight")=="bold"&&$(this).css("text-align")=="center"){
        								jsonData += "{\"data\":\""+v+"\",\"isFontWeight\":true,\"align\":1}";
        							}else if(($(this).css("font-weight")=="bold"&&$(this).css("text-align")=="left")||($(this).attr("class")!=null&&$(this).attr("class").indexOf("levelOne")>-1)){
        								jsonData += "{\"data\":\""+v+"\",\"isFontWeight\":true,\"align\":0}";
        							}else if($(this).css("text-align")=="right"){
        								jsonData += "{\"data\":\""+v+"\",\"align\":2}";
        							}else{
        								jsonData += "{\"data\":\""+v+"\"}";
        							}
        						}       
        						if (j < thlength-1 ){
        							jsonData +=",";
        						}
        					});
        					jsonData += "]";
        					if (i < $(".dataTables_scroll .dataTables_scrollBody tbody tr",$curTbl).length-1){
        						jsonData +=",";
        					}
        				});
        				jsonData+="]";
        			}
        		}else{//无滚动条表格结构
        			$curTbl.find("thead").eq(0).find("tr").each(function(i){
        				jsonData += "[";
        				$(this).find("th").each(function(j){
        					if (j != 0 ){
        						jsonData +=",";
        					}
        					var dataText = ($(this).text()||"").replace(/\'/g,"‘").replace(/\"/g,"＂");
        					jsonData +="{\"data\":\""+dataText+"\"";
        					var colspan = $(this).attr("colspan");
        					var rowspan = $(this).attr("rowspan");
        					if(!!colspan &&colspan>1){
        						jsonData += ",\"colspan\":"+colspan;
        					}if(!!rowspan && rowspan>1){
        						jsonData += ",\"rowspan\":"+rowspan;
        					}
        					jsonData += "}";
        					
        					//补空列
        					for(var ii = 2; ii <= colspan; ii++){
        						jsonData += ",{\"data\":\"\"}";
        					}
        				});
        				jsonData += "]";
        				if (i < $curTbl.find("thead").find("tr").length-1){
        					jsonData +=",";
        				}
        			});
        			jsonData+="]";
        			if($curTbl.find("tbody").find("tr").length>0){
        				jsonData+=",\"tbody\":[";
        				$curTbl.find("tbody").find("tr").each(function(i){
        					jsonData += "[";
        					var thlength = $(this).find("td").length;
        					$(this).find("td").each(function(j){
        						var v = ($(this).text()||"").replace(/\'/g,"‘").replace(/\"/g,"＂");
        						if(v.isInt()){
        							if(_tbl == "rtVisitorHiddenTbl"){
        								if(j < 5){//此处特殊处理：实时访客-访客名称列统一处理为字符串
            								jsonData += "{\"data\":\""+v.replace(/,/g,"")+"\",\"dataType\":2}";
        								} else{
            								jsonData += "{\"data\":\""+v.replace(/,/g,"")+"\",\"dataType\":0}";
        								}
        							} else{
        								jsonData += "{\"data\":\""+v.replace(/,/g,"")+"\",\"dataType\":0}";
        							}
        						}else if(v.isFloat()){
        							jsonData += "{\"data\":\""+v.replace(/,/g,"")+"\",\"dataType\":1}";
        						}else if(v.isPercent()){
        							jsonData += "{\"data\":\""+((v.replace(/,/g,"").replace("%",""))/100)+"\",\"dataType\":6}";
        						}else{
        							if($(this).css("font-weight")=="bold"&&$(this).css("text-align")=="center"){
        								jsonData += "{\"data\":\""+v+"\",\"isFontWeight\":true,\"align\":1}";
        							}else if(($(this).css("font-weight")=="bold"&&$(this).css("text-align")=="left")||($(this).attr("class")!=null&&$(this).attr("class").indexOf("levelOne")>-1)){
        								jsonData += "{\"data\":\""+v+"\",\"isFontWeight\":true,\"align\":0}";
        							}else if($(this).css("text-align")=="right"){
        								jsonData += "{\"data\":\""+v+"\",\"align\":2}";
        							}else{
        								jsonData += "{\"data\":\""+v+"\"}";
        							}
        						}       
        						if (j < thlength-1 ){
        							jsonData +=",";
        						}
        					});
        					jsonData += "]";
        					if (i < $curTbl.find("tbody").find("tr").length-1){
        						jsonData +=",";
        					}
        				});
        				jsonData+="]";
        			}
        		}
        		jsonData+="}";
        		
                var toExcelForm = $("#downloadTableToExcelForm");
                if(toExcelForm && toExcelForm.length == 1){
                	toExcelForm.remove();
                }
                var excelForm= $("<form></form>");
                var url = context_path+"/shopAnalysis/downReportExcel.action";
                excelForm.attr("id","downloadTableToExcelForm");
                excelForm.attr("action",url);
                excelForm.attr("method","POST");
                excelForm.attr("style","display:none");
                var v = "<input type='hidden' name='filter.fileName' value='"+_name+"' /><input type='hidden' name='filter.data' value='"+jsonData+"' />" ;
                excelForm.html(v);
                excelForm.appendTo("body");
                excelForm.submit();
                //window.location.href= context_path+"/shopAnalysis/downReportExcel.action?filter.fileName="+_name+"&filter.data="+jsonData;
        	}catch(e){
                $.jLog(e);
            }
        },
        /**
         * 生成随机数
        * @param _num
         */
        jRandom: function(_num){
            return Math.floor(Math.random()*_num+1);
        },
        /**
         * 对象的深度克隆
         * @param _obj
         * @returns {*}
         */
        jClone: function(_obj){
            if(!_obj||'object'!=typeof _obj){
                return _obj;
            }
            var p,v,c = Object.prototype.toString.call(_obj) =='[object Array]'?[]:{};
            for(p in _obj){
                if(_obj.hasOwnProperty(p)){
                    v = _obj[p];
                    if(v&&'object'==typeof v){
                        c[p] = this.jClone(v);
                    }else{
                        c[p] = v;
                    }
                }
            }
            return c;
        },
        jLog: function(_args){
            try{
                console.log("["+new Date().Format("YYYY-MM-DD hh:mm")+"]"+_args);
            }catch(e){
                // not support console method (ex: IE)
            }
        },
        /**
         * 通过周数获取当前周
         * @param _num  周数
         * @param _y 年份
         * @returns {Array}
         */
        jGetWeekByNum: function(_num, _y){
           var date = new Date(!!_y?_y:date.getFullYear(),0,1),time;
           time = date.getTime();
           return new Date(time+(_num-1)*7*864e5).curWeek();
        },
        /**
         *
         * @param date
         * @param fmt
         * @returns {*}
         */
        jDate2Str:function(date,fmt){//将日期按指定格式forma
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        /**
         * 将日期字符串(yyyy-MM-dd hh:mm:ss /yyyy-MM-dd )转化成日期类型
         * @param _dateStr
         * @returns {*}
         */
        jStr2Date:function(_dateStr){
            if(!!_dateStr){
                return  new Date(Date.parse(_dateStr.replace(/-/g,"/")));
            }else{
                return null;
            }
        },
        /**
         * 判断对象是否方法
         * @param _obj
         * @returns {boolean}
         */
        jIfFunction: function(_obj){
            return (typeof(_obj)!='undefined')&&(_obj instanceof Function);
        },
        /**
         * 判断对象是否对象
         * @param _obj
         * @returns {boolean}
         */
        jIfObject: function(_obj){
            return typeof _obj!='undefined'&&typeof _obj == "object";
        },
        /**
         * 脚本文件的引用路径增加时间戳规避缓存
         * @param url
         * @returns {*}
         */
        jConvertSrc: function(url){
            var timstamp = (new date).valueOf();
            if (url.indexOf("?")>=0){
                url = url + "&t=" + timstamp;
            }else {
                url = url + "?t=" + timstamp;
            };
            return url;
        },
        /**
         * val是否以s结尾
         */
        jEndWith:function(_val,_s){
        	if(_s==null||_s==""||_s.length==0||_s.length>_val.length)
        		return false;
    		if(_val.substring(_val.length-_s.length)==_s)
        		return true;
    		else
        		return false;
    		return true;
        },
        /**
         * 按规则筛选CSS样式表中的规则
         * @param _cssFileName CSS文件名
         * @param _re 正则式
         */
        jFilterCss: function(_cssFileName, _re){
            var sheets = document.styleSheets,cssRules,rules = [];
            for(var i in sheets){
                if(i.isNumber()){
                    if(sheets[i].href.indexOf(_cssFileName)>=0){
                        cssRules = sheets[i].cssRules||sheets[i].rules;
                        for(var j in cssRules){
                            if(j.isNumber()&&_re.test(cssRules[j].selectorText)){
                                rules.push(cssRules[j].selectorText);
                            }
                        }
                    }
                }
            }
            return rules;
        }
	});
})(jQuery);
