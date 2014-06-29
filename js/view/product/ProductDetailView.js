define(['backbone', 'text!../../../tmpl/product_detail.html'], function (Backbone, productDetailHtml) {
    var ProductDetailView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        template: _.template(productDetailHtml),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
        }
    });
    return ProductDetailView;
});