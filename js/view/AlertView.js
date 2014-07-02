define(['backbone', 'text!../../tmpl/alert.html'], function (Backbone, alertHtml) {
    var AlertView = Backbone.View.extend({
        template: _.template(alertHtml),
        render: function (msg, title, type, okCallback, cancleCallback) {
            if (arguments.length == 5) {
                this.$el.append(this.template({title: title, message: msg, showOk: $.isFunction(okCallback), showCancle: $.isFunction(cancleCallback), type: type}));
                $('#alert').hide().fadeIn(500);
                this.$el.find('#alert_btnOk').click(function () {
                    $('#alert').hide(500);
                    setTimeout(function () {
                        $('#alert').remove();
                    }, 1000);
                    okCallback.call();
                });
                this.$el.find('#alert_btnCancle').click(function () {
                    $('#alert').hide(500);
                    setTimeout(function () {
                        $('#alert').remove();
                    }, 1000);
                    cancleCallback.call();
                });
            } else if (arguments.length == 4) {
                this.$el.append(this.template({title: title, message: msg, showOk: $.isFunction(okCallback), showCancle: false, type: type}));
                $('#alert').hide().fadeIn(500);
                this.$el.find('#alert_btnOk').click(function () {
                    $('#alert').hide(500);
                    setTimeout(function () {
                        $('#alert').remove();
                    }, 1000);
                    okCallback.call();
                });
            } else if (arguments.length == 3) {
                this.$el.append(this.template({title: title, message: msg, showOk: false, showCancle: false, type: type}));
                $('#alert').hide().fadeIn(500);
                setTimeout(function () {
                    $('#alert').hide(1000);
                    setTimeout(function () {
                        $('#alert').remove();
                    }, 1000);
                }, 2000);
            }
        }

    });
    return AlertView;
});