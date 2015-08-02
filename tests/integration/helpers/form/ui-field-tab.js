var _ = require('lodash');
var util = require('../util');
var FormPageObject = require('../form.po');
var DefaultHelper = require('./default');

module.exports = {

    setData: function(pageObject, data) {
        return pageObject.buildChildrenPageObjects().then(function (children) {
            if (children.length > 0) {
                var headers = pageObject.getElement().all(by.xpath('./ui-field-row/div/div/ng-transclude/div/ul/li'));

                return util.walkByPromise(children, function (child, index) {
                    return child.getProperty().then(function (property) {
                        return headers.get(index).getText().then(function (tabHeading) {
                            var key = null;

                            if (data[property]) {
                                key = property;
                            } else if (data[tabHeading]) {
                                key = tabHeading;
                            }

                            if (key) {
                                return headers.get(index).click().then(function () {
                                    var chunk = {};
                                        chunk[property] = data[key];

                                    return DefaultHelper.setData(pageObject, chunk);
                                });
                            } else {
                                return protractor.promise.when(true);
                            }
                        })
                    });
                });
            } else {
                return protractor.promise.when(true);
            }
        });
    },

    getData: function(pageObject) {
        var formElement = pageObject.getElement();

        return pageObject.buildChildrenPageObjects().then(function (children) {

            // Only if it has children otherwise default helper tries to look for a vm.data (because it thinks its a simple field)
            if (children.length > 0) {
                var headers = formElement.all(by.xpath('./ui-field-row/div/div/ng-transclude/div/ul/li')),
                    data = {};

                return headers
                    .map(function (element, index) {
                        return {
                            index: index,
                            text: element.getText()
                        };
                    })
                    .then(function (headersArray) {
                        return util.walkByPromise(headersArray, function (header) {
                            return headers.get(header.index).element(by.xpath('./a')).click().then(function () {
                                return DefaultHelper.getData(
                                    new FormPageObject(
                                        formElement
                                            .all(by.xpath('./ui-field-row/div/div/ng-transclude/div/div/div'))
                                            .get(header.index)
                                            .element(by.xpath('./ui-fieldset'))
                                    )
                                )
                                .then(function (paneData) {
                                    data[header.text] = paneData;
                                });
                            });
                        });
                    })
                    .then(function () {
                        return data;
                    });
            } else {
                return protractor.promise.when(null);
            }
        });
    },

    clearData: DefaultHelper.clearData,
    getErrors: DefaultHelper.getErrors
};
