define(['backbone',
    '../settings',
    '../collection/ChannelCollection',
    '../collection/ProductCollection',
    '../collection/SlideCollection',
    '../view/home/HomeLayoutView',
    '../view/home/SearchInputView',
    '../view/home/SlideView',
    '../view/home/ChannelView'
], function (Backbone, settings, ChannelCollection, ProductCollection, SlideCollection, HomeLayoutView, SearchInputView, SlideView, ChannelView) {
    var HomeRouter = Backbone.Router.extend({
        initialize: function () {
            this.homeLayoutView = new HomeLayoutView({
                el: $('#content')
            });
        },
        routes: {
            '': 'default',
            'home': 'default'
        },
        default: function () {
            var userCookie = $.cookie('user');
            if (userCookie) {
                var user = JSON.parse(userCookie);
                if (user && user.id)
                    ohFresh.changeBar({path: '#user/login'}, {name: '我的', path: '#user/' + user.id});
            } else {
                ohFresh.changeBar({name: '我的'}, {name: '登录', path: '#user/login'});
            }
            ohFresh.navTitleView.render({
                left: {
                    url: '',
                    label: '',
                    icon: ''
                }
            });
            ohFresh.activeBar('主页');
            this.homeLayoutView.render();
            this.searchInputView = new SearchInputView({
                el: $('#searchContainer')
            });
            this.slideView = new SlideView({
                el: $('#slideContainer'),
                collection: new SlideCollection
            });
            this.searchInputView.render();
            this.slideView.render();
            this.channelView = new ChannelView({
                el: $('#channelContainer'),
                collection: new ChannelCollection
            });
            this.channelView.collection.fetch({
                url: "data/d.json"
            });
        }
    });
    return HomeRouter;
});