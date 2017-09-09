$(function(){
	var end = {
		elem : '#endDate',
		format : 'YYYY-MM-DD',
		istoday : false,
		min:'2016-11-01',
		max : laydate.now(),
		choose : function(datas) {
		}
	};
	laydate(end);

	//设置本页layer皮肤
	layer.config({
		skin : 'layui-layer-molv',
	});
	
})