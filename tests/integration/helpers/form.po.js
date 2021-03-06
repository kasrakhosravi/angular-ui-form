var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var util = require('./util');
var defaultFieldHelper = require(path.resolve(__dirname, 'form/default.js'));

/**
 * @param element Form element (ui-form or ui-field-* directives)
 * @param identifier
 * @constructor
 */
function FormPageObject(element, identifier) {
    this.element = element;
    this.identifier = identifier;
}

/**
 * @returns {string}
 */
FormPageObject.prototype.getIdentifier = function() {
    return this.identifier;
};

/**
 * Returns form element directly or by calling the configured function.
 *
 * @returns {object}
 */
FormPageObject.prototype.getElement = function() {
    return typeof this.element === 'function' ? this.element() : this.element;
};

/**
 * Returns this field's property name.
 *
 * @returns {object}
 */
FormPageObject.prototype.getProperty = function() {
    return this.getElement().getAttribute('property');
};

/**
 * Builds descendant page objects of form children.
 */
FormPageObject.prototype.buildChildrenPageObjects = function () {
    var me = this,
        children = [];

    return me.walkOnDirectFormChildren(function (childElement) {
        return childElement.getWebElement().getId().then(function (elementId) {
            return children.push(new FormPageObject(childElement, elementId.ELEMENT));
        });
    }).then(function () {
        return children;
    });
};

/**
 * Loops through the children elements to find direct fields and call a callback.
 *
 * @param {function} callback
 * @param {object} [startNode]
 */
FormPageObject.prototype.walkOnDirectFormChildren = function (callback, startNode) {
    var me = this;

    if (typeof startNode === 'undefined') {
        startNode = this.getElement();
    }

    return startNode.all(by.xpath('./*')).map(function (childElement) {
        return childElement.getAttribute('class').then(function (className) {
            if (className.indexOf('ui-type') > -1) {
                return callback(childElement);
            } else {
                return me.walkOnDirectFormChildren(callback, childElement);
            }
        });
    });
};

/**
 * Returns a helper utility to deal with writing/reading data to/from the field.
 *
 * @returns {object}
 */
FormPageObject.prototype.getHelper = function () {

    // When data is a literal we try to set it whether using a helper or directly by sendKeys.
    return this.getElement().getWebElement().getTagName().then(function (tagName) {
        var helperPath = path.resolve(__dirname, 'form/' + tagName + '.js');

        // If there's no field helper for this specific field use default one.
        if (!fs.existsSync(helperPath)) {
            return defaultFieldHelper;
        }

        return _.merge({}, defaultFieldHelper, require(helperPath));
    });
};

/**
 * Sets form data using appropriate field-helper.
 *
 * @param {*...} data1, data2, ... Sometimes form elements will change based on input data,
 *                                  so if that's the case you can pass input in different batches
 *                                  then this helper sets those batches one by one and waits for the changes before trying to set different batches.
 * @returns {Promise}
 */
FormPageObject.prototype.setData = function() {
    var me = this,
        args = arguments;

    return browser.driver.call(function () {
        return me.getHelper().then(function (helper) {
            return util.walkByPromise(args, function (data) {
                return helper.setData(me, data);
            });
        });
    });
};

/**
 * Reads a field data using appropriate field-helper.
 *
 * @returns {*}
 */
FormPageObject.prototype.getData = function() {
    var me = this;

    return browser.driver.call(function () {
        return me.getHelper().then(function (helper) {
            return helper.getData(me);
        });
    });
};

/**
 * Clears a field data using appropriate field-helper.
 *
 * @returns {*}
 */
FormPageObject.prototype.clearData = function() {
    var me = this;

    return browser.driver.call(function () {
        return me.getHelper().then(function (helper) {
            return helper.clearData(me);
        });
    });
};

/**
 * Reads a field errors using appropriate field-helper.
 *
 * @returns {*}
 */
FormPageObject.prototype.getErrors = function() {
    var me = this;

    return browser.driver.call(function () {
        return me.getHelper().then(function (helper) {
            return helper.getErrors(me);
        });
    });
};

module.exports = FormPageObject;