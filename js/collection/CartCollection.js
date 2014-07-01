define(['backbone', '../model/CartModel'], function (Backbone, CartModel) {
    var CartCollection = Backbone.Collection.extend({
        model: CartModel
    });
    return CartCollection;
});