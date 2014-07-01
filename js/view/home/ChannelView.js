define(['backbone',
    'text!../../../tmpl/home_channel.html'
], function (Backbone, homeChannelHtml) {
    var ChannelView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
        },
        template: _.template(homeChannelHtml),
        render: function () {
            this.$el.html(this.template(this.collection));
//            this.$el.find('.control-input-addon').hide();
        },
        events: {
//            'focusin .control-input-content': 'inputFocusinHandler',
//            'focusout .control-input-content': 'inputFocusoutHandler',
            'click .btn-plus': 'btnPlusClickHandler',
            'click .btn-minus': 'btnMinusClickHandler'
        },
//        inputFocusinHandler: function (e) {
//            $(e.currentTarget).parent().addClass('control-input-position');
//            $(e.currentTarget).parent().find('.control-input-addon').fadeIn();
//        },
//        inputFocusoutHandler: function (e) {
//            $(e.currentTarget).parent().removeClass('control-input-position');
//            $(e.currentTarget).parent().find('.control-input-addon').hide();
//        },
        btnPlusClickHandler: function (e) {
            var input = $(e.currentTarget).parent().parent().find('input[type="number"]');
            var val = input.val();
            input.val(Number(val) + 1);
        },
        btnMinusClickHandler: function (e) {
            var input = $(e.currentTarget).parent().parent().find('input[type="number"]');
            var val = input.val();
            if (val > 1) {
                input.val(Number(val) - 1);
            }
        }
    });
    return ChannelView;
})
;