/**
 *
 * Date picker
 * Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 * modified by daipeng
 */
/**
 * week starts from Monday
 */
Date.prototype.getWeekNumber = function () {
	 var checkDate = new Date(this.getTime());
	 checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));     //星期四为界定跨年第一周
     var time = checkDate.getTime();
     checkDate.setMonth(0);
     checkDate.setDate(1);
     return Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
//   var d = new Date(this.getTime());
//   return (d<splitDate?d.getWeek():d.getCurWeek()[1]) + 1;
};
/*Date.prototype.getWeek = function (e) {
    var t = new Date(this.getFullYear(), 0, 1),
        n = parseInt("1065432".charAt(t.getDay()));
    return n = this.getTime() - t.getTime() - n * 24 * 60 * 60 * 1e3, n = Math.ceil(n / 6048e5), e == 1 && t.getDay() != 1 ? n + 1 : n
};*/
/*Date.prototype.getCurWeek = function (e) {
    var n = parseInt("0654321".charAt(this.getDay()));
    n = ((n==0)?n=-1:n);
    return [t.getFullYear(),t.getWeek()];
};*/
var tmpStart,tmpEnd,splitDate = new Date(2012, 11, 31);
(function ($) {
	var DatePicker = function () {
		var	ids = {},today = new Date(),
			views = {
				year: 'datepickerViewYears',
				month: 'datepickerViewMonths',    //datepickerViewMonths
				day: 'datepickerViewDays',
				week: 'datepickerViewDays',
				"!week": 'datepickerViewDays',
				"!month": 'datepickerViewDays',
				"!month!week": 'datepickerViewDays'
			},
			tpl = {
				wrapper: '<div class="datepicker"><div class="datepickerBorderT" /><div class="datepickerBorderB" /><div class="datepickerBorderL" /><div class="datepickerBorderR" /><div class="datepickerBorderTL" /><div class="datepickerBorderTR" /><div class="datepickerBorderBL" /><div class="datepickerBorderBR" /><div class="datepickerContainer"><table cellspacing="0" cellpadding="0"><tbody><tr></tr></tbody></table></div></div>',
				head: [
					'<td>',
					'<table cellspacing="0" cellpadding="0">',
						'<thead>',
							'<tr>',
								'<th class="datepickerGoPrev"><a href="#"><span><%=prev%></span></a></th>',
								'<th colspan="6" class="datepickerMonth"><a href="#"><span></span></a></th>',
								'<th class="datepickerGoNext"><a href="#"><span><%=next%></span></a></th>',
							'</tr>',
							'<tr class="datepickerDoW">',
								'<th class="datepickerWeek"><span><%=week%></span></th>',
								'<th><span><%=day1%></span></th>',
								'<th><span><%=day2%></span></th>',
								'<th><span><%=day3%></span></th>',
								'<th><span><%=day4%></span></th>',
								'<th><span><%=day5%></span></th>',
								'<th><span><%=day6%></span></th>',
								'<th><span><%=day7%></span></th>',
							'</tr>',
						'</thead>',
					'</table></td>'
				],
				space : '<td class="datepickerSpace"><div></div></td>',
				days: [
					'<tbody class="datepickerDays">',
						'<tr>',
							'<th class="datepickerWeek <%=weeks[0].classname%>"><a href="#" class="week_range"><span><%=weeks[0].week%></span></a></th>',
							'<td class="<%=weeks[0].days[0].classname%>"><a class="hand"><span val=<%=weeks[0].week*7%>><%=weeks[0].days[0].text%></span></a></td>',
							'<td class="<%=weeks[0].days[1].classname%>"><a class="hand"><span val=<%=weeks[0].week*7+1%>><%=weeks[0].days[1].text%></span></a></td>',
							'<td class="<%=weeks[0].days[2].classname%>"><a class="hand"><span val=<%=weeks[0].week*7+2%>><%=weeks[0].days[2].text%></span></a></td>',
							'<td class="<%=weeks[0].days[3].classname%>"><a class="hand"><span val=<%=weeks[0].week*7+3%>><%=weeks[0].days[3].text%></span></a></td>',
							'<td class="<%=weeks[0].days[4].classname%>"><a class="hand"><span val=<%=weeks[0].week*7+4%>><%=weeks[0].days[4].text%></span></a></td>',
							'<td class="<%=weeks[0].days[5].classname%>"><a class="hand"><span val=<%=weeks[0].week*7+5%>><%=weeks[0].days[5].text%></span></a></td>',
							'<td class="<%=weeks[0].days[6].classname%>"><a class="hand"><span val=<%=weeks[0].week*7+6%>><%=weeks[0].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek <%=weeks[1].classname%>"><a href="#" class="week_range"><span><%=weeks[1].week%></span></a></th>',
							'<td class="<%=weeks[1].days[0].classname%>"><a class="hand"><span val=<%=weeks[1].week*7%>><%=weeks[1].days[0].text%></span></a></td>',
							'<td class="<%=weeks[1].days[1].classname%>"><a class="hand"><span val=<%=weeks[1].week*7+1%>><%=weeks[1].days[1].text%></span></a></td>',
							'<td class="<%=weeks[1].days[2].classname%>"><a class="hand"><span val=<%=weeks[1].week*7+2%>><%=weeks[1].days[2].text%></span></a></td>',
							'<td class="<%=weeks[1].days[3].classname%>"><a class="hand"><span val=<%=weeks[1].week*7+3%>><%=weeks[1].days[3].text%></span></a></td>',
							'<td class="<%=weeks[1].days[4].classname%>"><a class="hand"><span val=<%=weeks[1].week*7+4%>><%=weeks[1].days[4].text%></span></a></td>',
							'<td class="<%=weeks[1].days[5].classname%>"><a class="hand"><span val=<%=weeks[1].week*7+5%>><%=weeks[1].days[5].text%></span></a></td>',
							'<td class="<%=weeks[1].days[6].classname%>"><a class="hand"><span val=<%=weeks[1].week*7+6%>><%=weeks[1].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek <%=weeks[2].classname%>"><a href="#" class="week_range"><span><%=weeks[2].week%></span></a></th>',
							'<td class="<%=weeks[2].days[0].classname%>"><a class="hand"><span val=<%=weeks[2].week*7%>><%=weeks[2].days[0].text%></span></a></td>',
							'<td class="<%=weeks[2].days[1].classname%>"><a class="hand"><span val=<%=weeks[2].week*7+1%>><%=weeks[2].days[1].text%></span></a></td>',
							'<td class="<%=weeks[2].days[2].classname%>"><a class="hand"><span val=<%=weeks[2].week*7+2%>><%=weeks[2].days[2].text%></span></a></td>',
							'<td class="<%=weeks[2].days[3].classname%>"><a class="hand"><span val=<%=weeks[2].week*7+3%>><%=weeks[2].days[3].text%></span></a></td>',
							'<td class="<%=weeks[2].days[4].classname%>"><a class="hand"><span val=<%=weeks[2].week*7+4%>><%=weeks[2].days[4].text%></span></a></td>',
							'<td class="<%=weeks[2].days[5].classname%>"><a class="hand"><span val=<%=weeks[2].week*7+5%>><%=weeks[2].days[5].text%></span></a></td>',
							'<td class="<%=weeks[2].days[6].classname%>"><a class="hand"><span val=<%=weeks[2].week*7+6%>><%=weeks[2].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek <%=weeks[3].classname%>"><a href="#" class="week_range"><span><%=weeks[3].week%></span></a></th>',
							'<td class="<%=weeks[3].days[0].classname%>"><a class="hand"><span val=<%=weeks[3].week*7%>><%=weeks[3].days[0].text%></span></a></td>',
							'<td class="<%=weeks[3].days[1].classname%>"><a class="hand"><span val=<%=weeks[3].week*7+1%>><%=weeks[3].days[1].text%></span></a></td>',
							'<td class="<%=weeks[3].days[2].classname%>"><a class="hand"><span val=<%=weeks[3].week*7+2%>><%=weeks[3].days[2].text%></span></a></td>',
							'<td class="<%=weeks[3].days[3].classname%>"><a class="hand"><span val=<%=weeks[3].week*7+3%>><%=weeks[3].days[3].text%></span></a></td>',
							'<td class="<%=weeks[3].days[4].classname%>"><a class="hand"><span val=<%=weeks[3].week*7+4%>><%=weeks[3].days[4].text%></span></a></td>',
							'<td class="<%=weeks[3].days[5].classname%>"><a class="hand"><span val=<%=weeks[3].week*7+5%>><%=weeks[3].days[5].text%></span></a></td>',
							'<td class="<%=weeks[3].days[6].classname%>"><a class="hand"><span val=<%=weeks[3].week*7+6%>><%=weeks[3].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek <%=weeks[4].classname%>"><a href="#" class="week_range"><span><%=weeks[4].week%></span></a></th>',
							'<td class="<%=weeks[4].days[0].classname%>"><a class="hand"><span val=<%=weeks[4].week*7%>><%=weeks[4].days[0].text%></span></a></td>',
							'<td class="<%=weeks[4].days[1].classname%>"><a class="hand"><span val=<%=weeks[4].week*7+1%>><%=weeks[4].days[1].text%></span></a></td>',
							'<td class="<%=weeks[4].days[2].classname%>"><a class="hand"><span val=<%=weeks[4].week*7+2%>><%=weeks[4].days[2].text%></span></a></td>',
							'<td class="<%=weeks[4].days[3].classname%>"><a class="hand"><span val=<%=weeks[4].week*7+3%>><%=weeks[4].days[3].text%></span></a></td>',
							'<td class="<%=weeks[4].days[4].classname%>"><a class="hand"><span val=<%=weeks[4].week*7+4%>><%=weeks[4].days[4].text%></span></a></td>',
							'<td class="<%=weeks[4].days[5].classname%>"><a class="hand"><span val=<%=weeks[4].week*7+5%>><%=weeks[4].days[5].text%></span></a></td>',
							'<td class="<%=weeks[4].days[6].classname%>"><a class="hand"><span val=<%=weeks[4].week*7+6%>><%=weeks[4].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek <%=weeks[5].classname%>"><a href="#" class="week_range"><span><%=weeks[5].week%></span></a></th>',
							'<td class="<%=weeks[5].days[0].classname%>"><a class="hand"><span val=<%=weeks[5].week*7%>><%=weeks[5].days[0].text%></span></a></td>',
							'<td class="<%=weeks[5].days[1].classname%>"><a class="hand"><span val=<%=weeks[5].week*7+1%>><%=weeks[5].days[1].text%></span></a></td>',
							'<td class="<%=weeks[5].days[2].classname%>"><a class="hand"><span val=<%=weeks[5].week*7+2%>><%=weeks[5].days[2].text%></span></a></td>',
							'<td class="<%=weeks[5].days[3].classname%>"><a class="hand"><span val=<%=weeks[5].week*7+3%>><%=weeks[5].days[3].text%></span></a></td>',
							'<td class="<%=weeks[5].days[4].classname%>"><a class="hand"><span val=<%=weeks[5].week*7+4%>><%=weeks[5].days[4].text%></span></a></td>',
							'<td class="<%=weeks[5].days[5].classname%>"><a class="hand"><span val=<%=weeks[5].week*7+5%>><%=weeks[5].days[5].text%></span></a></td>',
							'<td class="<%=weeks[5].days[6].classname%>"><a class="hand"><span val=<%=weeks[5].week*7+6%>><%=weeks[5].days[6].text%></span></a></td>',
						'</tr>',
					'</tbody>'
				],
				months: [
					'<tbody class="<%=className%>">',
						'<tr>',
							'<td colspan="2" class="<%=months[0].classname%>"><a href="#"><span><%=data[0]%></span></a></td>',
							'<td colspan="2" class="<%=months[1].classname%>"><a href="#"><span><%=data[1]%></span></a></td>',
							'<td colspan="2" class="<%=months[2].classname%>"><a href="#"><span><%=data[2]%></span></a></td>',
							'<td colspan="2" class="<%=months[3].classname%>"><a href="#"><span><%=data[3]%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td colspan="2" class="<%=months[4].classname%>"><a href="#"><span><%=data[4]%></span></a></td>',
							'<td colspan="2" class="<%=months[5].classname%>"><a href="#"><span><%=data[5]%></span></a></td>',
							'<td colspan="2" class="<%=months[6].classname%>"><a href="#"><span><%=data[6]%></span></a></td>',
							'<td colspan="2" class="<%=months[7].classname%>"><a href="#"><span><%=data[7]%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td colspan="2" class="<%=months[8].classname%>"><a href="#"><span><%=data[8]%></span></a></td>',
							'<td colspan="2" class="<%=months[9].classname%>"><a href="#"><span><%=data[9]%></span></a></td>',
							'<td colspan="2" class="<%=months[10].classname%>"><a href="#"><span><%=data[10]%></span></a></td>',
							'<td colspan="2" class="<%=months[11].classname%>"><a href="#"><span><%=data[11]%></span></a></td>',
						'</tr>',
					'</tbody>'
				]
			},
			defaults = {
				flat: false,
				starts: 1,
				prev: '&#9664;',
				next: '&#9654;',
				lastSel: false,
				down: false,
				mode: 'single',
				view: 'days',
				calendars: 1,
				format: 'Y-m-d',
				position: 'bottom',
				eventName: 'click',
				onRender: function(){return {};},
				onChange: function(){return true;},
				onShow: function(){return true;},
				onBeforeShow: function(){return true;},
				onHide: function(){return true;},
				locale: {
					days: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D", "\u661F\u671F\u65E5"],
					daysShort: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D", "\u5468\u65E5"],
					//week starts from Monday
//					daysMin: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"],
					daysMin: ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5", "\u4E00"],
					months: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
					monthsShort: ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u5341\u4E00", "\u5341\u4E8C"],
					weekMin: "\u5468"
				},
				maxDate:null,
				minDate:null
			},
			fill = function(el) {
				var options = $(el).data('datepicker');
				var cal = $(el);
				var currentCal = Math.floor(options.calendars/2), date, data, dow, month, cnt = 0, week, days, indic, indic2, html, tblCal, calYear;
				var _min,_max;
                if(!!options.minDate){
                    _min = new Date(options.minDate.replace(/[^0-9]/g, "/"));
                    _min.setHours(0,0,0,0);
                }
                if(!!options.maxDate){
                    _max = new Date(options.maxDate.replace(/[^0-9]/g, "/"));
                    _max.setHours(0,0,0,0);
                }
				cal.find('td>table tbody').remove();
				tmpStart = options.date[0];
				tmpEnd = options.date[1];
                for (var i = 0; i < options.calendars; i++) {
					date = new Date(options.current);
                    //if months differ, the first cal show the first month,else the first cal show the previous month
//                  date.addMonths(-currentCal + i);
                    if(options.view!="month"){
                        date.addMonths(i);
                    }
					tblCal = cal.find('table').eq(i+1);
					switch (tblCal[0].className) {
						case 'datepickerViewDays':
							dow = formatDate(date, 'B, Y');
							break;
						case 'datepickerViewMonths':
                            dow = date.getFullYear()+i;
                            /*if(options.change||options.view!="month"){
							    dow = date.getFullYear()+i;
                            }else{
                                var calYear = tblCal.find('thead tr:first th:eq(1) span').text();
                                if(calYear==""){
                                    dow = date.getFullYear()+i;
                                }else{
                                    if(calYear==date.getFullYear()){
                                        dow = date.getFullYear();
                                    }else{
                                        if(!i){
                                            dow = date.getFullYear()-(i+1);
                                        }else{
                                            dow = date.getFullYear()+i;
                                        }
                                    }
                                }
                            }*/
							break;
						case 'datepickerViewYears':
							dow = (date.getFullYear()-6) + ' - ' + (date.getFullYear()+5);
							break;
					}
                    calYear = dow;
					tblCal.find('thead tr:first th:eq(1) span').text(dow);
					dow = date.getFullYear()-6;
					data = {
						data: [],
						className: 'datepickerYears',
                        months: []
					};
					for ( var j = 0; j < 12; j++) {
						data.data.push(dow + j);
                        data.months.push({year: dow+j,classname: []});
					}
                    for(var y in data.months){
                        if(data.months[y].year==options.curDate.getFullYear()){
                            data.months[y].classname.push("datepickerSelected");
                        }
                    }
					html = tmpl(tpl.months.join(''), data);
                    date.setDate(1);
					data = {weeks:[]};
					month = date.getMonth();

					//week starts from Monday
//					var dow = (date.getDay() - options.starts) % 7;
					var dow = (date.getDay() - options.starts) % 7 - 1 ;
					date.addDays(-(dow + (dow < 0 ? 7 : 0)));
					week = -1;
					cnt = 0;
					while (cnt < 42) {
						indic = parseInt(cnt/7,10);
						indic2 = cnt%7;
						if (!data.weeks[indic]) {
							week = date.getWeekNumber();
							data.weeks[indic] = {
								week: week,
								days: [],
                                classname: []
							};
						}
						data.weeks[indic].days[indic2] = {
							text: date.getDate(),
							classname: []
						};
						if (month != date.getMonth()) {
							data.weeks[indic].days[indic2].classname.push('datepickerNotInMonth');
						}
						if (date.getDay() == 0) {
							data.weeks[indic].days[indic2].classname.push('datepickerSunday');
						}
						if (date.getDay() == 6) {
							data.weeks[indic].days[indic2].classname.push('datepickerSaturday');
						}

						var fromUser = options.onRender(date);
						var val = date.valueOf();
						if (fromUser.selected || options.date == val || $.inArray(val, options.date) > -1 || (options.mode == 'range' && val >= options.date[0] && val <= options.date[1])) {
                            data.weeks[indic].days[indic2].classname.push('datepickerSelected');
						}
						if (fromUser.disabled) {
							data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
						}
                        if(!!_min){
                            if(date<=_min){
                                data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
                            }
                        }
                        if(!!_max){
                            if(date>=_max){
                                data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
                            }
                        }
						if (fromUser.className) {
							data.weeks[indic].days[indic2].classname.push(fromUser.className);
						}
						data.weeks[indic].days[indic2].classname = data.weeks[indic].days[indic2].classname.join(' ');
						cnt++;

						date.addDays(1);

                        //着色被选中周
                        if(options.view=="week"&&calYear.indexOf(options.curDate.getFullYear())>=0){
                            if(options.curDate.getWeekNumber()==data.weeks[indic].week){
                                data.weeks[indic].classname[0] = "datepickerSelected";
                            }
                        }
					}
					html = tmpl(tpl.days.join(''), data) + html;
					data = {
						data: options.locale.monthsShort,
						className: 'datepickerMonths',
                        months: []
					};
                    for(var m in data.data){
                        data.months.push({month: m,classname: []});
                    }
                    if(options.view=="month"){
                        if(calYear>today.getFullYear()){
                            for(var m in data.months){
                                //置灰未来月
                                data.months[m].classname.push("datepickerDisabled");
                            }
                        }else if(calYear==today.getFullYear()){
                            for(var m in data.months){
                                //着色被选中月
                                if(data.months[m].month>today.getMonth()){
                                    //置灰未来月
                                    data.months[m].classname.push("datepickerDisabled");
                                }
                            }
                        }
                        if(calYear==options.curDate.getFullYear()){
                            for(var m in data.months){
                                if(data.months[m].month==options.curDate.getMonth()){
                                    data.months[m].classname.push("datepickerSelected");
                                }
                            }
                        }
                    }
					html = tmpl(tpl.months.join(''), data) + html;
					tblCal.append(html);
				}
			},
			parseDate = function (date, format) {
				if (date.constructor == Date) {
					return new Date(date);
				}
				var parts = date.split(/\W+/);
				var against = format.split(/\W+/), d, m, y, h, min, now = new Date();
				for (var i = 0; i < parts.length; i++) {
					switch (against[i]) {
						case 'd':
						case 'e':
							d = parseInt(parts[i],10);
							break;
						case 'm':
							m = parseInt(parts[i], 10)-1;
							break;
						case 'Y':
						case 'y':
							y = parseInt(parts[i], 10);
							y += y > 100 ? 0 : (y < 29 ? 2000 : 1900);
							break;
						case 'H':
						case 'I':
						case 'k':
						case 'l':
							h = parseInt(parts[i], 10);
							break;
						case 'P':
						case 'p':
							if (/pm/i.test(parts[i]) && h < 12) {
								h += 12;
							} else if (/am/i.test(parts[i]) && h >= 12) {
								h -= 12;
							}
							break;
						case 'M':
							min = parseInt(parts[i], 10);
							break;
					}
				}
				return new Date(
					y === undefined ? now.getFullYear() : y,
					m === undefined ? now.getMonth() : m,
					d === undefined ? now.getDate() : d,
					h === undefined ? now.getHours() : h,
					min === undefined ? now.getMinutes() : min,
					0
				);
			},
			formatDate = function(date, format) {
				var m = date.getMonth();
				var d = date.getDate();
				var y = date.getFullYear();
				var wn = date.getWeekNumber();
				var w = date.getDay();
				var s = {};
				var hr = date.getHours();
				var pm = (hr >= 12);
				var ir = (pm) ? (hr - 12) : hr;
				var dy = date.getDayOfYear();
				if (ir == 0) {
					ir = 12;
				}
				var min = date.getMinutes();
				var sec = date.getSeconds();
				var parts = format.split(''), part;
				for ( var i = 0; i < parts.length; i++ ) {
					part = parts[i];
					switch (parts[i]) {
						case 'a':
							part = date.getDayName();
							break;
						case 'A':
							part = date.getDayName(true);
							break;
						case 'b':
							part = date.getMonthName();
							break;
						case 'B':
							part = date.getMonthName(true);
							break;
						case 'C':
							part = 1 + Math.floor(y / 100);
							break;
						case 'd':
							part = (d < 10) ? ("0" + d) : d;
							break;
						case 'e':
							part = d;
							break;
						case 'H':
							part = (hr < 10) ? ("0" + hr) : hr;
							break;
						case 'I':
							part = (ir < 10) ? ("0" + ir) : ir;
							break;
						case 'j':
							part = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy;
							break;
						case 'k':
							part = hr;
							break;
						case 'l':
							part = ir;
							break;
						case 'm':
							part = (m < 9) ? ("0" + (1+m)) : (1+m);
							break;
						case 'M':
							part = (min < 10) ? ("0" + min) : min;
							break;
						case 'p':
						case 'P':
							part = pm ? "PM" : "AM";
							break;
						case 's':
							part = Math.floor(date.getTime() / 1000);
							break;
						case 'S':
							part = (sec < 10) ? ("0" + sec) : sec;
							break;
						case 'u':
							part = w + 1;
							break;
						case 'w':
							part = w;
							break;
						case 'y':
							part = ('' + y).substr(2, 2);
							break;
						case 'Y':
							part = y;
							break;
					}
					parts[i] = part;
				}
				return parts.join('');
			},
			extendDate = function(options) {
				if (Date.prototype.tempDate) {
					return;
				}
				Date.prototype.tempDate = null;
				Date.prototype.months = options.months;
				Date.prototype.monthsShort = options.monthsShort;
				Date.prototype.days = options.days;
				Date.prototype.daysShort = options.daysShort;
				Date.prototype.getMonthName = function(fullName) {
					return this[fullName ? 'months' : 'monthsShort'][this.getMonth()];
				};
				Date.prototype.getDayName = function(fullName) {
					return this[fullName ? 'days' : 'daysShort'][this.getDay()];
				};
				Date.prototype.addDays = function (n) {
					this.setDate(this.getDate() + n);
					this.tempDate = this.getDate();
				};
				Date.prototype.addMonths = function (n) {
					if (this.tempDate == null) {
						this.tempDate = this.getDate();
					}
					this.setDate(1);
					this.setMonth(this.getMonth() + n);
					this.setDate(Math.min(this.tempDate, this.getMaxDays()));
				};
				Date.prototype.addYears = function (n) {
					if (this.tempDate == null) {
						this.tempDate = this.getDate();
					}
					this.setDate(1);
					this.setFullYear(this.getFullYear() + n);
					this.setDate(Math.min(this.tempDate, this.getMaxDays()));
				};
				Date.prototype.getMaxDays = function() {
					var tmpDate = new Date(Date.parse(this)),
						d = 28, m;
					m = tmpDate.getMonth();
					d = 28;
					while (tmpDate.getMonth() == m) {
						d ++;
						tmpDate.setDate(d);
					}
					return d - 1;
				};
				Date.prototype.getFirstDay = function() {
					var tmpDate = new Date(Date.parse(this));
					tmpDate.setDate(1);
					return tmpDate.getDay();
				};
//				Date.prototype.getWeekNumber = function() {
//					var tempDate = new Date(this);
//					tempDate.setDate(tempDate.getDate() - (tempDate.getDay() + 6) % 7 + 3);					
//					var dms = tempDate.valueOf();
//					tempDate.setMonth(0);
//					tempDate.setDate(4);
//					console.log(tempDate);
//					return Math.round((dms - tempDate.valueOf()) / (604800000)) + 1;
//				};
				Date.prototype.getDayOfYear = function() {
					var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
					var then = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
					var time = now - then;
					return Math.floor(time / 24*60*60*1000);
				};				
			},
			layout = function (el) {
				var options = $(el).data('datepicker');
				var cal = $('#' + options.id);
				if (!options.extraHeight) {
					var divs = $(el).find('div');
					options.extraHeight = divs.get(0).offsetHeight + divs.get(1).offsetHeight;
					options.extraWidth = divs.get(2).offsetWidth + divs.get(3).offsetWidth;
				}
				var tbl = cal.find('table:first').get(0);
				var width = tbl.offsetWidth;
				var height = tbl.offsetHeight;
				cal.css({
					width: width + options.extraWidth + 'px',
					height: height + options.extraHeight + 'px'
				}).find('div.datepickerContainer').css({
					width: width + 'px',
					height: height + 'px'
				});
			},
			click = function(ev) {
				$("#widgetCalendar .quick-chose").find("a.chosen").removeClass("chosen");
				if ($(ev.target).is('span')) {
					ev.target = ev.target.parentNode;					
				}
				var el = $(ev.target);
				if (el.is('a')) {
					var options = $(this).data('datepicker');
                    options.change = false;
					options.selVal = $('span', el).attr('val');
					ev.target.blur();
					if (el.hasClass('datepickerDisabled')) {
						return false;
					}
									
					options.curWeek = "";
					options.curYear = "";
					options.curMonth = "";
					var parentEl = el.parent();
					var tblEl = parentEl.parent().parent().parent();
					var tblIndex = $('table', this).index(tblEl.get(0)) - 1;
					var tmp = new Date(options.current);
					var changed = false;
					var fillIt = false;
					if (parentEl.is('th')) {
						if (parentEl.hasClass('datepickerWeek') && options.mode == 'range' && !parentEl.next().hasClass('datepickerDisabled')) {
							//if in the mode of !week
							if(options.view!="!week"&&options.view!="!month!week"&&options.view!="month"){
								var val = parseInt(parentEl.next().text(), 10);
//								tmp.addMonths(tblIndex - Math.floor(options.calendars/2));
								tmp.addMonths(tblIndex);
								if (parentEl.next().hasClass('datepickerNotInMonth')) {
									tmp.addMonths(val > 15 ? -1 : 1);
								}
								tmp.setDate(val);
								options.date[0] = (tmp.setHours(0,0,0,0)).valueOf();
								tmp.setHours(23,59,59,0);
								tmp.addDays(6);
								options.date[1] = tmp.valueOf();	
								options.curMonth = "";
								options.curYear = tmp.getFullYear();
								options.curWeek = parentEl.text();
                                options.curDate = tmp;
								fillIt = true;
								changed = true;
								options.lastSel = false;
							}
						} else if (parentEl.hasClass('datepickerMonth')) {
							if(options.view!="!month"&&options.view!="!month!week"&&options.view!="week"){
//								tmp.addMonths(tblIndex - Math.floor(options.calendars/2));
                                tmp.addMonths(tblIndex);
								switch (tblEl.get(0).className) {
									//天视图进入月视图
									case 'datepickerViewDays':
										tblEl.get(0).className = 'datepickerViewMonths';
										el.find('span').text(tmp.getFullYear());									
										break;
									//月视图进入年视图									
	//								case 'datepickerViewMonths':
	//									tblEl.get(0).className = 'datepickerViewYears';
	//									el.find('span').text((tmp.getFullYear()-6) + ' - ' + (tmp.getFullYear()+5));									
	//									break;
									//年视图进入天视图
	//								case 'datepickerViewYears':
	//									tblEl.get(0).className = 'datepickerViewDays';
	//									el.find('span').text(formatDate(tmp, 'B, Y'));
	//									break;
								}
							}
						} else if (parentEl.parent().parent().is('thead')) {
							switch (tblEl.get(0).className) {
								case 'datepickerViewDays':
									options.current.addMonths(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
								case 'datepickerViewMonths':
                                    options.change = true;
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
								case 'datepickerViewYears':
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -12 : 12);
									break;
							}
							fillIt = true;
						}
					} else if (parentEl.is('td') && !parentEl.hasClass('datepickerDisabled')) {						
						switch (tblEl.get(0).className) {
							//月视图中点击月份
							case 'datepickerViewMonths':
                                options.current.setDate(1);
								options.current.setMonth(tblEl.find('tbody.datepickerMonths td').index(parentEl));
								options.current.setFullYear(parseInt(tblEl.find('thead th.datepickerMonth span').text(), 10));
                                tmp = new Date(options.current);

								//第二个日期控件显示月份
//								options.current.addMonths(Math.floor(options.calendars/2) - tblIndex);
//								options.current.addMonths(-tblIndex);
								options.curMonth = tmp.getMonth()+1;

								options.date[0] = tmp.firstDayOfMonth();
								options.date[1] = tmp.lastDayOfMonth();
								
								
								options.curYear = tmp.getFullYear();
								options.curWeek = "";
                                options.curDate = tmp;

//										if(el.is("a")){										
//	//										$("td",el.closest(".datepickerContainer")).filter(".datepickerSelected").removeClass("datepickerSelected");
//											el.closest("td").addClass("datepickerSelected");										
//										}

                                if(options.view!="week"&&options.view!="month"&&options.view!="!month!week"){
								    tblEl.get(0).className = 'datepickerViewDays';
                                }
										
								options.lastSel = false;
								break;
							//年视图中点击年份
//							case 'datepickerViewYears':
//								options.current.setFullYear(parseInt(el.text(), 10));
//								tblEl.get(0).className = 'datepickerViewMonths';
//								break;
							default:
                                if(options.view!="month"){
									var val = parseInt(el.text(), 10);
//									tmp.addMonths(tblIndex - Math.floor(options.calendars/2));
									tmp.addMonths(tblIndex);
									if (parentEl.hasClass('datepickerNotInMonth')) {
										tmp.addMonths(val > 15 ? -1 : 1);
									}
									tmp.setDate(val);
                                    options.curDate = tmp;
                                    if(options.view=="week"){
                                        if(el.is("td")){
                                            $("a",el.prevAll("th").eq(0)).click();
                                        }else{
                                            $("a",el.closest("td").prevAll("th").eq(0)).click();
                                        }
                                        return;
                                    }
                                    switch (options.mode) {
										case 'multiple':
											val = (tmp.setHours(0,0,0,0)).valueOf();
											if ($.inArray(val, options.date) > -1) {
												$.each(options.date, function(nr, dat){
													if (dat == val) {
														options.date.splice(nr,1);
														return false;
													}
												});
											} else {
												options.date.push(val);
											}
											break;
										case 'range':										
											if (!options.lastSel) {
												options.date[0] = (tmp.setHours(0,0,0,0)).valueOf();
											}
											val = (tmp.setHours(23,59,59,0)).valueOf();										
											if (val < options.date[0]) {											
												options.date[1] = options.date[0] + 86399000;
												options.date[0] = val - 86399000;												
											} else {		
												options.date[1] = val;											
											}
											options.curSel = (tmp.setHours(0,0,0,0)).valueOf();
											options.lastSel = !options.lastSel;	
																	
											break;
										default:
											options.date = tmp.valueOf();
											break;
									}
								}else{
									return false;
								}							
								break;
						}
						fillIt = true;
						changed = true;
					}						

					if (changed) {						
						options.onChange.apply(this, prepareDate(options));						
					}
					
					if (fillIt) {						
						fill(this);
					}
				}
				return false;
			},
			mousedrag = function(ev){	
				var options = $(this).data('datepicker');
				if(!options.down){		
					var el = $(ev.target);	
					if(el.is("a")){						
						el = el.parent();
					}
					
					options.down = true;
					if (el.hasClass('datepickerDisabled')) {
						return false;
					}	
					var tblEl = el.parent().parent();
					var tblIndex = $('table', this).index(tblEl.get(0)) - 1;
					var tmp = new Date(options.current);		
					
					if (el.is('td') && !el.hasClass('datepickerDisabled')) {						
						var val = parseInt(el.text(), 10);
						
						options.firstSel = parseInt(el.find("a:eq(0)").find("span:eq(0)").attr("val"),10);options.selDay = options.firstSel;  						
						tmp.addMonths(tblIndex - Math.floor(options.calendars/2));
						if (el.hasClass('datepickerNotInMonth')) {
							tmp.addMonths(val > 15 ? -1 : 1);
						}
						tmp.setDate(val);					
						
						options.date[0] = (tmp.setHours(0,0,0,0)).valueOf();	
						$('td.datepickerSelected').removeClass('datepickerSelected');
						$(ev.target).closest('td').addClass('datepickerSelected');
						
						var tmpSel,$target;
						$(this).mousemove(function(e){									
							if(options.down){		
								$target = $(e.target);
								if($target.is("td")){
									tmpSel = parseInt($("a > span", $target).attr('val'),10);								
								}else if($target.is("a")){										
									tmpSel = parseInt($("span", $target).attr('val'),10);								
								}else if($target.is("span")){										
									tmpSel = parseInt($target.attr('val'),10);								
								}
								if(tmpSel!=options.selDay){											
									options.selDay = tmpSel;		
									$('td.datepickerSelected').removeClass('datepickerSelected');
									if(tmpSel<=options.firstSel){
										for(var i=tmpSel;i<=options.firstSel;i++){
											$('td > a > span[val="'+i+'"]').closest('td').addClass('datepickerSelected');
										}
									}else{
										for(var i=options.firstSel;i<=tmpSel;i++){	
											$('td > a > span[val="'+i+'"]').closest('td').addClass('datepickerSelected');
										}
									}										
								}
							}else{
								return false;
							}
						});
						
						
						$(this).mouseup(function(ev){								
							options.down = false,tmp = new Date(options.current);					
							var val = (tmp.setHours(23,59,59,0)).valueOf();
							if (val < options.date[0]) {											
								options.date[1] = options.date[0] + 86399000;
								options.date[0] = val - 86399000;												
							} else {											
								options.date[1] = val;											
							}
							options.curSel = (tmp.setHours(0,0,0,0)).valueOf();									
							fillIt = true;
							changed = true;																

							if (changed) {						
								options.onChange.apply(this, prepareDate(options));						
							}
							
							if (fillIt) {						
								fill(this);
							}
						});
					}								
				}			
			},
			drag = function(e){
				var options = $(this).data('datepicker');					
				var tmpSel,$target;
				e.stopPropagation();						
				if(options.lastSel){		
					$target = $(e.target);					
					if($target.is("a")){										
						tmpSel = parseInt($("span", $target).attr('val'));								
					}else if($target.is("span")){										
						tmpSel = parseInt($target.attr('val'));								
					}else if($target.is("td")){
						tmpSel = parseInt($("a > span", $target).attr('val'));								
					}
					
					if(tmpSel!=options.selVal){						
						if(tmpSel>options.firstSel){
							if((tmpSel-options.selVal)==1){
								options.selVal = tmpSel;
								$('span[val="'+tmpSel+'"]').closest('td').addClass('datepickerSelected');
							}else{
								options.selVal = tmpSel;
								$('td.datepickerSelected').removeClass('datepickerSelected');
								for(var i=options.firstSel;i<=tmpSel;i++){		
									$('span[val="'+i+'"]').closest('td').addClass('datepickerSelected');
								}
							}						
						}else{
							if((options.selVal-tmpSel)==1){
								options.selVal = tmpSel;
								$('span[val="'+tmpSel+'"]').closest('td').addClass('datepickerSelected');
							}else{
								options.selVal = tmpSel;
								$('td.datepickerSelected').removeClass('datepickerSelected');
								for(var i=tmpSel;i<=options.firstSel;i++){
									$('span[val="'+i+'"]').closest('td').addClass('datepickerSelected');
								}
							}
						}
					}
				}else{
					return false;
				}									
			},
			prepareDate = function (options) {				
				var tmp;
				if (options.mode == 'single') {
					tmp = new Date(options.date);					
					return [formatDate(tmp, options.format), tmp, options.el];
				} else {
					tmp = [[],[], options.el];
					$.each(options.date, function(nr, val){
						var date = new Date(val);
						tmp[0].push(formatDate(date, options.format));
						tmp[1].push(date);
					});	
					
					tmp[0].push(options.curMonth);					
					tmp[0].push(options.curYear);										
					tmp[0].push(options.curWeek);
					
					return tmp;
				}				
			},
			getViewport = function () {
				var m = document.compatMode == 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl == el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl != container) {
					if (prEl == parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			show = function (ev) {
				var cal = $('#' + $(this).data('datepickerId'));
				if (!cal.is(':visible')) {
					var calEl = cal.get(0);
					fill(calEl);
					var options = cal.data('datepicker');
					options.onBeforeShow.apply(this, [cal.get(0)]);
					var pos = $(this).offset();
					var viewPort = getViewport();
					var top = pos.top;
					var left = pos.left;
					var oldDisplay = $.curCSS(calEl, 'display');
					cal.css({
						visibility: 'hidden',
						display: 'block'
					});
					layout(calEl);
					switch (options.position){
						case 'top':
							top -= calEl.offsetHeight;
							break;
						case 'left':
							left -= calEl.offsetWidth;
							break;
						case 'right':
							left += this.offsetWidth;
							break;
						case 'bottom':
							top += this.offsetHeight;
							break;
					}
					if (top + calEl.offsetHeight > viewPort.t + viewPort.h) {
						top = pos.top  - calEl.offsetHeight;
					}
					if (top < viewPort.t) {
						top = pos.top + this.offsetHeight + calEl.offsetHeight;
					}
					if (left + calEl.offsetWidth > viewPort.l + viewPort.w) {
						left = pos.left - calEl.offsetWidth;
					}
					if (left < viewPort.l) {
						left = pos.left + this.offsetWidth
					}
					cal.css({
						visibility: 'visible',
						display: 'block',
						top: top + 'px',
						left: left + 'px'
					});
					if (options.onShow.apply(this, [cal.get(0)]) != false) {
						cal.show();
					}
					
					//console.info(cal);
					
					$(document).bind('mousedown', {cal: cal, trigger: this}, hide);
				}
				return false;
			},
			hide = function (ev) {
				if (ev.target != ev.data.trigger && !isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					if (ev.data.cal.data('datepicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
						ev.data.cal.hide();
					}
					$(document).unbind('mousedown', hide);
				}
			};
		return {
			init: function(options){
				options = $.extend({}, defaults, options||{});
				extendDate(options.locale);
				options.calendars = Math.max(1, parseInt(options.calendars,10)||1);
				options.mode = /single|multiple|range/.test(options.mode) ? options.mode : 'single';
				//console.info(options.date);
				return this.each(function(){
					if (!$(this).data('datepicker')) {
						options.el = this;						
						if (options.date.constructor == String) {
							options.date = parseDate(options.date, options.format);
							options.date.setHours(0,0,0,0);
						}
						if (options.mode != 'single') {
							if (options.date.constructor != Array) {
								options.date = [options.date.valueOf()];
								if (options.mode == 'range') {
									options.date.push(((new Date(options.date[0])).setHours(23,59,59,0)).valueOf());
								}
							} else {
								for (var i = 0; i < options.date.length; i++) {
									options.date[i] = (parseDate(options.date[i], options.format).setHours(0,0,0,0)).valueOf();
								}
								if (options.mode == 'range') {
									options.date[1] = ((new Date(options.date[1])).setHours(23,59,59,0)).valueOf();
								}
							}
						} else {
							options.date = options.date.valueOf();
						}
						if (!options.current) {
							options.current = new Date();
						} else {
							options.current = parseDate(options.current, options.format);
						}

                        options.curDate = new Date(options.date[0]);
						options.current.setMonth(options.curDate.getMonth());
						options.current.setFullYear(options.curDate.getFullYear());
						options.current.setHours(0,0,0,0);
						var id = 'datepicker_' + parseInt(Math.random() * 1000), cnt;
						options.id = id;
						$(this).data('datepickerId', options.id);
						var cal;
                        cal = $(tpl.wrapper).attr('id', id).bind('click', click).data('datepicker', options);
						/*if('range'==options.type){
							cal = $(tpl.wrapper).attr('id', id).bind('click', click).bind('mousemove', drag).data('datepicker', options);
						}else{
							cal = $(tpl.wrapper).attr('id', id).bind('click', click).data('datepicker', options);
						}*/
						if (options.className) {
							cal.addClass(options.className);
						}
						var html = '';
						for (var i = 0; i < options.calendars; i++) {
							cnt = options.starts;
							if (i > 0) {
								html += tpl.space;
							}
							html += tmpl(tpl.head.join(''), {
									week: options.locale.weekMin,
									prev: options.prev,
									next: options.next,
									day1: options.locale.daysMin[(cnt++)%7],
									day2: options.locale.daysMin[(cnt++)%7],
									day3: options.locale.daysMin[(cnt++)%7],
									day4: options.locale.daysMin[(cnt++)%7],
									day5: options.locale.daysMin[(cnt++)%7],
									day6: options.locale.daysMin[(cnt++)%7],
									day7: options.locale.daysMin[(cnt++)%7]
								});
						}
						cal
							.find('tr:first').append(html)
								.find('table').addClass(views[options.view]);
						fill(cal.get(0));
						if (options.flat) {
							cal.appendTo(this).show().css('position', 'relative');
							layout(cal.get(0));
						} else {
							cal.appendTo(document.body);
							$(this).bind(options.eventName, show);
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('datepickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
					if ($(this).data('datepickerId')) {
						$('#' + $(this).data('datepickerId')).hide();
					}
				});
			},
			setDate: function(date, shiftTo){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						options.date = $.jClone(date);
						if (options.date.constructor == String) {
							options.date = parseDate(options.date, options.format);
							options.date.setHours(0,0,0,0);
						}
						if (options.mode != 'single') {
							if (options.date.constructor != Array) {
								options.date = [options.date.valueOf()];
								if (options.mode == 'range') {
									options.date.push(((new Date(options.date[0])).setHours(23,59,59,0)).valueOf());
								}
							} else {
								for (var i = 0; i < options.date.length; i++) {
									options.date[i] = (parseDate(options.date[i], options.format).setHours(0,0,0,0)).valueOf();
								}
								if (options.mode == 'range') {
									options.date[1] = ((new Date(options.date[1])).setHours(23,59,59,0)).valueOf();
								}
							}
						} else {
							options.date = options.date.valueOf();
						}
						if (shiftTo) {
							options.current = new Date (options.mode != 'single' ? options.date[0] : options.date);
						}
						
						options.curDate = new Date(options.date[0]);
						options.current.setMonth(options.curDate.getMonth());
						options.current.setYear(options.curDate.getFullYear());
						fill(cal.get(0));
					}
				});
			},
			getDate: function(formated) {
				if (this.size() > 0) {
					return prepareDate($('#' + $(this).data('datepickerId')).data('datepicker'))[formated ? 0 : 1];
				}
			},
			clear: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						if (options.mode != 'single') {
							options.date = [];
							fill(cal.get(0));
						}
					}
				});
			},
			fixLayout: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						if (options.flat) {
							layout(cal.get(0));
						}
					}
				});
			}
		};
	}();
	$.fn.extend({
		DatePicker: DatePicker.init,
		DatePickerHide: DatePicker.hidePicker,
		DatePickerShow: DatePicker.showPicker,
		DatePickerSetDate: DatePicker.setDate,
		DatePickerGetDate: DatePicker.getDate,
		DatePickerClear: DatePicker.clear,
		DatePickerLayout: DatePicker.fixLayout
	});
})(jQuery);

(function(){
	this.tmpl = tmpl = (function (cache, $) {
		return function (str, data) {
			var fn = !/\s/.test(str)
			? cache[str] = cache[str]
				|| tmpl(document.getElementById(str).innerHTML)
				
			: function (data) {
				var i, variable = [$], value = [[]];
				for (i in data) {
					variable.push(i);
					value.push(data[i]);
				};
				return (new Function(variable, fn.$))
				.apply(data, value).join("");
			};
			
			fn.$ = fn.$ || $ + ".push('" 
			+ str.replace(/\\/g, "\\\\")
				 .replace(/[\r\t\n]/g, " ")
				 .split("<%").join("\t")
				 .replace(/((^|%>)[^\t]*)'/g, "$1\r")
				 .replace(/\t=(.*?)%>/g, "',$1,'")
				 .split("\t").join("');")
				 .split("%>").join($ + ".push('")
				 .split("\r").join("\\'")
			+ "');return " + $;

			return data ? fn(data) : fn;
		}
	})({}, '$' + (+ new Date));
})();