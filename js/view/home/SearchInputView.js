define(['backbone',
    'text!../../../tmpl/search_input.html'
], function (Backbone, searchInputHtml) {
    var SearchView = Backbone.View.extend({
        template: _.template(searchInputHtml),
        render: function () {
            this.$el.html(this.template());
        }
    });
    return SearchView;
});