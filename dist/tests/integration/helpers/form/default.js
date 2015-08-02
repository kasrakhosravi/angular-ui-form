var _ = require('lodash');
var util = require('../util');

/**
 * This is the default form data-helper which is used for most of our fields.
 *
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
        return pageObject.buildChildrenPageObjects().then(function (children) {
            if (children.length > 0) {
                var currentChild,
                    deferred = protractor.promise.defer(),
                    visited = [];

                util.promiseWhile(function () {
                    while (currentChild = children.shift()) {
                        if (visited.indexOf(currentChild.getIdentifier()) == -1) {
                            return true;
                        }
                    }

                    // All children set. Hopefully :)
                    deferred.fulfill(true);

                    return false;
                }, function () {

                    // Mark as visited
                    visited.push(currentChild.getIdentifier());

                    return currentChild.getProperty()
                        .then(function (property) {
                            // If property does not exist it means child field needs direct parent data.
                            if (property) {
                                if (typeof data[property] !== 'undefined') {
                                    return currentChild.setData(data[property]);
                                } else {
                                    return protractor.promise.when(true);
                                }
                            } else {
                                return currentChild.setData(data);
                            }
                        })
                        .then(function (result) {
                            // FIXME This is a very expensive call, we need this because of dynamically changing forms. Perhaps we should change our e2e-form helpers architecture.
                            return pageObject.buildChildrenPageObjects().then(function (updatedChildren) {
                                children = updatedChildren;
                                return result;
                            });
                        });
                });

                return deferred.promise;
            } else {
                var element = pageObject.getElement().element(by.model('vm.data'));

                element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a")).sendKeys(protractor.Key.BACK_SPACE);
                element.clear();

                return element.sendKeys(data);
            }
        });
    },

    /**
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
    getData: function(pageObject) {
        return pageObject.buildChildrenPageObjects().then(function (children) {
            var data,
                promise,
                deferred = protractor.promise.defer();

            if (children.length > 0) {
                data = {};

                promise = util.walkByPromise(children, function (child) {
                    return child.getProperty().then(function (property) {
                        return child.getData().then(function (childData) {
                            if (childData &&
                                childData !== '' &&
                                (!_.isObject(childData) || Object.keys(childData).length > 0) &&
                                (!_.isArray(childData) || childData.length > 0)
                            ) {
                                if (property) {
                                    if (typeof data[property] === 'object') {
                                        _.merge(data[property], childData);
                                    } else {
                                        data[property] = childData;
                                    }
                                } else {
                                    if (typeof childData === 'object') {
                                        _.merge(data, childData);
                                    } else {
                                        data = childData;
                                    }
                                }
                            }
                        });
                    });
                });

                promise.then(function () {
                    deferred.fulfill(data);
                });

                return deferred.promise;
            } else {
                return pageObject.getElement().element(by.model('vm.data')).getAttribute('value');
            }
        });
    },

    /**
     * @param pageObject
     * @returns {Promise}
     */
    clearData: function(pageObject) {
        return pageObject.buildChildrenPageObjects().then(function (children) {
            if (children.length > 0) {
                return util.walkByPromise(children, function (childPageObject) {
                    return childPageObject.clearData();
                });
            } else {
                return pageObject.getElement()
                    .element(by.model('vm.data'))
                    .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"))
                    .sendKeys(protractor.Key.BACK_SPACE)
                    .clear();
            }
        });
    },

    /**
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
    getErrors: function(pageObject) {
        return pageObject.buildChildrenPageObjects().then(function (children) {
            var errorObject,
                promise,
                deferred = protractor.promise.defer();

            errorObject = {
                errors: [],
                children: {}
            };

            if (children.length > 0) {
                promise = util.walkByPromise(children, function (child) {
                    return child.getProperty().then(function (property) {
                        return child.getErrors().then(function (childErrorObject) {
                            if (Object.keys(childErrorObject).length > 0) {
                                if (property) {
                                    errorObject.children[property] = childErrorObject;
                                } else {
                                    _.merge(errorObject, childErrorObject);
                                }
                            }
                        });
                    });
                });

                promise.then(function () {
                    deferred.fulfill(clearEmptyErrors(errorObject));
                });
            } else {
                var errorElements = pageObject.getElement().all(by.repeater('error in vm.errors.errors track by $index'));

                errorElements.count().then(function (total) {
                    if (total > 0) {
                        errorElements.each(function (erEl, index) {
                            erEl.getText().then(function (errorText) {
                                errorObject.errors.push(errorText);

                                // Last Item
                                if (index === total - 1) {
                                    deferred.fulfill(clearEmptyErrors(errorObject));
                                }
                            });
                        });
                    } else {
                        deferred.fulfill(clearEmptyErrors(errorObject));
                    }
                });
            }

            return deferred.promise;
        });

        /**
         * @param errorObject
         * @returns {object}
         */
        function clearEmptyErrors(errorObject) {
            if (errorObject.errors && errorObject.errors.length === 0) {
                delete errorObject['errors'];
            }

            if (errorObject.children && Object.keys(errorObject.children).length === 0) {
                delete errorObject['children'];
            }

            return errorObject;
        }
    }
};