define(['backbone', '../model/PrivilegeModel'], function (Backbone, PrivilegeModel) {
    var PrivilegeCollection = Backbone.Collection.extend({
        model: PrivilegeModel
    });
    return PrivilegeCollection;
});
