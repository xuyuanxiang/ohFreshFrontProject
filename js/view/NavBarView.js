define(['backbone',
    'text!../../tmpl/nav_bar.html',
    'css!../../css/navBar.css'
], function (Backbone, navBarHtml) {
    var NavBarView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
            this.render();
        },
        render: function () {
            this.$el.html(_.template(navBarHtml, this.collection));
        }
    });
    return NavBarView;
});