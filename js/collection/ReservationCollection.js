define(['backbone', '../model/ReservationModel'], function (Backbone, ReservationModel) {
    var ReservationCollection = Backbone.Collection.extend({
        model: ReservationModel
    });
    return ReservationCollection;
});