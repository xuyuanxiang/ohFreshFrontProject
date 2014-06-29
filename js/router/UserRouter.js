define(['backbone',
    '../settings',
    '../model/UserModel',
    '../collection/LocationCollection',
    '../view/LocationSelectView',
    '../view/user/UserLoginView',
    '../view/user/UserCenterView',
    '../view/user/UserInfoView',
    '../view/user/UserRegisterView'
], function (Backbone, Settings, UserModel, LocationCollection, LocationSelectView, UserLoginView, UserCenterView, UserInfoView, UserRegisterView) {
    var UserRouter = Backbone.Router.extend({
            initialize: function () {
                this.userLoginView = new UserLoginView({
                    el: $('#content'),
                    model: new UserModel
                });
                this.userCenterView = new UserCenterView({
                    el: $('#content'),
                    model: new UserModel
                });
                this.userDetailView = new UserInfoView({
                    el: $('#content'),
                    model: new UserModel
                });
                this.userRegisterView = new UserRegisterView({
                    el: $('#content'),
                    model: new UserModel
                });
            },
            routes: {
                'user/login': 'redToLogin',
                'user/register': 'redToRegister',
                'user/:id': 'redToUserCenter',
                'user/detail': 'redToUserDetail'
            },
            redToLogin: function () {
                ohFresh.activeBar('登录');
                this.userLoginView.model.set({mobilephone: '', password: ''});
                this.userLoginView.render();
            },
            redToRegister: function () {
                this.userRegisterView.render();
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
            redToUserCenter: function (id) {
                if (ohFresh.loginAuth()) {
                    var userCookie = $.cookie('user');
                    this.userCenterView.model.set(JSON.parse(userCookie));
                    this.userCenterView.render();
                    ohFresh.activeBar('我的');
                }
            },
            redToUserDetail: function () {
                if (ohFresh.loginAuth()) {
                    this.userDetailView.model.set(this.userCenterView.model.attributes);
                    this.userDetailView.render();
                }
            }
        })
        ;
    return UserRouter;
})
;