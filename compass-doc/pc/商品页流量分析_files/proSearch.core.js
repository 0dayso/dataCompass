$(document).ready(function() {
	pageInit();
});

/* 商品名称模糊查询 @author libin  start*/
var widthDiv,
	is_spu = 1,
	ifSel="nosel";

function sel(obj){
	cancelMoreProNames();
	//$('#goodscode').val($(obj).text()); //把点击选中的商品名称显示到input
	$('#goodscode').val($(obj).attr('xname') ); //把点击选中的商品名称显示到input
	$('#goodscodeHide').val( $(obj).attr('xid') ); //把点击选中的商品名称的商品编号赋值到隐藏域
	currentSelId = $(obj).attr('xid');
	currentSelName = $(obj).attr('xname');
	$('#showPro').css('visibility','hidden'); //隐藏下拉.
	ifSel="seled";
	linkFlag=false;
	renderData();
}

function search_spu(){
	$('#goodscodeHide').val($('#goodscode').val());
	currentSelId = $('#goodscode').val();
	$('#showPro').css('visibility','hidden'); //隐藏下拉.
	ifSel="seled";
	linkFlag=false;
	renderData();
}

//关闭弹出层
function cancelMoreProNames(){
	tb_remove();
}
//显示弹出层
function showMoreProNames(){	
	getProInfo(null,'1','1',"next");
}

/*
 * 商品名称模糊搜索发送请求
 * @author libin
 */
