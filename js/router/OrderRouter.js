define(['backbone',
    '../settings',
    '../model/OrderModel',
    '../collection/OrderCollection',
    '../view/order/OrderDetailView',
    '../view/order/OrderListView',
    '../view/order/OrderCreateView',
    "cookie"
], function (Backbone, Settings, OrderModel, OrderCollection, OrderDetailView, OrderListView, OrderCreateView) {
    var OrderRouter = Backbone.Router.extend({
        initialize: function () {
            this.orderListView = new OrderListView({
                el: $('#content'),
                collection: new OrderCollection
            });
            this.orderDetailView = new OrderDetailView({
                el: $('#content'),
                model: new OrderModel
            });
            this.orderCreateView = new OrderCreateView({
                el: $('#content'),
                model: new OrderModel
            });
        },
        routes: {
            'order/get/:id': 'detail',
            'order/:id/:name/:price/:count': 'createOrder',
            'orders': 'createOrders',
            'order/list': 'list',
            'order/list/:mobilephone': 'list',
            'order/list/:mobilephone/:status': 'list'
        },
        createOrders: function () {
            ohFresh.navTitleView.render({
                left: {
                    url: '#home',
                    label: '返回',
                    icon: 'fa-chevron-left'
                }
            });
            ohFresh.activeBar('购物车');
            var products = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            var user = $.cookie('user') ? JSON.parse($.cookie('user')) : {};
            if (products.length > 0)
                this.orderCreateView.model.set({
                    products: JSON.stringify(products),
                    productCollection: products
                });
            if (user && user.id) {
                this.orderCreateView.model.set({
                    customerId: user.id,
                    name: user.name,
                    mobilephone: user.mobilephone,
                    email: user.email ? user.email : '',
                    wechatcode: user.wechatcode ? user.wechatcode : '',
                    countryId: user.countryId,
                    provinceId: user.provinceId,
                    cityId: user.cityId,
                    countyId: user.countyId,
                    homeaddress: user.homeaddress ? user.homeaddress : ''
                });
            }
            this.orderCreateView.render();

        },
        createOrder: function (id, name, price, count) {
            ohFresh.navTitleView.render({
                left: {
                    url: '#home',
                    label: '返回',
                    icon: 'fa-chevron-left'
                }
            });
            var user = null;
            if ($.cookie('user')) {
                user = JSON.parse($.cookie('user'));
            }
            var products = [
                {productId: id, productName: name, productPrice: price, productCount: count, checked: true}
            ];
            this.orderCreateView.model.set({
                products: JSON.stringify(products),
                productCollection: products,
                totalPrice: Number(price) * Number(count),
                totalNum: 1
            });
            if (user != null) {
                this.orderCreateView.model.set({
                    customerId: user.id,
                    name: user.name,
                    mobilephone: user.mobilephone,
                    email: user.email ? user.email : '',
                    wechatcode: user.wechatcode ? user.wechatcode : '',
                    countryId: user.countryId,
                    provinceId: user.provinceId,
                    cityId: user.cityId,
                    countyId: user.countyId,
                    homeaddress: user.homeaddress ? user.homeaddress : ''
                });
            }
            this.orderCreateView.render();
        },
        detail: function (id) {
            var results = this.orderListView.collection.where({orderId: id});
            if (results)
                this.orderDetailView.model.set(results[0]);
        },
        list: function (mobilephone, status) {
            mobilephone = mobilephone || '';
            status = status || '';
            this.orderListView.collection.fetch({url: settings.baseUrl + 'EOrder/getOrdersByCondition?mobilephone=' + mobilephone + '&status=' + status});

        }
    });
    return OrderRouter;
});