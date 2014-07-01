define(['backbone',
    'text!../../../tmpl/home_channel.html'
], function (Backbone, homeChannelHtml) {
    var ChannelView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
        },
        template: _.template(homeChannelHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
        },
        events: {
            'click .btn-plus': 'btnPlusClickHandler',
            'click .btn-minus': 'btnMinusClickHandler',
            'click .btn-cart': 'btnCartClickHandler',
        },
        btnPlusClickHandler: function (e) {
            var input = $(e.currentTarget).parent().parent().find('input[type="number"]');
            var val = input.val();
            input.val(Number(val) + 1);
        },
        btnMinusClickHandler: function (e) {
            var input = $(e.currentTarget).parent().parent().find('input[type="number"]');
            var val = input.val();
            if (val > 1) {
                input.val(Number(val) - 1);
            }
        },
        btnCartClickHandler: function (e) {
            var productId = $(e.currentTarget).parent().parent().find('input[name="productId"]').val();
            var productPrice = $(e.currentTarget).parent().parent().find('input[name="productPrice"]').val();
            var productCount = $(e.currentTarget).parent().parent().find('input[name="productCount"]').val();
            var productName = $(e.currentTarget).parent().parent().find('input[name="productName"]').val();
            var cart = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            if (cart.length > 0) {
                _.each(cart, function (item) {
                    if (item.productId === productId) {
                        item.productCount += productCount;
                    } else {
                        cart.push({productId: productId, productName: productName, productPrice: productPrice, productCount: productCount});
                    }
                });
            } else {
                cart.push({productId: productId, productName: productName, productPrice: productPrice, productCount: productCount});
            }
            $.cookie('cart', JSON.stringify(cart));
            ohFresh.navBarView.render();
        }
    });
    return ChannelView;
})
;