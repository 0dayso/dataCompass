var channelId = "";
$(function(){
	var start = {
		elem : '#startDate',
		format : 'YYYY-MM-DD',
		istoday : false,
		min:'2016-11-01'
	};
	var end = {
		elem : '#endDate',
		format : 'YYYY-MM-DD',
		min:'2016-11-01',
		istoday : false
	};
	laydate(start);
	laydate(end);

	//设置本页layer皮肤
	layer.config({
		skin : 'danlan',
	});
	
	
	
	
	//修改渠道
	$("#channelId").on("change",function(){
		var channelId = $("#channelId").val();
		if(channelId!=null && channelId!=""){
			$.post("channelurl/findChannelurlByCId.html",{id:channelId},function(data){
				if(data.RESPONSE_STATE=="200"){
					var html = '<select class="form-control m-b" name="channelurl"><option value="">请选择渠道链接</option>';
					
					for(var i=0,len=data.channelurls.length;i<len;i++){
						html += '<option value="'+data.channelurls[i].id+'">'+data.channelurls[i].name+'</option>';
					}
						html += '</select>';
					
					$("#channelurl").html(html);
					
					if(channelurl){
						$("div#channelurl select").val(channelurl);
						channelurl = "";
					}
					
				}else{
					layer.alert(data.ERROR_INFO, {
						icon : 0
					});
				}
			})
		}else{
			var html = '<select class="form-control m-b" name="channelurl"><option value="">请选择渠道链接</option></select>';
			$("#channelurl").html(html);
		}
	})

	if(channelId){
		$("#channelId").val(channelId);
		$("#channelId").trigger("change");
		
	}
	
	
	
})