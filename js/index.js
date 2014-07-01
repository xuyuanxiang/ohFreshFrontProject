require.config({
    paths: {
        "jquery": "http://cdn.staticfile.org/jquery/1.11.0/jquery.min",
        "bootstrap": "http://cdn.staticfile.org/twitter-bootstrap/3.1.1/js/bootstrap.min",
        "cookie": "http://cdn.staticfile.org/jquery-cookie/1.4.1/jquery.cookie.min",
        "slick": "http://cdn.staticfile.org/slick-carousel/1.3.6/slick.min",
        "css": "http://cdn.staticfile.org/require-css/0.1.1/css",
        "text": "http://cdn.staticfile.org/require-text/2.0.10/text.min",
        "underscore": "http://cdn.staticfile.org/underscore.js/1.6.0/underscore-min",
        "backbone": "http://cdn.staticfile.org/backbone.js/1.1.2/backbone-min"
    },
    shim: {
        "bootstrap": {
            "deps": ["jquery"],
            "exports": "bootstrap"
        },
        "cookie": {
            "deps": ["jquery"],
            "exports": "cookie"
        },
        "underscore": {
            "exports": "_"
        },
        "backbone": {
            "deps": ["jquery", "underscore"],
            "exports": "Backbone"
        }
    }
});
require(["backbone",
    './settings',
    './collection/PrivilegeCollection',
    "./router/HomeRouter",
    "./router/UserRouter",
    "./router/ProductRouter",
    "./router/OrderRouter",
    "./view/NavTitleView",
    "./view/NavBarView",
    "./view/AlertView",
    "css!../css/bootstrap.min.css",
    "css!../css/bootflat.css",
    "css!http://cdn.staticfile.org/font-awesome/4.1.0/css/font-awesome.min.css",
    "css!../css/global.css",
    "bootstrap",
    "cookie"
], function (Backbone, Settings, PrivilegeCollection, HomeRouter, UserRouter, ProductRouter, OrderRouter, NavTitleView, NavBarView, AlertView) {
    ohFresh = window.ohFresh || {};
    ohFresh.navTitleView = new NavTitleView({
        el: $('header')
    });
    ohFresh.navBarView = new NavBarView({
        el: $('footer'),
        collection: new PrivilegeCollection(Settings.footBars)
    });
    ohFresh.alertView = new AlertView({
        el: $('#content')
    });
    ohFresh.alertError = function (msg) {
        ohFresh.alertView.renderError(msg);
    };
    ohFresh.alertSuccess = function (msg) {
        ohFresh.alertView.renderSuccess(msg);
    }
    ohFresh.ajaxErrorHandler = function (err) {
        ohFresh.alert('服务器连接失败！请稍后再试...');
    };
    ohFresh.activeBar = function (name) {
        _.each(ohFresh.navBarView.collection.models, function (model) {
            if (model.get('name') == name) {
                model.set({active: true});
            } else {
                model.set({active: false});
            }
        });
    };
    ohFresh.changeBar = function (query, bar) {
        _.each(ohFresh.navBarView.collection.where(query), function (model) {
            model.set(_.extend(model.attributes, bar));
        });
        ohFresh.navBarView.render();
    };
    ohFresh.loginAuth = function () {
        var userCookie = $.cookie('user');
        if (!userCookie) {
            ohFresh.alert('您还未登陆！');
            location.href = 'index.html#user/login';
            return false;
        } else {
            return true;
        }
    };
    ohFresh.navTitleView.render();
    ohFresh.navBarView.render();
    ohFresh.homeRouter = new HomeRouter;
    ohFresh.userRouter = new UserRouter;
    ohFresh.orderRouter = new OrderRouter;
    ohFresh.productRouter = new ProductRouter;
    Backbone.history.start();
});

