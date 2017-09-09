$(function(){
	var start = {
		elem : '#startDate',
		format : 'YYYY-MM-DD',
		min:'2016-11-01',
		istoday : false,
		choose : function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	var end = {
		elem : '#endDate',
		format : 'YYYY-MM-DD',
		min : laydate.now(),
		istoday : false,
		choose : function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	laydate(start);
	laydate(end);

	//设置本页layer皮肤
	layer.config({
		skin : 'molv',
	});
	
})