define(['backbone', 'text!../../../tmpl/product_hot.html'], function (Backbone, productHotHtml) {
    var ProductHotView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
        },
        template: _.template(productHotHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
        }

    });
    return ProductHotView;
});