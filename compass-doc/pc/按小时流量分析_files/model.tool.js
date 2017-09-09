/**
 *  业务工具类
 *  @author daipeng
 */

//判断是否已经加载zb.js
var rootPath = "/odp-web";
rootPath = (typeof(context_path)=="undefined")?rootPath:context_path;
if (typeof(constant_zb)=="undefined") {
	$.getScript(rootPath + "/js/model.zbinfo.js");
}
//判断是否已经加载tool.js
if (typeof(tool)=="undefined") {
	$.getScript(rootPath + "/js/tool.js");
}
//判断是否已经加载sale.protype.js
if (typeof(hasPrototype)=="undefined") {
	$.getScript(rootPath + "/js/model.prototype.js");
}

var hasTool = true;
/**
 * 全局静态类声明一个新的类并提供构造函数支持
 * var Class = {
		create: function(){
			return function(){
				this.initialize.apply(this, args);
			};
		}
	};
	var Tool = Class.create();
	Tool.prototype = {
		initialize: function(_name){
			this.name = _name;
		},
		desc: function(){
			alert(this.name);
		}
	};	
 */

/**
 * Tool类定义
 * @param {Object} _title
 */
function Tool(_title){	
	this.title = _title;
	this.toString = function(){
		return _title;
	};
}

/**
 * 业务相关的工具类
 */
