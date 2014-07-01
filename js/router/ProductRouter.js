define(['backbone',
    '../settings',
    '../model/ProductModel',
    '../collection/ProductCollection',
    '../view/product/ProductDetailView'
], function (Backbone, Settings, ProductModel, ProductCollection, ProductDetailView) {
    var ProductRouter = Backbone.Router.extend({
        initialize: function () {
            this.productDetailView = new ProductDetailView({
                el: $('#content'),
                model: ProductModel
            });
        },
        routes: {
            "product/get/:id": "detailCtrl"
        },
        detailCtrl: function (id) {
            this.productDetailView.model.fetch({
                url: Settings.baseUrl + ''
            });
            this.productDetailView.render();
        }
    });
    return ProductRouter;
});