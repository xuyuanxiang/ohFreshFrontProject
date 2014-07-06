define(['backbone',
    '../../settings',
    '../../collection/LocationCollection',
    '../../view/LocationSelectView',
    'text!../../../tmpl/order_create.html',
    'css!../../../css/orderCreate.css',
    'cookie',
    'bootstrap'
], function (Backbone, Settings, LocationCollection, LocationSelectView, orderCreateHtml) {
    var OrderCreateView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'sync', this.successRender);
            this.listenTo(this.model, 'error', this.errorRender);
        },
        template: _.template(orderCreateHtml),
        render: function () {
            this.$el.html(this.template(this.model));
            var user = $.cookie('user') ? JSON.parse($.cookie('user')) : {};
            var locations = new LocationCollection;
            locations.fetch({
                url: Settings.baseUrl + 'customer/getArea',
                success: function (collection) {
                    if (collection) {
                        var countries = collection.models;
                        if (user)
                            _.each(countries, function (country) {
                                if (country.get('id') == user.countryId)
                                    country.set({selected: true});
                            });
                        ohFresh.countrySelectView = new LocationSelectView({
                            el: $('#selectCountry'),
                            collection: new LocationCollection(countries)
                        });
                        ohFresh.countrySelectView.render();
                        if (countries && countries.length > 0) {
                            var provinces = countries[0].get("children");
                            if (user)
                                _.each(provinces, function (province) {
                                    if (province.id == user.provinceId)
                                        province.selected = true;
                                });
                            ohFresh.provinceSelectView = new LocationSelectView({
                                el: $('#selectProvince'),
                                collection: new LocationCollection(provinces)
                            });
                            ohFresh.provinceSelectView.render();
                            if (provinces && provinces.length > 0) {
                                var cities = provinces[0].children;
                                if (user)
                                    _.each(cities, function (city) {
                                        if (city.id == user.cityId)
                                            city.selected = true;
                                    });
                                ohFresh.citySelectView = new LocationSelectView({
                                    el: $('#selectCity'),
                                    collection: new LocationCollection(cities)
                                });
                                ohFresh.citySelectView.render();
                                if (cities && cities.length > 0) {
                                    var counties = cities[0].children;
                                    if (user)
                                        _.each(counties, function (county) {
                                            if (county.id == user.countyId)
                                                county.selected = true;
                                        });
                                    ohFresh.countySelectView = new LocationSelectView({
                                        el: $('#selectCounty'),
                                        collection: new LocationCollection(counties)
                                    });
                                    ohFresh.countySelectView.render();
                                }
                            }
                        }
                    }
                }
            });
        },
        filterCart: function (products) {
            var carts = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
            var newCarts = [];
            _.each(carts, function (cart) {
                if (_.where(products, {productId: cart.productId}).length <= 0) {
                    newCarts.push(cart);
                }
            });
            $.cookie('cart', newCarts.length > 0 ? JSON.stringify(newCarts) : null);
        },
        successRender: function () {
            $('#formOrder .btn-success').button('reset');
            this.filterCart(JSON.parse(this.model.get('products')));
            if (this.model.get('result') == 1) {
                ohFresh.confirm(this.model.get('message'), '提示', function () {
                    ohFresh.homeRouter.navigate('home', {trigger: true});
                });
            } else {
                ohFresh.alertError(this.model.get('message'));
            }

        },
        errorRender: function () {
            $('#formOrder .btn-success').button('reset');
            ohFresh.ajaxErrorHandler();
        },
        events: {
            'change #cartList #selectCountry': 'selectedCountry',
            'change #cartList #selectProvince': 'selectedProvince',
            'change #cartList #selectCity': 'selectedCity',
            'click #formOrder .btn-success': 'formOrderSubmit',
            'focusout #formOrder #inputName': 'validName',
            'focusout #formOrder #inputMobile': 'validMobile',
            'focusout #formOrder #inputEmail': 'validEmail',
            'focusout #formOrder #inputWechat': 'validWechat',
            'focusout #formOrder #inputStreet': 'validStreet',
            'click #cartList .btn-plus': 'btnPlusClickHandler',
            'click #cartList .btn-minus': 'btnMinusClickHandler',
            'click #cartList #btnRemoveItem': 'btnRemoveItem',
            'change #cartList input[name="count"]': 'productNumChangeHandler',
            'click #cartList input[name="checked"]': 'productCheckedClickHandler'
        },
        validName: function () {
            this.model.set({name: $('#inputName').val()});
            if (this.model.validName()) {
                if ($('#inputName').parent().hasClass('has-error'))
                    $('#inputName').parent().removeClass('has-error');
                $('#inputName').parent().addClass('has-success');
                $('#inputName').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                if ($('#inputName').parent().hasClass('has-success'))
                    $('#inputName').parent().removeClass('has-success');
                $('#inputName').parent().addClass('has-error');
                $('#inputName').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>只能由中文字符或英文字母组成！');
                $('#inputName').focus();
                return false;
            }
        },
        validStreet: function () {
            var homeaddress = $('#inputStreet').val();
            if (homeaddress) {
                this.model.set({homeaddress: homeaddress });
                if ($('#inputStreet').parent().hasClass('has-error'))
                    $('#inputStreet').parent().removeClass('has-error');
                $('#inputStreet').parent().addClass('has-success');
                $('#inputStreet').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                if ($('#inputStreet').parent().hasClass('has-success'))
                    $('#inputStreet').parent().removeClass('has-success');
                $('#inputStreet').parent().addClass('has-error');
                $('#inputStreet').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>不能为空！');
                $('#inputStreet').focus();
                return false;
            }
        },
        validMobile: function () {
            this.model.set({mobilephone: $('#inputMobile').val()});
            if (this.model.validMobile()) {
                if ($('#inputMobile').parent().hasClass('has-error'))
                    $('#inputMobile').parent().removeClass('has-error');
                $('#inputMobile').parent().addClass('has-success');
                $('#inputMobile').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                return true;
            } else {
                if ($('#inputMobile').parent().hasClass('has-success'))
                    $('#inputMobile').parent().removeClass('has-success');
                $('#inputMobile').parent().addClass('has-error');
                $('#inputMobile').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>只能由数字组成！');
                $('#inputMobile').focus();
                return false;
            }
        },
        validEmail: function () {
            if ($('#inputEmail').val()) {
                this.model.set({email: $('#inputEmail').val()});
                if (this.model.validEmail()) {
                    if ($('#inputEmail').parent().has('has-error'))
                        $('#inputEmail').parent().removeClass('has-error');
                    $('#inputEmail').parent().addClass('has-success');
                    $('#inputEmail').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                    return true;
                } else {
                    if ($('#inputEmail').parent().has('has-success'))
                        $('#inputEmail').parent().removeClass('has-success');
                    $('#inputEmail').parent().addClass('has-error');
                    $('#inputEmail').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>邮箱地址格式不正确！');
                    $('#inputEmail').focus();
                    return false;
                }
            } else {
                if ($('#inputEmail').parent().hasClass('has-error'))
                    $('#inputEmail').parent().removeClass('has-error');
                if ($('#inputEmail').parent().hasClass('has-success'))
                    $('#inputEmail').parent().removeClass('has-success');
                $('#inputEmail').parent().find('.control-label').html('');
                return true;
            }

        },
        validWechat: function () {
            if ($('#inputWechat').val()) {
                this.model.set({wechatcode: $('#inputWechat').val()})
                if (this.model.validWechat()) {
                    if ($('#inputWechat').parent().hasClass('has-error'))
                        $('#inputWechat').parent().removeClasss('has-error');
                    $('#inputWechat').parent().addClass('has-success');
                    $('#inputWechat').parent().find('.control-label').html('<span class="fa fa-check"></span>');
                    return true;
                } else {
                    if ($('#inputWechat').parent().hasClass('has-success'))
                        $('#inputWechat').parent().removeClasss('has-success');
                    $('#inputWechat').parent().addClass('has-error');
                    $('#inputWechat').parent().find('.control-label').html('<span class="fa fa-exclamation-triangle"></span>长度在6-20之间，只能以字母开头，可带数字、“_”、“.”、“-”');
                    $('#inputWechat').focus();
                    return false;
                }
            } else {
                if ($('#inputWechat').parent().hasClass('has-error'))
                    $('#inputWechat').parent().removeClass('has-error');
                if ($('#inputWechat').parent().hasClass('has-success'))
                    $('#inputWechat').parent().removeClass('has-success');
                $('#inputWechat').parent().find('.control-label').html('');
                return true;
            }
        },
        productCheckedClickHandler: function (e) {
            _.each(_.where(this.model.get("productCollection"), {productId: $(e.currentTarget).val()}), function (item) {
                item.checked = $(e.currentTarget).prop('checked');
            });
            this.render();
        },
        btnRemoveItem: function (e) {
            var model = this.model;
            var self = this;
            ohFresh.confirm('确定要移除此商品？', '', function () {
                var productCollection = [];
                _.each(model.get("productCollection"), function (item) {
                    if (item.productId != $(e.currentTarget).attr('data-id')) {
                        productCollection.push(item);
                    }
                });
                $.cookie('cart', JSON.stringify(productCollection));
                model.set({productCollection: productCollection});
                self.render();
                ohFresh.navBarView.render();
            }, function () {

            });
        },
        btnPlusClickHandler: function (e) {
            var countInput = $(e.currentTarget).parent().parent().find('input[name="count"]');
            var idInput = $(e.currentTarget).parent().parent().find('input[name="productId"]');
            var count = countInput.val();
            var id = idInput.val();
            _.each(_.where(this.model.get("productCollection"), {productId: id}), function (item) {
                item.productCount = Number(count) + 1;
            });
            this.render();
        },
        btnMinusClickHandler: function (e) {
            var countInput = $(e.currentTarget).parent().parent().find('input[type="number"]');
            var count = countInput.val();
            if (count > 1) {
                var idInput = $(e.currentTarget).parent().parent().find('input[name="productId"]');
                var id = idInput.val();
                _.each(_.where(this.model.get("productCollection"), {productId: id}), function (item) {
                    item.productCount = Number(count) - 1;
                });
                this.render();
            }
        },
        formOrderSubmit: function (e) {
            if (this.model.totalNum() <= 0) {
                ohFresh.alertError('您还没有选择需要结算的商品！');
                $('#cartList input[name="checked"]').focus();
                return;
            }
            if (this.validName() && this.validMobile()
                && this.validEmail() && this.validWechat()
                && this.validStreet()) {
                var countryId = this.$el.find('#selectCountry').val();
                var provinceId = this.$el.find('#selectProvince').val();
                var cityId = this.$el.find('#selectCity').val();
                var countyId = this.$el.find('#selectCounty').val();
                var products = _.where(this.model.get("productCollection"), {checked: true});
                var paymentMethod = this.$el.find('select[name="paymentＭethod"]').val();
                this.model.set({
                    countryId: countryId,
                    provinceId: provinceId,
                    cityId: cityId,
                    countyId: countyId,
                    products: JSON.stringify(products),
                    productCollection: [],
                    paymentMethod: paymentMethod
                });
                $(e.currentTarget).button('loading');
                this.model.fetch({url: Settings.baseUrl + 'eorder/save'});
            }
        },
        productNumChangeHandler: function (e) {
            var count = $(e.currentTarget).val();
            var idInput = $(e.currentTarget).parent().parent().find('input[name="productId"]');
            var id = idInput.val();
            _.each(_.where(this.model.get("productCollection"), {productId: id}), function (item) {
                item.productCount = Number(count);
            });
            this.render();
        },
        selectedCountry: function (e) {
            var currentCountry = ohFresh.countrySelectView.collection.where({id: $(e.currentTarget).val()})[0];
            var provinces = currentCountry.get("children");
            ohFresh.provinceSelectView.collection.set(provinces);
            ohFresh.provinceSelectView.render();
            var cities = provinces[0].children;
            ohFresh.citySelectView.collection.set(cities);
            ohFresh.citySelectView.render();
            var counties = cities[0].children;
            ohFresh.countySelectView.collection.set(counties);
            ohFresh.countySelectView.render();
        },
        selectedProvince: function (e) {
            var currentProvince = ohFresh.provinceSelectView.collection.where({id: $(e.currentTarget).val()})[0];
            var cities = currentProvince.get("children");
            ohFresh.citySelectView.collection.set(cities);
            ohFresh.citySelectView.render();
            var counties = cities[0].children;
            ohFresh.countySelectView.collection.set(counties);
            ohFresh.countySelectView.render();
        },
        selectedCity: function (e) {
            var currentCity = ohFresh.citySelectView.collection.where({id: $(e.currentTarget).val()})[0];
            var counties = currentCity.children;
            ohFresh.countySelectView.collection.set(counties);
            ohFresh.countySelectView.render();
        }
    });
    return OrderCreateView;
});