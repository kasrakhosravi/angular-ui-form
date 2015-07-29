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
        return protractor.promise.when(true); // TODO
    },

    /**
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
    getData: function(pageObject) {
        return []; // TODO
    },

    getErrors: DefaultHelper.getErrors
};