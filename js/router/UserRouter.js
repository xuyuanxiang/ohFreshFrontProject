define(['backbone',
    '../model/UserModel',
    '../view/user/UserLoginView',
    '../view/user/UserCenterView',
    '../view/user/UserInfoView',
    '../view/user/UserRegisterView'
], function (Backbone, UserModel, UserLoginView, UserCenterView, UserInfoView, UserRegisterView) {
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
    });
    return UserRouter;
});