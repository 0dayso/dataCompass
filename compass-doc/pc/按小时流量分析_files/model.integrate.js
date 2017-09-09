var I$ = (function(_$){
    var def = {
        ids: [],
        /**
         * {
                url: "",
                param: "",
                rlt: {}
            },
            {
                url: "",
                param: "",
                rlt: {}
            }
            ...
         */
        cache: {
            date: (new Date()).prevDay(1).Format("yyyy-MM-dd"),
            submit: []
        }
    };
    var func = {
        init: function(_ids){
            func.setIds(_ids);
        },
        setIds: function(_ids){
            if(_$.jIsArray(_ids)){
                _$.extend(def,{ids: _ids});
            }else{
                _$.extend(def,{ids: [_ids]});
            }
        },
        getIds: function(_i){
            if(!!_i){
                return def.ids[_i];
            }else{
                return def.ids;
            }
        },
        layout: function(_id, _adapter){
            var layout = _adapter.getMappingLayout(_id);
            $("#"+_id).remove();
            if(!!layout){
                //判断是否并排显示
                var width = $("#"+layout.domain).jWidth()*layout.width, widths = [];
                if(!!layout.inline){
                    $("#"+layout.domain+" .block.fl:eq(0)").append('<div id="'+_id+'" class="ml10 mb10 demo" style="border: 0px solid #EE9606;display: inline-block;'+(!!width?(';width:'+width+'px'):'')+(!!layout.height?(';height:'+layout.height+'px'):'')+(!!layout.position?";position:"+layout.position:"")+'"></div>');
                    //左侧宽度=总宽度-右侧宽度
                    width = $("#"+layout.domain).jWidth()*0.99-$("#"+layout.domain+" .block.fr:eq(0)").jWidth();
                    $("#"+_id).prev().css({"display": "inline-block"});
                    $("#"+layout.domain+" .block.fl:eq(0)").jWidth(width+"px");
                }else{
                    if(layout.bRight){
                        $("#"+layout.domain+" .block.fr:eq(0)").append('<div id="'+_id+'" class="mb10 demo" style="border: 0px solid #EE9606'+(!!width?(';width:'+width+'px'):'')+(!!layout.height?(';height:'+layout.height+'px'):'')+(!!layout.position?';position:'+layout.position:'')+'"></div>');
                        $("#"+layout.domain+" .block.fr:eq(0)").children(".demo").each(function(){
                            widths.push($(this).jWidth());
                        });
                        width = $.jArrayMax(widths);
                        $("#"+layout.domain+" .block.fr:eq(0)").jWidth(width+"px");
                        //左侧宽度=总宽度-右侧宽度
                        width = $("#"+layout.domain).jWidth()*0.99-$("#"+layout.domain+" .block.fr:eq(0)").jWidth();
                        $("#"+layout.domain+" .block.fl:eq(0)").jWidth(width+"px");
                    }else{
                        $("#"+layout.domain+" .block.fl:eq(0)").append('<div id="'+_id+'" class="mb10 demo" style="border: 0px solid #EE9606'+(!!width?(';width:'+width+'px'):'')+(!!layout.height?(';height:'+layout.height+'px'):'')+(!!layout.position?';position:'+layout.position:'')+'"></div>');
                        //左侧宽度=总宽度-右侧宽度
                        width = $("#"+layout.domain).jWidth()*0.99-$("#"+layout.domain+" .block.fr:eq(0)").jWidth();
                        $("#"+layout.domain+" .block.fl:eq(0)").jWidth(width+"px");
                    }
                }
                //扩展插件参数配置容器的宽度，提供给渲染层调用
                if(!_adapter.getMappingPlugin(_id).width){
                    _adapter.extMappingPlugin(_id, {width: width});
                }
            }
        },
        /**
         * 设置容器ID缓存记录
         * @param _ids
         */
        setIdCache: function(_ids){
            def.cache[C$.CACHE_IDS] = _ids;
        },
        /**
         * 获取容器ID缓存记录
         * @param _ids
         */
        getIdCache: function(){
            return def.cache[C$.CACHE_IDS];
        },
        /**
         * 扩展容器ID缓存记录
         * @param _date
         */
        extIdCache: function(_id){
            if(!def.cache[C$.CACHE_IDS]){
                def.cache[C$.CACHE_IDS] = [];
            }
            _$.merge(def.cache[C$.CACHE_IDS], [_id]);
            _$.unique(def.cache[C$.CACHE_IDS]);
        },
        /**
         * 缓存记录当前日期，过滤器中的查询项
         * @param _date
         */
        setDateCache: function(_date){
            def.cache[C$.CACHE_DATE] = _date;
        },
        /**
         * 获取当前日期
         * @returns {*}
         */
        getDateCache: function(){
            return def.cache[C$.CACHE_DATE];
        },
        /**
         * 如果已经提交过相同的参数和路径，则结果集相同，直接返回缓存结果集
         * @param _id
         * @param _adapter
         */
        getAdapterCache: function(_id, _adapter){
            var submitCache = !!def.cache[C$.CACHE_SUBMIT]?def.cache[C$.CACHE_SUBMIT]:[];
            for(var i in submitCache){
                if(submitCache[i][C$.CACHE_ACTION]==_adapter.getMappingAction(_id)&&_$.jCompJson(submitCache[i][C$.CACHE_PARAM],_adapter.getMappingParam(_id))){
                    return submitCache[i][C$.CACHE_RLT];
                }
            }
            return null;
        },
        /**
         * 修改适配器缓存内容
         * @param _id
         * @param _adapter
         * @param _cache
         */
        setAdapterCache: function(_id, _adapter, _cache){
            var submitCache = !!def.cache[C$.CACHE_SUBMIT]?def.cache[C$.CACHE_SUBMIT]:[];
            for(var i in submitCache){
                if(submitCache[i][C$.CACHE_ACTION]==_adapter.getMappingAction(_id)&&_$.jCompJson(submitCache[i][C$.CACHE_PARAM],_adapter.getMappingParam(_id))){
                    submitCache[i][C$.CACHE_RLT] = _cache[C$.CACHE_RLT];
                    submitCache[i][C$.CACHE_ACTION] = _cache[C$.CACHE_ACTION];
                    submitCache[i][C$.CACHE_PARAM] = _cache[C$.CACHE_PARAM];
                    break;
                }
            }
        },
        /**
         * 清除适配器指定缓存内容
         * @param _id
         * @param _adapter
         */
        clrAdapterCache: function(_id, _adapter){
            var submitCache = !!def.cache[C$.CACHE_SUBMIT]?def.cache[C$.CACHE_SUBMIT]:[];
            if(!!_id&&!!_adapter){
                for(var i in submitCache){
                    if(submitCache[i][C$.CACHE_ACTION]==_adapter.getMappingAction(_id)&&_$.jCompJson(submitCache[i][C$.CACHE_PARAM],_adapter.getMappingParam(_id))){
                        submitCache.splice(i, 1);
                        def.cache[C$.CACHE_SUBMIT] = submitCache;
                    }
                }
            }else{
                def.cache[C$.CACHE_SUBMIT] = [];
            }
        },
        /**
         * 设置DEFAULT模式的传递参数缓存
         * @param _jsonParam
         */
        setDefaultParamCache: function(_jsonParam){
            def.cache[C$.CACHE_JSONPARAM] = _jsonParam;
        },
        /**
         * 扩展DEFAULT模式的传递参数缓存
         * @param _jsonParam
         */
        extDefaultParamCache: function(_jsonParam){
            _$.extend(def.cache[C$.CACHE_JSONPARAM],_jsonParam);
        },
        /**
         * 获取DEFAULT模式的传递参数缓存
         * @param _jsonParam
         */
        getDefaultParamCache: function(){
            return def.cache[C$.CACHE_JSONPARAM];
        },
        /**
         * 指定的元素运行构造、渲染程序
         * @param _adapter
         */
        run: function(_adapter){
            for(var i in def.ids){
                if(!!_adapter.getMappingLayout(def.ids[i])){
                    func.layout(def.ids[i], _adapter);
                }
                if(_adapter.ifAjax(def.ids[i])){
                    func.post(def.ids[i], _adapter);
                }else{
                    func.load(def.ids[i], _adapter);
                }
            }
        },
        /**
         * 适配中的所有元素进行局部交互
         * @param _adapter
         */
        postAll: function(_adapter){
            var maps =  _adapter.getMapping();
            for(var id in maps){
                func.post(id, _adapter);
            }
        },
        /**
         * 需要局部交互的指定元素提交请求后，进行构造、渲染
         * @param _id
         * @param _adapter
         */
        post: function(_id, _adapter){
            var cacheRlt = func.getAdapterCache(_id, _adapter);
            if(!!cacheRlt){
                if(!!_adapter.getMappingCustomRender(_id)){
                    eval(_adapter.getMappingCustomRender(_id)+"(cacheRlt)");
                }else{
                    R$.init(_id, _adapter)
                        .exec(
                            P$.init(_id,_adapter)
                                .parse(
                                    D$.build(cacheRlt)
                                )
                        );
                }
            }else{
                var mapping = {};
                mapping[C$.CACHE_ACTION] = ""+_adapter.getMappingAction(_id);
                mapping[C$.CACHE_PARAM] = _$.extend({},_adapter.getMappingParam(_id));

                _$.ajax({
                    url : mapping[C$.CACHE_ACTION],
                    type : "post",
                    dataType : !!_adapter.getMappingAjaxType(_id)?_adapter.getMappingAjaxType(_id):"json",
                    data : _$.param(mapping[C$.CACHE_PARAM], true),
                    async: _adapter.ifAsync(_id)?true:false,
                    success : function(_rlt){
                        if(!!_rlt){
                            if(!!_adapter.getMappingCustomRender(_id)){
                                eval(_adapter.getMappingCustomRender(_id)+"(_id,_rlt)");
                            }else{
                                mapping[C$.CACHE_RLT] = _rlt;
                                R$.init(_id, _adapter)
                                    .exec(
                                        P$.init(_id,_adapter)
                                            .parse(
                                                D$.build(_rlt)
                                            )
                                    );
                                //默认框架缓存保留近10条数据
                                if(def.cache[C$.CACHE_SUBMIT].length==C$.CACHE_MAX){
                                    def.cache[C$.CACHE_SUBMIT].splice(0,1,mapping);
                                }
                                def.cache[C$.CACHE_SUBMIT].push(mapping);
                            }
                        }
                        if(_adapter.ifAsync(_id)){
                            _$.unblockUIV2();
                        }
                    },
                    error : function(s, error) {
                        _$.jLog("Error:"+error);
                    }
                });
            }
        },
        /**
         * 无需局部交互的指定元素进行构造、渲染
         * @param _id
         * @param _adapter
         */
        load: function(_id, _adapter){
            //无需局部交互的数据集无需解析，设置为空对象或者自定义数据
            if(!!_adapter.getMappingCustomData(_id)){
                R$.init(_id, _adapter)
                    .exec(
                        P$.init(_id,_adapter)
                            .parse(
                                D$.build(_adapter.getMappingCustomData(_id))
                            )
                    );
            }else{
                R$.init(_id, _adapter).exec({});
            }
        },
        /**
         * AJAX异步提交请求
         * @param _url
         * @param _param
         * @param _callback
         */
        submit: function(_url, _param, _callback, _bReturn){
            var setting = {
                    url : _url,
                    type : "post",
                    data : _$.param(_param, true),
                    success : function(_rlt){
                        _callback(_rlt);
                    }
            };
            if(_bReturn){
                _$.extend(setting, {dataType : "json"});
            }
            $.ajax(setting);
        }
    }
    return {
        init: func.init,
        post: func.post,
        postAll: func.postAll,
        run: func.run,
        setIds: func.setIds,
        getIds: func.getIds,
        getUrl: func.getUrl,
        setUrl: func.setUrl,
        setIdCache: func.setIdCache,
        getIdCache: func.getIdCache,
        extIdCache: func.extIdCache,
        setDateCache: func.setDateCache,
        getDateCache: func.getDateCache,
        setAdapterCache: func.setAdapterCache,
        getAdapterCache: func.getAdapterCache,
        clrAdapterCache: func.clrAdapterCache,
        setDefaultParamCache: func.setDefaultParamCache,
        getDefaultParamCache: func.getDefaultParamCache,
        extDefaultParamCache: func.extDefaultParamCache,
        submit: func.submit
    };
})(jQuery);
