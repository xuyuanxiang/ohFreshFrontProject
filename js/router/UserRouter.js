define(['backbone',
    '../model/UserModel',
    '../view/user/UserLoginView',
    '../view/user/UserDetailView'
], function (Backbone, UserModel, UserLoginView, UserDetailView) {
    var UserRouter = Backbone.Router.extend({
        initialize: function () {
            this.userLoginView = new UserLoginView({
                el: $('#content'),
                model: new UserModel
            });
            this.userDetailView = new UserDetailView({
                el: $('#content'),
                model: new UserModel
            });
        },
        routes: {
            'user': 'hasLogined',
            'user/login': 'redToLogin',
            'user/:id': 'userDetail'
        },
        hasLogined: function () {
            var userCookie = $.cookie('user');
            return !!userCookie;
        },
        redToLogin: function () {
            ohFresh.activeBar('登录');
            this.userLoginView.model.set({mobilephone: '', password: ''});
            this.userLoginView.render();
        },
        userDetail: function (id) {
            if (ohFresh.loginAuth()) {
                var userCookie = $.cookie('user');
                console.log(userCookie);
                this.userDetailView.model.set(JSON.parse(userCookie));
                this.userDetailView.render();
                ohFresh.activeBar('我的');
            }
        }
    });
    return UserRouter;
});