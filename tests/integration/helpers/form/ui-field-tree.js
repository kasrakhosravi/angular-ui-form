var _ = require('lodash');
var util = require('../util');
var DefaultHelper = require('./default');

function isNodeSelected(nodeElement) {
    return nodeElement.element(by.xpath('./div/i[contains(@class, "glyphicon-ok")]')).isPresent().then(function (nodeSelected) {
        return nodeSelected;
    });
}

module.exports = {

    setData: function(pageObject, data) {
        return util.walkByPromise(data, function (originalNodePath) {
            return selectNode(
                pageObject.getElement().element(by.css('.angular-ui-tree')),
                _.clone(originalNodePath)
            );

            function selectNode(nodeElement, nodePath) {
                if (nodePath.length > 0) {

                    var firstStep = nodePath.shift(),
                        childNodes = nodeElement.all(by.xpath('./ol/li')),
                        d = protractor.promise.defer(),
                        resolved = false;

                    childNodes.count().then(function (total) {
                        childNodes.each(function (childNodeElement, index) {
                            childNodeElement.element(by.xpath('./div')).getText().then(function (text) {
                                if (!resolved) {
                                    if (firstStep === _.trim(text)) {
                                        var promise;

                                        if (nodePath.length === 0) {
                                            promise = isNodeSelected(childNodeElement).then(function (selected) {
                                                if (!selected) {
                                                    return childNodeElement.element(by.xpath('./div')).click();
                                                }
                                            });
                                        } else {
                                            promise = selectNode(childNodeElement, nodePath);
                                        }

                                        promise.then(function () {
                                            resolved = true;
                                            d.fulfill(true);
                                        }, d.reject);

                                    } else if (index >= total - 1) {
                                        d.reject('Could not find node on path "' + originalNodePath.join(' -> ') + '" in ui-field-tree');
                                    }
                                }
                            }, function (err) {
                                d.reject(err);
                            });
                        });
                    });

                    return d.promise;
                } else {
                    return protractor.promise.when(true);
                }
            }
        });
    },

    getData: function(pageObject) {
        var data = [];

        return getSelectedNodesPaths(
            pageObject.getElement().element(by.css('.angular-ui-tree'))
        )
            .then(function () {
                return data;
            });

        function getSelectedNodesPaths(nodeElement, parentPath) {
            if (typeof parentPath === 'undefined') {
                parentPath = []; // Root node's parent path
            }

            var textElement = nodeElement.element(by.xpath('./div'));

            return textElement.isPresent().then(function (hasText) {
                return (hasText ? textElement.getText() : protractor.promise.when('')).then(function (nodeText) {
                    var promise,
                        nodeFullPath = (nodeText === '' ? parentPath : parentPath.concat(nodeText));

                    if (hasText) {
                        promise = isNodeSelected(nodeElement).then(function (nodeSelected) {
                            if (nodeSelected) {
                                data.push(nodeFullPath);
                            }
                        });
                    } else {
                        promise = protractor.promise.when(true);
                    }

                    return promise.then(function () {

                        var childNodes = nodeElement.all(by.xpath('./ol/li')),
                            d = protractor.promise.defer(),
                            done = 0;

                        childNodes.count().then(function (total) {
                            if (total > 0) {
                                childNodes.each(function (childNodeElement) {
                                    getSelectedNodesPaths(childNodeElement, nodeFullPath).then(function () {
                                        done++;

                                        if (done >= total) {
                                            d.fulfill(true);
                                        }
                                    });
                                });
                            } else {
                                d.fulfill(true);
                            }
                        });

                        return d.promise;
                    });
                });
            });
        }
    },

    clearData: function(pageObject) {
        return pageObject.getElement().all(by.css('.tree-node-anchor > i.glyphicon-ok')).map(function (element) {
            return element.click();
        });
    },
    getErrors: DefaultHelper.getErrors
};