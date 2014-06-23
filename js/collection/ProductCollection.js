define(['backbone', '../model/ProductModel'], function (Backbone, ProductModel) {
    var ProductCollection = Backbone.Collection.extend({
        model: ProductModel
    });
    return ProductCollection;
});