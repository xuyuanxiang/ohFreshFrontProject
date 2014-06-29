define(['backbone',
    '../util/RegExpValidator'
], function (Backbone, Validator) {
    var UserModel = Backbone.Model.extend({
        defaults: {
            name: '',
            mobilephone: '',
            password: '',
            email: '',
            wechat: '',
            homeaddress: ''
        },
        sync: function (method, model, options) {
            return $.ajax(_.extend({
                type: 'post',
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                url: model.url,
                data: model.attributes,
                contentType: 'application/json;charset=utf-8'
            }, options));
        },
        parse: function (response) {
            return response;
        },
        validate: function (attrs, options) {
            if (!attrs.mobilephone) {
                return '手机号不能为空！';
            }
            if (!attrs.password) {
                return '密码不能为空！';
            }
        },
        validName: function () {
            return Validator.isTrueName(this.get("name"));
        },
        validMobile: function () {
            return Validator.isMobile(this.get("mobilephone"));
        },
        validPassword: function () {
            return Validator.isPassword(this.get("password"));
        },
        validEmail: function () {
            return !this.get("email") || Validator.isEmail(this.get("email"));
        },
        validWechat: function () {
            return !this.get("wechat") || Validator.isWechat(this.get("wechat"));
        }
    });
    return UserModel;
});