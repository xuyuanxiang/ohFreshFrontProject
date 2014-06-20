define(['backbone'], function (Backbone) {
    var OrderModle = Backbone.Model.extend({
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
        },
        getTotal: function () {
            return (this.get("productprice") ? Number(this.get("productprice")) : 0) * (this.get("count") ? Number(this.get("count")) : 0) + (this.get("freight") ? Number(this.get("freight")) : 0);
        }
    });
    return OrderModle;
});