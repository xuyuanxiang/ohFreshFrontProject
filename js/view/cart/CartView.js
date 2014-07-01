define(['backbone',
    'text!../../../tmpl/cart_list.html',
    'css!../../../css/cart.css'
], function (Backbone, cartListHtml) {
    var CartView = Backbone.View.extend({
        template: _.template(cartListHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
        },
        events: {
            'click input[type="checkbox"]': 'checkboxClickHandler'
        },
        checkboxClickHandler: function (e) {
            alert($(e.currentTarget).val());
        }
    });
    return CartView;
});