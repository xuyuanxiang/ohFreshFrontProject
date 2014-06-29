define(['backbone',
    '../model/ProductModel',
    '../collection/ProductCollection',
    '../view/product/ProductHotView'
], function (Backbone, ProductModel, ProductCollection, ProductHotView) {
    var ProductRouter = Backbone.Router.extend({
        initialize: function () {
            this.productHotView = new ProductHotView({
                el: $('#content'),
                collection: new ProductCollection,
                model: ProductModel
            });
        },
        routes: {
            "product/get/:id": "detailCtrl"
        },
        detailCtrl: function (id) {

        }
    });
    return ProductRouter;
});