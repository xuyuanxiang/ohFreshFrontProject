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
            'click #homeChannel .btn-plus': 'btnPlusClickHandler',
            'click #homeChannel .btn-minus': 'btnMinusClickHandler',
            'click #homeChannel .btn-cart': 'btnAddToCartClickHandler',
            'click #homeChannel .btn-order': 'btnCreateOrderClickHandler',
            'change #homeChannel select[name="product"]': 'productSelectedHandler',
            'change #homeChannel input[name="productCount"]': 'productCountChangeHandler'
        },
        productCountChangeHandler: function (e) {
            $('#price').html(Number(this.$el.find('select[name="product"]').find('option:selected').attr('data-price')) * Number($(e.currentTarget).val()));
        },
        productSelectedHandler: function (e) {
            var item = $(e.currentTarget).find('option:selected');
            $(e.currentTarget).parent().parent().find('.price').html(item.attr('data-price'));
            $(e.currentTarget).parent().parent().find('input[name="productCount"]').val(1);
        },
        btnPlusClickHandler: function (e) {
            var input = $(e.currentTarget).parent().parent().parent().find('input[type="number"]');
            var val = input.val();
            input.val(Number(val) + 1);
            $(e.currentTarget).parent().parent().parent().find('.price').html(Number(this.$el.find('select[name="product"]').find('option:selected').attr('data-price')) * (Number(val) + 1));
        },
        btnMinusClickHandler: function (e) {
            var input = $(e.currentTarget).parent().parent().parent().find('input[type="number"]');
            var val = input.val();
            if (val > 1) {
                input.val(Number(val) - 1);
                $(e.currentTarget).parent().parent().parent().find('.price').html(Number(this.$el.find('select[name="product"]').find('option:selected').attr('data-price')) * (Number(val) - 1));
            }
        },
        btnCreateOrderClickHandler: function (e) {
            var productDom = $(e.currentTarget).parent().parent().find('select[name="product"]').find('option:selected');
            var productId = productDom.val();
            var productName = productDom.text();
            var productPrice = productDom.attr('data-price');
            var productCount = $(e.currentTarget).parent().parent().find('input[name="productCount"]').val();
            ohFresh.orderRouter.navigate('order/' + productId + '/' + productName + '/' + productPrice + '/' + productCount, {trigger: true});
        },
        btnAddToCartClickHandler: function (e) {
            var productDom = $(e.currentTarget).parent().parent().find('select[name="product"]').find('option:selected');
            var productId = productDom.val();
            var productPrice = productDom.attr('data-price');
            var productCount = $(e.currentTarget).parent().parent().find('input[name="productCount"]').val();
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
});