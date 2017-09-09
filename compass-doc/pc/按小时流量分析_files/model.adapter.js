var A$ = (function(_$){
    var url = {
        DEFAULT: C$.PATH+"/config/queryData.action",
        A: C$.PATH+"/dataModel/getOperDailyReportInitData.action",
        B: C$.PATH+"/advancedDataModel/getAdPromotionPlan.action",
        C: C$.PATH+"/dataModel/getViewFrequencyResult.action",
        D: C$.PATH+"/dataModel/getCustAreaReportResult.action",
        E: C$.PATH+"/advancedDataModel/getShop2IndustryResult.action",//已废弃勿用
        F: C$.PATH+"/interDataModel/getPopAdvResType.action",
        G: C$.PATH+"/interDataModel/getPopAdvPutCntnt.action",
        H: C$.PATH+"/interDataModel/getPopAdvCntntReportResult.action",
        I: C$.PATH+"/consoleMng/getLeftMenuInfoByType.action",
        J: C$.PATH+"/consoleMng/updateLeftMenuInfo.action",
        K: C$.PATH+"/consoleMng/deleteLeftMenuInfo.action",
        L: C$.PATH+"/consoleMng/getErpUserByMngGroup.action",
        M: C$.PATH+"/consoleMng/addErpUserToMngGroup.action",
        N: C$.PATH+"/consoleMng/deleteErpUser.action",
        O: C$.PATH+"/consoleMng/getMenuInfoByVersion.action",
        P: C$.PATH+"/consoleMng/updateMenuGroupInfo.action",
        Q: C$.PATH+"/consoleMng/deleteMenuGroupInfo.action",
        R: C$.PATH+"/consoleMng/deleteMenuInfoById.action"
    };
    var interact = {
        DEFAULT: function(_actId, _jsonParam, _css){
            I$.setDefaultParamCache(_jsonParam);
            if(!!_css){
                _$(_css).each(function(){
                  $(this).click();
                });
            }else{
                for(var i in I$.getIdCache()){
                    if(I$.getIdCache()[i]!=_actId){
                        I$.clrAdapterCache(I$.getIdCache()[i], A$);
                        I$.init(I$.getIdCache()[i]);
                        I$.run(A$);
                    }
                }
            }
        },
        A: function(_flt, _param){
            for(var id in A$.getMapping()){
                A$.extMappingParam(id, _flt, _param);
                I$.post(id, A$);
            }
        },
        B: function(_actId, _flt, _param){
            A$.extMappingParam(_actId, _flt, _param);
            I$.post(_actId, A$);
        },
        C: function(_actId, _paramJson, _ext){
            A$.extMappingParam(_actId, _paramJson);
            if(!!_ext&&!!_ext[C$.CACHE_DATE]){
                I$.setDateCache(_ext[C$.CACHE_DATE]);
            }
            I$.post(_actId, A$);
        },
        D: function(_actId){
            I$.init([_actId]);
            I$.run(A$);
        }
    };
    var mapping = {
//        /**
//         * 页面元素的ID，如:
//         * <div id="demo"></div>
//         */
//        "demo": {
//            /**
//             * 组件名称
//             */
//            name: {
//              title: "经营概况明细",
//              bShow: true
//            }
//            /**
//             * 是否预览模式
//             */
//            preview: true,
//            /**
//             * 是否需要局部提交
//             */
//            ajax: false,
//            /**
//             * 是否执行异步
//             */
//            async: true,
//            model: "",
//            /**
//             * 局部请求的跳转路径，包括A/B/C/D...,分别对应*.action/do...
//             */
//            action: "A",
//            /**
//             * 跳转时接收的参数，自定义设置
//             */
//            param: "a=1&b=2",
//            /**
//             * 返回的结果格式
//             * 1-{resultData:{detail:{},summary:{}},allDetailZBs:{},allSumZBS:{}}
//             * 0-自定义格式，需要配置formatKey，格式为[key1,key2...],默认为[]
//             */
//           format: 1,
//            /**
//             * 自定义结果集的1st key
//             */
//           formatKey: ["k1","k2"],
//            /**
//             * 对象类型
//             * LIST
//             * TABLE
//             * CHART
//             * SELECT
//             * DATEPICKER
//             */
//           figure: "TABLE",
//            /**
//             * 渲染时需要的额外配置，如：
//             * 调用jQuery.DataTable插件时,插件的自身配置
//             * 调用HighCharts插件时,插件的自身配置
//             */
//           plugin: {
//                bFilter: true,          //是否加载过滤插件
//                bCustomCol: true,       //是否加载自定义列插件
//                bColDrag: true,         //是否加载表格单列拉伸插件
//                bGridSlider: true,      //是否加载表格横向滚动箭头插件
//
//                perpage: 10,             //每页行数
//                pagetype: "full_numbers"        //翻页格式。包括full_numbers、two_button
//           },
//            /**
//             * 模式参数
//             * DOM
//             * ARRAY
//             */
//           mode: "ARRAY",
//            /**
//             * 被显示和操作的数据项。结构如：
//             * 列表/表格：[id1,id2,...]
//             * 图形：{x:idx，y:[idy1,idy2,...]}
//             */
//           dataItem: {"OrdProNum":true,"OrdAmt":true,"PV":true,"UV":true},
//           dataType: "SUMMARY",
//           /**
//           * 持久化的数据立方体信息
//           */
//           cube: {
//              factTable: "",
//              indicators: [],
//              demensions: []
//           }
//           affect: {"demo1":"A","demo2":"B"},
//           /**                                                                       l
//            * 当前容器的标准布局
//            */
//           layout: {
//               domain: "data"           //"tab"（标签页，布局由标签页决定）、"data"（数据展）、"filter"（过滤面板）、空（固定领域）
//               inline: true,          //false。是否并排显示
//               width: 0.5,            //并排显示的宽度分配（0.5=50%），否则99%
//               height: 100,           //高度分配，并排的容器以大高度为准
//               position: "absolute"             //relative。相对或者绝对定位,默认相对定位
//           }
//        }
    };
    var func = {
        /**
         * 添加映射
         * @param _mapping
         */
        addMapping: function(_mapping){           //_mapping是{id:{action:?,param:?}}
            _$.extend(mapping, _mapping);
        },
        /**
         * 给固定元素添加映射
         * @param _id
         * @param _mapping {action:?,param:?}
         */
        setMapping: function(_id, _mapping){
            mapping[_id] = _mapping;
        },
        /**
         * 给固定元素扩展配置信息
         * @param _id
         * @param _mapping {action:?,param:?}
         */
        extMapping: function(_id, _mapping){
            _$.extend(mapping[_id], _mapping);
        },
        /**
         * 给固定元素设置组件名称
         * @param _id
         * @param _name
         */
        setMappingName: function(_id,  _name){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].name = _name;
        },
        /**
         * 给固定元素设置是否采用预览模式
         * @param _id
         * @param _preview
         */
        setPreview: function(_id, _preview){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].preview = _preview;
        },
        /**
         * 给固定元素设置是否需要服务端交互
         * @param _id
         * @param _ajax
         */
        setAjax: function(_id, _ajax){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].ajax = _ajax;
        },
        /**
         * 给固定元素设置服务端交互是否异步
         * @param _id
         * @param _async
         */
        setAsync: function(_id, _async){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].async = _async;
        },
        /**
         * 给固定元素添加主题模型
         * @param _id
         * @param _model
         */
        setMappingModel: function(_id, _model){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].model = _model;
        },
        /**
         * 给固定元素添加跳转映射
         * @param _id
         * @param _action
         */
        setMappingAction: function(_id, _action){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].action = _action;
        },
        /**
         * 给固定元素添加跳转参数
         * @param _id
         * @param _param
         */
        setMappingParam: function(_id, _param){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].param = _param;
        },
        /**
         * 给固定元素配置提交返回类型
         * @param _id
         * @param _type
         */
        setMappingAjaxType: function(_id, _type){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].ajaxType = _type;
        },
        /**
         * 给固定元素添加跳转参数中默认的动态传递参数
         * @param _id
         * @param _param
         */
        setMappingDefaultParam: function(_id, _param){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].param){
                mapping[_id].param = {};
            }
            if(!mapping[_id].param.jsonParams){
                mapping[_id].param.jsonParams = {};
            }
            mapping[_id].param.jsonParams = _param;
        },
        /**
         * 给固定元素扩展跳转参数中默认的动态传递参数
         * @param _id
         * @param _param
         */
        extMappingDefaultParam: function(_id, _param){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].param){
                mapping[_id].param = {};
            }
            if(!mapping[_id].param.jsonParams){
                mapping[_id].param.jsonParams = {};
            }
            _$.extend(mapping[_id].param.jsonParams, _param);

        },
        /**
         * 更改扩展参数信息
         * @param _flt
         * @param _param
         */
        extMappingParam: function(_id, _param){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if($.jIsArray(_param)){
                _$.merge(func.getMappingParam(_id), _param);
            }else{
                _$.extend(func.getMappingParam(_id), _param);
            }
        },
        /**
         * 给固定元素添加持久化的立方体数据
         * @param _id
         * @param _cube
         */
        setMappingCube: function(_id, _cube){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].cube = _cube;
        },
        /**
         * 给固定元素添加返回结果格式
         * @param _id
         * @param _format
         */
        setMappingFormat: function(_id, _format, _formatKey){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].format = _format;
            //如果结果格式是自定义，则添加自定义key
            if(_format==0){
                mapping[_id].formatKey = _formatKey;
            }
        },
        /**
         * 给固定元素添加自定义结果KEY
         * @param _id
         * @param _formatKey
         */
        setMappingFormatKey: function(_id, _formatKey){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].formatKey = _formatKey;
        },
        /**
         * 给固定元素添加自定义结果KEY
         * @param _id
         * @param _formatKey
         * @param _bKey  是否扩展KEY部分
         */
        extMappingFormatKey: function(_id, _formatKey, _bKey){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].formatKey){
                mapping[_id].formatKey = [""];
            }
            if(!!_bKey){
                mapping[_id].formatKey[0] = _formatKey;
            }else{
                mapping[_id].formatKey[1] = _formatKey;
            }
        },
        /**
         * 给指定元素添加被解析对象类型
         * @param _id
         * @param _action
         */
        setMappingFigure: function(_id, _figure){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].figure = _figure;
        },
        /**
         * 给指定元素添加元素
         * @param _id
         * @param _items
         */
        setMappingItems: function(_id,_items){
        	if(!mapping[_id]){
        		mapping[_id] = {};
        	}
        	mapping[_id].items = _items;
        },
        /**
         * 给指定元素添加渲染时调用插件的设置参数
         * @param _id
         * @param _action
         */
        setMappingPlugin: function(_id, _plugin){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].plugin = _plugin;
        },
        /**
         * 扩展插件参数的配置
         * @param _flt
         * @param _plugin
         */
        extMappingPlugin: function(_id, _plugin){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            _$.extend(func.getMappingPlugin(_id), _plugin);
        },
        /**
         * 给指定元素的插件配置扩展其当前跳转需要的参数
         * @param _id
         * @param _pluginId
         * @param _pluginParam
         */
        extMappingPluginParam: function(_id, _pluginKey, _pluginParam){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].plugin){
                mapping[_id].plugin = {};
            }
            if(!mapping[_id].plugin[_pluginKey]){
                mapping[_id].plugin[_pluginKey] = {};
            }
            if(!mapping[_id].plugin[_pluginKey].param){
                mapping[_id].plugin[_pluginKey].param = {};
            }
            _$.extend(mapping[_id].plugin[_pluginKey].param, _pluginParam);
        },
        /**
         * 给指定元素添加解析模式参数
         * @param _id
         * @param _param
         */
        setMappingMode: function(_id, _mode){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].mode = _mode;
        },
        /**
         * 给指定元素添加返回结果集的数据类型
         * SUMMRAY-汇总
         * DETAIL-明细
         * @param _id
         * @param _datatype
         */
        setMappingDataType: function(_id, _dataType){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].dataType = _dataType;
        },
        /**
         * 给指定元素添加被显示的数据项
         * @param _id
         * @param _dataItem
         */
        setMappingDataItem: function(_id, _dataItem){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].dataItem = _dataItem;
        },
        /**
         * 给指定元素添加附加数据项
         * @param _id
         * @param _dataItemExt
         */
        setMappingDataItemExt: function(_id, _dataItemExt){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].dataItemExt = _dataItemExt;
        },
        /**
         * 给指定容器的X轴添加被显示的数据项
         * @param _id
         * @param _dataItemX
         */
        setMappingDataItemX: function(_id, _dataItemX){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].dataItem){
                mapping[_id].dataItem = {};
            }
            mapping[_id].dataItem.x = _dataItemX;
        },
        /**
         * 给指定容器的X轴添加被显示的数据项
         * @param _id
         * @param _dataItemY
         */
        setMappingDataItemY: function(_id, _dataItemY){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].dataItem){
                mapping[_id].dataItem = {};
            }
            mapping[_id].dataItem.y = _dataItemY;
        },
        /**
         * 给指定元素扩展被显示的数据项
         * @param _id
         * @param _dataItem
         */
        extMappingDataItem: function(_id, _dataItem){
            _$.extend(func.getMappingDataItem(_id),_dataItem);
        },
        /**
         * 给指定元素扩展附加的数据项
         * @param _id
         * @param _dataItemExt
         */
        extMappingDataItemExt: function(_id, _dataItemExt){
            _$.extend(func.getMappingDataItemExt(_id),_dataItemExt);
        },
        /**
         * 给指定元素扩展X轴被显示的数据项
         * @param _id
         * @param _dataItemX
         */
        extMappingDataItemX: function(_id, _dataItemX){
            if(!func.getMappingDataItemX(_id)){
                func.setMappingDataItemX(_id, {});
            }
            _$.extend(func.getMappingDataItemX(_id),_dataItemX);
        },
        /**
         * 给指定元素扩展Y轴被显示的数据项
         * @param _id
         * @param _dataItemY
         */
        extMappingDataItemY: function(_id, _dataItemY){
            if(!func.getMappingDataItemY(_id)){
                func.setMappingDataItemY(_id, {});
            }
            _$.extend(func.getMappingDataItemY(_id),_dataItemY);
        },
        /**
         * 给指定元素添加触发事件和触发对象
         * @param _id
         * @param _affect
         */
        setMappingAffect: function(_id, _affect){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].affect = _affect;
        },
        /**
         * 给指定元素设置布局
         * @param _id
         * @param _layout
         */
        setMappingLayout: function(_id, _layout){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            mapping[_id].layout = _layout;
        },
        /**
         * 设置自定义的配置
         * @param _id
         * @returns {*}
         */
        setMappingCustom: function(_id, _custom){
            mapping[_id].custom = _custom;
        },
        /**
         * 设置自定义的解析渲染方法
         * @param _id
         * @returns {*}
         */
        setMappingCustomRender: function(_id, _customRender){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].custom){
                mapping[_id].custom = {};
            }
            mapping[_id].custom.customRender = _customRender;
        },
        /**
         * 设置自定义的数据集
         * @param _id
         * @returns {*}
         */
        setMappingCustomData: function(_id, _customData){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].custom){
                mapping[_id].custom = {};
            }
            mapping[_id].custom.customData = _customData;
        },
        /**
         * 设置自定义的数据项
         * @param _id
         * @returns {*}
         */
        setMappingCustomDataItem: function(_id, _customDataItem){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].custom){
                mapping[_id].custom = {};
            }
            mapping[_id].custom.customDataItem = _customDataItem;
        },
        /**
         * 根据元素获取对应的映射
         * @param _id
         * @returns {*}
         */
        getMapping: function(_id){
            if(!!_id){
                return mapping[_id];
            }else{
                return mapping;
            }
        },
        /**
         * 获取预览配置信息
         * @returns {*}
         */
        getPreviewMapping: function(){
            return mapping[C$.ADAPTER_PREVIEW];
        },
        /**
         * 根据元素获取组件名称
         * @param _id
         * @returns {*}
         */
        getMappingName: function(_id){
            return mapping[_id].name;
        },
        /**
         * 判断当前适配是否采用预览模式
         * @param _id
         * @returns {boolean}
         */
        ifPreview: function(_id){
            return !!mapping[_id].preview;
        },
        /**
         * 判断当前适配是否需要进行服务端交互
         * @param _id
         * @returns {boolean}
         */
        ifAjax: function(_id){
            return !!mapping[_id].ajax;
        },
        /**
         * 判断当前适配交互是否需要进行异步
         * @param _id
         * @returns {boolean}
         */
        ifAsync: function(_id){
            return !!mapping[_id].async;
        },
        /**
         * 根据元素获取主题模型
         * @param _id
         * @returns {*}
         */
        getMappingModel: function(_id){
            return mapping[_id].model;
        },
        /**
         * 根据元素获取跳转
         * @param _id
         * @returns {*}
         */
        getMappingAction: function(_id){
            if(!_id){
                return url;
            }else{
                //判断是否直接配置请求路径
                if(mapping[_id].action.indexOf("/")>=0){
                    return mapping[_id].action;
                }
                return url[mapping[_id].action];
            }
        },
        /**
         * 根据元素获取跳转参数
         * @param _id
         * @returns {*}
         */
        getMappingDefaultParam: function(_id){
            return mapping[_id].param.jsonParams;
        },
        /**
         * 根据元素获取异步提交返回类型
         * @param _id
         * @returns {*}
         */
        getMappingAjaxType: function(_id){
            return mapping[_id].ajaxType;
        },
        /**
         * 根据元素获取跳转参数
         * @param _id
         * @returns {*}
         */
        getMappingParam: function(_id){
            return mapping[_id].param;
        },
        /**
         * 根据元素获取持久化的立方体数据
         * @param _id
         * @returns {*}
         */
        getMappingCube: function(_id){
            return mapping[_id].cube;
        },
        /**
         * 根据元素获取返回结果集的格式
         * @param _id
         * @returns {*}
         */
        getMappingFormat: function(_id){
            return !!mapping[_id].format?mapping[_id].format:C$.FORMAT_0;
        },
        /**
         * 根据元素获取返回结果集自定义KEY
         * @param _id
         * @returns {*}
         */
        getMappingFormatKey: function(_id){
            return !!mapping[_id].formatKey?mapping[_id].formatKey:null;
        },
       /**
         * 根据元素获取解析数据集的对象类型
         * @param _id
         * @returns {string|D$.figure}
         */
        getMappingFigure: function(_id){
            return mapping[_id].figure;
        },
        /**
         * 根据元素获取渲染时调用的插件设置参数
         * @param _id
         * @returns {string|D$.plugin}
         */
        getMappingPlugin: function(_id){
            return mapping[_id].plugin;
        },
        /**
         * 根据元素获取解析数据集的模式
         * @param _id
         * @returns {string|D$.figure}
         */
        getMappingMode: function(_id){
            return mapping[_id].mode;
        },
        /**
         * 根据元素获取被解析部分的类型
         * summary
         * detail
         * @param _id
         * @returns {*}
         */
        getMappingDataType: function(_id){
            return mapping[_id].dataType;
        },
        /**
         * 根据元素获取被显示数据项
         * @param _id
         * @returns {*}
         */
        getMappingDataItem: function(_id){
            return mapping[_id].dataItem;
        },
        /**
         * 根据元素获取附加数据项
         * @param _id
         * @returns {*}
         */
        getMappingDataItemExt: function(_id){
            return mapping[_id].dataItemExt;
        },
        /**
         * 获取指定容器的数据项
         * @param _id
         */
        getMappingDataItemX: function(_id){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].dataItem){
                mapping[_id].dataItem = {};
            }
            return mapping[_id].dataItem.x;
        },
        /**
         * 获取指定容器的Y轴的数据项
         * @param _id
         */
        getMappingDataItemY: function(_id){
            if(!mapping[_id]){
                mapping[_id] = {};
            }
            if(!mapping[_id].dataItem){
                mapping[_id].dataItem = {};
            }
            return mapping[_id].dataItem.y;
        },
        /**
         * 根据元素获取元素集
         * @param _id
         * @returns {*}
         */
        getMappingItems: function(_id){
        	return mapping[_id].items;
        },
        
        /**
         * 根据元素获取当前触发事件函数
         * @param _id
         * @returns {*}
         */
        getMappingAffect: function(_id){
            var affects = mapping[_id].affect, interacts = {};
            for(var actId in affects){
                if(actId==C$.AFFECT_ALL){
                    for(var i in I$.getIds()){
                        //实现交互功能时，排除自身元素
                        if(I$.getIds(i)!=_id){
                            interacts[I$.getIds(i)] = interact[affects[actId]];
                        }
                    }
                    break;
                }else if(actId==C$.AFFECT_PAGE){
                    interacts[_id] = interact[affects[actId]];
                    break;
                }else if(actId==C$.AFFECT_GROUP){
                    for(var id in mapping){
                        //如果当前元素属于指定容器
                        if(!!mapping[id].layout&&!!mapping[_id].plugin.group[mapping[id].layout.domain]){
                            interacts[mapping[id].layout.domain+"."+id] = interact[affects[actId]];
                        }
                   }
                }else{
                    interacts[actId] = interact[affects[actId]];
                }
            }
            return interacts;
        },
        /**
         * 获取指定元素的布局设置
         * @param _id
         * @returns {*}
         */
        getMappingLayout: function(_id){
           return mapping[_id].layout;
        },
        /**
         * 获取自定义的配置
         * @param _id
         * @returns {*}
         */
        getMappingCustom: function(_id){
            return mapping[_id].custom;
        },
        /**
         * 获取自定义的解析渲染方法
         * @param _id
         * @returns {*}
         */
        getMappingCustomRender: function(_id){
            if(!mapping[_id].custom){
                mapping[_id].custom = {};
            }
            return mapping[_id].custom.customRender;
        },
        /**
         * 获取自定义的数据集
         * @param _id
         * @returns {*}
         */
        getMappingCustomData: function(_id){
            if(!mapping[_id].custom){
                mapping[_id].custom = {};
            }
            return mapping[_id].custom.customData;
        },
        /**
         * 获取自定义的数据项
         * @param _id
         * @returns {*}
         */
        getMappingCustomDataItem: function(_id){
            if(!mapping[_id].custom){
                mapping[_id].custom = {};
            }
            return mapping[_id].custom.customDataItem;
        },
        /**
         * 获取映射配置的个数
         * @returns {number}
         */
        getMappingLen: function(){
            var i = 0;
            for(var id in mapping){
                i++;
            }
            return i;
        },
        /**
         * 清空映射配置或者删除固定元素的映射配置
         * @param _id
         */
        clrMapping: function(_id){
            if(!!_id){
                mapping[_id] = {};
            }else{
                mapping = {};
            }
        },
        /**
         * 清空配置中参数设置
         * @param _id
         */
        clrMappingParam: function(_id){
            if(!!_id){
                mapping[_id].param = {};
            }
        },
        /**
         * 给指定元素增加子标题，如：
         * 2012年5月31日
         * 2012年6月1日 ~ 2012年9月1日
         * @param _id
         * @param _title
         */
        setPluginSubtitle: function(_id, _title){
            if(!!mapping[_id]){
                if(!mapping[_id].plugin){
                    mapping[_id].plugin = {};
                }else{
                    mapping[_id].plugin.subtitle = _title;
                }
            }
        }
    };
    return {
        init: func.init,
        getMapping: func.getMapping,
        getPreviewMapping: func.getPreviewMapping,
        getMappingAction: func.getMappingAction,
        getMappingModel: func.getMappingModel,
        getMappingName: func.getMappingName,
        getMappingAjaxType: func.getMappingAjaxType,
        getMappingParam: func.getMappingParam,
        getMappingDefaultParam: func.getMappingDefaultParam,
        getMappingCube: func.getMappingCube,
        getMappingFormat: func.getMappingFormat,
        getMappingFigure: func.getMappingFigure,
        getMappingPlugin: func.getMappingPlugin,
        getMappingMode: func.getMappingMode,
        getMappingFormatKey: func.getMappingFormatKey,
        getMappingDataType: func.getMappingDataType,
        getMappingDataItem: func.getMappingDataItem,
        getMappingDataItemExt: func.getMappingDataItemExt,
        getMappingDataItemX: func.getMappingDataItemX,
        getMappingDataItemY: func.getMappingDataItemY,
        getMappingAffect: func.getMappingAffect,
        getMappingLayout: func.getMappingLayout,
        getMappingItems : func.getMappingItems,
        getMappingCustomRender : func.getMappingCustomRender,
        getMappingCustom : func.getMappingCustom,
        getMappingCustomData : func.getMappingCustomData,
        getMappingCustomDataItem : func.getMappingCustomDataItem,
        ifAjax: func.ifAjax,
        ifAsync: func.ifAsync,
        ifPreview: func.ifPreview,

        setMappingItems : func.setMappingItems,
        setMapping: func.setMapping,
        extMapping: func.extMapping,
        setMappingModel: func.setMappingModel,
        setMappingAction: func.setMappingAction,
        setMappingName: func.setMappingName,
        setMappingParam: func.setMappingParam,
        setMappingAjaxType: func.setMappingAjaxType,
        extMappingParam: func.extMappingParam,
        setMappingDefaultParam: func.setMappingDefaultParam,
        extMappingDefaultParam: func.extMappingDefaultParam,
        setMappingCube: func.setMappingCube,
        setMappingFormat: func.setMappingFormat,
        setMappingFormatKey: func.setMappingFormatKey,
        extMappingFormatKey: func.extMappingFormatKey,
        setMappingFigure: func.setMappingFigure,
        setMappingPlugin: func.setMappingPlugin,
        extMappingPlugin: func.extMappingPlugin,
        extMappingPluginParam: func.extMappingPluginParam,
        setMappingMode: func.setMappingMode,
        setMappingDataType: func.setMappingDataType,
        setMappingDataItem: func.setMappingDataItem,
        setMappingDataItemExt: func.setMappingDataItemExt,
        setMappingDataItemX: func.setMappingDataItemX,
        setMappingDataItemY: func.setMappingDataItemY,
        extMappingDataItem: func.extMappingDataItem,
        extMappingDataItemExt: func.extMappingDataItemExt,
        extMappingDataItemX: func.extMappingDataItemX,
        extMappingDataItemY: func.extMappingDataItemY,
        setMappingAffect: func.setMappingAffect,
        setMappingLayout: func.setMappingLayout,
        setAjax: func.setAjax,
        setAsync: func.setAsync,
        setPreview: func.setPreview,
        setPluginSubtitle: func.setPluginSubtitle,
        setMappingCustom: func.setMappingCustom,
        setMappingCustomData: func.setMappingCustomData,
        setMappingCustomDataItem: func.setMappingCustomDataItem,

        clrMapping: func.clrMapping,
        clrMappingParam: func.clrMappingParam
    }
})(jQuery);
