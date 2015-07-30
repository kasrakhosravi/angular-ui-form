var DefaultHelper = require('./default');

module.exports = {

    // TODO Implement.
    setData: function(pageObject, data) {
        return protractor.promise.when(true);
    },

    getData: function(pageObject) {
        var formElement = pageObject.getElement();

        // TODO: Implement a reliable way to get multiple options of a tree
        return formElement.getAttribute('multiple').then(function (multiple) {
            if (null === multiple) {
                return ''; // TODO getDataSingle();
            } else {
                return []; // TODO getDataMultiple();
            }
        });
    },

    // TODO Implement.
    clearData: function() {
        return protractor.promise.when(true);
    },
    getErrors: DefaultHelper.getErrors
};