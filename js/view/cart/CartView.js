define(['backbone',
    'text!../../../tmpl/cart_list.html',
    'css!../../../css/cart.css'
], function (Backbone, cartListHtml) {
    var CartView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
        },
        template: _.template(cartListHtml),
        render: function () {
            var totalPrice = 0;
            var totalNum = 0;
            _.each(this.collection.models, function (model) {
                if (model.get("checked")) {
                    totalPrice = Number(model.get("productCount")) * Number(model.get("productPrice"));
                    totalNum += 1;
                }
            });
            this.$el.html(this.template({models: this.collection.models, totalPrice: totalPrice, totalNum: totalNum}));
        },
        events: {
            'click input[type="checkbox"]': 'checkboxClickHandler',
            'click .btn-plus': 'btnPlusClickHandler',
            'click .btn-minus': 'btnMinusClickHandler'
        },
        checkboxClickHandler: function (e) {
            _.each(this.collection.where({productId: $(e.currentTarget).val()}), function (model) {
                model.set({checked: $(e.currentTarget).prop('checked')});
            });
        },
        btnPlusClickHandler: function (e) {

        },
        btnMinusClickHandler: function (e) {

        }
    });
    return CartView;
});