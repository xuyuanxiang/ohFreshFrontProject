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
            'click .btn-cart': 'btnAddToCartClickHandler',
            'click .btn-order': 'btnCreateOrderClickHandler',
            'change select[name="product"]': 'productSelectedHandler',
            'change input[name="productCount"]': 'productCountChangeHandler'
        },
        productCountChangeHandler: function (e) {
            $('#price').html(Number($('#selectProduct').find('option:selected').attr('data-price')) * Number($(e.currentTarget).val()));
        },
        productSelectedHandler: function (e) {
            var item = $(e.currentTarget).find('option:selected');
            $('#price').html(item.attr('data-price'));
            $('input[name="productCount"]').val(1);
        },
        btnPlusClickHandler: function (e) {
            var input = $(e.currentTarget).parent().parent().find('input[type="number"]');
            var val = input.val();
            input.val(Number(val) + 1);
            $('#price').html(Number($('#selectProduct').find('option:selected').attr('data-price')) * (Number(val) + 1));
        },
        btnMinusClickHandler: function (e) {
            var input = $(e.currentTarget).parent().parent().find('input[type="number"]');
            var val = input.val();
            if (val > 1) {
                input.val(Number(val) - 1);
                $('#price').html(Number($('#selectProduct').find('option:selected').attr('data-price')) * (Number(val) - 1));
            }
        },
        btnCreateOrderClickHandler: function (e) {
            var productDom = $('#selectProduct').find('option:selected');
            var productId = productDom.val();
            var productName = productDom.text();
            var productPrice = productDom.attr('data-price');
            var productCount = $('input[name="productCount"]').val();
            ohFresh.orderRouter.createOrder(productId, productName, productPrice, productCount);
        },
        btnAddToCartClickHandler: function (e) {
            var productDom = $('#selectProduct').find('option:selected');
            var productId = productDom.val();
            var productPrice = productDom.attr('data-price');
            var productCount = $('input[name="productCount"]').val();
            var productName = productDom.text();
            var cart = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            if (cart.length > 0) {
                _.each(cart, function (item) {
                    if (item.productId === productId) {
                        item.productCount = Number(item.productCount) + Number(productCount);
                        ohFresh.alertSuccess('该商品已在购物车中！')
                    } else {
                        cart.push({productId: productId, productName: productName, productPrice: productPrice, productCount: productCount, checked: false});
                        ohFresh.alertSuccess('添加成功！')
                    }
                });
            } else {
                cart.push({productId: productId, productName: productName, productPrice: productPrice, productCount: productCount, checked: false});
                ohFresh.alertSuccess('添加成功！')
            }
            $.cookie('cart', JSON.stringify(cart));
            ohFresh.navBarView.render();
        }
    });
    return ChannelView;
})
;