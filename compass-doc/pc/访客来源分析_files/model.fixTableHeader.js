/**
 * //初始化普通表格活动表头 DEMO
   new FixTableHeader({id:"..."})
 * @param option
 * @returns
 */
function FixTableHeader(option){
	this.opt ={
		id:"fixTable"
	};
	this.opt = $.extend(this.opt,option);
	this.init();
}
FixTableHeader.prototype = {
	init:function(){
		this.createFixHeader();
		this.show();
		this.doScroll(this.opt.id);
        if(window.navigator.userAgent.indexOf("MSIE") !=-1){
            this.clickFixHeader();
        }
	},
    clickFixHeader:function(){
        var _=this;
        if ($('.dataTables_fixed').size() ==1 ) {
            $('.dataTables_fixed th').click(
                function(){
                    _.show();
                }
            );
        }
    },
	createFixHeader:function(){
		var once = true;
		if ($('.dataTables_fixed').size() ==1 ) {
			once = false;
			$('.dataTables_fixed,.dataTables_fixed_scroll,.dataTables_fixed_check').remove();
		}
		var fixed_left = $('#'+this.opt.id+'_wrapper');
		
		if($(".dataTables_scroll",fixed_left).html() != undefined && $(".dataTables_scroll",fixed_left).html() != null){
			//左右滚动
			var fixed_scoll = $('.dataTables_scrollHead',fixed_left);
			var fixed_scoll_clone = fixed_scoll.clone(true);
			fixed_scoll_clone.css({
				display:'none',
				overflow:'hidden',
				position:'fixed',
				width:$('.dataTables_scroll',fixed_left).outerWidth(),
				left:h_width+h_left,
				top:0
			});
			fixed_scoll_clone.addClass('dataTables_fixed');
			$('#'+this.opt.id+'_wrapper').append(fixed_scoll_clone);
			
			//显示定位用的
			$('.dataTables_scrollBody',fixed_left).append('<div class="dataTables_fixed_check"></div>');

			//总宽
			var scroll_w = $('.dataTables_scrollBody',fixed_left).find('table').outerWidth() ;
			//实际宽
			var scroll_w2 = fixed_left.outerWidth() - h_width;
			
			var html = '<div class="dataTables_fixed_scroll" style="width:'+scroll_w2+'px;overflow: auto;position:fixed;bottom:0;left:'+(h_width+h_left)+'px;z-index:100;"><div class="dataTables_fixed_scroll_main" style="width:'+scroll_w+'px;height:16px;"></div></div>';
			//控制滚动
			fixed_left.append(html);
			
			//双向滚动
			var scroll_body = $('.dataTables_scroll',fixed_left);
            var scroll_body1 = $('.dataTables_scrollBody',fixed_left);
            $('.dataTables_fixed_scroll',fixed_left).scroll(function(){
				var left = $(this).scrollLeft();
				 scroll_body.scrollLeft(left);
				 $('.dataTables_fixed',fixed_left).scrollLeft(left);
			});

			scroll_body.scroll(function(){
				 var left = $(this).scrollLeft();
				 $('.dataTables_fixed_scroll',fixed_left).scrollLeft(left);
				 $('.dataTables_fixed',fixed_left).scrollLeft(left);
			});

			if(scroll_body.scrollLeft()>0){
				var left = scroll_body.scrollLeft();
				$('.dataTables_fixed_scroll',fixed_left).scrollLeft(left);
				$('.dataTables_fixed',fixed_left).scrollLeft(left);
			}

            if(!!scroll_body1){
                scroll_body1.scroll(function(){
                    var left = $(this).scrollLeft();
                    $('.dataTables_fixed_scroll',fixed_left).scrollLeft(left);
                    $('.dataTables_fixed',fixed_left).scrollLeft(left);
                });
                if(scroll_body1.scrollLeft()>0){
                    var left = scroll_body.scrollLeft();
                    $('.dataTables_fixed_scroll',fixed_left).scrollLeft(left);
                    $('.dataTables_fixed',fixed_left).scrollLeft(left);
                }
            }
		}else{
			//无左右滚动
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
			fixed_left_clone.addClass('dataTables_fixed');
			$('#'+this.opt.id+'_wrapper').append(fixed_left_clone);
		}
		
		$(".dataTables_fixed .dataTables_filter,.dataTables_fixed table tbody,.dataTables_fixed .dataTables_length,.dataTables_fixed .dataTables_paginate").remove();
	},
	show:function(){
		var dataTables_fixed = $('.dataTables_fixed',$('#'+this.opt.id+'_wrapper'));
		var top = $('#'+this.opt.id).offset().top;
		var scrollTop = $(document).scrollTop();
        if ( scrollTop > top ){
			dataTables_fixed.show();
		}else{
			dataTables_fixed.hide();
		}
		
		if($(".dataTables_scroll",$('#'+this.opt.id+'_wrapper')).html() != undefined && $(".dataTables_scroll",$('#'+this.opt.id+'_wrapper')).html() != null){
			var doc = document.compatMode == "BackCompat" ? document.body : document.documentElement;
			var clientHeight = doc.clientHeight;
			var fixed_check_top = $('.dataTables_fixed_check',$('#'+this.opt.id+'_wrapper')).offset().top;
			var fixed_scroll = $('.dataTables_fixed_scroll',$('#'+this.opt.id+'_wrapper'));
			if ( (scrollTop+clientHeight) < fixed_check_top ) {
				fixed_scroll.css({visibility:'visible'});
			}else {
				fixed_scroll.css({visibility:'hidden'});
			}
		}
	},
	doScroll:function(_id){
		$(window).scroll(function(){
			var dataTables_fixed = $('.dataTables_fixed',$('#'+_id+'_wrapper'));
			var top = $('#'+_id).offset().top;
			var scrollTop = $(document).scrollTop();
            if ( scrollTop > top ){
				dataTables_fixed.show();
			}else{
				dataTables_fixed.hide();
			}
			
			if($(".dataTables_scroll",$('#'+_id+'_wrapper')).html() != undefined && $(".dataTables_scroll",$('#'+_id+'_wrapper')).html() != null){
				var doc = document.compatMode == "BackCompat" ? document.body : document.documentElement;
				var clientHeight = doc.clientHeight;
				var fixed_check_top = $('.dataTables_fixed_check',$('#'+_id+'_wrapper')).offset().top;
				var fixed_scroll = $('.dataTables_fixed_scroll',$('#'+_id+'_wrapper'));
				if ( (scrollTop+clientHeight) < fixed_check_top ) {
					fixed_scroll.css({visibility:'visible'});
				}else {
					fixed_scroll.css({visibility:'hidden'});
				}
			}
		});
	}
};