/*
 *
 */

;(function ($) {

    var controlCache = {};      // id/control
    var subjectCache = {};      // event/[control]


    function addObserver(topic, control) {
        if(!subjectCache[topic]) subjectCache[topic] = [];

        subjectCache[topic].push(control);
    }

    function notifyObservers(topic, source) {
        var arr = subjectCache[topic];
        $.each(arr, function () {
            this.refreshAfterDataChanged(source);
        });
    }


    var pluginName = "Control";
    var oldpluginName = $.fn[pluginName];
    var DEFAULTS = {
        DataSource: null,
        Event: null,
        Update: false
    };

    var Control = function(element, options) {
        var option = $.extend({}, DEFAULTS, options);

        this.ID = $(element).attr('id');
        this.Element = $(element);
        this.DataSource = option.DataSource;
        this.Event = option.Event;
        this.Update = option.Update;
        
        if (this.Update) {
            controlCache[this.ID] = this;
        }
        this._init();
    };

    Control.prototype = {

        _init: function() {
            if (this.Update) {
                this._initControl();
                setInterval(this.checkDataChanged, 500);
            }
            else
                this._watchDataChanged();
        },

        _initControl: function() {
            var flag = false;
            var obj = this.DataSource;

            this.Element.find('input').each(function() {
                var name = $(this).attr('name');
                if (obj.hasOwnProperty(name)) {
                    $(this).val(obj[name]);
                }
            });
        },

        // call back for subject
        checkDataChanged: function() {
            var flag = false;

            Object.getOwnPropertyNames(controlCache).forEach(function(key) {
                var control = controlCache[key];

                var obj = control.DataSource;
                control.Element.find('input').each(function() {
                    var name = $(this).attr('name');
                    if (obj.hasOwnProperty(name)) {
                        var pre = obj[name];
                        var cur = $(this).val();
                        if (pre != cur) {
                            flag = true;
                            obj[name] = cur;
                        }
                    }
                });
                if (flag) {
                    notifyObservers(control.Event, obj);
                }
            });
        },

        _watchDataChanged: function() {
            addObserver(this.Event, this);
        },

        // call back
        refreshAfterDataChanged: function(source) {
            this.Element.find('input').each(function() {
                var name = $(this).attr('name');
                if (source && source.hasOwnProperty(name)) {
                    var value = source[name];
                    $(this).val(value);
                }
            });
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            var data = $.data(this, $(this).attr('id'));
            if (!data) {
                $.data(this, $(this).attr('id'), new Control( $(this), options ));
            }
        });
    };

    $.fn[pluginName].Constructor = Control;

    $.fn[pluginName].noConflict = function () {
        $.fn[pluginName] = oldpluginName;
        return this;
    };
})(jQuery);

