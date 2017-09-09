/**
 * 折行列表渲染器。无插件
 */
var listRender = (function(_$, _render){
    _render.exec = function(_id, _name, _dataset, _mode, _plugin, _layout){
        var buf = [],ln = _dataset.getData(C$.DATASET_LN),li = _dataset.getData(C$.DATASET_LI),size = _dataset.getSize();
        //判断渲染模式是否标准模式
        if(_mode!=C$.MODE_STANDARD){
            var lw = _mode.slice(1,2)+"0%", lr = _mode.slice(3,4)+"0%";
            buf.push('<table id="'+_id+'Tbl" style="width: 99%;border: 0 none;border-top: 2px solid #7C7C7E">');
            buf.push('<tr><td style="width: '+lw+';border-left: 1px solid #DDDDDD;border-bottom: 1px solid #DDDDDD"><img src="'+C$.PATH+'/skin/i/noPic.png" style="width: 50%" /></td><td style="width: '+lr+'"></td></tr>');
            buf.push('</table>');
            _$("#"+_id).html(buf.join(""));
        }
        buf = [];
        buf.push('<div class="slider-check">');
        buf.push('<div class="slider-lists" id="'+_id+'List">');

        var i = 0,c = 0,val = [],bUp,picItem = !!_plugin.pic?_plugin.pic.item:[],pics = {},rateLbl = (_plugin.label&&_plugin.label.rate)?_plugin.label.rate:"于昨天相比";
        for (id in ln) {
            if(picItem.join(",").indexOf(id)<0){
                if (i%_plugin.col==0){
                    buf.push("<ul>");
                }
                buf.push('<li'+((c==(size-1)&&(c+1)%_plugin.col!=0)?'  class="sl-last"':'') + (id==C$.ZBID_PRONAME?' style="width: 99%"':' style="width: '+99/_plugin.col+'%"')+'>');
                //如果是商品名称，则让商品名称这列结束，下一个属性单起一行
                if(id==C$.ZBID_PRONAME){
                    i=-1;
                }
                buf.push('<div class="sc-tit">');
                buf.push('<span class="txt">'+ln[id][0]+'</span>');
                if(ln[id][1]){
                    buf.push('<div class="question icon-help" desc="'+ln[id][1]+'"></div>');
                }
                buf.push('</div>');
            }
            val = ["无"];
            for(var j=0,len=(!!li[id]?li[id]:[]).length;j<len;j++){
                try {
                    val[j] = !!li[id][j]?li[id][j]:"无";
                }catch(e){
                    val[j] = "无";
                }
            }
            /**
             * 判断是否加载图片
             */
            for(var p in picItem){
                if(picItem[p]==id){
                    pics[picItem[p]] = parseFloat((val[0]+"").replace(/,/g,""));
                }
            }
            if(picItem.join(",").indexOf(id)<0){
                buf.push('<div class="sc-price">'+val[0]+'</div>');
                buf.push('<div class="sc-f">');
                if(!!val[1]){
                    if(!!val[2]){
                        bUp = (""+val[2]).indexOf("-")<0;
                        buf.push('<span class="txt">'+rateLbl+'<i class="'+(bUp?"i-up":"i-down")+'">'+(bUp?val[2]:(""+val[2]).slice(1))+'</i></span>');
                    }else{
                        bUp = (""+val[1]).indexOf("-")<0;
                        buf.push('<span class="txt">'+rateLbl+'<i class="'+(bUp?"i-up":"i-down")+'">'+(bUp?val[1]:(""+val[1]).slice(1))+'</i></span>');
                    }
                }
                buf.push('</div>');

                /*if(!!ln[id][1]){
                    buf.push('<div class="sc-tip">');
                    buf.push('<div class="sc-tip-con">'+ln[id][1]+'</div>');
                    buf.push('</div>');
                }*/
                buf.push('</li>');
                if ((i+1)%_plugin.col==0){
                    buf.push("</ul>");
                }
                i++,c++;
            }
        }
        if (i%_plugin.col!= 0){
            buf.push("</ul>");
        }
        buf.push('</div>');
//        buf.push('<div class="sc-handle">');
//        buf.push('<div class="switch">');
//        buf.push('</div></div>');
        buf.push('</div>');

        if(_mode!=C$.MODE_STANDARD){
            _$('#'+_id+'Tbl tr td:last').html(buf.join(""));
            //_$('#'+_id+'Tbl tr td:last .sc-handle').remove();
            _$('#'+_id+'List').css({"border-top":"0 none"});
        }else{
            _$("#"+_id).html(buf.join(""));
        }
        B$.loadSummary();
        //容器增加标题栏
        if(!!_name&&!!_name.bShow){
            $('#'+_id+'containerTitle').remove();
            $('<div id="'+_id+'containerTitle" class="containerTitle">'+_name.title+'</div>').insertBefore($("#"+_id));
        }
        //容器图片占位异步渲染图片
        //设置图片编码135836,135837,135838
        if(!!_plugin.pic&&!!_plugin.pic.code){
            var imgRender = function(_cache){
                if(_cache!=""){
                    _$('#'+_id+'Tbl tr td:first').html('<img src='+_cache+' style="width: 80%" />');
                }
            };
            for(var i in _plugin.pic.code){
                ajaxPic(_plugin.pic.code[i], imgRender);
            }
        }
        /**
         * 异步回调函数，自定义图片毁掉方法
         */
        if(_plugin.pic&&_plugin.pic.callback){
            if(_plugin.pic.item){
                var spus = [];
                for(var i in _plugin.pic.item){
                    spus.push(pics[_plugin.pic.item[i]]);
                }
                _plugin.pic.callback(_$('#'+_id+'Tbl tr td:first').find("img")[0],spus);
            }else{
                _plugin.pic.callback(_$('#'+_id+'Tbl tr td:first').find("img")[0]);
            }
        }else{
            //设置图片编码135836,135837,135838
            if(!!_plugin.pic&&!!_plugin.pic.item){
                var imgRender = function(_cache){
                    if(_cache!=""){
                        _$('#'+_id+'Tbl tr td:first').html('<img src='+_cache+' style="width: 80%" />');
                    }
                };
                for(var i in _plugin.pic.item){
                    ajaxPic(pics[_plugin.pic.item[i]], imgRender);
                }
            }
        }
    }
    return _render;
})(jQuery, listRender||{});
/**
 * 表格渲染器。使用DataTable插件
 */