var totalIndex="1";
function getProInfo(obj,pageIndex,ifShowMore,pageType){
	try{
	
	//如果商品名称为空，直接返回
	if($('#goodscode').val()=='') {
		$('#showPro').css('visibility','hidden');
		return false;
	}
	//如果直接输入商品编号，则不进行商品名称模糊搜索
	if((/^\d{1,10}$/.test($("#goodscode").val())) && $("#goodscode").val().length==10){
		$('#goodscodeHide').val($('#goodscode').val());
		ifSel="seled";
		return false;
	}else if($('#ifItemHidden').val()=="1"){//按货号查询，不进行模糊商品名称搜索
		return false;
	}
	
	return false;
	
	//以下为通过商品名称模糊搜索
	if(pageIndex<1)
		pageIndex=1;
	var shopId=$("#pageShopIdHidden").val();
	var proName=$("#goodscode").val();
	//is_spu=$('#ifSkuHidden').val();
	//TODO 临时设定为只用spu
	is_spu = "1";
	//temp
	//is_spu = 1;
	//console.log(is_spu);
	proName=encodeURI(proName);
	var url=context_path+"/dataModel/ProTrendGetProAction.action";
		 $.ajax({
         type: "POST",
         url: url,
         data : "proName=" + proName+"&shopId="+shopId+"&is_spu="+is_spu+"&pageIndex="+pageIndex,
         dataType: "json",
         success: function (msg) {
		 		 ifSel="nosel";
				 var resultFormat="";
				 var result=eval(msg);
		     	 var resultContent=eval("(" + result.resultData + ")");
		     	 //获取总页数，判断是否分页
		     	 var pageCount=resultContent.Head.Summary.Page.PageCount !=null ? resultContent.Head.Summary.Page.PageCount : 0;
		     	 //获取总记录数
		     	 var resultCount=resultContent.Head.Summary.ResultCount !=null ? resultContent.Head.Summary.ResultCount : 0;
		     	 
		     	 if(resultContent.Paragraph){//有数据
			     		for(var inx in resultContent.Paragraph){
				     		var wareName=resultContent.Paragraph[inx].Content.warename;
				     		var wareId=resultContent.Paragraph[inx].wareid;
				     		if(is_spu=="1")
				     			wareId=wareId.replace("-","");
				     		wareName=wareName.replace(/\"skcolor_ljg\">/g,"'skcolor_ljg'%");
				     		wareName=wareName.replace(/<font/g,"%font").replace(/<\/font>/g,"%/font%");
				     		resultFormat +="{wareName:\"" + wareName + "\",wareId:\"" + wareId + "\"},";
			     		}
		     	
		     		var prosInfoFormat=resultFormat.substring(0,resultFormat.length-1);
		     		//prosInfoFormat=prosInfoFormat.replace(/<\/?[^>]*>/g,'');
		     		prosInfoFormat="["+prosInfoFormat+"]";
			     	prosInfoFormat=eval(prosInfoFormat);
			     	
		     		//弹出层显示更多商品信息
		     	    if(ifShowMore=="1"){
			     	    var moreProTb="<table style='border-collapse:collapse;width:100%'>";
		     	    	for(var i in prosInfoFormat){
		     	    		var allProName=prosInfoFormat[i].wareName.replace(/%font class='skcolor_ljg'%/g,"").replace(/%\/font%/g,"");
		     	    		moreProTb+="<tr width=\"100%\" onmouseover=\"this.style.background='#fcf4ea'\" onmouseout=\"this.style.background='#ffffff'\">";
		     	    		moreProTb+="<td style='text-align:left;height:24px;line-height:24px;padding:1px 4px;border:1px solid #CCC;cursor:pointer' onclick='sel(this)' xname='" + allProName +"' xid='" + prosInfoFormat[i].wareId +"'>";//添加点击事件和手形样式
		 		     	    var tempWareName=prosInfoFormat[i].wareName;
		 		     	    var wareInx=tempWareName.indexOf($("#goodscode").val());
		 		     	    //var wareLength=$("#goodscode").val().toString().length;
		 		     	    var wareInx=tempWareName.indexOf("skcolor_ljg");//按返回结果对关键字标红
				     	    if(wareInx>-1){
				     	    	moreProTb+=tempWareName.replace(/%font class='skcolor_ljg'%/g,"<span style=\"color:#ff0000\">").replace(/%\/font%/g,"</span>");
				     	    }else{
				     	    	moreProTb+=allProName;
				     	    }
		 		     	  moreProTb+="</td></tr>";
		     	    	}
		     	    	moreProTb += "</table>";
		     	    	document.getElementById("moreProNames").innerHTML=moreProTb;

		     	   		var preIndex=parseInt(totalIndex)-1>0?parseInt(totalIndex)-1:totalIndex;
		     	 		var nextIndex=parseInt(totalIndex)+1<=parseInt(pageCount)? parseInt(totalIndex)+1:totalIndex;
		     	 		//totalIndex=pageType=="next"? nextIndex :preIndex;
		     	 		
		     	 		if(parseInt(pageIndex)>parseInt(pageCount))
		     	 			pageIndex=pageCount;
		     	 		totalIndex=pageIndex;
		     	 		
		     	 		//最后一页 和 第一页 显示样式
		     	 		if(pageIndex==pageCount){
		     	 			$("#nextPage span").addClass("disabled");
		     	 			$("#prePage span").removeClass("disabled");
		     	 		}else if(parseInt(pageIndex)>1 && parseInt(pageIndex)<parseInt(pageCount)){
		     	 			$("#nextPage span").removeClass("disabled");
		     	 			$("#prePage span").removeClass("disabled");
		     	 		}else if(parseInt(pageIndex)==1){
		     	 			$("#prePage span").addClass("disabled");
		     	 			$("#nextPage span").removeClass("disabled").removeAttr('disabled');
		     	 		}
		     	 		else if(parseInt(pageIndex)==2 && parseInt(pageCount)==2){
		     	 			$("#prePage span").addClass("disabled");
		     	 		}
		     	 		document.getElementById("proNamesInfo").innerHTML=" 当前为第 "+"<span style='color:Red'>"+totalIndex+"</span> 页，共有："+pageCount+" 页，"+resultCount+" 条记录。";
		     	    	tb_show('','#TB_inline?height=390&width=800&inlineId=moreProNamesDiv&modal=true',false);	
			     		return;
			     	}

		     	   widthDiv = obj.offsetWidth*2;//文本框的宽度，层随此宽度
		     	   var content = "<table width=100%>";
		     	   //下拉列表 将模糊搜索信息展现出来
		     	   for(var i in prosInfoFormat){
		     		var tdTitle=prosInfoFormat[i].wareName.replace(/%font class='skcolor_ljg'%/g,"").replace(/%\/font%/g,"");
		     	    content+="<tr width=\"100%\" onmouseover=\"this.style.background='#fcf4ea'\" onmouseout=\"this.style.background='#ffffff'\">";
		     	    content+="<td style='text-align:left;height:24px;padding:1px 4px;cursor:pointer' onclick='sel(this)' xname='" + tdTitle +"' xid='" + prosInfoFormat[i].wareId +"'>";//添加点击事件和手形样式
		     	    var tempWareName=prosInfoFormat[i].wareName;
		     	    var wareInx=tempWareName.indexOf("skcolor_ljg");
		     	    if(wareInx>-1){
		     	    	var tempContent=tempWareName.replace(/%font class='skcolor_ljg'%/g,"<span style=\"color:#ff0000\">").replace(/%\/font%/g,"</span>");
		     	    	//tempContent=tdTitle.length>24?tdTitle.substr(0,24)+"..." :tdTitle;
		     	    	try{
		     	    		tempContent=transStr(tempContent);
		     	    	}catch(e){tempContent=tdTitle.length>24?tdTitle.substr(0,24)+"..." :tdTitle;}
		     	    	content+="<span title=\""+tdTitle+"\">" +tempContent + "</span>";
		     	    }else{
		     	    	var tempContent=tdTitle.length>24?tdTitle.substr(0,24)+"..." :tdTitle;
		     	    	content+="<span title=\""+tdTitle+"\">"+tempContent+"</span>";
		     	    }
		     	    content+="</td></tr>";
		     	   }
		     	   if(pageCount>1)
		     		  content+="<tr><td><span class='choose cursorPointer' style='color:blue' onclick='showMoreProNames()'>查看更多..</span></td></tr>";
		     	   content += "</table><div style='height:5px'></div>";
		     	   document.getElementById("showPro").innerHTML=content;
		     	   document.getElementById("showPro").style.visibility="visible";//显示层
		     	   document.getElementById("showPro").style.width=300;
		     	   //document.getElementById("showPro").style.width=(parseInt(widthDiv)+4);//设定层的宽度和文本框同宽
			       var m = $("#showPro");  
			       m.css("height","auto");  
			       if(m.height()>290){  
			     	  m.css("height","295px");  
			     	  m.css("width","300px");  
			     	  //m.css("overflow-y","scroll");  
			       }  
		     	   
		     	}else{//没数据
		     		$('#showPro').css('visibility','hidden'); //隐藏下拉.
			    }
         }
     });
	}catch(e){}
 }

function transStr(str1){
	var str2=str1.replace(/<span style=\"color:#ff0000\">/g,"").replace(/<\/span>/g,"");
	var str3="<span style=\"color:#ff0000\"></span>";//35
	
	var count=(str1.length-str2.length)/str3.length;
	var str=str1.replace(/<span style=\"color:#ff0000\">/g,"#").replace(/<\/span>/g,"@");
	var length=str.length;
	var childStr;
	if(count>0){
		for(var i=0;i<count;i++){
			var len;
			if(length>26+i*2){
				len=26+i*2;
			}else{
				len=length;
			}
			childStr=str.substr(0,len-1);

			var tmpStr=childStr.replace(/#/g,"").replace(/@/g,"");
			if(tmpStr.length==26){
				break;
			}else if(tmpStr.length>26){
				childStr=childStr.substr(0,childStr.length-1);
				break;
			}
		}
	}else{
		var len;
		if(str1.length>26){
			len=26;
		}else{
			len=str1.length;
		}
		childStr=str1.substr(0,len-1);
	}
	childStr=childStr.replace(/@/g,"</span>").replace(/#/g,"<span style=\"color:#ff0000\">");
	var lastSpanStartIndex=childStr.lastIndexOf("<span");
	var lastSpanEndIndex=childStr.lastIndexOf("span>");
	if(lastSpanStartIndex>lastSpanEndIndex){
		childStr=childStr+"</span>";
	}
	if(childStr.length==26) childStr=childStr+"...";
	return childStr;
}
/* 商品名称模糊查询 end*/

/*
 * 选择SPU SKU 货号 选项 @author libin
 */
function pageInit() {
	
	inputInit("请输入SPU号");
	$("#warnMessage").val(2);
	$("#goodscode").bind('focus', function() {
		if ($("#warnMessage").val() == 2) {
			$("#goodscode").val("");
			$("#goodscode").removeClass("font_color_ccc");
			$("#goodscode").removeClass("font_color_red");
			$("#warnMessage").val(1);
		}
	}).bind('keyup', function() {
		if ($("#goodscode").val() != "") {
			$("#warnMessage").val(0);
		}
	}).bind('blur', function() {
		if ($("#goodscode").val() == "") {
			if (Sku == true) {
				$("#goodscode").val("请输入SPU号");
			} else {
				$("#goodscode").val("请输入商品名称或SKU号");
			}

			$("#goodscode").addClass("font_color_ccc");
			$("#warnMessage").val(2);
		} else {
			$("#warnMessage").val(2);
		}
	}).bind('paste', function() {
		var el = $("#goodscode");
		setTimeout(function() {
			getProInfo(el, '1', '0', '');
		}, 100);
	});
//TODO 临时去掉mouseMover事件，只开放spu搜索
//	$('.gsItems').bind('mouseover', function() {
//		$('.gsItems').addClass('up');
//	}).bind('mouseout', function() {
//		$('.gsItems').removeClass('up');
//	});
//	
	$('.gsItems li').bind('click', function() {
		var _c = $(this).clone('true');
		$('.gsItems').prepend(_c);
		$(this).remove();
		switch ($(this).text()) {
		case "按SKU或商品名称搜索":
			ifSel="nosel";
			$('#isMergeSKU').val("false");//查询 是否合并SKU序列化参数用
			$('#ifSkuHidden').val("0");//商品模糊查询获取 是否合并SKU用
			$('#ifItemHidden').val("0"); //是否选择按货号查询 0否 1是
			$("#warnMessage").val(2);
			$('#showPro').css('visibility','hidden'); //隐藏下拉.
			inputInit("请输入商品名称或SKU号");
			break;    
		case "按SPU搜索":
			ifSel = "nosel";
			$('#isMergeSKU').val("true");// 查询 是否合并SKU序列化参数用
			$('#ifSkuHidden').val("1");// 商品模糊查询获取 是否合并SKU用
			$('#ifItemHidden').val("0");// 是否选择按货号查询 0否 1是
			$("#warnMessage").val(2);
			$('#showPro').css('visibility', 'hidden'); // 隐藏下拉.
			inputInit("请输入SPU号");
			break;
		}
	});
}

/*
 * 选择不同的类型 提示信息相应改变
 * @type 提示信息
 * @author libin
 */
function inputInit(type){
	
	$("#goodscode").unbind('blur');
	$("#goodscode").val(type);
	$("#goodscode").removeClass("font_color_red");
	$("#goodscode").addClass("font_color_ccc");
	
	$("#goodscode").bind('focus',function(){
		if($("#warnMessage").val()==2){
			$("#goodscode").val("");
			$("#goodscode").removeClass("font_color_ccc");
			$("#goodscode").removeClass("font_color_red");
			$("#warnMessage").val(1);
		}
	}).bind('keyup',function(){
		if($("#goodscode").val()!=""){
			$("#warnMessage").val(0);
		}
	}).bind('blur',function(){
		if($("#goodscode").val()==""){
			$("#goodscode").val(type);
			$("#goodscode").addClass("font_color_ccc");
			$("#warnMessage").val(2);
		}else{
			$("#warnMessage").val(2);
		}
	}).bind('paste',function(){
		setTimeout(function() {
			getProInfo($("#goodscode"),'1','0','');
		}, 100);
	});
}