Tool.prototype = {
	constructor: Tool,
	constants: {
		VAL_LEN: 10,
		VAL_DESC: {
			"TOTAL": "汇总",
			"AVG": "平均"
		},
		DATA_TYPE: {
			INT: 0,
			DOUBLE: 1,
			STRING: 2,
			BOOL: 3,
			ARRAY: 4,
			DATE: 5,
			PERCENT: 6
		},
		CHART_TYPE: {
			COL: "column",
			BAR: "bar",
			LINE: "line",
			PIE: "pie"
		},
		CHART_COLOR:{
			PIE: B$.constants.Color.P,
			COL: B$.constants.Color.P,
			BAR: B$.constants.Color.P,
			CLOUD: B$.constants.Color.P
		},
		TIP: {
			NODESC: "暂无描述",
			NODATA: "暂无数据",
			NOCHART: "暂无数据"
		}		
	},	
	tmp: {
		params: []
	},
	desc: function(){
		alert(this.title);
	},
	ua: navigator.userAgent.toLowerCase(),
	isIE: function(){	
	    return this.ua.match(/msie ([\d.]+)/)?true:false;	   
	},
	isFF: function(){	    
	    return this.ua.match(/firefox\/([\d.]+)/)?true:false;
	},
	isCH: function(){		
	    return this.ua.match(/chrome\/([\d.]+)/)?true:false;
	},
	isOP: function(){	    
	    return this.ua.match(/opera.([\d.]+)/)?true:false;
	},
	isSA: function(){	    
	    return this.ua.match(/version\/([\d.]+).*safari/)?true:false;
	},
	sParam: function(_param){
		return (_param||"").indexOf("?")>=0?"&":"?";
	},
	getParams: function(){
		return this.tmp.params;
	},
	getParam: function(_key){
		return this.tmp.params[_key];
	},
	addParam: function(_key, _val){
		this.tmp.params[_key] = _val;
		return this.tmp.params;
	},
	delParam: function(_key){		
		delete this.tmp.params[_key];
		return this.tmp.params;
	},
	clrParam: function(){
		this.tmp.params = [];
		return this.tmp.params;
	},
	serialParam: function(){
		var s = "";
		for (var k in this.tmp.params) {
			s += this.sParam(s) + k + "=" + this.tmp.params[k];
		}		
		return s;
	},
	lenVal: function(_val){
		return _val?(_val.length>this.constants.VAL_LEN?_val.substr(0, this.constants.VAL_LEN)+"...":_val):"";
	},
	lenValParam: function(_val,_param){
		return _val?(_val.length>_param?_val.substr(0, _param)+"...":_val):"";
	},
	param2Str: function(){
		var s = "";
		for (var k in this.tmp.params) {			
			s += k + ":" + this.tmp.params[k] + ",";
		}		
		return s?s.substr(0, s.length-1):"";
	},
	str2Array: function(_s){				
		if(_s){
			return _s.split(",");
		}
		return [];
	},
	idIsDate: function(_text){			
		return ((_text||"")+"").indexOf("Date")>=0||_text.indexOf("date")>=0;
	},
	valItem: function(_id, _val){			
		$("#"+_id).val(_val);		
	},
	transPatt: function(_text, _srcMark, _desMark){
		var reg = new RegExp("("+_srcMark+")","g"); 
		return (((_text=_text==0?(_text+""):_text)||"")+"").replace(reg, _desMark);
	},
	inArray: function(_array, _item){		
		return $.jInArray(_array, _item);
	},
	inJson: function(_json, _item){			
		return _json&&_item&&_json[_item];
	},
	doCN: function(_text){		
		return (this.constants.VAL_DESC[_text||""])?this.constants.VAL_DESC[_text||""]:_text;		
	},
	isNumber: function(_val){
		return _val==this.constants.DATA_TYPE.INT||_val==this.constants.DATA_TYPE.DOUBLE||_val==this.constants.DATA_TYPE.PERCENT;
	},	
	dataPatt: function(_data, _type, _decimal, _precision){		
		var d = _data;			
		switch(_type){			
			case this.constants.DATA_TYPE.DOUBLE:
				if (_decimal) {					
					d = CommaFormatted(format_number(d,_decimal)); //四舍五入
				}
				break;
			case this.constants.DATA_TYPE.PERCENT:					
				if (_decimal) {					
					d = format_number(d*100,_decimal)+"%"; //四舍五入
				}
				break;
			case this.constants.DATA_TYPE.INT:
				d = CommaFormatted(d);
				break;	
			case this.constants.DATA_TYPE.BOOL:	
			case this.constants.DATA_TYPE.STRING:	
			case this.constants.DATA_TYPE.ARRAY:
			case this.constants.DATA_TYPE.DATE:
				break;	
			default:	break;				
		}
		return d;
	},
	//整齐移动数据
	data2Exl: function(_tblId){			
	    var tbl = document.getElementById(_tblId); 
	    var oXL = new ActiveXObject("Excel.Application");   //创建AX对象excel 
	    var oWB = oXL.Workbooks.Add();   //获取workbook对象 
        var oSheet = oWB.ActiveSheet;    //激活当前sheet 
	    var sel = document.body.createTextRange(); 
	    sel.moveToElementText(tbl);     //把表格中的内容移到TextRange中 
	    sel.select();     //全选TextRange中内容 
	    sel.execCommand("Copy");    //复制TextRange中内容 
	    oSheet.Paste();    //粘贴到活动的EXCEL中       
	    oXL.Visible = true;    //设置excel可见属性 
	},
	//单元移动数据
	expExl: function(_tblId){
		var tbl = document.getElementById(_tblId); 
	    var oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel 
	    var oWB = oXL.Workbooks.Add();  //获取workbook对象 
	    var oSheet = oWB.ActiveSheet;  //激活当前sheet   
	    for (var i=0; i<tbl.rows.length; i++){	        
	         for (var j=0; j<tbl.rows(i).cells.length; j++){ 
	             oSheet.Cells(i + 1, j + 1).value = tbl.rows(i).cells(j).innerText;
	         } 
	     } 
    	oXL.Visible = true;   //设置excel可见属性 
	},
	//用法 var map = t$.json2Tree(testJson); var treeArray = map.get(-1);
	json2Tree: function(_json){
		var json = eval("("+_json+")");		
		var treeValue = json.value;			
		if(treeValue&&treeValue.length>0){
			var treeMap = this.newMap();
			if(treeValue.length > 0){
				for(var index in treeValue){
					var parentId=treeValue[index].parent;
					if(treeMap.containsKey(parentId)){
						var existArray = treeMap.get(parentId);
						existArray.push(treeValue[index]);
						treeMap.put(parentId, existArray);
					}else{
						var treeArray = new Array();
						treeArray.push(treeValue[index]);
						treeMap.put(parentId, treeArray);
					}
				}
			}
			return treeMap;
		}else{
			return null;
		}		
	},
	log: function(_args){
		try{
		    console.log("["+new Date().Format("YYYY-MM-DD hh:mm")+"]"+_args);
		   }catch(e){
		    // not support console method (ex: IE)
		}
	},
	newMap: function(){
		return new HashMap();
	},
	isFocus: function(_id){
		return document.activeElement.id == _id;
	},
	newStringBuffer: function(){
		return new StringBuffer();
	},
	//截取日期后两位
	retainLast2Words : function(_text){
		_text = _text==undefined||_text==null ? "" :_text.trim();
		if(_text.length <= 2){
			return _text;
		}else{
			return _text.substring(_text.length-2,_text.length);
		}
	},
	/*
	 * 8:20120601转换为2012年06月01日
	 * 19:2012-06-01 09:00:00转换为2012年06月01日
	 */
	formatDate: function(_dateStr, _split){		
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
	time2Utc: function(_timeStr){		
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
	format:function(date,fmt){//将日期按指定格式forma
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
	dateFromMillis:function(millis){
		var d = new Date();
		d.setTime(millis);
		return d;
	}
};

//实例化一个工具类
var t$ = new Tool("工具类");