var tblRender = (function(_$, _render){
    _render.execByDom = function(_id, _name, _plugin, _dataset, _layout, _preview){
        var data = _dataset.getData(C$.FIGURE_TBL);
    };
    _render.execByArray = function(_id, _name, _dataset, _plugin, _layout, _preview){
        var data = _dataset.getData(C$.FIGURE_TBL), dth = _dataset.getData(C$.DATASET_TH),dtb = _dataset.getData(C$.DATASET_TB), kv = _dataset.getData(C$.DATASET_KV), dis = _dataset.getData(C$.DATASET_TDI),dSet = {dis: _$.jClone(dis), dtb: _$.jClone(dtb)};
        var buf = [], th = [],tb = [], sort = [], tmpBuf = []
            , forbidIdx = {}, forbidCol = {},referIdx = {},referCounter = 0,picIdx = {}
            , picCol = {}, stripIdx = {}, linkIdx = {}, chkIdx = [], operIdx = [],tdFormatter = {}
            , expandIdx = [], extIdx = {}, extRef = [], c = 0,prevCol = {}
            ,prevColNum = 0, bRowCheck = !!_plugin.bRowCheck||!!_plugin.bBulkUpdate||!!_plugin.bBulkDelete
            , curCss, sortAsc = ["asc","desc"], sortDesc = ["desc", "asc"];
        //判断是否动态渲染增加数据
        if(!!_plugin.dynamic){
            _render.dynamicByArray(_id, _name, _plugin, _dataset, _layout, _preview);
            return;
        }
        _$('#'+_id).html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="'+_id+'Tbl" title="'+((_plugin.name&&_plugin.name.title)?_plugin.name.title:"")+'"></table>');
        if(bRowCheck){
            prevCol["rowCheck"] = prevColNum++;
            buf.push('<span class="fcheckbox ml5 mt2">');
            buf.push('<input type="checkbox" name="">');
            buf.push('</span>');
            buf.push('<label name="allTh" class="ml5">全选</label>');
            th.push({"sTitle": buf.join(""),"bSortable": false});
            //获取指定指标的下标
            for(var i in _plugin.rowCheck.item){
                c = 0;
                for(var id in dth){
                    if(id==_plugin.rowCheck.item[i]){
                        chkIdx.push(c);
                    }
                    c++;
                }
            }
        }
        /**
         * 判断每行是否有序号
         */
        if(_plugin.bRowOrder){
            prevCol["rowOrder"] = prevColNum++;
            th.push({"sTitle": '<label name="orderTh">'+_plugin.rowOrder.label+'</label>',"bSortable": !!_plugin.bSort&&!!_plugin.rowOrder&&!!_plugin.rowOrder.bSort, "sType": "numeric-comma"});
        }

        /**
         * 数据核心区列名
         */
        var tmpTh, tmpSortable, tmpAsSorting,tmpSortType;
        for(var i in dis){
            tmpTh = {};
            if(!dis[i][C$.DATAITEM_FORBID]){
                if(!!dis[i][C$.DATAITEM_PIC]){
                    picIdx[dis[i][C$.RESULT_ID]] = i;
                }
                if(dis[i][C$.DATAITEM_STRIP]){
                    stripIdx[dis[i][C$.RESULT_ID]] = {i: i,strip: dis[i][C$.DATAITEM_STRIP]};
                }
                if(!!dis[i][C$.DATAITEM_TDFORMATTER]){
                    tdFormatter[dis[i][C$.RESULT_ID]] = {i: i,tdFormatter: dis[i][C$.DATAITEM_TDFORMATTER].fun};
                }
                curCss = !!dis[i][C$.CURCLASS]?dis[i][C$.CURCLASS]:(!!dis[i][C$.DATAITEM_STRIP]||(dis[i][C$.RESULT_TYPE]==C$.DATATYPE_INT||dis[i][C$.RESULT_TYPE]==C$.DATATYPE_DOUBLE||dis[i][C$.RESULT_TYPE]==C$.DATATYPE_PERCENT||dis[i][C$.RESULT_TYPE]==C$.DATATYPE_ALLPERCENT))?"t-r":"t-l";
                tmpSortable = !!(_plugin.bSort&&dis[i][C$.DATAITEM_SORTABLE]);
                tmpAsSorting = tmpSortable?{"asSorting": dis[i][C$.DATAITEM_ASC]?sortAsc:sortDesc}:{};
                tmpSortType = (dis[i][C$.DATAITEM_TDFORMATTER]||{}).sortType?dis[i][C$.DATAITEM_TDFORMATTER].sortType:(dis[i][C$.RESULT_TYPE]!=C$.DATATYPE_STRING?"numeric-comma":null);
                if(dis[i][C$.RESULT_DES]&&dis[i][C$.RESULT_DES]!=""){
                    tmpTh = {"sTitle": '<i class="icon-help" desc="'+dis[i][C$.RESULT_DES]+'"></i><label name="'+dis[i][C$.RESULT_ID]+'Th">'+dis[i][C$.RESULT_VAL]+'</label>',"sClass": curCss, "bSortable": tmpSortable, "sType": tmpSortType};
                }else{
                    tmpTh = {"sTitle": '<label name="'+dis[i][C$.RESULT_ID]+'Th">'+dis[i][C$.RESULT_VAL]+'</label>',"sClass": curCss, "bSortable": tmpSortable, "sType": tmpSortType};
                }
                tmpTh = _$.extend(tmpTh, tmpAsSorting);
                if(dis[i][C$.DATAITEM_WIDTH]){
                    _$.extend(tmpTh, {'sWidth': dis[i][C$.DATAITEM_WIDTH]});
                }
                th.push(tmpTh);

                if(!!dis[i][C$.DATAITEM_SORT]){
                    sort.push([i, dis[i][C$.DATAITEM_SORT]]);
                }
                //列附加超链接
                if(!!dis[i][C$.DATAITEM_LINK]){
                    linkIdx[dis[i][C$.RESULT_ID]] = i;
                }
            }else{
                delete dth[dis[i][C$.RESULT_ID]];
                forbidIdx[dis[i][C$.RESULT_ID]] = i;
            }
        }
        //表格数据区筛选数据
        tb = !!dtb?_$.jClone(dtb):[];
        /**
         * 筛选出编号转图片的列
         */
        for(var key in picIdx){
            picCol[key] = [];
            for(var r in tb){
                picCol[key].push(tb[r].splice(picIdx[key], 1, '<img class="dtlPic pic'+tb[r][picIdx[key]]+'" src="'+C$.PATH+'/skin/i/noPic.png" />')[0]);
                /*//135836,135837,135838
                var test = [135836,135837,135838];
                for(var i in test){
                    picCol[key].push(test[r%3]);
                    tb[r].splice(picIdx[key], 1, '<img class="dtlPic pic'+test[r%3]+'" src="'+C$.PATH+'/skin/i/noPic.png" />');
                }*/
            }
        }
        /**
         * td 显示格式转换
         */
        for(var key in tdFormatter){
            for(var r in tb){
                tb[r].splice(tdFormatter[key].i, 1, tdFormatter[key].tdFormatter(tb[r][tdFormatter[key].i]));
            }
        }

        /**
         * 百分比型数值变换条状显示方式
         */
        for(var key in stripIdx){
            if(stripIdx[key].strip&&stripIdx[key].strip.layer=="separate"){
                for(var r in tb){
                    tmpBuf = [];
                    tmpBuf.push('<span class="'+((stripIdx[key].strip&&stripIdx[key].strip.stripStyle)?stripIdx[key].strip.stripStyle:C$.STYLE_STRIP_SEPARATE_DEF)+'" style="width: '+(dtb[r][stripIdx[key].i]+"").replace(/,/g,"")+'">');
                    tmpBuf.push('</span>');
                    if(!stripIdx[key].strip.noNum){
                        tmpBuf.push('<em class="ml5'+((stripIdx[key].strip&&stripIdx[key].strip.lblStyle)?(" "+stripIdx[key].strip.lblStyle):(" "+C$.STYLE_STRIP_LBL_SEPARATE_DEF))+'">'+dtb[r][stripIdx[key].i]+'</em>');
                    }
                    tb[r].splice(stripIdx[key].i, 1, tmpBuf.join(""));
                }
            }else{
                var bFull = false;
                for(var r in tb){
                    tmpBuf = [];
                    bFull = Number((dtb[r][stripIdx[key].i]+"").replace(/,/g,"").replace(/%/g,""))>100;
                    var bHundred = Number((dtb[r][stripIdx[key].i]+"").replace(/,/g,"").replace(/%/g,""))>90;
                    //判断比率是否爆棚
                    if(bFull){
                        //tmpBuf.push('<div class="p-r'+((stripIdx[key].strip&&stripIdx[key].strip.stripStyle)?(" "+stripIdx[key].strip.stripStyle):(" "+C$.STYLE_STRIP_SURROUND_FULL_DEF))+'">');
                        //tmpBuf.push('<span style="width: 100%"></span>');
                        tmpBuf.push('<span style="float:right;">'+dtb[r][stripIdx[key].i]+'</span>');
                        tmpBuf.push('<div style="width:70%"><span style="height:10px;float:right;margin-top:3px;background:#ed9a33;width:90%"></span></div>');
                    }else{
                    	tmpBuf.push('<span style="float:right;">'+dtb[r][stripIdx[key].i]+'</span>');
                    	tmpBuf.push('<div style="width:70%"><span style="height:10px;float:right;margin-top:3px;background:#83cbfb;width:'+(bHundred?"90%":dtb[r][stripIdx[key].i])+'"></span></div>');
                        //tmpBuf.push('<div class="p-r'+((stripIdx[key].strip&&stripIdx[key].strip.stripStyle)?(" "+stripIdx[key].strip.stripStyle):(" "+C$.STYLE_STRIP_SURROUND_DEF))+'">');
                        //tmpBuf.push('<span style="width: '+(dtb[r][stripIdx[key].i]+"").replace(/,/g,"")+'"></span>');
                    }

                    /*if(!stripIdx[key].strip.noNum){
                        if(bFull){
                            tmpBuf.push('<em class="p-a ml5'+((stripIdx[key].strip&&stripIdx[key].strip.lblStyle)?(" "+stripIdx[key].strip.lblStyle):(" "+C$.STYLE_STRIP_LBL_SURROUND_FULL_DEF))+'">'+dtb[r][stripIdx[key].i]+'</em>');
                        }else{
                            tmpBuf.push('<em class="p-a ml5'+((stripIdx[key].strip&&stripIdx[key].strip.lblStyle)?(" "+stripIdx[key].strip.lblStyle):(" "+C$.STYLE_STRIP_LBL_SURROUND_DEF))+'">'+dtb[r][stripIdx[key].i]+'</em>');
                        }
                    }*/
                    tmpBuf.push('</div>');
                    tb[r].splice(stripIdx[key].i, 1, tmpBuf.join(""));
                }
            }
        }
        /**
         * 过滤掉禁用数据项的列
         */
        var minus = 0;
        for(var key in forbidIdx){
            forbidCol[key] = [];
            for(var r in tb){
                forbidCol[key].push(tb[r].splice(forbidIdx[key]-minus, 1)[0]);
                /*//135836,135837,135838
                var test = [135836,135837,135838];
                for(var i in test){
                    forbidCol[key].push(test[r%3]);
                }*/
            }
            minus++;
        }

        //如果有行操作（修改/删除）则增加表格操作列
        if(!!_plugin.bRowModify||!!_plugin.bRowRemove){
            th.push({"sTitle": '<label name="operTh">操作</label>',"bSortable": false});
            //获取指定指标的下标
            for(var i in _plugin.rowOperate.item){
                c = 0;
                for(var id in dth){
                    if(id==_plugin.rowOperate.item[i]){
                        operIdx.push(c);
                    }
                    c++;
                }
            }
        }
        //判断是否扩展明细展开功能
        if(!!_plugin.rowExpand){
            var forbid = [];
            //获取指定指标的下标
            for(var i in _plugin.rowExpand.item){
                for(var j in dis){
                    if(_plugin.rowExpand.item[i]==dis[j][C$.RESULT_ID]&&!!dis[j][C$.DATAITEM_FORBID]){
                        expandIdx.push(forbidIdx[dis[j][C$.RESULT_ID]]);
                        forbid[i] = true;
                    }
                }
                if(!forbid[i]){
                    c = 0;
                    for(var id in dth){
                        if(id==_plugin.rowExpand.item[i]){
                            expandIdx.push(c);
                        }
                        c++;
                    }
                }
            }
            th.push({"sTitle": '<label name="expandTh">'+_plugin.rowExpand.label+'</label>',"bSortable": false});
        }
        /**
         * 判断是否追加列
         */
        if(!!_plugin.colTail){
            for(var col in _plugin.colTail){
            	if(!!_plugin.colTail[col].width){
            		th.push({"sTitle": '<label name="'+col+'Th">'+_plugin.colTail[col].label+'</label>',"sClass": "t-c", "bSortable": false, "sType": null,"sWidth":_plugin.colTail[col].width});
            	}else{
            		th.push({"sTitle": '<label name="'+col+'Th">'+_plugin.colTail[col].label+'</label>',"sClass": "t-c", "bSortable": false, "sType": null});
            	}
            }
        }
        //判断是否整列设置图标等元素占位
        if(!!_plugin.colExt){
            //获取指定指标的下标
            for(var key in _plugin.colExt){
                c = 0;
                for(var id in dth){
                    if(id==key){
                        extIdx[key] = c;
                    }
                    c++;
                }
            }
        }
        //如果增加行复选，则渲染并赋值指定的指标数据
        if(!!_plugin.bRowCheck
            ||!!_plugin.bRowOrder
            ||!!_plugin.bRowModify
            ||!!_plugin.bRowRemove
            ||!!_plugin.rowExpand
            ||!!_plugin.colExt){
            var vals,params = [],colExtBuf = [],click;
            for(var r in tb){
                if(!!_plugin.colExt){
                    for(var key in extIdx){
                        for(var i in _plugin.colExt[key]){
                            //判断是否附加在前面或者后面
                            if(!!_plugin.colExt[key][i].bHead){
                                //判断是否附加图标
                                if(!!_plugin.colExt[key][i].icon){
                                    if(_plugin.colExt[key][i].ref){
                                        params = [];
                                        for(var m in _plugin.colExt[key][i].ref){
                                            params.push((kv[_plugin.colExt[key][i].ref[m]][r]||"").replace(/,/g,""));
                                        }
                                    }
                                    click = (!!_plugin.colExt[key][i].event?(_plugin.colExt[key][i].event+"('"+params.join()+"')"):"");
                                    if(_plugin.colExt[key][i].bWholeLink){
                                        tb[r].splice(extIdx[key],1,'<a href="javascript: void(0)" onclick="'+click+'"><label class="icon pointer '+_plugin.colExt[key][i].icon+'"><i></i>'+ tb[r][extIdx[key]]+'</label></a>');
                                    }else{
                                        tb[r].splice(extIdx[key],1,'<label class="icon '+_plugin.colExt[key][i].icon+'"><i onclick="'+click+'"></i>'+ tb[r][extIdx[key]]+'</label>');
                                    }
                                }
                                if(!!_plugin.colExt[key][i].bPic){
                                    if(!!_plugin.colExt[key][i].ref){
                                        _$.merge(extRef,[_plugin.colExt[key][i].ref]);
                                        if(!!_plugin.colExt[key][i].bLink){
                                            tb[r].splice(extIdx[key],1,'<span><img class="dtlPic pic'+forbidCol[_plugin.colExt[key][i].ref][r]+'" src="'+C$.PATH+'/skin/i/noPic.png" /><a class="icon-help" desc="'+tb[r][extIdx[key]]+'" href="http://item.jd.com/'+forbidCol[_plugin.colExt[key][i].ref][r]+'.html" target="_blank">'+ tb[r][extIdx[key]]+'</a>'+(!!_plugin.colExt[key][i].bParent?'<span class="bParent" style="display:none"> '+forbidCol[_plugin.colExt[key][i].par][r]+'</span>':'')+'</span>');
                                        }else{
                                            tb[r].splice(extIdx[key],1,'<span><img class="dtlPic pic'+forbidCol[_plugin.colExt[key][i].ref][r]+'" src="'+C$.PATH+'/skin/i/noPic.png" />'+ tb[r][extIdx[key]]+''+(!!_plugin.colExt[key][i].bParent?'<span class="bParent" style="display:none"> '+forbidCol[_plugin.colExt[key][i].par][r]+'</span>':'')+'</span>');
                                        }
                                    }
                                }
                                if(!!_plugin.colExt[key][i].bTrend){
                                    colExtBuf = [];
                                    if(tb[r][extIdx[key]]!="-"){
                                        if(tb[r][extIdx[key]].indexOf("-")>=0){
                                            colExtBuf.push('<span class="trend fall">');
                                        }else{
                                            colExtBuf.push('<span class="trend rise">');
                                        }
                                        colExtBuf.push('<input type="hidden" value="'+tb[r][extIdx[key]]+'">');
                                        colExtBuf.push('<i></i>');
                                        colExtBuf.push(tb[r][extIdx[key]].replace("-",""));
                                        colExtBuf.push('</span>');
                                        tb[r].splice(extIdx[key],1,colExtBuf.join(""));
                                    }
                                }
                            }else if(_plugin.colExt[key][i].bTail){
                                if(!!_plugin.colExt[key][i].icon){
                                    if(_plugin.colExt[key][i].ref){
                                        params = [];
                                        for(var m in _plugin.colExt[key][i].ref){
                                            params.push((kv[_plugin.colExt[key][i].ref[m]][r]||"").replace(/,/g,""));
                                        }
                                    }
                                    click = (!!_plugin.colExt[key][i].event?(_plugin.colExt[key][i].event+"('"+params.join()+"')"):"");
                                    if(_plugin.colExt[key][i].bWholeLink){
                                        //tb[r].splice(extIdx[key],1,'<a href="javascript: void(0)" onclick="'+click+'"><label class="icon pointer '+_plugin.colExt[key][i].icon+'">' + tb[r][extIdx[key]] + '<i></i></label></a>');
                                        tb[r].splice(extIdx[key],1,'<div class="fl"><label>' + tb[r][extIdx[key]] + '</label></div><a class="fr icon '+_plugin.colExt[key][i].icon+'" href="javascript: void(0)" onclick="'+click+'"><i></i></a>');
                                    }else{
                                        tb[r].splice(extIdx[key],1,'<label class="icon '+_plugin.colExt[key][i].icon+'">' + tb[r][extIdx[key]] + '<i onclick="'+click+'"></i></label>');
                                    }
                                }
                                if(!!_plugin.colExt[key][i].bPic){
                                    _$.merge(extRef,[_plugin.colExt[key][i].ref]);
                                    if(!!_plugin.colExt[key][i].bLink){
                                        tb[r].splice(extIdx[key],1,'<span><a href="http://item.jd.com/'+forbidCol[_plugin.colExt[key][i].ref][r]+'.html" target="_blank">'+ tb[r][extIdx[key]]+'</a><img class="dtlPic pic'+forbidCol[_plugin.colExt[key][i].ref][r]+'" src="'+C$.PATH+'/skin/i/noPic.png" /></span>');
                                    }else{
                                        tb[r].splice(extIdx[key],1,'<span>'+ tb[r][extIdx[key]]+'<img class="dtlPic pic'+forbidCol[_plugin.colExt[key][i].ref][r]+'" src="'+C$.PATH+'/skin/i/noPic.png" /></span>');
                                    }
                                }
                                if(!!_plugin.colExt[key][i].bTrend){
                                    colExtBuf = [];
                                    if(tb[r][extIdx[key]]!="-"){
                                        if(tb[r][extIdx[key]].indexOf("-")>=0){
                                            colExtBuf.push('<span class="trend fall">');
                                        }else{
                                            colExtBuf.push('<span class="trend rise">');
                                        }
                                        colExtBuf.push('<input type="hidden" value="'+tb[r][extIdx[key]]+'">');
                                        colExtBuf.push(tb[r][extIdx[key]].replace("-",""));
                                        colExtBuf.push('<i></i>');
                                        colExtBuf.push('</span>');
                                        tb[r].splice(extIdx[key],1,colExtBuf.join(""));
                                    }
                                }
                            }else{
                                if(!!_plugin.colExt[key][i].bLink){
                                    if(!!_plugin.colExt[key][i].href){
                                        //tb[r].splice(extIdx[key],1,'<span><a href="'+_plugin.colExt[key][i].href.replace("##",forbidCol[_plugin.colExt[key][i].ref][r])+'" target="_blank">'+ tb[r][extIdx[key]]+'</a></span>');
                                    	if(!!_plugin.rowColorize){
                                    		tb[r].splice(extIdx[key],1,'<label class="refer" '
                                    				+_plugin.rowColorize.item[i]+'="'
                                    				+forbidCol[_plugin.rowColorize.item[i]][r]
                                    		+'"><a href="'
                                    		+_plugin.colExt[key][i].href.replace("##",forbidCol[_plugin.colExt[key][i].ref][r])
                                    		+'" target="_blank">'
                                    		+tb[r][extIdx[key]].replace(/<.*?>/g, "")
                                    		+ '</a></label>');
                                    	}else{
                                    		tb[r].splice(extIdx[key],1,'<label class="refer"><a href="'
                                    		+_plugin.colExt[key][i].href.replace("##",forbidCol[_plugin.colExt[key][i].ref][r])
                                    		+'" target="_blank">'
                                    		+tb[r][extIdx[key]].replace(/<.*?>/g, "")
                                    		+ '</a></label>');
                                    	}
                                    }
                                }
                            }
                        }
                    }
                }
                if(!!_plugin.bRowCheck){
                    buf = [],vals = [];
                    buf.push('<span class="rowcheck fcheckbox ml5">');
                    for(var i in chkIdx){
                        vals.push((""+dtb[r][chkIdx[i]]).replace(/,/g,""));
                    }
                    buf.push('<input type="checkbox" name="" val="'+vals.join()+'">');
                    buf.push('</span>');
                    tb[r].splice(prevCol["rowCheck"],0,buf.join(""));
                }
                if(!!_plugin.bRowOrder){
                    var order = (Number(r)+1);
                    if(!!_plugin.rowOrder&&!!_plugin.rowOrder.ext){
                        if(!!_plugin.rowOrder.ext.bHead){
                            if(!!_plugin.rowOrder.ext.rule&&eval(order+_plugin.rowOrder.ext.rule)){
                                tb[r].splice(prevCol["rowOrder"],0,'<label class="icon '+_plugin.rowOrder.ext.icon + '"><i></i>'+order+'</label>');
                            }else{
                                tb[r].splice(prevCol["rowOrder"],0,order);
                            }
                        }else{
                            if(!!_plugin.rowOrder.ext.rule&&eval(order+_plugin.rowOrder.ext.rule)){
                                tb[r].splice(prevCol["rowOrder"],0,'<label class="icon '+_plugin.rowOrder.ext.icon + '">'+order+'<i></i></label>');
                            }else{
                                tb[r].splice(prevCol["rowOrder"],0,order);
                            }
                        }
                    }else{
                        tb[r].splice(prevCol["rowOrder"],0,order);
                    }
                }
                if(!!_plugin.bRowModify||!!_plugin.bRowRemove){
                    buf = [],vals = [];
                    for(var i in operIdx){
                        vals.push((""+dtb[r][operIdx[i]]).replace(/,/g,""));
                    }
                    if(!!_plugin.bRowModify){
                        buf.push('<a class="btn rowMdf mr10" href="javascript:void(0);" val="'+vals.join()+'">');
                        buf.push('<i> </i>');
                        buf.push('<span>修改</span>');
                        buf.push('</a>');
                    }
                    if(!!_plugin.bRowRemove){
                        buf.push('<a class="btn rowRmv mr10" href="javascript:void(0);" val="'+vals.join()+'">');
                        buf.push('<i> </i>');
                        buf.push('<span>删除</span>');
                        buf.push('</a>');
                    }
                    tb[r].push(buf.join(""));
                }
                if(!!_plugin.rowExpand){
                    buf = [],vals = [];
                    for(var i in expandIdx){
                        vals.push((""+dtb[r][expandIdx[i]]).replace(/,/g,""));
                    }
                    buf.push('<a class="rowExpand mr10" href="javascript:void(0);" val="'+vals.join()+'">');
                    buf.push('<span>展开</span><span class="down">﹀</span>');
                    buf.push('</a>');
                    tb[r].push(buf.join(""))
                }
            }
        }

        /**
         * 设定行着色的算法
         */
        if(_plugin.bRowColor&&_plugin.rowColorize){
            if(_plugin.rowColorize.refer){
                for(var j in _plugin.rowColorize.refer){
                    referCounter = 0;
                    for(var i in dis){
                        if(!dis[i][C$.DATAITEM_FORBID]){
                            if(dis[i][C$.RESULT_ID]==_plugin.rowColorize.refer[j]){
                                referIdx[_plugin.rowColorize.refer[j]] = referCounter;
                                break;
                            }
                            referCounter++;
                        }
                    }
                }
                for(var i in _plugin.rowColorize.item){
                    for(var r in tb){
                    	var indexIncrement = 0,curColorIndex = 0;
                    	/* 判断第一列是否为生成列，则重新计算行着色的列下标 START */
                    	if(!!_plugin.bRowOrder){
                    		indexIncrement++;
                    	}
                    	if(!!_plugin.bRowCheck){
                    		indexIncrement++;
                    	}
                    	/* 判断第一列是否为生成列，则重新计算行着色的列下标 END */
                    	curColorIndex = parseInt(referIdx[_plugin.rowColorize.refer[i]])+indexIncrement;
                    	tb[r].splice(curColorIndex,1,'<label class="refer" '+_plugin.rowColorize.item[i]+'="'+forbidCol[_plugin.rowColorize.item[i]][r]+'">'+tb[r][curColorIndex] + '</label>');
                    }
                }
            }
        }

        /**
         * 追加自定义列及子元素
         */
        if(!!_plugin.colTail){
            _render.ext.colTailAdd(_id, tb, _plugin.colTail, dSet);
        }
        /**
         * 异步渲染图片
         * @type {*}
         */
        var imgDrawCallBack = function(){
            var imgRender, imgCode, imgs = [];
            _$("img.dtlPic", _$("#"+_id+"Tbl")).each(function(){
                imgCode = _$(this).attr("class").match(/pic\d+/);
                if(imgCode&&imgCode[0]&&imgCode[0].replace("pic","").isNumber()){
                    imgs.push(parseFloat(imgCode[0].replace("pic","")));
                }
            });
            imgs = _$.unique(imgs);
            imgRender = function(_cache){
                for(var i in imgs){
                    _$(".pic"+imgs[i], _$("#"+_id+"Tbl")).each(function(){
                        if(_cache[imgs[i]]!=""){
                            _$(this).attr("src", _cache[imgs[i]]);
                        }
                    });
                }
            }
            loadPic(imgs, imgs.length, imgRender);
        }

        /**
         *  行着色的翻页回调
         */
        var rowColorDrawCallBack = function(_containerId,_pluginSetting){
            if(_pluginSetting.bRowColor&&_pluginSetting.rowColorize){
                var r = 0,tblId = _containerId+"Tbl",referTd = {};
                $('#'+tblId+" thead th").each(function(_i, _this){
                    referTd[$(_this).find("label").jName().replace("Th","")] = _i;
                });
                $('#'+tblId+" tbody tr").each(function(){
                    var rowColor = true,$o = $(this),bingo = [];
                    for(var i in _pluginSetting.rowColorize.item){
                        var $tar = $('td:eq('+(referTd[_pluginSetting.rowColorize.refer[i]])+')',$o).find("label.refer"),tar = $tar.attr(_pluginSetting.rowColorize.item[i]);
                        if(tar){
                            bingo[i] = eval((tar.isNumber()?tar:("'"+tar+"'"))+_pluginSetting.rowColorize.rule[i]);
                        }
                        rowColor = rowColor&&bingo[i];
                    }
                    if(rowColor){
                        if(!!_pluginSetting.rowColorize.bgColor){
                            $o.css({"background-color": _pluginSetting.rowColorize.bgColor});
                        }
                        if(_pluginSetting.rowColorize.bgImg){
                            $("td:first",$o).css({"background-image": _pluginSetting.rowColorize.bgImg});
                            $("td:first",$o).css({"background-repeat": "no-repeat"});
                            $("td:first",$o).css({"background-attachment": "scroll"});
                        }
                        if(!!_pluginSetting.rowColorize.fontColor){
                            $o.css({"color": _pluginSetting.rowColorize.fontColor});
                        }
                        if(!!_pluginSetting.rowColorize.borderColor){
                            $o.css({"border": _pluginSetting.rowColorize.borderColor});
                        }
                    }
                    r++;
                });
            }
        };
        /**
         * 行展开的翻页回调操作
         * @param _containerId
         * @param _settings
         */
        var rowExpandCallBack = function(_containerId, _pluginSetting, _settings){
            if(B$.cache.get("rowExpand",_containerId)&&(Math.ceil(_settings._iDisplayStart/_settings._iDisplayLength)+1)!=B$.cache.get("rowExpand",_containerId).curpage){
                if(B$.cache.get("rowExpand",_containerId).bExpand){
                    if($(".rowExpand .up",$("#"+_containerId)).length){
                        var $tr = $(".rowExpand .up",$("#"+_containerId)).closest("tr");
                        $(".rowExpand",$tr).html('<span>展开</span><span class="down">﹀</span>');
                        B$.tables[_containerId].fnClose($tr[0]);
                    }
                }
            }
        }
        /**
         * 表格插件的初始化设置
         * @type {{bFilter: boolean, aoColumns: Array, aaData: Array, bInfo: boolean, bPaginate: boolean, iDisplayLength: (*|{}), aLengthMenu: *, bAutoWidth: boolean, bDeferRender: boolean, sPaginationType: *, aaSorting: Array}}
         */
        var tblSettings = {
            "oLanguage": {
                "sEmptyTable": _plugin.noData?_plugin.noData:C$.CN_NODATA
            },
            "bFilter" : !!_plugin.bFilter?true:false,
            "aoColumns": th,
            "aaData": tb,
            "bInfo" : false,
            "bPaginate" : _plugin.pagetype!="none",
            "iDisplayLength": _plugin.perpage, //每页显示个数
            "aLengthMenu":!!_plugin.lengthMenu?_plugin.lengthMenu:[10,20,50],
            "bAutoWidth": false,
            "bDeferRender": true,
            "sPaginationType": _plugin.pagetype,
            "aaSorting": _plugin.sorting || sort,  //列排序
            "fnDrawCallback": function(_settings){
                imgDrawCallBack();
                rowColorDrawCallBack(_id, _plugin);
                if(_plugin.rowExpand&&_plugin.rowExpand.bSole){
                    rowExpandCallBack(_id, _plugin, _settings);
                }
                if(_plugin.drawCallBack){
                    var callBack = _plugin.drawCallBack;
                    if(_$.jIsArray(callBack)){
                        for(var i in callBack){
                            if(typeof(callBack[i])=="string"){
                                eval(callBack[i]+'(_settings)');
                            }else{
                                callBack[i](_settings);
                            }
                        }
                    }else{
                        if(typeof(callBack)=="string"){
                            eval(callBack+'(_settings)');
                        }else{
                            callBack(_settings);
                        }
                    }
                }
                _$(".icon-help",_$('#'+_id+"Tbl")).Jtips({
                    "content": "暂无描述",
                    "position": 'bottom',
                    "width": 196,
                    "zIndex":25000
                });
            }
        };

        /**
         * 判断是否下载并加载表格的下载插件
         *//*
        if(!!_plugin.bDnXls){
            _$.extend(tblSettings, {
                        "sDom": 'T<"clear">lfrtip',
                        "oTableTools": {
                            "sSwfPath": C$.PATH+"/media/copy_csv_xls_pdf.swf",
                            "aButtons":["xls"]
                        }
            });
        }*/
        var tbl = _$('#'+_id+"Tbl").dataTable(tblSettings);
        _$("i.icon-help",_$('#'+_id+"Tbl")).Jtips({
            "content": "暂无描述",
            "position": 'bottom',
            "width": 196,
            "zIndex":25000
        });
        B$.tables[_id] = tbl;
        
        //增加表格样式
        if(!!_plugin.tableClass){
        	_$('#'+_id+"Tbl").addClass(_plugin.tableClass);
        }

        //容器增加标题栏
        if(!!_name&&!!_name.bShow){
            $('#'+_id+'containerTitle').remove();
            $('<div id="'+_id+'containerTitle" class="containerTitle">'+_name.title+'</div>').insertBefore($("#"+_id));
        }

        //给序号列设置宽度
        if(!!_plugin.bRowOrder){
            $("#"+_id+" thead th").each(function(){
               if($(this).find("label").eq(0).jName().replace("Th","")=="order"){
            	   if(!!_plugin.rowOrder && !!_plugin.rowOrder.width){
            		   $(this).jWidth(_plugin.rowOrder.width);
            	   }else{
            		   $(this).jWidth(70);
            	   }
               }
            });
        }

        //判断是否含有纵向总计
        if(_plugin.cTotal){
            $("#"+_id+" tbody tr:first").css({"font-weight": "bold"});
        }
        //判断是否含有纵向平均
        if(_plugin.cAvg){
          if(_plugin.cTotal){
              $("#"+_id+" tbody tr").eq(1).css({"font-weight": "bold"});
          }else{
              $("#"+_id+" tbody tr:first").css({"font-weight": "bold"});
          }
        }
        $("#"+_id+" .dataTables_filter").html("");
        $("#"+_id+" .dataTables_filter").css({"height": 0,"margin": 0,"padding":0});
        if(_plugin.pagetype!="none"){
            $("#"+_id+" .dataTables_paginate").before($("#"+_id+" .dataTables_length"));
            $("#"+_id+" .dataTables_length").css({"float":"left","margin-top": "6px", "text-align": "left"});
            if(!_plugin.bLengthChange&&!_plugin.lengthMenu){
                $("#"+_id+" .dataTables_length").html("");
                $("#"+_id+" .dataTables_length").css({"height": 0,"margin": 0,"padding":0});
            }
        }
        //清除工具条
        $("#"+_id+"Bar").remove();

        //列着色启动
        if(_plugin.bColColor){
            //TODO
        }
        //判断是否每行增加复选框并启动
        if(!!_plugin.bRowCheck){
            $('#'+_id+" th .fcheckbox").die("click").live("click", function(){
                $(this).toggleClass("f-checked");
                if($(this).is(".f-checked")){
                    $('#'+_id+" td .rowcheck.fcheckbox").addClass("f-checked");
                }else{
                    $('#'+_id+" td .rowcheck.fcheckbox").removeClass("f-checked");
                }
            });
            $('#'+_id+" td .rowcheck.fcheckbox").die("click").live("click", function(){
                $(this).toggleClass("f-checked");
                if($('#'+_id+" td .rowcheck.fcheckbox").not(".f-checked").length>0){
                    $('#'+_id+" th .fcheckbox").removeClass("f-checked");
                }else{
                    $('#'+_id+" th .fcheckbox").addClass("f-checked");
                }
            });
            $('#'+_id+" tr th:first").css({"width":"120px"});
        }

        //展开按钮功能扩展
        if(!!_plugin.rowExpand){
            $(".rowExpand",$("#"+_id)).die('click');
            $(".rowExpand",$("#"+_id)).live('click',function(){
                var $tr;
                if(_plugin.rowExpand.bSole&&!$(this).find('span:last').is(".up")){
                    $tr = $(".rowExpand .up",$("#"+_id)).closest("tr");
                    if($tr){
                        $(".rowExpand",$tr).html('<span>展开</span><span class="down">﹀</span>');
                        B$.tables[_id].fnClose($tr[0]);
                    }
                }
                var tr = $(this).closest("tr")[0];
                if($(this).find('span:first').text()=="收起"){
                    $(this).html('<span>展开</span><span class="down">﹀</span>');
                    B$.tables[_id].fnClose(tr);
                }else{
                    $(this).html('<span>收起</span><span class="up">︿</span>');
                    B$.tables[_id].fnOpen(tr,'<div id="'+_id+'Expand'+$(this).closest("tr").index()+'"></div>','details');
                    if(_plugin.rowExpand.event){
                    	var expandDiv = _id+'Expand'+$(this).closest("tr").index();
                        if(_plugin.rowExpand.item){
                            var colVals = $(this).attr("val").split(","),paramCols = {};
                            for(var i in colVals){
                                paramCols[_plugin.rowExpand.item[i]] = colVals[i];
                            }
                            eval(_plugin.rowExpand.event+'("'+expandDiv+'",paramCols)');
                        }else{
                            eval(_plugin.rowExpand.event+'("'+expandDiv+'")');
                        }
                        if($("#"+expandDiv+" .tab.cxt").length==0){
                        	$("#"+expandDiv).removeClass("innerTableBorder").removeClass("tableNoBottomBorder").addClass("innerTableBorder").addClass("tableNoBottomBorder");
                        }
                    }
                    B$.cache.set("rowExpand",{curpage:  Math.ceil(B$.tables[_id].fnSettings()._iDisplayStart/B$.tables[_id].fnSettings()._iDisplayLength)+1,bExpand: true},_id);
                }
            });
        }
        //判断是否每行增加修改/删除按钮
        if(!!_plugin.bRowModify||!!_plugin.bRowRemove){
            $('#'+_id+" tr th:last").css({"width":"240px"});
        }
        //加载表格单列拉伸插件
        if(!!_plugin.bColDrag){
            B$.colDragAdd(_id);
        }
        //加载表格横向滚动箭头插件
        if(!!_plugin.bGridSlider){
            B$.gridSliderAdd(_id);
        }
        //加载表格自定义列插件
        if(!!_plugin.bCustomCol){
            if(_plugin.bRowCheck||_plugin.bRowOrder||(!!_plugin.customCol&&!!_plugin.customCol.multiGroup)){
                B$.customColAdd(_id, dis, prevColNum, _plugin.customCol);
            }else{
                B$.customColAdd(_id, dis, prevColNum);
            }
        }
        //加载表格的过滤插件
        if(_plugin.bFilter){
            if(_plugin.filter){
                B$.tblFilterAdd(_id, tbl, _plugin.filter);
            }else{
                B$.tblFilterAdd(_id, tbl);
            }
        }
        //加载表格的下载插件
        if(!!_plugin.bDnXls){
            //渲染虚拟无分页表格全量下载
            _$('#'+_id).append( '<table cellpadding="0" cellspacing="0" border="0" class="display hidden" id="'+_id+'TblXls" title="'+((_plugin.name&&_plugin.name.title)?_plugin.name.title:"")+'"></table>')
            _$.extend(tblSettings, {bPaginate: false, bFilter: false, fnDrawCallback: function(){}});
            _$('#'+_id+"TblXls").dataTable(tblSettings);
            B$.dnExcelAdd(_id, _id+"TblXls");
        }

        //加载表格的新增按钮插件
        if(!!_plugin.bCreate){
            _render.ext.createAdd(_id, _plugin);
        }
        //加载表格的批量修改按钮插件
        if(!!_plugin.bBulkUpdate){
            _render.ext.bulkUpdateAdd(_id, _plugin);
        }
        //加载表格的批量删除按钮插件
        if(!!_plugin.bBulkDelete){
            _render.ext.bulkDeleteAdd(_id, _plugin);
        }
        //加载表格的自定义批量操作按钮
        if(!!_plugin.customBulk){
            _render.ext.customBulkAdd(_id, _plugin);
        }
    };
    _render.ext = {
        colTailAdd: function(_id, _tb, _colTailSetting, _dSet){
            for(var col in _colTailSetting){
                if(_colTailSetting[col].parts){
                    var buf = [],vals = [],settings, tailIdx = [];
                    for(var p= 0,len=_colTailSetting[col].parts.length;p<len;p++){
                        settings = _colTailSetting[col].parts[p], tailIdx = [];
                        if(settings.label==C$.LBL_COMPARE){
                            B$.tableExt.compareLoad(_id,settings.label,[settings.selMin,settings.selMax]);
                        }
                        switch(settings.partType){
                            case "checkbox":
                                if(settings.refItem&&_dSet){
                                    for(var i in settings.refItem){
                                        for(var j in _dSet.dis){
                                            if(_dSet.dis[j][C$.RESULT_ID]==settings.refItem[i]){
                                                tailIdx.push(Number(j));
                                            }
                                        }
                                    }
                                }
                                for(var r in _tb){
                                    buf = [], vals = [];
                                    for(var i in tailIdx){
                                        vals.push(String(_dSet.dtb[r][tailIdx[i]]).replace(/,/g, ""));
                                    }
                                    buf.push('<span class="tailCol fcheckbox ml5"'+(settings.event?(' ev="'+settings.event+'"'):'')+(vals.length>0?(' val="'+vals.join()+'"'):'')+' ord="'+(Number(r)+1)+'">');
                                    buf.push('<input type="checkbox" name="">');
                                    buf.push('</span>');
                                    if(settings.label){
                                        buf.push('<label class="ml5 '+(settings.labelStyle?settings.labelStyle:C$.STYLE_CHECKBOX_LBL_DEF)+'">');
                                        buf.push(settings.label);
                                        buf.push('</label>');
                                    }
                                    _tb[r].push(buf.join(""));
                                }

                                break;
                            case "radiobox":    break;
                            case "button":    break;
                            case "html":
                                if(_colTailSetting[col].parts[p].html){
                                    if(settings.refItem&&_dSet){
                                        for(var i in settings.refItem){
                                            for(var j in _dSet.dis){
                                                if(_dSet.dis[j][C$.RESULT_ID]==settings.refItem[i]){
                                                    tailIdx.push(Number(j));
                                                }
                                            }
                                        }
                                    }
                                    for(var r in _tb){
                                        buf = [], vals = [];
                                        for(var i in tailIdx){
                                            vals.push((_dSet.dtb[r][tailIdx[i]]+"").replace(/,/g, ""));
                                        }
                                        if(_colTailSetting[col].parts[p].event){
                                            buf.push('<a class="tailCol html" href="javascript: void(0)"'+(settings.event?(' ev="'+settings.event+'"'):'')+(vals.length>0?(' val="'+vals.join()+'"'):'')+'>'+_colTailSetting[col].parts[p].html+'</a>');
                                        }else{
                                            buf.push(_colTailSetting[col].parts[p].html);
                                        }
                                        _tb[r].push(buf.join(""));
                                    }
                                }
                                break;
                        }

                        //追加列中复选框添加事件
                        B$.cache.set("counter",0,_id);
                        _$(".tailCol.fcheckbox",_$("#"+_id)).die("click").live("click",function(){
                            _$(this).toggleClass("f-checked");
                            if(_$(this).hasClass("f-checked")){
                                B$.cache.set("counter",Number(B$.cache.get("counter",_id))+1,_id);
                            }else{
                                B$.cache.set("counter",Number(B$.cache.get("counter",_id))-1,_id);
                            }
                            if(settings.selMax&&(B$.cache.get("counter",_id)>settings.selMax)){
                                B$.T.warn('最多选择'+settings.selMax+'项！');
                                if(_$(this).hasClass("f-checked")){
                                    B$.cache.set("counter",Number(B$.cache.get("counter",_id))-1,_id);
                                }else{
                                    B$.cache.set("counter",Number(B$.cache.get("counter",_id))+1,_id);
                                }
                                _$(this).toggleClass("f-checked");
                                return;
                            }
                            if(_$(this).attr("ev")){
                                if(_$(this).attr("val")){
                                    var curPage = Math.ceil(Number(_$(this).attr("ord"))/B$.tables[_id].fnSettings()._iDisplayLength);
                                    eval(_$(this).attr("ev")+'(this,"'+_id+'","'+_$(this).attr("val")+'",'+JSON.stringify({curPage: curPage})+')');
                                }else{
                                    eval(_$(this).attr("ev")+'(this,"'+_id+'")');
                                }
                            }
                        });

                        //追加列中自定义链接添加事件
                        _$("a.tailCol.html",_$("#"+_id)).die("click").live("click",function(){
                            if(_$(this).attr("ev")){
                                if(_$(this).attr("val")){
                                    eval(_$(this).attr("ev")+'(this,"'+_id+'","'+_$(this).attr("val")+'")');
                                }else{
                                    eval(_$(this).attr("ev")+'(this,"'+_id+'")');
                                }
                            }
                        });
                    }
                }
            }
        },
        createAdd: function(_id, _plugin){
            var buf = [], barId = _id+"Bar",operId = _id+"BarOper";
            $('#'+barId+" .fl:eq(0)").find(".add").remove();
            //如果工具条不存在，渲染工具条区域
            if(!$.jDomExist(barId)){
                buf.push('<div class="ctrl-con mb10" id="'+barId+'"></div>');
                $(buf.join("")).insertBefore($("#"+_id));

                $("#"+barId).jWidth($("#"+_id)[0].style.width);
                $("#"+barId).jFloat($("#"+_id).jFloat());
            }
            if(!$.jDomExist(barId, "fl")){
                $("#"+barId).append('<div class="fl"></div>');
            }
            //渲染表格自定义列区域
            if(!$.jDomExist(operId)){
                $("#"+barId+" .fl:eq(0)").append('<div id="'+operId+'" class="fl"></div>');
                if($("#"+operId).prev().length>0){
                    $("#"+operId).addClass("ml10");
                }
            }
            buf = [];
            buf.push('<a class="btn add mr10" href="javascript:void(0);"><i> </i>');
            buf.push('<span>新增</span>');
            buf.push('</a>');
            $("#"+operId).append(buf.join(""));

            /**
             * 批量修改操作功能
             */
            $("#"+barId).find("a.add").eq(0).click(function(){
                if(!!_plugin.create.form){
                    I$.init([_plugin.create.form]);
                    I$.run(A$);
                }
            });
        },
        /**
         * 增加批量修改按钮
         * @param _id
         */
        bulkUpdateAdd: function(_id, _plugin){
            var buf = [], barId = _id+"Bar",operId = _id+"BarOper",non = [], inModify = false;
            $('#'+barId+" .fl:eq(0)").find(".bulkUpd").remove();
            //如果工具条不存在，渲染工具条区域
            if(!$.jDomExist(barId)){
                buf.push('<div class="ctrl-con mb10" id="'+barId+'"></div>');
                $(buf.join("")).insertBefore($("#"+_id));

                $("#"+barId).jWidth($("#"+_id)[0].style.width);
                $("#"+barId).jFloat($("#"+_id).jFloat());
            }
            if(!$.jDomExist(barId, "fl")){
                $("#"+barId).append('<div class="fl"></div>');
            }
            //渲染表格自定义列区域
            if(!$.jDomExist(operId)){
                $("#"+barId+" .fl:eq(0)").append('<div id="'+operId+'" class="fl"></div>');
                if($("#"+operId).prev().length>0){
                    $("#"+operId).addClass("ml10");
                }
            }
            buf = [];
            buf.push('<a class="btn bulkUpd mr10" href="javascript:void(0);"><i> </i>');
            buf.push('<span>批量修改</span>');
            buf.push('</a>');
            buf.push('<a class="btn bulkSave mr10" href="javascript:void(0);"><i> </i>');
            buf.push('<span>批量保存</span>');
            buf.push('</a>');
            $("#"+operId).append(buf.join(""));
            $("#"+operId).find("a.bulkSave").eq(0).hide();

            var updIdx = [],c = 0;
            /**
             * 选定表格行的批量修改操作功能
             */
            $("#"+operId).find("a.bulkUpd").eq(0).unbind("click").click(function(){
                var $m = $(this),$s = $("#"+operId).find("a.bulkSave").eq(0);
                if($('#'+_id+'  .fcheckbox.f-checked').length==0){
                    B$.T.warn("请选择需要修改的表格行.");
                    return;
                }
                $m.hide();
                $s.show();
                //修改模式启动
                inModify = true,updIdx = [];
                for(var i in _plugin.bulkUpdate.item){
                    c = 0;
                    $("#"+_id+" th").each(function(){
                        if(_plugin.bulkUpdate.item[i]==$(this).find("label").eq(0).jName().replace("Th","")){
                            //数据的列下标+1（复选占1列）
                            updIdx.push({id: _plugin.bulkUpdate.item[i],col: c});
                        }
                        c++;
                    });
                }
                for(var i in updIdx){
                    $('#'+_id+'  td .rowcheck.fcheckbox.f-checked').closest("tr").each(function(){
                        $('td:eq('+updIdx[i].col+')', $(this)).each(function(){
                            $(this).addClass("editable").html('<input type="text" value="'+($(this).text().isNumber()?$(this).text().replace(/,/g,""):$(this).text())+'">');
                        });
                    });
                }

                //全选复选框勾选功能
                $('#'+_id+" th .fcheckbox").die("click").live("click",function(){
                    $(this).toggleClass("f-checked");
                    if($(this).is(".f-checked")){
                        if(inModify){
                            //判断当前行是否选中，批量修改模式下可以随意切换当前行的模式
                            for(var i in updIdx){
                                $('#'+_id+'  td .rowcheck.fcheckbox').not(".f-checked").closest("tr").each(function(){
                                    $('td:eq('+updIdx[i].col+')', $(this)).each(function(){
                                        $(this).addClass("editable").html('<input type="text" value="'+($(this).text().isNumber()?$(this).text().replace(/,/g,""):$(this).text())+'">');
                                    });
                                });
                            }
                        }
                        $('#'+_id+" td .rowcheck.fcheckbox").addClass("f-checked");
                    }else{
                        if(inModify){
                            for(var i in updIdx){
                                $('#'+_id+'  td .rowcheck.fcheckbox.f-checked').closest("tr").each(function(){
                                    $('td:eq('+updIdx[i].col+')', $(this)).each(function(){
                                        $(this).removeClass("editable").html($(this).find("input").eq(0).val());
                                    });
                                });
                            }
                        }
                        $('#'+_id+" td .rowcheck.fcheckbox").removeClass("f-checked");
                        if(inModify){
                            //判断是否取消所有行选择，则批量保存按钮还原为批量修改
                            if($('#'+_id+' td .rowcheck.fcheckbox.f-checked').length==0){
                                //修改模式关闭
                                inModify = false;
                                $m.show();
                                $s.hide();
                            }
                        }
                    }
                });
                //行复选框勾选功能
                $('#'+_id+'  td .rowcheck.fcheckbox').die("click").live("click",function(){
                    $(this).toggleClass("f-checked");
                    //如果行复选全部选中，则全选也选中；反之，则全选未选中
                    if($('#'+_id+" td .rowcheck.fcheckbox").not(".f-checked").length>0){
                        $('#'+_id+" th .fcheckbox").removeClass("f-checked");
                    }else{
                        $('#'+_id+" th .fcheckbox").addClass("f-checked");
                    }
                    if(inModify){
                        //判断当前行是否选中，批量修改模式下可以随意切换当前行的模式
                        if($(this).is(".f-checked")){
                            for(var i in updIdx){
                                $(this).closest("tr").each(function(){
                                    $('td:eq('+updIdx[i].col+')', $(this)).each(function(){
                                        $(this).addClass("editable").html('<input type="text" value="'+($(this).text().isNumber()?$(this).text().replace(/,/g,""):$(this).text())+'">');
                                    });
                                });
                            }
                        }else{
                            for(var i in updIdx){
                                $(this).closest("tr").each(function(){
                                    $('td:eq('+updIdx[i].col+')', $(this)).each(function(){
                                        $(this).removeClass("editable").html($(this).find("input").eq(0).val());
                                    });
                                });
                            }
                            //判断是否取消所有行选择，则批量保存按钮还原为批量修改
                            if($('#'+_id+' td .rowcheck.fcheckbox.f-checked').length==0){
                                //修改模式关闭
                                inModify = false;
                                $m.show();
                                $s.hide();
                            }
                        }
                    }
                });
            });

            /**
             * 批量保存操作功能
             */
            $("#"+operId).find("a.bulkSave").eq(0).unbind("click").click(function(){
                var colVal = [];
                if(!_plugin.bulkUpdate.param){
                    _plugin.bulkUpdate.param = {};
                }
                if(!!_plugin.rowCheck.item){
                    for(var i in _plugin.rowCheck.item){
                        colVal = [];
                        //主键值参数设置
                        $('#'+_id+' td .rowcheck.fcheckbox.f-checked').closest("tr").each(function(){
                            colVal.push($(this).find("input").eq(0).attr("val").split(",")[i]);
                        });
                        _plugin.bulkUpdate.param["filter."+_plugin.rowCheck.item[i]] = colVal.join();
                    }
                }
                //修改值参数设置
                for(var i in updIdx){
                    colVal = [];
                    $('#'+_id+'  td .rowcheck.fcheckbox.f-checked').closest("tr").each(function(){
                        colVal.push($('td:eq('+updIdx[i].col+')', $(this)).find("input").val());
                        _plugin.bulkUpdate.param["filter."+updIdx[i].id] = colVal.join();
                    });
                }
                //提交更改后的数值
                I$.submit(A$.getMappingAction()[_plugin.bulkUpdate.action], _plugin.bulkUpdate.param, function(_rlt){
                    I$.clrAdapterCache(_id, A$);
                    I$.init([_id]);
                    I$.run(A$);

                    B$.T.success("批量修改成功.")
                },false);
            });
        },
        /**
         * 增加批量删除按钮
         * @param _id
         */
        bulkDeleteAdd: function(_id, _plugin){
            var buf = [], barId = _id+"Bar",operId = _id+"BarOper",non = [];
            $('#'+barId+" .fl:eq(0)").find(".bulkDel").remove();
            //如果工具条不存在，渲染工具条区域
            if(!$.jDomExist(barId)){
                buf.push('<div class="ctrl-con mb10" id="'+barId+'"></div>');
                $(buf.join("")).insertBefore($("#"+_id));

                $("#"+barId).jWidth($("#"+_id)[0].style.width);
                $("#"+barId).jFloat($("#"+_id).jFloat());
            }
            if(!$.jDomExist(barId, "fl")){
                $("#"+barId).append('<div class="fl"></div>');
            }
            //渲染表格自定义列区域
            if(!$.jDomExist(operId)){
                $("#"+barId+" .fl:eq(0)").append('<div id="'+operId+'" class="fl"></div>');
                if($("#"+operId).prev().length>0){
                    $("#"+operId).addClass("ml10");
                }
            }
            buf = [];
            buf.push('<a class="btn bulkDel mr10" href="javascript:void(0);"><i> </i>');
            buf.push('<span>批量删除</span>');
            buf.push('</a>');
            $("#"+operId).append(buf.join(""));

            /**
             * 增加删除扩展的自定义的列值
             * @type {number}
             */
            var c = 0, delIdx = [];
            if(!!_plugin.bulkDelete.item){
                for(var i in _plugin.bulkDelete.item){
                    c = 0;
                    $("#"+_id+" th").each(function(){
                        if(_plugin.bulkDelete.item[i]==$(this).find("label").eq(0).jName().replace("Th","")){
                            //数据的列下标+1（复选占1列）
                            delIdx.push({id: _plugin.bulkDelete.item[i],col: c});
                        }
                        c++;
                    });
                }
            }
            $("#"+operId).find("a.bulkDel").eq(0).unbind("click").click(function(){
                if(B$.T.confirm("确定要执行批量删除吗?",function(){
                    var colVal = [];
                    if(!_plugin.bulkDelete.param){
                        _plugin.bulkDelete.param = {};
                    }
                    if(!!_plugin.rowCheck.item){
                        for(var i in _plugin.rowCheck.item){
                            colVal = [];
                            //主键值参数设置，判断是否执行反选
                            if(!!_plugin.bulkDelete.checkReversed){
                                $('#'+_id+' td .rowcheck.fcheckbox:not(.f-checked)').closest("tr").each(function(){
                                    colVal.push($(this).find("input").eq(0).attr("val").split(",")[i]);
                                });
                            }else{
                                $('#'+_id+' td .rowcheck.fcheckbox.f-checked').closest("tr").each(function(){
                                    colVal.push($(this).find("input").eq(0).attr("val").split(",")[i]);
                                });
                            }
                            _plugin.bulkDelete.param["filter."+_plugin.rowCheck.item[i]] = colVal.join();
                        }
                    }

                    for(var i in delIdx){
                        colVal = [];
                        //主键值参数设置，判断是否执行反选
                        if(!!_plugin.bulkDelete.checkReversed){
                            $('#'+_id+' td .rowcheck.fcheckbox:not(.f-checked)').closest("tr").each(function(){
                                colVal.push($(this).find("td").eq(delIdx[i].col).text().replace(/,/g,""));
                            });
                        }else{
                            $('#'+_id+' td .rowcheck.fcheckbox.f-checked').closest("tr").each(function(){
                                colVal.push($(this).find("td").eq(delIdx[i].col).text().replace(/,/g,""));
                            });
                        }
                        _plugin.bulkDelete.param["filter."+_plugin.bulkDelete.item[i]] = colVal.join();
                    }
                    I$.submit(A$.getMappingAction()[_plugin.bulkDelete.action], _plugin.bulkDelete.param, function(_rlt){
                        I$.clrAdapterCache(_id, A$);
                        I$.init([_id]);
                        I$.run(A$);

                        B$.T.success("批量删除成功.");
                    },false);
                }));
            });
        },
        customBulkAdd: function(_id, _plugin){
            var buf = [], barId = _id+"Bar",operId = _id+"BarOper",non = [], inModify = false;
            $('#'+barId+" .fl:eq(0)").find(".custom").each(function(){
                $(this).remove();
            });
            //如果工具条不存在，渲染工具条区域
            if(!$.jDomExist(barId)){
                buf.push('<div class="ctrl-con mb10" id="'+barId+'"></div>');
                $(buf.join("")).insertBefore($("#"+_id));

                $("#"+barId).jWidth($("#"+_id)[0].style.width);
                $("#"+barId).jFloat($("#"+_id).jFloat());
            }
            if(!$.jDomExist(barId, "fl")){
                $("#"+barId).append('<div class="fl"></div>');
            }
            //渲染表格自定义列区域
            if(!$.jDomExist(operId)){
                $("#"+barId+" .fl:eq(0)").append('<div id="'+operId+'" class="fl"></div>');
                if($("#"+operId).prev().length>0){
                    $("#"+operId).addClass("ml10");
                }
            }
            for(var key in _plugin.customBulk){
                buf = [];
                buf.push('<a class="btn custom mr10" href="javascript:void(0);" onclick="'+_plugin.customBulk[key].event+'()">');
                buf.push('<span>'+_plugin.customBulk[key].label+'</span>');
                buf.push('</a>');
                $("#"+operId).append(buf.join(""));
            }
        }
    };
    _render.dynamicByArray = function(_id, _name, _plugin, _dataset, _layout, _preview){
        dth = _dataset.getData(C$.DATASET_TH),dtb = _dataset.getData(C$.DATASET_TB),dis = _dataset.getData(C$.DATASET_TDI);
        var th = [],tb = [], forbidIdx = {}, picIdx = {}, picCol = {};
        /**
         * 数据核心区列名
         */
        for(var i in dis){
            if(!dis[i][C$.DATAITEM_FORBID]){
                if(!!dis[i][C$.DATAITEM_PIC]){
                    picIdx[dis[i][C$.RESULT_ID]] = i;
                }
                if(!!dis[i][C$.RESULT_DES]&&dis[i][C$.RESULT_DES]!=""){
                    th.push({"sTitle": '<span class="questionItem" onmouseout="tipsHide()" onmouseover="tipsShow(this)"><a>'+dis[i][C$.RESULT_DES]+'</a></span><label name="'+dis[i][C$.RESULT_ID]+'Th">'+dis[i][C$.RESULT_VAL]+'</label>', "bSortable": (_plugin.bSort&&dis[i][C$.DATAITEM_SORTABLE])?true:false, "sType": (dis[i][C$.RESULT_TYPE]!=C$.DATATYPE_STRING?"numeric-comma":"string-case")});
                }else{
                    th.push({"sTitle": '<label name="'+dis[i][C$.RESULT_ID]+'Th">'+dis[i][C$.RESULT_VAL]+'</label>', "bSortable": (_plugin.bSort&&dis[i][C$.DATAITEM_SORTABLE])?true:false, "sType": (dis[i][C$.RESULT_TYPE]!=C$.DATATYPE_STRING?"numeric-comma":"string-case")});
                }
            }else{
                delete dth[dis[i][C$.RESULT_ID]];
                forbidIdx[dis[i][C$.RESULT_ID]] = i;
            }
        }
        //表格数据区筛选数据
        tb = !!dtb?_$.jClone(dtb):[];
        /**
         * 筛选出编号转图片的列
         */
        for(var key in picIdx){
            picCol[key] = [];
            for(var r in tb){
                picCol[key].push(tb[r].splice(picIdx[key], 1, '<img class="dtlPic pic'+tb[r][picIdx[key]]+'" src="'+B$.constants.Path.ERRORPIC+'" />')[0]);
                /*//135836,135837,135838
                 picCol[key].push(135838);
                 tb[r].splice(picIdx[key], 1, '<img class="dtlPic pic'+135838+'" />');*/
            }
        }
        if(!!_plugin.dynamic.bHead){
            var increment = !!dtb?dtb.length:0, curSize = B$.tables[_id].fnGetData().length;
            if((Number(curSize)+Number(increment))>_plugin.dynamic.recordMax){
                for(var i=curSize-1;i>(_plugin.dynamic.recordMax-increment-1);i--){
                    B$.tables[_id].fnDeleteRow(i);
                }
            }
            B$.tables[_id].fnInfixData(dtb);
        }else{
            var increment = !!dtb?dtb.length:0, curSize = B$.tables[_id].fnGetData().length;
            if((Number(curSize)+Number(increment))>_plugin.dynamic.recordMax){
                for(var i=0;i<(_plugin.dynamic.recordMax-curSize);i++){
                    B$.tables[_id].fnDeleteRow(i);
                }
            }
            B$.tables[_id].fnAddData(dtb[0]);
        }
        /**
         * 异步渲染编号数据转换成的图片
         */
        var imgRender;
        for(var key in picCol){
            imgRender = function(_cache){
                for(var i in picCol[key]){
                    $(".pic"+picCol[key][i]).attr("src", _cache[picCol[key][i]]);
                }
            };
            loadPic(picCol[key], picCol[key].length, imgRender);
        }
    }
    return _render;
})(jQuery, tblRender||{});

