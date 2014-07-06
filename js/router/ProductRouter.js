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
                model: new ProductModel
            });
        },
        routes: {
            "product/get/:id": "detailCtrl",
            "product/get/:channelId/:typeId/:productId": "detailCtrl"
        },
        showDetail: function (channelId, typeId, productId) {
            var channels = ohFresh.homeRouter.channelView.collection.where({id: channelId});
            var types = channels[0] ? _.where(channels[0].items, {id: typeId}) : [];
            var products = types[0] ? _.where(types[0].products, {id: productId}) : [];
            this.productDetailView.model.set(products[0]);
        },
        detailCtrl: function (id) {
            ohFresh.navTitleView.render({
                left: {
                    url: '#home',
                    label: '返回',
                    icon: 'fa-chevron-left'
                }
            });
            this.productDetailView.model.fetch({
                url: Settings.baseUrl + ''
            });
            this.productDetailView.render();
        }
    });
    return ProductRouter;
});