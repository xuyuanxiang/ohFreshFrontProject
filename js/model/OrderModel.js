define(['backbone',
    '../util/RegExpValidator'
], function (Backbone, Validator) {
    var OrderModle = Backbone.Model.extend({
        defaults: {
            id: '',
            customerId: '',
            name: '',
            mobilephone: '',
            email: '',
            wechatcode: '',
            countryId: '',
            provinceId: '',
            cityId: '',
            countyId: '',
            homeaddress: '',
            products: '',
            productCollection: []
        },
        sync: function (method, model, options) {
            return $.ajax(_.extend({
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                url: model.url,
                contentType: 'application/json;charset=utf-8'
            }, options));
        },
        parse: function (response) {
            return response;
        },
        getTotal: function () {
            return (this.get("productprice") ? Number(this.get("productprice")) : 0) * (this.get("count") ? Number(this.get("count")) : 0) + (this.get("freight") ? Number(this.get("freight")) : 0);
        },
        totalPrice: function () {
            var total = 0;
            _.each(this.get('productCollection'), function (product) {
                if (product.checked)
                    total += Number(product.productCount) * Number(product.productPrice)
            });
            return total;
        },
        totalNum: function () {
            return _.where(this.get('productCollection'), {checked: true}).length;
        },
        validName: function () {
            return Validator.isTrueName(this.get("name"));
        },
        validMobile: function () {
            return Validator.isMobile(this.get("mobilephone"));
        },
        validEmail: function () {
            return !this.get("email") || Validator.isEmail(this.get("email"));
        },
        validWechat: function () {
            return !this.get("wechat") || Validator.isWechat(this.get("wechat"));
        }
    });
    return OrderModle;
});