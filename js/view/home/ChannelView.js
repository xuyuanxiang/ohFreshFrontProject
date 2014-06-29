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
            this.$el.find('.control-input-addon').hide();
        },
        events: {
            'focusin .control-input-content': 'inputFocusinHandler',
            'focusout .control-input-content': 'inputFocusoutHandler',
            'click .btn-plus': 'btnPlusClickHandler',
            'click .btn-minus': 'btnMinusClickHandler',
            'click .btn-buy': ''
        },
        inputFocusinHandler: function (e) {
            $(e.currentTarget).parent().addClass('control-input-position');
            $(e.currentTarget).parent().find('.control-input-addon').fadeIn();
        },
        inputFocusoutHandler: function (e) {
            $(e.currentTarget).parent().removeClass('control-input-position');
            $(e.currentTarget).parent().find('.control-input-addon').hide();
        },
        btnPlusClickHandler: function (e) {
            var val = $(e.currentTarget).parent().parent().find('.control-input').val();
            $(e.currentTarget).parent().parent().find('.control-input').val(Number(val) + 1);
        },
        btnMinusClickHandler: function (e) {
            var val = $(e.currentTarget).parent().parent().find('.control-input').val();
            if (val > 1)
                $(e.currentTarget).parent().parent().find('.control-input').val(Number(val) - 1);
        }
    });
    return ChannelView;
})
;