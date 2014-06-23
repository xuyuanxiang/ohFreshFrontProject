define(['backbone', '../../util/RegExpValid', 'text!../../../tmpl/user_register.html'], function (Backbone, Validator, userRegisterHtml) {
    var UserRegisterView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        template: _.template(userRegisterHtml),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
        },
        events: {
            'focusout #inputName': 'validName',
            'focusout #inputMobile': 'validMobile',
            'focusout #inputPassword': 'validPassword',
            'focusout #inputPasswordRepeat': 'validPasswordRepeat',
            'focusout #inputEmail': 'validEmail',
            'focusout #inputWechat': 'validWechat',
            'click #btnRegisterSubmit': 'doRegister'
        },
        validName: function () {
            if (Validator.isTrueName($('#inputName').val())) {
                $('#inputName').parent().removeClass('has-error').addClass('has-success');
                $('#inputName').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                $('#inputName').parent().removeClass('has-success').addClass('has-error');
                $('#inputName').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>只能由中文字符或英文字母组成！');
                $('#inputName').focus();
                return false;
            }
        },
        validMobile: function () {
            if (Validator.isMobile($('#inputMobile').val())) {
                $('#inputMobile').parent().removeClass('has-error').addClass('has-success');
                $('#inputMobile').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                $('#inputMobile').parent().removeClass('has-success').addClass('has-error');
                $('#inputMobile').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>只能由数字组成！');
                $('#inputMobile').focus();
                return false;
            }
        },
        validPassword: function () {
            if (Validator.isPassword($('#inputPassword').val())) {
                $('#inputPassword').parent().removeClass('has-error').addClass('has-success');
                $('#inputPassword').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                $('#inputPassword').parent().removeClass('has-success').addClass('has-error');
                $('#inputPassword').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>长度在6-20之间，只能由字母数字或下划线组成');
                $('#inputPassword').focus();
                return false;
            }
        },
        validPasswordRepeat: function () {
            if (Validator.isPassword($('#inputPassword').val())) {
                if ($('#inputPasswordRepeat').val() === $('#inputPassword').val()) {
                    $('#inputPasswordRepeat').parent().removeClass('has-error').addClass('has-success');
                    $('#inputPasswordRepeat').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                    return true;
                } else {
                    $('#inputPasswordRepeat').parent().removeClass('has-success').addClass('has-error');
                    $('#inputPasswordRepeat').parent().find('.control-label').html('<span class="fa fa-warning"></span>两次所输入密码不一致！');
                    $('#inputPasswordRepeat').focus();
                    return false;
                }
            } else {
                $('#inputEmail').parent().removeClasss('has-error').removeClasss('has-success');
                $('#inputEmail').parent().find('.control-label').html('');
                return true;
            }
        },
        validEmail: function () {
            if ($('#inputEmail').val()) {
                if (Validator.isEmail($('#inputEmail').val())) {
                    $('#inputEmail').parent().removeClass('has-error').addClass('has-success');
                    $('#inputEmail').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                    return true;
                } else {
                    $('#inputEmail').parent().removeClass('has-success').addClass('has-error');
                    $('#inputEmail').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>邮箱地址格式不正确！');
                    $('#inputEmail').focus();
                    return false;
                }
            } else {
                $('#inputEmail').parent().removeClasss('has-error').removeClasss('has-success');
                $('#inputEmail').parent().find('.control-label').html('');
                return true;
            }

        },
        validWechat: function () {
            if ($('#inputWechat').val()) {
                if (Validator.isWechat($(e.currentTarget).val())) {
                    $('#inputWechat').parent().removeClasss('has-error').addClass('has-success');
                    $('#inputWechat').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                    return true;
                } else {
                    $('#inputWechat').parent().removeClass('has-success').addClass('has-error');
                    $('#inputWechat').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>长度在6-20之间，只能以字母开头，可带数字、“_”、“.”、“-”');
                    $('#inputWechat').focus();
                    return false;
                }
            } else {
                $('#inputWechat').parent().removeClasss('has-error').removeClasss('has-success');
                $('#inputWechat').parent().find('.control-label').html('');
                return true;
            }
        },
        doRegister: function (e) {
            if (this.validName() && this.validMobile()
                && this.validPassword() && this.validPasswordRepeat()
                && this.validEmail() && this.validWechat()) {
                alert('regist');
            }
        }
    });
    return UserRegisterView;
});