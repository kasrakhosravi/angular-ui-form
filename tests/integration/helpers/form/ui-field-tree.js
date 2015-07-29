var DefaultHelper = require('./default');

/**
 * @type {{setData: Function, getData: Function}}
 */
module.exports = {

    /**
     * @param {FormPageObject} pageObject
     * @param {*} data
     *
     * @return {Promise}
     */
    setData: function(pageObject, data) {
        // TODO Implement.
        return protractor.promise.when(true);
    },

    /**
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
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

    clearData: function() {
        // TODO Implement.
        return protractor.promise.when(true);
    },
    getErrors: DefaultHelper.getErrors
};