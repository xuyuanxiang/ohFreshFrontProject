define(['backbone',
    '../settings',
    '../model/OrderModel',
    '../collection/OrderCollection',
    '../view/order/OrderDetailView',
    '../view/order/OrderListView'
], function (Backbone, settings, OrderModel, OrderCollection, OrderDetailView, OrderListView) {
    var OrderRouter = Backbone.Router.extend({
        initialize: function () {
            this.orderListView = new OrderListView({
                el: $('#content'),
                collection: new OrderCollection
            });
            this.orderDetailView = new OrderDetailView({
                el: $('#content'),
                model: new OrderModel
            });
        },
        routes: {
            'order/get/:id': 'detail',
            'order/list': 'list',
            'order/list/:mobilephone': 'list',
            'order/list/:mobilephone/:status': 'list'
        },
        detail: function (id) {
            var results = this.orderListView.collection.where({orderId: id});
            if (results)
                this.orderDetailView.model.set(results[0]);
        },
        list: function (mobilephone, status) {
            mobilephone = mobilephone || '';
            status = status || '';
            this.orderListView.collection.fetch({url: settings.baseUrl + 'EOrder/getOrdersByCondition?mobilephone=' + mobilephone + '&status=' + status});

        }
    });
    return OrderRouter;
});