/**
 * 图渲染器。使用HighChart插件
 */
var chartRender = (function(_$, _render){
    _render.exec = function(_id, _name, _dataset, _plugin, _dataItem, _layout, _preview){
        _$("#"+_id).css({"border": "1px solid #D4D4D4"});
        _$("#"+_id).html('<div id="'+_id+'Chart"'+(!!_plugin.height?' style="height:'+_plugin.height+'px"':'')+'></div>');
        //判断图类型是不是饼图
        if(_plugin.type!="pie"){
            var dcategories = _dataset.getData(C$.DATASET_CATEGORIES), dseries = _dataset.getData(C$.DATASET_SERIES), dis = _dataset.getData(C$.DATASET_CDI_Y), curDate = I$.getDateCache();
            var categories = [],xFormat;
            if(_dataItem.x){
                for(var id in _dataItem.x){
                    xFormat = _dataItem.x[id].formatter;
                    break;
                }
            }
            if(xFormat){
                if(!!_dataItem&&!!_dataItem.x&&!!_dataItem.x[C$.ZBID_TIMESEG]){
                    //如果日期为天，如2012-05-31
                    if(curDate.length==10){
                        for(var i in dcategories){
                            categories.push(_$.jZeroFill(dcategories[i])+'时-'+_$.jZeroFill(dcategories[i]+1)+'时');
                        }
                    }else if(curDate.length==8){
                        //如果日期中包含99，则为周，如20129918
                        if(curDate.indexOf(B$.constants.PREFIX_WEEK)>=0){
                            for(var i in dcategories){

                            }
                        }else{
                            //TODO
                        }
                    }else if(curDate.length==6){
                        //如果日期为月，如2012-06
                    }
                }else{
                    for(var i in dcategories){
                        categories.push(xFormat(dcategories[i]));
                    }
                }
            }else{
                categories = dcategories;
            }
            var series = [],plotLines = [], c = 0;


            if(!!_plugin.twoYAxis){//左右Y轴
            	for(var name in dseries){
            		c = 0;
            		for(var i in dis){
            			if(name==dis[i][C$.RESULT_VAL]){
            				if(!!_dataItem.y[dis[i][C$.RESULT_ID]].yAxis){//dataItem里配置了yAxis:true,显示右边轴
                                if(typeof(_dataItem.y[dis[i][C$.RESULT_ID]].yAxis)=="boolean"){
                                    series.push({name: name, data: dseries[name], yAxis:1,color: B$.constants.Color.P[c]});
                                }else{
                                    series.push({name: name, data: dseries[name], yAxis:_dataItem.y[dis[i][C$.RESULT_ID]].yAxis,color: B$.constants.Color.P[c]});
                                }

            				}else{
            					series.push({name: name, data: dseries[name], color: B$.constants.Color.P[c]});
            				}
            			}
            			c++;
            		}
            	}

            	//区域图判断是否分层
	            var plotOptions = {
	                line:{
	                    lineWidth:!!_plugin.lineWidth ? _plugin.lineWidth:2
	                },
	                series:{
	                    marker:{
	                        radius:!!_plugin.seriesRadius ? _plugin.seriesRadius:4
	                    }
	                },
	                column:{
	                    pointWidth:!!_plugin.columnWidth ? _plugin.columnWidth:15,
	                    pointPadding:!!_plugin.columnPadding ? _plugin.columnPadding:0.05
	                },
	                bar:{
	                    pointWidth:!!_plugin.columnWidth ? _plugin.columnWidth:15,
	                    pointPadding:!!_plugin.columnPadding ? _plugin.columnPadding:0.05
	                },
                    areaspline: {
                        fillOpacity: 0.2
                    }
	            };
	            if(_plugin.type=="areaCake"){
	                _$.extend(plotOptions,{
	                    area: {
	                        stacking: 'percent',
	                        lineColor: '#ffffff',
	                        lineWidth: 1,
	                        marker: {
	                            lineWidth: 1,
	                            lineColor: '#ffffff'
	                        }
	                    }
	                });
	            }
	            if(_plugin.plotOptions != undefined){
	            	_$.extend(plotOptions,
	            		_plugin.plotOptions
	                );
	            }
	            var chart = new Highcharts.Chart({
	                chart: {
	                    renderTo: _id+"Chart",
	                    type: _plugin.type=="areaCake"?"area":_plugin.type,
	                    zoomType: _plugin.zoom?_plugin.zoom:"xy",
                		backgroundColor: '#fafafa',
                		borderRadius: 0,
                		plotBorderColor: '#CCCCCC',
						plotBorderWidth: 1,
	                    plotBackgroundImage : _plugin.watermark
	                    ,width: _plugin.width<1?_$.jRoundVal(document.documentElement.clientWidth*_plugin.width*0.99, 0):_plugin.width*0.99
	                },
	                title: {
	                    text: _plugin.title+(!!_plugin.noSubHead?"":(' '+curDate)),
	                    x: -20,
	                    style : {
	                		color: '#656565',
	                        font: 'bold 14px 微软雅黑'
	                    }
	                },
	                subtitle: {
	                    text: "",
	                    x: -20
	                },
	                xAxis: {
	                	lineWidth: 0,
	                    labels : {
	                    	enabled: (_plugin.xLabelEnabled==undefined)||!!_plugin.xLabelEnabled,
	                        rotation : _plugin.rotation,
	                        align : !!_plugin.xalign?_plugin.xalign:"right",
	                        style : {
	                            font : 'normal 13px Verdana, sans-serif'
	                        },
	                        formatter:!!_plugin.xAxis_label_formatter?_plugin.xAxis_label_formatter:null,
	                        step:_plugin.xLabelStep?_plugin.xLabelStep:null
	                    },
	                    tickInterval:_plugin.tickInterval,
	                    //tickPixelInterval: _plugin.xtickPixelInterval,
	                    tickmarkPlacement:_plugin.tickmarkPlacement,
	                    categories: categories,
	                    opposite: _plugin.opposite.x,
	                    reversed: _plugin.reversed.x
	                },
	                yAxis: [{
	                	gridLineColor: '#dddddd',
	                    max: _plugin.maxVal?_plugin.maxVal:null,
	                	min : _plugin.min?0:($.type(_plugin.minVal)==='number'?_plugin.minVal:null),
	        			tickInterval: !!_plugin.yTickInterval ? _plugin.yTickInterval : null,
	                    title: {
	                        text: ""
	                    },
	                    plotLines: plotLines,
	                    labels : {
	                    	style : {
	                            font : 'normal 13px Verdana, sans-serif'
	                        },
	                        formatter : function() {
	                    		if(!!_plugin.yDataType){
	                    			if(_plugin.yDataType[0]==C$.DATATYPE_DOUBLE){
	                    				return _$.jFormatVal(this.value*100,C$.DATATYPE_DOUBLE,0)+'%';
	                    			}
	                    		}
	                    		if(!!_plugin.yDecimalLength){
	                    			return this.value.toFixed(_plugin.yDecimalLength);
	                    		}
	                            return this.value;
	                        }
	                    },
	                    opposite: _plugin.opposite.y,
	                    reversed: _plugin.reversed.y,
	                    tickPixelInterval : _plugin.pixelInterval
	                },{
	                	gridLineColor: '#dddddd',
	                	max: _plugin.maxVal?_plugin.maxVal:null,
	                	min : _plugin.min?0:($.type(_plugin.minVal)==='number'?_plugin.minVal:null),
	        			tickInterval: !!_plugin.yTickInterval ? _plugin.yTickInterval : null,
	                    title: {
	                        text: ""
	                    },
	                    plotLines: plotLines,
	                    labels : {
	                    	style : {
	                            font : 'normal 13px Verdana, sans-serif'
	                        },
	                        formatter : function() {
	                    		if(!!_plugin.yDataType){
	                    			if(_plugin.yDataType[1]==C$.DATATYPE_DOUBLE){
	                    				return _$.jFormatVal(this.value*100,C$.DATATYPE_DOUBLE,0)+'%';
	                    			}
	                    		}
	                    		if(!!_plugin.yDecimalLength){
	                    			return this.value.toFixed(_plugin.yDecimalLength);
	                    		}
	                            return this.value;
	                        }
	                    },
	                    opposite: true,
	                    reversed: _plugin.reversed.y,
	                    tickPixelInterval : _plugin.pixelInterval
	                }],
	                plotOptions: plotOptions,
	                tooltip : {
	                    formatter :  function(){
	                        var formatter = (_plugin.tooltip||{}).formatter;
	                        if((_plugin.tooltip||{}).formatter){
	                            return formatter(this, _dataItem, dis);
	                        }else{
	                            var label = "";
	                            if(!!_dataItem&&!!_dataItem.x){
	                                for(var key in _dataItem.x){
	                                    label += !!_dataItem.x[key]?('<span style="color:#F00">'+_dataItem.x[key].name+':&nbsp;</span>'):"";
	                                    break;
	                                }
	                            }
	                            label += '<span style="color:#F00">'+this.x+'</span>';
	                            _$.each(this.points, function(i, point) {
	                                for(var i in dis){
	                                   if(dis[i][C$.RESULT_VAL]==point.series.name){
	                                       label += '<br/><span style="color:' + point.series.color + '">'
	                                           + point.series.name + ': </span>';
	                                       if(_plugin.tipPercent){
	                                           if(_$.jIsArray(_plugin.tipPercent)&&_plugin.tipPercent[0]){
	                                               label += "<b>" + _$.jFormatVal(point.percentage/100,C$.DATATYPE_PERCENT,_plugin.tipPercent[1]?_plugin.tipPercent[1]:2) + '</b>';
	                                           }else{
	                                               label += "<b>" + _$.jFormatVal(point.percentage/100,C$.DATATYPE_PERCENT,2) + '</b>';
	                                           }
	                                       }else{
	                                           label += "<b>" + _$.jFormatVal(point.y,dis[i][C$.RESULT_TYPE],dis[i][C$.RESULT_DEC]) + '</b>';
	                                       }
	                                       break;
	                                   }
	                                }
	                            });
	                            return label;
	                        }
	                    },
	                    crosshairs: true,
	                    shared: true,
	                    useHTML: true
	                },
	                legend: {
	                    enabled: !!_plugin.bCutline?true:false,
	                    layout: 'vertical',
	                    align: 'right',
	                    verticalAlign: 'top',
	                    x: -10,
	                    y: 100,
	                    borderWidth: 0
	                },
	                series: series
	            });

            }else{
	            for(var name in dseries){
	                c = 0;
	                for(var i in dis){
	                    //数据展示装潢
	                    if(name==dis[i][C$.RESULT_VAL]){
	                        series.push({name: name, data: dseries[name], color: B$.constants.Color.P[c]});
	                        //平均线构造装潢
	                        if(_plugin.legend&&_plugin.legend.meanLine&&dis[i][C$.DATAITEM_MEANLINE]){
	                            if(dseries[name].length>0){
	                                var tmpTotal = 0, tmpAvg = 0;
	                                for(var j in dseries[name]){
	                                    tmpTotal += Number(dseries[name][j]);
	                                }
	                                //tmpAvg = _$.jRoundVal(tmpTotal/dseries[name].length, dis[i][C$.RESULT_DEC]);
	                                var showTmpAvg = "";
	                                if(typeof(currentSelZB) != "undefined" && currentSelZB == "ConvertRate"){
	                                	tmpAvg = _$.jRoundVal(tmpTotal/dseries[name].length, 4);//平均值精确到4位小数
	                                	showTmpAvg = _$.jFormatVal(_$.jRoundVal(tmpTotal/dseries[name].length, 4)*100,C$.DATATYPE_DOUBLE,2)+'%';
	                                } else{
	                                	tmpAvg = _$.jRoundVal(tmpTotal/dseries[name].length, 2);//平均值精确到2位小数
	                                	showTmpAvg = tmpAvg;
	                                }
	                                plotLines.push({
	                                     id: "MeanLine"+dis[i][C$.RESULT_ID]
	                                    ,value: tmpAvg
	                                    , color: B$.constants.Color.P[c]
	                                    , dashStyle: _plugin.legend.meanLine.lineStyle?_plugin.legend.meanLine.lineStyle:"dash"
	                                    , width: _plugin.legend.meanLine.lineWidth?_plugin.legend.meanLine.lineWidth:"1"
	                                    , label: {
	                                        text: dis[i][C$.RESULT_VAL]+"-平均值: "+showTmpAvg,
	                                        align: C$.ALIGN_PLOTLINE_LBL[c%C$.ALIGN_PLOTLINE_LBL.length],
	                                        style: {
	                                            color: B$.constants.Color.P[c]
	                                        }
	                                    }
	                                });
	                                B$.cache.set("meanLine", plotLines, _id);
	                            }
	                        }
	                    }
	                    c++;
	                }
	            }

	            //区域图判断是否分层
	            var plotOptions = {
	                line:{
	                    lineWidth:!!_plugin.lineWidth ? _plugin.lineWidth:2
	                },
	                series:{
	                    marker:{
	                        radius:!!_plugin.seriesRadius ? _plugin.seriesRadius:4
	                    }
	                },
	                column:{
	                    pointWidth:!!_plugin.columnWidth ? _plugin.columnWidth:15,
	                    pointPadding:!!_plugin.columnPadding ? _plugin.columnPadding:0.05
	                },
	                bar:{
	                    pointWidth:!!_plugin.columnWidth ? _plugin.columnWidth:15,
	                    pointPadding:!!_plugin.columnPadding ? _plugin.columnPadding:0.05
	                },
                    areaspline: {
                        fillOpacity: 0.2
                    }
	            };
	            if(_plugin.type=="areaCake"){
	                _$.extend(plotOptions,{
	                    area: {
	                        stacking: 'percent',
	                        lineColor: '#ffffff',
	                        lineWidth: 1,
	                        marker: {
	                            lineWidth: 1,
	                            lineColor: '#ffffff'
	                        }
	                    }
	                });
	            }
	            if(_plugin.plotOptions != undefined){
	            	_$.extend(plotOptions,
	            		_plugin.plotOptions
	                );
	            }

	            var chart = new Highcharts.Chart({
	                chart: {
	                    renderTo: _id+"Chart",
	                    type: _plugin.type=="areaCake"?"area":_plugin.type,
	                    zoomType: _plugin.zoom?_plugin.zoom:"xy",
                		borderRadius: 0,
                		backgroundColor: '#fafafa',
                		plotBorderColor: '#CCCCCC',
						plotBorderWidth: 1,
	                    plotBackgroundImage : _plugin.watermark
	                    ,width: _plugin.width<1?_$.jRoundVal(document.documentElement.clientWidth*_plugin.width*0.99, 0):_plugin.width*0.99
	                },
	                title: {
	                    text: _plugin.title+(!!_plugin.noSubHead?"":(' '+curDate)),
	                    x: -20,
	                    style : {
	                		color: '#656565',
	                        font: 'bold 14px 微软雅黑'
	                    }
	                },
	                subtitle: {
	                    text: "",
	                    x: -20
	                },
	                xAxis: {
	                	lineWidth: 0,
	                    labels : {
	                    	enabled: (_plugin.xLabelEnabled==undefined)||!!_plugin.xLabelEnabled,
	                        rotation : _plugin.rotation,
	                        align : !!_plugin.xalign?_plugin.xalign:"right",
	                        style : {
	                            font : 'normal 13px Verdana, sans-serif'
	                        },
	                        formatter:!!_plugin.xAxis_label_formatter?_plugin.xAxis_label_formatter:null,
	                        step:_plugin.xLabelStep?_plugin.xLabelStep:null
	                    },
	                    tickInterval:_plugin.tickInterval,
	                    //tickPixelInterval: _plugin.xtickPixelInterval,
	                    tickmarkPlacement:_plugin.tickmarkPlacement,
	                    categories: categories,
	                    opposite: _plugin.opposite.x,
	                    reversed: _plugin.reversed.x
	                },
	                yAxis: {
	                	gridLineColor: '#dddddd',
	                	//alternateGridColor: 'rgba(247,247,247, .6)',
	                    max: _plugin.maxVal?_plugin.maxVal:null,
	                	min : _plugin.min?0:($.type(_plugin.minVal)==='number'?_plugin.minVal:null),
	        			tickInterval: !!_plugin.yTickInterval ? _plugin.yTickInterval : null,
	                    title: {
	                        text: ""
	                    },
	                    plotLines: plotLines,
	                    labels : {
	                    	style : {
	                            font : 'normal 13px Verdana, sans-serif'
	                        },
	                        rotation: _plugin.rotationy?_plugin.rotationy:null,
	                        formatter : function() {
	                        	if (typeof(currentSelZB) != "undefined" && currentSelZB == 'ConvertRate') {//针对无线端关键词分析转化率指标显示百分比定制
	                        		return _$.jFormatVal(this.value*100,C$.DATATYPE_DOUBLE,2)+'%';
	                        	} else {
	                        		if(!!_plugin.yDataType){
		                    			if(_plugin.yDataType==C$.DATATYPE_DOUBLE){
		                    				return _$.jFormatVal(this.value*100,C$.DATATYPE_DOUBLE)+'%';
		                    			}
		                    		}
	                        	}
	                    		if(!!_plugin.yDecimalLength){
	                    			return this.value.toFixed(_plugin.yDecimalLength);
	                    		}
	                            return this.value;
	                        }
	                    },
	                    opposite: _plugin.opposite.y,
	                    reversed: _plugin.reversed.y,
	                    tickPixelInterval : _plugin.pixelInterval
	                },
	                plotOptions: plotOptions,
	                tooltip : {
	                    formatter :  function(){
	                        var formatter = (_plugin.tooltip||{}).formatter;
	                        if((_plugin.tooltip||{}).formatter){
	                            return formatter(this, _dataItem, dis);
	                        }else{
	                            var label = "";
	                            if(!!_dataItem&&!!_dataItem.x){
	                                for(var key in _dataItem.x){
	                                    label += !!_dataItem.x[key]?('<span style="color:#F00">'+_dataItem.x[key].name+':&nbsp;</span>'):"";
	                                    break;
	                                }
	                            }
	                            label += '<span style="color:#F00">'+this.x+'</span>';
	                            _$.each(this.points, function(i, point) {
	                                for(var i in dis){
	                                   if(dis[i][C$.RESULT_VAL]==point.series.name){
	                                       label += '<br/><span style="color:' + point.series.color + '">'
	                                           + point.series.name + ': </span>';
	                                        if (typeof(currentSelZB) != "undefined" && currentSelZB == 'ConvertRate') {//针对无线端关键词分析转化率指标显示百分比定制
	                                    	   label += "<b>" + _$.jFormatVal(point.y*100,C$.DATATYPE_DOUBLE,2) + '%</b>';
		       	                        	} if (typeof(needToFormatAvgStayTime) != "undefined" && point.series.name == '平均停留时间') {//针对无线端流量来源分析平均停留时间指标定制
	                                    	   label += "<b>" + getAvgStayTimeFormat(point.y) + '</b>';
		       	                        	} else {
		       	                        		if(_plugin.tipPercent){
			                                           if(_$.jIsArray(_plugin.tipPercent)&&_plugin.tipPercent[0]){
			                                               label += "<b>" + _$.jFormatVal(point.percentage/100,C$.DATATYPE_PERCENT,_plugin.tipPercent[1]?_plugin.tipPercent[1]:2) + '</b>';
			                                           }else{
			                                               label += "<b>" + _$.jFormatVal(point.percentage/100,C$.DATATYPE_PERCENT,2) + '</b>';
			                                           }
			                                       }else{
			                                    	   if(typeof(currentSelZB) != "undefined" && currentSelZB == "OrdAmt"){//针对无线端关键词分析下单金额指标显示2位小数定制
			                                    		   label += "<b>" + _$.jFormatVal(point.y,1,2) + '</b>';
			                                    	   } else{
			                                    		   if(typeof(currentSelZB) == "undefined" || (typeof(currentSelZB) != "undefined" && currentSelZB != "ConvertRate")){
			                                    			   label += "<b>" + _$.jFormatVal(point.y,dis[i][C$.RESULT_TYPE],dis[i][C$.RESULT_DEC]) + '</b>';
			                                    		   }
			                                    	   }
			                                       }
		       	                        	}
	                                       break;
	                                   }
	                                }
	                            });
	                            return label;
	                        }
	                    },
	                    crosshairs: true,
	                    shared: true,
	                    useHTML: true
	                },
	                legend: {
	                    enabled: !!_plugin.bCutline?true:false,
	                    layout: 'vertical',
	                    align: 'right',
	                    verticalAlign: 'top',
	                    x: -10,
	                    y: 100,
	                    borderWidth: 0
	                },
	                series: series
	            });
            }
            
            //容器增加标题栏
            if(!!_name&&!!_name.bShow){
                $('#'+_id+'containerTitle').remove();
                $('<div id="'+_id+'containerTitle" class="containerTitle">'+_name.title+'</div>').insertBefore($("#"+_id));
            }
            //清除工具条
            $("#"+_id+"Bar").remove();
            //增加图例选择
            if(!!_plugin.bLegend){
                B$.charts[_id] = chart;
                B$.legendAdd(_id, _dataset.getData(C$.DATASET_CDI_Y), _plugin.legend);
            }
            //判断是否空数据
            if(!!series&&series.length==0){
                $("#"+_id).css({"position": "relative"});
                $("#"+_id).prepend("<div id='"+_id+"NoData' class='noData'><span>"+(_plugin.nodata?_plugin.nodata:C$.CN_NODATA)+"</span></div>");
                $("#"+_id+"NoData").css({"left":$("#"+_id).width()/2-$("#"+_id+"NoData").width()/2,"top": $("#"+_id).height()/2-$("#"+_id+"NoData").height()/2});
            }
            //修正top为负导致边框消失的问题
            $(".highcharts-container",$("#"+_id)).css("top","0px");
        }else{
            var xVal = _dataset.getData(C$.DATASET_CVAL_X),yVal = _dataset.getData(C$.DATASET_CVAL_Y),series = [];
            var total = 0;
            for(var i in xVal){
                 series.push({
                     name: xVal[i],
                     y: yVal[i]
                 });
                total += parseInt(yVal[i]+"");
            }
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: _id+"Chart",
                    plotBackgroundImage : _plugin.watermark
//                    plotBorderWidth: 1,
//                    plotBorderColor: '#ffffff',
//                    defaultSeriesType: 'pie',
//                    marginRight: 10,
//                    marginBottom: 10
                },
                exporting : {
                    enabled: false
                },
                title: {
                    text: _plugin.title,
                    x: -20,
                    style : {
                        color: '#656565',
                        font: 'bold 14px 微软雅黑'
                    }
                },
                subtitle: {
                    text: '',
                    x: 60
                },
                tooltip: {
                    formatter: function() {
                        return this.point.x + "<br/>" + this.y;
                    }
                },
                credits: {
                    enabled: true
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function() {
                                return _$.jFormatVal(this.y/total, 6, 2);
                            }
                        },
                        showInLegend: true
                    },
                    series: {
                        minPointLength : 3
                    }
                },
//                legend: {
//                    enabled: true,
//                    layout: 'vertical',
//                    borderColor: '#fff',
//                    align: 'center',
//                    verticalAlign: 'buttom',
//                    x: 210,
//                    y: 140,
//                    shadow: false,
//                    width : 60
//                },
                series: [{
                    type: 'pie',
                    name: _plugin.title,
                    data: series
                }]
            });
            //判断是否空数据
            if(!!series&&series.length==0){
                $("#"+_id).css({"position": "relative"});
                $("#"+_id).prepend("<div id='"+_id+"NoData' class='noData'><span>"+(_plugin.nodata?_plugin.nodata:C$.CN_NODATA)+"</span></div>");
                $("#"+_id+"NoData").css({"left":$("#"+_id).width()/2-$("#"+_id+"NoData").width()/2,"top": $("#"+_id).height()/2-$("#"+_id+"NoData").height()/2});
            }
        }
    };
    return _render;
})(jQuery, chartRender||{});
/**
 * 地图渲染器
 */
