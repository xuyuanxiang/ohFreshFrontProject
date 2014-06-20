define(['backbon', 'text!../../../tmpl/reservation_list.html'], function (Backbone, reservationListHtml) {
    var ReservationListView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
        },
        template: _.template(reservationListHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
        }

    });
    return ReservationListView;
});