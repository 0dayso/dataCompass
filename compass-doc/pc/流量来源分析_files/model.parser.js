var P$ = (function(_$){
    var def = {
        /*
            id: "",
            format: 1,
            formatKey: "advCntntTypes",
            figure: C$.FIGURE_TBL,
            dataType: C$.DATATYPE_SUM,
            dataItem: {}
        */
    },
    func = {
        /**
         * 解析器初始化，为了加载适配器中的指定参数
         * @param _id   元素对象的ID
         * @param _adapter 适配器配置
         * @returns {*}
         */
        init: function(_id, _adapter){
            def = {};
            _$.extend(def, {
                format: _adapter.getMappingFormat(_id),
                formatKey: _adapter.getMappingFormatKey(_id),
                figure: _adapter.getMappingFigure(_id),
                dataType: _adapter.getMappingDataType(_id),
                dataItem: _adapter.getMappingDataItem(_id),
                dataItemExt: _adapter.getMappingDataItemExt(_id),
                custom:_adapter.getMappingCustom(_id),
                plugin: _adapter.getMappingPlugin(_id)
            });
            return P$;
        },
        /**
         * 解析列表型的数据
         * @param _dataset 被解析的数据集对象
         */
        parseList: function(_dataset){
            var rlt = _dataset.getResult();
            switch (def.format){
                case C$.FORMAT_0:
                    //TODO
                    break;
                case C$.FORMAT_1:
                case C$.FORMAT_10:
                case C$.FORMAT_11:
                    var sums,zbs,size=0;
                    if(def.format==C$.FORMAT_1){
                        sums = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_SUM];
                        zbs = _$.jClone(rlt[C$.RESULT_SUMZB]);
                        for(var zb in zbs){
                        	size++;
                        }
                    }else if(def.format==C$.FORMAT_10){
                        sums = _dataset.getResult(C$.RESULT_RLTDATA);
                        zbs = _$.jClone(rlt[!!def.formatKey?def.formatKey:C$.RESULT_SUMZB]);
                        for(var zb in zbs){
                        	size++;
                        }
                    }else if(def.format==C$.FORMAT_11){
                        sums = _dataset.getResult(C$.RESULT_RLTDATA)[!!def.formatKey[0]?def.formatKey[0]:C$.RESULT_SUM];
                        zbs = _$.jClone(rlt[!!def.formatKey[1]?def.formatKey[1]:C$.RESULT_SUMZB]);
                        for(var zb in zbs){
                        	size++;
                        }
                    }
                    var ln = {},li = {},dis = [], idx,sums = !!sums?sums:{},zbs = !!zbs?zbs:{};
                    if(!!def.dataItem){
                        /**
                         * 过滤被指定的数据项
                         */
                        for(var id in def.dataItem){
                            for(var i in zbs){
                                if(zbs[i][C$.RESULT_ID]==id&&def.dataItem[zbs[i][C$.RESULT_ID]]!=undefined){
                                    zbs[i][C$.DATAITEM_NONNEGATIVE] = def.dataItem[zbs[i][C$.RESULT_ID]].nonnegative;
                                    dis.push(zbs[i]);
                                }
                            }
                        }
                    }else{
                        for(var i in zbs){
                            dis.push(zbs[i]);
                        }
                    }
                    /**
                     * 数据项配置扩展
                     */
                    if(!!def.dataItemExt){
                        for(var i in dis){
                            for(var id in def.dataItemExt){
                                if(dis[i][C$.RESULT_ID]==id){
                                    if(!!def.dataItemExt[id].nonnegative){
                                        dis[i][C$.DATAITEM_NONNEGATIVE] = def.dataItemExt[id].nonnegative;
                                    }
                                }
                            }
                        }
                    }
                    /**
                     * 指标结果集重组，格式为
                     * {id1:[val1,des1,type1,precision1,decimal1],id2:[val2,des2,type2,precision2,decimal2],...}
                     */
                    _$.each(dis, function(i, di){
                        ln[di[C$.RESULT_ID]] = [di[C$.RESULT_VAL],di[C$.RESULT_DES],di[C$.RESULT_TYPE],di[C$.RESULT_DEC],di[C$.RESULT_PRE]];
                    });
                    /**
                     * 数值结果集重组，格式为
                     * {id1:val,id2:val,...}
                     */
                    for(var j in dis){
                        idx = dis[j][C$.RESULT_ID];
                        if(!!sums[idx]&&sums[idx][C$.RESULT_VAL].length>0){
                            li[idx] = _$.jClone(sums[idx][C$.RESULT_VAL]);
                            if(dis[j][C$.DATAITEM_NONNEGATIVE]&&li[idx][0]){
                                li[idx][0] = 0;
                            }
                            li[idx].splice(0,1,_$.jFormatVal(li[idx][0],dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]));
                        }
                    }
                    _dataset.clrData(C$.FIGURE_LIST);
                    _dataset.setData(C$.DATASET_LN, ln);
                    _dataset.setData(C$.DATASET_LI, li);
                    _dataset.setSize(size);
                    break;
            }
        },
        /**
         * 解析表格型的数据
         * @param _dataset 被解析的数据集对象
         */
        parseTbl: function(_dataset){
            var rlt = _dataset.getResult();
            switch (def.format){
                case C$.DEFAULT:
                    var dtls = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DATA];
                    var zbs = _$.jClone(_dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DI]), dis = [];
                    var th = {},tb = [], kv = {}, row, idx, size;
                    if(!!def.dataItem){
                        /**
                         * 过滤被指定的数据项
                         */
                        for(var id in def.dataItem){
                            for(var i in zbs){
                                if(zbs[i][C$.RESULT_ID]==id&&def.dataItem[zbs[i][C$.RESULT_ID]]!=undefined){
                                    zbs[i][C$.DATAITEM_CHECKED] = def.dataItem[zbs[i][C$.RESULT_ID]].bShow;
                                    zbs[i][C$.DATAITEM_STATIC] = def.dataItem[zbs[i][C$.RESULT_ID]].bStatic;
                                    zbs[i][C$.DATAITEM_SORTABLE] = def.dataItem[zbs[i][C$.RESULT_ID]].bSort;
                                    zbs[i][C$.DATAITEM_TOTAL] = def.dataItem[zbs[i][C$.RESULT_ID]].bTotal;
                                    zbs[i][C$.DATAITEM_AVG] = def.dataItem[zbs[i][C$.RESULT_ID]].bAvg;
                                    zbs[i][C$.DATAITEM_FORBID] = !!def.dataItem[zbs[i][C$.RESULT_ID]].bForbid;
                                    zbs[i][C$.DATAITEM_PIC] = !!def.dataItem[zbs[i][C$.RESULT_ID]].bPic;
                                    zbs[i][C$.DATAITEM_STRIP] = def.dataItem[zbs[i][C$.RESULT_ID]].strip;
                                    zbs[i][C$.DATAITEM_TDFORMATTER] = def.dataItem[zbs[i][C$.RESULT_ID]].tdFormatter;
                                    zbs[i][C$.DATAITEM_WIDTH] = def.dataItem[zbs[i][C$.RESULT_ID]].width;
                                    zbs[i][C$.DATAITEM_ASC] = def.dataItem[zbs[i][C$.RESULT_ID]].asc;
                                    zbs[i][C$.CURCLASS] = def.dataItem[zbs[i][C$.RESULT_ID]].curClass;
                                    dis.push(zbs[i]);
                                }
                            }
                        }
                    }else{
                        for(var i in zbs){
                            zbs[i][C$.DATAITEM_CHECKED] = true;
                            zbs[i][C$.DATAITEM_SORTABLE] = true;
                            zbs[i][C$.DATAITEM_TOTAL] = true;
                            zbs[i][C$.DATAITEM_AVG] = true;
                            dis.push(zbs[i]);
                        }
                    }
                    /**
                     * 数据项配置扩展
                     */
                    if(!!def.dataItemExt){
                        for(var i in dis){
                            for(var id in def.dataItemExt){
                                if(dis[i][C$.RESULT_ID]==id){
                                    if(!!def.dataItemExt[id].sort){
                                        dis[i][C$.DATAITEM_SORT] = def.dataItemExt[id].sort;
                                    }
                                    if(def.dataItemExt[id].strip){
                                        dis[i][C$.DATAITEM_STRIP] = def.dataItemExt[id].strip;
                                    }
                                    if(def.dataItemExt[id].tdFormatter){
                                        dis[i][C$.DATAITEM_TDFORMATTER] = def.dataItemExt[id].tdFormatter;
                                    }
                                    if(def.dataItemExt[id].width){
                                        dis[i][C$.DATAITEM_WIDTH] = def.dataItemExt[id].width;
                                    }
                                    if(def.dataItemExt[id].asc){
                                        dis[i][C$.DATAITEM_ASC] = def.dataItemExt[id].asc;
                                    }
                                    if(def.dataItemExt[id].dataType){
                                    	dis[i][C$.RESULT_TYPE] = def.dataItemExt[id].dataType;
                                    }
                                }
                            }
                        }
                    }
                    /**
                     * 指标结果集重组，格式为
                     * {id1:col1, id2:col2, id3:col3,...}
                     */
                    _$.each(dis, function(i, di){
                        th[di[C$.RESULT_ID]] = (di[C$.RESULT_VAL]);
                    });
                    /**
                     * 计算数据的长度
                     */
                    var len = 0;
                    if(!!dtls&&!!dis[0]&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                        len = dtls[dis[0][C$.RESULT_ID]].length;
                    }
                    /**
                     * 数值结果集重组，格式为
                     * [{id1:val,id2:val},{id1:val,id2:val},...]
                     */
                    for(var i=0;i<len;i++){
                        row = [];
                        for(var j in dis){
                            idx = dis[j][C$.RESULT_ID];
                            if(!!dtls[idx]){
                                row[j] = _$.jFormatVal(dtls[idx][i],dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]);
                            }
                        }
                        tb.push(row);
                    }
                    /**
                     * 数值结果集重组，格式为
                     * "id1":[val1,val2,val3],"id2":[val4,val5,val6],...
                     */
                    for(var j in dis){
                        idx = dis[j][C$.RESULT_ID];
                        if(!!dtls[idx]){
                            kv[idx] = [];
                            for(var i=0;i<len;i++){
                                kv[idx].push((!!dtls[idx][C$.RESULT_VAL][i]||dtls[idx][C$.RESULT_VAL][i]==0)? _$.jFormatVal(dtls[idx][C$.RESULT_VAL][i],dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]) : "-");
                            }
                        }
                    }
                    /**
                     * 判断是否有纵向总计
                     */
                    if(def.plugin.cTotal){
                        var total = 0, extRow = [];
                        for(var j in dis){
                            total = 0, idx = dis[j][C$.RESULT_ID];
                            if(dis[j][C$.DATAITEM_TOTAL]){
                                for(var i=0;i<len;i++){
                                    total += dtls[idx][C$.RESULT_VAL][i];
                                }
                                extRow.push(_$.jFormatVal(total,dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]));
                                kv[idx].splice(0,0,_$.jFormatVal(total,dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]));
                            }else{
                                extRow.push("总计");
                            }
                        }
                        tb.unshift(extRow);
                    }
                    /**
                     * 判断是否有纵向平均
                     */
                    if(def.plugin.cAvg){
                        var total = 0,avg = 0, extRow = [];
                        for(var j in dis){
                            total = 0, idx = dis[j][C$.RESULT_ID];
                            if(dis[j][C$.DATAITEM_TOTAL]){
                                for(var i=0;i<len;i++){
                                    total += dtls[idx][C$.RESULT_VAL][i];
                                }
                                avg = total/dtls[C$.RESULT_LEN];
                                extRow.push(_$.jFormatVal(avg,1,dis[j][C$.RESULT_DEC]));
                                kv[idx].splice(0,0,_$.jFormatVal(avg,1,dis[j][C$.RESULT_DEC]));
                            }else{
                                extRow.push("平均");
                            }
                        }
                        tb.unshift(extRow);
                    }
                    _dataset.clrData(C$.FIGURE_TBL);
                    _dataset.setData(C$.DATASET_TH, th);
                    _dataset.setData(C$.DATASET_TB, tb);
                    _dataset.setData(C$.DATASET_KV, kv);
                    _dataset.setData(C$.DATASET_TDI, dis);
                    _dataset.setSize(len);
                    break;
                case C$.FORMAT_0:
                	break;
                case C$.FORMAT_1:
                case C$.FORMAT_10:
                case C$.FORMAT_11:
                case C$.FORMAT_12:
                case C$.FORMAT_2:
                case C$.FORMAT_20:
                case C$.FORMAT_21:
                case C$.FORMAT_22:
                    var dtls,zbs;
                    //判断返回数组的key是否含有value
                    var noVal = def.format==C$.FORMAT_2||def.format==C$.FORMAT_20||def.format==C$.FORMAT_21||def.format==C$.FORMAT_20;
                    if(def.format==C$.FORMAT_1||def.format==C$.FORMAT_2){
                        dtls = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DTL];
                        zbs = _$.jClone(rlt[C$.RESULT_DTLZB]);
                    }else if(def.format==C$.FORMAT_10||def.format==C$.FORMAT_20){
                        dtls = _dataset.getResult(C$.RESULT_RLTDATA);
                        zbs = _$.jClone(rlt[C$.RESULT_DTLZB]);
                    }else if(def.format==C$.FORMAT_11||def.format==C$.FORMAT_21){
                        dtls = _dataset.getResult(C$.RESULT_RLTDATA)[!!def.formatKey[0]?def.formatKey[0]:C$.RESULT_DTL];
                        zbs = _$.jClone(rlt[!!def.formatKey[1]?def.formatKey[1]:C$.RESULT_DTLZB]);
                    }else if(def.format==C$.FORMAT_12||def.format==C$.FORMAT_22){
                        dtls = _dataset.getResult(C$.RESULT_RLTDATA)[def.formatKey[0]];
                        zbs = _$.jClone(!!def.formatKey[1]?def.formatKey[1]:rlt[C$.RESULT_DTLZB]);
                    }
                    dtls = !!dtls?dtls:{};
                    //判断是否自定义数据项及数据集
                    if(!!def.custom&&!!def.custom.customDataItem&&!!def.custom.customData){
                        zbs = def.custom.customDataItem;
                        dtls = def.custom.customData
                    }
                    var dis = [],th = {},tb = [],kv = {}, row, idx;
                    if(!!def.dataItem){
                        /**
                         * 过滤被指定的数据项
                         */
                        for(var id in def.dataItem){
                            for(var i in zbs){
                                if(zbs[i][C$.RESULT_ID]==id&&def.dataItem[zbs[i][C$.RESULT_ID]]!=undefined){
                                    zbs[i][C$.DATAITEM_CHECKED] = def.dataItem[zbs[i][C$.RESULT_ID]].bShow;
                                    zbs[i][C$.DATAITEM_STATIC] = def.dataItem[zbs[i][C$.RESULT_ID]].bStatic;
                                    zbs[i][C$.DATAITEM_SORTABLE] = def.dataItem[zbs[i][C$.RESULT_ID]].bSort;
                                    zbs[i][C$.DATAITEM_TOTAL] = def.dataItem[zbs[i][C$.RESULT_ID]].bTotal;
                                    zbs[i][C$.DATAITEM_AVG] = def.dataItem[zbs[i][C$.RESULT_ID]].bAvg;
                                    zbs[i][C$.DATAITEM_FORBID] = def.dataItem[zbs[i][C$.RESULT_ID]].bForbid;
                                    zbs[i][C$.DATAITEM_PIC] = def.dataItem[zbs[i][C$.RESULT_ID]].bPic;
                                    zbs[i][C$.DATAITEM_STRIP] = def.dataItem[zbs[i][C$.RESULT_ID]].strip;
                                    zbs[i][C$.DATAITEM_TDFORMATTER] = def.dataItem[zbs[i][C$.RESULT_ID]].tdFormatter;
                                    zbs[i][C$.DATAITEM_WIDTH] = def.dataItem[zbs[i][C$.RESULT_ID]].width;
                                    zbs[i][C$.DATAITEM_ASC] = def.dataItem[zbs[i][C$.RESULT_ID]].asc;
                                    zbs[i][C$.CURCLASS] = def.dataItem[zbs[i][C$.RESULT_ID]].curClass;
                                    dis.push(zbs[i]);
                                }
                            }
                        }
                    }else{
                        for(var i in zbs){
                            zbs[i][C$.DATAITEM_CHECKED] = true;
                            zbs[i][C$.DATAITEM_SORTABLE] = true;
                            dis.push(zbs[i]);
                        }
                    }
                    /**
                     * 数据项配置扩展
                     */
                    if(!!def.dataItemExt){
                        for(var i in dis){
                            for(var id in def.dataItemExt){
                               if(dis[i][C$.RESULT_ID]==id){
                                   if(!!def.dataItemExt[id].sort){
                                       dis[i][C$.DATAITEM_SORT] = def.dataItemExt[id].sort;
                                   }
                                   if(def.dataItemExt[id].strip){
                                       dis[i][C$.DATAITEM_STRIP] = def.dataItemExt[id].strip;
                                   }
                                   if(def.dataItemExt[id].tdFormatter){
                                       dis[i][C$.DATAITEM_TDFORMATTER] = def.dataItemExt[id].tdFormatter;
                                   }
                                   if(def.dataItemExt[id].width){
                                       dis[i][C$.DATAITEM_WIDTH] = def.dataItemExt[id].width;
                                   }
                                   if(def.dataItemExt[id].asc){
                                       dis[i][C$.DATAITEM_ASC] = def.dataItemExt[id].asc;
                                   }
                                   if(def.dataItemExt[id].dataType){
                                	   dis[i][C$.RESULT_TYPE] = def.dataItemExt[id].dataType;
                                   }
                                   if(!!def.dataItemExt[id].formatter){
                                	   dis[i][C$.FORMATTER] = def.dataItemExt[id].formatter;
                                   }
                               }
                            }
                        }
                    }
                    if(!noVal){
                        /**
                         * 指标结果集重组，格式为
                         * {id1:col1, id2:col2, id3:col3,...}
                         */
                        _$.each(dis, function(i, di){
                            th[di[C$.RESULT_ID]] = (di[C$.RESULT_VAL]);
                        });
                        var len = 0;
                        if(!!dtls&&!!dis[0]&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                            len = dtls[dis[0][C$.RESULT_ID]][C$.RESULT_VAL].length;
                        }
                        /**
                         * 数值结果集重组，格式为
                         * [{id1:val,id2:val},{id1:val,id2:val},...]
                         */
                        for(var i=0;i<len;i++){
                            row = [];
                            for(var j in dis){
                                idx = dis[j][C$.RESULT_ID];
                                if(!!dtls[idx]){
                                    row[j] = (!!dtls[idx][C$.RESULT_VAL][i]||dtls[idx][C$.RESULT_VAL][i]==0)? (dis[j].formatter ? dis[j].formatter(dtls[idx][C$.RESULT_VAL][i]) : _$.jFormatVal(dtls[idx][C$.RESULT_VAL][i],dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC])) : "-";
                                }
                            }
                            tb.push(row);
                        }

                        /**
                         * 数值结果集重组，格式为KV
                         * "id1":[val1,val2,val3],"id2":[val4,val5,val6],...
                         */
                        for(var j in dis){
                            idx = dis[j][C$.RESULT_ID];
                            if(!!dtls[idx]){
                                kv[idx] = [];
                                for(var i=0;i<len;i++){
                                    kv[idx].push((!!dtls[idx][C$.RESULT_VAL][i]||dtls[idx][C$.RESULT_VAL][i]==0)? _$.jFormatVal(dtls[idx][C$.RESULT_VAL][i],dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]) : "-");
                                }
                            }
                        }
                        /**
                         * 判断是否有纵向总计
                         */
                        if(def.plugin.cTotal){
                            var total = 0, extRow = [];
                            for(var j in dis){
                                total = 0, idx = dis[j][C$.RESULT_ID];
                                if(dis[j][C$.DATAITEM_TOTAL]){
                                    for(var i=0,len=dtls[C$.RESULT_LEN];i<len;i++){
                                        total += dtls[idx][C$.RESULT_VAL][i];
                                    }
                                    extRow.push(_$.jFormatVal(total,dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]));
                                    kv[idx].splice(0,0,_$.jFormatVal(total,dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]));
                                }else{
                                    extRow.push("总计");
                                }
                            }
                            tb.unshift(extRow);
                        }
                        /**
                         * 判断是否有纵向平均
                         */
                        if(def.plugin.cAvg){
                            var total = 0,avg = 0, extRow = [];
                            for(var j in dis){
                                total = 0, idx = dis[j][C$.RESULT_ID];
                                if(dis[j][C$.DATAITEM_TOTAL]){
                                    for(var i=0,len=dtls[C$.RESULT_LEN];i<len;i++){
                                        total += dtls[idx][C$.RESULT_VAL][i];
                                    }
                                    avg = total/dtls[C$.RESULT_LEN];
                                    extRow.push(_$.jFormatVal(avg,1,dis[j][C$.RESULT_DEC]));
                                    kv[idx].splice(0,0,_$.jFormatVal(avg,1,dis[j][C$.RESULT_DEC]));
                                }else{
                                    extRow.push("平均");
                                }
                            }
                            tb.unshift(extRow);
                        }
                    }else{
                        /**
                         * 指标结果集重组，格式为
                         * {id1:col1, id2:col2, id3:col3,...}
                         */
                        _$.each(dis, function(i, di){
                            th[di[C$.RESULT_ID]] = di;
                        });
                        var len = 0;
                        if(!!dtls&&!!dis[0]&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                            len = dtls[dis[0][C$.RESULT_ID]].length;
                        }
                        /**
                         * 数值结果集重组，格式为
                         * [{id1:val,id2:val},{id1:val,id2:val},...]
                         */
                        for(var i=0;i<len;i++){
                            row = [];
                            for(var j in dis){
                                idx = dis[j][C$.RESULT_ID];
                                if(!!dtls[idx]){
                                    row[j] = !!dtls[idx][i] ? _$.jFormatVal(dtls[idx][i],dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]) : "-";
                                }
                            }
                            tb.push(row);
                        }
                        /**
                         * 数值结果集重组，格式为
                         * "id1":[val1,val2,val3],"id2":[val4,val5,val6],...
                         */
                        for(var j in dis){
                            idx = dis[j][C$.RESULT_ID];
                            if(!!dtls[idx]){
                                kv[idx] = [];
                                for(var i=0;i<len;i++){
                                    kv[idx].push((!!dtls[idx][i]||dtls[idx][i]==0)? _$.jFormatVal(dtls[idx][i],dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]) : "-");
                                }
                            }
                        }
                        /**
                         * 判断是否有纵向总计
                         */
                        if(def.plugin.cTotal){
                            var total = 0, extRow = [];
                            for(var j in dis){
                                total = 0, idx = dis[j][C$.RESULT_ID];
                                if(dis[j][C$.DATAITEM_TOTAL]){
                                    for(var i=0,len=dtls[C$.RESULT_LEN];i<len;i++){
                                        total += dtls[idx][i];
                                    }
                                    extRow.push(_$.jFormatVal(total,dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]));
                                    kv[idx].splice(0,0,_$.jFormatVal(total,dis[j][C$.RESULT_TYPE],dis[j][C$.RESULT_DEC]));
                                }else{
                                    extRow.push("总计");
                                }
                            }
                            tb.unshift(extRow);
                        }
                        /**
                         * 判断是否有纵向平均
                         */
                        if(def.plugin.cAvg){
                            var total = 0,avg = 0, extRow = [];
                            for(var j in dis){
                                total = 0, idx = dis[j][C$.RESULT_ID];
                                if(dis[j][C$.DATAITEM_TOTAL]){
                                    for(var i=0,len=dtls[C$.RESULT_LEN];i<len;i++){
                                        total += dtls[idx][i];
                                    }
                                    avg = total/dtls[C$.RESULT_LEN];
                                    extRow.push(_$.jFormatVal(avg,1,dis[j][C$.RESULT_DEC]));
                                    kv[idx].splice(0,0,_$.jFormatVal(avg,1,dis[j][C$.RESULT_DEC]));
                                }else{
                                    extRow.push("平均");
                                }
                            }
                            tb.unshift(extRow);
                        }
                    }
                    _dataset.clrData(C$.FIGURE_TBL);
                    _dataset.setData(C$.DATASET_TH, th);
                    _dataset.setData(C$.DATASET_TB, tb);
                    _dataset.setData(C$.DATASET_KV, kv);
                    _dataset.setData(C$.DATASET_TDI, dis);
                    _dataset.setSize(len);
                    break;
            }
        },
        /**
         * 解析图型的数据
         * @param _dataset 被解析的数据集对象
         */
        parseChart: function(_dataset){
            var rlt = _dataset.getResult();
            switch (def.format){
                case C$.DEFAULT:
                    var dtls = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DATA];
                    var zbs = _$.jClone(_dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DI]), dis = [], curIdx, curRow;
                    dtls = !!dtls?dtls:{};
                    //判断是不是饼图
                    if(def.plugin.type!="pie"){
                        var categories = [], series = [];
                        /**
                         * 过滤被指定的数据项
                         */
                        if(!!def.dataItem.y){
                            for(var i in zbs){
                                if(def.dataItem.y[zbs[i][C$.RESULT_ID]]!=undefined){
                                    zbs[i][C$.DATAITEM_CHECKED] = def.dataItem.y[zbs[i][C$.RESULT_ID]].bShow;
                                    zbs[i][C$.DATAITEM_MEANLINE] = def.dataItem.y[zbs[i][C$.RESULT_ID]].bMeanLine;
                                    dis.push(zbs[i]);
                                }
                            }
                        }else{
                            for(var i in zbs){
                                zbs[i][C$.DATAITEM_CHECKED] = true;
                                zbs[i][C$.DATAITEM_MEANLINE] = true;
                                dis.push(zbs[i]);
                            }
                        }
                        /**
                         * X轴结果集重组，格式为
                         * [val1,val2,...]
                         */
                        var len = 0;
                        if(!!dtls&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                            len = dtls[dis[0][C$.RESULT_ID]].length;
                        }
                        for(var id in def.dataItem.x){
                            for(var i=0;i<len;i++){
                                categories.push(dtls[id][i]);
                            }
                            break;
                        }
                        /**
                         * Y轴结果集重组，格式为
                         * [{id1:[val1,val2....]},{id2:[val1,val2...]},...]
                         */
                        for(var j in dis){
                            curIdx = dis[j][C$.RESULT_ID],curRow = [];
                            if(!!dtls[curIdx]){
                                if(dis[j][C$.RESULT_TYPE]!=C$.DATATYPE_STRING){
                                    //过滤出数值类型带引号的字符串
                                    if(!!dtls[curIdx][C$.RESULT_VAL][0]&&typeof dtls[curIdx][C$.RESULT_VAL][0]=="string"){
                                        for(var r in dtls[curIdx][C$.RESULT_VAL]){
                                            curRow.push(Number(dtls[curIdx][C$.RESULT_VAL][r]));
                                        }
                                    }else{
                                        curRow = dtls[curIdx][C$.RESULT_VAL];
                                    }
                                }else{
                                    curRow = dtls[curIdx][C$.RESULT_VAL];
                                }
                                series[dis[j][C$.RESULT_VAL]] = curRow;
                            }
                        }
                        _dataset.clrData(C$.FIGURE_CHART);
                        _dataset.setData(C$.DATASET_CATEGORIES, categories);
                        _dataset.setData(C$.DATASET_SERIES, series);
                        _dataset.setData(C$.DATASET_CDI_Y, dis);
                        _dataset.setSize(len);
                    }else{
                        var xVal = [],yVal = [];
                        if(!!def.dataItem.x){
                            /**
                             * X轴结果集重组，格式为
                             * [val1,val2,...]
                             */
                            for(var id in def.dataItem.x){
                                for(var i=0,len=dtls[C$.RESULT_LEN];i<len;i++){
                                    xVal.push(dtls[id][C$.RESULT_VAL][i]);
                                }
                            }
                        }
                        if(!!def.dataItem.y){
                            /**
                             * Y轴结果集重组，格式为
                             * [val1,val2,...]
                             */
                            var len = 0;
                            if(!!dtls&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                                len = dtls[dis[0][C$.RESULT_ID]].length;
                            }
                            for(var id in def.dataItem.y){
                                for(var i=0;i<len;i++){
                                    yVal.push(dtls[id][i]);
                                }
                            }
                        }
                        _dataset.clrData(C$.FIGURE_CHART);
                        _dataset.setData(C$.DATASET_CVAL_X, xVal);
                        _dataset.setData(C$.DATASET_CVAL_Y, yVal);
                        _dataset.setSize(len);
                    }
                    break;
                case C$.FORMAT_0:
                	break;
                case C$.FORMAT_1:
                case C$.FORMAT_10:
                case C$.FORMAT_11:
                case C$.FORMAT_12:
                case C$.FORMAT_2:
                case C$.FORMAT_20:
                case C$.FORMAT_21:
                case C$.FORMAT_22:
                    var dtls,zbs, dis = [], curIdx, curRow;
                    var noVal = (def.format+"").indexOf(C$.FORMAT_2+"")==0;
                    if(def.format==C$.FORMAT_1||def.format==C$.FORMAT_2){
                        dtls = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DTL];
                        zbs = _$.jClone(rlt[C$.RESULT_DTLZB]);
                    }else if(def.format==C$.FORMAT_10||def.format==C$.FORMAT_20){
                        dtls = _dataset.getResult(C$.RESULT_RLTDATA);
                        zbs = _$.jClone(rlt[C$.RESULT_DTLZB]);
                    }else if(def.format==C$.FORMAT_11||def.format==C$.FORMAT_21){
                        dtls = _dataset.getResult(C$.RESULT_RLTDATA)[def.formatKey[0]];
                        zbs = _$.jClone(rlt[!!def.formatKey[1]?def.formatKey[1]:C$.RESULT_DTLZB]);
                    }else if(def.format==C$.FORMAT_12||def.format==C$.FORMAT_22){
                    	dtls = _dataset.getResult(C$.RESULT_RLTDATA)[def.formatKey[0]];
                        zbs = _$.jClone(!!def.formatKey[1]?def.formatKey[1]:rlt[C$.RESULT_DTLZB]);
                    }
                    dtls = !!dtls?dtls:{};

                    //判断返回结果集是否包含KEY：value
                    if(noVal){
                        //判断是不是饼图
                        if(def.plugin.type!="pie"){
                            var categories = [], series = [];
                            /**
                             * 过滤被指定的数据项
                             */
                            if(!!def.dataItem.y){
                                for(var i in zbs){
                                    if(def.dataItem.y[zbs[i][C$.RESULT_ID]]!=undefined){
                                        zbs[i][C$.DATAITEM_CHECKED] = def.dataItem.y[zbs[i][C$.RESULT_ID]].bShow;
                                        zbs[i][C$.DATAITEM_MEANLINE] = def.dataItem.y[zbs[i][C$.RESULT_ID]].bMeanLine;
                                        dis.push(zbs[i]);
                                    }
                                }
                            }else{
                                for(var i in zbs){
                                    zbs[i][C$.DATAITEM_CHECKED]=true;
                                    zbs[i][C$.DATAITEM_MEANLINE]=true;
                                    dis.push(zbs[i]);
                                }
                            }

                            /**
                             * 计算数组长度
                             * @type {number}
                             */
                            var len = 0;
                            if(dtls[C$.RESULT_LEN]){
                                len = dtls[C$.RESULT_LEN];
                            }else{
                                if(!!dtls&&!!dis[0]&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                                    len = dtls[dis[0][C$.RESULT_ID]].length;
                                }
                            }

                            /**
                             * X轴结果集重组，格式为
                             * [val1,val2,...]
                             */
                            for(var id in def.dataItem.x){
                                if(!!dtls&&!!dtls[id]){
                                    len = dtls[id].length;
                                }
                                for(var i=0;i<len;i++){
                                    categories.push((dtls[id][i]+"").replace(/\s*/g,""));
                                }
                                break;
                            }
                            /**
                             * Y轴结果集重组，格式为
                             * [{id1:[val1,val2....]},{id2:[val1,val2...]},...]
                             */
                            for(var j in dis){
                                curIdx = dis[j][C$.RESULT_ID],curRow = [];
                                if(!!dtls[curIdx]){
                                    if(dis[j][C$.RESULT_TYPE]!=C$.DATATYPE_STRING){
                                        //过滤出数值类型带引号的字符串
                                        if(!!dtls[curIdx][0]&&typeof dtls[curIdx][0]=="string"){
                                            for(var r in dtls[curIdx]){
                                                curRow.push(Number(dtls[curIdx][r]));
                                            }
                                        }else{
                                            curRow = dtls[curIdx];
                                        }
                                    }else{
                                        curRow = dtls[curIdx];
                                    }
                                    series[dis[j][C$.RESULT_VAL]] = curRow;
                                }
                            }
                            _dataset.clrData(C$.FIGURE_CHART);
                            _dataset.setData(C$.DATASET_CATEGORIES, categories);
                            _dataset.setData(C$.DATASET_SERIES, series);
                            _dataset.setData(C$.DATASET_CDI_Y, dis);
                            _dataset.setSize(dtls[C$.RESULT_LEN]);
                        }else{
                            var xVal = [],yVal = [];

                            /**
                             * 计算数组长度
                             * @type {number}
                             */
                            var len = 0;
                            if(dtls[C$.RESULT_LEN]){
                                len = dtls[C$.RESULT_LEN];
                            }else{
                                if(!!dtls&&!!dis[0]&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                                    len = dtls[dis[0][C$.RESULT_ID]].length;
                                }
                            }

                            if(!!def.dataItem.x){
                                /**
                                 * X轴结果集重组，格式为
                                 * [val1,val2,...]
                                 */
                                for(var id in def.dataItem.x){
                                    if(!!dtls&&!!dtls[id]){
                                        len = dtls[id].length;
                                    }
                                    for(var i=0;i<len;i++){
                                        xVal.push(dtls[id][i]);
                                    }
                                }
                            }
                            if(!!def.dataItem.y){
                                /**
                                 * Y轴结果集重组，格式为
                                 * [val1,val2,...]
                                 */
                                for(var id in def.dataItem.y){
                                    for(var i=0,len=dtls[C$.RESULT_LEN];i<len;i++){
                                        yVal.push(dtls[id][i]);
                                    }
                                }
                            }
                            _dataset.clrData(C$.FIGURE_CHART);
                            _dataset.setData(C$.DATASET_CVAL_X, xVal);
                            _dataset.setData(C$.DATASET_CVAL_Y, yVal);
                            _dataset.setSize(dtls[C$.RESULT_LEN]);
                        }
                    }else{
                        //判断是不是饼图
                        if(def.plugin.type!="pie"){
                            var categories = [], series = [];
                            /**
                             * 过滤被指定的数据项
                             */
                            if(!!def.dataItem.y){
                                for(var i in zbs){
                                    if(def.dataItem.y[zbs[i][C$.RESULT_ID]]!=undefined){
                                        zbs[i][C$.DATAITEM_CHECKED] = def.dataItem.y[zbs[i][C$.RESULT_ID]].bShow;
                                        zbs[i][C$.DATAITEM_MEANLINE] = def.dataItem.y[zbs[i][C$.RESULT_ID]].bMeanLine;
                                        dis.push(zbs[i]);
                                    }
                                }
                            }else{
                                for(var i in zbs){
                                    zbs[i][C$.DATAITEM_CHECKED]=true;
                                    zbs[i][C$.DATAITEM_MEANLINE]=true;
                                    dis.push(zbs[i]);
                                }
                            }

                            /**
                             * 计算数组长度
                             * @type {number}
                             */
                            var len = 0;
                            if(dtls[C$.RESULT_LEN]){
                                len = dtls[C$.RESULT_LEN];
                            }else{
                                if(!!dtls&&!!dis[0]&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                                    len = dtls[dis[0][C$.RESULT_ID]].length;
                                }
                            }

                            /**
                             * X轴结果集重组，格式为
                             * [val1,val2,...]
                             */
                            for(var id in def.dataItem.x){
                                if(!!dtls&&!!dtls[id]){
                                    len = dtls[id][C$.RESULT_VAL].length;
                                }
                                for(var i=0;i<len;i++){
                                    categories.push((dtls[id][C$.RESULT_VAL][i]+"").replace(/\s*/g,""));
                                }
                                break;
                            }
                            /**
                             * Y轴结果集重组，格式为
                             * [{id1:[val1,val2....]},{id2:[val1,val2...]},...]
                             */
                            for(var j in dis){
                                curIdx = dis[j][C$.RESULT_ID],curRow = [];
                                if(!!dtls[curIdx]){
                                    if(dis[j][C$.RESULT_TYPE]!=C$.DATATYPE_STRING){
                                        //过滤出数值类型带引号的字符串
                                        if(!!dtls[curIdx][C$.RESULT_VAL][0]&&typeof dtls[curIdx][C$.RESULT_VAL][0]=="string"){
                                            for(var r in dtls[curIdx][C$.RESULT_VAL]){
                                                curRow.push(Number(dtls[curIdx][C$.RESULT_VAL][r]));
                                            }
                                        }else{
                                            curRow = dtls[curIdx][C$.RESULT_VAL];
                                        }
                                    }else{
                                        curRow = dtls[curIdx][C$.RESULT_VAL];
                                    }
                                    series[dis[j][C$.RESULT_VAL]] = curRow;
                                }
                            }
                            _dataset.clrData(C$.FIGURE_CHART);
                            _dataset.setData(C$.DATASET_CATEGORIES, categories);
                            _dataset.setData(C$.DATASET_SERIES, series);
                            _dataset.setData(C$.DATASET_CDI_Y, dis);
                            _dataset.setSize(dtls[C$.RESULT_LEN]);
                        }else{
                            var xVal = [],yVal = [];
                            if(!!def.dataItem.x){
                                /**
                                 * 计算数组长度
                                 * @type {number}
                                 */
                                var len = 0;
                                if(dtls[C$.RESULT_LEN]){
                                    len = dtls[C$.RESULT_LEN];
                                }else{
                                    if(!!dtls&&!!dis[0]&&!!dis[0][C$.RESULT_ID]&&!!dtls[dis[0][C$.RESULT_ID]]){
                                        len = dtls[dis[0][C$.RESULT_ID]].length;
                                    }
                                }

                                /**
                                 * X轴结果集重组，格式为
                                 * [val1,val2,...]
                                 */
                                for(var id in def.dataItem.x){
                                    if(!!dtls&&!!dtls[id]){
                                        len = dtls[id][C$.RESULT_VAL].length;
                                    }
                                    for(var i=0;i<len;i++){
                                        xVal.push(dtls[id][C$.RESULT_VAL][i]);
                                    }
                                }
                            }
                            if(!!def.dataItem.y){
                                /**
                                 * Y轴结果集重组，格式为
                                 * [val1,val2,...]
                                 */
                                for(var id in def.dataItem.y){
                                    for(var i=0,len=dtls[C$.RESULT_LEN];i<len;i++){
                                        yVal.push(dtls[id][C$.RESULT_VAL][i]);
                                    }
                                }
                            }
                            _dataset.clrData(C$.FIGURE_CHART);
                            _dataset.setData(C$.DATASET_CVAL_X, xVal);
                            _dataset.setData(C$.DATASET_CVAL_Y, yVal);
                            _dataset.setSize(dtls[C$.RESULT_LEN]);
                        }
                    }
                    break;
            }
        },
        parseMap: function(_dataset){
            var rlt = _dataset.getResult();
            switch (def.format){
                case C$.FORMAT_0:
                    //TODO
                    break;
                case C$.FORMAT_1:
                case C$.FORMAT_10:
                	var dtls,idx,zbs;
                	if(def.format==C$.FORMAT_1){
                		dtls = _dataset.getResult(C$.RESULT_RLTDATA);
                		zbs = _$.jClone(rlt[C$.RESULT_DTLZB]), dis = [], val = {};
                	}else if(def.format==C$.FORMAT_10){
                		dtls = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DTL];
                		zbs = _$.jClone(rlt[C$.RESULT_DTLZB]), dis = [], val = {};
                	}
                    if(!!def.dataItem){
                        for(var i in zbs){
                            if(def.dataItem[zbs[i][C$.RESULT_ID]]!=undefined){
                                zbs[i][C$.DATAITEM_CHECKED] = def.dataItem[zbs[i][C$.RESULT_ID]].bShow;
                                zbs[i]["legendHide"]=def.dataItem[zbs[i][C$.RESULT_ID]].legendHide;
                                dis.push(zbs[i]);
                            }
                        }
                        dis.push({
                            "id":"Province"
                            ,"des":"地区（省份）"
                            ,"dataType": 2
                            ,"precision": 0
                            ,"value":"地区"
                            ,"decimal":0
                            ,"checked": false
                        });
                    }else{
                        for(var i in zbs){
                            dis.push(zbs[i]);
                        }
                    }
                    /**
                     * 结果集重组，格式为
                     * [id1:[val1,val2,...],id2:[val1,val2,...]]
                     */
                    for(var j in dis){
                        idx = dis[j][C$.RESULT_ID];
                        if(!!dtls[idx]){
                            val[idx] = dtls[idx];
                        }
                    }
                    _dataset.clrData(C$.FIGURE_MAP);
                    _dataset.setData(C$.DATASET_MDI, dis);
                    _dataset.setData(C$.DATASET_MVAL, val);
                    _dataset.setSize(dtls[C$.RESULT_LEN]);
                    break;
            }
        },
        /**
         * 解析下拉型的数据，包括单选、多选
         * @param _dataset 被解析的数据集对象
         */
        parseSel: function(_dataset){
            switch (def.format){
                case C$.FORMAT_0:
                    var opts = _dataset.getResult();
                    _dataset.clrData(C$.FIGURE_SEL);
                    _dataset.setData(C$.FIGURE_SEL, opts);
                    break;
                case C$.FORMAT_1:
                    var opts = {},dtls = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DTL];
                    dtls = !!dtls?dtls:{};
                    /**
                     * 结果集重组，格式为
                     * {id1:name1,id2:name2,,...}
                     */
                    for(var i=0,len = dtls[C$.RESULT_LEN];i<len;i++){
                        opts[dtls[C$.RESULT_ID][C$.RESULT_VAL][i]] = dtls[C$.RESULT_NAME][C$.RESULT_VAL][i];
                    }

                    _dataset.clrData(C$.FIGURE_SEL);
                    _dataset.setData(C$.FIGURE_SEL, opts);
                    _dataset.setSize(dtls[C$.RESULT_LEN]);
                    break;
                case C$.FORMAT_11:
                	var dtls = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DTL];
                	dtls = !!dtls?dtls:{};
                	_dataset.clrData(C$.FIGURE_SEL);
                	_dataset.setData(C$.FIGURE_SEL, dtls);
                	_dataset.setSize(dtls[C$.RESULT_LEN]);
                	break;
                case C$.FORMAT_12:
                    var opts = {},dtls = _dataset.getResult(C$.RESULT_RLTDATA)[C$.RESULT_DTL];
                    dtls = !!dtls?dtls:{};
                    var ids = !!dtls[def.formatKey[0]]?dtls[def.formatKey[0]][C$.RESULT_VAL]:{}, vals = !!dtls[def.formatKey[1]]?dtls[def.formatKey[1]][C$.RESULT_VAL]:{};
                    /**
                     * 结果集重组，格式为
                     * {id1:name1,id2:name2,,...}
                     */
                    for(var i=0,len = dtls.length;i<len;i++){
                        opts[ids[i]] = vals[i];
                    }
                    _dataset.clrData(C$.FIGURE_SEL);
                    _dataset.setData(C$.FIGURE_SEL, opts);
                    _dataset.setSize(dtls[C$.RESULT_LEN]);
                    break;
                case C$.FORMAT_2:
                    _dataset.setResult({"advCntntTypes":[{"arrayValue":"商品","arrayParent":0,"arrayId":1},{"arrayValue":"活动","arrayParent":0,"arrayId":2},{"arrayValue":"店铺","arrayParent":0,"arrayId":3},{"arrayValue":"其他","arrayParent":0,"arrayId":99}]});
                    var opts = {},dtls = _dataset.getResult()[def.formatKey];
                    dtls = !!dtls?dtls:{};
                    /**
                     * 结果集重组，格式为
                     * {id1:name1,id2:name2,,...}
                     */
                    for(var i=0,len = dtls.length;i<len;i++){
                        opts[dtls[i][C$.RESULT_ARRAYID]] = dtls[i][C$.RESULT_ARRAYVALUE];
                    }

                    _dataset.clrData(C$.FIGURE_SEL);
                    _dataset.setData(C$.FIGURE_SEL, opts);
                    _dataset.setSize(dtls[C$.RESULT_LEN]);
                    break;
                
            }
        },
        /**
         * 解析结果集，并生成规范的数据集并返回
         * @param _dataset
         * @returns {*}
         */
        parse: function(_dataset){
            switch(def.figure){
                case C$.FIGURE_LIST:
                    func.parseList(_dataset);
                    break;
                case C$.FIGURE_TBL:
                    func.parseTbl(_dataset);
                    break;
                case C$.FIGURE_CHART:
                    func.parseChart(_dataset);
                    break;
                case C$.FIGURE_MAP:
                    func.parseMap(_dataset);
                    break;
                case C$.FIGURE_SEL:
                    func.parseSel(_dataset);
                    break;
            }
            return _dataset;
        }
    };
    return {
        init: func.init,
        parse: func.parse
    };
})(jQuery);
