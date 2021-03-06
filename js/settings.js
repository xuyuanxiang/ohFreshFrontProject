define([], function () {
    return {
        baseUrl: "http://192.168.3.80:8080/tjpowermgm/",
        footBars: [
            {
                path: '#home',
                name: '主页',
                icon: 'fa-home',
                active: true
            },
            {
                path: '#user/login',
                name: '登录',
                icon: 'fa-user',
                active: false
            },
            {
                path: '#orders',
                name: '购物车',
                icon: 'fa-shopping-cart',
                active: false
            },
            {
                path: 'tel://',
                name: '客服',
                icon: 'fa-phone',
                active: false
            }
        ]
    }
});