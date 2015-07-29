var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var util = require('./util');
var defaultFieldHelper = require(path.resolve(__dirname, 'form/default.js'));

/**
 * @param element Form element (ui-form or ui-field-* directives)
 * @constructor
 */
function FormPageObject(element) {
    this.element = element;
    this.children = [];
}

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
    var me = this;

    // Reset children since they may be detached from DOM.
    me.children = [];

    return me.walkOnDirectFormChildren(function (childElement) {
        me.children.push(new FormPageObject(childElement));
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
 * @param {*} data
 * @returns {Promise}
 */
FormPageObject.prototype.setData = function(data) {
    var me = this;

    return browser.driver.call(function () {
        return me
            .buildChildrenPageObjects()
            .then(function () {
                return me.getHelper();
            })
            .then(function (helper) {
                return helper.setData(me, data);
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
        return me
            .buildChildrenPageObjects()
            .then(function () {
                return me.getHelper();
            })
            .then(function (helper) {
                return helper.getData(me);
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
        return me
            .buildChildrenPageObjects()
            .then(function () {
                return me.getHelper();
            })
            .then(function (helper) {
                return helper.getErrors(me);
            });
    });
};

module.exports = FormPageObject;