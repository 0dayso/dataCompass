var D$ = (function(_$, _ds){
    _ds.def = {
        format: C$.FORMAT_0,
        formatKey: [],
        /**
         * 数据集的模式定义
         * TABLE-table
         * CHART-chart
         * SELECT-select
         */
        figure: C$.FIGURE_TBL
    },
    /**
     * 原始结果集
     * @format==0
     * {
     *  resultdata: {
     *      summary: {
     *          id1: {
     *              value: []
     *          },
     *          id2: {
     *              value: []
     *          }
     *      },
     *      detail: {
     *          id1: {
     *              value: []
     *          },
     *          id2: {
     *              value: []
     *          }
     *      }
     *  }
     * },
     * allSummaryZBs: {
     *  id: ?,
     *  des: ?,
     *  dataType: ?,
     *  value: ?,
     *  decimal: ?
     * },
     * allDetailZBs: {
     *  id: ?,
     *  des: ?,
     *  dataType: ?,
     *  value: ?,
     *  decimal: ?
     * }
     */
    _ds.rlt = {

    },
    /**
     * 解析后的数据集
     */
    _ds.data = {
        list: {
            /**
             * list name。内部结构，如
             * id: [val,des,dataType,decimal,precision]
             * val-0
             * des-1
             * dataType-2
             * decimal-3
             * precision-4
             */
            ln: {

            },
            /**
             * list item。内部结构，如
             * id: val
             */
            li: {

            },
            /**
             * data item of list。内部结构，如
             * [id1,id2,...]
             */
            di: []
        },
        table:  {
            /**
             * thead
             */
            th: {

            },
            /**
             * tbody
             */
            tb: {},
            /**
             * data item of table。内部结构，如
             * [id1,id2,...]
             */
            di: []
        },
        chart: {
            /**
             * 分类
             */
            categories: {},
            /**
             *
             */
            series: {},
            /**
             * data item of chart。内部结构，如
             * {x:idx,y:[idy1,idy2,...]}
             */
            di: {}
        },
        /**
         * 内部结构
         * {val1: txt1,val2: txt2,...}
         */
        sel: {

        },
        size: 0,
        /**
         * key-value结构的数据
         */
        kv: {}
    };
    /**
     * 数据集对象构造
     * @param _rlt      response的原始结果集
     */
    _ds.build = function(_rlt){
        _ds.rlt = _rlt;
        return _ds;
    };
    _ds.getFigure = function(){
        return _ds.def.figure;
    };
    _ds.setResult = function(_rlt){
        _ds.rlt = _rlt;
    };
    _ds.getResult = function(_rltKey){
        if(!!_rltKey){
            if(_ds.rlt!={}){
                return eval("("+_ds.rlt[_rltKey]+")");
            }else{
                return {};
            }
        }else{
            return _ds.rlt;
        }
    };
    _ds.getFormat = function(){
        if(!!_ds.def.format&&_ds.def.format==0){
            return [_ds.def.format, _ds.def.formatKey];
        }else{
            return  _ds.def.format;
        }
    };
    _ds.getSize = function(){
        return _ds.data.size;
    };
    _ds.setSize = function(_size){
        _ds.data.size = _size;
    };
    _ds.setData = function(_figure, _val){
        if(!!_figure){
            switch(_figure){
                case C$.FIGURE_LIST:  _ds.data.list = _val;break;
                case C$.DATASET_LN:
                    if(!_ds.data.list){
                        _ds.data.list = {};
                    }
                    _ds.data.list.ln = _val;break;
                case C$.DATASET_LI:
                    if(!_ds.data.list){
                        _ds.data.list = {};
                    }
                    _ds.data.list.li = _val;break;
                case C$.DATASET_LDI:
                    if(!_ds.data.list){
                        _ds.data.list = {};
                    }
                    _ds.data.list.di = _val;break;
                case C$.DATASET_CDI:
                    if(!_ds.data.list){
                        _ds.data.list = {};
                    }
                    _ds.data.list.di = _val;break;
                case C$.FIGURE_TBL:  _ds.data.table = _val;break;
                case C$.DATASET_TH:
                    if(!_ds.data.table){
                        _ds.data.table = {};
                    }
                    _ds.data.table.th = _val;break;
                case C$.DATASET_TB:
                    if(!_ds.data.table){
                        _ds.data.table = {};
                    }
                    _ds.data.table.tb = _val;break
                case C$.DATASET_TDI:
                    if(!_ds.data.table){
                        _ds.data.table = {};
                    }
                    _ds.data.table.di = _val;break;
                case C$.FIGURE_CHART:  _ds.data.chart = _val;break;
                case C$.DATASET_SERIES:
                    if(!_ds.data.chart){
                        _ds.data.chart = {};
                    }
                    _ds.data.chart.series = _val;break;
                case C$.DATASET_CATEGORIES:
                    if(!_ds.data.chart){
                        _ds.data.chart = {};
                    }
                    _ds.data.chart.categories = _val;break;
                case C$.FIGURE_SEL:  _ds.data.select = _val;break;
                case C$.DATASET_CDI:
                    if(!_ds.data.chart){
                        _ds.data.chart = {};
                    }
                    _ds.data.chart.di = _val;break;
                case C$.DATASET_CDI_X:
                    if(!_ds.data.chart){
                        _ds.data.chart = {};
                    }
                    if(!_ds.data.chart.di){
                        _ds.data.chart.di = {};
                    }
                    _ds.data.chart.di.x = _val;break;
                case C$.DATASET_CDI_Y:
                    if(!_ds.data.chart){
                        _ds.data.chart = {};
                    }
                    if(!_ds.data.chart.di){
                        _ds.data.chart.di = {};
                    }
                    _ds.data.chart.di.y = _val;break;
                case C$.DATASET_CVAL_X:
                    if(!_ds.data.chart){
                        _ds.data.chart = {};
                    }
                    if(!_ds.data.chart.val){
                        _ds.data.chart.val = {};
                    }
                    _ds.data.chart.val.x = _val;break;
                case C$.DATASET_CVAL_Y:
                    if(!_ds.data.chart){
                        _ds.data.chart = {};
                    }
                    if(!_ds.data.chart.val){
                        _ds.data.chart.val = {};
                    }
                    _ds.data.chart.val.y = _val;break;
                case C$.DATASET_MVAL:
                    if(!_ds.data.map){
                        _ds.data.map = {};
                    }
                    _ds.data.map.val = _val;break;
                case C$.DATASET_MDI:
                    if(!_ds.data.map){
                        _ds.data.map = {};
                    }
                    _ds.data.map.di = _val;break;
                case C$.DATASET_KV:
                    if(!_ds.data){
                        _ds.data = {};
                    }
                    _ds.data.kv = _val;break;
                default:  _ds.data = _val;break;
            }
        }else{
            _ds.data = _val;
        }
    };
    _ds.getData = function(_figure){
        var ret;
        if(!!_figure){
            switch(_figure){
                case C$.FIGURE_LIST:  ret = _ds.data.list;break;
                case C$.DATASET_LN:  ret = _ds.data.list.ln;break;
                case C$.DATASET_LI:  ret = _ds.data.list.li;break;
                case C$.FIGURE_TBL:  ret = _ds.data.table;break;
                case C$.DATASET_TH:  ret = _ds.data.table.th;break;
                case C$.DATASET_TB:  ret = _ds.data.table.tb;break;
                case C$.FIGURE_CHART:  ret = _ds.data.chart;break;
                case C$.DATASET_SERIES:  ret = _ds.data.chart.series;break;
                case C$.DATASET_CATEGORIES:  ret = _ds.data.chart.categories;break;
                case C$.FIGURE_SEL:  ret = _ds.data.select;break;
                case C$.DATASET_CDI: ret = _ds.data.chart.di;break;
                case C$.DATASET_CDI_X: ret = _ds.data.chart.di.x;break;
                case C$.DATASET_CDI_Y: ret = _ds.data.chart.di.y;break;
                case C$.DATASET_CVAL_X: ret = _ds.data.chart.val.x;break;
                case C$.DATASET_CVAL_Y: ret = _ds.data.chart.val.y;break;
                case C$.DATASET_TDI: ret = _ds.data.table.di;break;
                case C$.DATASET_LDI: ret = _ds.data.list.di;break;
                case C$.DATASET_MDI: ret = _ds.data.map.di;break;
                case C$.DATASET_MVAL: ret = _ds.data.map.val;break;
                case C$.DATASET_KV: ret = _ds.data.kv;break;
                default:  ret = _ds.data;break;
            }
        }else{
            ret = _ds.data;
        }
        return ret;
    };
    _ds.clrData = function(_figure){
        if(!!_figure){
            switch(_figure){
                case C$.FIGURE_LIST:  _ds.data.list = {};break;
                case C$.FIGURE_TBL:  _ds.data.table = {};break;
                case C$.FIGURE_CHART:  _ds.data.chart = {};break;
                case C$.FIGURE_SEL:  _ds.data.select = {};break;
                default:  _ds.data = {};break;
            }
        }else{
            _ds.data = {};
        }
    };
    _ds.clrRlt = function(){
        _ds.rlt = {};
    }
    return _ds;
})(jQuery,D$||{});

