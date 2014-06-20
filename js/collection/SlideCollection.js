define(['backbone', '../model/SlideModel'], function (Backbone, SlideModel) {
    var SlideCollection = Backbone.Collection.extend({
        model: SlideModel
    });
    return SlideCollection;
});