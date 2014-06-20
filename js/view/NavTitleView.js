define(['backbone',
    'text!../../tmpl/nav_title.html',
    'css!../../css/navTitle.css'
], function (Backbone, navTitleHtml) {
    var NavTitleView = Backbone.View.extend({
        render: function (options) {
            var settings = {
                left: {
                    url: '',
                    label: '',
                    icon: '',
                    html: ''
                },
                center: {
                    url: '',
                    label: '',
                    icon: '',
                    html: '<img class="imgLogo" src="img/logo.png"/>'
                },
                right: {
                    url: '',
                    label: '',
                    icon: '',
                    html: ''
                }
            };
            $.extend(settings, options);
            this.$el.html(_.template(navTitleHtml, settings));
        }
    });
    return NavTitleView;
});