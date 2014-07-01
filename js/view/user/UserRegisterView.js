define(['backbone',
    '../../settings',
    '../../collection/LocationCollection',
    'text!../../../tmpl/user_register.html'
], function (Backbone, Settings, LocationCollection, userRegisterHtml) {
    var UserRegisterView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'sync', this.successRender);
            this.listenTo(this.model, 'error', this.errorRender);
        },
        template: _.template(userRegisterHtml),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
        },
        successRender: function () {
            $('button[type="submit"]').button('reset');
            ohFresh.alertError(this.model.get("message"));
        },
        errorRender: function (e) {
            $('button[type="submit"]').button('reset');
            ohFresh.ajaxErrorHandler(e);
        },
        events: {
            'focusout #inputName': 'validName',
            'focusout #inputMobile': 'validMobile',
            'focusout #inputPassword': 'validPassword',
            'focusout #inputPasswordRepeat': 'validPasswordRepeat',
            'focusout #inputEmail': 'validEmail',
            'focusout #inputWechat': 'validWechat',
            'change #selectCountry': 'selectedCountry',
            'change #selectProvince': 'selectedProvince',
            'change #selectCity': 'selectedCity',
            'submit #formRegister': 'doRegister'
        },
        selectedCountry: function (e) {
            var currentCountry = ohFresh.countrySelectView.collection.where({id: $(e.currentTarget).val()})[0];
            var provinces = currentCountry.get("children");
            ohFresh.provinceSelectView.collection.set(provinces);
            ohFresh.provinceSelectView.render();
            var cities = provinces[0].children;
            ohFresh.citySelectView.collection.set(cities);
            ohFresh.citySelectView.render();
            var counties = cities[0].children;
            ohFresh.countySelectView.collection.set(counties);
            ohFresh.countySelectView.render();
        },
        selectedProvince: function (e) {
            var currentProvince = ohFresh.provinceSelectView.collection.where({id: $(e.currentTarget).val()})[0];
            var cities = currentProvince.get("children");
            ohFresh.citySelectView.collection.set(cities);
            ohFresh.citySelectView.render();
            var counties = cities[0].children;
            ohFresh.countySelectView.collection.set(counties);
            ohFresh.countySelectView.render();
        },
        selectedCity: function (e) {
            var currentCity = ohFresh.citySelectView.collection.where({id: $(e.currentTarget).val()})[0];
            var counties = currentCity.children;
            ohFresh.countySelectView.collection.set(counties);
            ohFresh.countySelectView.render();
        },
        validName: function () {
            this.model.set({name: $('#inputName').val()});
            if (this.model.validName()) {
                if ($('#inputName').parent().hasClass('has-error'))
                    $('#inputName').parent().removeClass('has-error');
                $('#inputName').parent().addClass('has-success');
                $('#inputName').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                if ($('#inputName').parent().hasClass('has-success'))
                    $('#inputName').parent().removeClass('has-success');
                $('#inputName').parent().addClass('has-error');
                $('#inputName').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>只能由中文字符或英文字母组成！');
                $('#inputName').focus();
                return false;
            }
        },
        validMobile: function () {
            this.model.set({mobilephone: $('#inputMobile').val()});
            if (this.model.validMobile()) {
                if ($('#inputMobile').parent().hasClass('has-error'))
                    $('#inputMobile').parent().removeClass('has-error');
                $('#inputMobile').parent().addClass('has-success');
                $('#inputMobile').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                if ($('#inputMobile').parent().hasClass('has-success'))
                    $('#inputMobile').parent().removeClass('has-success');
                $('#inputMobile').parent().addClass('has-error');
                $('#inputMobile').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>只能由数字组成！');
                $('#inputMobile').focus();
                return false;
            }
        },
        validPassword: function () {
            this.model.set({password: $('#inputPassword').val()});
            if (this.model.validPassword()) {
                if ($('#inputPassword').parent().hasClass('has-error'))
                    $('#inputPassword').parent().removeClass('has-error');
                $('#inputPassword').parent().addClass('has-success');
                $('#inputPassword').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                if ($('#inputPassword').parent().hasClass('has-success'))
                    $('#inputPassword').parent().removeClass('has-success');
                $('#inputPassword').parent().addClass('has-error');
                $('#inputPassword').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>长度在6-20之间，只能由字母数字或下划线组成');
                $('#inputPassword').focus();
                return false;
            }
        },
        validPasswordRepeat: function () {
            if (this.model.validPassword()) {
                if ($('#inputPasswordRepeat').val() === this.model.get("password")) {
                    if ($('#inputPasswordRepeat').parent().hasClass('has-error'))
                        $('#inputPasswordRepeat').parent().removeClass('has-error');
                    $('#inputPasswordRepeat').parent().addClass('has-success');
                    $('#inputPasswordRepeat').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                    return true;
                } else {
                    if ($('#inputPasswordRepeat').parent().hasClass('has-success'))
                        $('#inputPasswordRepeat').parent().removeClass('has-success');
                    $('#inputPasswordRepeat').parent().addClass('has-error');
                    $('#inputPasswordRepeat').parent().find('.control-label').html('<span class="fa fa-warning"></span>两次所输入密码不一致！');
                    $('#inputPasswordRepeat').focus();
                    return false;
                }
            } else {
                if (target.parent().hasClass('has-error'))
                    target.parent().removeClass('has-error');
                if (target.parent().hasClass('has-success'))
                    target.parent().removeClass('has-success');
                target.parent().find('.control-label').html('');
                return true;
            }
        },
        validEmail: function () {
            if ($('#inputEmail').val()) {
                this.model.set({email: $('#inputEmail').val()});
                if (this.model.validEmail()) {
                    if ($('#inputEmail').parent().has('has-error'))
                        $('#inputEmail').parent().removeClass('has-error');
                    $('#inputEmail').parent().addClass('has-success');
                    $('#inputEmail').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                    return true;
                } else {
                    if ($('#inputEmail').parent().has('has-success'))
                        $('#inputEmail').parent().removeClass('has-success');
                    $('#inputEmail').parent().addClass('has-error');
                    $('#inputEmail').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>邮箱地址格式不正确！');
                    $('#inputEmail').focus();
                    return false;
                }
            } else {
                if ($('#inputEmail').parent().hasClass('has-error'))
                    $('#inputEmail').parent().removeClass('has-error');
                if ($('#inputEmail').parent().hasClass('has-success'))
                    $('#inputEmail').parent().removeClass('has-success');
                $('#inputEmail').parent().find('.control-label').html('');
                return true;
            }

        },
        validWechat: function () {
            if ($('#inputWechat').val()) {
                this.model.set({wechat: $('#inputWechat').val()})
                if (this.model.validWechat()) {
                    if ($('#inputWechat').parent().hasClass('has-error'))
                        $('#inputWechat').parent().removeClasss('has-error');
                    $('#inputWechat').parent().addClass('has-success');
                    $('#inputWechat').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                    return true;
                } else {
                    if ($('#inputWechat').parent().hasClass('has-success'))
                        $('#inputWechat').parent().removeClasss('has-success');
                    $('#inputWechat').parent().addClass('has-error');
                    $('#inputWechat').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>长度在6-20之间，只能以字母开头，可带数字、“_”、“.”、“-”');
                    $('#inputWechat').focus();
                    return false;
                }
            } else {
                if ($('#inputWechat').parent().hasClass('has-error'))
                    $('#inputWechat').parent().removeClass('has-error');
                if ($('#inputWechat').parent().hasClass('has-success'))
                    $('#inputWechat').parent().removeClass('has-success');
                $('#inputWechat').parent().find('.control-label').html('');
                return true;
            }
        },
        doRegister: function () {
            $('button[type="submit"]').button('loading');
            if (this.validName() && this.validMobile()
                && this.validPassword() && this.validPasswordRepeat()
                && this.validEmail() && this.validWechat()) {
                this.model.fetch({url: Settings.baseUrl + 'customer/save'});
            }
        }
    });
    return UserRegisterView;
});