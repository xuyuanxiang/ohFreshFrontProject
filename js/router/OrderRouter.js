define(['backbone',
    '../settings',
    '../model/OrderModel',
    '../collection/LocationCollection',
    '../view/LocationSelectView',
    '../collection/OrderCollection',
    '../view/order/OrderDetailView',
    '../view/order/OrderListView',
    '../view/order/OrderCreateView',
    "cookie"
], function (Backbone, Settings, OrderModel, LocationCollection, LocationSelectView, OrderCollection, OrderDetailView, OrderListView, OrderCreateView) {
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
            ohFresh.activeBar('购物车');
            var products = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            var user = $.cookie('user') ? JSON.parse($.cookie('user')) : {};
            if (products.length > 0)
                this.orderCreateView.model.set({
                    products: JSON.stringify(products),
                    productCollection: products,
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
            var locations = new LocationCollection;
            locations.fetch({
                url: Settings.baseUrl + 'customer/getArea',
                success: function (collection) {
                    if (collection) {
                        var countries = collection.models;
                        if (user)
                            _.each(countries, function (country) {
                                if (country.get('id') == user.countryId)
                                    country.set({selected: true});
                            });
                        ohFresh.countrySelectView = new LocationSelectView({
                            el: $('#selectCountry'),
                            collection: new LocationCollection(countries)
                        });
                        ohFresh.countrySelectView.render();
                        if (countries && countries.length > 0) {
                            var provinces = countries[0].get("children");
                            if (user)
                                _.each(provinces, function (province) {
                                    if (province.id == user.provinceId)
                                        province.selected = true;
                                });
                            ohFresh.provinceSelectView = new LocationSelectView({
                                el: $('#selectProvince'),
                                collection: new LocationCollection(provinces)
                            });
                            ohFresh.provinceSelectView.render();
                            if (provinces && provinces.length > 0) {
                                var cities = provinces[0].children;
                                if (user)
                                    _.each(cities, function (city) {
                                        if (city.id == user.cityId)
                                            city.selected = true;
                                    });
                                ohFresh.citySelectView = new LocationSelectView({
                                    el: $('#selectCity'),
                                    collection: new LocationCollection(cities)
                                });
                                ohFresh.citySelectView.render();
                                if (cities && cities.length > 0) {
                                    var counties = cities[0].children;
                                    if (user)
                                        _.each(counties, function (county) {
                                            if (county.id == user.countyId)
                                                county.selected = true;
                                        });
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
        createOrder: function (id, name, price, count) {
            ohFresh.navTitleView.render({
                left: {
                    url: 'index.html',
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
            var locations = new LocationCollection;
            locations.fetch({
                url: Settings.baseUrl + 'customer/getArea',
                success: function (collection) {
                    if (collection) {
                        var countries = collection.models;
                        if (user)
                            _.each(countries, function (country) {
                                if (country.get('id') == user.countryId)
                                    country.set({selected: true});
                            });
                        ohFresh.countrySelectView = new LocationSelectView({
                            el: $('#selectCountry'),
                            collection: new LocationCollection(countries)
                        });
                        ohFresh.countrySelectView.render();
                        if (countries && countries.length > 0) {
                            var provinces = countries[0].get("children");
                            if (user)
                                _.each(provinces, function (province) {
                                    if (province.id == user.provinceId)
                                        province.selected = true;
                                });
                            ohFresh.provinceSelectView = new LocationSelectView({
                                el: $('#selectProvince'),
                                collection: new LocationCollection(provinces)
                            });
                            ohFresh.provinceSelectView.render();
                            if (provinces && provinces.length > 0) {
                                var cities = provinces[0].children;
                                if (user)
                                    _.each(cities, function (city) {
                                        if (city.id == user.cityId)
                                            city.selected = true;
                                    });
                                ohFresh.citySelectView = new LocationSelectView({
                                    el: $('#selectCity'),
                                    collection: new LocationCollection(cities)
                                });
                                ohFresh.citySelectView.render();
                                if (cities && cities.length > 0) {
                                    var counties = cities[0].children;
                                    if (user)
                                        _.each(counties, function (county) {
                                            if (county.id == user.countyId)
                                                county.selected = true;
                                        });
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