define(['backbone',
    'text!../../tmpl/location_select.html'
], function (Backbone, locationSelectHtml) {
    var LocationView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'sync', this.render);
        },
        template: _.template(locationSelectHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
        }
    });
    return LocationView;
});