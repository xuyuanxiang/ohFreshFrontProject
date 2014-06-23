define(['backbone',
    'text!../../../tmpl/user_center.html',
    'css!../../../css/userCenter.css'
], function (Backbone, userCenterHtml) {
    var UserCenterView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(_.template(userCenterHtml, this.model.attributes));
        },
        events: {
            'click #btnLogout': 'btnLogoutClickHandler'
        },
        btnLogoutClickHandler: function (e) {
            $.cookie('user', null);
            ohFresh.changeBar({name: '我的'}, {name: '登录', path: '#user/login'});
            location.href = 'index.html#user/login';
        }
    });
    return UserCenterView;
});