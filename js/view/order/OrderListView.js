define(['backbone',
    'text!../../../tmpl/order_list.html',
    'css!../../../css/orderList.css'
], function (Backbone, orderListHtml) {
    var OrderListView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
        },
        render: function () {
            this.$el.html(_.template(orderListHtml, {collection: this.collection.models}));
        }
    });
    return OrderListView;
});