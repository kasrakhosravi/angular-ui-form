var _ = require('lodash');

module.exports = (function () {
    return {
        walkByPromise: walkByPromise,
        click: click
    };

    /**
     * Helper function that uses mouseMove/mouseDown/mouseUp for clicking.
     *
     * This is unfortunately needed because `.click()` doesn't work right in Firefox.
     *
     * @param element {WebElement}
     *
     * @returns {Promise} A promise that is resolved when the click has been performed.
     */
    function click(element) {
        return browser.actions().mouseMove(element).mouseDown(element).mouseUp().perform();
    }

    /**
     * @param input
     * @param callback
     * @returns {Promise}
     */
    function walkByPromise(input, callback) {
        return _.reduce(input, function (prevPromise, value, key) {
            return prevPromise.then(function () {
                return callback(value, key);
            });
        }, protractor.promise.when(true));
    }

})();