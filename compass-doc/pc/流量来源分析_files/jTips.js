/*! trade 2013-09-16 */
(function (t, i, o) {
    var s = function (i, o) {
        this.opts = t.extend({
            content: i.title || "",
            width: null,
            oTop: 5,
            oLeft: -8,
            zIndex: 100,
            event: "hover",
            position: "top",
            close: !1,
            onShow: null,
            onHide: null
        }, o), this.$obj = t(i), this.init()
    };
    s.prototype = {
        init: function () {
            this.insertStyles('.Jtips{position:relative;float:left}.Jtips .Jtips-close{position:absolute;color:#f60;font:12px "simsun";cursor:pointer;}.Jtips .Jtips-arr{position:absolute;background-image:url(//misc.360buyimg.com/purchase/trade/skin/i/arrow.gif);background-repeat:no-repeat;overflow:hidden}.Jtips.Jtips-top{padding-bottom:5px}.Jtips.Jtips-top .Jtips-close{right:1px;top:0}.Jtips.Jtips-top .Jtips-arr{left:30px;bottom:0;width:11px;height:6px;background-position:0 -5px;_bottom:-1px}.Jtips.Jtips-bottom{padding-top:5px}.Jtips.Jtips-bottom .Jtips-close{right:1px;top:5px}.Jtips.Jtips-bottom .Jtips-arr{top:0;left:30px;width:11px;height:6px;background-position:0 0}.Jtips.Jtips-left{padding-right:5px}.Jtips.Jtips-left .Jtips-close{right:6px;top:1px}.Jtips.Jtips-left .Jtips-arr{right:0;top:30px;width:6px;height:11px;background-position:-5px 0}.Jtips.Jtips-right{padding-left:5px}.Jtips.Jtips-right .Jtips-close{right:1px;top:1px}.Jtips.Jtips-right .Jtips-arr{top:30px;left:0;width:6px;height:11px;background-position:0 0}.Jtips .Jtips-con{word-break:break-all;word-wrap:break-word;float:left;padding:10px;background:#fffdee;border:1px solid #edd28b;color:#333;-moz-box-shadow:0 0 2px 2px #eee;-webkit-box-shadow:0 0 2px 2px #eee;box-shadow:0 0 2px 2px #eee;line-height:150%;overflow:hidden}.Jtips .Jtips-con a,.Jtips .Jtips-con a:visited{color:#005fab;text-decoration:none}.Jtips .Jtips-con a:hover{text-decoration:underline}.Jtips.Jtips-leftBottom{padding-bottom:5px}.Jtips.Jtips-leftBottom .Jtips-close{right:1px;top:5px}.Jtips.Jtips-leftBottom .Jtips-arr{top:-5px;right:10px;width:11px;height:6px;background-position:0 0}');
            var t = this;
            t.bindEvent()
        },
        insertStyles: function (i) {
            if (!t("#tipsCSS").length) {
                var s = o.getElementsByTagName("head"),
                    e = o.createElement("style"),
                    p = o.createElement("link");
                if (/\.css$/.test(i)) p.rel = "stylesheet", p.type = "text/css", p.id = "tipsCSS", p.href = i, s.length ? s[0].appendChild(p) : o.documentElement.appendChild(p);
                else {
                    if (e.setAttribute("type", "text/css"), e.setAttribute("id", "tipsCSS"), e.styleSheet) e.styleSheet.cssText = i;
                    else {
                        var n = o.createTextNode(i);
                        e.appendChild(n)
                    }
                    s.length && s[0].appendChild(e)
                }
            }
        },
        /*bindEvent: function () {
            var i = this;
            this._hide = this.remove(), "hover" === this.opts.event ? this.$obj.bind("mouseenter", function () {
                i.show()
            }).bind("mouseleave", function () {
                    i.hide()
                }) : this.$obj.bind("click", function () {
                return i.show(), t(o).bind("click", i._hide), !1
            })
        },*/
        bindEvent: function () {
        	var i = this, inEventName="mouseenter",outEventName = "mouseleave";
        	!!this.$obj[0]&&(this.$obj[0]+"").indexOf('SVG')>0 ? function(){ inEventName="mouseover";outEventName="mouseout"; }():'';

        	this._hide = this.remove(), "hover" === this.opts.event ? this.$obj.bind(inEventName, function () {
        	i.show();
        	}).bind(outEventName, function () {
        	i.hide();
        	}) : this.$obj.bind("click", function () {
        	return i.show(), t(o).bind("click", i._hide), !1;
        	});
        }, 

        bindClose: function (t) {
            var i = this;
            t.find(".Jtips-close").bind("click", function () {
                i._hide()
            })
        },
        getPosition: function () {
            var t = this.$obj;
            return {
                w: t.outerWidth(),
                h: t.outerHeight(),
                oTop: t.offset().top,
                oLeft: t.offset().left
            }
        },
        setPosition: function (i, o) {
            var s = this.getPosition(),
                e = (t("body").eq(0).width(), t("body").eq(0).height(), {});
            i.css({
                position: "absolute",
                "z-index": this.opts.zIndex
            }), e = {
                left: {
                    top: s.oTop - 10 + this.opts.oTop,
                    left: s.oLeft - this.tips.outerWidth() - this.opts.oLeft
                },
                right: {
                    left: s.oLeft + s.w + this.opts.oLeft,
                    top: s.oTop - 10 + this.opts.oTop
                },
                top: {
                    left: s.oLeft - 10 + this.opts.oLeft,
                    top: s.oTop - this.tips.outerHeight() - this.opts.oTop
                },
                bottom: {
                    left: s.oLeft - 10 + this.opts.oLeft,
                    top: s.oTop + s.h + this.opts.oTop
                },
                leftBottom:{
                	left: s.oLeft - 160 + this.opts.oLeft,
                    top: s.oTop + s.h + this.opts.oTop
                }
            }, i.css(e[o])
        },
        show: function () {
            var s = this.opts.close ? '<div class="Jtips-close">&times;</div>' : "",
                e = t('<div class="Jtips Jtips-' + this.opts.position + '"><div class="Jtips-arr"></div>' + s + '<div class="Jtips-con">' + this.opts.content + "</div></div>"),
                p = this;
            t(".Jtips").remove(), i.clearTimeout(p.timer), this.tips = e, t("body").eq(0).append(e), this.tips.css("width", this.opts.width || e.width()).find(".Jtips-con").css("width", (this.opts.width || e.width()) - 22), this.setPosition(e, this.opts.position), this.bindClose(e), "hover" === this.opts.event ? this.tips.bind("mouseenter", function () {
                i.clearTimeout(p.timer)
            }).bind("mouseleave", function () {
                    p.timer = setTimeout(p._hide, 399)
                }) : this.tips.bind("mouseenter", function () {
                t(o).unbind("click", p._hide)
            }).bind("mouseleave", function () {
                    t(o).bind("click", p._hide)
                }), t(window).resize(function () {
                p.setPosition(e, p.opts.position)
            }), "function" == typeof this.opts.onShow && this.opts.onShow.apply(this.$obj, [this.tips])
        },
        hide: function () {
            this.timer = setTimeout(this._hide, 399)
        },
        remove: function () {
            var t = this;
            return function () {
                "function" == typeof t.opts.onHide ? t.opts.onHide.apply(t.$obj, [t.tips]) && (t.tips && t.tips.remove()) : (t.tips && t.tips.remove())
            }
        }
    }, t.fn.Jtips = function (i) {
        return this.each(function () {
            i.content = t(this).attr("desc");
            var o = new s(this, i);
            t(this).data("Jtips", o)
        })
    }
})(jQuery, window, document);