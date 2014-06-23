define(['backbone', 'text!../../../tmpl/home_seasons.html'], function (Backbone, homeSeasonsHtml) {
    var SeasonsView = Backbone.View.extend({
        initialize: function () {
//            this.listenTo(this.collection, 'change', this.render);
        },
        template: _.template(homeSeasonsHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
        }
    });
    return SeasonsView;
});