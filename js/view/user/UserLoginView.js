define(['backbone',
    '../../settings',
    'text!../../../tmpl/user_login.html',
    'css!../../../css/userLogin.css'
], function (Backbone, Settings, loginHtml) {
    var LoginView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'sync', this.loginValidResultRender);
            this.listenTo(this.model, 'error', ohFresh.ajaxErrorHandler);
        },
        template: _.template(loginHtml),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
        },
        loginValidResultRender: function () {
            if (this.model.get('result')) {
                ohFresh.alertError(this.model.get('result'));
            } else {
                this.model.set({password: ''});
                $.cookie('user', JSON.stringify(this.model.toJSON()));
                location.href = "index.html";
            }
        },
        events: {
            'submit #formLogin': 'formLoginSubmit',
            'change #formLogin_inputMobile': 'inputMobileChangeHandler',
            'change #formLogin_inputPassword': 'inputPasswordChangeHandler'
        },
        formLoginSubmit: function (e) {
            this.model.set({mobilephone: $('#formLogin_inputMobile').val(), password: $('#formLogin_inputPassword').val()});
            if (!this.model.isValid()) {
                ohFresh.alertError(this.model.validationError);
            } else {
                this.model.fetch({url: Settings.baseUrl + 'customer/login?mobilephone=' + this.model.get('mobilephone') + '&password=' + this.model.get('password')});
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