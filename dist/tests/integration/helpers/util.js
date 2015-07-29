var _ = require('lodash');

module.exports = {
    objectValues: objectValues,
    walkByPromise: walkByPromise,
    click: click
};

/**
 * Takes an object and returns values in an array. (Gets rid of keys)
 *
 * @param {object} input
 * @returns {Array}
 */
function objectValues(input) {
    var tmpArr = [], key;

    for (key in input) {
        if (input.hasOwnProperty(key)) {
            tmpArr[tmpArr.length] = input[key];
        }
    }

    return tmpArr;
}

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
