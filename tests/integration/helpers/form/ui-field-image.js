var util = require('../util');
var DefaultHelper = require('./default');

module.exports = {

    setData: function(pageObject, data) {
        if (typeof data !== 'object') {
            data = [data];
        }

        return this.clearData(pageObject).then(function () {
            return util.walkByPromise(data, function (image) {
                return pageObject.getElement()
                    .element(by.css('input[type=file]'))
                    .sendKeys(image)
                    .then(function () {
                        return browser.sleep(5000);
                    })
                    .then(function () {
                        return browser.waitForAngular();
                    });
            });
        });
    },

    getData: function(pageObject) {
        var formElement = pageObject.getElement();

        return formElement.all(by.repeater('image in vm.data track by $index')).count().then(function(total) {
            return formElement
                .element(by.css('[ng-if="!vm.multiple() && vm.data"]')).isPresent()
                .then(function (singleImageHolderPresent) {
                    return total + singleImageHolderPresent;
                });
        });
    },

    clearData: function(pageObject) {
        var buttons = pageObject.getElement().$$('[ng-click^="vm.removeImage"]');

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