var _ = require('lodash');

module.exports = {
    promiseWhile: promiseWhile,
    objectValues: objectValues,
    walkByPromise: walkByPromise,
    isFormDataEmpty: isFormDataEmpty,
    click: click
};

/**
 * Returns true if data is undefined, an empty string, empty array, or an object with no keys.
 *
 * @param data
 * @returns {boolean}
 */
function isFormDataEmpty(data) {
    return !data || data === '' ||
        (_.isObject(data) && Object.keys(data).length === 0) ||
        (_.isArray(data) && data.length === 0)
        ;
}

/**
 *
 * @param {function} condition is a function that returns a boolean
 * @param {function} body is a function that returns a promise
 * @returns {Promise}
 */
function promiseWhile(condition, body) {
    var done = protractor.promise.defer();

    function loop() {
        // When the result of calling `condition` is no longer true, we are
        // done.
        if (!condition()) return done.fulfill();
        // Use `when`, in case `body` does not return a promise.
        // When it completes loop again otherwise, if it fails, reject the
        // done promise
        protractor.promise.when(body(), loop, done.reject);
    }

    // Start running the loop in the next tick so that this function is
    // completely async. It would be unexpected if `body` was called
    // synchronously the first time.
    process.nextTick(loop);

    // The promise
    return done.promise;
}

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
