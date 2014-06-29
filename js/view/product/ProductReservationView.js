define(['backbone', 'text!../../../tmpl/product_reservation.html'], function (Backbone, productReservationHtml) {
    var ProductReservationView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
        },
        template: _.template(productReservationHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
        }
    });
    return ProductReservationView;
});