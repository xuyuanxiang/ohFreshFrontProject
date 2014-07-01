define(['backbone',
    'text!../../../tmpl/product_detail.html',
    'css!../../../css/productDetail.css',
    'css!../../../css/slick.css',
    'slick'
], function (Backbone, productDetailHtml) {
    var ProductDetailView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        template: _.template(productDetailHtml),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            this.$el.find('#slickContainer').slick({
                dots: true,
                slide: 'img'
            });
        }
    });
    return ProductDetailView;
});