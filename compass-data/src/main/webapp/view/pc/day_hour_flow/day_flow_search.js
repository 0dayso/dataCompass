$(function(){
	var start = {
		elem : '#startDate',
		format : 'YYYY-MM-DD',
		istoday : false,
		min:'2016-11-01',
		max : laydate.now(),
		choose : function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
		}
	};
	var end = {
		elem : '#endDate',
		format : 'YYYY-MM-DD',
		max : laydate.now(),
		min:'2016-11-01',
		istoday : false,
		choose : function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	laydate(start);
	laydate(end);
})