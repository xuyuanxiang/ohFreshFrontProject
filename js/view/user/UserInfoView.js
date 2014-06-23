define(['backbone', 'text!../../../tmpl/user_info.html'], function (Backbone, userInfoHtml) {
    var UserDetailView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        template: _.template(userInfoHtml),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
        }
    });
    return UserDetailView;
});