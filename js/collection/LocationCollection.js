define(['backbone', '../model/LocationModel'], function (Backbone, LocationModel) {
    var LocationCollection = Backbone.Collection.extend({
            model: LocationModel,
            sync: function (method, collection, options) {
                return $.ajax(_.extend({
                    type: 'get',
                    dataType: 'jsonp',
                    jsonpCallback: 'callback',
                    url: collection.url,
                    contentType: 'application/json;charset=utf-8'
                }, options));
            },
            parse: function (response) {
                if (response) {
                    return JSON.parse(response);
                } else {
                    return [];
                }
            }
        })
        ;
    return LocationCollection;
})
;