var mapRender = (function(_$, _render){
    _render.exec = function(_id, _name, _dataset, _plugin, _affect, _preview){
        var buf = [], mVal = _dataset.getData(C$.DATASET_MVAL), dis = _dataset.getData(C$.DATASET_MDI);
        var notInZbs = ["Province"];
        buf.push('<div class="btns-box" id="'+_id+'Order"></div>');
        buf.push('<div id="'+_id+'Map" class="mt5"></div>');
        _$("#"+_id).html(buf.join(""));
        $.get(C$.PATH+"/model/frame/map.jsp",{"Feature":!!_plugin.feature?"feature":""},function(data){
            $("#"+_id+"Map").html(data);
            var rArea = DataStorage.extend(SZ_AREA_ARRAY(AreaArray), dis);
            if(!!mVal&&!!mVal["Province"]&&!!mVal["Province"].value){
            	var rProvince = mVal["Province"].value;
            	DataStorage.zbItems = dis;
            	var aPovinces;
            	var p_len=rProvince.length;
            	var len = dis.length;
            	if(rProvince&&rArea){
            		for(var i=0; i<p_len; i++){
            			if(!AreaMolde[rProvince[i]]){
            				rProvince[i]=99999;
            			}
            			for(var p=0,prop,aValue; p<len; p++){
            				prop = dis[p][C$.RESULT_ID];
            				rArea[rProvince[i]].value[prop]= _$.jFormatVal(mVal[prop].value[i],dis[p][C$.RESULT_TYPE],dis[p][C$.RESULT_DEC]);
            			}
            		}
            	}
            }
            var key='156';
            DataStorage.locPut(key,rArea);
            (window.INIT_ZB_RADIO = function(arr){
                var len = arr.length;
                var template ='<a href="javascript:void(0);" id="zb_\{ID}\" class="{STYLE}" title="{DES}"><span>{VALUE}</span></a>';
                var html = '';
                for(var i=0; i<len; i++){
                	if(!arr[i].legendHide){
                		if(notInZbs.join(",").indexOf(arr[i].id)<0){
                			html+=template.replace(/\{DES\}/g, arr[i].des).replace(/\{ID\}/g, arr[i].id).replace(/\{VALUE\}/g, arr[i].value).replace(/\{STYLE\}/g, "tab");
                		}
                	}
                }
                $("#"+_id+"Order").html(html);
                $("#"+_id+"Order a").eq(0).css("margin-left","0px");
            })(dis);
            window.AreaInfo = (function(arr){
                var html = '';
                for(var i=0, len=arr.length; i<len; i++){
                    if(notInZbs.join(",").indexOf(arr[i].id)<0){
                        html+=(arr[i].value+'：<span>{'+arr[i].id+'}</span><br/>');
                    }
                }
                return '<p>'+html+'</p>';
            })(dis);

            //容器增加标题栏
            if(!!_name&&!!_name.bShow){
                $('#'+_id+'containerTitle').remove();
                $('<div id="'+_id+'containerTitle" class="containerTitle">'+_name.title+'</div>').insertBefore($("#"+_id));
            }

            $("#"+_id+"Order a").click(function(){
                $(this).siblings().removeClass('current');
                $(this).addClass('current');
                $(".areaInfo").hide();
                var zbObj = {};
                zbObj.zb = (DataStorage.zb = $(this).jId().substring('zb_'.length));
                zbObj.name = $(this).text();

                var zb = zbObj.zb;
                var result = DataStorage.getLoc();
                if(!result){
                    return;
                }
                var sum = 0;
                var region = {}, rArea = result['area'], total = 'total'+zb;
                if(!result.value[total]){
                    for(var area in rArea){
                    	sum += Number((rArea[area].value[zb]+"").replace("%","").replace(",",""));
//                        sum += (rArea[area].value[zb]+"").indexOf(".0")>=0?parseFloat(rArea[area].value[zb]):rArea[area].value[zb];
                    }
                    result.value[total] = sum;
                }else{
                    sum = result.value[total];
                }
                var value, multiple, radix = parseInt(sum/32), max = radix*(ColorRegion.length-1), color='';
                var isIE10 = navigator.appVersion.indexOf("MSIE 10.0")>=0;
                for(var i=0; i<ColorRegion.length; i++){
                    region[radix*i]=ColorRegion[i];
                }
                region[0]=ColorRegion[0];
                for(var area in rArea){
                    value = Number((rArea[area].value[zb]+"").replace("%","").replace(",",""));
                    multiple = parseInt(parseFloat(value) / radix);
                    value = radix * (isNaN(multiple)? 0: multiple);
                    color = '#' + region[value>max?max:value];
                    if(!window.ActiveXObject||isIE10){
                        $('#first_area_'+area).attr('fill',color);
                    }else{
                        var elem;
                        if(!!(elem = document.getElementById('first_area_'+area))){
                            document.getElementById('first_area_'+area).fillcolor = color;
                        }
                    }
                }
                if(!!_plugin.refTableFunc){
                	_plugin.refTableFunc();
                }
            });
            $("#"+_id+"Order a:first").click();
            
        });
    };
    return _render;
})(jQuery, mapRender||{});
/**
 * 下拉选框渲染器。使用自定义插件
 * 
 * 行业下拉二级菜单渲染器
 * json格式如下：
 *  {
		"2nd":{"value":[3,3,4,4,4]},
		"Industry":{"value":[8,15,17,20,12]},
		"2name":{"value":["服装","服装","电器","电器","电器"]},
		"IndustryName":{"value":["衬衫","裤子","洗衣机","电视机","吸尘器"]},
		length:5
	}
 */
