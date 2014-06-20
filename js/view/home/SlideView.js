define(['backbone',
    'text!../../../tmpl/home_slide.html'
], function (Backbone, slideHtml) {
    var SlideView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
        },
        template: _.template(slideHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
        }
    });
    return SlideView;
});