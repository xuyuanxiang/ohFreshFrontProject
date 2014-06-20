define(['backbone',
    'text!../../../tmpl/home_layout.html'
], function (Backbone, homeLayoutHtml) {
    var HomeLayoutView = Backbone.View.extend({
        render: function () {
            this.$el.html(homeLayoutHtml);
        }
    });
    return HomeLayoutView;
});