var selRender = (function(_$, _render){
    _render.exec = function(_id, _name, _dataset, _plugin, _affect, _preview){
        var buf = [], opts = _dataset.getData(C$.FIGURE_SEL);
        if(!!_plugin.bMenu){
        	if(!!_plugin.dataset){
        		opts = _plugin.dataset;
        	}
        	buf.push('<span name="'+_plugin.name+'" id="'+_id+'_span" class="fack-select-menu mr10"   style="vertical-align:middle">');
        	buf.push('<span class="mr5">'+_plugin.text+'</span>');
        	buf.push('<input type="hidden" name="filter.secondCatagory" id="'+_id+'_secondCatagory" />');
        	buf.push('<input type="hidden" name="filter.thirdCatagory" id="'+_id+'_thirdCatagory" />');
        	buf.push('<input type="text" name="" id="'+_id+'_text" value="" readOnly/><i>&nbsp;</i>');
        	buf.push('<ul id="'+_id+'SelectMenu">');
        	
        	if( !!opts && !!opts.length && opts.length > 0){
        		var temp=0;
        		var index=0;
        		for(var i=0;i<opts.length;i++){
    				buf.push("<li class='2nd'><a href='javascript:void(0);'><span class='selectMenuValue selectMenuValue2' value='"+opts["2nd"].value[i]+"'>"+opts["2name"].value[i]+"</span></a>");
    				buf.push('<ul>');
    				temp = opts["2nd"].value[i];
    				while(temp == opts["2nd"].value[i]){
    					buf.push("<li><a href='javascript:void(0);'><span class='selectMenuValue selectMenuValue3' value='"+opts["Industry"].value[i]+"'>"+opts["IndustryName"].value[i]+"</span></a></li>");
    					i++;
    				}
    				i--;
    				buf.push('</ul>');
    				buf.push('<i class="bus-mark-pointRight"></i>');
    				buf.push("</li>");
        		}
        	}
        	buf.push('</ul>');
        	buf.push('</span>');
        	$("#"+_id).html(buf.join(""));
        	$('#'+_id+'SelectMenu').menu();
        	
        	if(!!_plugin.initQuery){//初始化置默认属性
        		//将查出来的二级类目第一条置到选择框中,三级类目默认为全部
        		if( !!opts && !!opts.length && opts.length > 0){
        			$('#'+_id+'_secondCatagory').val(opts["2nd"].value[0]);
        			$('#'+_id+'_thirdCatagory').val(999999);
        			$('#'+_id+'_text').val(opts["2name"].value[0]);
        		}else{
        			$('#'+_id+'_text').val(C$.CN_NODATA);
        			$('#'+_id+'_text').css("color","#aaa");
        		}
        		if(!!_plugin.func){
        			_plugin.func();
        		}
        	}
        	
        	//绑定事件
        	$("#"+_id+" i").live("click",function(){
        		$('#'+_id+'SelectMenu').toggle();
        	});
        	$("#"+_id+" input").live("click",function(){
        		$('#'+_id+'SelectMenu').toggle();
        	});
        	$("#"+_id+"SelectMenu").mouseleave(function(){
        		$('#'+_id+'SelectMenu').hide();
        	});
        	$("#"+_id+" a").live("click",function(){
//        		console.log($(this).find(".selectMenuValue").attr("value"));
//        		console.log($(this).find(".selectMenuValue").text());
//        		console.log($(this).parents(".2nd").find(".selectMenuValue2").attr("value"));
//        		console.log($(this).parents(".2nd").find(".selectMenuValue2").text());
        		
        		if(!!$(this).attr("aria-haspopup")){//该属性有值则是可弹出节点,无值为末节点
        			//选择二级类目，三级类目默认为999999
        			$('#'+_id+'_secondCatagory').val($(this).find(".selectMenuValue").attr("value"));
        			$('#'+_id+'_thirdCatagory').val(999999);
        			$('#'+_id+'_text').val($(this).find(".selectMenuValue2").text());
        			
        		}else{
        			$('#'+_id+'_secondCatagory').val($(this).parents(".2nd").find(".selectMenuValue2").attr("value"));
        			$('#'+_id+'_thirdCatagory').val($(this).find(".selectMenuValue").attr("value"));
        			$('#'+_id+'_text').val($(this).parents(".2nd").find(".selectMenuValue2").text()+" -> "+$(this).find(".selectMenuValue").text());
        		}
        		$('#'+_id+'SelectMenu').toggle();
        		//查询的function接口
        		if(!!_plugin.func){
        			_plugin.func();
        		}
        	});
        }else{
        	buf.push("<span class='filterLbl'>"+(!!_plugin.label?_plugin.label:"")+"</span>");
            buf.push("<input type='hidden' name='filter."+_id+"Flt' id='"+_id+"Flt' />");
            buf.push("<span class='fack-select ml10 mr10' id='"+_id+"Sel'>");
            buf.push("<span>请选择:</span>");
            buf.push("<input type='text' re='type0' name='' class='selIpt' readonly='readonly'>");
            buf.push("<i>&nbsp;</i>");
            buf.push("<ul>");
            if(!!_plugin.bFilter){
                buf.push('<li>');
                buf.push('<div id="'+_id+'List" style="width: '+(_plugin.width+60)+'px;margin-left: auto;margin-right: auto;">');
                buf.push('<table cellpadding="0" cellspacing="0" border="0" class="display" id="'+_id+'ListTbl"></table>');
                buf.push('</div>');
                buf.push('</li>');

                var th = ["1"],tb = [],row = [];
                if(_plugin.style=="checkbox"){
                    for(var id in opts){
                        row = [];
                        row.push("<span class=\"fcheckbox\"><input type=\"checkbox\" /></span><span value=\""+id+"\">"+opts[id]+"</span>");
                        tb.push(row);
                    }
                }else{
                    for(var id in opts){
                        row = [];
                        row.push('<span value="'+id+'">'+opts[id]+'</span>');
                        tb.push(row);
                    }
                }
            }else{
                if(_plugin.style=="checkbox"){
                    for(var id in opts){
                        buf.push('<li><a href="javascript:void(0);">');
                        buf.push('<span class="fcheckbox"><input type="checkbox" class="checkbox" /></span>');
                        buf.push('<span value="'+id+'">'+opts[id]+'</span>');
                        buf.push('</a></li>');
                    }
                }else{
                    for(var id in opts){
                        buf.push("<li><a href='javascript:void(0);'><span value='"+id+"'>"+opts[id]+"</span></a></li>");
                    }
                }
            }
            buf.push("</ul></span>");
            _$("#"+_id).html(buf.join(""));
            if(!!_plugin.bFilter){
                var tbl = _$('#'+_id+"ListTbl").dataTable({
                    "bFilter" : true,
                    "aoColumns": th,
                    "aaData": tb,
                    "bPaginate" : false,
                    "bInfo" : false,
                    "bSort": false
                });
                $("#"+_id+"ListTbl").css({
                    "border": "0 none"
                });
                _$("thead th",$("#"+_id+"ListTbl")).css({
                    "height": "0px",
                    "border": "0 none",
                    "padding": "0"
                });
                _$("tbody tr",$("#"+_id+"ListTbl")).css({
                    "background": "transparent"
                });
                _$("tbody td",$("#"+_id+"ListTbl")).css({
                    "text-align": "left",
                    "padding-left": "5px",
                    "color": "#3366CC",
                    "height": "20px",
                    "line-height": "20px",
                    "cursor": "pointer"
                });

                $("#"+_id+" ul").eq(0).css({
                    "padding": "5px 0"
                });
                B$.tblFilterAdd(_id+"List", tbl);
            }
            _$("#"+_id).fakeSelect({
                type: _plugin.type,
                style: _plugin.style,
                initial: !!_plugin.initial?_plugin.initial:undefined,
                width: !!_plugin.width?_plugin.width:80,
                bFilter: !!_plugin.bFilter,
                event: _plugin.event,
                bTrigger: !!_plugin.bTrigger
            });

            /**
             * 给选项增加触发事件API，与指定元素交互
             */
            _$("#"+_id+" li").click(function(){
                if(!!_affect){
                    var paramKey = "filter."+_id+"Flt",paramJson = {};
                    paramJson[paramKey] = _$(this).find("span").attr("value");
                    for(var actId in _affect){
                        _affect[actId](actId, paramJson);
                    }
                }
            });
        }
        
    };
    return _render;
})(jQuery, selRender||{});
/**
 * 日期选择渲染器。使用并改造日期插件
 */
