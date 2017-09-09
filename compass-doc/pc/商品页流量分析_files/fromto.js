;
(function() {
	//配置
	var config = {
		url: {
			//url
		}
	};

	//工具类
	var util = {
		/**
		 * 将数据转成千分位
		 * @param num 要转换的数字，可为整数或者浮点数
		 * @param dec 要保留的小数位
		 * @returns {string}
		 */
		formatThousands: function(num, dec) {
			num = Number(num);
			if (dec) {
				num = num.toFixed(dec);
			}
			return (num + '').replace(/^[-\+]?\d+/, function(v) {
				return v.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
			});
		},
		getStrRealLen: function(str) {
			var len = 0,
				i = 0,
				j;
			if (typeof str === 'string') {
				j = str.length;
				while (i < j) {
					len += str.charCodeAt(i++) > 255 ? 2 : 1;
				}
			}
			return len;
		},
		getSubStr: function(str, realLen) {
			var tmp = '',
				ch,
				i = 0,
				j;
			if (typeof str === 'string') {
				while (realLen > 0) {
					ch = str.charAt(i++);
					tmp += ch;
					realLen -= ch.charCodeAt(0) > 255 ? 2 : 1;
				}
			}
			return tmp;
		},
		/*
		 *获取远程数据
		 *url为地址，data为参数（可以省略），callback为回调函数
		 */
		getData: function(url, data, callback) {
			if ($.isFunction(data)) {
				callback = data;
				data = {};
			}
			$.ajax({
				url: url,
				data: data,
				dataType: 'json',
				success: function(res) {
					// console.log(res);
					callback(data);
				},
				error: function() {
					console.log('getData error...');
					console.log(arguments);
				}
			});
		},
		//使用data替换模板中的变量
		formatTpl: function(tpl, data) {
			var reg = /\{\{(.*?)\}\}/g;
			return tpl.replace(reg, function(macths, key, index, str) {
				if (key.indexOf('.') != -1) {
					var tmp = key.split('.'),
						i = 0,
						l = tmp.length,
						v = '',
						d = data;
					for (; i < l; i++) {
						v = d[tmp[i]];
						if (typeof v != 'undefined') { //值可能为false之类的
							d = v;
						} else {
							v = '';
							break;
						}
					}
					return v;
				} else {
					return typeof data[key] != 'undefined' ? data[key] : '';
				}
			});
		}
	};

	//视图

	//来源去向
	var sourceTrendView = {
		option: {
			currentLeftRow: 0
		},
		selector: {
			COMPASS_WRAPPER: 'div.source-trend',
			COMPASS_LEFT: 'div.source-trend div.compass-left',
			COMPASS_RIGHT: 'div.source-trend div.compass-right',
			COMPASS_LEFT_TABLE: '#compassLeftTable',
			COMPASS_RIGHT_TABLE: '#compassRightTable',
			COMPASS_PIC: 'div.source-trend div.compass-pic',
			COMPASS_LEFT_LINE: '#leftLine',
			COMPASS_RIGHT_LINE: '#rightLine',
			NO_DATA: 'div.source-trend div.no-data'
		},
		template: {
			COMPASS_TABLE_ROW: '<tr>' +
				'<td><i class="ico-right"></i><span class="s-name">{{name}}</span></td>' +
				'<td class="s-uv">{{uv}}</td>' +
				'<td class="s-pro">{{proportion}}</td>' +
				'</tr>',
			NO_DATA: '<div class="no-data"><p>暂无数据</p></div>'
		},
		init: function() {
			var _ = this;
			_.showCurrentProduct();
			_.doAnimate();
			$(window).bind('resize', function() {
				_.drawLine();
			}).trigger('resize');
		},
		show: function(sourceData) {
			var tmp, i, len;
			while (sourceData.length < 5) {   //补全左侧
				sourceData.push({
					id: '-',
					name: '-',
					uv: '-',
					proportion: '-',
					trend: []
				});
			}
			for (i = 0, len = sourceData.length; i < len; i++) {  //补全右侧
				tmp = sourceData[i].trend;
				tmp.sort(function(a, b) {
					return (Number(b.uv) || 0) - (Number(a.uv) || 0);
				});
				while (tmp.length < 5) {
					tmp.push({
						id: '-',
						name: '-',
						uv: '-',
						proportion: '-'
					});
				}
			}
			this.render(sourceData);
		},
		render: function(sourceData) {
			var _ = this,
				rowTpl = _.template.COMPASS_TABLE_ROW,
				$lTable = $(_.selector.COMPASS_LEFT_TABLE),
				$lTbody = $lTable.find('tbody'),
				$rTable = $(_.selector.COMPASS_RIGHT_TABLE),
				$rTbody = $rTable.find('tbody'),
				i, len, $tmp;
			$lTbody.empty();
			for (i = 0, len = sourceData.length; i < len; i++) {
				$tmp = $(util.formatTpl(rowTpl, sourceData[i])).click((function(trendData, index) {
					return function() {
						$rTbody.empty();
						for (var i = 0, len = trendData.length; i < len; i++) {
							$rTbody.append(util.formatTpl(rowTpl, trendData[i]));
						}
						$(this).addClass('on').siblings().removeClass('on');
						_.option.currentLeftRow = index; //保存当前被点击显示的行
						_.drawLine();
					}
				})(sourceData[i].trend, i));
				if (sourceData[i].fullname) { //加入一些附加信息
					$tmp.find('td').eq(0).addClass('bus-need-tips').attr('desc', sourceData[i].fullname);
				}
				$lTbody.append($tmp);
				if (!i) { //默认选中第一条
					$tmp.click();
				}
			}
		},
		showCurrentProduct: function() {
			var $pic = $(this.selector.COMPASS_PIC);
			$pic.find('img').attr('src', window.imgSrc);
			$pic.find('h6').html(function() {
				var text = window.proName;
				$(this).addClass('bus-need-tips').attr('desc', text);
				return util.getStrRealLen(text) >= 68 ? util.getSubStr(text, 60) + ' ...' : text; //注意：省略号前面有个空格，是为了防止前面截断的字符串末尾是英文字符与后面的省略号无法断开的缘故
			});
		},
		drawLine: function() {
			var _ = this,
				sel = _.selector,
				width = ($(_.selector.COMPASS_WRAPPER).width() - $(sel.COMPASS_LEFT).width() - $(sel.COMPASS_RIGHT).width() - $(sel.COMPASS_PIC).find('div.pic').outerWidth()) / 2,
				row = _.option.currentLeftRow + 1,
				rightLinePoints, leftLinePoints;

			width = Math.floor(width);

			leftLinePoints = [{
				x: 0,
				y: 20 + Number(row) * 35
			}, {
				x: Math.floor(width * (1 / 3)),
				y: Math.min.call(null, 20 + Number(row) * 35, 100) - 10
			}, {
				x: Math.floor(width * (2 / 3)),
				y: Math.min.call(null, 20 + Number(row) * 35, 100) - 10
			}, {
				x: width,
				y: 100
			}];

			rightLinePoints = [{
				x: 0,
				y: 100
			}, {
				x: Math.floor(width * (1 / 3)),
				y: 133
			}, {
				x: Math.floor(width * (2 / 3)),
				y: 133
			}, {
				x: width - 15,
				y: 123
			}];

			$(sel.COMPASS_LEFT_LINE).css({
				left: $(sel.COMPASS_LEFT).width() + 20,
				width: Math.round(width)
			}).find('svg path').attr('d', (function(lp) { //注意path使用贝塞尔曲线的时候设置的属性 d 的值：Mx1 y1 Cx2 y2, x3 y3, x4 y4
				var str = '';
				str += 'M' + lp[0].x + ' ' + lp[0].y + ' ';
				str += 'C' + lp[1].x + ' ' + lp[1].y + ', ' + lp[2].x + ' ' + lp[2].y + ', ' + lp[3].x + ' ' + lp[3].y;
				return str;
			})(leftLinePoints));

			$(sel.COMPASS_RIGHT_LINE).css({
				right: $(sel.COMPASS_RIGHT).width() + 20,
				width: Math.round(width)
			}).find('svg path').attr('d', (function(lp) {
				var str = '';
				str += 'M' + lp[0].x + ' ' + lp[0].y + ' ';
				str += 'C' + lp[1].x + ' ' + lp[1].y + ', ' + lp[2].x + ' ' + lp[2].y + ', ' + lp[3].x + ' ' + lp[3].y;
				return str;
			})(rightLinePoints));
		},
		doAnimate: function() {
			var c1 = document.getElementById('arrow_left');
			var ctx1 = c1.getContext("2d");
			var c2 = document.getElementById('arrow_right');
			var ctx2 = c2.getContext("2d");

			var gra1;


			var arrow3_left = 0;

			var count = 0,
				x1 = 0,
				step1 = 0,
				x2 = 0,
				x3 = 0,
				rectw = 80,
				rectl = 80;
			var g1 = {
					count: 0,
					x1: 0,
					step1: 0,
					x2: 0,
					x3: 0
				},
				g2 = {
					count: 0,
					x1: 0,
					step1: 0,
					x2: 0,
					x3: 0
				};

			function createArrow(ctx, x1) {
				ctx.save();
				ctx.globalAlpha = 40 / (x1 * 2.1);
				// var x = 
				gra1 = ctx.createLinearGradient(x1, rectl - x1, rectw + x1, -x1);
				gra1.addColorStop(0, '#fff');
				gra1.addColorStop(0.5, '#fff');
				gra1.addColorStop(1, 'rgb(208,232,251)');

				ctx.fillStyle = gra1;

				ctx.fillRect(x1, -x1, rectw, rectl);

				ctx.restore();
			}

			function animate(ctx, g) {
				ctx.clearRect(0, 0, 200, 100);
				ctx.save();
				ctx.rotate(45 * Math.PI / 180);

				g.step1 = Math.abs(Math.sin(g.count / 5)) * 5;
				g.x1 += g.step1;
				createArrow(ctx, g.x1);

				if (g.x1 > 12) {
					g.x2 += g.step1;
					createArrow(ctx, g.x2);
				}
				if (g.x2 > 15) {
					g.x3 += g.step1;
					createArrow(ctx, g.x3);
				}
				if (g.x1 > 45) {
					g.x1 = 0;
					g.x2 = 0;
					g.x3 = 0;
				}

				g.count++;
				if (g.count > 80) {
					g.count = 0;
				}
				ctx.restore();
			}
			setInterval(function() {
				animate(ctx1, g1)
			}, 80);
			setInterval(function() {
				animate(ctx2, g2)
			}, 80);
		},
		showNoData: function() {
			var _ = this,
				sel = _.selector;
			$(sel.COMPASS_LEFT).hide();
			$(sel.COMPASS_RIGHT).hide();
			$(sel.COMPASS_PIC).hide();
			$(sel.COMPASS_LEFT_LINE).hide();
			$(sel.COMPASS_RIGHT_LINE).hide();
			if ($(sel.NO_DATA).length) {
				$(sel.NO_DATA).show();
			} else {
				$(sel.COMPASS_WRAPPER).append(_.template.NO_DATA);
			}
		},
		hideNoData: function() {
			var _ = this,
				sel = _.selector;
			$(sel.NO_DATA).remove();
			$(sel.COMPASS_LEFT).show();
			$(sel.COMPASS_RIGHT).show();
			$(sel.COMPASS_PIC).show();
			$(sel.COMPASS_LEFT_LINE).show();
			$(sel.COMPASS_RIGHT_LINE).show();
		}
	};

	//成交转化
	var conversionView = {
		selector: {
			COMPASS_WRAPPER: 'div.compass-transform',
			COMPASS_PEOPLE: 'div.compass-transform div.compass-people',
			COMPASS_CONTENT: 'div.compass-transform ul.compass-content',
			EXIT_PAGE: '#exitPage',
			TO_OTHER_PAGE: '#toOtherPage',
			PRO_ATTENTION: '#proAttention',
			TO_SHOPPING_CHART: '#toShoppingCart',
			TO_PAY_PAGE: '#toPayPage',
			TO_PAY: '#toPay',
			NO_DATA: 'div.compass-transform div.no-data'
		},
		template: {
			NO_DATA: '<div class="no-data"><p>暂无数据</p></div>'
		},
		init: function() {

		},
		show: function(conversionData) {
			this.render(conversionData);
		},
		render: function(conversionData) {
			var _ = this,
				sel = _.selector,
				map = {},
				tmp;
			//总体数据
			$(sel.COMPASS_PEOPLE).find('.uv').html(util.formatThousands(conversionData.uv))
				.end().find('.pv').html(util.formatThousands(conversionData.pv));

			//各个部分的占比
			//此处做一个DOM和数据之间的映射 [DOM ID] <<==>> [数据属性]，便于循环
			map[sel.EXIT_PAGE] = 'exitPage';
			map[sel.TO_OTHER_PAGE] = 'toOtherPage';
			map[sel.PRO_ATTENTION] = 'proAttention';
			map[sel.TO_SHOPPING_CHART] = 'toShoppingCart';
			map[sel.TO_PAY_PAGE] = 'toPayPage';
			map[sel.TO_PAY] = 'toPay';
			for (var p in map) {
				tmp = conversionData.conversion[map[p]];
				$(p).find('.uv').html(util.formatThousands(tmp.uv))
					.end().find('.name').html(tmp.name)
					.end().find('.percent').html(tmp.proportion.substring(0, tmp.proportion.length - 1))
					.end().find('.circle').map(function() { //调整圆形进度条
						var num = $(this).find('span').text() || 0,
							num = num * 3.6;
						//移除之前的值
						$(this).find('.right, .left').css({
							'-ms-transform': "rotate(0deg)",
							'-moz-transform': "rotate(0deg)",
							'transform': "rotate(0deg)"
						});
						if (num <= 180) {
							$(this).find('.right').css({
								'-ms-transform': "rotate(" + num + "deg)",
								'-moz-transform': "rotate(" + num + "deg)",
								'transform': "rotate(" + num + "deg)"
							});
						} else {
							$(this).find('.right').css({
								'-ms-transform': "rotate(180deg)",
								'-moz-transform': "rotate(180deg)",
								'transform': "rotate(180deg)"
							});
							$(this).find('.left').css({
								'-ms-transform': "rotate(" + (num - 180) + "deg)",
								'-moz-transform': "rotate(" + (num - 180) + "deg)",
								'transform': "rotate(" + (num - 180) + "deg)"
							});
						};
					});
			}
		},
		showNoData: function() {
			var _ = this,
				sel = _.selector;
			$(sel.COMPASS_PEOPLE).hide();
			$(sel.COMPASS_CONTENT).hide();
			if ($(sel.NO_DATA).length) {
				$(sel.NO_DATA).show();
			} else {
				$(sel.COMPASS_WRAPPER).append(_.template.NO_DATA);
			}
		},
		hideNoData: function() {
			var _ = this,
				sel = _.selector;
			$(sel.NO_DATA).remove();
			$(sel.COMPASS_PEOPLE).show();
			$(sel.COMPASS_CONTENT).show();
		}
	};

	//关联分析
	var relationView = {
		selector: {
			COMPASS_WRAPPER: 'div.compass-analysis',
			COMPASS_LEFT: 'div.compass-analysis div.compass-left',
			COMPASS_RIGHT: 'div.compass-analysis div.compass-right',
			COMPASS_LEFT_LIST: '#compassLeftList',
			COMPASS_RIGHT_LIST: '#compassRightList',
			COMPASS_PIC: 'div.compass-analysis div.compass-pic',
			NO_DATA: 'div.compass-analysis div.no-data'
		},
		template: {
			PRODUCT_ITEM: '<li>' +
				'<div class="pic"><img src="{{imgSrc}}"/></div>' +
				'<div class="detail clearfix">' +
				'<p class="text bus-need-tips" desc="{{name}}" oldtext="{{name}}"><a target="_blank" href="{{link}}">{{name}}</a></p>' +
				'<div class="num">' +
				'<p>访客数<i>{{uv}}</i></p>' +
				'<p>较上期<img src="{{_img_}}" alt=""/><i class="{{_cls_}}">{{data}}</i></p>' +
				'</div>' +
				'</div>' +
				'</li>',
			NO_DATA: '<div class="no-data"><p>暂无数据</p></div>'
		},
		init: function() {
			var _ = this;
			_.showCurrentProduct();
			$(window).resize(function () {
				_.fitStyle();
			});
		},
		show: function(relationData) {
			var tmp, i, len, data,
				empty = {
					name: '您的关联商品设置不足，需要加强商品之间的流量互导',
					link: '',
					imgSrc: '../../skin/i/noPic.png',
					uv: '-',
					data: '-'
				};

			data = relationData.source;
			while (data.length < 5) {   //补全左侧
				data.push(empty);
			}

			data = relationData.trend;
			while (data.length < 5) {   //补全右侧
				data.push(empty);
			}
			
			this.render(relationData);
		},
		render: function(relationData) {
			var _ = this,
				sel = _.selector,
				itemTpl = _.template.PRODUCT_ITEM,
				$lList = $(sel.COMPASS_LEFT_LIST),
				$rList = $(sel.COMPASS_RIGHT_LIST),
				change = {
					up: {
						_img_: '../../skin/i/icon-up.png',
						_cls_: 'red'
					},
					down: {
						_img_: '../../skin/i/icon-down.png',
						_cls_: 'green'
					},
					noData: {
						_img_: '../../skin/i/no.png',
						_cls_: ''
					}
				},
				data, i, len, itemData, tmp, status;

			data = relationData.source;
			$lList.empty();
			for (i = 0, len = data.length; i < len; i++) {
				itemData = data[i];
				if (itemData.data == '-') {
					status = 'noData';
				} else {
					tmp = Number(itemData.data.substring(0, itemData.data.length - 1));
					status = tmp >= 0 ? 'up' : 'down';
				}
				$.extend(itemData, change[status]);
				$lList.append(util.formatTpl(itemTpl, itemData));
			}

			data = relationData.trend;
			$rList.empty();
			for (i = 0, len = data.length; i < len; i++) {
				itemData = data[i];
				if (itemData.data == '-') {
					status = 'noData';
				} else {
					tmp = Number(itemData.data.substring(0, itemData.data.length - 1));
					status = tmp >= 0 ? 'up' : 'down';
				}
				$.extend(itemData, change[status]);
				$rList.append(util.formatTpl(itemTpl, itemData));
			}

			//调整
			_.fitStyle();
		},
		fitStyle: function() {
			var _ = this,
				liList = $(_.selector.COMPASS_WRAPPER).find('ul li');
			liList.each(function() {
				var li = $(this),
					item = li.find('p.text'),
					text = item.attr('oldtext'),
					maxNum = Math.round((item.width() / 7) * 2);    //假设每个英文字符能占用 7px 宽度，可以显示两行

				maxNum = maxNum < 8 ? 8 : maxNum;
				if (util.getStrRealLen(text) > maxNum) {   //超出能够显示的文字
					item.find('a').text(util.getSubStr(text, maxNum - 8) + ' ...');
					item.addClass('bus-need-tips').attr('desc', text);  //增加提示
				} else {
					item.find('a').text(text);
					item.removeClass('bus-need-tips').attr('desc', '');   //清除提示
				}
			});
		},
		showCurrentProduct: function() {
			var $pic = $(this.selector.COMPASS_PIC);
			$pic.find('img').attr('src', window.imgSrc);
			$pic.find('h6').html(function() {
				var text = window.proName;
				$(this).addClass('bus-need-tips').attr('desc', text);
				return util.getStrRealLen(text) >= 68 ? util.getSubStr(text, 60) + ' ...' : text;
			});
		},
		showNoData: function() {
			var _ = this,
				sel = _.selector;
			$(sel.COMPASS_LEFT).hide();
			$(sel.COMPASS_RIGHT).hide();
			$(sel.COMPASS_PIC).hide();
			if ($(sel.NO_DATA).length) {
				$(sel.NO_DATA).show();
			} else {
				$(sel.COMPASS_WRAPPER).append(_.template.NO_DATA);
			}
		},
		hideNoData: function() {
			var _ = this,
				sel = _.selector;
			$(sel.NO_DATA).remove();
			$(sel.COMPASS_LEFT).show();
			$(sel.COMPASS_RIGHT).show();
			$(sel.COMPASS_PIC).show();
		}
	};

	//视图初始化
	sourceTrendView.init();
	conversionView.init();
	relationView.init();

	window.ViewManager = {
		sourceTrendView: sourceTrendView,
		conversionView: conversionView,
		relationView: relationView
	};
})();