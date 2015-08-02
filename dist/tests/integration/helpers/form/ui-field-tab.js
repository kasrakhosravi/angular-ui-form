var _ = require('lodash');
var util = require('../util');
var FormPageObject = require('../form.po');
var DefaultHelper = require('./default');

module.exports = {

    setData: function(pageObject, data) {
        return pageObject.buildChildrenPageObjects().then(function (children) {
            if (children.length > 0) {
                // Only if it has children otherwise default helper tries to look for a vm.data (because it thinks its a simple field)
                return DefaultHelper.setData(pageObject, data);
            } else {
                return protractor.promise.when(true);
            }
        });
    },

    getData: function(pageObject) {
        return pageObject.buildChildrenPageObjects().then(function (children) {
            if (children.length > 0) {
                // Only if it has children otherwise default helper tries to look for a vm.data (because it thinks its a simple field)
                return DefaultHelper.getData(pageObject);
            } else {
                return protractor.promise.when(null);
            }
        });
    },

    clearData: DefaultHelper.clearData,
    getErrors: DefaultHelper.getErrors
};