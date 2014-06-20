define(['backbone', '../model/OrderModel'], function (Backbone, OrderModel) {
    var OrderCollection = Backbone.Collection.extend({
        model: OrderModel,
        sync: function (method, collection, options) {
            return $.ajax(_.extend({
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                url: collection.url,
                processData: false,
                contentType: 'application/json;charset=utf-8'
            }, options));
        },
        parse: function (response) {
            return response;
        }
    });
    return OrderCollection;
});