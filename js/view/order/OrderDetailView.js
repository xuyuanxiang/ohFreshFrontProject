define(['backbone',
    'text!../../../tmpl/order_detail.html',
    'css!../../../css/orderDetail.css'
], function (Backbone, orderDetailHtml) {
    var OrderDetailView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            alert(JSON.stringify(this.model.attributes()));
            this.$el.html(_.template(orderDetailHtml, this.model.attributes()));
        }
    });
    return OrderDetailView;
});