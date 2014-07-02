define(['backbone',
    '../../settings',
    '../../util/RegExpValidator',
    'text!../../../tmpl/user_login.html',
    'css!../../../css/userLogin.css'
], function (Backbone, Settings, RegExpValidator, loginHtml) {
    var LoginView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'sync', this.successRender);
            this.listenTo(this.model, 'error', this.errorRender);
        },
        template: _.template(loginHtml),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
        },
        successRender: function (e) {
            $('#btnDoLogin').button('reset');
            var result = this.model.get('result');
            if (result && result == 1) {
                this.model.set({password: ''});
                $.cookie('user', JSON.stringify(this.model.toJSON()));
                ohFresh.confirm(this.model.get('message'), '提示', function () {
                    location.href = "index.html";
                });
            } else {
                ohFresh.alertError(this.model.get('message'));
            }
        },
        errorRender: function (e) {
            $('#btnDoLogin').button('reset');
            ohFresh.ajaxErrorHandler(e);
        },
        events: {
            'click #btnDoLogin': 'formLoginSubmit',
            'change #formLogin_inputMobile': 'inputMobileChangeHandler',
            'change #formLogin_inputPassword': 'inputPasswordChangeHandler'
        },
        formLoginSubmit: function (e) {
            $('#btnDoLogin').button('loading');
            var account = $('#formLogin_inputAccount').val();
            var email = "";
            var mobilephone = "";
            var wechatcode = "";
            if (RegExpValidator.isEmail(account))
                email = account;
            if (RegExpValidator.isMobile(account))
                mobilephone = account;
            if (RegExpValidator.isWechat(account))
                wechatcode = account;
            this.model.set({mobilephone: mobilephone, email: email, wechatcode: wechatcode, password: $('#formLogin_inputPassword').val()});
            if (!this.model.isValid()) {
                ohFresh.alertError(this.model.validationError);
            } else {
                this.model.fetch({url: Settings.baseUrl + 'customer/login'});
            }
        },
        inputMobileChangeHandler: function (e) {
            this.model.validMobile()
            this.model.set({mobilephone: $(e.currentTarget).val()});
        },
        inputPasswordChangeHandler: function (e) {
            this.model.set({password: $(e.currentTarget).val()});
        }
    });
    return LoginView;
});