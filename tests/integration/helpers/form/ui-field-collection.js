var _ = require('lodash');
var util = require('../util');
var FormPageObject = require('../form.po');
var DefaultHelper = require('./default');

module.exports = {

    setData: function(pageObject, data) {
        var formElement = pageObject.getElement(),
            addButton = formElement.element(by.css('.field-collection-add-button'));

        return this.clearData(pageObject).then(function () {
            return util.walkByPromise(data, function () {
                return addButton.click()
                    .then(function () {
                        return browser.waitForAngular();
                    })
                    .then(function () {
                        var lastFieldset = formElement.all(by.xpath('./ui-field-row/div/div/ng-transclude/ul/li')).last(),
                            formPageObject = new FormPageObject(lastFieldset);

                        // We have a ui-fieldset as a wrapper in our collection items which has a numeric property
                        // `data` variable holds a numeric array, this `formPageObject` is expecting data from one of these indexes.
                        // So it will use the one it wants and ignores the others. That why we're passing data directly to every child.
                        return formPageObject.setData(data);
                    });
            });
        });
    },

    getData: function(pageObject) {
        var deferred = protractor.promise.defer(),
            children = pageObject.getElement().all(by.xpath('./ui-field-row/div/div/ng-transclude/ul/li')),
            data = {};

        children.count().then(function (total) {
            if (total > 0) {
                children.each(function (child, index) {
                    var formPageObject = new FormPageObject(child);
                    formPageObject.getData().then(function (childData) {
                        _.merge(data, childData);

                        if (index >= total - 1) {
                            deferred.fulfill(util.objectValues(data));
                        }
                    });
                });
            } else {
                deferred.fulfill(data);
            }
        });

        return deferred.promise;
    },

    clearData: function(pageObject) {
        pageObject.children = [];

        var children = pageObject.getElement().all(by.xpath('./ui-field-row/div/div/ng-transclude/ul/li'));
        return children.count().then(function (total) {
            var promises = [];

            while (total > 0) {
                promises.push(children.first().element(by.xpath('./a')).click());
                total--;
            }

            return protractor.promise.all(promises);
        });
    },

    getErrors: DefaultHelper.getErrors
};