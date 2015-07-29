var util = require('../util');
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
        return this.clearData(pageObject).then(function () {
            return util.walkByPromise(data, function (image) {
                return pageObject.getElement()
                    .element(by.css('input[type=file]'))
                    .sendKeys(image)
                    .then(function () {
                        return browser.sleep(1000);
                    })
                    .then(function () {
                        return browser.waitForAngular();
                    });
            });
        });
    },

    /**
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
    getData: function(pageObject) {
        return pageObject.getElement()
            .all(by.repeater('image in vm.data track by $index'))
            .count().then(function(total) {
                return total
            });
    },

    /**
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
    clearData: function(pageObject) {
        var buttons = pageObject.getElement().$$('[ng-click="vm.removeImage(image)"]');

        return buttons.count().then(function (total) {
            var promises = [];

            while (total > 0) {
                promises.push(buttons.first().click());
                total--;
            }

            return protractor.promise.all(promises);
        });
    },

    getErrors: DefaultHelper.getErrors
};