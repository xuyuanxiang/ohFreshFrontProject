define(['backbone',
    'text!../../../tmpl/home_slide.html',
    'slick',
    'css!http://cdn.staticfile.org/slick-carousel/1.3.6/slick.css'
], function (Backbone, slideHtml) {
    var SlideView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
        },
        template: _.template(slideHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
            $(this.el).slick({
                dots: true,
                slide: 'img'
            });
        }
    });
    return SlideView;
});