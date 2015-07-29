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
        return protractor.promise.when(true);
    },

    /**
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
    getData: function(pageObject) {
        var formElement = pageObject.getElement();

        return formElement.getAttribute('multiple').then(function (multiple) {
            if (null === multiple) {
                return ''; // TODO getDataSingle();
            } else {
                return []; // TODO getDataMultiple();
            }
        });
    },

    getErrors: DefaultHelper.getErrors
};