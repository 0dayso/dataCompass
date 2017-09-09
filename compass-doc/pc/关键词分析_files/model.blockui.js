$.blockUIV2   = function(autoCloseTime) { showLoadingV2(autoCloseTime); };
$.unblockUIV2 = function() { closeDiv(); };

function showLoadingV2(autoCloseTime,loadTextFlag) {
	$(document.body).append('<div id="BgDiv"></div>');
	var DialogDiv2 = '<div id="DialogDiv2" style="display:none"><div class="form">';
	if(!!loadTextFlag){//加入计算提示
		DialogDiv2 += '<img src="'+context_path+'/skin/i/timeAlert.png"/><br/><br/><br/><br/>';
	}
	DialogDiv2 += '<img src="'+context_path+'/skin/i/waiting.gif" /></div></div>';
	$(document.body).append(DialogDiv2);
	//$("#BgDiv").css("cursor", "wait");
	//$("#DialogDiv2").css("cursor", "wait");
	$("body").css("cursor", "progress");

	var mode = document.documentMode || 0;
	var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;
	if(ie6){
		$("#DialogDiv2").css("position", "absolute");
		$("#DialogDiv2").css("behavior", "url(../../js/div.htc)");
		var _top = ($(window).height()-$("#DialogDiv2").height())/2+$(document).scrollTop();
		document.getElementById('DialogDiv2').style.top =_top;
		$(window).bind("scroll",processScroll);
	}

	$("#BgDiv").css({ display: "block", height: $(document).height()-5 });
	$("#DialogDiv2").css("display", "block");
	if(autoCloseTime>=0){
		setTimeout(closeDiv, autoCloseTime*1000); 
	}
}

function closeDiv() {
	$("select").attr("disabled",false);
	//$("#BgDiv").css("cursor", "auto");
	//$("#DialogDiv2").css("cursor", "auto");
	$("body").css("cursor", "default");
	
	$("#BgDiv").css("display", "none");
	$("#DialogDiv2").css("display", "none");
	
	$("#BgDiv").remove();
	$("#DialogDiv2").remove();
	$(window).unbind("scroll",processScroll);
}

function processScroll(){
	if(document.getElementById('DialogDiv2')){
		var _top = ($(window).height()-$("#DialogDiv2").height())/2+$(document).scrollTop();
		document.getElementById('DialogDiv2').style.top =_top;
	}
}