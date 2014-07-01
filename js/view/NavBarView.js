define(['backbone',
    'text!../../tmpl/nav_bar.html',
    'css!../../css/navBar.css',
    'cookie'
], function (Backbone, navBarHtml) {
    var NavBarView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
            this.render();
        },
        render: function () {
            var cart = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            _.each(this.collection.where({name: '购物车'}), function (item) {
                item.set({count: cart.length});
            });
            $.cookie('cart', JSON.stringify(cart));
            this.$el.html(_.template(navBarHtml, this.collection));
        }
    });
    return NavBarView;
});