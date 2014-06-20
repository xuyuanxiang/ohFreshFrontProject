define(['backbone'], function (Backbone) {
    var UserModel = Backbone.Model.extend({
        sync: function (method, model, options) {
            return $.ajax(_.extend({
                type: 'post',
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                url: model.url,
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
        }
    });
    return UserModel;
});