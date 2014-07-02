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

        }
    });
    return CartRouter;
});