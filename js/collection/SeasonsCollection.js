define(["backbone", "../model/SeasonsModel"], function (Backbone, SeasonsModel) {
    var SeasonsCollection = Backbone.Collection.extend({
        model: SeasonsModel
    });
    return SeasonsCollection;
});