define(['backbone',
    '../../settings',
    'text!../../../tmpl/user_detail.html',
    'css!../../../css/userDetail.css'
], function (Backbone, Settings, userDetailHtml) {
    var UserDetailView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(_.template(userDetailHtml, this.model.attributes));
        }
    });
    return UserDetailView;
});