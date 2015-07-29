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
        var formElement = pageObject.getElement();

        return formElement.getAttribute('multiple').then(function (multiple) {
            return formElement.getAttribute('expanded').then(function (expanded) {
                if (null === expanded) {
                    if (null === multiple) {
                        return setDataSingle();
                    } else {
                        return setDataMultiple();
                    }
                } else {
                    if (null === multiple) {
                        return true; // TODO setDataSingleExpanded();
                    } else {
                        return true; // TODO setDataMultipleExpanded();
                    }
                }
            });
        });

        function setDataSingle() {
            return formElement.element(by.model('vm.data')).element(by.cssContainingText('option', data)).click();
        }

        function setDataMultiple() {
            var promises = [], i;

            for (i in data) {
                if (data.hasOwnProperty(i)) {
                    promises.push(
                        formElement.element(by.model('vm.data')).element(by.cssContainingText('option', data[i])).click()
                    );
                }
            }

            return protractor.promise.all(promises);
        }
    },

    /**
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
    getData: function(pageObject) {
        var formElement = pageObject.getElement();

        return formElement.getAttribute('multiple').then(function (multiple) {
            return formElement.getAttribute('expanded').then(function (expanded) {
                if (null === expanded) {
                    if (null === multiple) {
                        return getDataSingle();
                    } else {
                        return getDataMultiple();
                    }
                } else {
                    if (null === multiple) {
                        return ''; // TODO getDataSingleExpanded()
                    } else {
                        return []; // TODO getDataMultipleExpanded()
                    }
                }
            });
        });

        function getDataSingle() {
            return pageObject.getElement().element(by.model('vm.data')).element(by.css('option:checked')).getText();
        }

        function getDataMultiple() {
            var d = protractor.promise.defer(),
                data = [],
                options = pageObject.getElement().element(by.model('vm.data')).all(by.css('option:checked'));

            options.count().then(function (total) {
                options.each(function (option, index) {
                    option.getText().then(function (text) {
                        data.push(text);

                        // Last Option
                        if (index === total - 1) {
                            d.fulfill(data);
                        }
                    });
                });
            });

            return d.promise;
        }
    },

    getErrors: DefaultHelper.getErrors
};