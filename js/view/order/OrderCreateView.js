define(['backbone',
    'text!../../../tmpl/order_create.html'
], function (Backbone, orderCreateHtml) {
    var OrderCreateView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'sync', this.successRender);
        },
        template: _.template(orderCreateHtml),
        render: function () {
            this.$el.html(this.template(this.model));
        },
        successRender: function () {
        },
        events: {
            'change #selectCountry': 'selectedCountry',
            'change #selectProvince': 'selectedProvince',
            'change #selectCity': 'selectedCity'
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