var datePickerRender = (function(_$, _render){
    _render.exec = function(_id, _name, _plugin, _affect, _layout, _preview){
        var buf = [], bRapidInitial = false;
        
        var maxDate_temp = (!!_plugin&&!!_plugin.maxDate)?_plugin.maxDate:1;
        $.ajax({
            url : context_path+"/getMenuTime.action",
            type : "post",
            dataType : "json",
            async:false,
            data : {"menuCode":B$.menuCfg[B$.constants.Config.ID]},
            success :function(data){
            	//将缓存中的最大时间赋值给maxDate_temp
            	var result_tmp = data.result;
                if(result_tmp != null && result_tmp != ""){
                	maxDate_temp = parseInt(result_tmp);
                }
            } ,
            error :  function(XMLHttpRequest, s, errorThrown) {
            	
            }
        });
        
        buf.push("<span class='filterLbl'>"+(!!_plugin.label?_plugin.label:"")+"</span>");
        if(!!_plugin.bSeparate){
        	_plugin.maxDate = maxDate_temp;
        	
        	var filterNames = [];
        	//控件1
        	if(_plugin.bDimension){
        		if(!_plugin.dimension.bEmbed){
        			buf.push('<span id="'+_id+'Dimension0" class="dimension">');
        			buf.push("<input type='hidden' name='filter."+_id+"Flt0' id='"+_id+"Flt0' />");
        			buf.push("<span class='fack-select ml10 mr10' id='"+_id+"Sel0'>");
        			buf.push("<span>请选择:</span>");
        			buf.push("<input type='text' re='type0' name='' class='selIpt' readonly='readonly'>");
        			buf.push("<i>&nbsp;</i>");
        			buf.push("<ul>");
        			
        			var ev = function(_obj){
        				var dimension = $(_obj).find("a>span").attr("value");
        				B$.initDatePicker([_$.extend(_plugin, {Id: $(_obj).closest(".dimension").siblings(".widget").eq(0).jId(), View: dimension})]);
        			}
        			for(var i in _plugin.dimension.item){
        				buf.push("<li><a href='javascript:void(0);'><span value='"+_plugin.dimension.item[i]+"'>按"+C$.DIMENSION_DATE[_plugin.dimension.item[i]]+"查</span></a></li>");
        			}
        			buf.push("</ul></span>");
        			buf.push("</span>");
        		}
        	}
        	buf.push('<span id="'+_id+'Calendar0" class="widget">');
        	buf.push('<div class="widgetField">');
        	if(!!_plugin.filterName){
    			for(var i in _plugin.filterName){
    				filterNames.push(_plugin.filterName[i].indexOf(".")>=0?_plugin.filterName[i]:("filter."+_plugin.filterName[i]));
    			}
    			buf.push('<input id="'+_plugin.DateSeg[0]+'" type="hidden" name="'+filterNames[0]+'" />');
    			//buf.push('<input id="'+_plugin.DateSeg[1]+'" type="hidden" name="'+filterNames[1]+'" />');
    		}else{
    			buf.push('<input id="'+_plugin.DateSeg[0]+'" type="hidden" name="filter.startDate" />');
    			//buf.push('<input id="'+_plugin.DateSeg[1]+'" type="hidden" name="filter.endDate" />');
    		}
        	buf.push('<input id="'+_id+'DateSeg0" type="text" class="cursorPointer" readonly="readonly" /><a href="#"></a>');
        	buf.push('</div>');
        	buf.push('<div class="widgetCalendar">');
        	buf.push('<div class="c-box">');
        	if(!!_plugin.bNote){
    			buf.push('<div class="note">');
    			buf.push("选择整日进行查询");
    			buf.push('</div>');
    		}
        	if(_plugin.bDimension&&!!_plugin.dimension.bEmbed){
        		buf.push('<div id="'+_id+'Dimension0" class="embedDimension">');
        		buf.push('<ul>');
        		if(_plugin.View=="day"||_plugin.View=="!week"||_plugin.View=="!month"){
        			for(var i in _plugin.dimension.item){
        				buf.push('<li val="'+_plugin.dimension.item[i]+'">按'+C$.DIMENSION_DATE[_plugin.dimension.item[i]]+'查看</li>');
        			}
        		}else{
        			buf.push('<li val="'+_plugin.View+'">按'+C$.DIMENSION_DATE[_plugin.View]+'查看</li>');
        		}
        		buf.push('</ul>');
        		buf.push('</div>');
        	}
        	buf.push('<div class="Picker">');
    		buf.push('<div class="Calendar"></div>');
    		buf.push('<div class="clr"></div>');
    		buf.push('<div class="c-btn">');
    		buf.push('<span class="message warn"></span>');
    		if(!_plugin.noBtn){
    			buf.push('<a class="btn query" href="javascript:void(0);" id="query_button">确定</a>');
    			buf.push('<a class="btn cancel ml5 mr10" href="javascript:void(0);"  id="cancel_button">取消</a>');
    		}
    		buf.push('</div></div></div></div></span>');
    		
    		buf.push('<span class="ml5 mr5">至</span>');
    		
    		//控件2
    		if(_plugin.bDimension){
        		if(!_plugin.dimension.bEmbed){
        			buf.push('<span id="'+_id+'Dimension1" class="dimension">');
        			buf.push("<input type='hidden' name='filter."+_id+"Flt1' id='"+_id+"Flt1' />");
        			buf.push("<span class='fack-select ml10 mr10' id='"+_id+"Sel1'>");
        			buf.push("<span>请选择:</span>");
        			buf.push("<input type='text' re='type0' name='' class='selIpt' readonly='readonly'>");
        			buf.push("<i>&nbsp;</i>");
        			buf.push("<ul>");
        			
        			var ev = function(_obj){
        				var dimension = $(_obj).find("a>span").attr("value");
        				B$.initDatePicker([_$.extend(_plugin, {Id: $(_obj).closest(".dimension").siblings(".widget").eq(0).jId(), View: dimension})]);
        			}
        			for(var i in _plugin.dimension.item){
        				buf.push("<li><a href='javascript:void(0);'><span value='"+_plugin.dimension.item[i]+"'>按"+C$.DIMENSION_DATE[_plugin.dimension.item[i]]+"查</span></a></li>");
        			}
        			buf.push("</ul></span>");
        			buf.push("</span>");
        		}
        	}
    		buf.push('<span id="'+_id+'Calendar1" class="widget">');
        	buf.push('<div class="widgetField">');
        	if(!!_plugin.filterName){
    			//buf.push('<input id="'+_plugin.DateSeg[0]+'" type="hidden" name="'+filterNames[0]+'" />');
    			buf.push('<input id="'+_plugin.DateSeg[1]+'" type="hidden" name="'+filterNames[1]+'" />');
    		}else{
    			//buf.push('<input id="'+_plugin.DateSeg[0]+'" type="hidden" name="filter.startDate" />');
    			buf.push('<input id="'+_plugin.DateSeg[1]+'" type="hidden" name="filter.endDate" />');
    		}
        	buf.push('<input id="'+_id+'DateSeg1" type="text" class="cursorPointer" readonly="readonly" /><a href="#"></a>');
        	buf.push('</div>');
        	buf.push('<div class="widgetCalendar">');
        	buf.push('<div class="c-box">');
        	if(!!_plugin.bNote){
    			buf.push('<div class="note">');
    			buf.push("选择整日进行查询");
    			buf.push('</div>');
    		}
        	if(_plugin.bDimension&&!!_plugin.dimension.bEmbed){
        		buf.push('<div id="'+_id+'Dimension1" class="embedDimension">');
        		buf.push('<ul>');
        		if(_plugin.View=="day"||_plugin.View=="!week"||_plugin.View=="!month"){
        			for(var i in _plugin.dimension.item){
        				buf.push('<li val="'+_plugin.dimension.item[i]+'">按'+C$.DIMENSION_DATE[_plugin.dimension.item[i]]+'查看</li>');
        			}
        		}else{
        			buf.push('<li val="'+_plugin.View+'">按'+C$.DIMENSION_DATE[_plugin.View]+'查看</li>');
        		}
        		buf.push('</ul>');
        		buf.push('</div>');
        	}
        	buf.push('<div class="Picker">');
    		buf.push('<div class="Calendar"></div>');
    		buf.push('<div class="clr"></div>');
    		buf.push('<div class="c-btn">');
    		buf.push('<span class="message warn"></span>');
    		if(!_plugin.noBtn){
    			buf.push('<a class="btn" href="javascript:void(0);" id="query_button">确定</a>');
    			buf.push('<a class="btn cancel ml5 mr10" href="javascript:void(0);"  id="cancel_button">取消</a>');
    		}
    		buf.push('</div></div></div></div></span>');
    		
    		if(!!_plugin.customQuery){
    			buf.push('<span class="ml20 queryBtn"><a onclick="'+_plugin.customQuery+'()" class="btn query" href="javascript:void(0)"><i>&nbsp;</i><span>查询</span></a></span>');
    		}
    		
    		if(!!_plugin.Rapid&&(!!_plugin.rapidSel.external||!!_plugin.rapidSel.noPicker)){
    			//新快查方式
                if(_plugin.RapidType == "QuickRapid"){
                	buf.push('<span class="rapidSel ml15">');
        			buf.push('<input type="hidden" id="'+_id+'CalendarRapidSel" />');
        			buf.push('<label class="filterLbl" for="">'+(!!_plugin.rapidSel.label?_plugin.rapidSel.label:"快速查看")+'</label>');
        			var counter = 0,ref = "!month!week", today = new Date(),disabled = false, maxDate = !!_plugin.maxDate?_plugin.maxDate:1;
        			 for(var desc in _plugin.rapidSel.item){
                     	if(desc=="前一天" || desc=="后一天" || desc=="重置"){
                     		ref = "!month!week";
                     	}else if(desc=="上一周" || desc=="下一周"){
                     		ref = "week";
                     	}else{
                     		ref = "month";
                     	}
                     	if(desc=="后一天" || desc=="下一周" || desc=="下一月"){
                     		buf.push('<span style="vertical-align:middle;font-family:微软雅黑;font-size:14px;color:gray;padding-right:10px;" desc="'+desc+'_" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'">'+desc+'</span>');
                     		buf.push('<a class="rapid-a" style="vertical-align:middle;cursor:pointer;font-family:微软雅黑;font-size:14px;display:none;padding-right:10px;" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'">'+desc+'</a>');
                     	}else if(desc=="近7天"){
                     		buf.push('<span style="vertical-align:middle;font-family:微软雅黑;font-size:14px;color:gray;padding-right:10px;display:none;" desc="'+desc+'_" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'">'+desc+'</span>');
                     		buf.push('<a class="rapid-a" style="vertical-align:middle;cursor:pointer;font-family:微软雅黑;font-size:14px;padding-right:10px;" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'">'+desc+'</a>');
        			 	}else{
                     		buf.push('<a class="rapid-a" style="vertical-align:middle;cursor:pointer;font-family:微软雅黑;font-size:14px;padding-right:10px;" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'">'+desc+'</a>');
                     	}
                     }
                }else{
                	buf.push('<span class="rapidSel ml15">');
        			buf.push('<input type="hidden" id="'+_id+'CalendarRapidSel" />');
        			buf.push('<label class="filterLbl" for="">'+(!!_plugin.rapidSel.label?_plugin.rapidSel.label:"快速查看")+'</label>');
        			var counter = 0,ref = "!month!week", today = new Date(),disabled = false, maxDate = !!_plugin.maxDate?_plugin.maxDate:1;
        			for(var desc in _plugin.rapidSel.item){
        				if(desc.indexOf(C$.DIMENSION_DATE[B$.constants.DatePicker.VMONTH])>=0){
        					ref = B$.constants.DatePicker.VMONTH;
        				}else if(desc.indexOf(C$.DIMENSION_DATE[B$.constants.DatePicker.VWEEK])>=0){
        					ref = B$.constants.DatePicker.VWEEK;
        				}else{
        					ref = B$.constants.DatePicker.VODAY;
        				}
        				
        				if(desc==B$.constants.DatePicker.CURWEEK){
        					disabled = today.getDay()&&today.getDay()<=maxDate;
        					buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
        				}else if(desc==B$.constants.DatePicker.CURMONTH){
        					disabled = today.getDate()<=maxDate;
        					buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
        				}else if(desc==B$.constants.DatePicker.PREV1){
                            disabled = 2<=maxDate;
                            buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                        }else if(desc==B$.constants.DatePicker.PREV2){
                            disabled = 3<=maxDate;
                            buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                        }else if(_$.jIsArray(_plugin.rapidSel.item[desc])){
        					if(_plugin.rapidSel.item[desc][1]){
        						bRapidInitial = true;
        					}
        					buf.push('<span class="radiobox '+(!!_plugin.rapidSel.item[desc][1]?" r-checked":"")+'" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc][0]+'"><input type="radio" class="p-ib pointer ml5" id="'+_id+'rapidSel'+counter+'" name="'+_id+'RapidSel"></span><label class="mr10 ml2 p-ib pointer" style="color: #333333" for="'+_id+'rapidSel'+counter+'">'+desc+'</label>');
        				}else{
        					buf.push('<span class="radiobox" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="'+_id+'rapidSel'+counter+'" name="'+_id+'RapidSel"></span><label class="ml3 mr3 p-ib pointer" style="color: #333333" for="'+_id+'rapidSel'+counter+'">'+desc+'</label>');
        				}
        				counter++;
        			}
                }
    			buf.push('</span>');
    		}
    		
    		_$("#"+_id).html(buf.join(""));
    		//判断是否只有快查没有选择器
    		if(!!_plugin.Rapid&&!!_plugin.rapidSel.noPicker){
    			_$(".widget",_$("#"+_id)).hide();
    		}
    		
    		//判断日期是否有按维度查询
        	if(_plugin.bDimension){
        		if(!_plugin.dimension.bEmbed){
        			_$("#"+_id+"Dimension").fakeSelect({
        				type: "single",
        				style: "colorize",
        				width: 50,
        				initial: !!_plugin.Param&&!!_plugin.Param.dimension?_plugin.Param.dimension.item:"!month!week",
        						event: ev
        			});
        			//B$.initDatePicker([_$.extend(_plugin, {Id: _id+"Calendar",View: _$(".selIpt",_$("#"+_id+"Dimension")).eq(0).attr("val"),Param: !!_plugin.Param?_plugin.Param:{}})]);
        			B$.initDatePicker([_$.extend(_plugin, {Id: [_id+"Calendar0",_id+"Calendar1"],View: _$(".selIpt",_$("#"+_id+"Dimension")).eq(0).attr("val"),Param: !!_plugin.Param?_plugin.Param:{}})]);
        		}else{
        			var bParam = true;
        			B$.initDatePicker([_$.extend(_plugin, {Id: [_id+"Calendar0",_id+"Calendar1"],Param: !!_plugin.Param?_plugin.Param:{}})]);
        			bParam = false;
        			_$("ul li",_$("#"+_id+"Dimension0")).unbind('click');
        			_$("ul li",_$("#"+_id+"Dimension0")).click(function(){
        				_$(this).addClass("sel").css({"border-right": "0 none"});
        				_$(this).siblings().removeClass("sel");
        				//B$.initDatePicker([_$.extend(_plugin, {Id: _id+"Calendar",View: _$(this).attr("val"),Param: bParam&&!!_plugin.Param?_plugin.Param:{}})]);
        			});
        			_$("ul li",_$("#"+_id+"Dimension1")).unbind('click');
        			_$("ul li",_$("#"+_id+"Dimension1")).click(function(){
        				_$(this).addClass("sel").css({"border-right": "0 none"});
        				_$(this).siblings().removeClass("sel");
        				//B$.initDatePicker([_$.extend(_plugin, {Id: _id+"Calendar",View: _$(this).attr("val"),Param: bParam&&!!_plugin.Param?_plugin.Param:{}})]);
        			});
        			_$("ul li:first",_$("#"+_id+"Dimension0")).click();
        			_$("ul li:first",_$("#"+_id+"Dimension1")).click();
        		}
        	}else{
        		B$.initDatePicker([_$.extend(_plugin, {Id: [_id+"Calendar0",_id+"Calendar1"],Param: !!_plugin.Param?_plugin.Param:{}})]);
        		//B$.initDatePicker([_$.extend(_plugin, {Id: _id+"Calendar1",Param: !!_plugin.Param?_plugin.Param:{}})]);
        	}
    		
    		
    		
    		
    		//设置默认日期缓存
    		I$.setDateCache($("#"+_id+"DateSeg0").val()+" \u81F3 "+$("#"+_id+"DateSeg1").val());
    		
    		//判断初始化快查是否选中
    		if(!!_plugin.Rapid&&(!!_plugin.rapidSel.external||!!_plugin.rapidSel.noPicker)){
    			if(bRapidInitial){
    				_$(".rapidSel span.radiobox.r-checked",_$("#"+_id)).click();
    			}
    		}
    		
        }else{
        	_plugin.maxDate = maxDate_temp;
        	//判断日期维度选择是否内嵌
        	if(_plugin.bDimension){
        		if(!_plugin.dimension.bEmbed){
        			buf.push('<span id="'+_id+'Dimension" class="dimension">');
        			buf.push("<input type='hidden' name='filter."+_id+"Flt' id='"+_id+"Flt' />");
        			buf.push("<span class='fack-select ml10 mr10' id='"+_id+"Sel'>");
        			buf.push("<span>请选择:</span>");
        			buf.push("<input type='text' re='type0' name='' class='selIpt' readonly='readonly'>");
        			buf.push("<i>&nbsp;</i>");
        			buf.push("<ul>");
        			
        			var ev = function(_obj){
        				var dimension = $(_obj).find("a>span").attr("value");
        				B$.initDatePicker([_$.extend(_plugin, {Id: $(_obj).closest(".dimension").siblings(".widget").eq(0).jId(), View: dimension})]);
        			}
        			for(var i in _plugin.dimension.item){
        				buf.push("<li><a href='javascript:void(0);'><span value='"+_plugin.dimension.item[i]+"'>按"+C$.DIMENSION_DATE[_plugin.dimension.item[i]]+"查</span></a></li>");
        			}
        			buf.push("</ul></span>");
        			buf.push("</span>");
        		}
        	}
        	
        	buf.push('<span id="'+_id+'Calendar" class="widget">');
        	buf.push('<div class="widgetField">');
        	if(_plugin.DateSeg.length>1){
        		if(!!_plugin.filterName){
        			var filterNames = [];
        			for(var i in _plugin.filterName){
        				filterNames.push(_plugin.filterName[i].indexOf(".")>=0?_plugin.filterName[i]:("filter."+_plugin.filterName[i]));
        			}
        			buf.push('<input id="'+_plugin.DateSeg[0]+'" type="hidden" name="'+filterNames[0]+'" />');
        			buf.push('<input id="'+_plugin.DateSeg[1]+'" type="hidden" name="'+filterNames[1]+'" />');
        		}else{
        			buf.push('<input id="'+_plugin.DateSeg[0]+'" type="hidden" name="filter.startDate" />');
        			buf.push('<input id="'+_plugin.DateSeg[1]+'" type="hidden" name="filter.endDate" />');
        		}
        	}else{
        		if(!!_plugin.filterName){
        			buf.push('<input id="'+_plugin.DateSeg[0]+'" type="hidden" name="'+(_plugin.filterName[0].indexOf(".")>=0?_plugin.filterName[0]:("filter."+_plugin.filterName[0]))+'" />');
        		}else{
        			buf.push('<input id="'+_plugin.DateSeg[0]+'" type="hidden" name="filter.date" />');
        		}
        	}
        	buf.push('<input id="'+_id+'DateSeg" type="text" class="cursorPointer" readonly="readonly" /><a href="#"></a>');
        	buf.push('</div>');
        	buf.push('<div class="widgetCalendar">');
        	buf.push('<div class="c-box">');
        	if(!!_plugin.bNote){
        		buf.push('<div class="note">');
        		if(_plugin.Type=="single"){
        			if(_plugin.View=="!month!week"){
        				buf.push("选择整日进行查询");
        			}else if(_plugin.View=="week"){
        				buf.push("选择整周进行查询");
        			}else if(_plugin.View=="month"){
        				buf.push("选择整月进行查询");
        			}else if(_plugin.View=="day"){
        				buf.push("选择整日、整周或整月进行查询");
        			}else if(_plugin.View=="!week"){
        				buf.push("选择整日或整月进行查询");
        			}else if(_plugin.View=="!month"){
        				buf.push("选择整日或整周进行查询");
        			}
        		}else{
        			if(_plugin.View=="!month!week"){
        				buf.push("选择时间段进行查询.");
        				if(!!_plugin.Range){
        					if(_$.jIsArray(_plugin.Range)){
        						buf.push("最长选择"+_plugin.Range[1]+"天的数据");
        					}else{
        						buf.push("最长选择"+_plugin.Range+"天的数据");
        					}
        				}
        			}else if(_plugin.View=="week"){
        				buf.push("选择整周进行查询");
        			}else if(_plugin.View=="month"){
        				buf.push("选择整月进行查询");
        			}else if(_plugin.View=="day"){
        				buf.push("选择时间段、整周或整月进行查询");
        			}else if(_plugin.View=="!week"){
        				buf.push("选择时间段或整月进行查询");
        			}else if(_plugin.View=="!month"){
        				buf.push("选择时间段或整周进行查询");
        			}
        		}
        		buf.push('</div>');
        	}
        	if(!!_plugin.Rapid&&!_plugin.rapidSel.external&&!_plugin.rapidSel.noPicker){
        		buf.push('<div class="quick-chose">');
        		buf.push('<label for="">'+(!!_plugin.rapidSel.label?_plugin.rapidSel.label:"快速查看")+'</label>');
        		var today = new Date(),maxDate = !!_plugin.maxDate?_plugin.maxDate:1;
        		for(var desc in _plugin.rapidSel.item){
        			if(desc==B$.constants.DatePicker.CURWEEK){
        				if(!!today.getDay()&&today.getDay()<=maxDate){
        					continue;
        				}
        			}else if(desc==B$.constants.DatePicker.CURMONTH){
        				if(today.getDate()<=maxDate){
        					continue;
        				}
        			}
        			buf.push('<a href="javascript:void(0)" desc="'+desc+'" val="'+_plugin.rapidSel.item[desc]+'" name="'+_id+'RapidSel">'+desc+'</a>');
        		}
        		buf.push('</div>');
        	}
        	if(_plugin.bDimension&&!!_plugin.dimension.bEmbed){
        		buf.push('<div id="'+_id+'Dimension" class="embedDimension">');
        		buf.push('<ul>');
        		if(_plugin.View=="day"||_plugin.View=="!week"||_plugin.View=="!month"){
        			for(var i in _plugin.dimension.item){
        				buf.push('<li val="'+_plugin.dimension.item[i]+'">按'+C$.DIMENSION_DATE[_plugin.dimension.item[i]]+'查看</li>');
        			}
        		}else{
        			buf.push('<li val="'+_plugin.View+'">按'+C$.DIMENSION_DATE[_plugin.View]+'查看</li>');
        		}
        		buf.push('</ul>');
        		buf.push('</div>');
        	}
        	buf.push('<div class="Picker">');
        	buf.push('<div class="Calendar"></div>');
        	buf.push('<div class="clr"></div>');
        	buf.push('<div class="c-btn">');
        	buf.push('<span class="message warn"></span>');
        	if(!_plugin.noBtn){
        		buf.push('<a class="btn query" href="javascript:void(0);" id="query_button">确定</a>');
        		buf.push('<a class="btn cancel ml5 mr10" href="javascript:void(0);"  id="cancel_button">取消</a>');
        	}
        	buf.push('</div></div></div></div></span>');
        	
        	if(!!_plugin.Rapid&&(!!_plugin.rapidSel.external||!!_plugin.rapidSel.noPicker)){
        		buf.push('<span class="rapidSel ml15">');
        		buf.push('<input type="hidden" id="'+_id+'CalendarRapidSel" />');
        		buf.push('<label class="filterLbl" for="">'+(!!_plugin.rapidSel.label?_plugin.rapidSel.label:"快速查看")+'</label>');
        		var counter = 0,ref = "!month!week", today = new Date(),disabled = false, maxDate = !!_plugin.maxDate?_plugin.maxDate:1;
        		for(var desc in _plugin.rapidSel.item){
        			if(desc.indexOf(C$.DIMENSION_DATE[B$.constants.DatePicker.VMONTH])>=0){
        				ref = B$.constants.DatePicker.VMONTH;
        			}else if(desc.indexOf(C$.DIMENSION_DATE[B$.constants.DatePicker.VWEEK])>=0){
        				ref = B$.constants.DatePicker.VWEEK;
        			}else{
        				ref = B$.constants.DatePicker.VODAY;
        			}
        			
        			if(desc==B$.constants.DatePicker.CURWEEK){
        				disabled = today.getDay()&&today.getDay()<=maxDate;
        				buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
        			}else if(desc==B$.constants.DatePicker.CURMONTH){
        				disabled = today.getDate()<=maxDate;
        				buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
        			}else if(desc==B$.constants.DatePicker.PREV1){
                        disabled = 2<=maxDate;
                        buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                    }else if(desc==B$.constants.DatePicker.PREV2){
                        disabled = 3<=maxDate;
                        buf.push('<span class="radiobox'+(disabled?' r-disabled':'')+ '" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="widgetRapidSel'+counter+'" name="widgetRapidSel"></span><label class="ml3 mr3 p-ib'+(disabled?'':' pointer')+'" style="color: '+(disabled?'#999999':'#333333')+'" for="widgetRapidSel'+counter+'">'+desc+'</label>');
                    }else if(_$.jIsArray(_plugin.rapidSel.item[desc])){
        				if(_plugin.rapidSel.item[desc][1]){
        					bRapidInitial = true;
        				}
        				buf.push('<span class="radiobox '+(!!_plugin.rapidSel.item[desc][1]?" r-checked":"")+'" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc][0]+'"><input type="radio" class="p-ib pointer ml5" id="'+_id+'rapidSel'+counter+'" name="'+_id+'RapidSel"></span><label class="mr10 ml2 p-ib pointer" style="color: #333333" for="'+_id+'rapidSel'+counter+'">'+desc+'</label>');
        			}else{
        				buf.push('<span class="radiobox" desc="'+desc+'" ref="'+ref+'" val="'+_plugin.rapidSel.item[desc]+'"><input type="radio" class="p-ib pointer ml5" id="'+_id+'rapidSel'+counter+'" name="'+_id+'RapidSel"></span><label class="ml3 mr3 p-ib pointer" style="color: #333333" for="'+_id+'rapidSel'+counter+'">'+desc+'</label>');
        			}
        			counter++;
        		}
        		buf.push('</span>');
        	}
        	_$("#"+_id).html(buf.join(""));
        	//判断是否只有快查没有选择器
        	if(!!_plugin.Rapid&&!!_plugin.rapidSel.noPicker){
        		_$(".widget",_$("#"+_id)).hide();
        	}
        	
        	//判断日期是否有按维度查询
        	if(_plugin.bDimension){
        		if(!_plugin.dimension.bEmbed){
        			_$("#"+_id+"Dimension").fakeSelect({
        				type: "single",
        				style: "colorize",
        				width: 50,
        				initial: !!_plugin.Param&&!!_plugin.Param.dimension?_plugin.Param.dimension.item:"!month!week",
        						event: ev
        			});
        			B$.initDatePicker([_$.extend(_plugin, {Id: _id+"Calendar",View: _$(".selIpt",_$("#"+_id+"Dimension")).eq(0).attr("val"),Param: !!_plugin.Param?_plugin.Param:{}})]);
        		}else{
        			var bParam = true;
        			_$("ul li",_$("#"+_id+"Dimension")).unbind('click').bind('click', function(){
        				_$(this).addClass("sel").css({"border-right": "0 none"});
        				_$(this).siblings().removeClass("sel");
        				$(".datepicker",$("#"+_id+"Calendar")).remove();
                        $(".radiobox.r-checked",$("#"+_id+"Calendar").next(".rapidSel")).removeClass("r-checked");
        				B$.initDatePicker([_$.extend(_plugin, {Id: _id+"Calendar",View: _$(this).attr("val"),Param: bParam&&!!_plugin.Param?_plugin.Param:{}})]);
        				bParam = false;
        			});
        			var dimension = (_plugin.Param||{})[B$.constants.Config.DIMENSION];
        			if(dimension){
                        _$('ul li[val="'+dimension+'"]',_$("#"+_id+"Dimension")).click();
                    }else{
                        _$("ul li:first",_$("#"+_id+"Dimension")).click();
                    }
        		}
        	}else{
        		B$.initDatePicker([_$.extend(_plugin, {Id: _id+"Calendar",Param: !!_plugin.Param?_plugin.Param:{}})]);
        	}
        	//设置默认日期缓存
        	I$.setDateCache($("#"+_id+"DateSeg").val());
        	/**
        	 * 给日历增加触发事件API，与指定容器交互
        	 */
        	if(!_plugin.customQuery){
        		_$("#"+_id+" .btn.query").unbind("click");
        		_$("#"+_id+" .btn.query").click(function(){
        			if(!!_affect){
        				if(_plugin.DateSeg.length>1){
        					for(var actId in _affect){
        						_affect[actId](actId, {
        							"startTime":_$("#"+_plugin.DateSeg[0]).val().replace(/-/g,""),
        							"endTime":_$("#"+_plugin.DateSeg[1]).val().replace(/-/g,"")
        						},".switch.sel");
        					}
        				}else{
        					for(var actId in _affect){
        						_affect[actId](actId, {
        							"startTime":_$("#"+_plugin.DateSeg[0]).val().replace(/-/g,""),
        							"endTime":_$("#"+_plugin.DateSeg[0]).val().replace(/-/g,"")
        						},".switch.sel");
        					}
        				}
        			}
        		});
        	}else{
        		_$("#"+_id+" .btn.query").die("click");
        		_$("#"+_id+" .btn.query").live("click",function(){
        			I$.setDateCache($("#"+_id+"DateSeg").val());
        			if(_$.type(_plugin.customQuery)==='function'){
        				_plugin.customQuery();
        			}else if(_plugin.customQuery != "null"){
        				eval(_plugin.customQuery+"()");
        			}
        		});
        	}
        	
        	//判断初始化快查是否选中
        	if(!!_plugin.Rapid&&(!!_plugin.rapidSel.external||!!_plugin.rapidSel.noPicker)){
        		if(bRapidInitial){
        			_$(".rapidSel span.radiobox.r-checked",_$("#"+_id)).click();
        		}
        	}
        }
    };
    return _render;
})(jQuery, datePickerRender||{});
/**
 * 页签渲染器，提供页签切换功能
 */
var tabRender = (function(_$, _render){
    _render.exec = function(_id, _name, _plugin, _affect, _layout, _preview){
        var buf = [],c = 0;
        buf.push('<div class="tab cxt" id="'+_id+'Tab">');
        buf.push('<ul class="clearfix titH2">');
        for(var id in _plugin.group){
            buf.push('<li><a href="javascript:void(0)" class="'+(c==0?"selected":"")+'" be="'+id+'"><span>'+_plugin.group[id]+'</span></a></li>');
            c++;
        }
        buf.push('</ul>');
        buf.push('</div>');
        for(var id in _plugin.group){
//            buf.push('<div id="'+id+'" class="tab-con cxt" style="overflow: hidden;width: '+(_plugin.width?(_plugin.width<1?(_plugin.width*100+"%"):_plugin.width+"px"):"99%")+'">');
            buf.push('<div id="'+id+'" class="tab-con cxt" style="overflow: hidden">');
            buf.push('<div class="block fr"></div>');
            buf.push('<div class="block fl"></div>');
            buf.push('</div>');
        }
        $("#"+_id).html(buf.join(""));

        $("#"+_id).find("li>a").click(function(){
            var groupId = $(this).attr("be");
            if(!!_affect){
                for(var actId in _affect){
                    if(actId.substr(0, actId.indexOf("."))==groupId){
                        _affect[actId](actId.substr(actId.indexOf(".")+1));
                    }
                }
            }
        });

        B$.initTab({id:_id,cfg:_plugin});

        //容器增加标题栏
        if(!!_name&&!!_name.bShow){
            $('#'+_id+'containerTitle').remove();
            $('<div id="'+_id+'containerTitle" class="containerTitle">'+_name.title+'</div>').insertBefore($("#"+_id));
        }

        $("#"+_id+" li:eq(0)").find("a").click();
    };
    return _render;
})(jQuery, tabRender||{});

/**
 * 表单渲染器。使用jquery validation表单验证插件
 */
var formRender = (function(_$, _render){
    _render.exec = function(_id, _name, _plugin, _affect, _preview, _items){
        var buf = [],rule={rules:{}};
        buf.push('<form class="validateForm" id="'+_id+'_form" method="get" action="">');
        for(var index in _items){
        	buf.push('<div class="mt5">');
        	if(!!_items[index].label){
        		buf.push('<div class="form_left">');
        		buf.push('<label for="'+_id+'_'+_items[index].id+'">'+_items[index].label+'</label>');
        		buf.push('</div>');
        	}
        	var val = !!_items[index].value?_items[index].value:"";
        	switch(_items[index].type){
        		case C$.FORM_TYPE_TEXTAREA :
        			buf.push('<div class="form_right">');
        			buf.push('<textarea id="'+_id+'_'+_items[index].id+'" name="'+_items[index].name+'"></textarea>');
        			buf.push('</div>');
        			break;
        		case C$.FORM_TYPE_RADIO:
        		case C$.FORM_TYPE_CHECKBOX:
        			buf.push('<div class="form_right">');
        			for(var i in _items[index].items){
        				if(!!_items[index].items[i].label){
        	        		buf.push('<label for="'+_id+'_'+_items[index].items[i].id+'">'+_items[index].items[i].label+'</label>');
        	        	}
        				if(!!_items[index].items[i].checked){
        					buf.push('<input type="'+_items[index].type+'" checked="checked" id="'+_id+'_'+_items[index].items[i].id+'" name="'+_items[index].name+'" value="'+_items[index].items[i].value+'" />');
        				}else{
        					buf.push('<input type="'+_items[index].type+'" id="'+_id+'_'+_items[index].items[i].id+'" name="'+_items[index].name+'" value="'+_items[index].items[i].value+'" />');
        				}
        			}
        			buf.push('</div>');
        			break;
        		case C$.FORM_TYPE_SELECT:
        			buf.push('<div class="form_right">');
        			buf.push('<select id="'+_id+'_'+_items[index].id+'" name="'+_items[index].name+'">');
        			for(var i in _items[index].items){
        				if(!!_items[index].items[i].selected){
        					buf.push('<option selected="selected" value="'+_items[index].items[i].value+'">'+_items[index].items[i].label+'</option>');
        				}else{
        					buf.push('<option value="'+_items[index].items[i].value+'">'+_items[index].items[i].label+'</option>');
        				}
        			}
        			buf.push('</select>');
        			buf.push('</div>');
        			break;
        		case C$.FORM_TYPE_SUBMIT:
        			buf.push('<div class="buttons">');
        			buf.push('<button class="positive" id="'+_id+'_'+_items[index].id+'" name="'+_items[index].name+'" type="submit"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>'+val+'</button>');
        			//buf.push('<input type="'+_items[index].type+'" id="'+_id+'_'+_items[index].id+'"  name="'+_items[index].name+'" value="'+val+'" />');
        			buf.push('</div>');
        			rule.submitHandler = _items[index].submitMethod;
        			break;
        		case C$.FORM_TYPE_BUTTON:
        			buf.push('<div class="buttons">');
        			buf.push('<button class="positive" id="'+_id+'_'+_items[index].id+'" name="'+_items[index].name+'" type"'+_items[index].type+'">'+val+'</button>');
        			//buf.push('<input type="'+_items[index].type+'" id="'+_id+'_'+_items[index].id+'"  name="'+_items[index].name+'" value="'+val+'" />');
        			buf.push('</div>');
        			break;
        		case C$.FORM_TYPE_TEXT:
        		default :
        			buf.push('<div class="form_right">');
        			buf.push('<input type="'+_items[index].type+'" id="'+_id+'_'+_items[index].id+'"  name="'+_items[index].name+'" value="'+val+'" />');
        			buf.push('</div>');
        			break;
        	}
        	buf.push('</div>');
        	rule.rules[_items[index].name] = _items[index].rule;
        	if(!!_items[index].method){
        		for(var name in _items[index].method){
        			$("#"+_id+'_'+_items[index].id).live(name,_items[index].method[name]);
        		}
        	}
        }
        buf.push('</form>');
        if(!!_plugin&&!!_plugin.type&&_plugin.type=="pop"){
        	//增加控件层
        	$(document.body).append('<div id="'+_id+'_moreProNamesDiv" style="display:none"><div id="typetree"><div class="modal"><div class="mHeader"><h2 class="tit">'+
        			_plugin.label+'</h2><span class="mClose cursorPointer" onclick="tb_remove();"></span></div><div id="moreProNames" style="height:265px;text-align:center" ></div></div></div></div>');

        	if(!!_plugin.fromId){
                $("#"+_plugin.fromId).live("click",function(){
                    //$.formUIV2();
                    //$("#DialogDiv2").html(buf.join(""));
                    $("#moreProNames").html(buf.join(""));
                    var height = !!_plugin.formHeight ? _plugin.formHeight : 390;
                    var width = !!_plugin.formWidth ? _plugin.formWidth : 800;
                    tb_show('','#TB_inline?height='+height+'&width='+width+'&inlineId='+_id+'_moreProNamesDiv&modal=true',false);
                    $("#"+_id+"_moreProNamesDiv #moreProNames").empty();
                    $("#"+_id+"_form").validate(rule);
                });
            }else{
                $("#moreProNames").html(buf.join(""));
                var height = !!_plugin.formHeight ? _plugin.formHeight : 390;
                var width = !!_plugin.formWidth ? _plugin.formWidth : 800;
                tb_show('','#TB_inline?height='+height+'&width='+width+'&inlineId='+_id+'_moreProNamesDiv&modal=true',false);
                $("#"+_id+"_moreProNamesDiv #moreProNames").empty();
                $("#"+_id+"_form").validate(rule);
            }

        }else{
        	$("#"+_id).html(buf.join(""));
        	$("#"+_id+"_form").validate(rule);
        }
    }
    return _render;
})(jQuery, formRender||{});

var R$ = (function(_$){
    var def = {
//        id: "",
//        mode: C$.ARRAY,
//        figure: C$.FIGURE_TBL,
//        plugin: {
//
//        }
    };
    var func = {
        init: function(_id, _adapter){
            def = {};
            _$.extend(def, {
                id: _id,
                name: _adapter.getMappingName(_id),
                mode: _adapter.getMappingMode(_id),
                figure: _adapter.getMappingFigure(_id),
                plugin: _adapter.getMappingPlugin(_id),
                affect: _adapter.getMappingAffect(_id),
                dataItem: _adapter.getMappingDataItem(_id),
                layout: _adapter.getMappingLayout(_id),
                preview: _adapter.ifPreview(_id),
                items:_adapter.getMappingItems(_id)
            });
            return R$;
        },
        exec: function(_dataset){
            switch(def.figure){
                case C$.FIGURE_LIST:
                    listRender.exec(def.id, def.name, _dataset, (!!def.mode?def.mode:C$.MODE_STANDARD), def.plugin, def.layout, def.preview);
                    break;
                case C$.FIGURE_TBL:
                    _$.fn.dataTableExt.oSort['numeric-comma-asc'] = function(a,b) {
                        if(!!_$("input:hidden",_$(a)).length){
                            a = _$("input:hidden",_$(a)).val();
                        }else{
                            /**
                             * 过滤值中的HTML标记，如<label...
                             */
                            if((a+"").indexOf("<")>=0){
                               a = $(a+"").text();
                            }
                        }
                        if(!!_$("input:hidden",_$(b)).length){
                            b = _$("input:hidden",_$(b)).val();
                        }else{
                            if((b+"").indexOf("<")>=0){
                                b = $(b+"").text();
                            }
                        }
                        a = ""+a,b = ""+b;
                        var x = (a == "-") ? 0 : a.replace( /,/g, "").replace(/%/g,"");
                        var y = (b == "-") ? 0 : b.replace( /,/g, "").replace(/%/g,"");
                        x = parseFloat(x);
                        y = parseFloat(y);
                        return ((x < y) ? -1 : ((x > y) ?  1 : 0));
                    };
                    _$.fn.dataTableExt.oSort['numeric-comma-desc'] = function(a,b) {
                        if(!!_$("input:hidden",_$(a)).length){
                            a = _$("input:hidden",_$(a)).val();
                        }else{
                            /**
                             * 过滤值中的HTML标记，如<label...
                             */
                            if((a+"").indexOf("<")>=0){
                                a = $(a+"").text();
                            }
                        }
                        if(!!_$("input:hidden",_$(b)).length){
                            b = _$("input:hidden",_$(b)).val();
                        }else{
                            if((b+"").indexOf("<")>=0){
                                b = $(b+"").text();
                            }
                        }
                        a = ""+a,b = ""+b;
                        var x = (a == "-") ? 0 : a.replace( /,/g, "").replace(/%/g,"");
                        var y = (b == "-") ? 0 : b.replace( /,/g, "").replace(/%/g,"");
                        x = parseFloat( x );
                        y = parseFloat(y);
                        return ((x < y) ?  1 : ((x > y) ? -1 : 0));
                    };
                    _$.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
                        if((x+"").indexOf("<")>=0){
                            x = _$(x).text();
                        }
                        if((y+"").indexOf("<")>=0){
                            y = _$(y).text();
                        }
                        return ((x < y) ? -1 : ((x > y) ?  1 : 0));
                    };

                    _$.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
                        if((x+"").indexOf("<")>=0){
                            x = _$(x).text();
                        }
                        if((y+"").indexOf("<")>=0){
                            y = _$(y).text();
                        }
                        return ((x < y) ?  1 : ((x > y) ? -1 : 0));
                    };

                    $.fn.dataTableExt.oApi.fnGetColumnData = function(oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty){
                        if(typeof iColumn=="undefined") return new Array();
                        if(typeof bUnique=="undefined") bUnique = true;
                        if(typeof bFiltered=="undefined") bFiltered = true;
                        if(typeof bIgnoreEmpty=="undefined") bIgnoreEmpty = true;

                        var aiRows,iRow;
                        if (bFiltered == true) aiRows = oSettings.aiDisplay;
                        else aiRows = oSettings.aiDisplayMaster; // all row numbers
                        var asResultData = new Array();

                        for (var i=0,c=aiRows.length; i<c; i++) {
                            iRow = aiRows[i];
                            var aData = this.fnGetData(iRow);
                            var sValue = aData[iColumn];

                            if (bIgnoreEmpty == true && sValue.length == 0) continue;
                            else if (bUnique == true && _$.inArray(sValue, asResultData) > -1) continue;
                            else asResultData.push(sValue);
                        }
                        return asResultData;
                    };
                    if(C$.MODE_DOM==def.mode){
                        tblRender.execByDom(def.id, def.name, _dataset, def.plugin, def.layout, def.preview);
                    }else if(C$.MODE_ARR==def.mode){
                        tblRender.execByArray(def.id, def.name, _dataset, def.plugin, def.layout, def.preview);
                    }else{
                        _$.jLog("请设置渲染模式参数");
                    }
                    break;
                case C$.FIGURE_CHART:
                    chartRender.exec(def.id, def.name, _dataset, def.plugin, def.dataItem, def.layout, def.preview);
                    break;
                case C$.FIGURE_MAP:
                    mapRender.exec(def.id, def.name, _dataset, def.plugin, def.dataItem, def.layout, def.preview);
                    break;
                case C$.FIGURE_SEL:
                    selRender.exec(def.id, def.name, _dataset, def.plugin, def.affect, def.preview);
                    break;
                case C$.FIGURE_DATEPICKER:
                    datePickerRender.exec(def.id, def.name, def.plugin, def.affect, def.preview);
                    break;
                case C$.FIGURE_TAB:
                    tabRender.exec(def.id, def.name, def.plugin, def.affect, def.preview);
                    break;
                case C$.FIGURE_FORM:
                	formRender.exec(def.id, def.name, def.plugin, def.affect, def.preview, def.items);
                	break;
            }
         }
    };
    return {
        init: func.init,
        exec: func.exec
    }
})(jQuery);