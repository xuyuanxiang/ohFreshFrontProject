define(['backbone',
    '../collection/SlideCollection',
    '../collection/SeasonsCollection',
    '../view/home/HomeLayoutView',
    '../view/home/SearchInputView',
    '../view/home/SlideView',
    '../view/home/SeasonsView'
], function (Backbone, SlideCollection, SeasonsCollection, HomeLayoutView, SearchInputView, SlideView, SeasonsView) {
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
                ohFresh.changeBar({path: '#user/login'}, {name: '我的', path: '#user/' + user.id});
            } else {
                ohFresh.changeBar({name: '我的'}, {name: '登录', path: '#user/login'});
            }
            ohFresh.navTitleView.render({
                left: {
                    url: 'index.html',
                    label: '返回',
                    icon: 'fa-chevron-left'
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
            this.seasonsView = new SeasonsView({
                el: $('#seasonsContainer'),
                collection: new SeasonsCollection
            });
            this.searchInputView.render();
            this.slideView.render();
            this.seasonsView.render();
        }
    });
    return HomeRouter;
});