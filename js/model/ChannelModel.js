define(['backbone'], function (Backbone) {
    var ChannelModel = Backbone.Model.extend({
        defaults: {
            id: "",
            name: ""
        },
        sync: function (method, model, options) {
            return $.ajax(_.extend({
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                url: model.url,
                contentType: 'application/json;charset=utf-8'
            }, options));
        },
        parse: function (response) {
            return response;
        }
    });
    return ChannelModel;
});