define(['backbone', 'text!../../tmpl/alert.html'], function (Backbone, alertHtml) {
    var AlertView = Backbone.View.extend({
        template: _.template(alertHtml),
        renderError: function (msg) {
            this.$el.append(this.template({message: msg}));
            this.$el.find('.alert').addClass('alert-danger').hide().fadeIn(500);
            var $el = this.$el;
            setTimeout(function () {
                $el.find('.alert').hide(1000);
                setTimeout(function () {
                    $el.find('.alert').remove();
                }, 1000);
            }, 2500);
        },
        renderSuccess: function (msg) {
            this.$el.append(this.template({message: msg}));
            this.$el.find('.alert').addClass('alert-success').hide().fadeIn(500);
            var $el = this.$el;
            setTimeout(function () {
                $el.find('.alert').hide(1000);
                setTimeout(function () {
                    $el.find('.alert').remove();
                }, 1000);
            }, 2500);
        }
    });
    return AlertView;
});