define(['backbone', '../model/ChannelModel'], function (Backbone, ChannelModel) {
    var ChannelCollection = Backbone.Collection.extend({
        model: ChannelModel,
        sync: function (method, collection, options) {
            return $.ajax(_.extend({
                type: 'get',
                dataType: 'json',
//                jsonpCallback: 'callback',
                url: collection.url,
                contentType: 'application/json;charset=utf-8'
            }, options));
        },
        parse: function (response) {
            return response;
        }
    });
    return ChannelCollection;
});