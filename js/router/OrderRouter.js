define(['backbone',
    '../settings',
    '../model/OrderModel',
    '../collection/LocationCollection',
    '../view/LocationSelectView',
    '../collection/OrderCollection',
    '../view/order/OrderDetailView',
    '../view/order/OrderListView',
    '../view/order/OrderCreateView'
], function (Backbone, settings, OrderModel, LocationCollection, LocationSelectView, OrderCollection, OrderDetailView, OrderListView, OrderCreateView) {
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
            'order/create/:id/:name/:price': "create",
            'order/get/:id': 'detail',
            'order/list': 'list',
            'order/list/:mobilephone': 'list',
            'order/list/:mobilephone/:status': 'list'
        },
        create: function (id, name, price) {
            this.orderCreateView.model.set({productId: id, productame: name, price: price});
            this.orderCreateView.render();
            var locations = new LocationCollection;
            locations.fetch({
                url: Settings.baseUrl + 'customer/getArea',
                success: function (collection) {
                    if (collection) {
                        var countries = collection.models;
                        ohFresh.countrySelectView = new LocationSelectView({
                            el: $('#selectCountry'),
                            collection: new LocationCollection(countries)
                        });
                        ohFresh.countrySelectView.render();
                        if (countries && countries.length > 0) {
                            var provinces = countries[0].get("children");
                            ohFresh.provinceSelectView = new LocationSelectView({
                                el: $('#selectProvince'),
                                collection: new LocationCollection(provinces)
                            });
                            ohFresh.provinceSelectView.render();
                            if (provinces && provinces.length > 0) {
                                var cities = provinces[0].children;
                                ohFresh.citySelectView = new LocationSelectView({
                                    el: $('#selectCity'),
                                    collection: new LocationCollection(cities)
                                });
                                ohFresh.citySelectView.render();
                                if (cities && cities.length > 0) {
                                    var counties = cities[0].children;
                                    ohFresh.countySelectView = new LocationSelectView({
                                        el: $('#selectCounty'),
                                        collection: new LocationCollection(counties)
                                    });
                                    ohFresh.countySelectView.render();
                                }
                            }
                        }
                    }
                }
            });
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