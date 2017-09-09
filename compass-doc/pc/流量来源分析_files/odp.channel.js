/**
 * Created by panqiangqiang on 2016/4/25.
 */

/**
 * 渠道组件
 *
 * 使用方式：
 * var instance = new OdpChannel(option);
 *
 * 配置对象option属性：
 *   id: 容器id
 *   list: 列表项数组，如 [{name: '普通选项1', value: '1'}, {name: '带下拉选项2', value: [{name: '普通选项2', value: '2'}, {name: '普通选项3', value: '3'}]}]
 *         最多两级
 *   value: 初始值，可以不设置，默认为第一个
 *   onChange: 值变化回调，回调函数的参数为 value、配置项对象、配置项是否是下拉项、配置项对应的dom、渠道组件容器
 *   alwaysCallChange: 是否总是调用onChange,默认为true
 *
 * 实例对象instance接口：
 *   getValue: 获取组件值，如 '1'
 *   getCurrentChannel: 获取组件当前项的相关完整相关信息，如：{channel: {name: '普通选项1', value: '1'}, isSel: true, ele: '该项对应的dom'}
 *   getContainer: 获取当前组件的容器
 *   selectValue: 选中特定项
 *   其中，实例对象instance也可以通过 $('#containerId').data('odp.channel') 获取
 */

var OdpChannel = function (option) {
    var local = {};
    this.opt = {
        id: '',
        list: [{  //list
            name: '全部',
            value: '99'
        }, {
            name: 'PC',
            value: '20'
        }, {
            name: '无线',
            value: [{
                name: '无线整体',
                value: '0'
            }, {
                name: 'APP',
                value: '2'
            }, {
                name: 'M端',
                value: '1'
            }, {
                name: '微信',
                value: '3'
            }, {
                name: '手Q',
                value: '4'
            }]
        }],
        alwaysCallChange: true,  //默认总是调用onChange
        onChange: $.noop,  //修改
        value: undefined   //默认值
    };
    $.extend(this.opt, option);
    this._getLocalParam = function (name) {
        return local[name];
    };
    this._setLocalParam = function (name, value) {
        local[name] = value;
    };
    //init
    this.init();
};

OdpChannel.prototype = {
    constructor: OdpChannel,
    init: function () {
        this._build();
        this._bindEvent();
        this._initSelect();
    },
    _build: function () {
        var opt = this.opt, i = 0, len,
            $container = this.getContainer();
        $container.empty().addClass('odp-channel').data('odp.channel', this); //初始化容器
        if (opt.list && (len = opt.list.length)) {
            for (; i < len; i++) {
                $container.append(this._buildChannelItem(opt.list[i]));
            }
        }
    },
    _initSelect: function () {
        var _ = this,
            opt = this.opt;
        _._setLocalParam('inInit', true);  //初始化过程加锁
        if (typeof opt.value !== 'undefined') {
            _._selectChannel(opt.value);
        } else {
            if (opt.list.length) {
                _._selectChannel(opt.list[0].value);
            }
        }
        _._setLocalParam('inInit', false); //初始化过程结束
    },
    _bindEvent: function () {
        //bind event...    
    },
    _buildChannelItem: function (channel) {
        var $item;
        if ($.isArray(channel.value)) {
            $item = this._buildSelectChannelItem(channel);
        } else {
            $item = this._buildNormalChannelItem(channel);
        }
        return $item;
    },
    _buildNormalChannelItem: function (channel) {
        var _ = this,
            tpl = this._getChannelItemTpl(),
            $item = $(this.formatTpl(tpl.NORMAL_ITEM, channel));
        $item.data('channel', channel).click(function () {
            var cur = {
                channel: channel,
                isSel: false,
                ele: $item
            }, old = _._getLocalParam('currentChannel');
            $(this).addClass('channel-choose').siblings().removeClass('channel-choose sel-down');
            _._setLocalParam('currentChannel', cur);
            _._callChange(cur, old);
        });
        return $item;
    },
    _buildSelectChannelItem: function (channel) {
        var _ = this,
            tpl = this._getChannelItemTpl(),
            $item = $(this.formatTpl(tpl.SELECT_ITEM, channel)),
            $selList = $item.find('.channel-sel-list'),
            i = 0, sel = channel.value, len = sel.length;
        $item.data('channel', channel).click(function () {
            var notToggle = _._getLocalParam('inInit') || _._getLocalParam('fnSelect');  //不切换的情况
            if (!notToggle) {
                $item.toggleClass('sel-down').siblings().removeClass('sel-down');
            }
        });
        for (; i < len; i++) {
            $selList.append(buildSelItem(sel[i]));
        }
        return $item;

        function buildSelItem(selChannel) {
            var $selItem = $(_.formatTpl(tpl.LIST_ITEM, selChannel));
            $selItem.data('channel', selChannel).click(function () {
                var cur = {
                    channel: selChannel,
                    isSel: true,
                    ele: $selItem
                }, old = _._getLocalParam('currentChannel');
                $item.children('.channel-name').html(selChannel.name)
                    .end()
                    .addClass('channel-choose').siblings().removeClass('channel-choose sel-down');
                _._setLocalParam('currentChannel', cur);
                _._callChange(cur, old);
            });
            return $selItem;
        }
    },
    _selectChannel: function (value) {
        var $parent = this.getContainer();
        $parent.find('.channel-item').each(function (index, ele) {
            var channel, $ele = $(ele);
            if ((channel = $ele.data('channel'))) {
                if (value === channel.value) {
                    $ele.trigger('click');
                }
            }
        });
    },
    _getChannelItemTpl: function () {
        return {
            NORMAL_ITEM: '<span class="channel-item"><span class="channel-name">{{name}}</span></span>',
            SELECT_ITEM: '<span class="channel-item"><span class="channel-name">{{name}}</span><span class="drop-arrow"></span><span class="channel-sel-list"></span></span>',
            LIST_ITEM: '<span class="channel-item"><span class="channel-name">{{name}}</span></span>'
        };
    },
    _callChange: function (newChannel, oldChannel) {
        var _ = this,
            opt = _.opt;
        if (_._getLocalParam('inInit')) {  //初始化过程中，不调用onChange
            return;
        }
        if (opt.alwaysCallChange || !(oldChannel && oldChannel.channel.value === newChannel.channel.value)) {
            opt.onChange(newChannel.channel.value, newChannel.channel, newChannel.isSel, newChannel.ele, _.getContainer());
        }
    },
    getCurrentChannel: function () {
        return this._getLocalParam('currentChannel');
    },
    getValue: function () {
        var cur = this._getLocalParam('currentChannel');
        return cur ? cur.channel.value : '';
    },
    selectValue: function (value) {
        var _ = this;
        _._setLocalParam('fnSelect', true);
        _._selectChannel(value);
        _._setLocalParam('fnSelect', false);
    },
    getContainer: function () {
        return $('#' + this.opt.id);
    },
    formatTpl: function (tpl, data) {
        var reg = /\{\{(.*?)\}\}/g;
        return tpl.replace(reg, function (macths, key, index, str) {
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
