define(['backbone',
    '../collection/CartCollection',
    '../view/cart/CartView',
    'cookie'
], function (Backbone, CartCollection, CartView) {
    var CartRouter = Backbone.Router.extend({
        initialize: function () {
            this.cartView = new CartView({
                el: $('#content'),
                collection: new CartCollection
            });
        },
        routes: {
            "cart": "cartCtrl"
        },
        cartCtrl: function () {
            ohFresh.activeBar('购物车');
            var cart = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            this.cartView.collection.set(cart);
            this.cartView.render();
        }
    });
    return CartRouter;
});