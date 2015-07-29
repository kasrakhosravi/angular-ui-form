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
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                var result = pageObject.getElement()
                    .element(by.css('input[type=file]'))
                    .sendKeys(data[i]);
                browser.sleep(4000);
            }
        }

        return result;
    },

    /**
     * We will return the number of uploaded images, since the actual paths are hard to `expect()`
     *
     * @param {FormPageObject} pageObject
     *
     * @return {Promise}
     */
    getData: function(pageObject) {
        return pageObject.getElement().all(by.repeater('image in vm.data track by $index'))
            .count().then(function(total) {
                return total;
            });
    },

    getErrors: DefaultHelper.getErrors

};